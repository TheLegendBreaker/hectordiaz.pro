// load dependency libraries

scriptLoader = function(src) {

	if (document) {
			const script = document.createElement('script')
			script.setAttribute('src', src)
			document.head.appendChild(script)
			}

}

loadSMTPJS = function() {
	const src = "https://smtpjs.com/v3/smtp.js";
	scriptLoader(src);
}
// end load dependency libraries

renderContactForm = function() {
	const container = document.querySelector('.contact-form'),
		form = ` <form class="send-email" id="email">
			<p>Send me your email and I will get in touch. </p>
			<label><span class="sr-only">Send your email</span>
			<input type="email" name="email">
			</label>
			<button>send</button>
			</form> `;
	if (container !== undefined) {
		container.innerHTML = form;
	}
}

// input bread crumb animations

addWaitingAnimation = function(input) {
	input.classList.add('pulse','waiting');
}

removeWaitingAnimation = function(input) {
	input.classList.remove('pulse','waiting');
}

addSuccessBreadcrumb = function(input) {
	input.classList.add('success');
	input.innerHTML = "sent";
}

removeSuccessBreadcrumb = function(input) {
	input.classList.remove('success');
}

addErrorBreadcrumb = function(input) {
	input.classList.add('error');
}

removeErrorBreadcrumb = function(input) {
	input.classList.remove('error');
}

getEmailInput = function() {
	return document.querySelector('#email input');
}

// input bread crumb animations

getEmailFormData = function() {
	// abstract this function further
	const form = document.getElementById('email'),
	data = new FormData(form);
	return (data.get('email') ? data : false);
}

formatNotification = function(data) {
	// format the form data.
	let email = {};
	email['sender'] = data.get('email');
	email['subject'] = email['sender']+" wants to talk about hiring you.";
	email['body'] = email['sender']+"  has sent you their email address on <current date and time> and would like to set up a time to chat with you.";

	return email;
	}

getAndFormatEmail = function() {
	const data = getEmailFormData();
	let email;

	if (data) {
		return email = formatNotification(data);
		}
}

msgHandler = function(message, input) {
	removeWaitingAnimation(input);
	if(  message != "OK" ) {
			addErrorBreadcrumb(input);
			alert(message);
			return;
		}
	if(input.classList.contains('error')) {
			removeErrorBreadcrumb(input);
		}
	addSuccessBreadcrumb(input);
}

sendEmail = function(email={},btn) {
	addWaitingAnimation(btn);
	Email.send({
		SecureToken: "9bc48b97-64de-45cf-a431-8fc54086798b",
		To: "hector@hectordiaz.pro",
		From: "hector@hectordiaz.pro",
		Subject: email.subject,
		Body: email.body
	}).then (
		message => {
			msgHandler(message, btn)
		}
	);
}

emailFormActions = function(email={}) {
	const submitBtn = document.querySelector('#email button');

	submitBtn.addEventListener('click', (event)=>{
		event.stopImmediatePropagation();
		event.preventDefault();
		email = getAndFormatEmail();
		sendEmail(email, submitBtn) });
}

// invocations

loadSMTPJS();
renderContactForm();
emailFormActions();

// end invocations
