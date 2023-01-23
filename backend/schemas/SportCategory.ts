import {relationship, text} from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import {isSignedIn, rules} from "../access";

export const SportCategory = list({
    ui: {
        listView: {
            initialColumns: ['name', 'positions'],
        },
    },
    fields: {
        name: text({ isRequired: true }),
        positions: relationship({ ref: 'Position.sportCategory', many: true }),
        exercise: relationship({ ref: 'Exercise.sportCategory', many: true }),
    },
});
