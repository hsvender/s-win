function fetchData(source) {
    fetch(source)
      .then(response => response.json())
      .then(data => {
        let competenciesArray = Object.entries(data);
        competenciesArray.sort((a, b) => b[1] - a[1]);
        let topCompetencies = competenciesArray.slice(0, 50);
  
        // Clear previous competencies
        let list = document.querySelector('.competencies-list');
        list.innerHTML = '';
  
        topCompetencies.forEach(([competency, count]) => {
          let listItem = document.createElement('div');
          listItem.className = 'competency';
  
          let competencyElement = document.createElement('p');
          competencyElement.textContent = competency;
  
          let countElement = document.createElement('p');
          countElement.textContent = count;
  
          listItem.appendChild(competencyElement);
          listItem.appendChild(countElement);
  
          list.appendChild(listItem);
        });
      })
      .catch(error => console.error('Error:', error));
  }
  
  document.getElementById('button1').addEventListener('click', function() {
    fetchData('/swinapp/prog_competencies'); // path to your first JSON file
  });
  
  document.getElementById('button2').addEventListener('click', function() {
    fetchData('/swinapp/soft_competencies'); // path to your second JSON file
  });
  
