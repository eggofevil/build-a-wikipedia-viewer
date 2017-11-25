var baseUrl,
  rndBtn = document.querySelector('#rndArtBtn'),
  searchBtn = document.querySelector('#searchBtn'),
  searchInp = document.querySelector('#searchInp'),
  searchResults = document.querySelector('#searchResults'),
  controls = document.querySelector('#controls'),
  article = document.querySelector('article');
  header = document.querySelector('h1');
  
function buildUrl(id) {
  'use strict';
  while (searchResults.firstChild) {
    searchResults.removeChild(searchResults.firstChild);
  }
  baseUrl = 'https://ru.wikipedia.org/w/api.php?origin=*&format=json&action=query';
  switch (id) {
  case 'rndArtBtn':
    baseUrl += '&generator=random&grnlimit=1&prop=info|extracts&inprop=url&exintro=1&explaintext=1';
    break;
  case 'searchBtn':
    baseUrl += '&uselang=user&list=search&srprop=snippet&srsearch=' + searchInp.value;
    break;
  default:
    baseUrl += '&uselang=user&pageids=' + id + '&prop=info|extracts&inprop=url&exintro=1&explaintext=1&exsentences=1';
  }
  getArt(encodeURI(baseUrl), id);
}

function getArt(url, id) {
  'use strict';
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.setRequestHeader('Api-User-Agent', 'Wikipedia searcher test application (https://eggofevil.github.io/build-wikipedia-viewer/; nucleusofgood@gmail.com)');
  request.responseType = 'json';
  request.addEventListener('load', function (e) {
    if (request.status === 200) {
      responseAction(request.response, id);
    } else {
      console.log(e);
    }
  });
  request.send();
}

function responseAction(response, id) {
  'use strict';
  if (id === 'searchBtn') {
    response.query.search.forEach(function (el) {
      buildUrl(el.pageid);
    });
  } else {
    var key = Object.keys(response.query.pages)[0],
      resultDiv = document.createElement('div'),
      titleHead = document.createElement('h3'),
      extractsPara = document.createElement('p');
    resultDiv.addEventListener('click', function () {
      window.open(response.query.pages[key].canonicalurl, '_blank');
    });
    titleHead.textContent = response.query.pages[key].title + '/n';
    extractsPara.textContent = response.query.pages[key].extract;
    searchResults.appendChild(resultDiv);
    resultDiv.appendChild(titleHead);
    resultDiv.appendChild(extractsPara);
  }
}



rndBtn.addEventListener('click', function () {
  'use strict';
  buildUrl(this.id);
});
searchBtn.addEventListener('click', function () {
  'use strict';
  buildUrl(this.id);
});
searchBtn.addEventListener('click', function () {
  'use strict';
  controls.style.display = 'none';
  var returnBtn1 = document.createElement('button');
  var returnBtn2 = document.createElement('button')
  returnBtn1.setAttribute('class', 'AGBtn1');
  returnBtn1.textContent = 'New request';
  returnBtn1.style.display = 'inline-block';
  returnBtn2.setAttribute('class', 'AGBtn1');
  returnBtn2.textContent = 'New request';
  header.style.display = 'inline-block';
  article.insertBefore(returnBtn1, searchResults);
  article.appendChild(returnBtn2);
  returnBtn1.addEventListener('click', function () {
    controls.style.display = 'block';
    header.style.display = 'block';
    returnBtn1.parentNode.removeChild(returnBtn1);
    returnBtn2.parentNode.removeChild(returnBtn2);
  });
  returnBtn2.addEventListener('click', function () {
    controls.style.display = 'block';
    header.style.display = 'block';
    returnBtn1.parentNode.removeChild(returnBtn1);
    returnBtn2.parentNode.removeChild(returnBtn2);
  });
  
  
  
});