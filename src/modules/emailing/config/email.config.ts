import { envs } from "../../../core/config/envs"
import { EmailConfig_I } from "../interfaces"


export const EmailConfig = (): EmailConfig_I => {

    let conf: any = {
        host: envs.email_host,
        port: envs.email_port,
        secure: envs.email_secure,
    }

    if (envs.email_service != '') {
        conf = {
            service: envs.email_service
        }
    }

    return {
        ...conf,
        auth: {
            pass: envs.email_pass,
            user: envs.email_user
        }

    }

}