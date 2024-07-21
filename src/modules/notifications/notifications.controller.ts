
import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';

import { Auth_User_I_Dto } from '@tesis-project/dev-globals/dist/modules/auth/dto';
import { Create_Notification_Dto } from '@tesis-project/dev-globals/dist/modules/notifications/dto';

@Controller()
export class NotificationsController {

    constructor(private readonly notificationsService: NotificationsService) { }

    @MessagePattern('notifications.find')
    find(
        @Payload('user_auth') user_auth: Auth_User_I_Dto
    ) {

        return this.notificationsService.find_all(user_auth);
    }

    @MessagePattern('notifications.create')
    create_notification(
        @Payload() createNotificationDto: Create_Notification_Dto,
    ) {

        return this.notificationsService.create_notification(createNotificationDto);
    }

    @MessagePattern('notifications.read')
    read_state(
        @Payload('_id', ParseUUIDPipe) _id: string,
        @Payload('user_auth') user_auth: Auth_User_I_Dto
    ) {

        return this.notificationsService.read_state(_id, user_auth);
    }

    @MessagePattern('notifications.delete')
    delete(
        @Payload('_id', ParseUUIDPipe) _id: string,
        @Payload('user_auth') user_auth: Auth_User_I_Dto
    ) {

        return this.notificationsService.delete(_id, user_auth);
    }

}
