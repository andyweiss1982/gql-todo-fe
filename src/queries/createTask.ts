import { gql } from "@apollo/client";

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($description: String!) {
    createTask(description: $description) {
      id
      completed
      description
    }
  }
`;
