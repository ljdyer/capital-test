$(document).ready(function () {
    $(document).on('click', function (event) {
        if ($(event.target).closest('#source-of-truth-link').length) {
            toggleSourceOfTruthDiv();
        } else if (!$(event.target).closest('#source-of-truth-div').length) {
            hideSourceOfTruthDiv();
        }
    });
});

function toggleSourceOfTruthDiv(){
    if ($('#source-of-truth-div').is(":visible")){
        hideSourceOfTruthDiv();
    } else{
        showSourceOfTruthDiv();
    }
}


function showSourceOfTruthDiv(){
    let e = $('#source-of-truth-link');
    $('#source-of-truth-div').css({
        display: "block",
        position: "absolute",
        left: e.offset().left + e.width(),
        top: e.offset().top + e.height()
    });
}

function hideSourceOfTruthDiv(){
    $('#source-of-truth-div').hide();
}