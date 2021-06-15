require('dotenv').config();
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import template from './emails/templates';

const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
	const oauth2Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, 'https://developers.google.com/oauthplayground');

	oauth2Client.setCredentials({
		refresh_token: process.env.REFRESH_TOKEN,
	});

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			type: 'OAuth2',
			user: process.env.EMAIL,
			accessToken: process.env.ACCESS_TOKEN,
			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			refreshToken: process.env.REFRESH_TOKEN,
		},
	});

	return transporter;
};

const sendEmail = async (emailOptions) => {
	try {
		let emailTransporter = await createTransporter();
		await emailTransporter.sendMail(emailOptions);
	} catch (error) {
		console.log(error);
	}
};

const mailObject = (subject, user, req, html) => ({
	subject,
	to: user.email,
	from: process.env.EMAIL,
	html: html(user, req),
});

const sendMail = {
	accountActivation: (user, req) => sendEmail(mailObject('Welcome to Airdady', user, req, template.accountActivation)),
    passwordReset: (user, req) => sendEmail(mailObject('Password Reset Instructions', user, req, template.passwordReset)),
};

export default sendMail;
