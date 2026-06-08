async function loadWeather() {

const stn = document.getElementById("region").value;

const power = Number(document.getElementById("aircon").value);
const hour = Number(document.getElementById("hour").value);

const res = await fetch(`/api/weather?stn=${stn}`);

const data = await res.json();

const kwh = (power * hour) / 1000;
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
const cost = kwh * 150 * weatherFactor;
let recommendTemp = 26;
let saveMoney = Math.round(cost * 0.15);
const cost24 = cost * 1.14;
const cost26 = cost;
const cost28 = cost * 0.86;

document.getElementById("result").innerHTML = `
<h2>📍 ${data.region}</h2>

<p>🌡 현재기온 : ${data.temp}℃</p>
<p>💧 현재습도 : ${data.humidity}%</p>

<hr>

<p>❄ 추천 설정온도 : ${recommendTemp}℃</p>

<p>⚡ 예상 사용전력 : ${kwh.toFixed(2)} kWh</p>

<p><b>💰 예상 냉방비 : ${cost.toFixed(0)} 원</b></p>
<hr>

<h3>📊 설정온도별 비교</h3>

<p>24℃ 사용 시 : ${cost24.toFixed(0)} 원</p>

<p>26℃ 사용 시 : ${cost26.toFixed(0)} 원</p>

<p>28℃ 사용 시 : ${cost28.toFixed(0)} 원</p>

<p style="color:green">
💵 예상 절감금액 : 약 ${saveMoney} 원
</p>
`;

}