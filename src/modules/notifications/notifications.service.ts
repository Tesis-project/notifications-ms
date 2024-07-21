

import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Auth_User_I_Dto } from '@tesis-project/dev-globals/dist/modules/auth/dto';
import { Create_Notification_Dto } from '@tesis-project/dev-globals/dist/modules/notifications/dto';
import { EntityManager } from '@mikro-orm/core';
import { Notifications_Repository } from './entities/notifications.repository.service';
import { Notifications_Ety } from './entities/notification.entity';
import { ExceptionsHandler } from '../../core/helpers';

import { _Response_I } from '@tesis-project/dev-globals/dist/core/interfaces';
import { RpcException } from '@nestjs/microservices';
import { NotificationState_Enum } from '@tesis-project/dev-globals/dist/modules/notifications/interfaces';
import * as uuid from 'uuid';

@Injectable()
export class NotificationsService {

    private readonly logger = new Logger('NotificationsService');
    ExceptionsHandler = new ExceptionsHandler();

    service: string = 'NotificationsService';

    constructor(
        private readonly _Notifications_RepositoryService: Notifications_Repository,
        private readonly em: EntityManager,
    ) {

    }

    async find_all(user_auth: Auth_User_I_Dto): Promise<_Response_I<Notifications_Ety[]>> {

        let _Response: _Response_I<Notifications_Ety[]>;

        try {
            // const f_em = this.em.fork();

            const notifications = await this._Notifications_RepositoryService.find({
                user: user_auth.user
            });

            _Response = {
                ok: true,
                message: 'Notificaciones encontradas con éxito',
                statusCode: HttpStatus.OK,
                data: [...notifications]
            }

        } catch (error) {

            this.logger.error(`[Find all notifications] Error: ${error}`);
            this.ExceptionsHandler.EmitException(error, `${this.service}.find_all`);

        }

        return _Response;

    }

    async create_notification(createNotificationDto: Create_Notification_Dto): Promise<_Response_I<Notifications_Ety>> {

        let _Response: _Response_I<Notifications_Ety>;

        try {

            const f_em = this.em.fork();
            const _id: string = uuid.v4();
            const new_notification = await this._Notifications_RepositoryService.create_notification({
                save: {
                    _id: _id,
                    ...createNotificationDto
                },
                _em: f_em
            });

            _Response = {
                ok: true,
                message: 'Notificación creada con éxito',
                statusCode: HttpStatus.CREATED,
                data: new_notification,
            }

            f_em.flush();

        } catch (error) {

            this.logger.error(`[Create notification] Error: ${error}`);
            this.ExceptionsHandler.EmitException(error, `${this.service}.create_notification`);

        }

        return _Response;

    }

    async read_state(_id: string, user_auth: Auth_User_I_Dto): Promise<_Response_I<Notifications_Ety>> {

        let _Response: _Response_I<Notifications_Ety>;

        try {
            const f_em = this.em.fork();

            let notification = await this._Notifications_RepositoryService.findOne({
                _id,
                user: user_auth.user
            });

            if (!notification) {
                _Response = {
                    ok: false,
                    statusCode: 404,
                    message: 'Notificación no encontrada',
                    data: null
                }

                throw new RpcException(_Response)
            }

            if(notification.state === NotificationState_Enum.READ) {
                _Response = {
                    ok: true,
                    message: 'Notificación ya ha sido leída',
                    statusCode: 200,
                    data: notification
                }

                throw new RpcException(_Response)
            }

            notification.state = NotificationState_Enum.READ;

            await this._Notifications_RepositoryService.update_notification({
                find: notification,
                update: notification,
                _em: f_em
            });

            _Response = {
                ok: true,
                message: 'Notificación leída con éxito',
                statusCode: 200,
                data: notification
            }

            f_em.flush();

        } catch (error) {

            this.logger.error(`[Read notification] Error: ${error}`);
            this.ExceptionsHandler.EmitException(error, `${this.service}.read_state`);

        }

        return _Response;

    }

    async delete(_id: string, user_auth: Auth_User_I_Dto): Promise<_Response_I<Notifications_Ety>> {

        let _Response: _Response_I<Notifications_Ety>;

        try {
            const f_em = this.em.fork();

            let notification = await this._Notifications_RepositoryService.findOne({
                _id,
                user: user_auth.user
            });

            if (!notification) {
                _Response = {
                    ok: false,
                    statusCode: 404,
                    message: 'Notificación no encontrada',
                    data: null
                }

                throw new RpcException(_Response)
            }

            await this._Notifications_RepositoryService.delete_notification({
                find: notification,
                _em: f_em
            });

            _Response = {
                ok: true,
                message: 'Notificación eliminada con éxito',
                statusCode: 200,
                data: notification
            }

            f_em.flush();

        } catch (error) {

            this.logger.error(`[Delete notification] Error: ${error}`);
            this.ExceptionsHandler.EmitException(error, `${this.service}.delete`);

        }

        return _Response;

    }

}
