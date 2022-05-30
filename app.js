document.addEventListener('DOMContentLoaded', () => {
    fetchData();
})

async function fetchData() {
    await fetch("https://ghibliapi.herokuapp.com/films")
        .then(function (response) {
            if (!response.ok) {
                console.log("unsuccessful");
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(function (data) {
            console.log("successful");
            showChart(data);
            showTable(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

Chart.defaults.family = "'Roboto Light', Roboto, Arial, sans-serif";


function showChart(e) {
    let listOfRandomColors = Array.from({length: e.length}, () => "#" + Math.floor(
        Math.random() * 16777215).toString(16));
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
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
                    beginAtZero: true,
                    grid: {
                        color: "#777777"
                    }
                },
                x: {
                    grid: {
                        color: "#777777"
                    }
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
function showTable(e) {
    e.forEach((film) => {
        const titles = film.title;
        const scores = film.rt_score;
        const years = film.release_date;
        const directors = film.director;

        // let listTitles = [];
        // titles.forEach(function (el) {
        //     listTitles.push("<td>" + el + "</td>")
        // });
        //
        // let listYears = [];
        // years.forEach(function (el) {
        //     listYears.push("<td>" + el + "</td>")
        // });
        //
        // let listDirs = [];
        // directors.forEach(function (el) {
        //     listDirs.push("<td>" + el + "</td>")
        // });
        //
        // let listScores = [];
        // scores.forEach(function (el) {
        //     listScores.push("<td>" + el + "</td>")
        // });

        const elem = document.createElement('tr');
        elem.className = "rows";
        elem.innerHTML = `
            <tr>
                <td>${titles}</td>
                <td>${years}</td> 
                <td>${directors}</td>
                <td>${scores}</td>
            </tr>
        `
        document.getElementById('tableContent').appendChild(elem);


    })
}
