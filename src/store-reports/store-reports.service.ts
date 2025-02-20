import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import { orderByIdReport, getBasicChartSvgReport } from 'src/reports';

import { PrinterService } from './../printer/printer.service';

import { getStatististics } from 'src/reports/statistis.report';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }
    constructor(
        private readonly printerService: PrinterService
    ) {
        // Cuando usamos una extension de PrismaClient debemos agregar el super aqui para que se inicialice
        super();
    }
    async getOrderReportById(id: number) {

        const order = await this.orders.findUnique({
            where: {
                order_id: id
            },
            include: {
                
                // Si queremos todo lo de la tabla usamos true
                customers: true,
                order_details: {
                    include: {
                        products: true
                    }
                }
            }
        })
        
        if(!order) throw new NotFoundException(`Order ${id} not found`)

        const docDefinition = orderByIdReport({data: order as any});

        const doc = this.printerService.createPDF(docDefinition);

        return doc;
    }

    async getSvgChart() {
        const docDefinition = await getBasicChartSvgReport();

        const doc = this.printerService.createPDF(docDefinition);

        return doc;
    }

    async getStatistics() {

        const topCountries = await this.customers.groupBy({
            by: ['country'],
            _count: {
                country: true
            },
            orderBy: {
                _count: {
                    country: 'desc'
                }
            },
            take:10
        })

        const topCountryData = topCountries.map(({country, _count}) => {
            return {
                country: country,
                customers: _count.country
            }
        })

        const docDefinition = await getStatististics({topCountry: topCountryData});

        const doc = this.printerService.createPDF(docDefinition);

        return doc;
    }
}
