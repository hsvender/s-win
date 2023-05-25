let myChart;
const URL_1 = 'http://127.0.0.1:8000/swinapp/prog_competencies';
const URL_2 = 'http://127.0.0.1:8000/swinapp/soft_competencies';

async function fetchData(url) {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
}

async function updateChart(url) {
  const data = await fetchData(url);

  // Sort competencies by value and get top 5
  let sortedData = Object.entries(data).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 5);

  // Prepare labels and data arrays
  const labels = sortedData.map(item => item[0]);
  const datasetData = sortedData.map(item => item[1]);

  // Update chart configuration
  const chartData = {
    labels: labels,
    datasets: [{
      label: 'Competency Dataset',
      data: datasetData,
      backgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 205, 86, 1)', 'rgba(201, 203, 207, 1)', 'rgba(54, 162, 235, 1)'], // Five colors for five data points
      borderColor: 'rgba(255,255,255,1)', // Add actual color value
      // ...rest of the properties
    }]
  };


  const config = {
    type: 'doughnut',
    data: chartData,
    // ...rest of the config
  };

  // If the chart has been created, destroy it to make room for the new one
  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
}

async function updateList(url) {
  const data = await fetchData(url);

  // CHANGE: The parent list element should be an ordered list (`ol`)
  let listElement = document.createElement('ol');
  listElement.classList.add('gradient-list');

  let parentElement = document.getElementById('gradient-parent');  // Ensure this parent element exists in your HTML
  if (!parentElement) {
    console.error('Could not find the parent element.');
    return;
  }

  parentElement.innerHTML = '';  // Clear the previous gradient-list if it exists

  let sortedData = Object.entries(data).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 12);

  let i = 1;
  for (let item of sortedData) {
    let listItem = document.createElement('li');
    listItem.classList.add('gradient-list-item');
    listItem.style.order = i;
    
    listItem.innerHTML = '<strong>' + item[0] + '</strong><br/>' + 'förekommer ' + item[1] + " gånger";
    
    listElement.appendChild(listItem);
    i++;
  }
  
  
  // Append the newly created list to the parent element
  parentElement.appendChild(listElement);
}



document.addEventListener('DOMContentLoaded', (event) => {
  let button1 = document.getElementById('button1');
  let button2 = document.getElementById('button2');

  if (button1) {
      button1.addEventListener('click', function() {
          updateChart(URL_1);
          updateList(URL_1);
      });
  }

  if (button2) {
      button2.addEventListener('click', function() {
          updateChart(URL_2);
          updateList(URL_2);
      });
  }
});
