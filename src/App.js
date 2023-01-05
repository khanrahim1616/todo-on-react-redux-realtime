import "./App.css";
import RoutesFile from "./Routes";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserUid } from "./Redux/action";
import { useDispatch } from "react-redux";


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        dispatch(getUserUid(uid));
      } else {
        dispatch(getUserUid(false));
      }
    });
  }, []);

  return (
    <>
      <RoutesFile />
    </>
  );
};

export default App;
