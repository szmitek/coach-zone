import { text, select, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import {isSignedIn, rules} from "../access";

export const Player = list({
   access: {
     create: isSignedIn,
     read: rules.canManagePlayerItems,
     update: rules.canManagePlayerItems,
     delete: rules.canManagePlayerItems,
   },
  fields: {
    name: text({ isRequired: true }),
    number: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    strengths: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    weaknesses: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    photo: relationship({
      ref: 'PlayerImage.player',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    position: select({
      options: [
        { label: 'OL', value: 'OL' },
        { label: 'RB', value: 'RB' },
        { label: 'WR', value: 'WR' },
        { label: 'DL', value: 'DL' },
        { label: 'LB', value: 'LB' },
        { label: 'DB', value: 'DB' },
      ],
      ui: {
        displayMode: 'segmented-control',
        // createView: { fieldMode: 'hidden' },
      },
    }),
    team: relationship({ ref: 'Team.players' }),
  },
});
