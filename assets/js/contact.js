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