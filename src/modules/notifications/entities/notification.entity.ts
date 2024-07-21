import { Entity, EntityRepositoryType, Enum, Property } from "@mikro-orm/core";
import { Schema_key } from "../../../core/entities_global";
import { TempoHandler } from '@tesis-project/dev-globals/dist/core/classes';

import { NotificationState_Enum} from "@tesis-project/dev-globals/dist/modules/notifications/interfaces";
import { Notifications_Repository } from "./notifications.repository.service";

@Entity({
    tableName: 'notifications',
    collection: 'notifications',
    repository: () => Notifications_Repository
})
export class Notifications_Ety extends Schema_key {

    [EntityRepositoryType]?: Notifications_Repository;

    @Property({
        type: 'varchar'
    })
    subject: string;

    @Property({
        type: 'varchar'
    })
    message: string;

    @Enum({ items: () => NotificationState_Enum })
    @Property({
        nullable: true
    })
    state: NotificationState_Enum = NotificationState_Enum.UNREAD;

    @Property({
        type: 'timestamp',
        onCreate: () => new TempoHandler().date_now()
    })
    created_at? = new TempoHandler().date_now()

    @Property({
        type: 'timestamp',
        onUpdate: () => new TempoHandler().date_now()
    })
    read_at? = new TempoHandler().date_now();

    @Property({
        type: 'varchar',
    })
    user: any;

}