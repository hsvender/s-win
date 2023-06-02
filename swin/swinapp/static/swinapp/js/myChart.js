let myChart;

const API_URL = 'http://127.0.0.1:8000/swinapp/api';

async function fetchData(url) {
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
}

async function updateChart(skills) {
    const data = await fetchData(API_URL);
    let aggregatedCounts = new Map();

    data.forEach(function(row) {
        if(skills.includes('All') || skills.includes(row.Skill)) {
            if(aggregatedCounts.has(row.Skill)) {
                let existingCount = aggregatedCounts.get(row.Skill);
                aggregatedCounts.set(row.Skill, existingCount + row.Count);
            } else {
                aggregatedCounts.set(row.Skill, row.Count);
            }
        }
    });

    let sortedData = Array.from(aggregatedCounts, ([skill, count]) => ({skill, count}))
                        .sort((a, b) => b.count - a.count)
                        .slice(0, 5);

    const labels = sortedData.map(item => item.skill);
    const datasetData = sortedData.map(item => item.count);

    const chartData = {
        labels: labels,
        datasets: [{
            label: 'Competency Dataset',
            data: datasetData,
        }]
    };

    const config = {
        type: 'doughnut',
        data: chartData,
    };

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}

document.addEventListener('DOMContentLoaded', (event) => {
    updateChart(['All']);
});