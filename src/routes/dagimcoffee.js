const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(payload) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        secureConnection: false, 
        port: 587,    
        // secureConnection: false, // TLS requires secureConnection to be false
        // port: 587, // port for secure SMTP
        auth: {
            user: "nathygech111@outlook.com",
            pass: "1@AdminPasswordQ34D"
        },
        tls: {
            ciphers:'SSLv3'
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Dagim Import and Export" <nathygech111@outlook.com>', // sender address
        to: `nathygech111@gmail.com, ${payload.email}`, // list of receivers
        subject: "Coffe Sales Contract  ✔", // Subject line
        text: "Hello this is from Dagim import and export you have recieved email from" + payload.email, // plain text body
        html: customHthtml(payload), // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

}


router.post('/send', async (req, res) => {
    const info = req.body;
    try {
        main(info).catch(console.error);
        return res.json("email sent from: " + info.email);
    } catch (err) {
        return res.send({ message: err });
    }
});

router.post('/contact/us', async (req, res) => {
    const info = req.body;
    try {
        const messageId = await contact(info).catch(console.error);
        return res.json(messageId);
    } catch (err) {
        return res.send({ message: err });
    }
});

const customHthtml = function(payload) {
    return `
    <!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <meta charset="utf-8"> <!-- utf-8 works for most cases -->
        <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
        <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
        <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->
    
        <link href="https://fonts.googleapis.com/css?family=Work+Sans:200,300,400,500,600,700" rel="stylesheet">
    
        <!-- CSS Reset : BEGIN -->
        <style>
    
            /* What it does: Remove spaces around the email design added by some email clients. */
            /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
            html,
    body {
        margin: 0 auto !important;
        padding: 0 !important;
        height: 100% !important;
        /* width: 100% !important; */
        background: #f1f1f1;
    }
    
    /* What it does: Stops email clients resizing small text. */
    * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
    }
    
    /* What it does: Centers email on Android 4.4 */
    div[style*="margin: 16px 0"] {
        margin: 0 !important;
    }
    
    /* What it does: Stops Outlook from adding extra spacing to tables. */
    table,
    td {
        mso-table-lspace: 0pt !important;
        mso-table-rspace: 0pt !important;
    }
    
    /* What it does: Fixes webkit padding issue. */
    table {
        border-spacing: 0 !important;
        border-collapse: collapse !important;
        table-layout: fixed !important;
        margin: 0 auto !important;
    }
    
    /* What it does: Uses a better rendering method when resizing images in IE. */
    img {
        -ms-interpolation-mode:bicubic;
    }
    
    /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
    a {
        text-decoration: none;
    }
    
    /* What it does: A work-around for email clients meddling in triggered links. */
    *[x-apple-data-detectors],  /* iOS */
    .unstyle-auto-detected-links *,
    .aBn {
        border-bottom: 0 !important;
        cursor: default !important;
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }
    
    /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
    .a6S {
        display: none !important;
        opacity: 0.01 !important;
    }
    
    /* What it does: Prevents Gmail from changing the text color in conversation threads. */
    .im {
        color: inherit !important;
    }
    
    /* If the above doesn't work, add a .g-img class to any image in question. */
    img.g-img + div {
        display: none !important;
    }
    
    /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
    /* Create one of these media queries for each additional viewport size you'd like to fix */
    
    /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
    @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
        u ~ div .email-container {
            min-width: 320px !important;
        }
    }
    /* iPhone 6, 6S, 7, 8, and X */
    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
        u ~ div .email-container {
            min-width: 375px !important;
        }
    }
    /* iPhone 6+, 7+, and 8+ */
    @media only screen and (min-device-width: 414px) {
        u ~ div .email-container {
            min-width: 414px !important;
        }
    }
        </style>
    
        <!-- CSS Reset : END -->
    
        <!-- Progressive Enhancements : BEGIN -->
        <style>
    
            .primary{
        background: rgb(139, 69, 19);
    }
    .bg_white{
        background: #ffffff;
    }
    .bg_light{
        background: #f7fafa;
    }
    .bg_black{
        background: #000000;
    }
    .bg_dark{
        background: rgba(0,0,0,.8);
    }
    .email-section{
        padding:2.5em;
    }
    
    /*BUTTON*/
    .btn{
        padding: 10px 15px;
        display: inline-block;
    }
    .btn.btn-primary{
        border-radius: 5px;
        background: rgb(139, 69, 19);;
        color: #ffffff;
    }
    .btn.btn-white{
        border-radius: 5px;
        background: #ffffff;
        color: #000000;
    }
    .btn.btn-white-outline{
        border-radius: 5px;
        background: transparent;
        border: 1px solid #fff;
        color: #fff;
    }
    .btn.btn-black-outline{
        border-radius: 0px;
        background: transparent;
        border: 2px solid #000;
        color: #000;
        font-weight: 700;
    }
    .btn-custom{
        color: rgba(0,0,0,.3);
        text-decoration: underline;
    }
    
    h1,h2,h3,h4,h5,h6{
        font-family: 'Work Sans', sans-serif;
        color: #000000;
        margin-top: 0;
        font-weight: 400;
    }
    
    body{
        font-family: 'Work Sans', sans-serif;
        font-weight: 400;
        font-size: 15px;
        line-height: 1.8;
        color: rgba(0,0,0,.4);
    }
    
    a{
        color: rgb(139, 69, 19);;
    }
    
    table{
    }
    /*LOGO*/
    
    .logo h1{
        margin: 0;
    }
    .logo h1 a{
        color: rgb(139, 69, 19);;
        font-size: 24px;
        font-weight: 700;
        font-family: 'Work Sans', sans-serif;
    }
    
    /*HERO*/
    .hero{
        position: relative;
        z-index: 0;
    }
    
    .hero .text{
        color: rgba(0,0,0,.3);
    }
    .hero .text h2{
        color: #000;
        font-size: 34px;
        margin-bottom: 15px;
        font-weight: 300;
        line-height: 1.2;
    }
    .hero .text h3{
        font-size: 24px;
        font-weight: 200;
    }
    .hero .text h2 span{
        font-weight: 600;
        color: #000;
    }
    
    
    /*PRODUCT*/
    .product-entry{
        display: block;
        position: relative;
        float: left;
        padding-top: 20px;
    }
    .product-entry .text{
        width: calc(100% - 125px);
        padding-left: 20px;
    }
    .product-entry .text h3{
        margin-bottom: 0;
        padding-bottom: 0;
    }
    .product-entry .text p{
        margin-top: 0;
    }
    .product-entry img, .product-entry .text{
        float: left;
    }
    
    ul.social{
        padding: 0;
    }
    ul.social li{
        display: inline-block;
        margin-right: 10px;
    }
    
    /*FOOTER*/
    
    .footer{
        border-top: 1px solid rgba(0,0,0,.05);
        color: rgba(0,0,0,.5);
    }
    .footer .heading{
        color: #000;
        font-size: 20px;
    }
    .footer ul{
        margin: 0;
        padding: 0;
    }
    .footer ul li{
        list-style: none;
        margin-bottom: 10px;
    }
    .footer ul li a{
        color: rgba(0,0,0,1);
    }
    
    
    @media screen and (max-width: 500px) {
    
    
    }
    
    
        </style>
    
    
    </head>
    
    <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
        <center style="width: 100%; background-color: #f1f1f1;">
        <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
          &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        </div>
        <div style="max-width: 600px; margin: 0 auto;" class="email-container">
            <!-- BEGIN BODY -->
          <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
              <tr>
              <td valign="top" class="bg_white" style="padding: 1em 2.5em 0 2.5em;">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                          <td class="logo" style="text-align: center;">
                           <a href="https://dagimcoffee.com"><img style="background-color: gray;" src="web/images/logo.png" alt=""></a>
                            <h1><a href="#">Dagim Import and Export</a></h1>
                            <h4>Speciality Coffee</h4>
                          </td>
                        </tr>
                        
                    </table>
                    <table>
                        <tr style="">
                            <td style="text-align:left; padding: 0 2.5em; color: #000; padding-bottom: 0px"><p>Kirkos, Addis Ababa</p></td>
                            <td style="text-align:right; padding: 0 2.5em; color: #000; padding-bottom: 0px">Price</td>
                          </tr>
                        <tr style="border-bottom: 1px solid rgba(0,0,0,.05);">
                            <td style="text-align:center; padding: 0 2.5em; color: #000; padding-bottom: 0px"><a class="blue" href="mailto:alemayehunegash18@gmail.com">alemayehunegash18@gmail.com</a></td>
                            <td style="text-align:right; padding: 0 2.5em; color: #000; padding-bottom: 0px">Price</td>
                          </tr>
                          
                    </table>
                  
              </td>
              </tr><!-- end tr -->
                    <tr>
              <td valign="middle" class="hero bg_white" style="padding: 2em 0 2em 0;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td style="padding: 0 2.5em; text-align: center;">
                            <div class="text">
                                <h2>Dagim Coffee Sales Contract</h2>
                            </div>
                        </td>
                    </tr>
                </table>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td style="padding: 0 2.5em; text-align: right;">
                            <div class="text">
                                <h5>Contract Number: DCCN/001</h5>
                                <h5>Date: <span id="contractdate"></span></h5>
                            </div>
                        </td>
                    </tr>
                </table>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td style="padding-left: 2.5em; text-align: left;">
                            <div class="text">
                                <h3>Buyer: ${payload.buyer}</h3>
                                <h3>Consignee: ${payload.consignee}</h3>
                                <h4>Seller/Shipper: Alemayehu Negash Dabi (Dagim Import and Export)</h4>
                                <h4>On Behalf Of: Alemayehu Negash Dabi (Dagim Import and Export)</h4>
                            </div>
                        </td>
                    </tr>
                </table>
              </td>
              </tr><!-- end tr -->
              <tr>
                  <table class="bg_white" role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr style="border-bottom: 1px solid rgba(0,0,0,.05);">
                            <td width="80%" style="text-align:left; padding: 0 2.5em; color: #000; padding-bottom: 20px">Item</td>
                            <td width="20%" style="text-align:right; padding: 0 2.5em; color: #000; padding-bottom: 20px">Price</td>
                          </tr>
                          <tr style="border-bottom: 1px solid rgba(0,0,0,.05);">
                              <td valign="middle" width="80%" style="text-align:left; padding: 0 2.5em;">
                                  <div class="product-entry">
                                      <img src="images/prod-1.jpg" alt="" style="width: 100px; max-width: 600px; height: auto; margin-bottom: 20px; display: block;">
                                      <div class="text">
                                          <h3>Analog Wrest Watch</h3>
                                          <span>Small</span>
                                          <p>${payload.description}</p>
                                      </div>
                                  </div>
                              </td>
                              <td valign="middle" width="20%" style="text-align:left; padding: 0 2.5em;">
                                  <span class="price" style="color: #000; font-size: 20px;">$120</span>
                              </td>
                          </tr>
                          <tr style="border-bottom: 1px solid rgba(0,0,0,.05);">
                              <td valign="middle" width="80%" style="text-align:left; padding: 0 2.5em;">
                                  <div class="product-entry">
                                      <img src="images/prod-2.jpg" alt="" style="width: 100px; max-width: 600px; height: auto; margin-bottom: 20px; display: block;">
                                      <div class="text">
                                          <h3>Analog Wrest Watch</h3>
                                          <span>Small</span>
                                          <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                      </div>
                                  </div>
                              </td>
                              <td valign="middle" width="20%" style="text-align:left; padding: 0 2.5em;">
                                  <span class="price" style="color: #000; font-size: 20px;">${payload.size}</span>
                              </td>
                          </tr>
                          <tr>
                              <td valign="middle" style="text-align:left; padding: 1em 2.5em;">
                                  <p><a href="#" class="btn btn-primary">Continur your order</a></p>
                              </td>
                          </tr>
                  </table>
              </tr><!-- end tr -->
          <!-- 1 Column Text + Button : END -->
          </table>
          <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
              <tr>
              <td valign="middle" class="bg_light footer email-section">
                <table>
                    <tr>
                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: left; padding-right: 10px;">
                              <h3 class="heading">About</h3>
                              <p>Dagim Coffee is the best</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: left; padding-left: 5px; padding-right: 5px;">
                              <h3 class="heading">Contact Info</h3>
                              <ul>
                                        <li><span class="text">Ambassador Theater, Piassa, Addis Ababa, Ethiopia</span></li>
                                        <li><a class="blue" href="tel:0911218438">+2519 1121 8438</a></li>
                                      </ul>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: left; padding-left: 10px;">
                              <h3 class="heading">Useful Links</h3>
                              <ul>
                                        <li><a href="#">Home</a></li>
                                        <li><a href="#">Account</a></li>
                                        <li><a href="#">Wishlist</a></li>
                                        <li><a href="#">Order</a></li>
                                      </ul>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr><!-- end: tr -->
            <tr>
              <td class="bg_white" style="text-align: center;">
                <p class="p-small">Copyright © <span id="year"></span> <a href="https://dagimcoffee.com">Dagim Import & Export</a> - All rights reserved</p>
                <script>
                    function dateSetter() {
                        var yearValue = new Date();
                        var sp = document.getElementById("year").innerHTML = yearValue.getFullYear();
                        var sp2 = document.getElementById("contractdate").innerHTML = yearValue.toDateString()
                    }
                    dateSetter();
                </script>
              </td>
            </tr>
          </table>
    
        </div>
      </center>
    </body>
    </html>
    `;
}
module.exports = router;