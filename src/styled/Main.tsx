import styled from "styled-components";

const Main = styled.main`
  max-width: 20rem;
  margin: 5rem auto;

  & form {
    display: flex;
    gap: 1rem;
  }

  & input[type="text"] {
    width: 100%;
    font-size: 1rem;
    padding: 0.25rem;
  }

  & ul {
    list-style-type: none;
    padding: 0;
    margin: 1rem 0;
  }

  & li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.5rem 0;
    gap: 0.5rem;
  }

  & span {
    flex: 1;
  }

  & button {
    background-color: dodgerblue;
    border: 0;
    border-radius: 0.25rem;
    color: white;
    height: 2rem;
    cursor: pointer;
  }
`;

export default Main;
