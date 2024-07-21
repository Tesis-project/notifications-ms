

import { Email_I } from '@tesis-project/dev-globals/dist/modules/notifications/interfaces/emailing';
import { envs } from "../../../core/config/envs";
import { EmailConfig } from '../config/email.config';

import * as nodemailer from 'nodemailer';

interface Props_I {
    props: Email_I,
    data: {
        name: string,
        key: string
    }
}

export const CreatedAccount = async ({
    props,
    data
}: Props_I) => {

    const {
        from,
        to,
    } = props

    const transporter = nodemailer.createTransport(EmailConfig())

    try {

        const subject: string = `Te damos la bienvenida a la plataforma ${data.name}`;
        const html: string = `
            <h1>¡Hola ${data.name}!</h1>
            <p>Gracias por registrarte en nuestra plataforma.</p>
            <p>Para activar tu cuenta, por favor haz click en el siguiente enlace:</p>
            <a href="${envs.web_url}/verify/${data.key}">Activar cuenta</a>
        `;

        const info = await transporter.sendMail({
            from,
            to,
            subject,
            html
        });

        console.log("Message sent: %s", info.messageId);

    } catch (error) {

        console.error('[CreatedAccount] Email error:', error)

    }

}



