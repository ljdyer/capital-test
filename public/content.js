function refreshCountries(){
    refreshContinent($('#africa'), africaCapitals);
    refreshContinent($('#asia'), asiaCapitals);
    refreshContinent($('#europe'), europeCapitals);
    refreshContinent($('#north-america'), northAmericaCapitals);
    refreshContinent($('#oceania'), oceaniaCapitals);
    refreshContinent($('#south-america'), southAmericaCapitals);
}

function refreshContinent(continentDiv, capitalsObject){
    let keys = Object.keys(capitalsObject);
    for (i=0; i<keys.length-1; i++) {
        continentDiv.append(makeCountryLink(keys[i]))
        continentDiv.append(" | ")
    }
    continentDiv.append(makeCountryLink(keys[keys.length - 1]))
}

function makeCountryLink(country){
    let link = $(`<a href="#" onclick="handleCountryClick(this);">${country}</a>`)
    return link;
}

function handleCountryClick(link){
    let country = $(link).text();
    let capital = allCapitals[country];
    $('#current-display').html(`The capital of <b>${country}</b> is <b>${capital}</b>`);
}

$(document).ready(function () {
    refreshCountries();
});