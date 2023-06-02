// File: swinapp/js/lineChart.js

let lineChart = null;

async function updateLineChart(skills) {
    const data = await $.ajax({
        url: 'http://127.0.0.1:8000/swinapp/api',
    });

    // Create a unique set of years
    const uniqueYears = [...new Set(data.map(item => item.Year))].sort();

    // Extend the unique years array to 2025 if it doesn't already reach this far
    for (let i = Math.max(...uniqueYears) + 1; i <= 2025; i++) {
        uniqueYears.push(i);
    }

    const currentYear = (new Date()).getFullYear();

    const datasets = skills.flatMap(skill => {
        const skillData = data.filter(item => item.Skill === skill && item.Year < currentYear).sort((a, b) => a.Year - b.Year);
    
        // Calculate linear regression
        const regressionData = skillData.map(item => [item.Year, item.Count]);
        const regressionLine = ss.linearRegression(regressionData);
        const regressionFunction = ss.linearRegressionLine(regressionLine);
    
        // Create an extended dataset including predictions up to 2025
        const extendedDataset = uniqueYears.map(year => {
            const item = skillData.find(i => i.Year === year);
            if (year < currentYear) {
                return item ? item.Count : 0;
            } else {
                return Math.round(regressionFunction(year));
            }
        });
    
        const borderColor = '#' + Math.floor(Math.random()*16777215).toString(16); // random color
        const forecastStartIndex = uniqueYears.indexOf(2023);
        
        return [{
            // Historical data
            label: `${skill} (historical)`,
            data: extendedDataset.slice(0, forecastStartIndex),
            fill: false,
            borderColor: borderColor,
            tension: 0.1
        }, {
            // Forecast
            label: `${skill} (forecast)`,
            data: [ ...new Array(forecastStartIndex - 1).fill(null), extendedDataset[forecastStartIndex - 1], ...extendedDataset.slice(forecastStartIndex) ],
            fill: false,
            borderColor: borderColor,
            borderDash: [5, 5], // This makes the line dashed
            tension: 0.1
        }];
    });
    

    const chartData = {
        labels: uniqueYears, // Use the unique years as labels
        datasets: datasets
    };

    const config = {
        type: 'line',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    if (lineChart) {
        lineChart.destroy();
    }

    lineChart = new Chart(
        document.getElementById('lineChart'),
        config
    );
}

document.addEventListener('DOMContentLoaded', (event) => {
  updateLineChart(['All']);
});
