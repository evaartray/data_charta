document.addEventListener('DOMContentLoaded', () => {
    fetchData();
})

function fetchData() {
    fetch("https://ghibliapi.herokuapp.com/films")
        .then(function (response) {
            if (!response.ok) {
                console.log("unsuccessful");
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(function (data) {
            console.log("successful");
            showChart(data)
        })
        .catch(function (error) {
            console.log(error);
        });
}

Chart.defaults.family = "'Roboto Light', Roboto, Arial, sans-serif";


function showChart(e) {
    let listOfRandomColors = Array.from({length: e.length}, () => "#" + Math.floor(
        Math.random() * 16777215).toString(16));
    console.log(listOfRandomColors)
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
        type: 'bar', //polarArea, bar, line
        data: {
            labels: e.map(film => film.title),
            datasets: [{
                data: e.map(score => score.rt_score),
                color: '#ffffff',
                backgroundColor: listOfRandomColors,
                borderWidth: 0,
                borderColor: '#4b4b4b',
                hoverBackgroundColor: '#ffffff',
                hoverBorderWidth: 2,
                label: 'Expert scores',
                family: "'Roboto Light', Roboto, Arial, sans-serif"
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'right',
                    padding: 20,
                    color: '#ffffff',
                },
                title: {
                    display: true,
                    text: "Rotten Tomatoes rating",
                    fontColor: "#ffe800",
                    fontSize: 20,
                    padding: 20
                }
            }
        }
    });

}

