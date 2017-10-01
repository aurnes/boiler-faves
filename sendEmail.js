exports.mail = function(number, content, recipient){

    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'boilerfaves@gmail.com',
            pass: 'defenders'
        }
    });

    var mailOptions = {
        from: 'boilerfaves@gmail.com',
        to: number + '@' + recipient,
        text: content
    };

    console.log(mailOptions);

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}
