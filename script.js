async function loadWeather() {

const stn = document.getElementById("region").value;

const power = Number(document.getElementById("aircon").value);
const hour = Number(document.getElementById("hour").value);
const sizeFactor = Number(document.getElementById("size").value);

const res = await fetch(`/api/weather?stn=${stn}`);

const data = await res.json();

const kwh = (power * hour * sizeFactor) / 1000;
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

터

<p style="color:green">
💵 예상 절감금액 : 약 ${saveMoney} 원
</p>
<h3>📊 설정온도별 비교</h3>

<table border="1" style="margin:auto; border-collapse:collapse;">
<tr>
<th>설정온도</th>
<th>예상요금</th>
</tr>

<tr>
<td>24℃</td>
<td>${Math.round(cost * 1.3)}원</td>
</tr>

<tr>
<td>25℃</td>
<td>${Math.round(cost * 1.15)}원</td>
</tr>

<tr>
<td>26℃</td>
<td>${Math.round(cost)}원</td>
</tr>

<tr>
<td>27℃</td>
<td>${Math.round(cost * 0.9)}원</td>
</tr>

<tr>
<td>28℃</td>
<td>${Math.round(cost * 0.8)}원</td>
</tr>

</table>
`;

}