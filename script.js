// ==UserScript==
// @name         AWS username
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Finding the AWS username in the website
// @author       Ido Frankenthal
// @include      https://*aws.amazon.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // *********************************************************
    // Option 1: Get the username from the HTML of the website:
    // *********************************************************

    // get all the elements in the html with that class name.
    var titles = document.getElementsByClassName("ThRjn7o-KwO0459UzmvoU w8Kxy2XztOAkWobGpdJLt");
    var username = "";
    // loop through all elements that match that had the class name.
    for(var i=0; i<titles.length;i++){
        // only the username has the attribute title
        if(titles[i].hasAttribute("title")){
            // find the username and break
            username = titles[i].textContent;
            break;
        }
    }
    // add to the log the username
    console.log("Welcome, " + username);

    // *********************************************************
    // Option 2: Get the username from the cookie:
    // *********************************************************

    // get the cookie
    var cookie = document.cookie;
    // decode the url, and split to the different cookies.
    var decoded_cookie = decodeURIComponent(cookie).split("; ");
    for (i=0; i<decoded_cookie.length; i++) {
        // find the cookie that starts with the userInfo
        if(decoded_cookie[i].startsWith("aws-userInfo=")) {
            // get the content of that cookie
            var content = decoded_cookie[i].split("=")[1];
            // parse the json of the cookie
            var parsed_content = JSON.parse(content);
            // add to the log the username
            console.log("Welcome again, " + parsed_content.username);
           }
    }

})();