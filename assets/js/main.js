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
				'key':'-po7dRSIlB4YoFYevstd_w',
				'message':{
					'from_email':'ricardohenrique996@gmail.com',
					'to':[
						{
							'email':'ricardohenrique1@outlook.com',
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