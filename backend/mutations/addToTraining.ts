import { KeystoneContext, SessionStore } from "@keystone-next/types";
import { TrainingItemCreateInput } from '../.keystone/schema-types';
import { Session } from "../types";
import {TrainingItem} from '../schemas/TrainingItem'

async function addToTraining(
    root: any,
    { exerciseId }: { exerciseId: string },
    context: KeystoneContext
    ): Promise<TrainingItemCreateInput> {
    // Query the current user see if they are signed in
    const sesh = context.session as Session;
    if (!sesh.itemId) {
        throw new Error('You must be logged in to do this!');
    }
    // Query the current users cart
    const allTrainingItems = await context.lists.TrainingItem.findMany({
        where: { user: { id: sesh.itemId }, exercise: { id: exerciseId } },
        resolveFields: 'id,quantity'
    });
  
    const [existingTrainingItem] = allTrainingItems;
    if (existingTrainingItem) {
        console.log(existingTrainingItem)
        console.log(
            `There are already ${existingTrainingItem.quantity}`
        );
        // See if the current item is in their Training
        // if itis, make it single item 
        return await context.lists.TrainingItem.updateOne({
            id: existingTrainingItem.id,
            data: { quantity: existingTrainingItem.quantity + 1 - 1 },
            resolveFields: false,
        });
    }
    // if it isnt, create a new training item
    return await context.lists.TrainingItem.createOne({
        data: {
            exercise: { connect: { id: exerciseId }},
            user: { connect: { id: sesh.itemId }},
        },
        resolveFields: false,
        })
    } 
  
export default addToTraining;
  