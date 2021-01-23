var rememberedColumn = 1;
var spellingColumn = 1;
var notRememberedColumn = 1;

var numRemembered = 0;
var numSpelling = 0;
var numNotRemembered = 0;


function addRemembered(country){
    column = $(`#remembered-column-${rememberedColumn}`);
    column.append(`${country}: ${allCapitals[country]}<br>`);
    rememberedColumn = addOneOrResetToOne(rememberedColumn, 3);
}

function addSpelling(country, answer){
    column = $(`#spelling-column-${rememberedColumn}`);
    column.append(`${country}: <span class="incorrect">${answer}</span> <span class="correct">${allCapitals[country]}</span><br>`);
    rememberedColumn = addOneOrResetToOne(rememberedColumn, 3);
}

function addNotRemembered(country){
    column = $(`#not-remembered-column-${notRememberedColumn}`);
    column.append(`${country}: ${allCapitals[country]}<br>`);
    notRememberedColumn = addOneOrResetToOne(notRememberedColumn, 3);
}

function addOneOrResetToOne(x, max){
    if (x >= max){
        return 1;
    }
    else{
        return x+1
    }
}



$(document).ready(function () {

    var results = JSON.parse(localStorage.getItem("results"));
    allCountries = Object.keys(allCapitals);
    rememberedCountries = Object.keys(results);

    for (i=0; i<allCountries.length; i++){
        let country = allCountries[i];
        let capital = allCapitals[country];
        let answer = results[country];

        if (rememberedCountries.includes(country)){
            if (textMatch(capital, answer)) {
                addRemembered(country);
                numRemembered += 1;
            }
            else {
                addSpelling(country, answer);
                numSpelling += 1;
            }
        }
        else{
            addNotRemembered(allCountries[i]);
            numNotRemembered += 1;
        }
    }

    $('#num-remembered').text(numRemembered);
    $('#num-spelling').text(numSpelling);
    $('#num-not-remembered').text(numNotRemembered);
    $('#result-remembered').text(numRemembered + numSpelling);
    $('#result-not-remembered').text(numNotRemembered);

});