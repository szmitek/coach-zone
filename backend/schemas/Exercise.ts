import { text, select, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { isSignedIn, rules } from '../access';

export const Exercise = list({
  access: {
    create: isSignedIn,
    read: rules.canReadExercise,
    update: rules.canManageExercises,
    delete: rules.canManageExercises,
  },
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    photo: relationship({
      ref: 'ExerciseImage.exercise',
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
        createView: { fieldMode: 'hidden' },
      },
    }),
    user: relationship({
      ref: 'User.exercise',
      defaultValue: ({ context }) => ({
        connect: { id: context.session.itemId },
      }),
    }),
  },
});
