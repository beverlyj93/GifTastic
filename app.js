var url = "https://api.giphy.com/v1/gifs/search?api_key=Y3kiSuSbaELvET94j2ziPvzpL4kjNI3e&q=[SEARCH_WORD]&limit=[LIMIT]&offset=0&rating=G&lang=en";
var topics = [
    'toyota',
    'nissan',
    'acura',
    'bmw',
    'jeep',
    'mazda',
    'ford',
    'chevy',
    'audi',
    'hyundai',
    'honda'
]

populateButtons();

/**
 * @param {string} url URL to parse
 * @param {string} search Search phrase
 * @param {number} limit Amount of GIF's to display
 */
function formatURL(url, search, limit) {
    return url.replace("[SEARCH_WORD]", search).replace("[LIMIT]", limit);
}

/**
 * @param {string} search Search phrase
 * @param {number} limit Amount of GIF's to display
 */
function executeAPI(search, limit) {
    $('.pictures').html("");
    $.ajax(formatURL(url, search, limit))
        .then(response => {
            console.log(response);
            for (let i = 0; i < limit; i++) {
                $('<div class="image">').append($('<p>').text("RATING: " + response.data[i].rating.toUpperCase()), $('<img>').attr('src', response.data[i].images.downsized_still.url).attr('alt', response.data[i].images.downsized.url).click(function () {
                    let alt = $(this).attr('alt');
                    let src = $(this).attr('src');
                    $(this).attr('src', alt);
                    $(this).attr('alt', src);
                })).appendTo($('.pictures'));
            }
        })
}

function populateButtons() {
    $('.buttons').html("");
    topics.forEach(value => {
        $('.buttons').append($('<button id="btn">').text(value.toUpperCase()).click(function () {
            executeAPI($(this).text(), $('#input-number').val());
        }));
    })
}

$('#button-submit').click(function () {
    topics.push($('#input-value').val());
    populateButtons();
})