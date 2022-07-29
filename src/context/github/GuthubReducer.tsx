import { IUser } from '../../components/users/UserResults';

interface State {
  users: IUser[];
  user: IUser;
  loading: boolean;
  repos: [];
}

export type IAction = {
  type: 'GET_USERS' | 'SET_LOADING' | 'CLEAR_USERS' | 'GET_USER_AND_REPOS';
  payload?: any;
};

const githubReducer = (state: State, action: IAction) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };

    case 'CLEAR_USERS':
      return {
        ...state,
        users: [],
      };

    case 'GET_USER_AND_REPOS':
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
        loading: false,
      };

    default:
      return state;
  }
};

export default githubReducer;
