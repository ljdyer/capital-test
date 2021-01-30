const fuzzyMatchMinScore = .5
var done = {};
var incorrect = {};

// $('.element').fadeTo(100, 0.3, function () { $(this).fadeTo(500, 1.0); });


$(document).ready(function () {
    populateAllContinents();
    refreshStats();
    selectFirst();
    $("#capital-input").on("input", function () {
        checkCapitalInput();
    });
    $(document).keydown(function (event) {
        handleKeydown(event);
    });
});

function populateAllContinents() {
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

function makeCountry(country) {
    let link = $(`<a class="country" href="#" onclick="selectCountry(this);"><span>${country}</span></a>`);
    return link;
}

function selectCountry(link) {
    let country = $(link).text();
    $('#current-country').text(country);
    removeCurrentClassFromAllCountries();
    $(link).addClass('current');
    $('#capital-input').val('');
    $('#capital-input').focus();
}

function removeCurrentClassFromAllCountries() {
    $('.country').removeClass('current');
}

function refreshStats(){
    let numDone = Object.keys(done).length;
    let numRemaining = $(".country").length
    $('#num-done').text(numDone);
    $('#num-remaining').text(numRemaining);
}

function checkCapitalInput(){
    let currentCountry = $('#current-country').text();
    let currentCapital = allCapitals[currentCountry];
    currentInput = $("#capital-input").val();
    if (textMatch(currentInput, currentCapital)){
        showAlert("green", "Correct! 1 point scored.");
        handleCorrectInput(currentInput);
    }
    else{
        checkForIncorrectInput(currentCountry, currentInput);
    }
}

function checkForIncorrectInput(currentCountry, currentInput){
    let allOtherCountryNames = Object.keys(allCapitals).filter(x=> x!=currentCountry);
    for (let i=0; i<allOtherCountryNames.length; i++){
        let thisCountry = allOtherCountryNames[i];
        if (textMatch(allCapitals[thisCountry], currentInput)){
            handleIncorrectCountry(thisCountry, currentInput);
        }
    }
    return false;
}

// === Input handlers ===

function handleCorrectInput(input){
    let currentCountryName = getCurrentCountryName();
    done[currentCountryName] = input;
    removeCurrentAndSelectNext();
    refreshStats();
}

function handleIncorrectCountry(country, input){
    let currentCountryName = getCurrentCountryName();
    incorrect[currentCountryName] = input;
    showAlert("red", `${input} is the capital of ${country}, not ${currentCountryName}!<br>
        ${country} and ${currentCountryName} removed from list. 0 points scored.`);
    removeCurrentAndSelectNext();
    removeCountryLink(country);
    refreshStats();
}

function handleIncorrectCapital(input){
    let currentCountryName = getCurrentCountryName();
    incorrect[currentCountryName] = input;
    removeCurrentAndSelectNext();
    refreshStats();
}

function removeCurrentAndSelectNext(){
    let currentCountryLink = getCurrentCountryLink();
    selectNext();
    currentCountryLink.remove();
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
    let currentCountryName = getCurrentCountryName();
    let currentCapitalName = allCapitals[currentCountryName];
    let currentInput = $("#capital-input").val();
    let fuzzyMatchScore = 0;
    if (currentInput.length > 0){
        fuzzyMatchScore = getFuzzyMatchScore(currentCapitalName, currentInput);
    }

    if (fuzzyMatchScore >= fuzzyMatchMinScore){

        alertText = `
            The capital of ${currentCountryName} is ${currentCapitalName}.<br>
            But you were close enough (fuzzy match score: ${fuzzyMatchScore.toFixed(1)})! 1 point awarded.
        `
        showAlert("orange", alertText);
        handleCorrectInput(currentInput);
    }
    else{
        alertText = `
            The capital of ${currentCountryName} is ${currentCapitalName}, not ${currentInput}.<br>
            0 points awarded.
        `
        showAlert("red", alertText);
        handleIncorrectCapital(currentInput);
    }
}

function removeCountryLink(country){
    let allCountries = $('.country');
    let link = jQuery.grep(allCountries, x=>x.text==country);
    if ($(link[0]).hasClass("current")){
        selectNext();
    }
    if (link.length){
        link[0].remove();
    }
}

function getCurrentCountryLink(){
    return $('.current');
}

function getCurrentCountryName(){
    return $('.current').text();
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

function getName(){
    let nameInput = $(`<input type="text" id="name-input" maxlength="3" size="5"></input>`)
        .keyup(function(event){
            if (event.which == 13){
                if ($(this).val().length == 3) {
                    toResults();
                }    
            }
            if ($(this).val().length == 3){
                $("#go-button").prop('disabled', false);
            }
            else {
                $("#go-button").prop('disabled', true);
            }
        })
    $('#to-results')
        .empty()
        .append(`<h2>Enter your 3-letter nickname and click GO!</h2>`)
        .append(nameInput)
        .append(`<button type="button" id="go-button" onClick="toResults()" disabled>GO</button>`)
        .append(`<p>Use the same name every time to track your best score and see how you compare with other players!</p>`)
    nameInput.focus();
}


function toResults(){
    localStorage.setItem("correct", JSON.stringify(done));
    localStorage.setItem("incorrect", JSON.stringify(incorrect));
    localStorage.setItem("username", $('#name-input').val().toUpperCase());
    window.location.href = "results.php";
}

function handleKeydown(event) {
    if (event.ctrlKey || event.metaKey) {
        switch (event.which) {
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
}

function showAlert(color, text){
    $('#alert-text').fadeOut(300, function(){$(this).css({color: color}).html(text).fadeIn(300)});
}