function stripTags(str){
    return str.replace(/<\/?[^>]+>/gi, '');
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

function getFormSubject(formId){
	return $('#' + formId + ' #subject').val();
}

function sendMail(formId){
	var formValues = validateContactForm(formId);
	var body = createContactEmail(formValues);
	var subject = getFormSubject(formId);
	sendToMandrill(body, subject);
	alert('Email Enviado!');
}