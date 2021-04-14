var nodemailer = require('nodemailer');//importing node mailer
var hostURL = "http://localhost:3000"
var sender_email = ''
var sender_email_password = ''

module.exports.register_email = async function(req, res){
  var receiver_email = req.body.email;
  var user_activation_key = req.body.user_activation_key;
  
  var mail_title = "Verify your email";
  var mail_body = "<p>Hey</p><p>Thanks for signing up to our site</p><p><a href='"+hostURL+"/confirm/"+user_activation_key+"' target='_blank'>Confirm your email address by clicking this link</a></p><p>Or copy and paste the following link into your browser: "+hostURL+"/confirm/"+user_activation_key+"</a></p><p>Thanks</p>";  

  var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: sender_email,//replace with your email
		  pass: sender_email_password//replace with your password
		}
	  });  

  var mailOptions = {
    from: sender_email,//replace with your email
    to: receiver_email,//replace with your emai
    subject: mail_title,
    html:mail_body
  };
  
  // Here comes the important part, sendMail is the method which actually sends email, it takes mail options and call back as parameter   

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      //res.send('error') // if error occurs send error as response to client
	  res.status(401).json(error);
    } else {
      console.log('Email sent: ' + info.response);
      //res.send('Sent Successfully')//if mail is sent successfully send Sent successfully as response
	  res.status(201).json(info.response);
    }
	return;
  });
 
  
}

module.exports.forgot_email = async function(req, res){
  var receiver_email = req.body.email;
  var user_activation_key = req.body.user_activation_key;
  var mail_title = "Create new password";
  var mail_body = "<p>Hey</p><p><a href='"+hostURL+"/password-setting/"+user_activation_key+"' target='_blank'>Click this URL to set new password</a></p><p>Or copy and paste the following link into your browser: "+hostURL+"/password-setting/"+user_activation_key+"</P><p>Thanks,</p><p>The Forum</p>"; 
  
  var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: sender_email,//replace with your email
		  pass: sender_email_password//replace with your password
		}
	  });  

  var mailOptions = {
    from: sender_email,//replace with your email
    to: receiver_email,//replace with your emai
    subject: mail_title,
    html:mail_body
  };
  
  // Here comes the important part, sendMail is the method which actually sends email, it takes mail options and call back as parameter 
  

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      //res.send('error') // if error occurs send error as response to client
	  res.status(401).json(error);
    } else {
      console.log('Email sent: ' + info.response);
      //res.send('Sent Successfully')//if mail is sent successfully send Sent successfully as response
	  res.status(201).json(info.response);
    }
	return;
  });
  
}


