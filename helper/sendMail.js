const nodemailer = require('nodemailer');
module.exports.sendMail = (email,otp,subject) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.emailUser,
          pass: process.env.emailPassword
        }
      });
      
      const mailOptions = {
        from: 'vuxuanthinh2003@gmail.com',
        to: email,
        subject: subject,
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OTP Confirmation</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 50px auto;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #ddd;
                }
                .header h1 {
                    margin: 0;
                    font-size: 24px;
                }
                .content {
                    padding: 20px 0;
                }
                .otp {
                    font-size: 24px;
                    font-weight: bold;
                    color: #333;
                    text-align: center;
                    margin: 20px 0;
                    padding: 10px;
                    background-color: #f9f9f9;
                    border: 1px dashed #ddd;
                    border-radius: 4px;
                }
                .footer {
                    text-align: center;
                    padding-top: 20px;
                    border-top: 1px solid #ddd;
                    color: #888;
                    font-size: 12px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Xác thực người dùng</h1>
                </div>
                <div class="content">
                    <p>Chào bạn,</p>
                    <p>Chúng tôi đã nhận được yêu cầu đổi mật khẩu từ bạn. Vui lòng sử dụng mã OTP dưới đây để hoàn tất quá trình xác nhận:</p>
                    <div class="otp">${otp}</div>
                    <p>Thời gian sử dụng otp trong 3 phút</p>
                    <p>Nếu bạn không yêu cầu đổi mật khẩu, vui lòng bỏ qua email này.</p>
                </div>
                <div class="footer">
                    <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
                    <p>&copy; 2024 Vũ Xuân Thịnh. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
       console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          // do something useful
        }
      });
}