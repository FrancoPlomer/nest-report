
import * as utils from 'src/helpers';

interface DonutEntry {
    label: string;
    value: number;
}

interface DonutOptions {
    entries: DonutEntry[];
    position?: 'left' | 'right' | 'top' | 'bottom';
}

export const getDonutChart = async( options: DonutOptions ): Promise<string> => {

    const { position = 'top', entries } = options;
    const data = {
    labels: entries.map( e => e.label ),
    datasets: [
            {
                label: 'Dataset 1',
                data: entries.map( e => e.value ),
                backgroundColor: Object.values(utils.CHART_COLORS),
            }
        ]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            legend: {
                position
            },
            plugins: {
                datalabels: {
                    color: 'white',
                    font: {
                        weight: 'bold',
                        size: 14
                    }
                }
            }
        },
    }

    return utils.chartJsToImage(config);
}