export default async function handler(req, res) {

    const stn = req.query.stn || "108";

    const authKey = "N-CJABuSQoWgiQAbkgKFzg";

    const tm = new Date();

    const yyyy = tm.getFullYear();
    const mm = String(tm.getMonth()+1).padStart(2,"0");
    const dd = String(tm.getDate()).padStart(2,"0");
    const hh = String(tm.getHours()).padStart(2,"0");

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

        res.status(200).json({
            region: stn,
            temp: arr[11],
            humidity: arr[13]
        });

    } catch(error){

        res.status(500).json({
            error:"기상청 API 호출 실패"
        });

    }

}