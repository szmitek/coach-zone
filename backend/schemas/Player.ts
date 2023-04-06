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
        { label: 'Point Guard', value: 'Point Guard' },
        { label: 'Shooting Guard', value: 'Shooting Guard' },
        { label: 'Small Forward', value: 'Small Forward' },
        { label: 'Power Forward', value: 'Power Forward' },
        { label: 'Center', value: 'Center' },
        { label: 'Pitcher', value: 'Pitcher' },
        { label: 'Catcher', value: 'Catcher' },
        { label: 'First Base', value: 'First Base' },
        { label: 'Second Base', value: 'Second Base' },
        { label: 'Third Base', value: 'Third Base' },
        { label: 'Shortstop', value: 'Shortstop' },
        { label: 'Outfield', value: 'Outfield' },
        { label: 'Forward', value: 'Forward' },
        { label: 'Defenseman', value: 'Defenseman' },
        { label: 'Goalie', value: 'Goalie' },
        { label: 'Goalkeeper', value: 'Goalkeeper' },
        { label: 'Defender', value: 'Defender' },
        { label: 'Midfielder', value: 'Midfielder' },
        { label: 'Forward', value: 'Forward' },

      ],
      ui: {
        displayMode: 'segmented-control',
        // createView: { fieldMode: 'hidden' },
      },
    }),
    team: relationship({ ref: 'Team.players' }),
  },
});
