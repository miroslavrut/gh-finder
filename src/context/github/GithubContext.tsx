import { createContext, FC, useReducer } from 'react';
import { IUser } from '../../components/users/UserResults';
import githubReducer from './GuthubReducer';

interface props {
  children: JSX.Element[] | JSX.Element;
}

interface IContext {
  users: IUser[];
  loading: boolean;
  fetchUsers: () => void;
}

export const defaultContext = {
  users: [],
  loading: true,
  fetchUsers: () => {
    return;
  },
};

export const GithubContext = createContext<IContext>(defaultContext);

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider: FC<props> = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const fetchUsers = async () => {
    setLoading();
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await response.json();

    dispatch({
      type: 'GET_USERS',
      payload: data,
    });
  };

  const setLoading = () => dispatch({ type: 'SET_LOADING' });

  return (
    <GithubContext.Provider
      value={{ users: state.users, loading: state.loading, fetchUsers }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
