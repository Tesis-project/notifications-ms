
import { Module } from '@nestjs/common';
import { MIKRO_ORM_MODULE_CONFIG } from './database/mikro-orm.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { EmailingModule } from './modules/emailing/emailing.module';

@Module({
    imports: [
        MIKRO_ORM_MODULE_CONFIG,
        NotificationsModule,
        EmailingModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
