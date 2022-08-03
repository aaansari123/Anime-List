// insert variables for page elements here
/*var submitButton
area for quote
area for link
page element for list
save to list button
move to watched button
page element for list of watched

*/
var userInput = document.querySelector("#user-input");
var submitButton = document.querySelector("#searchBtn");
var toWatchList = document.querySelector("#watch-list");
var WatchedList = document.querySelector("#removed");
var imageEl = document.querySelector("#anime-img");
/* 
global variables needed
array for local storage of list to watch
array for local storage of list of watched

*/
var tracker = 0;
var buttonNum = 1;
var tracker2 = 0;

/* functions needed
function to handle submit event
function to handle save to list click event
function to handle move to watched click event
function to fetch api for anime quotes
function to fetch api for myanimelist link
function to render quote and link

*/

function handleSubmit(event) {
    event.preventDefault();
    var animeName = userInput.value.trim();
    tracker++;
    localStorage.setItem(tracker, animeName);
    getAnimeQuotes(animeName);
    getAnimeInfo(animeName);
    displayList();
}

function displayList() {
    var listEl = document.createElement("button");
    listEl.classList.add("buttons");
    listEl.setAttribute('id', 'button' + buttonNum);
    buttonNum++;
    listEl.innerHTML = localStorage.getItem(tracker);
    listEl.style.listStyle = "none";
    toWatchList.appendChild(listEl);
}

function displayInfo(picURL, siteURL, title, duration, year){
    imageEl.src = picURL;
}

function handleMoveButtons(event) {
    event.preventDefault();
    localStorage.removeItem(tracker);
    tracker--;
    var newText = event.target.innerHTML;
    event.target.remove();
    var newListEl = document.createElement("p");

    localStorage.setItem(tracker2, newText);
    newListEl.innerHTML = localStorage.getItem(tracker2);
    tracker2++;
    WatchedList.appendChild(newListEl);

}

// api call to get the quotes data
function getAnimeQuotes(name) {
    var array = name.split(" ");
    var apiURL = 'https://animechan.vercel.app/api/quotes/anime?title=';
    for (var i = 0; i < array.length; i++) {
        apiURL += array[i];
        if (i < array.length - 1) {
            apiURL += "&";
        }
    }
    console.log(apiURL);

    fetch(apiURL).then(function (response) {
        console.log(response.status);
        console.log(response);
        if (response.ok) {
            response.json().then(function (data) {
                // console.log(data);
                // console.log(data.length);   
                var randNum = Math.floor(Math.random() * data.length);
                console.log(data[randNum].character);
                console.log(data[randNum].quote);
            });
        }

    });

}

//api call to get jikan data

function getAnimeInfo(name) {
    var anime = name.toLowerCase;
    var indexUsed;
    var apiURL = 'https://api.jikan.moe/v4/anime?q=' + name;
    fetch(apiURL).then(function (response) {
        console.log(response.status);
        console.log(response);
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                for (var i = 0; i < data.data.length; i++) {
                    // console.log(data.data[i].title);
                    // console.log(name);
                    var title = data.data[i].title.replace(':', "");
                    // console.log(title.toLowerCase());

                    if (title.toLowerCase() == name.toLowerCase()) {
                        console.log(i);
                        indexUsed = i;
                    }
                }
                var pic = data.data[indexUsed].images.webp.image_url;
                var title = data.data[indexUsed].images.webp.image_url;
                var url = data.data[indexUsed].url;
                var duration = data.data[indexUsed].duration;
                var year = data.data[indexUsed].year;
                console.log(data.data[indexUsed].images);
                // console.log(data.data[indexUsed].title);
                // console.log(data.data[indexUsed].url);
                // console.log(data.data[indexUsed].duration);
                // console.log(data.data[indexUsed].year);
                // console.log(indexUsed);
                displayInfo(pic);


            });
        }

    });

}

// function calls



submitButton.addEventListener('click', handleSubmit);
toWatchList.addEventListener('click', handleMoveButtons);


