import { IUser } from '../../components/users/UserResults';

interface State {
  users: IUser[];
  loading: boolean;
}

export type IAction = {
  type: 'GET_USERS' | 'SET_LOADING' | 'CLEAR_USERS';
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

    default:
      return state;
  }
};

export default githubReducer;
