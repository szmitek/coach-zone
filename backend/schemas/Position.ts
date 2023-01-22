export const footballPositions = [
    { label: 'QB', value: 'QB' },
    { label: 'RB', value: 'RB' },
    { label: 'WR', value: 'WR' },
    { label: 'OL', value: 'OL' },
    { label: 'DL', value: 'DL' },
    { label: 'LB', value: 'LB' },
    { label: 'DB', value: 'DB' },
];

export const basketballPositions = [
    { label: 'PG', value: 'PG' },
    { label: 'SG', value: 'SG' },
    { label: 'SF', value: 'SF' },
    { label: 'PF', value: 'PF' },
    { label: 'C', value: 'C' },
];


import {relationship, text} from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import {isSignedIn, rules} from "../access";

export const Position = list({
    access: {
        create: isSignedIn,
        read: rules.canTeam,
        update: rules.canTeam,
        delete: rules.canTeam,
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
