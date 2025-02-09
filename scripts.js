// Гайд
document.querySelectorAll('.step-header').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    content.classList.toggle('active');
    header.parentElement.classList.toggle('open');
  });
});

// Калькулятор
const calculateTotal = () => {
  const inputs = {
    crypto: parseFloat(document.getElementById('crypto').value) || 0,
    emoney: parseFloat(document.getElementById('emoney').value) || 0,
    nft: parseFloat(document.getElementById('nft').value) || 0,
    domains: parseFloat(document.getElementById('domains').value) || 0
  };

  const total = Object.values(inputs).reduce((acc, val) => acc + val, 0);
  document.getElementById('totalValue').textContent = `$${total.toLocaleString()}`;
  
  updateChart(inputs, total);
};

// Обновление диаграммы
const updateChart = (data, total) => {
  const chart = document.getElementById('chart');
  chart.innerHTML = Object.entries(data)
    .map(([key, value]) => {
      const percent = total > 0 ? (value / total * 100).toFixed(1) : 0;
      return `
        <div class="chart-item">
          <div class="chart-label">${key}</div>
          <div class="chart-bar">
            <div class="chart-progress" style="width: ${percent}%"></div>
          </div>
          <div class="chart-value">$${value.toLocaleString()}</div>
        </div>
      `;
    })
    .join('');
};

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', calculateTotal);
  });
  calculateTotal();
});
