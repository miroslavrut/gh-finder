import { createContext, FC, useReducer } from 'react';
import { IUser } from '../../components/users/UserResults';
import { IRepo } from '../../components/users/RepoList';
import githubReducer from './GuthubReducer';

interface props {
  children: JSX.Element[] | JSX.Element;
}

export interface IGithubContext {
  users: IUser[];
  loading: boolean;
  user: IUser;
  repos: IRepo[];
  searchUsers: (text: string) => void;
  clearUsers: () => void;
  getUser: (login: string) => void;
  getUserRepos: (login: string) => void;
}

export const GithubDefaultContext = {
  users: [],
  user: {} as IUser,
  repos: [],
  loading: true,
  searchUsers: () => {
    return;
  },
  clearUsers: () => {
    return;
  },
  getUser: () => {
    return;
  },
  getUserRepos: () => {
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
    user: {} as IUser,
    repos: [],
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

  const getUser = async (login: string) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (response.status === 404) {
      const win: Window = window;
      win.location = '/notfound';
    } else {
      const data = await response.json();

      dispatch({ type: 'GET_USER', payload: data });
    }
  };

  const getUserRepos = async (login: string) => {
    setLoading();

    const params = new URLSearchParams({ sort: 'created', per_page: '10' });

    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    dispatch({
      type: 'GET_REPOS',
      payload: data,
    });
  };

  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' });

  const setLoading = () => dispatch({ type: 'SET_LOADING' });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        getUserRepos,
        searchUsers,
        clearUsers,
        getUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
