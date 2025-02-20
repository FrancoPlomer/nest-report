
import * as utils from 'src/helpers';

export const getLineChart = (): Promise<string> => {

  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
    datasets: [
      {
        label: 'Movimiento de inventario',
        data: utils.numbers({count: 6, min: -100, max: 100}),
        borderColor: '#4dc9f6',
        backgroundColor: utils.transparentize('#4dc9f6', 0.5),
        pointStyle: 'circle',
        pointRadius: 10,
        pointHoverRadius: 15
      }
    ]
  };

  const config = {
    type: 'line',
    data: data,
  };

  return utils.chartJsToImage( 
    config, { 
      width: 500, 
      height: 300 
    } 
  );
}