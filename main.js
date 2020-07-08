const section = document.querySelector("section");

let requestURL = "https://api.openweathermap.org/data/2.5/forecast?q=Kagawa&units=metric&appid=cf470d956909ff9746801856c82275aa";
let request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "text";
request.send();

request.onload = function () {
    const weatherInfo = request.response;
    const weather = JSON.parse(weatherInfo);
    showWeather(weather);
}

function showWeather(jsonObj) {
    const weatherInfo = jsonObj.list;

    const myTable = document.createElement("table");
    for (let i = 0; i < weatherInfo.length; i++) {
        const myTr = document.createElement("tr");

        const myTd = [];
        for (let j = 0; j < 6; j++)
            myTd[j] = document.createElement("td");

        let now = weatherInfo[i];
        let date = now.dt_txt.slice(11, 16);
        let temp = (Math.round(now.main.temp * 10) / 10).toFixed(1);
        let tempMax = (Math.round(now.main.temp_max * 10) / 10).toFixed(1);
        let tempMin = (Math.round(now.main.temp_min * 10) / 10).toFixed(1);
        let weather = now.weather[0].main;
        let weatherImg = "https://openweathermap.org/img/wn/" + now.weather[0].icon + ".png";

        myTd[0].textContent = date;
        myTd[2].textContent = weather;
        myTd[3].textContent = temp + "℃";
        myTd[4].textContent = tempMax + "℃";
        myTd[5].textContent = tempMin + "℃";

        myTd[4].className = "max";
        myTd[5].className = "min";

        myTable.align = "center";

        const myImg = document.createElement("img");
        myImg.src = weatherImg;
        myTd[1].appendChild(myImg);
        myTd[1].className = "icon";

        if (date == "00:00" || i == 0) {
            const myTh = document.createElement("th");
            myTh.colSpan = 6;
            myTh.textContent = now.dt_txt.slice(5, 7) + "月" + now.dt_txt.slice(8, 10) + "日";
            myTable.appendChild(myTh);
        }

        for (let j = 0; j < 6; j++)
            myTr.appendChild(myTd[j]);

        myTable.appendChild(myTr);

        section.appendChild(myTable);
    }
}
