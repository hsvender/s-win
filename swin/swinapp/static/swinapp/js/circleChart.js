// Fetch the data from the server
fetch('http://127.0.0.1:8000/swinapp/prog_competencies')
  .then(response => response.json())
  .then(data => {
    // Sort competencies by value and get top 10
    let sortedData = Object.entries(data).sort((a, b) => b[1] - a[1]).slice(0, 5);

    // Prepare labels and data arrays
    let labels = sortedData.map(item => item[0]);
    let datasetData = sortedData.map(item => item[1]);

    // Update chart configuration
    const chartData = {
      labels: labels,
      datasets: [{
        label: 'Competency Dataset',
        data: datasetData,
        // Add rest of the properties like backgroundColor, etc.
      }]
    };

    const config = {
      type: 'doughnut',
      data: chartData,
      // ...rest of the config
    };

    const myChart = new Chart(
      document.getElementById('myChart'),
      config
    );
  });
