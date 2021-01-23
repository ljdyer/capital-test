var rememberedColumn = 1;
var spellingColumn = 1;
var notRememberedColumn = 1;

var numRemembered = 0;
var numSpelling = 0;
var numNotRemembered = 0;

var remembered = [];
var spelling = {};
var guessedIncorrectly = {};
var notRemembered = [];

function addRemembered(){
    rememberedText = remembered.map(function(country){
        return `${country}: ${allCapitals[country]}`
    });
    let columnHolder = columnizeText(rememberedText, 3);
    $('#remembered').append(columnHolder);
    $('#num-remembered').text(remembered.length);
}

function addSpelling(){
    spellingText = Object.keys(spelling).map(function(country){
        return `${country}: <span class="incorrect">${spelling[country]}</span> <span class="correct">${allCapitals[country]}</span>`
    });
    let columnHolder = columnizeText(spellingText, 3);
    $('#spelling').append(columnHolder);
    $('#num-spelling').text(Object.keys(spelling).length);
}

function addGuessedIncorrectly(){
    guessedIncorrectlyText = Object.keys(guessedIncorrectly).map(function(country){
        return `${country}: <span class="incorrect">${guessedIncorrectly[country]}</span> <span class="correct">${allCapitals[country]}</span>`
    });
    let columnHolder = columnizeText(guessedIncorrectlyText, 3);
    $('#incorrect').append(columnHolder);
    $('#num-incorrect').text(Object.keys(spelling).length);
}

function addNotRemembered(){
    notRememberedText = notRemembered.map(function(country){
        return `${country}: ${allCapitals[country]}`
    });
    let columnHolder = columnizeText(notRememberedText, 3);
    $('#not-remembered').append(columnHolder);
    $('#num-not-remembered').text(notRemembered.length);
}

function addScoreSummary(){
    let numCorrect = remembered.length + Object.keys(spelling).length;
    let numTotal = Object.keys(allCapitals).length;
    let percentCorrect = percentToTwoDp(numCorrect, numTotal);

    let text = `You remembered <strong>${numCorrect}</strong> out of <strong>${numTotal}</strong> capitals (${percentCorrect}%).`;
    $('#score-summary').html(text);
}

function percentToTwoDp(a, b){
    return ((a / b) * 100).toFixed(0);
}

function columnizeText(text, numColumns){
    let columnHolder = $('<div class="column-holder"></div>')

    let columns = [];
    Array(numColumns).fill().map(function(x){
        columns.push($('<div class="column"></div>'))
    });

    let currentColumn = 1;
    text.map(function(thisText){
        columns[currentColumn - 1].append(thisText + "<br>");
        currentColumn = incrementOrReset(currentColumn, numColumns);
    });

    columns.map(x => columnHolder.append(x));
    return columnHolder;
}

function incrementOrReset(x, max){
    if (x >= max) {
        return 1;
    }
    else {
        return x + 1
    }
}



$(document).ready(function () {

    let correct = JSON.parse(localStorage.getItem("correct"));
    let incorrect = JSON.parse(localStorage.getItem("incorrect"));
    allCountries = Object.keys(allCapitals);
    rememberedCountries = Object.keys(correct);
    incorrectCountries = Object.keys(incorrect);

    for (let i=0; i<allCountries.length; i++){
        let country = allCountries[i];
        let capital = allCapitals[country];
        let answer = "";
        
        if (rememberedCountries.includes(country)){
            answer = correct[country];
            if (textMatch(capital, answer)) {
                // Remembered
                remembered.push(country);
            }
            else {
                // Remembered with spelling mistake
                spelling[country] = answer;
            }
        }
        else{
            if (incorrectCountries.includes(country)){
                // Guessed incorrectly
                answer = incorrect[country];
                guessedIncorrectly[country] = answer;
            }
            else{
                // Not remembered
                notRemembered.push(country);
            }
        }
    }

    addRemembered();
    addSpelling();
    addGuessedIncorrectly();
    addNotRemembered();

    addScoreSummary();

    // $('#num-remembered').text(numRemembered);
    // $('#num-spelling').text(numSpelling);
    // $('#num-not-remembered').text(numNotRemembered);
    // $('#result-remembered').text(numRemembered + numSpelling);
    // $('#result-not-remembered').text(numNotRemembered);

});