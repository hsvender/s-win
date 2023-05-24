async function getJsonData() {
    const response = await fetch('http://127.0.0.1:8000/swinapp/prog_competencies');
    const data = await response.json();
    return data;
}

async function fillList() {
    const data = await getJsonData();
    const list = document.getElementById('jsonList');
    let output = '<ol class="gradient-list">';

    const entries = Object.entries(data);
    for (let i = 0; i < Math.min(12, entries.length); i++) {
        const [key, value] = entries[i];
        output += `<li><strong>${key}</strong>: ${value}</li>`;
    }

    output += '</ol>';

    list.innerHTML = output;
}



window.addEventListener('load', fillList);
