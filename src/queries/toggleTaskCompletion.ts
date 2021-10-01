import { gql } from "@apollo/client";

export const TOGGLE_TASK_COMPLETION_MUTATION = gql`
  mutation ToggleTaskCompletion($id: Int!) {
    toggleTaskCompletion(id: $id) {
      id
      description
      completed
    }
  }
`;
