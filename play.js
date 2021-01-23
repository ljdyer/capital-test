const fuzzyMatchMinScore = .5
var done = {};

function populateAllContinents(){
    populateContinent($('#africa'), africaCapitals);
    populateContinent($('#asia'), asiaCapitals);
    populateContinent($('#europe'), europeCapitals);
    populateContinent($('#north-america'), northAmericaCapitals);
    populateContinent($('#oceania'), oceaniaCapitals);
    populateContinent($('#south-america'), southAmericaCapitals);
}

function populateContinent(continentDiv, capitalsObject){
    let keys = Object.keys(capitalsObject);
    for (i=0; i<keys.length; i++) {
        continentDiv.append(makeCountry(keys[i]))
    }
}

function refreshStats(){
    let numDone = Object.keys(done).length;
    let numRemaining = $(".country").length
    $('#num-done').text(numDone);
    $('#num-remaining').text(numRemaining);
}

function makeCountry(country){
    let link = $(`<a class="country" href="#" onclick="selectCountry(this);"><span>${country}</span></a>`);
    return link;
}

function selectCountry(link){
    let country = $(link).text();
    $('#current-country').text(country);
    removeCurrentClassFromAllCountries();
    $(link).addClass('current');
    $('#capital-input').val('');
    $('#capital-input').focus();
}

function removeCurrentClassFromAllCountries(){
    $('.country').removeClass('current');
}

function checkCapitalInput(){
    let currentCountry = $('#current-country').text();
    let currentCapital = allCapitals[currentCountry];
    currentVal = $("#capital-input").val();
    if (textMatch(currentVal, currentCapital)){
        handleCorrectInput(currentCountry, currentVal);
    }
}

function handleCorrectInput(country, currentVal){
    done[country] = currentVal;
    let doneCountry = getCurrentCountryLink();
    selectNext();
    doneCountry.remove();
    refreshStats();
}

function selectFirst() {
    let allCountries = $('.country');
    let newCountry = allCountries.eq(0);
    selectCountry(newCountry);
}

function selectNext(){
    let currentCountry = getCurrentCountryLink();
    let allCountries = $('.country');
    let currentIndex = allCountries.index(currentCountry);
    let totalCountries = allCountries.length;
    let newIndex = 0;
    if (currentIndex < totalCountries - 1){
        newIndex = currentIndex + 1
    }
    let newCountry = allCountries.eq(newIndex);
    selectCountry(newCountry);
}

function selectPrevious(){
    let currentCountry = getCurrentCountryLink();
    let allCountries = $('.country');
    let currentIndex = allCountries.index(currentCountry);
    let totalCountries = allCountries.length;
    let newIndex = totalCountries - 1;
    if (currentIndex > 0) {
        newIndex = currentIndex - 1
    }
    let newCountry = allCountries.eq(newIndex);
    selectCountry(newCountry);
}

function selectRandom() {
    let currentCountry = getCurrentCountryLink();
    let allCountries = $('.country');
    let currentIndex = allCountries.index(currentCountry);
    let totalCountries = allCountries.length;
    let newIndex = currentIndex;
    while (newIndex == currentIndex){
        newIndex = getRandomInt(0, totalCountries - 1);
    }
    let newCountry = allCountries.eq(newIndex);
    selectCountry(newCountry);
}

function getRandomInt(min, max){
    randomInt = Math.floor(Math.random() * max - min + 1) + min;
    return randomInt;
}

function revealCapital(){
    let currentCountry = getCurrentCountryLink();
    let currentCountryName = getCurrentCountryName();
    let currentCapitalName = allCapitals[currentCountryName];
    let currentVal = $("#capital-input").val();
    let fuzzyMatchScore = 0;
    if (currentVal.length > 0){
        fuzzyMatchScore = getFuzzyMatchScore(currentCapitalName, currentVal);
    }

    alertText = `
        The capital of ${currentCountryName} is: ${currentCapitalName}\n
        You entered: ${currentVal}\n
        Fuzzy match score: ${fuzzyMatchScore.toFixed(1)} (minimum is ${fuzzyMatchMinScore})\n\n
    `
    if (fuzzyMatchScore >= fuzzyMatchMinScore){
        alertText += 'You were given the benefit of the doubt and awarded a point!'
        handleCorrectInput(currentCountryName, currentVal);
    }
    else{
        alertText += 'Better luck next time!'
    }
    alert(alertText);

    selectNext();
    currentCountry.remove();
    refreshStats();
}

function getCurrentCountryLink(){
    return $('.current');
}

function getCurrentCountryName(){
    return $('.current').text();
}

function textMatch(a, b){
    return a.toLowerCase() == b.toLowerCase();
}

function getFuzzyMatchScore(a,b){
    f = FuzzySet();
    f.add(a);
    fuzzyMatchResult = f.get(b);
    if (fuzzyMatchResult == null){
        return 0;
    }
    else{
        return fuzzyMatchResult[0][0];
    }
}

function toResults(){
    console.log("Going to results...");
    localStorage.setItem("results", JSON.stringify(done));
    window.location.href = "results.php";
}

$(document).ready(function () {

    populateAllContinents();
    refreshStats();
    selectFirst();

    $("#capital-input").on("input", function () {
        checkCapitalInput();
    });

    $(document).keydown(function (event) {
        if (event.ctrlKey || event.metaKey){
            switch (event.which){
                case 37: {// Left
                    selectPrevious();
                    break;
                }
                case 39: { // Right
                    selectNext();
                    break;
                }
                case 38: { // Up
                    selectRandom();
                    break;
                }
                case 40: { // Down
                    revealCapital();
                    break;
                }
            }
        }
    });

});