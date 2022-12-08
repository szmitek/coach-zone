import {config, createSchema} from '@keystone-next/keystone/schema';
import 'dotenv/config';
import { User } from './schemas/User';
import { createAuth } from '@keystone-next/auth';
import { withItemData, statelessSessions} from '@keystone-next/keystone/session';
import { Exercise } from './schemas/Exercise';
import { ExerciseImage } from './schemas/ExerciseImage';
import { insertSeedData } from './seed-data';
import { Player } from './schemas/Player';
import { PlayerImage } from './schemas/PlayerImage';
import { sendPasswordResetEmail } from './lib/mail';
import { TrainingItem } from './schemas/TrainingItem';
import { extendGraphqlSchema } from './mutations';
import { Team } from './schemas/Team';
import { EventsListItem } from './schemas/EventsListItem';


const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-coach-zone';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, // how long to live for the session
    secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'],
        // TODO: Add in inital roles here
    },
    passwordResetLink: {
        async sendToken(args) {
            await sendPasswordResetEmail(args.token, args.identity);
        },
      },
  });

export default withAuth(
    config({
      // @ts-ignore
        server: {
            cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true,
            },
        },
        db: {
            adapter: 'mongoose',
            url: databaseURL,
            async onConnect(keystone) {
                console.log('Connected to database');
                if(process.argv.includes('--seed-data')) {
                    await insertSeedData(keystone);
                }
            }
        },
        lists: createSchema({
            // Schema items go in here
            User,
            Exercise,
            ExerciseImage,
            Player,
            PlayerImage,
            TrainingItem,
            Team,
            EventsListItem
        }),
        extendGraphqlSchema,
        ui: {
            // Show the UI only for poeple who pass this test
            isAccessAllowed: ({ session }) =>
            // console.log(session);
            !!session?.data,
        },
        session: withItemData(statelessSessions(sessionConfig), {
            // GraphQL Query
            User: 'id name email',
        }),
    })
  );
