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
var titleEl = document.querySelector("#title");
var durationEl = document.querySelector("#duration");
var yearEl = document.querySelector('#year');
/* 
global variables needed
array for local storage of list to watch
array for local storage of list of watched

*/
// localStorage.clear();
var tracker = [];
var tracker2 = [];
// var tracker = localStorage.getItem('watchList');
var buttonNum = 1;
// var tracker2 = localStorage.getItem('watchedList')

/* functions needed
function to handle submit event
function to handle save to list click event
function to handle move to watched click event
function to fetch api for anime quotes
function to fetch api for myanimelist link
function to render quote and link

*/


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
    try {

        fetch(apiURL).then(function (response) {
            if (response.status == 404){
                console.log("error3");
                return;
            }else if (response.ok) {
                response.json().then(function (data) {
                    
                    var randNum = Math.floor(Math.random() * data.length);
                    var character = data[randNum].character;
                    var quote = data[randNum].quote;
                    // console.log(data[randNum].character);
                    // console.log(data[randNum].quote);
                    displayList(name);
                });
            }
    
        });
    } catch (error) {
        console.log('error2');
        return;
    }


}

//api call to get jikan data

function getAnimeInfo(name) {
    var indexUsed;
    var apiURL = 'https://api.jikan.moe/v4/anime?q=' + name;
    fetch(apiURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                try {
                    for (var i = 0; i < data.data.length; i++) {
                        var title = data.data[i].title.replace(':', "");
                        if (title.toLowerCase() == name.toLowerCase()) {
                            indexUsed = i;
                        }
                    }
                    var pic = data.data[indexUsed].images.webp.image_url;
                    var title = data.data[indexUsed].title;
                    var url = data.data[indexUsed].url;
                    var duration = data.data[indexUsed].duration;
                    var year = data.data[indexUsed].year;
                    displayInfo(pic,url,title,duration,year);

                } catch (error) {
                    console.log('error');
                    return;

                }



            });
        }

    });

}

// function calls
function handleSubmit(event) {
    event.preventDefault();
    var animeName = userInput.value.trim();
    var test = JSON.stringify(animeName);
    tracker.push(test);
    localStorage.setItem('watchList', tracker);
    getAnimeQuotes(animeName);
    getAnimeInfo(animeName);
    
}

function handleMoveButtons(event) {
    console.log(event.target.type);
    if (event.target.type != "submit"){
        return;
    }
    event.preventDefault();
    var newText = event.target.innerHTML;
    
    event.target.remove();
    var arrayY = [];
    if (localStorage.getItem('watchList') != null){
        var arrayX = localStorage.getItem('watchList').split(',');
    }
    for (var i = 0; i < arrayX.length; i++){
        if (JSON.parse(arrayX[i]) != newText){
            arrayY.push(arrayX[i]);
        }
    }
    localStorage.setItem('watchList', arrayY);
    var newListEl = document.createElement("p");
    if (localStorage.getItem('watchedList') != null){
        var arrayZ = localStorage.getItem('watchList').split(',');
        arrayZ.push(newText);
        localStorage.setItem('watchedList', arrayZ);
    } else{
        tracker2.push(newText);
        localStorage.setItem('watchedList', tracker2);
    }
    
    newListEl.innerHTML = event.target.innerHTML;
    WatchedList.appendChild(newListEl);

}

function displayList(name) {
    var listEl = document.createElement("button");
    listEl.classList.add("buttons");
    listEl.setAttribute('id', 'button' + buttonNum);
    buttonNum++;
    listEl.innerHTML = name;
    listEl.style.listStyle = "none";
    toWatchList.appendChild(listEl);
}

function displayInfo(picURL, siteURL, title, duration, year) {
    imageEl.src = picURL;
    titleEl.innerHTML = title;
    durationEl.innerHTML = duration;
    yearEl.innerHTML = "released in " +  year;
}
function createFromStorage(){

    if(localStorage.getItem('watchList') != null){
        var newArray = localStorage.getItem('watchList').split(',')
        for (var i = 0; i < newArray.length; i++){
            var listEl = document.createElement("button");
            listEl.classList.add("buttons");
            listEl.setAttribute('id', 'button' + buttonNum);
            buttonNum++;
            listEl.innerHTML = JSON.parse(newArray[i]);
            listEl.style.listStyle = "none";
            toWatchList.appendChild(listEl);
            }
    }
    if (localStorage.getItem('watchedList') != null){
        var newArray2 = localStorage.getItem('watchedList').split(',')
        for (var i = 0; i < newArray2.length; i++){
            var newListEl = document.createElement("p");
            newListEl.innerHTML = newArray2[i].replace('"', "");
            newListEl.style.listStyle = "none";
            WatchedList.appendChild(newListEl);
            }
    }


}
submitButton.addEventListener('click', handleSubmit);
toWatchList.addEventListener('click', handleMoveButtons);
createFromStorage();

function ratestar() {
    var a;
    a = document.getElementById("div1");
    a.innerHTML = "&#xf006;";
    setTimeout(function () {
        a.innerHTML = "&#xf123;";
      }, 1000);
    setTimeout(function () {
        a.innerHTML = "&#xf005;";
      }, 2000);
  }
  ratestar();
  setInterval(ratestar, 3000);


