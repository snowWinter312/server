var nodemailer = require('nodemailer');//importing node mailer

module.exports.register_email = async function(req, res){
  var receiver_email = req.body.email;
  var user_activation_key = req.body.user_activation_key;
  var sender_email = 'vadim.kim2022@gmail.com'
  var sender_email_password = '112233@Vadim'
  var mail_title = "Verify your email";
  var mail_body = "<p>Hey</p><p>Thanks for signing up to our site</p><p><a href='http://localhost:4200/register_confirm/"+user_activation_key+"' target='_blank'>Confirm your email address</a><p>Or copy and paste the following link into your browser:<p><p><a href='http://localhost:4200/register_confirm/"+user_activation_key+"' target='_blank'>http://localhost:4200/register_confirm/"+user_activation_key+"</a></P>If you ever have any questions, please don't hesitate to contact us</p><p>Thanks,</p><p>The Forum</p>";
  //var mail_body = "test";
	/*Transport service is used by node mailer to send emails, it takes service and auth object as parameters.
    here we are using gmail as our service 
    In Auth object , we specify our email and password
  */
  var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: sender_email,//replace with your email
		  pass: sender_email_password//replace with your password
		}
	  }); 
  
  /*
    var transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		requireTLS: true,
		auth: {
		  user: sender_email,//replace with your email
		  pass: sender_email_password//replace with your password
		}
	  }); 
    In mail options we specify from and to address, subject and HTML content.
    In our case , we use our personal email as from and to address,
    Subject is Contact name and 
    html is our form details which we parsed using bodyParser.
  */


  var mailOptions = {
    from: sender_email,//replace with your email
    to: receiver_email,//replace with your emai
    subject: mail_title,
    html:mail_body
  };
  
  /* Here comes the important part, sendMail is the method which actually sends email, it takes mail options and
   call back as parameter 
  */

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


