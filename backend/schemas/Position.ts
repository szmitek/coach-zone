import {relationship, text} from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import {isSignedIn, rules} from "../access";

export const Position = list({
    access: {
        create: isSignedIn,
        read:   () => true,
        update: rules.canManageExercises,
        delete: rules.canManageExercises,
    },
    ui: {
        listView: {
            initialColumns: ['name', 'sportCategory'],
        },
    },
    fields: {
        name: text({ isRequired: true }),
        sportCategory: relationship({ ref: 'SportCategory.positions', many: false }),
        exercise: relationship({ ref: 'Exercise.position', many: true }),
    },
});
