document.addEventListener('DOMContentLoaded', function () {
    const colorLinks = document.querySelectorAll('.color-link');
    colorLinks.forEach(link => {
        link.addEventListener('click', function () {
            const color = this.id;
            switch (color) {
                case 'gulf-blue':
                    document.documentElement.style.setProperty('--primary-color', '#26b3e6');
                    document.documentElement.style.setProperty('--secondary-color', '#1a9bc8');
                    break;
                case 'sunset-purple':
                    document.documentElement.style.setProperty('--primary-color', '#9b59b6');
                    document.documentElement.style.setProperty('--secondary-color', '#8e44ad');
                    break;
                case 'vivid-magenta':
                    document.documentElement.style.setProperty('--primary-color', '#e74c3c');
                    document.documentElement.style.setProperty('--secondary-color', '#c0392b');
                    break;
                case 'lightning-yellow':
                    document.documentElement.style.setProperty('--primary-color', '#f1c40f');
                    document.documentElement.style.setProperty('--secondary-color', '#f39c12');
                    break;
                case 'parrot-green':
                    document.documentElement.style.setProperty('--primary-color', '#2ecc71');
                    document.documentElement.style.setProperty('--secondary-color', '#27ae60');
                    break;
            }
        });
    });
});

// 添加在现有代码后面

// hCaptcha验证处理
document.addEventListener('DOMContentLoaded', function() {
    const verifyButton = document.getElementById('verify-button');
    const captchaModal = document.getElementById('captcha-modal');
    const mainContent = document.getElementById('main-content');

    verifyButton.addEventListener('click', function() {
        // 获取hCaptcha响应
        const hcaptchaResponse = hcaptcha.getResponse();
        
        if(hcaptchaResponse) {
            // 验证成功，隐藏验证模态框，显示主内容
            captchaModal.style.display = 'none';
            mainContent.style.display = 'block';
            
            // 这里可以添加将验证响应发送到服务器的代码
        } else {
            alert('请先完成人机验证');
        }
    });

    // 表单提交处理
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 再次验证hCaptcha响应
            if(!hcaptcha.getResponse()) {
                alert('请先完成人机验证');
                return false;
            }
            
            // 验证通过，提交表单
            this.submit();
        });
    }
});