//NASA InSight API gets temperature, wind, and pressure data from the InSight lander.
//jshint -W104
fetch('https://api.nasa.gov/insight_weather/?api_key=PbSTQLOONNboqZtLh7aOkvfuXp5QMIokby4xl5Pj&feedtype=json&ver=1.0')
.then( function(response) {
    return response.json();
})
.then(function(data) {
    let latestDay = data.sol_keys[6];
    let averageTemp = data[latestDay].AT.av;
    let minimumTemp = data[latestDay].AT.mn;
    let maximumTemp = data[latestDay].AT.mx;
    let dailySamples = data[latestDay].AT.ct;
    let lastDate = data[latestDay].Last_UTC;

    let currentSeason = data[latestDay].Season;
    let firstChar = currentSeason.slice(0,1);
    let restOfChars = currentSeason.slice(1,30);
    let season = firstChar.toUpperCase() + restOfChars.toLowerCase();
    

    //Dates and stuff
    let currentDateObject = new Date(lastDate);
    let year = currentDateObject.getUTCFullYear();
    let month = currentDateObject.getUTCMonth() + 1;
    let day = currentDateObject.getUTCDate();
    let fullDate = month + "-" + day + "-" + year;

    document.querySelector('.dateInfo').innerHTML = fullDate;
    document.querySelector('.maxTempInfo').innerHTML = CelciusToFahren(maximumTemp).toFixed(2) + "F";
    document.querySelector('.minTempInfo').innerHTML = CelciusToFahren(minimumTemp).toFixed(2) + "F";
    document.querySelector('.tempInfo').innerHTML = CelciusToFahren(averageTemp).toFixed(2) + "F";
    document.querySelector('.seasonInfo').innerHTML = season;
});

//Converts input to celcius
function CelciusToFahren(temp) {
    return 1.8 * temp + 32;
}


/* Console logs

console.log("Current date: " + currentDateObject);
    console.log("Maximum temp: " + CelciusToFahren(maximumTemp).toFixed(2) + "F" );
    console.log("Minimum temp: " + CelciusToFahren(minimumTemp).toFixed(2) + "F" );
    console.log("Average temp: " + CelciusToFahren(averageTemp).toFixed(2) + "F");
    console.log("The current season in Elysium Planitia is " + currentSeason);
    console.log("Number of samples collected on this day " + dailySamples);
    console.log(fullDate);

    */