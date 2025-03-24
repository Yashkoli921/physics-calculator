import { Chart, registerables } from 'chart.js';
import { evaluate } from 'mathjs';

// Register all Chart.js components
Chart.register(...registerables);

// Graph Calculator Functions
export function setupGraphPlot(
  container: HTMLElement,
  functions: Array<{ id: number; expression: string; color: string; isActive: boolean }>,
  xRange: { min: number; max: number },
  yRange: { min: number; max: number }
): () => void {
  // Clear existing canvas
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  // Create canvas element
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  
  // Function to evaluate mathematical expressions using mathjs
  const evaluateFunction = (expression: string, x: number): number => {
    try {
      return evaluate(expression, { x });
    } catch (error) {
      console.error(`Error evaluating ${expression} at x=${x}:`, error);
      return NaN;
    }
  };
  
  // Generate data points for each function
  const datasets = functions.map(func => {
    const points = [];
    const step = (xRange.max - xRange.min) / 100;
    
    for (let x = xRange.min; x <= xRange.max; x += step) {
      const y = evaluateFunction(func.expression, x);
      points.push({ x, y });
    }
    
    return {
      label: `y = ${func.expression}`,
      data: points,
      borderColor: func.color,
      backgroundColor: 'transparent',
      borderWidth: 2,
      pointRadius: 0,
      tension: 0.4
    };
  });
  
  // Create chart
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');
  
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'linear',
          position: 'center',
          min: xRange.min,
          max: xRange.max,
          grid: {
            color: 'rgba(200, 200, 200, 0.2)'
          }
        },
        y: {
          type: 'linear',
          position: 'center',
          min: yRange.min,
          max: yRange.max,
          grid: {
            color: 'rgba(200, 200, 200, 0.2)'
          }
        }
      },
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false
        },
        legend: {
          position: 'top'
        }
      }
    }
  });
  
  // Handle theme changes
  const updateChartTheme = () => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    chart.options.scales!.x!.grid!.color = isDarkMode 
      ? 'rgba(100, 100, 100, 0.2)' 
      : 'rgba(200, 200, 200, 0.2)';
    chart.options.scales!.y!.grid!.color = isDarkMode 
      ? 'rgba(100, 100, 100, 0.2)' 
      : 'rgba(200, 200, 200, 0.2)';
    chart.update();
  };
  
  // Set up observer for theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        updateChartTheme();
      }
    });
  });
  
  observer.observe(document.documentElement, { attributes: true });
  
  // Initial theme setting
  updateChartTheme();
  
  // Return cleanup function
  return () => {
    chart.destroy();
    observer.disconnect();
  };
}

// Financial Calculator Chart
export function setupFinancialChart(
  container: HTMLElement,
  annualBreakdown: Array<{ year: number; balance: number; interest: number }>
): () => void {
  // Clear existing canvas
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  // Create canvas element
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  
  // Prepare data
  const years = annualBreakdown.map(item => `Year ${item.year}`);
  const balances = annualBreakdown.map(item => item.balance);
  
  // Create gradient fill
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');
  
  const isDarkMode = document.documentElement.classList.contains('dark');
  const gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
  
  if (isDarkMode) {
    gradientFill.addColorStop(0, 'rgba(63, 81, 181, 0.5)');
    gradientFill.addColorStop(1, 'rgba(63, 81, 181, 0.0)');
  } else {
    gradientFill.addColorStop(0, 'rgba(63, 81, 181, 0.3)');
    gradientFill.addColorStop(1, 'rgba(63, 81, 181, 0.0)');
  }
  
  // Create chart
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: years,
      datasets: [
        {
          label: 'Balance',
          data: balances,
          backgroundColor: gradientFill,
          borderColor: isDarkMode ? 'rgba(63, 81, 181, 0.8)' : 'rgba(63, 81, 181, 1.0)',
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: isDarkMode ? 'rgba(100, 100, 100, 0.2)' : 'rgba(200, 200, 200, 0.2)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `Balance: $${context.raw.toLocaleString('en-US', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              })}`;
            }
          }
        }
      }
    }
  });
  
  // Handle theme changes
  const updateChartTheme = () => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    
    // Update gradient
    const gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
    if (isDarkMode) {
      gradientFill.addColorStop(0, 'rgba(63, 81, 181, 0.5)');
      gradientFill.addColorStop(1, 'rgba(63, 81, 181, 0.0)');
    } else {
      gradientFill.addColorStop(0, 'rgba(63, 81, 181, 0.3)');
      gradientFill.addColorStop(1, 'rgba(63, 81, 181, 0.0)');
    }
    
    chart.data.datasets[0].backgroundColor = gradientFill;
    chart.data.datasets[0].borderColor = isDarkMode 
      ? 'rgba(63, 81, 181, 0.8)' 
      : 'rgba(63, 81, 181, 1.0)';
    
    chart.options.scales!.y!.grid!.color = isDarkMode 
      ? 'rgba(100, 100, 100, 0.2)' 
      : 'rgba(200, 200, 200, 0.2)';
    
    chart.update();
  };
  
  // Set up observer for theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        updateChartTheme();
      }
    });
  });
  
  observer.observe(document.documentElement, { attributes: true });
  
  // Return cleanup function
  return () => {
    chart.destroy();
    observer.disconnect();
  };
}
