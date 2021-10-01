import { gql } from "@apollo/client";

export const ALL_TASKS_QUERY = gql`
  query AllTasksQuery {
    allTasks {
      id
      description
      completed
    }
  }
`;
