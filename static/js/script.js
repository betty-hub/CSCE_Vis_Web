document.addEventListener("DOMContentLoaded", async function () {
    const questionSelect = document.getElementById("questionSelect");

    async function updateAnimatedMap() {
        const questionId = questionSelect.value;
        const res = await fetch(`/api/animated_data?question_id=${questionId}`);
        const data = await res.json();

        const mapData = {
            type: "choropleth",
            locationmode: "USA-states",
            locations: data.map(d => d.LocationAbbr),
            z: data.map(d => d.Data_Value),
            text: data.map(d => d.LocationDesc),
            colorscale: "Reds",
            colorbar: { title: "Data Value" },
            animationframe: data.map(d => d.YearStart),
        };

        const frameData = {};
        data.forEach(d => {
            if (!frameData[d.YearStart]) frameData[d.YearStart] = [];
            frameData[d.YearStart].push({
                location: d.LocationAbbr,
                value: d.Data_Value,
                text: d.LocationDesc
            });
        });

        const frames = Object.keys(frameData).map(year => ({
            name: year,
            data: [{
                type: "choropleth",
                locationmode: "USA-states",
                locations: frameData[year].map(d => d.location),
                z: frameData[year].map(d => d.value),
                text: frameData[year].map(d => d.text),
                colorscale: "Reds"
            }]
        }));

        Plotly.newPlot("map", [{
            type: "choropleth",
            locationmode: "USA-states",
            locations: data.map(d => d.LocationAbbr),
            z: data.map(d => d.Data_Value),
            text: data.map(d => `${d.LocationDesc}<br>${d.YearStart}`),
            colorscale: "Reds",
            colorbar: { title: "Data Value" }
        }], {
            geo: { scope: "usa" },
            title: "Animated Metric by State",
            updatemenus: [{
                type: "buttons",
                direction: "right",
                x: 0.1,
                y: 0,
                showactive: false,
                buttons: [
                    {
                        label: "▶ Play",
                        method: "animate",
                        args: [null, {
                            fromcurrent: true,
                            mode: "immediate",
                            transition: { duration: 300 },
                            frame: { duration: 800, redraw: true }
                        }]
                    },
                    {
                        label: "⏸ Pause",
                        method: "animate",
                        args: [[null], {
                            mode: "immediate",
                            transition: { duration: 0 },
                            frame: { duration: 0, redraw: false }
                        }]
                    }
                ]
            }],
            sliders: [{
                active: 0,
                x: 0.1,
                len: 0.8,
                xanchor: "left",
                y: -0.1,
                yanchor: "top",
                currentvalue: {
                    visible: true,
                    prefix: "Year: ",
                    font: { size: 18, color: "#333" },
                    xanchor: "right"
                },
                transition: { duration: 300 },
                steps: Object.keys(frameData).map(year => ({
                    label: year,
                    method: "animate",
                    args: [[year], {
                        mode: "immediate",
                        frame: { duration: 500, redraw: true },
                        transition: { duration: 300 }
                    }]
                }))
            }]
        }, { frames });
    }

    questionSelect.addEventListener("change", updateAnimatedMap);
    updateAnimatedMap(); // Initial load
});
