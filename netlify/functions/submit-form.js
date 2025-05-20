const fetch = require('node-fetch');

exports.handler = async function (event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    const { 'h-captcha-response': captchaResponse } = JSON.parse(event.body);
    const secretKey = 'YOUR_SECRET_KEY';

    const verificationUrl = `https://hcaptcha.com/siteverify?secret=${secretKey}&response=${captchaResponse}`;

    try {
        const response = await fetch(verificationUrl, {
            method: 'POST',
        });
        const data = await response.json();

        if (data.success) {
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true }),
            };
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, error: data['error-codes'] }),
            };
        }
    } catch (error) {
        console.error('Error verifying hCaptcha:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: 'Internal Server Error' }),
        };
    }
};