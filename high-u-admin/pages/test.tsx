import { useEffect, useRef } from 'react'
import { Chart, ChartItem, ChartOptions } from 'chart.js'
import 'chartjs-plugin-datalabels'

const Page: React.FC = () => {
    const chartRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: [65, 59, 80, 81, 56, 55, 40],
                },
            ],
        }

        const options: ChartOptions = {
            scales: {
            //   yAxes: [
            //     {
            //       type: 'linear',
            //       ticks: {
            //         beginAtZero: true,
            //       },
            //     },
            //   ],
            },
          }

        if (chartRef.current) {
            new Chart(chartRef.current.getContext('2d') as ChartItem, {
                type: 'bar',
                data,
                options,
            })
        }
    }, [])

    return (
        <div className="container mx-auto">
            <canvas ref={chartRef} />
        </div>
    )
}

export default Page
