import { text, select, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Sport = list({
    fields: {
        name: text({ isRequired: true }),
        positions: relationship({
            ref: 'Position.sport',
            many: true,
            ui: {
                listView: {
                    initialColumns: ['name', 'positions'],
                },
            },
        }),
        exercise: relationship({
            ref: 'Exercise.sport',
            many: true
        })
    },
});
