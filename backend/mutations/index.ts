import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import addToTraining from './addToTraining';

export const extendGraphqlSchema = graphQLSchemaExtension({
    typeDefs: `
    type Mutation {
        addToTraining(exerciseId: ID): TrainingItem
    }`,
    resolvers: {
        Mutation: {
            addToTraining,
        }
    }
})