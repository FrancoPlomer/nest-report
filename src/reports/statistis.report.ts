import { headerSection } from './sections/header.section';
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { getDonutChart } from "src/reports/charts/donut.chart";
import { getLineChart } from './charts/line.chart';
import { getBarsChart } from './charts/bars.chart';
import { footerSection } from './sections/footer.section';
import { getRadarChart } from './charts/radar.chart';

interface TopCountry {
    country: string;
    customers: number;
}

interface ReportOptions {
    topCountry: TopCountry[];
    title?: string;
    subtitle?: string;
}

export const getStatististics = async(options: ReportOptions): Promise<TDocumentDefinitions> => {

    const [ donutChart, lineChart, barChart1, radarChart ] = await Promise.all([
        getDonutChart({
            position: 'left',
            entries: options.topCountry.map(
                c => ({ 
                    label: c.country, 
                    value: c.customers 
                })
            ),
        }),
        getLineChart(),
        getBarsChart(),
        getRadarChart()
    ])

    const docDefinition: TDocumentDefinitions = {
        pageMargins: [40, 100, 40, 60],
        header: headerSection({
            title: options.title ?? 'Estadísticas de clientes',
            subtitle: options.subtitle ?? 'Estadísticas de los 10 países con más'
        }),
        footer: footerSection,
        content: [
            {
                columns: [
                    {
                        stack: [
                            {
                                text: '10 países con mas clientes',
                                alignment: 'center',
                                margin: [0, 0, 0, 10]
                            },
                            {
                                image: donutChart,
                                width: 300,
                            },
                        ]
                    },
                    {
                        layout: 'lightHorizontalLines',
                        width: 'auto',
                        table: {
                            headerRows: 1,
                            widths: [100, 'auto'],
                            body: [
                                ['País', 'Clientes'],
                                ...options.topCountry.map( c => [c.country, c.customers]),
                            ]
                        }
                    }
                ]
            },
            {
                image: lineChart,
                width: 500,
                height: 250,
                margin: [0, 20]
            },
            {
                columnGap: 10,
                columns: [
                    {
                        image: barChart1,
                        width: 250
                    },
                    {
                        image: radarChart,
                        width: 250
                    },
                ]
            }
        ],
    };

    return docDefinition;
}