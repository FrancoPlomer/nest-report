
import * as utils from 'src/helpers';

export const getBarsChart = async(): Promise<string> => {

    const DATA_COUNT = 7;
    const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

    const labels = utils.months({count: 7});
    const data = {
    labels: labels,
    datasets: [
        {
        label: 'Fully Rounded',
        data: utils.numbers(NUMBER_CFG),
        borderColor: utils.NAMED_COLORS.red,
        backgroundColor: utils.transparentize(utils.NAMED_COLORS.red, 0.5),
        borderWidth: 2,
        borderRadius: Number.MAX_VALUE,
        borderSkipped: false,
        },
        {
        label: 'Small Radius',
        data: utils.numbers(NUMBER_CFG),
        borderColor: utils.NAMED_COLORS.blue,
        backgroundColor: utils.transparentize(utils.NAMED_COLORS.blue, 0.5),
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false,
        }
    ]
    };

    const config = {
        type: 'bar',
        data: data,
    }

    return utils.chartJsToImage(config);
}