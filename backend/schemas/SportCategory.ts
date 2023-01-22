import {relationship, text} from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import {isSignedIn, rules} from "../access";

export const SportCategory = list({
    access: {
        create: isSignedIn,
        read:   () => true,
        update: rules.canManageExercises,
        delete: rules.canManageExercises,
    },
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
