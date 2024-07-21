
import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { Notifications_Repository } from './entities/notifications.repository.service';
import { Notifications_Ety } from './entities/notification.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    controllers: [NotificationsController],
    providers: [
        NotificationsService,
        Notifications_Repository
    ],
    imports: [
        MikroOrmModule.forFeature([
            Notifications_Ety
        ]),
    ]
})
export class NotificationsModule { }
