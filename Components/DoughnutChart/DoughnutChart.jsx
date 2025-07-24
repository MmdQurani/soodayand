// src/Components/Chart/DoughnutChart.jsx
import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

// پلاگین برای وسط‌چین کردن متن
const centerTextPlugin = {
  id: 'centerText',
  afterDraw(chart) {
    const { ctx, chartArea } = chart
    ctx.save()
    const fontSize = 16
    ctx.font = `${fontSize}px Vazir`
    ctx.fillStyle = '#111'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const x = (chartArea.left + chartArea.right) / 2
    const y = (chartArea.top + chartArea.bottom) / 2
    ctx.fillText('ترکیب دارایی', x, y)
    ctx.restore()
  }
}

// ثبت پلاگین‌ها
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, centerTextPlugin)

export default function DoughnutChart({
  values,
  labels,
  colors,
  emptyColor = '#9ca3af',
  cutout = '90%',
  showLegend = false
}) {
  const sum = values.reduce((a, v) => a + v, 0)
  const isEmpty = sum === 0

  const data = isEmpty
    ? {
      labels: [''],
      datasets: [{
        data: [1],
        backgroundColor: [emptyColor],
        borderWidth: 0
      }]
    }
    : {
      labels,
      datasets: [{
        data: values,
        backgroundColor: colors,
        borderWidth: 0
      }]
    }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout,
    radius: '100%',
    plugins: {
      legend: { display: showLegend && !isEmpty },
      tooltip: {
        enabled: !isEmpty,
        callbacks: {
          label: ctx => `${ctx.label}: ${ctx.parsed.toFixed(2)}٪`
        }
      },
      datalabels: {
        display: false
      }
    }
  }

  return <Doughnut data={data} options={options} />
}
