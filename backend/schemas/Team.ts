import { integer, select, text, relationship, virtual } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Team = list({
    ui: {
        listView: {
            initialColumns: ['players', 'user'],
        },
    },
    fields: {
        user: relationship({ ref: 'User.team' }),
        players: relationship({ ref: 'Player.team', many: true}),
    },
});