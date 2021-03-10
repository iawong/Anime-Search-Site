var button = document.querySelector('button');
var list = document.getElementById('slist');
var ba = document.getElementById('name');
var link, name, apiReq;

// requests data from ghibli API
const asyncRequestObject = new XMLHttpRequest();
asyncRequestObject.open('GET', 'https://ghibliapi.herokuapp.com/films/58611129-2dbc-4a81-a72f-77ddfc1b1b49');
asyncRequestObject.onload = handleSuccess2;
asyncRequestObject.onerror = handleError;
asyncRequestObject.send();

// searchs for an anime in the Jikan API and returns a url for it
button.onclick = async function search() {
    var input = document.getElementById('input-field').value;
    apiReq = "https://api.jikan.moe/v3/search/anime?q=" + input + "&limit=2";

    await sendRequest();
}

async function sendRequest() {
    // requests data from Jikan API
    const asyncRequestObject = new XMLHttpRequest();
    asyncRequestObject.open('GET', apiReq);
    asyncRequestObject.onload = handleSuccess;
    asyncRequestObject.onerror = handleError;
    asyncRequestObject.send();
}

// returns the first url of the anime found
function handleSuccess () {
    const data = JSON.parse(this.responseText); // convert data from JSON to a JavaScript object
    link = data.results[0].url;

    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(link));
    list.appendChild(entry);
    console.log(data);
}

function handleSuccess2 () {
    const data = JSON.parse(this.responseText);
    name = data.title;
    ba.innerHTML = name;
    console.log(data);
}

// returns an error message when an error is encountered
function handleError () {
    console.log('An error occurred \uD83D\uDE1E');
}