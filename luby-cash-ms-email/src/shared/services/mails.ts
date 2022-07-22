import nodemailer from 'nodemailer';

export default async function sendMail(message: string) {
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
    user: "0d65f13fede99c",
    pass: "750e45bf5e202a"
    }
  });

  const mailOptions = {
    from: 'no-reply@ms-emails.com',
    to: 'sender@email.com',
    subject: 'E-mail enviado usando KAFKA!',
    html: `<p>${message}</p>`
  };

  transport.sendMail(mailOptions, function (error, info) {
    if (error) {
    console.log(error);

      throw new Error('Falha no envio do email')
    } else {
     console.log('Email enviado: ' + info.response);
    }   
  });
}