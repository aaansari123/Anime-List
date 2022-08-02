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
/* 
global variables needed
array for local storage of list to watch
array for local storage of list of watched

*/


/* functions needed
function to handle submit event
function to handle save to list click event
function to handle move to watched click event
function to fetch api for anime quotes
function to fetch api for myanimelist link
function to render quote and link

*/

// api call to get the quotes data
function getAnimeQuotes(name){
    var apiURL = 'https://animechan.vercel.app/api/quotes/anime?title=' + name;
    fetch(apiURL).then(function (response){
        if (response.ok){
            response.json().then(function(data){
                console.log(data);
                console.log(data.length);   
                var randNum = Math.floor(Math.random() * data.length);
                console.log(data[randNum].character);
                console.log(data[randNum].quote);
            });
        }

    });
    
}

//api call to get jikan data

function getAnimeInfo(name){
    var apiURL = 'https://api.jikan.moe/v4/anime?q=' + name;
    fetch(apiURL).then(function (response){
        if (response.ok){
            response.json().then(function(data){
                console.log(data);
                for( var i = 0; i < data.data.length; i++){
                    console.log(data.data[i].title);
                }
                
                // console.log(data.length);   
                // var randNum = Math.floor(Math.random() * data.length);
                // console.log(data[randNum].character);
                // console.log(data[randNum].quote);
            });
        }

    });
    
}

// function calls

function handleSubmit(event){
    event.preventDefault();
    var animeName = userInput.value.trim();
    console.log(animeName);
    getAnimeQuotes(animeName);
    getAnimeInfo(animeName);
}

submitButton.addEventListener('click', handleSubmit);




