import { TDocumentDefinitions } from "pdfmake/interfaces";

import { headerSection } from "./sections/header.section";
import { footerSection } from "./sections/footer.section";

import { countries as Country } from "@prisma/client";


interface ReportOptions {
    title?: string;
    subtitle?: string;
    countries: Country[];
}

export const getCountriesReport = (options: ReportOptions): TDocumentDefinitions => {

    const { title, subtitle, countries } = options;

    return {
        pageOrientation: 'landscape',
        header: headerSection({
            title: title ?? 'Country Report',
            subtitle: subtitle ?? 'List of countries',
        }),
        footer: footerSection,
        pageMargins: [ 40 ,110 ,40 ,60 ],
        content: [
            {
              layout: 'customLayout01', // optional
                table: {
                    // headers are automatically repeated if the table spans over multiple pages
                    // you can declare how many rows should be treated as headers
                    headerRows: 1,
                    widths: [ 50, 50, 70, '*', 'auto', '*' ],
            
                    body: [
                        [ 'ID', 'ISO2', 'ISO3', 'Name' ,'Continent', 'Local name' ],
                        ...countries.map( country => [
                            country.id.toString(),
                            country.iso2,
                            country.iso3,
                            {
                                text: country.name,
                                style: {
                                    bold: true
                                }
                            },
                            country.continent,
                            country.local_name
                        ]),
                        ['', '', '', '', { text: 'Total', bold: true }, `${countries.length}`],
                    ]
                }
            },
            {
                text: 'Totales', // optional
                fontSize: 16,
                bold: true,
            },
            {
                layout: 'noBorders', // optional
                table: {
                    headerRows: 1,
                    widths: [ 50, 50, 30, '*', 'auto', '*' ],
                    body: [
                        [
                            {
                                text: 'Total de países',
                                colSpan: 2,
                                bold: true
                            },
                            {},
                            {},
                            {
                                text: countries.length.toString(),
                                bold: true
                            },
                            {},
                            {},
                        ]
                    ]
                }
            }
        ]
    }
}