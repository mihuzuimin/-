// 由于在本地环境中无法真正调用hCaptcha API，这里提供一个模拟验证函数
// 注意：在实际生产环境中，应该使用正确的secret key并调用官方API验证
function verifyCaptcha(token) {
    // 模拟验证逻辑，在真实环境中应替换为实际的API调用
    return new Promise((resolve) => {
        // 简单模拟：非空token就通过验证
        resolve({ success: token && token.length > 0 });
    });
}

// 模拟服务器端处理函数
// 在实际部署到Netlify或其他平台时，应使用平台提供的函数格式
function handleSubmit(event) {
    // 检查是Node.js环境还是浏览器环境
    if (typeof window !== 'undefined') {
        // 浏览器环境：直接返回模拟成功响应
        console.log('表单数据:', event);
        return { success: true, message: '表单提交成功（模拟环境）' };
    } else {
        // 模拟Node.js环境处理
        const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        const captchaResponse = body['h-captcha-response'];
        
        return verifyCaptcha(captchaResponse)
            .then(result => {
                if (result.success) {
                    // 验证成功，处理表单数据
                    console.log('表单数据:', body);
                    return {
                        statusCode: 200,
                        body: JSON.stringify({ success: true }),
                    };
                } else {
                    // 验证失败
                    return {
                        statusCode: 400,
                        body: JSON.stringify({ success: false, error: '人机验证失败' }),
                    };
                }
            })
            .catch(error => {
                console.error('处理表单时出错:', error);
                return {
                    statusCode: 500,
                    body: JSON.stringify({ success: false, error: '服务器内部错误' }),
                };
            });
    }
}

// 兼容不同环境的导出
if (typeof module !== 'undefined' && module.exports) {
    // Node.js环境
    module.exports = handleSubmit;
} else if (typeof window !== 'undefined') {
    // 浏览器环境
    window.handleSubmit = handleSubmit;
}