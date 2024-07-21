
import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

import { Pagination_Dto } from '@tesis-project/dev-globals/dist/core/dto';

import { Pagination_I, pagination_meta } from '@tesis-project/dev-globals/dist/core/helpers';
import { _Find_Many_I, _Find_One_I, _Process_Delete_I, _Process_Save_I, _Process_Update_I } from '@tesis-project/dev-globals/dist/core/interfaces';
import { Notifications_Ety } from './notification.entity';


@Injectable()
export class Notifications_Repository extends EntityRepository<Notifications_Ety> {


    constructor(
        em: EntityManager,
    ) {
        super(em.fork(), Notifications_Ety);
    }


    async create_notification({ save, _em }: _Process_Save_I<Notifications_Ety>): Promise<Notifications_Ety> {

        const new_notification = await _em.create(Notifications_Ety, save);
        await _em.persist(new_notification);
        return new_notification;

    }

    async find_all({ find, options, _em }: _Find_Many_I<Notifications_Ety, 'Notifications_Ety'>, Pagination_Dto?: Pagination_Dto): Promise<Pagination_I<Notifications_Ety>> {

        if (!Pagination_Dto) {
            return {
                data: await this.find( find, options ),
                meta: null
            };
        }

        const { page, limit } = Pagination_Dto;

        const totalRecords = await _em.count(Notifications_Ety, find);

        const data = await _em.find(Notifications_Ety, find, {
            ...options,
            limit,
            offset: (page - 1) * limit,
        });

        const meta: Pagination_I['meta'] = pagination_meta(page, limit, totalRecords);

        return {
            data,
            meta
        }

    }

    async delete_notification({ find, _em }: _Process_Delete_I<Notifications_Ety>): Promise<boolean> {

        const notificationFind = await this.findOne( find );

        if (!notificationFind) {
            throw new Error('Notification not found');
        }

        await _em.nativeDelete(Notifications_Ety, {
            _id: notificationFind._id
        });

        return true;

    }

    async update_notification({ find, update, _em }: _Process_Update_I<Notifications_Ety>): Promise<Notifications_Ety> {

        const notificationFind = await this.findOne( find );

        if (!notificationFind) {
            throw new Error('Notification not found');
        }

        Object.assign(notificationFind, update);
        await _em.persist(notificationFind);
        return notificationFind;

    }


}