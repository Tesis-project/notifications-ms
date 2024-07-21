import { Email_I } from "@tesis-project/dev-globals/dist/modules/notifications/interfaces/emailing"
import * as nodemailer from 'nodemailer';
import { envs } from "../../../core/config/envs";
import { EmailConfig } from "../config/email.config";


interface Props_I {
    props: Email_I,
    data: {
        name: string,
        new_email
        key: string
    }
}

export const EmailChange = async ({
    props,
    data
}: Props_I) => {

    const {
        from,
        to,
    } = props

    const transporter = nodemailer.createTransport(EmailConfig());

    try {

        const subject: string = `Cambio de correo electrónico - ${data.name}`;
        const html: string = `
            <p>Hola ${data.name}</p>
            <p>Has solicitado un cambio de correo electrónico a ${data.new_email} en tu cuenta.</p>
            <p>Si no has sido tú, ignora este mensaje.</p>
            <p>Para confirmar el cambio, haz clic en el siguiente enlace:</p>
            <a href="${envs.web_url}/verify/${data.key}">Confirmar cambio</a>
        `;

        const info = await transporter.sendMail({
            from,
            to,
            subject,
            html
        });

        console.log("Message sent: %s", info.messageId);

    } catch (error) {

        console.error('[EmailChange] Email error:', error)

    }


}
