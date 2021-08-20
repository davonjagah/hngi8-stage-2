var express=require('express');
var app=express();
const bodyParser=require('body-parser');
var PORT=process.env.PORT || 3000;

var nodemailer = require('nodemailer');



var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'davonkaze1@gmail.com',
    pass: 'wwrhqihfnnmjcdfi'
  }
});



app.use(bodyParser.urlencoded({ extended: true }));



app.post('/contact', function(req, res){ 
    var mailOptions = {
        from: req.body.email,
        to: 'davonkaze1@gmail.com',
        subject: 'New Contact Message',
        html: '<h1>Name: </h1>'+ req.body.name+'<br>'+ '<h1>Email: </h1>'+ req.body.email+'<br>'+'<h1>Phone: </h1>'+ req.body.phone+'<br>'+'Message:<p>'+req.body.message+'</p>'
      };
    transporter.sendMail(mailOptions, function (err, info) {
        if(err){
          res.redirect('../?message=failure');
        }
        else{
          res.redirect('../?message=success');
        }
        
    })
});

app.use(express.static('public'))

app.listen(PORT, function (){
    console.log('App is Running on http://localhost:'+PORT );
})


