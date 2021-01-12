var done = [];

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
    let numDone = done.length;
    let numRemaining = $(".country").length
    $('#num-done').text(numDone)
    $('#num-remaining').text(numRemaining)
}

function makeCountry(country){
    let link = $(`<a class="country" href="#" onclick="selectCountry(this);"><span>${country}</span></a>`)
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
        handleCorrectInput(currentCountry);
    }
}

function handleCorrectInput(country){
    done.push(country);
    doneCountry = $('.current');
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
    let currentCountry = $('.current');
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
    let currentCountry = $('.current');
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
    let currentCountry = $('.current');
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

function textMatch(a, b){
    return a.toLowerCase() == b.toLowerCase();
}

$(document).ready(function () {
    populateAllContinents();
    refreshStats();
    selectFirst();
    $("#capital-input").on("input", function () {
        checkCapitalInput();
    });

});