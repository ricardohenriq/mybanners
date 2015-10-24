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
                //alert(allText);
                //return allText;
            }
        }
    }
    rawFile.send(null);
}

function populateWithBanners(bannersAreaId, bannersQuantity){
	//alert(randomIntFromInterval(1, 10));
	//alert(bannersAreaId);
	//alert(bannersQuantity);
	//readTextFile('banners-quantity.txt');
	//alert(allText);
	var urls = generateFileURLs('temp/banners/banners120x600/', bannersQuantity, 30);
	//console.log(urls);
	var bannersSource = getBannersSource(urls);
	//console.log(bannersSource);
}

function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function generateFileURLs(baseURL, bannersQuantity, maxValue){
	var urls = [];
	var numbersDrawn = [];
	while(numbersDrawn.length < bannersQuantity){
		var numberDrawn = randomIntFromInterval(1, maxValue);
		if(numbersDrawn.indexOf(numberDrawn) === -1){
			numbersDrawn.push(numberDrawn);
			urls.push(baseURL + numberDrawn + '.txt');
		}
	}
	//console.log(numbersDrawn);
	//console.log(urls);
	return urls;
}

function getBannersSource(urls){
	var bannersSource = [];
	for(var i = 0; i < urls.length; i++){
		readTextFile(urls[i]);
		bannersSource.push(allText);
	}
	return bannersSource;
}

function appendHTML(bannersAreaId, bannersSource){
	var bannerArea = document.getElementById(bannersAreaId);
}