import React from 'react';

import { HomePage } from '@keystone-next/admin-ui/pages/HomePage';
import { gql } from '@keystone-next/admin-ui/apollo';

export default function Home() {
  return (
    <HomePage
      query={gql`
        query {
          keystone {
            adminMeta {
              lists {
                key
                fields {
                  path
                  createView {
                    fieldMode
                  }
                }
              }
            }
          }
          User: _allUsersMeta {
            count
          }
          Exercise: _allExercisesMeta {
            count
          }
          ExerciseImage: _allExerciseImagesMeta {
            count
          }
          Player: _allPlayersMeta {
            count
          }
          PlayerImage: _allPlayerImagesMeta {
            count
          }
          TrainingItem: _allTrainingItemsMeta {
            count
          }
          Team: _allTeamsMeta {
            count
          }
          EventsListItem: _allEventsListItemsMeta {
            count
          }
          Role: _allRolesMeta {
            count
          }
        }
      `}
    />
  );
}
