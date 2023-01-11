import 'dotenv/config';
import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { cloudinaryImage } from '@keystone-next/cloudinary';
import { isSignedIn, permissions } from "../access";

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: 'coachzone',
};

export const ExerciseImage = list({
  access: {
    create: isSignedIn,
    read: () => true,
    update: permissions.canManageExercises,
    delete: permissions.canManageExercises,
  },
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: 'Source',
    }),
    altText: text(),
    exercise: relationship({ ref: 'Exercise.photo' }),
  },
  ui: {
    initialColumns: ['image', 'altText', 'exercise'],
  },
});
