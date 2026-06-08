async function loadWeather() {

const stn = document.getElementById("region").value;

const res = await fetch(`/api/weather?stn=${stn}`);

const data = await res.json();

document.getElementById("result").innerHTML = `
<h2>${data.region}</h2>
<p>기온 : ${data.temp}℃</p>
<p>습도 : ${data.humidity}%</p>
`;

}