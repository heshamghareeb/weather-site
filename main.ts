async function search(location:string) {
    let response:Response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${location}&days=3`);
    // console.log(t);
    
    if (response.ok && 400 != response.status) {
        let responseJson = await response.json();
        
        displayCurrent(responseJson.location, responseJson.current),
        displayAnother(responseJson.forecast.forecastday)
    }
    return null;
}


let searchInput: HTMLInputElement | null = document.querySelector("#search");
searchInput!.addEventListener("keyup", (eventInfo)=>{
    console.log('eventInfo');
    const target = eventInfo.target as HTMLInputElement;
    console.log(target.value);
    
    search(target.value)
});


var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function displayCurrent(responseCurrent:any, responseForecastday:any) {
    if (null != responseForecastday) {
        var e: Date = new Date(responseForecastday.last_updated.replace(" ", "T"));
        let n = `<div class="today forecast">\n
            <div class="forecast-header"  id="today">\n
            <div class="day">${days[e.getDay()]}</div>\n
            <div class=" date">${e.getDate() + monthNames[e.getMonth()]}</div>\n
            </div> \x3c!-- .forecast-header --\x3e\n
            <div class="forecast-content" id="current">\n
            <div class="location">${responseCurrent.name}</div>\n
            <div class="degree">\n
            <div class="num">${responseForecastday.temp_c}<sup>o</sup>C</div>\n
            <div class="forecast-icon">\n
            <img src="https:${responseForecastday.condition.icon}" alt="" width=90>\n
            </div>\t\n\n
            </div>\n
            <div class="custom">${responseForecastday.condition.text}</div>\n
            <span><img src="images/icon-umberella.png" alt="">20%</span>\n\t\t\t\t\t\t\t\t<span><img src="images/icon-wind.png" alt="">18km/h</span>\n\t\t\t\t\t\t\t\t<span><img src="images/icon-compass.png" alt="">East</span>\n    </div>\n</div>`;
        document.getElementById("forecast")!.innerHTML = n
    }
}
function displayAnother(responseCurrent:any) {
    let t = "";
    for (let e = 1; e < responseCurrent.length; e++)
        t += `
        \t<div class="forecast">\n
        <div class="forecast-header">\n
        <div class="day">${days[new Date(responseCurrent[e].date.replace(" ", "T")).getDay()]}</div>\n
        </div> \x3c!-- .forecast-header --\x3e\n
        <div class="forecast-content">\n
        <div class="forecast-icon">\n
        <img src="https:${responseCurrent[e].day.condition.icon}" alt="" width=48>\n
        </div>\n            
        <div class="degree">${responseCurrent[e].day.maxtemp_c}<sup>o</sup>C</div>\n
        <small>${responseCurrent[e].day.mintemp_c}<sup>o</sup></small>\n
        <div class="custom">${responseCurrent[e].day.condition.text}</div>\n
        </div>\n
        </div>`;
    document.getElementById("forecast")!.innerHTML += t
}


search('cairo');