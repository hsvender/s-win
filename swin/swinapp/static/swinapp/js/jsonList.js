async function getJsonData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function fillList(url) {
    const data = await getJsonData(url);
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

// Call fillList initially for the first URL if you want one of them to load by default
//fillList('http://127.0.0.1:8000/swinapp/prog_competencies');
