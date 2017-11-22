var rndArtBtn = document.querySelector('#randomArticle');
var baseUrl =  "https://en.wikipedia.org/w/api.php?";
var request = new XMLHttpRequest();

function buildUrl() {
  baseUrl += 'format=json';
  baseUrl += '&action=query';
  baseUrl += '&generator=random';
  baseUrl += '&grnlimit=1';
  baseUrl += '&props=info';
  baseUrl += '&inprops=url';
  console.log(baseUrl);
  return baseUrl;
}

function responseAction(response) {
  console.log(response);
}

function getRndArt() {
  request.open('GET', buildUrl());
  request.setRequestHeader('Access-Control-Allow-Origin', 'https://eggofevil.github.io/build-wikipedia-viewer/');
  request.setRequestHeader('User-Agent', 'Wikipedia searcher test application (https://eggofevil.github.io/build-wikipedia-viewer/; nucleusofgood@gmail.com)');
  request.responseType = 'json';
  request.addEventListener('load', function () {responseAction(request.response); });
  request.send();
}

rndArtBtn.addEventListener('click', getRndArt);





/*
https://www.mediawiki.org/w/api.php     # MediaWiki API
https://en.wikipedia.org/w/api.php      # API английской Википедии
https://nl.wikipedia.org/w/api.php      # API голландской Википедии
https://commons.wikimedia.org/w/api.php # API Викисклада
*/

/*
Return two random pages from the main namespace.
api.php?action=query&list=random&rnnamespace=0&rnlimit=2
Return page info about two random pages from the main namespace.
api.php?action=query&generator=random&grnnamespace=0&grnlimit=2&prop=info
*/