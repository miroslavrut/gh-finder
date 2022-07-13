import { createContext, FC, useReducer } from 'react';
import { IUser } from '../../components/users/UserResults';
import githubReducer from './GuthubReducer';

interface props {
  children: JSX.Element[] | JSX.Element;
}

export interface IGithubContext {
  users: IUser[];
  loading: boolean;
  searchUsers: (text: string) => void;
  clearUsers: () => void;
}

export const GithubDefaultContext = {
  users: [],
  loading: true,
  searchUsers: () => {
    return;
  },
  clearUsers: () => {
    return;
  },
};

export const GithubContext =
  createContext<IGithubContext>(GithubDefaultContext);

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider: FC<props> = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const searchUsers = async (text: string) => {
    setLoading();

    const params = new URLSearchParams({ q: text });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const { items } = await response.json();

    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  };

  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' });

  const setLoading = () => dispatch({ type: 'SET_LOADING' });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
