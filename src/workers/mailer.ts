import { Worker } from 'bullmq';
import { config } from '../config/config';
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "carolyn.schuster@ethereal.email",
    pass: "rgNCWcuj1KPKgXg53R",
  },
});

export async function sendWelcomeMail({ to }: { to: string }) {
  console.log(`Sending mail to ${to}...`);
  
  const info = await transporter.sendMail({
    from: '"TrigreConf42 👻🐯" <TrigreConf42@ethereal.email>', // sender address
    to, // list of receivers
    subject: 'Welcome to Tiger jungle brazil', // Subject line
    text: "Aonde está o seu card?", // plain text body
    html: "<b>Aonde está o seu card?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}

const emailWorker = new Worker('email', async (job) => sendWelcomeMail({ to: job.data.to }), { connection: config.redis });

emailWorker.on('completed', (job) => { console.log(`Email sent. Job id: ${job.id}`)});
