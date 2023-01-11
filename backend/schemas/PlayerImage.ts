import 'dotenv/config';
import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { cloudinaryImage } from '@keystone-next/cloudinary';
import {isSignedIn, permissions, rules} from "../access";

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: 'coachzone',
};

export const PlayerImage = list({
  access: {
    create: isSignedIn,
    read: rules.canManagePlayerImages,
    update: rules.canManagePlayerImages,
    delete: rules.canManagePlayerImages,
  },
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: 'Source',
    }),
    altText: text(),
    player: relationship({ ref: 'Player.photo' }),
  },
  ui: {
    listView: {
      initialColumns: ['image', 'altText', 'player'],
    }
  },
});
