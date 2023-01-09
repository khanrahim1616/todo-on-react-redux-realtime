import "./App.css";
import RoutesFile from "./Routes";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as triger from "./Redux/action";
import { useDispatch } from "react-redux";
import { onValue, ref } from "firebase/database";
import { db } from "./firebaseconfig";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        dispatch(triger.getUserUid(uid));
        onValue(ref(db, "users/" + uid), (snapshot) => {
          const data = snapshot.val();
          console.log(data);
          dispatch(triger.getFirebaseData(data));
        });
      } else {
        dispatch(triger.Loader());
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
