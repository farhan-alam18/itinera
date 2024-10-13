import { getAuth } from "firebase/auth";

const authMiddleware = (callback) => {
  return (...args) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      return callback(...args);
    } else {
      <h1>Please Login/Signup</h1>;
      return null;
    }
  };
};

export default authMiddleware;
