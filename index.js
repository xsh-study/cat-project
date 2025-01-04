let cats = [];
let catCage = [];
let myChart;
let myGenderChart;
let mySizeChart;


function loadData() {
    fetch("./data/cats.json")
        .then(response => response.json())
        .then(data => {
            cats = data;
            cats.forEach(cat => {
                try {
                    cat.med_photos = JSON.parse(cat.med_photos.replace(/'/g, '"'));
                } catch (e) {
                    console.error("Error parsing med_photos", cat.med_photos, e);
                    cat.med_photos = [];
                }
            });
        })
        .then(() => {
            renderCatInfo();
            renderGenderChart();
            renderSizeChart();
        })
        .catch(error => {
            console.error("Error loading cat data:", error);
        });
}


function renderCatInfo(cat) {
    const catInfoList = document.getElementById("cat-info-list");
    if (!cat) {
        catInfoList.innerHTML = "";
        return;
    }
    catInfoList.innerHTML = `
        <ul>
            <li>
              <p><strong>ID:</strong> ${cat.id}</p>
                <p><strong>Breed:</strong> ${cat.breed}</p>
                <p><strong>Age:</strong> ${cat.age}</p>
                <p><strong>Gender:</strong> ${cat.gender}</p>
                <p><strong>Size:</strong> ${cat.size}</p>
                 <p><strong>Coat:</strong> ${cat.coat}</p>
                <img src="${cat.med_photos[0]}" alt="${cat.breed}" style="max-width: 300px; margin-top: 10px;">
            </li>
        </ul>
    `;
}


function renderCage() {
    const cageListElement = document.getElementById("cat-cage-list");
    cageListElement.innerHTML = `<ul>${catCage.map(cat => `<li>
        <p><strong>ID:</strong> ${cat.id}</p>
      </li>`).join("")}</ul>`;
}


function catchCat() {
    if (cats.length === 0) {
        alert("No more cats to catch!");
        return;
    }
    const randomIndex = Math.floor(Math.random() * cats.length);
    const catToDisplay = cats[randomIndex];
    cats.splice(randomIndex, 1);
    renderCatInfo(catToDisplay);
    catCage.push(catToDisplay);
    renderCage();
    renderChart();
    renderGenderChart();
    renderSizeChart();
    console.log("Caught a cat",catToDisplay)
}


function releaseAllCats() {
    alert("All cats have been released!");
    location.reload();
}


function renderChart() {
    const chartContainer = document.querySelector('.statistics-section');
    let canvasElement = document.getElementById('breed-chart');
    const ctx = canvasElement ? canvasElement.getContext('2d') : null;

    try {
        if (catCage.length === 0) {
            if (myChart) {
                myChart.destroy();
                myChart = null;
            }
            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Breed Distribution',
                        data: [],
                        backgroundColor: ['#f0f0f0'],
                        borderWidth: 0
                    }]
                },
                options: {
                    indexAxis: 'y',
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
            return;
        }

        const breedCounts = catCage.reduce((counts, cat) => {
            counts[cat.breed] = (counts[cat.breed] || 0) + 1;
            return counts;
        }, {});

        const breedLabels = Object.keys(breedCounts);
        const breedData = Object.values(breedCounts);


        if (myChart) {
            myChart.data.labels = breedLabels;
            myChart.data.datasets[0].data = breedData;
            myChart.data.datasets[0].backgroundColor = [
                '#FF6384',  // Red
                '#36A2EB',  // Blue
                '#FFCE56',  // Yellow
                '#4BC0C0',  // Cyan
                '#9966FF',  // Purple
                '#FF9F40',  // Orange
                '#42f56c',  // Lime green
                '#f542d1',    // Pink
                '#b042f5',    // Violet
                '#42e0f5',   // Light blue
                '#f5a442',  // Gold
                '#42f5b3',  // Grass green
                '#a342f5',  // Indigo
                '#f54242'  // Scarlet
            ];
            myChart.update();
        } else {
            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: breedLabels,
                    datasets: [{
                        label: 'Breed Distribution',
                        data: breedData,
                        backgroundColor:[
                            '#FF6384',  // Red
                            '#36A2EB',  // Blue
                            '#FFCE56',  // Yellow
                            '#4BC0C0',  // Cyan
                            '#9966FF',  // Purple
                            '#FF9F40',  // Orange
                            '#42f56c',  // Lime green
                            '#f542d1',    // Pink
                            '#b042f5',    // Violet
                            '#42e0f5',   // Light blue
                            '#f5a442',  // Gold
                            '#42f5b3',  // Grass green
                            '#a342f5',  // Indigo
                            '#f54242'  // Scarlet
                        ]
                    }]
                },
                options: {
                    indexAxis: 'y',
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }
    } catch (error) {
        console.error("renderChart function error:", error);
    }
}


