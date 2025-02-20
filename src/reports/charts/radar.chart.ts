
import * as utils from 'src/helpers';

export const getRadarChart = (): Promise<string> => {

    let inputs = {
        min: 8,
        max: 16,
        count: 8,
        decimals: 2,
        continuity: 1
    };
    
    const generateLabels = () => {
        return utils.months({count: inputs.count});
    };
    
    const generateData = () => {
        const values = utils.numbers(inputs);
        return values;
    };

    const data = {
        labels: generateLabels(),
        datasets: [
        {
            label: 'D0',
            data: generateData(),
            borderColor: utils.NAMED_COLORS.red,
            backgroundColor: utils.transparentize(utils.NAMED_COLORS.red, 1),
        },
        {
            label: 'D1',
            data: generateData(),
            borderColor: utils.NAMED_COLORS.orange,
            hidden: true,
            backgroundColor: utils.transparentize(utils.NAMED_COLORS.orange, 1),
            fill: '-1'
        },
        {
            label: 'D2',
            data: generateData(),
            borderColor: utils.NAMED_COLORS.yellow,
            backgroundColor: utils.transparentize(utils.NAMED_COLORS.yellow, 1),
            fill: 1
        },
        {
            label: 'D3',
            data: generateData(),
            borderColor: utils.NAMED_COLORS.green,
            backgroundColor: utils.transparentize(utils.NAMED_COLORS.green, 1),
            fill: false
        },
        {
            label: 'D4',
            data: generateData(),
            borderColor: utils.NAMED_COLORS.blue,
            backgroundColor: utils.transparentize(utils.NAMED_COLORS.blue, 1),
            fill: '-1'
        },
        {
            label: 'D5',
            data: generateData(),
            borderColor: utils.NAMED_COLORS.purple,
            backgroundColor: utils.transparentize(utils.NAMED_COLORS.purple, 1),
            fill: '-1'
        },
        {
            label: 'D6',
            data: generateData(),
            borderColor: utils.NAMED_COLORS.grey,
            backgroundColor: utils.transparentize(utils.NAMED_COLORS.grey, 1),
            fill: {value: 85}
        }
        ]
    };

    const config = {
        type: 'line',
        data: data,
    };

    return utils.chartJsToImage( 
        config
    );
}