$(document).ready(function(){
	populateWithBannersRow(2, 5);
});

$('.container').on('click', '#reload-banners125x125', function(){
	populateWithBanners('banners125x125',5);
	return false;
});

$('.container').on('click', '#reload-banners300x250', function(){
	populateWithBanners('banners300x250',5);
	return false;
});

$('.container').on('click', '#reload-banners468x60',function(){
	populateWithBanners('banners468x60',5);
	return false;
});

$('.container').on('click', '#reload-banners120x600',function(){
	populateWithBanners('banners120x600',5);
	return false;
});

$('.container').on('click', '#reload-banners728x90',function(){
	populateWithBanners('banners728x90',5);
	return false;
});

var allText = '';
function readTextFile(fileURL){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", fileURL, false);
    rawFile.onreadystatechange = function(){
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status == 0){
                allText = rawFile.responseText;
            }else{
				allText = '';
			}
        }else{
			allText = '';
		}
    }
    rawFile.send(null);
}

function populateWithBannersRow(qtdRow, qtdRowsAvailable){
	var containerNumbers = randomBannersRow(qtdRow, qtdRowsAvailable);
	for(var i = 0; i < containerNumbers.length; i++){
		createBannersRow(
			bannersRow[containerNumbers[i]]['bannerTitle'], 
			bannersRow[containerNumbers[i]]['bannerReloadID'],
			bannersRow[containerNumbers[i]]['bannerAreaID']
		);
		populateWithBanners(bannersRow[containerNumbers[i]]['bannerAreaID'], 5);
	}
}

function randomBannersRow(qtdRow, qtdRowsAvailable){
	var containerNumbers = [];
	while(containerNumbers.length < qtdRow){
		var number = randomIntFromInterval(0, qtdRowsAvailable - 1);
		if(containerNumbers.indexOf(number) === -1){
			containerNumbers.push(number);
		}
	}
	return containerNumbers;
}

var bannersRow = [
	{'bannerTitle':'Banners 120x600','bannerReloadID':'reload-banners120x600','bannerAreaID':'banners120x600'},
	{'bannerTitle':'Banners 300x250','bannerReloadID':'reload-banners300x250','bannerAreaID':'banners300x250'},
	{'bannerTitle':'Banners 125x125','bannerReloadID':'reload-banners125x125','bannerAreaID':'banners125x125'},
	{'bannerTitle':'Banners 468x60','bannerReloadID':'reload-banners468x60','bannerAreaID':'banners468x60'},
	{'bannerTitle':'Banners 728x90','bannerReloadID':'reload-banners728x90','bannerAreaID':'banners728x90'}
];

function createBannersRow(bannerTitle, bannerReloadID, bannerAreaID){
	var bannerContainer = document.getElementsByClassName('container')[1];
	var row = 
	"<div class='row'><div class='col-md-10 col-md-offset-1 span7 text-center'><div class='banners-type'><span>" + bannerTitle + "</span> <a id='" + bannerReloadID + "' href='#' class='reload-banners' title='Atualizar Banners'><img src='assets/images/reload-icon30x30.min.png'></a></div><div class='banners-area' id='" + bannerAreaID + "'></div></div></div>";
	$(bannerContainer).append(row);
}

function populateWithBanners(bannersAreaId, bannersQuantity){
	var folderURLs = [];
	folderURLs['banners120x600'] = 'banners/banners120x600/';
	folderURLs['banners300x250'] = 'banners/banners300x250/';
	folderURLs['banners125x125'] = 'banners/banners125x125/';
	folderURLs['banners468x60'] = 'banners/banners468x60/';
	folderURLs['banners728x90'] = 'banners/banners728x90/';

	readTextFile(folderURLs[bannersAreaId] + 'banners-quantity.txt');
	var bannersQuantityStored = parseInt(allText);
	var bannersSource = getBannersSource(folderURLs[bannersAreaId], bannersQuantity, bannersQuantityStored);
	emptyTag(bannersAreaId);
	appendHTML(bannersAreaId, bannersSource);
}

function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getBannersSource(baseURL, bannersQuantity, maxValue){
	var bannersSource = [];
	var numbersDrawn = [];
	while(numbersDrawn.length < bannersQuantity){
		var numberDrawn = randomIntFromInterval(1, maxValue);
		if(numbersDrawn.indexOf(numberDrawn) === -1){
			readTextFile(baseURL + numberDrawn + '.txt');
			if(allText !== ''){
				bannersSource.push(allText);
				numbersDrawn.push(numberDrawn);
			}
		}
	}
	return bannersSource;
}

function appendHTML(bannersAreaId, bannersSource){
	var bannerArea = document.getElementById(bannersAreaId);
	for(var i = 0; i < bannersSource.length; i++){
		var div = document.createElement('div');
		$(div).addClass('banner');
		$(div).append(bannersSource[i]);
		$(bannerArea).append(div);	
	}
}

function emptyTag(bannersAreaId){
	$('#' + bannersAreaId).empty();
}