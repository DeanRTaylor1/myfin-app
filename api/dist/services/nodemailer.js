"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmationEmailHandler = void 0;
const nodemailer = require('nodemailer');
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class confirmationEmailHandler {
    static sendConfirmationEmail(name, email, userid) {
        this.transport.sendMail({
            from: process.env.NODEMAIL_EMAIL,
            to: email,
            subject: 'Please confirm your MyFin Account',
            html: `<div
        style="
          font-family: Verdana;
          display: flex;
          padding: 3rem;
          justify-content: center;
          align-items: center;
        "
      >
        <div
          style="
          height: 30rem; 
            display: flex;
            padding: 0.5rem;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            width: 24rem;
            gap: 3rem;
            background-color: rgb(248 250 252);
          "
        >
          <div style="display: flex; flex-direction: column; gap: 1rem">
            <h1
              style="
                color: #60a5fa;
                font-size: 1.875rem;
                line-height: 2.25rem;
                font-weight: 800;
                width: max-content;
              "
            >
              MyFin
            </h1>
            <h3 style="font-weight: 700">Confirm Your Email!</h3>
          </div>
          <div style="display: flex; flex-direction: column; gap: 2rem">
            <p style="height: 1.5rem">Just one more step ${name}...</p>
            <p style="height: 1.5rem">
              Click the link below to confirm your email:
            </p>
            <a
              class="h-12"
              href="${process.env.CLIENT_URL}auth/confirm/${userid}"
              style="text-decoration: underline; font-weight: 800; height: 1.5rem"
              >link</a
            >
          </div>
          <div style="display: flex; flex-direction: column; gap: 2rem">
            <p style="height: 1.5rem">Kind Regards,</p>
            <p style="color: #60a5fa; font-weight: 800; height: 1.5rem"
              >MyFin Team</p
            >
          </div>
        </div>
      </div>`,
        }, (err, info) => {
            if (err) {
                return console.log('\x1b[36m%s\x1b[0m', err);
            }
            console.log('\x1b[32m%s\x1b[0m', 'sent email ' + info.response);
        });
    }
}
exports.confirmationEmailHandler = confirmationEmailHandler;
confirmationEmailHandler.transport = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
        user: process.env.NODEMAIL_EMAIL,
        pass: process.env.NODEMAIL_PASS,
    },
});
// const transport = nodemailer.createTransport({
//   service: 'Outlook',
//   auth: {
//     user: 'deanrtaylor@hotmail.com',
//     pass: '25059threE',
//   },
// });
// const sendConfirmationEmail = (name: string, email: string, userid: string) => {
//   transport.sendMail(
//     {
//       from: 'deanrtaylor@hotmail.com',
//       to: email,
//       subject: 'Please confirm your MyFin Account',
//       html: `<h1>Email Confirmation</h1>
//                 <h2>Hello ${name}</h2>
//                 <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
//                 <a href=https://finance-planner.dev/auth/confirm/${userid}> Click here</a>
//                 </div>`,
//     },
//     (err: any, info: any) => {
//       if (err) {
//         return console.log(err);
//       }
//       console.log('sent email ' + info.response);
//     }
//   );
// };
// export { sendConfirmationEmail };
