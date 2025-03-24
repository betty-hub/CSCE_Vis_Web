// Function to fetch and render the pie chart
function fetchAndRenderPieChart(year, questionId, state) {
    console.log(`Fetching pie chart data for year=${year}, questionId=${questionId}, state=${state}`);
    fetch(`/api/pie_data?year=${year}&question_id=${questionId}&state=${state}`)
        .then(response => response.json())
        .then(data => {
            console.log('Pie chart data:', data); // Debugging log
            if (data.data.length > 0) {
                renderPieChart(data.data); // Render the pie chart with the fetched data
            } else {
                alert('No data available for the selected state.');
            }
        })
        .catch(error => console.error('Error fetching pie chart data:', error));
}

// Function to render the pie chart
function renderPieChart(data) {
    console.log('Rendering pie chart with data:', data); // Debugging log
    const ctx = document.getElementById('pie-chart').getContext('2d');
    const labels = data.map(item => item.Income);
    const values = data.map(item => item.Data_Value);

    // Clear the canvas before rendering a new chart
    if (window.pieChartInstance) {
        window.pieChartInstance.destroy();
    }

    window.pieChartInstance = new Chart(ctx, {
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