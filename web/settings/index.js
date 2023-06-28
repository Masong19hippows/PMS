// Setting Config to Global
var config;


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


// Get device data
fetch('/config/config.json').then((response) => response.json()).then((json) => config=json).then(
    fetch('/config/devices.json').then((response) => response.json()).then((json) => 
    function(){
    config["devices"] = json;
    document.getElementById("nameText").value = config.name;
    document.getElementById("zipText").value = config.zipCode;
    document.getElementById("APIText").value = config.APIKey;
    switch(config.units){
        case "imperial":
            document.getElementById("unitText").selectedIndex = 0;
            break;

        case "metric":
            document.getElementById("unitText").selectedIndex = 1;
            break;

        case "standard":
            document.getElementById("unitText").selectedIndex = 2;
            break;

        default:
            document.getElementById("unitText").selectedIndex = 0;
            break;
    }
    document.getElementById("usernameText").innerHTML = "Welcome, <strong>" + config.name + "</strong>";
    }()

    
));