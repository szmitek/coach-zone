import { integer, text, select, relationship } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";

export const TrainingItem = list({
    ui: {
      listView: {
        initialColumns: ['exercise', 'user', 'quantity'],
      },
    },
    fields: {
        quantity: integer({
          defaultValue: 1,
          isRequired: true,
        }),
        exercise: relationship({ref: 'Exercise'}),
        user: relationship({ref: 'User.training'}),
        },
      });