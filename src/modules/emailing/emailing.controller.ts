import { Controller } from '@nestjs/common';
import { EmailingService } from './emailing.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { Send_Email_Dto } from '@tesis-project/dev-globals/dist/modules/notifications/dto/send-email.dto';

@Controller()
export class EmailingController {

    constructor(private readonly emailingService: EmailingService) { }

    @MessagePattern('notifications.emailing.send')
    send_email(
        @Payload() send_email_dto: Send_Email_Dto,
    ) {

        return this.emailingService.send_email(send_email_dto);
    }


}
