// Setting Config to Global
var config;


// hide feed
function feedHide(){
    var x = document.getElementById('feedTable');
    if(x.rows.length == 0){
        document.getElementById("feed").style.display = "none";
        return;
    } else{
        document.getElementById("feed").style.display = "inline";
    }
    for(i=0; i < x.rows.length; i++){
        if(x.rows[i].style["cssText"] == "background: yellow;"){
            warningToggle(true);
            return;
        }
    }
    
}

function warningToggle(fromFeed){
    if(fromFeed){
        if(document.getElementById("1st").className == "w3-container w3-green w3-padding-16"){
            document.getElementById("1st").className = "w3-container w3-red w3-padding-16";
            document.getElementById("2nd").className = "w3-container w3-red w3-padding-16";
            document.getElementById("3rd").className = "w3-container w3-red w3-padding-16";
            document.getElementById("4th").className = "w3-container w3-red w3-padding-16";
            return;
        } else{
            return;
        }

    }
    if(document.getElementById("1st").className == "w3-container w3-green w3-padding-16"){
        document.getElementById("1st").className = "w3-container w3-red w3-padding-16";
        document.getElementById("2nd").className = "w3-container w3-red w3-padding-16";
        document.getElementById("3rd").className = "w3-container w3-red w3-padding-16";
        document.getElementById("4th").className = "w3-container w3-red w3-padding-16";


    } else {
        document.getElementById("1st").className = "w3-container w3-green w3-padding-16";
        document.getElementById("2nd").className = "w3-container w3-green w3-padding-16";
        document.getElementById("3rd").className = "w3-container w3-green w3-padding-16";
        document.getElementById("4th").className = "w3-container w3-green w3-padding-16";

    }
}


// Toggle between showing and hiding the sidebar, and add overlay effect
function sidebarToggle() {
    var mySidebar = document.getElementById("mySidebar");
    var overlayBg = document.getElementById("myOverlay");
    if (mySidebar.style.display === 'block') {
        mySidebar.style.display = 'none';
        overlayBg.style.display = "none";
    } else {
        mySidebar.style.display = 'block';
        overlayBg.style.display = "block";
  }
}


function loadPage() {
    document.getElementById("devicesNumber").innerText = config.devices.length;
    weatherLoad();
    document.getElementById("usernameText").innerHTML = "Welcome, <strong>" + config.name + "</strong>";
    
}

function weatherLoad(){
    var weather;
    fetch("http://api.openweathermap.org/geo/1.0/zip?zip=" + config.zipCode + ",US&appid=" + config.APIKey)  
        .then((resp) => resp.json() )
            .then((data) => 
            fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + data.lat + "&lon=" + data.lon + "&appid=" + config.APIKey + "&units=" + config.units)
            .then((resp) => resp.json()).then((data) => function(){
                weather = data;
                var temp;
                switch(weather.weather[0].main){

                    case "Clouds":
                        temp = "fa fa-cloud";
                        break;

                    case "Rain":
                        temp = "fa fa-cloud-rain";
                        break;
                    
                    case "Thunderstorm":
                        temp = "fa fa-cloud-bolt";
                        addFeed("Thunderstorm Warning", true);
                        break;

                    case "Snow":
                        temp = "fa fa-snowflake";
                        break;

                    case "Drizzle":
                        temp = "fa fa-cloud-rain";
                        break;

                    case "Mist":
                        temp = "fa-solid fa-smog";
                        break;

                    case "Haze":
                        temp = "fa-solid fa-smog";
                        break;

                    case "Smoke":
                        temp = "fa-solid fa-fire";
                        addFeed("Smoke Warning", true);
                        break;

                    case "Dust":
                        temp = "fa-solid fa-smog";
                        break;

                    case "Fog":
                        temp = "fa-solid fa-smog";
                        addFeed("Fog Warning", true);
                        break;

                    case "Ash":
                        temp = "fa-solid fa-volcano";
                        addFeed("Ash Warning", true);
                        break;

                    case "Sand":
                        temp = "fa-solid fa-umbrella-beach";
                        break;

                    case "Squall":
                        temp = "fa fa-cloud-rain";
                        break;

                    case "Tornado":
                        temp = "fa-solid fa-tornado";
                        addFeed("Tornado Warning", true);
                        break;
                    
                    default:
                        temp = "fa fa-cloud";
                        break;

                }
                document.getElementById("weatherIcon").className = temp + " w3-xxxlarge";
                document.getElementById("weatherNumber").innerText = weather.main.temp + function(){

                    if(config.units == "imperial"){
                        return " °F"
                    } else {
                        return  " °C"
                    }

                }();


            }()));


}

function addFeed(message, urgent){
    var tbodyRef = document.getElementById('feedTable').getElementsByTagName('tbody')[0];

    // Insert a row at the end of table
    var newRow = tbodyRef.insertRow();
    if(urgent){
        newRow.style="background:yellow;"
        warningToggle(true);
    }
    
    // Insert a cell at the end of the row
    var newCell = newRow.insertCell();
    
    // Append a text node to the cell
    var newText = document.createTextNode(message);
    newCell.appendChild(newText);
    feedHide();

}


// Get device data
fetch('/config/config.json').then((response) => response.json()).then((json) => config=json).then(
    fetch('/config/devices.json').then((response) => response.json()).then((json) => 
    function(){
    config["devices"] = json;
    loadPage();
    }()
));