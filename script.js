let months = {
    0:"February",
    1:"March",
    2:"April",
    3:"May",
    5:"June",
    6:"July",
    7:"August",
    8:"September",
    9:"October",
    10:"November",
    11:"December",
    12:"January",
}; let date = {
    1:"Monday",
    2:"Tuesday",
    3:"Wednesday",
    4:"Thursday",
    5:"Friday",
    6:"Saturday",
    7:"Sunday"
}
const latitude = 38.55;
const longitude = 68.72;
const timezone = "Asia/Dushanbe"
let nwew = date[new Date().getDay()]
let wnew = new Date().getDate() +" "+ months[new Date().getMonth()]
let [continent,country] = timezone.split("/")
setInterval(() => {
   const date = new Date()
document.querySelector(".time").textContent = date.toLocaleTimeString()
});
document.querySelector(".new").textContent = nwew
document.querySelector(".years").textContent = wnew
document.querySelector(".country").textContent =  country
async function getWeather() {
    try {
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode&timezone=${timezone}`);
        const { data } = response;
        const temperature = data.hourly.temperature_2m[0];
        const weatherCode = data.hourly.weathercode[0];
        let description = "";
        switch (weatherCode) {
            case 0:
                description = "Ясно";
                break;
            case 1:
            case 2:
            case 3:
                description = "Частичные облака";
                break;
            case 45:
            case 48:
                description = "Туман";
                break;
            case 51:
            case 53:
            case 55:
                description = "Дождь";
                break;
            default:
                description = "Неизвестно";
                break;
        }
        document.getElementById('weather').innerHTML = `
            <h1 class="temp">${temperature}°C</h1>
            <h1 class="description">${description}</h1>
        `;
    } catch (error) {
        document.getElementById('error').textContent = "Нашид чзе";
        console.error(error);
    }
} getWeather();