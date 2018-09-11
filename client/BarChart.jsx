import React from 'react';
import Bar from './Bar.jsx';
import Chart from './Chart.jsx';


const BarChart = ({ weeklyData }) => {
  // Width of each bar
  const itemWidth = 11.46;
  const itemMargin = 11.45;
  const dataLength = weeklyData.length;

  // find week with most stocks purchased
  let mostStocks = weeklyData.reduce((acc, cur) => {
    const { weekStocksPurchased } = cur;
    return weekStocksPurchased > acc ? weekStocksPurchased : acc;
  }, 0);

  // Reshape the data to the 96px-max-height proportions
  let resizedData = weeklyData.map(
    week => Object.assign({}, week, { weekStocksPurchased: week.weekStocksPurchased / (mostStocks / 96)}),
  );

  // once data is reshaped –– find the highest stock
  mostStocks = resizedData.reduce((acc, cur) => {
    const { weekStocksPurchased } = cur;
    return weekStocksPurchased > acc ? weekStocksPurchased : acc;
  }, 0);

  const chartHeight = mostStocks;

  return (
    <Chart
    width={dataLength * (itemWidth + itemMargin)}
    height={chartHeight}
  >
    {resizedData.map((week, index) => {
      const itemHeight = week.weekStocksPurchased;
      return (
        <Bar
          key={index}
          x={index * (itemWidth + itemMargin)}
          y={chartHeight - itemHeight}
          width={itemWidth}
          height={itemHeight}
        />
      );
    })}
  </Chart>
  )
}

export default BarChart;