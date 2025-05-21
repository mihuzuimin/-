const { hCaptcha } = require('h-captcha');
const secretKey = 'your_secret_key'; // 替换为你的 hCaptcha secret key
const client = new hCaptcha(secretKey);

exports.handler = async function(event) {
    const body = JSON.parse(event.body);
    const captchaResponse = body['h-captcha-response'];

    try {
        const result = await client.verify(captchaResponse);
        if (result.success) {
            // 验证成功，处理表单提交逻辑
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true }),
            };
        } else {
            // 验证失败
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, error: 'hCaptcha 验证失败' }),
            };
        }
    } catch (error) {
        console.error('验证 hCaptcha 时出错:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: '服务器内部错误' }),
        };
    }
};