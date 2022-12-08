import { useQuery } from "@apollo/client";
import gql from 'graphql-tag';

const CURRENT_USER_QUERY = gql`
    query {
        authenticatedItem {
            ... on User {
                id
                email
                name
                team {
                    id
                    players {
                        id
                        name
                        number
                        position
                        description
                        weaknesses
                        strengths
                        photo {
                            image {
                                publicUrlTransformed
                            }
                        }
                    }
                }
                training {
                    id
                    quantity
                    exercise {
                        id
                        name
                        description
                        position
                        photo {
                            image {
                                publicUrlTransformed
                            }
                        }
                    }
                }
            }
        }
    }
`;

export function useUser() {
    const { data } = useQuery(CURRENT_USER_QUERY);
    return data?.authenticatedItem;
  }
  
  export { CURRENT_USER_QUERY };