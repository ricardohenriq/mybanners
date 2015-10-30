$(document).ready(function(){
	populateWithBanners('banners300x250', 5);
	populateWithBanners('banners125x125', 5);
	populateWithBanners('banners468x60', 5);
});

$("#banner125x125").click(function(){
	populateWithBanners('banners125x125',5);
	return false;
});

$("#banners300x250").click(function(){
	populateWithBanners('banners300x250',5);
	return false;
});

$("#banners468x60").click(function(){
	populateWithBanners('banners468x60',5);
	return false;
});

function stripTags(str){
    //return str.replace(/<\/?[^>]+>/gi, '');
    str = str.replace(/</gi, '&lt');
    str = str.replace(/>/gi, '&gt');
	return str;
}

function validateContactForm(formId){
	var formValues = $('#' + formId).serializeArray();
	for(var fieldIndex = 0; fieldIndex < formValues.length; fieldIndex++){
		formValues[fieldIndex]['value'] = stripTags(formValues[fieldIndex]['value']);
	}
	return formValues;
}

function createContactEmail(formValues){
	var body = '';
	for(var fieldIndex = 0; fieldIndex < formValues.length; fieldIndex++){
		body += '<strong>'+ formValues[fieldIndex]['name'] + 
			': </strong>' + formValues[fieldIndex]['value'] + '<br>';
	}
	return body;
}

function sendToMandrill(body, subject){
	$.ajax({
		type:"POST",
		url:"https://mandrillapp.com/api/1.0/messages/send.json",
		data:{
				'key':'Akj5sUZpdPZ7O3LbpPpSiw',
				'message':{
					'from_email':'albernazassis@gmail.com',
					'to':[
						{
							'email':'albernazassis@gmail.com',
							'name':'Ricardo Henrique',
							'type':'to'
						}
					],
					'subject':subject,
					'html':body
				}
			}
	});
}

function sendMail(formId, subject){
	var formValues = validateContactForm(formId);
	var body = createContactEmail(formValues);
	sendToMandrill(body, subject);
	alert('Email Enviado!');
}

$("#contact-mail").click(function(){
	sendMail('contact-form', '[Contato] |MyBanners Site|');
	return false;
});

$("#separate-banner-email").click(function(){
	sendMail('separate-banner-form', '[Send Banner Separate] |MyBanners Site|');
	return false;
});

$("#block-banner-email").click(function(){
	sendMail('block-banner-form', '[Send Banner Block] |MyBanners Site|');
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

function populateWithBanners(bannersAreaId, bannersQuantity){
	var folderURLs = [];
	folderURLs['banners120x600'] = 'temp/banners/banners120x600/';
	folderURLs['banners300x250'] = 'temp/banners/banners300x250/';
	folderURLs['banners125x125'] = 'temp/banners/banners125x125/';
	folderURLs['banners468x60'] = 'temp/banners/banners468x60/';
	folderURLs['banners728x90'] = 'temp/banners/banners728x90/';

	readTextFile(folderURLs[bannersAreaId] + 'banners-quantity.txt');
	var bannersQuantityStored = parseInt(allText);
	var bannersSource = getBannersSource(folderURLs[bannersAreaId], bannersQuantity, bannersQuantityStored);
	emptyTag(bannersAreaId);
	appendHTML(bannersAreaId, bannersSource);
}

function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
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
