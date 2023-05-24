// Fetch the JSON data (assuming it's in a file called data.json)
fetch('data/comp_prog_count.json')
  .then(response => response.json())
  .then(data => {
    // Sort the attributes based on their values in descending order
    const sortedAttributes = Object.entries(data).sort((a, b) => b[1] - a[1]);

    // Get the visualization container element
    const visualizationContainer = document.getElementById('visualization');

    // Loop through the sorted attributes and create bars for each attribute
    sortedAttributes.forEach(([attribute, value]) => {
      // Create a bar element
      const bar = document.createElement('div');
      bar.classList.add('bar');

      // Calculate the width of the bar based on the attribute value
      const width = (value / sortedAttributes[0][1]) * 100; // Adjust the denominator if needed

      // Create a span element within the bar to represent the attribute value visually
      const span = document.createElement('span');
      span.style.width = `${width}%`;

      // Add the attribute name as text content of the bar
      bar.textContent = attribute;

      // Append the span to the bar
      bar.appendChild(span);

      // Append the bar to the visualization container
      visualizationContainer.appendChild(bar);
    });
  })
  .catch(error => console.error('Error:', error));
