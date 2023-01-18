import { text, select, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Position = list({
    fields: {
        name: text({ isRequired: true }),
        sport: relationship({
            ref: 'Sport.positions',
            many: false
        }),
        exercise: relationship({
            ref: 'Exercise.position',
            many: true
        }),
    },
});
