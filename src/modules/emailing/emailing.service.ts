
import { Injectable, Logger } from '@nestjs/common';

import { Send_Email_Dto } from '@tesis-project/dev-globals/dist/modules/notifications/dto/send-email.dto';
import { ExceptionsHandler } from '../../core/helpers';
import { CreatedAccount, EmailChange, ResetPassword } from './templates';
import { _Response_I } from '@tesis-project/dev-globals/dist/core/interfaces';

@Injectable()
export class EmailingService {

    private readonly logger = new Logger('EmailingService');
    ExceptionsHandler = new ExceptionsHandler();
    service: string = 'EmailingService';

    constructor() {

    }

    async send_email(send_email_dto: Send_Email_Dto): Promise<_Response_I> {

        const {
            to,
            change_email,
            confirm_account,
            reset_password
        } = send_email_dto;

        let _Response: _Response_I;

        try {

            CreatedAccount

            if (change_email) {

                EmailChange({
                    props: {
                        to: to,
                    },
                    data: {
                        name: change_email.name,
                        key: change_email.key,
                        new_email: change_email.new_email
                    }
                })

            } else if (confirm_account) {

                CreatedAccount({
                    props: {
                        to: to,
                    },
                    data: {
                        name: confirm_account.name,
                        key: confirm_account.key
                    }
                })

            } else if (reset_password) {

                ResetPassword({
                    props: {
                        to: to,
                    },
                    data: {
                        name: reset_password.name,
                        key: reset_password.key
                    }
                })

            }

            _Response = {
                statusCode: 200,
                ok: true,
                message: 'Email sent successfully'
            }

        } catch (error) {

            this.logger.error(`[Send email] Error: ${error}`);
            this.ExceptionsHandler.EmitException(error, `${this.service}.send_email`);

        }

        return _Response;

    }


}
