import { useState, ChangeEvent, FormEvent, useEffect } from "react";

import { useQuery, useMutation } from "@apollo/client";
import { ALL_TASKS_QUERY } from "./queries/allTasks";
import { CREATE_TASK_MUTATION } from "./queries/createTask";
import { TOGGLE_TASK_COMPLETION_MUTATION } from "./queries/toggleTaskCompletion";
import { DELETE_TASK_MUTATION } from "./queries/deleteTask";
import Main from "./styled/Main";
import {
  loadIsUserConfirmedFromLocalStorage,
  loadUserNameFromLocalStorage,
} from "./utils/auth";

import { Task } from "./types";

const App = () => {
  const {
    data: allTasksData,
    loading: allTasksLoading,
    error: allTasksError,
  } = useQuery(ALL_TASKS_QUERY);
  const [createTask, { loading: createTaskLoading, error: createTaskError }] =
    useMutation(CREATE_TASK_MUTATION);
  const [toggleTask, { loading: toggleTaskLoading, error: toggleTaskError }] =
    useMutation(TOGGLE_TASK_COMPLETION_MUTATION);
  const [deleteTask, { loading: deleteTaskLoading, error: deleteTaskError }] =
    useMutation(DELETE_TASK_MUTATION);

  const [userName, setUserName] = useState(loadUserNameFromLocalStorage);
  const [isUserConfirmed, setIsUserConfirmed] = useState(
    loadIsUserConfirmedFromLocalStorage
  );
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    localStorage.setItem("userName", userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem("isUserConfirmed", isUserConfirmed);
  }, [isUserConfirmed]);

  const loading =
    allTasksLoading ||
    createTaskLoading ||
    toggleTaskLoading ||
    deleteTaskLoading;
  const error =
    allTasksError || createTaskError || toggleTaskError || deleteTaskError;

  const handleUserTyping = (event: ChangeEvent<HTMLInputElement>) =>
    setTaskDescription(event.target.value);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createTask({
      variables: { description: taskDescription },
      refetchQueries: [ALL_TASKS_QUERY],
    });
    setTaskDescription("");
  };

  const handleCheckBoxClick = (id: number) => {
    toggleTask({ variables: { id }, refetchQueries: [ALL_TASKS_QUERY] });
  };

  const handleDeleteButtonClick = (id: number) => {
    if (window.confirm("Are you sure?")) {
      deleteTask({ variables: { id }, refetchQueries: [ALL_TASKS_QUERY] });
    }
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userName) {
      setIsUserConfirmed(true);
    }
    window.location.reload();
  };

  const handleLogOut = () => {
    setUserName("");
    setIsUserConfirmed(false);
    window.location.reload();
  };

  if (loading) {
    return (
      <Main>
        <h1>Loading...</h1>
      </Main>
    );
  }

  if (error) {
    return (
      <Main>
        <h1>Whoops, something went wrong...</h1>
      </Main>
    );
  }

  if (!isUserConfirmed) {
    return (
      <Main>
        <h1>Who are you?</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
          <button type="submit">Log In</button>
        </form>
      </Main>
    );
  }

  return (
    <Main>
      <h1>Tasks</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          placeholder="What do you want to do?"
          type="text"
          value={taskDescription}
          onChange={handleUserTyping}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {allTasksData?.allTasks?.map((task: Task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => {
                handleCheckBoxClick(task.id);
              }}
            />
            <span>{task.description}</span>
            <button
              type="button"
              onClick={() => handleDeleteButtonClick(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={handleLogOut}>
        Log Out
      </button>
    </Main>
  );
};

export default App;
