import { createContext, FC, useReducer } from 'react';
import alertReducer from './AlertReducer';

interface props {
  children: JSX.Element[] | JSX.Element;
}

interface IAlertContext {
  alert: { msg: string; type: string } | null;
  setAlert: (msg: string, type: string) => void;
}

const AlertDefaultContext = {
  alert: null,
  setAlert: () => {
    return;
  },
};

const AlertContext = createContext<IAlertContext>(AlertDefaultContext);

export const AlertProvider: FC<props> = ({ children }) => {
  const initialState = null;

  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (msg: string, type: string) => {
    dispatch({
      type: 'SET_ALERT',
      payload: { msg, type },
    });

    setTimeout(() => dispatch({ type: 'REMOVE_ALERT' }), 3000);
  };

  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
