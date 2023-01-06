import { text, select, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Exercise = list({
  // todo
  // access:
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
        // createView: { fieldMode: 'hidden' },
      },
    }),
    // TODO: Photo
  },
});
