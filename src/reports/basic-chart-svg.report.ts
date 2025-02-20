import fs from 'fs';

import * as utils from 'src/helpers';

import { TDocumentDefinitions } from "pdfmake/interfaces";

const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf8');

const generateChartImage = async () => {
    const chartConfig = {
        type: 'bar',                                
        data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],   
            datasets: [{
                label: 'Mi primer grafico',                        
                data: [120, 60, 50, 180, 120, 120, 120],    
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1       
            }]
        }
    }

    return utils.chartJsToImage(chartConfig)
}

const generateDonut = async() => {

    const DATA_COUNT = 5;
    const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

    const data = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
            {
                label: 'Dataset 1',
                data: utils.numbers(NUMBER_CFG),
                backgroundColor: Object.values(utils.CHART_COLORS),
            }
        ]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            title: {
                display: true,
                text: 'Chart.js Doughnut Chart'
            },
        },
    }

    return utils.chartJsToImage(config);
}

export const getBasicChartSvgReport = async(): Promise<TDocumentDefinitions> => {

    // Si se resuelven ambas recien ahi libera los valores
    const [chart, chartDonut] = await Promise.all([
        generateChartImage(), 
        generateDonut()
    ])

    return {
        content: [
            {
                svg: svgContent,
                width: 100,
                fit: [100, 100]
            },
            {
                image: chart,
                width: 500,
            },
            {
                image: chartDonut,
                width: 500,
                fit: [500, 300]
            }
        ]
    }
}