import { IUser } from '../../components/users/UserResults';

interface State {
  users: IUser[];
  user: IUser;
  loading: boolean;
  repos: [];
}

export type IAction = {
  type: 'GET_USERS' | 'SET_LOADING' | 'CLEAR_USERS' | 'GET_USER' | 'GET_REPOS';
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

    case 'GET_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case 'GET_REPOS':
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default githubReducer;
