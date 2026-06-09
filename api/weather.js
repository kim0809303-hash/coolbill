export default async function handler(req, res) {

    const stn = req.query.stn || "108";

    const authKey = "N-CJABuSQoWgiQAbkgKFzg";

    const tm = new Date();

    const yyyy = tm.getFullYear();
    const mm = String(tm.getMonth()+1).padStart(2,"0");
    const dd = String(tm.getDate()).padStart(2,"0");
    let hour = tm.getHours() - 1;

if(hour < 0){
    hour = 23;
}

const hh = String(hour).padStart(2,"0");

    const kmaTime = `${yyyy}${mm}${dd}${hh}00`;

    const url =
    `https://apihub.kma.go.kr/api/typ01/url/kma_sfctm2.php?tm=${kmaTime}&stn=${stn}&help=0&authKey=${authKey}`;

    try {

        const response = await fetch(url);

        const text = await response.text();

        const lines = text
        .split("\n")
        .filter(line => !line.startsWith("#"));

        const dataLine = lines[0];

        const arr = dataLine.trim().split(/\s+/);
        console.log("DATA:", dataLine);
console.log("ARR:", arr);
        console.log(arr);
    const regionName = {
  "108":"서울",
  "159":"부산",
  "143":"대구",
  "156":"광주",
  "133":"대전",
  "112":"인천",
  "119":"수원",
  "131":"청주",
  "138":"포항",
  "152":"울산",
  "184":"제주",
  "129":"서산",
  "135":"추풍령",
  "140":"군산",
  "146":"전주",
  "155":"창원",

  "192":"진주",
  "105":"강릉",
  "101":"춘천",
  "114":"원주",
  "90":"속초",
  "127":"충주",
  "168":"여수",
  "165":"목포",
  "170":"완도",
  "189":"서귀포",
  "188":"성산",
  "136":"안동",
  "137":"상주",
  "130":"울진",
  "115":"울릉도"
};
        res.status(200).json({
           region: regionName[stn],
            temp: arr[11],
            humidity: arr[13]
        });

    } catch(error){

        res.status(500).json({
            error:"기상청 API 호출 실패"
        });

    }

}