async function loadWeather() {

const stn = document.getElementById("region").value;

const power = Number(document.getElementById("aircon").value);
const hour = Number(document.getElementById("hour").value);

const res = await fetch(`/api/weather?stn=${stn}`);

const data = await res.json();

const kwh = (power * hour) / 1000;
const cost = kwh * 150 * weatherFactor;
let weatherFactor = 1;

if (data.temp >= 30) {
    weatherFactor = 1.5;
}
else if (data.temp >= 25) {
    weatherFactor = 1.2;
}
else if (data.temp >= 20) {
    weatherFactor = 1.0;
}
else {
    weatherFactor = 0.8;
}
document.getElementById("result").innerHTML = `
<h2>${data.region}</h2>
<p>기온 : ${data.temp}℃</p>
<p>습도 : ${data.humidity}%</p>
<p>예상 사용전력 : ${kwh.toFixed(2)} kWh</p>
<p>예상 전기요금 : ${cost.toFixed(0)} 원</p>
`;

}