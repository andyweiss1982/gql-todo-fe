import { gql } from "@apollo/client";

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      id
      completed
      description
    }
  }
`;
