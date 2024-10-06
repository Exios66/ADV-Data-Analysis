/* File: scripts.js */
const ctx = document.getElementById('chartCanvas').getContext('2d');
let chart;

const group1 = [60, 65, 70, 75, 80, 85, 90];
const group2 = [55, 60, 65, 70, 75, 80, 85];

function cumulativeFrequency(data) {
    let sum = 0;
    return data.map(value => (sum += value));
}

function createChart(group1Data, group2Data) {
    const labels = Array.from({ length: group1Data.length }, (_, i) => `${50 + i * 5}-${55 + i * 5}`);
    const chartType = document.getElementById('chartType').value;

    if (chart) {
        chart.config.type = chartType;
        chart.data.labels = labels;
        chart.data.datasets[0].data = group1Data;
        chart.data.datasets[1].data = group2Data;
        chart.data.datasets[2].data = cumulativeFrequency(group1Data);
        chart.update();
    } else {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(0, 123, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 123, 255, 0.1)');

        chart = new Chart(ctx, {
            type: chartType,
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Group 1 Frequency',
                        data: group1Data,
                        backgroundColor: gradient,
                        borderColor: 'rgba(0, 123, 255, 1)',
                        borderWidth: 2
                    },
                    {
                        label: 'Group 2 Frequency',
                        data: group2Data,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 2
                    },
                    {
                        label: 'Cumulative Frequency (Group 1)',
                        type: 'line',
                        data: cumulativeFrequency(group1Data),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Score Range',
                            font: {
                                size: window.innerWidth < 768 ? 12 : 16
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Frequency',
                            font: {
                                size: window.innerWidth < 768 ? 12 : 16
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        enabled: true,
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(tooltipItem) {
                                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                            }
                        }
                    },
                    zoom: {
                        zoom: {
                            enabled: true,
                            mode: 'x',
                            drag: false,
                            speed: 0.1
                        },
                        pan: {
                            enabled: true,
                            mode: 'x'
                        }
                    }
                }
            }
        });
    }
}

// Process CSV Upload
function processCSV(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const csvData = e.target.result;
            const dataRows = csvData.split('\n').slice(1);
            const group1Data = [];
            const group2Data = [];
            dataRows.forEach(row => {
                const cols = row.split(',');
                if (cols.length >= 2) {
                    group1Data.push(parseFloat(cols[0]));
                    group2Data.push(parseFloat(cols[1]));
                }
            });
            runAnalysis(group1Data, group2Data);
        };
        reader.onerror = function() {
            console.error("Error reading the file");
            alert("Error reading the file. Please make sure it is a valid CSV.");
        };
        reader.readAsText(file);
    }
}

function basicStatistics(data) {
    const mean = math.mean(data);
    const median = math.median(data);
    const variance = math.variance(data);
    const stdDev = math.std(data);
    return { mean, median, variance, stdDev };
}

function runAnalysis(group1Data = group1, group2Data = group2) {
    const analysisType = document.getElementById('analysisType').value;
    if (analysisType === 'basic') {
        const stats1 = basicStatistics(group1Data);
        const stats2 = basicStatistics(group2Data);
        displayAnalysisResults('Group 1', stats1);
        displayAnalysisResults('Group 2', stats2);
    }
    createChart(group1Data, group2Data);
}

function displayAnalysisResults(groupName, stats) {
    const resultsContainer = document.querySelector('.analysis-results') || document.createElement('div');
    resultsContainer.classList.add('analysis-results');
    resultsContainer.innerHTML += `
        <h3>${groupName} - Basic Statistics</h3>
        <ul>
            <li>Mean: ${stats.mean.toFixed(2)}</li>
            <li>Median: ${stats.median.toFixed(2)}</li>
            <li>Variance: ${stats.variance.toFixed(2)}</li>
            <li>Standard Deviation: ${stats.stdDev.toFixed(2)}</li>
        </ul>
    `;
    if (!document.querySelector('.analysis-results')) {
        document.body.appendChild(resultsContainer);
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function toggleFullscreenChart() {
    const chartContainer = document.querySelector('.chart-container');
    chartContainer.classList.toggle('fullscreen');
    const fullscreenButton = document.querySelector('.fullscreen-toggle');
    fullscreenButton.textContent = chartContainer.classList.contains('fullscreen') ? 'Exit Fullscreen' : 'Fullscreen';
}

// Initial chart rendering
runAnalysis();

document.body.insertAdjacentHTML('beforeend', `<button class="fullscreen-toggle" onclick="toggleFullscreenChart()">Fullscreen</button>`);
