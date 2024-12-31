import { PrismaClient } from '@prisma/client';

import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';

import { PrinterService } from 'src/printer/printer.service';

import { getEmploymentLetter, getEmploymentLetterById, getHelloWorldReport } from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit{
    async onModuleInit() {
        await this.$connect();
    }
    constructor(
        private readonly printerService: PrinterService
    ) {
        // Cuando usamos una extension de PrismaClient debemos agregar el super aqui para que se inicialice
        super();
    }

    hello() {

        const docDefinition = getHelloWorldReport({name: 'Plomer Franco'});

        const doc = this.printerService.createPDF(docDefinition);

        return doc;
    }

    employmentLetter() {

        const docDefinition = getEmploymentLetter();

        const doc = this.printerService.createPDF(docDefinition);

        return doc;
    }

    async employmentLetterById( id: number ) {

        const employee = await this.employees.findUnique({
            where: {
                id
            }
        });

        if( !employee ) {
            throw new NotFoundException(`Employee with ${id} not found`);
        }

        const docDefinition = getEmploymentLetterById({
            employerName: 'Franco Plomer',
            employerPosition: 'Software Engineer',
            employeeName: employee.name,
            employeePosition: employee.position,
            employeeStartDate: employee.start_date,
            employeeHours: employee.hours_per_day,
            employeeWorkSchedule: employee.work_schedule,
            employerCompany: 'Tucan Code'
        });

        const doc = this.printerService.createPDF(docDefinition);

        return doc;
    }
}
