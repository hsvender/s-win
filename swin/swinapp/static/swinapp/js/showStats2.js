fetch('/swinapp/prog_competencies')
  .then(response => response.json())
  .then(data => {
    let competenciesArray = Object.entries(data);
    competenciesArray.sort((a, b) => b[1] - a[1]);
    let topCompetencies = competenciesArray.slice(0, 25);

    let list = document.querySelector('.competencies-list');

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
