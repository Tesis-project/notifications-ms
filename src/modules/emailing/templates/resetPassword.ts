


import { Email_I } from '@tesis-project/dev-globals/dist/modules/notifications/interfaces/emailing';

import * as nodemailer from 'nodemailer';
import { envs } from "../../../core/config/envs";
import { EmailConfig } from "../config/email.config";

interface Props_I {
    props: Email_I,
    data: {
        name: string,
        key: string
    }
}

export const ResetPassword = async ({
    props,
    data
}: Props_I) => {

    const {
        from,
        to,
    } = props

    const transporter = nodemailer.createTransport(EmailConfig());

    try {

        const subject: string = `Recuperación de contraseña`;
        const html: string = `
            <h1>¡Hola!</h1>
            <p>Has solicitado recuperar tu contraseña.</p>
            <p>Para cambiar tu contraseña, por favor haz click en el siguiente enlace:</p>
            <a href="${envs.web_url}/verify/${data.key}">Cambiar contraseña</a>
        `;

        const info = await transporter.sendMail({
            from,
            to,
            subject,
            html
        });

        console.log("Message sent: %s", info.messageId);

    } catch (error) {

        console.error('[ResetPassword] Email error:', error)

    }

}



