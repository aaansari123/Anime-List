// insert variables for page elements here
/*var submitButton
area for quote
area for link
page element for list
save to list button
move to watched button
page element for list of watched

*/

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
function getAnimeQuotes(){
    var apiURL = 'https://animechan.vercel.app/api/quotes/anime?title=naruto'
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

function getAnimeQuotes(){
    var apiURL = 'https://api.jikan.moe/v4/anime/1'
    fetch(apiURL).then(function (response){
        if (response.ok){
            response.json().then(function(data){
                console.log(data);
                // console.log(data.length);   
                // var randNum = Math.floor(Math.random() * data.length);
                // console.log(data[randNum].character);
                // console.log(data[randNum].quote);
            });
        }

    });
    
}

// function calls
getAnimeQuotes();

