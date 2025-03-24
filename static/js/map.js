// Ensure Leaflet.js is included and the map object is initialized
const map = L.map('map').setView([37.8, -96], 4); // Example initialization
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a click event listener to the map
map.on('click', function (event) {
    const state = event.latlng; // Replace with actual state logic
    const year = document.getElementById('YearStart').value;
    const questionId = document.getElementById('questionSelect').value;

    console.log(`State selected: ${state}, Year: ${year}, Question ID: ${questionId}`);
    fetchAndRenderPieChart(year, questionId, state);
});

// Function to fetch and render the pie chart
function fetchAndRenderPieChart(year, questionId, state) {
    // Fetch pie chart data for the selected state, year, and question
    fetch(`/api/pie_data?year=${year}&question_id=${questionId}&state=${state}`)
        .then(response => response.json())
        .then(data => {
            if (data.data.length > 0) {
                renderPieChart(data.data); // Function to render the pie chart
            } else {
                alert('No data available for the selected state.');
            }
        })
        .catch(error => console.error('Error fetching pie chart data:', error));
}

// Function to render the pie chart
function renderPieChart(data) {
    const ctx = document.getElementById('pie-chart').getContext('2d'); // Assuming a canvas element with id 'pie-chart'
    const labels = data.map(item => item.Income);
    const values = data.map(item => item.Data_Value);

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                        }
                    }
                }
            }
        }
    });
}