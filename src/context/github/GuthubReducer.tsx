import { IUser } from '../../components/users/UserResults';

interface State {
  users: IUser[];
  loading: boolean;
}

// interface ActionA {
//   type: string;
//   payload?: IUser[] | [];
// }

// interface ActionB {
//   type: string;
// }

// type Action = ActionA | ActionB;
// type Action = { type: 'GET_USERS'; payload: object } | { type: 'SET_LOADING' };

export const defaultContext = {
  users: [],
  loading: true,
  fetchUsers: () => {
    return;
  },
};

export enum ActionType {
  GET_USERS = 'GET_USERS',
  SET_LOADING = 'SET_LOADING',
}

export type IAction = {
  type: 'GET_USERS' | 'SET_LOADING';
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

    default:
      return state;
  }
};

export default githubReducer;
