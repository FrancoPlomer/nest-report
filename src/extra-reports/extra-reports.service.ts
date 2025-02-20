import fs from 'fs';

import { PrismaClient } from '@prisma/client';

import { Injectable, OnModuleInit } from '@nestjs/common';

import { PrinterService } from './../printer/printer.service';

import { getHtmlContent } from 'src/helpers/html-to-pdfmake';
import { headerSection } from 'src/reports/sections/header.section';

import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { footerSection } from 'src/reports/sections/footer.section';

import { getCommunityReport } from 'src/reports';

@Injectable()
export class ExtraReportsService extends PrismaClient implements OnModuleInit {

    async onModuleInit() {
        await this.$connect();
    }
    
    constructor(
        private readonly printerService: PrinterService
    ) {
        super();
    }

    getHtmlReport() {

        const html = fs.readFileSync('src/reports/html/basic-03.html', 'utf8');

        const content = getHtmlContent(html, {
            client: 'Franco Plomer',
            title: 'Curso de node'
        });
        
        const docDefinition: TDocumentDefinitions = {
            pageMargins: [ 40 ,110 ,40 ,60 ],
            content,
            header: headerSection({
                title: 'Reporte HTML',
                subtitle: 'Reporte desde html'
            }),
            footer: footerSection
        }

        const doc = this.printerService.createPDF(docDefinition);

        return doc;
    }


    getComunity() {

        const docDefinition = getCommunityReport();

        const doc = this.printerService.createPDF(docDefinition);

        return doc;
    }

    getCustomSize() {

        const doc = this.printerService.createPDF({
            // De la siguiente manera damos tamaños a las paginas
            // pageSize: 'FOLIO',
            // Si queremos usar uno personalizado es de la siguiente manera
            pageSize: {
                width: 150,
                height: 300
            },
            content: [
                {
                    qr: 'https://www.google.com',
                    fit: 100,
                    alignment: 'center',
                },
                {
                    text: 'reporte con tamaño',
                    fontSize: 20,
                    alignment: 'center',
                    margin: [0, 20]
                }
            ]
        })

        return doc;
    }
}
