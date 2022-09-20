import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

/* Defines a given Chart.js line graph that 
 * displays the graph data from 'data'.
 * Props: data - a JSON object compatible with Chart.js
 *               used to create the given graph.
 */
const LineGraph = ({ data }) => {
  const options = {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'white',
          font: {
            family: 'Lato'
          }
        }
      }
    },
    tooltip: {
      bodyFont: {
        family: 'Lato'
      },
      titleFont: {
        family: 'Lato'
      }
    },
    scales:{
      y: {
        ticks: {
          color:'white'
        },
        grid: {
          color: 'white'
        }
      },
      x: {
        ticks: {
          color: 'white'
        }, 
        grid: {
          color: 'transparent'
        }
      }
    },
    title:{
      display:true,
      text:'Average Rainfall per month',
      fontSize:20,
      
    },
    legend:{
      display:false,
      position:'right',
      fontColor: 'white'
    },
    labels:{
      font: {
        family: 'Times'
      }
    }
  }

  return (
    <div>
    <Line
      data={data}
      options={options}
    />
  </div>
  )
}

export default LineGraph