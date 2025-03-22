document.addEventListener("DOMContentLoaded", () => {

    const yearSelect = document.getElementById("yearSelect");
    const questionSelect = document.getElementById("questionSelect");
    const stratDropdown = document.getElementById("stratCategory");

    function fetchLineData(year, questionId) {
        fetch(`/line_data?year=${year}&question_id=${questionId}`)
            .then(res => res.json())
            .then(data => {
                stratData = data.data;
                populateStratDropdown();
                updateLineChart();
            });
    }

    function populateStratDropdown() {
        stratDropdown.innerHTML = "";
        Object.keys(stratData).forEach(cat => {
            const option = document.createElement("option");
            option.value = cat;
            option.textContent = cat;
            stratDropdown.appendChild(option);
        });
    }

    function updateLineChart() {
        const category = stratDropdown.value;
        const data = stratData[category];

        if (!data || data.length === 0) {
            document.getElementById("lineChart").innerHTML = '<p>No data available.</p>';
            return;
        }

        const trace = {
            x: data.map(d => d.Stratification1),
            y: data.map(d => d.Data_Value),
            type: 'bar',
            marker: { color: 'steelblue' }
        };

        const layout = {
            title: `📊 ${category} Breakdown`,
            xaxis: { title: category },
            yaxis: { title: 'Percentage (%)' },
            margin: { t: 30 }
        };

        Plotly.newPlot("lineChart", [trace], layout);
    }

    function updateMap(year, qid) {
        fetch(`/api/animated_data?question_id=${qid}`)
            .then(res => res.json())
            .then(({ data }) => {
                const filtered = data.filter(d => d.YearStart === year);
                const fig = {
                    data: [{
                        type: 'choropleth',
                        locationmode: 'USA-states',
                        locations: filtered.map(d => d.LocationAbbr),
                        z: filtered.map(d => d.Data_Value),
                        text: filtered.map(d => d.LocationDesc),
                        colorscale: 'Reds',
                        colorbar: { title: "Data Value" }
                    }],
                    layout: {
                        geo: { scope: 'usa' },
                        margin: { t: 10, b: 20, l: 0, r: 0 },
                        height: 600
                    }
                };

                Plotly.newPlot('map', fig.data, fig.layout);
            });
    }

    yearSelect.addEventListener('change', () => {
        const year = +yearSelect.value;
        const qid = questionSelect.value;
        updateMap(year, qid);
        fetchLineData(year, qid);
    });

    questionSelect.addEventListener('change', () => {
        const year = +yearSelect.value;
        const qid = questionSelect.value;
        updateMap(year, qid);
        fetchLineData(year, qid);
    });

    stratDropdown.addEventListener('change', updateLineChart);

    // Initial load
    const initialYear = +yearSelect.value;
    const initialQuestion = questionSelect.value;
    fetchLineData(initialYear, initialQuestion);
    updateMap(initialYear, initialQuestion);
});