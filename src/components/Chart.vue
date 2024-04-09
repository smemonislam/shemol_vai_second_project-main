<template>
  <div>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';

onMounted(() => {
  const ctx = document.getElementById('myChart');

  const txtColor = 'rgba(255, 26, 104, 1)';
  const labels = ['Red', 'Blue', 'Yellow'];
  const bgColor = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'];
  const align = 'center';
  const font = 'bolder 30px Arial';

  const centerText = {
    afterDatasetsDraw: function(chart) {
      const { ctx, chartArea: { left, right, top, bottom } } = chart;
      const total = chart.data.datasets[0].data.reduce((acc, curr) => acc + curr, 0);
      const centerX = (left + right) / 2;
      const centerY = (top + bottom) / 2;

      ctx.save();
      ctx.font = font;
      ctx.fillStyle = txtColor;
      ctx.textAlign = align;
      ctx.fillText('Total: ' + total, centerX, centerY);
      ctx.restore();
    }
  }

  

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: bgColor,
        hoverOffset: 4,
        cutout: '80%'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
      },
      spacing: 3
    },
    plugins:[centerText]
  });
});



</script>

<style>
/* Add any necessary styles here */
</style>
