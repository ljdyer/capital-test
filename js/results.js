var allCountries = Object.keys(allCapitals);
var username;
var correct;
var incorrect;

var remembered = [];
var spelling = {};
var guessedIncorrectly = {};
var notRemembered = [];

var scores;

$(document).ready(function () {
    $.getJSON('json/scores.json', function (jsonData) {
        scores = jsonData;
        updateAndDisplayContestantData();
    });

    username = localStorage.getItem("username");
    correct = JSON.parse(localStorage.getItem("correct"));
    incorrect = JSON.parse(localStorage.getItem("incorrect"));

    sortCountries();
    addRemembered();
    addSpelling();
    addGuessedIncorrectly();
    addNotRemembered();
    addScoreSummary();
});

function sortCountries(){
    for (let i = 0; i < allCountries.length; i++) {
        let correctCountries = Object.keys(correct);
        let incorrectCountries = Object.keys(incorrect);
        let country = allCountries[i];
        let capital = allCapitals[country];
        let answer = "";
        if (correctCountries.includes(country)) {
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
        else {
            if (incorrectCountries.includes(country)) {
                // Guessed incorrectly
                answer = incorrect[country];
                guessedIncorrectly[country] = answer;
            }
            else {
                // Not remembered
                notRemembered.push(country);
            }
        }
    }
}

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
    $('#num-incorrect').text(Object.keys(guessedIncorrectly).length);
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

function updateAndDisplayContestantData(){
    let now = new Date().toLocaleString('en-GB', { hour12: false, day : 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'});
    if (scores.hasOwnProperty(username)){
        if (Object.keys(correct).length > scores[username].bestScore){
            $('#best-score').show();
            $.extend(scores[username], {"bestScore": Object.keys(correct).length, "bestScoreTime": now});
        }
        newNumPlays = parseInt(scores[username].numPlays) + 1;
        $.extend(scores[username], {"lastPlayed": now, "numPlays": newNumPlays}); 
    } else{
        scores[username] = {"bestScore": Object.keys(correct).length, "bestScoreTime": now, "lastPlayed": now, "numPlays": 1};
    }
    $.post("php/writejson.php", scores);
    playerNames = Object.keys(scores);
    playersByRank = playerNames.sort((a, b) => scores[b].bestScore - scores[a].bestScore);
    showcontestantTable(playersByRank);
}

function showcontestantTable(playersByRank){
    let contestantTable = $(`<table></table>`)
        .addClass("styled-table")
        .append($(`<thead><tr><th>Rank</th><th>Name</th><th>Best score</th><th>Best score achieved on</th><th>Number of plays</th><th>Last played</th></tr></thead>`))
        .append($(`<tbody></tbody>`));
    let rank = 1;
    for (let i=0; i<playersByRank.length; i++) {
        let player = playersByRank[i];
        contestantTable.find('tbody').append(contestantRow(rank, player, scores[player]));
        rank += 1;
    }
    $('#contestants').append(contestantTable);
}



function contestantRow(rank, contestantName, contestantData){
    let row = $(`
            <tr>
                <td>${rank}</td>
                <td>${contestantName}</td>
                <td>${contestantData.bestScore}</td>
                <td>${contestantData.bestScoreTime}</td>
                <td>${contestantData.numPlays}</td>
                <td>${contestantData.lastPlayed}</td>
            </tr>
        `);
    if (contestantName == username){
        row.addClass("active-row");
    }
    return row;
}


function columnizeText(text, numColumns){
    let columnHolder = $('<div class="column-holder"></div>')
    let columns = [];
    Array(numColumns).fill().map(function(x){
        columns.push($('<div class="column"></div>'));
    });
    let currentColumn = 1;
    text.map(function(thisText){
        columns[currentColumn - 1].append(thisText + "<br>");
        currentColumn = incrementOrReset(currentColumn, numColumns);
    });
    columns.map(x => columnHolder.append(x));
    return columnHolder;
}

function percentToTwoDp(a, b){
    return ((a / b) * 100).toFixed(0);
}

function incrementOrReset(x, max){
    if (x >= max) {
        return 1;
    }
    else {
        return x + 1
    }
}
