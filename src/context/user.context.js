import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useState ,useEffect,useReducer } from "react";
import { createUseDocFromAuth, onAuthStateChangedListner, signOutUser } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});
export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const INITIAL_STATE = {
  currentUser: null,
};
const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};
export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const setCurrentUser = (user) =>
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, currentUser: user });



    useEffect(() => {
      const unsubscribe = onAuthStateChangedListner((user) => {
        if (user) {
          createUseDocFromAuth(user);
        }
        setCurrentUser(user);
      });
  
      return unsubscribe;
    }, []);
  
    const value = {
      currentUser,
    };
  
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
