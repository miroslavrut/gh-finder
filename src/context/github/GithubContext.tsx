import { createContext, FC, useReducer } from 'react';
import { IUser } from '../../components/users/UserResults';
import { IRepo } from '../../components/users/RepoList';
import githubReducer from './GuthubReducer';
import { IAction } from './GuthubReducer';

interface props {
  children: JSX.Element[] | JSX.Element;
}

export interface IGithubContext {
  users: IUser[];
  loading: boolean;
  user: IUser;
  repos: IRepo[];
  dispatch: React.Dispatch<IAction>;
}

export const GithubDefaultContext = {
  users: [],
  user: {} as IUser,
  repos: [],
  loading: true,

  dispatch: () => {
    return;
  },
};

export const GithubContext =
  createContext<IGithubContext>(GithubDefaultContext);

export const GithubProvider: FC<props> = ({ children }) => {
  const initialState = {
    users: [],
    user: {} as IUser,
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
