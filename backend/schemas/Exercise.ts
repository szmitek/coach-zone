import { text, select, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { isSignedIn, rules } from '../access';

export const Exercise = list({
  access: {
    create: isSignedIn,
    read:   () => true,
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
    sportCategory: relationship({
      ref: 'SportCategory.exercise',
      many: false,
    }),
    position: relationship({
        ref: 'Position.exercise',
      many: false,
    }),
    user: relationship({
      ref: 'User.exercise',
      create: true,
      update: true,
      many: false,
      defaultValue: ({ context }) => ({
        connect: { id: context.session.itemId },
      }),
    }),
  },
});