function renderGenderChart() {
    const chartContainer = document.querySelector('.statistics-section');
    let canvasElement = document.getElementById('gender-chart');
    const ctx = canvasElement ? canvasElement.getContext('2d') : null;

    try {
        if (catCage.length === 0) {
            if (myGenderChart) {
                myGenderChart.destroy();
                myGenderChart = null;
            }
            myGenderChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Gender Distribution',
                        data: [],
                        backgroundColor: ['#f0f0f0'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: false,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true
                        }
                    }
                }
            });
            return;
        }

        const genderCounts = catCage.reduce((counts, cat) => {
            counts[cat.gender] = (counts[cat.gender] || 0) + 1;
            return counts;
        }, {});

        const genderLabels = Object.keys(genderCounts);
        const genderData = Object.values(genderCounts);


        if (myGenderChart) {
            myGenderChart.data.labels = genderLabels;
            myGenderChart.data.datasets[0].data = genderData;
            myGenderChart.data.datasets[0].backgroundColor = [
                '#FF6384', // Red
                '#36A2EB',  // Blue
            ];
            myGenderChart.update();
        } else {
            myGenderChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: genderLabels,
                    datasets: [{
                        label: 'Gender Distribution',
                        data: genderData,
                        backgroundColor: [
                            '#FF6384', // Red
                            '#36A2EB',  // Blue
                        ]
                    }]
                },
                options: {
                    responsive: false,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true
                        }
                    }
                }
            });
        }
    } catch (error) {
        console.error("renderGenderChart function error:", error);
    }
}


function renderSizeChart() {
    const chartContainer = document.querySelector('.statistics-section');
    let canvasElement = document.getElementById('size-chart');
    const ctx = canvasElement ? canvasElement.getContext('2d') : null;
    try {
        if (catCage.length === 0) {
            if (mySizeChart) {
                mySizeChart.destroy();
                mySizeChart = null;
            }
            mySizeChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Size Distribution',
                        data: [],
                        backgroundColor:['#f0f0f0'],
                        borderWidth: 0
                    }]
                },
                options: {
                    scales: {
                        x: {
                            display: false
                        },
                        y: {
                            display: false
                        }
                    },
                    plugins:{
                        legend: {
                            display: false
                        }
                    }
                }
            });
            return;
        }


        const sizeCounts = catCage.reduce((counts, cat) => {
            counts[cat.size] = (counts[cat.size] || 0) + 1;
            return counts;
        }, {});

        const sizeLabels = Object.keys(sizeCounts);
        const sizeData = Object.values(sizeCounts);


        if (mySizeChart) {
            mySizeChart.data.labels = sizeLabels;
            mySizeChart.data.datasets[0].data = sizeData;
            mySizeChart.data.datasets[0].backgroundColor = [
                '#FF6384', // Red
                '#36A2EB',  // Blue
                '#FFCE56',   // Yellow
            ];
            mySizeChart.options.scales.x.display = true;
            mySizeChart.options.scales.y.display = true;
            mySizeChart.update();
        } else {
            mySizeChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: sizeLabels,
                    datasets: [{
                        label: 'Size Distribution',
                        data: sizeData,
                        backgroundColor: [
                            '#FF6384', // Red
                            '#36A2EB',  // Blue
                            '#FFCE56',   // Yellow
                        ]
                    }]
                },
                options: {
                    plugins:{
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            display: true
                        },
                        y: {
                            display: true
                        }
                    }
                }
            });
        }
    } catch (error) {
        console.error("renderSizeChart function error:", error);
    }
}

document.getElementById("catch-cat-btn").addEventListener("click", catchCat);
document.getElementById("release-cats-btn").addEventListener("click", releaseAllCats);
loadData();