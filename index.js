//NASA InSight API gets temperature, wind, and pressure data from the InSight lander.
//jshint -W104

function nasaAPI() {
    fetch('https://api.nasa.gov/insight_weather/?api_key=PbSTQLOONNboqZtLh7aOkvfuXp5QMIokby4xl5Pj&feedtype=json&ver=1.0')
    .then( function(response) {
        return response.json();
    })
    .then(function(data) {
    
        let selectElement = document.querySelector("#selections");
    
        for (let i = 6; i > -1; i--) {
            let lastSevenSols = data.sol_keys[i];
            let all7Dates = data[lastSevenSols].Last_UTC;
    
            //convert UTC time to date object
            let currentDateObject = new Date(all7Dates);
            let year = currentDateObject.getUTCFullYear();
            let month = currentDateObject.toLocaleString('default', { month: 'long' });
            let day = currentDateObject.getUTCDate();
            let allDates = month + ", " + day + ", " + year;
    
            let checkForOptions = document.getElementsByTagName("option").length;

            if ( checkForOptions <= 6) {
                selectElement.add( new Option( allDates, data.sol_keys[i]) );
            }
        }
            //check what option is selected
            let options = document.querySelector("#selections");
    
            let selectionInput = options.value;
            
            //put data into variables
            let selectedDay = selectionInput;
            let lastDate = data[selectedDay].Last_UTC;
            let averageTemp = data[selectedDay].AT.av;
            let minimumTemp = data[selectedDay].AT.mn;
            let maximumTemp = data[selectedDay].AT.mx;
            let dailySamples = data[selectedDay].AT.ct;
            let averageWindSpeed = data[selectedDay].HWS.av;
            let minimumWindSpeed = data[selectedDay].HWS.mn;
            let maximumWindSpeed = data[selectedDay].HWS.mx;
            let windSamples = data[selectedDay].HWS.ct;
            let avgWindDirection = data[selectedDay].WD.most_common.compass_point;
        
            //convert UTC time to date object
            let currentDateObject = new Date(lastDate);
            let year = currentDateObject.getUTCFullYear();
            let month = currentDateObject.toLocaleString('default', { month: 'long' });
            let day = currentDateObject.getUTCDate();
            let fullDate = month + ", " + day + ", " + year;
        
            //make first letter of season capitalized
            let currentSeason = data[selectedDay].Season;
            let firstChar = currentSeason.slice(0,1);
            let restOfChars = currentSeason.slice(1,30);
            let season = firstChar.toUpperCase() + restOfChars.toLowerCase();
            
            //print variables to HTML
        
            //document.querySelector('.dateInfo').innerHTML = fullDate;
            document.querySelector('.solInfo').innerHTML = selectedDay + " sols";
            document.querySelector('.maxTempInfo').innerHTML = CelciusToFahren(maximumTemp).toFixed(2) + "F";
            document.querySelector('.minTempInfo').innerHTML = CelciusToFahren(minimumTemp).toFixed(2) + "F";
            document.querySelector('.tempInfo').innerHTML = CelciusToFahren(averageTemp).toFixed(2) + "F";
            document.querySelector('.seasonInfo').innerHTML = season;
            document.querySelector('.sampleInfo').innerHTML = dailySamples.toLocaleString();
            document.querySelector('.minimumWindSpeed').innerHTML = minimumWindSpeed + " MPH";
            document.querySelector('.maximumWindSpeed').innerHTML = maximumWindSpeed.toFixed(2) + " MPH";
            document.querySelector('.avgWindSpeed').innerHTML = averageWindSpeed + " MPH";
            document.querySelector('.windSamplesInfo').innerHTML = windSamples.toLocaleString();
            document.querySelector('.avgWindDirection').innerHTML = avgWindDirection; 
    });
}

nasaAPI();

//Converts input to celcius
function CelciusToFahren(temp) {
    return 1.8 * temp + 32;
}