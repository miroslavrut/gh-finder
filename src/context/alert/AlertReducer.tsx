export type IAction = {
  type: 'SET_ALERT' | 'REMOVE_ALERT';
  payload?: any;
};

interface State {
  alert: { msg: string; type: string };
}

const alertReducer = (state: State, action: IAction) => {
  switch (action.type) {
    case 'SET_ALERT':
      return action.payload;

    case 'REMOVE_ALERT':
      return null;
    default:
      return state;
  }
};

export default alertReducer;
