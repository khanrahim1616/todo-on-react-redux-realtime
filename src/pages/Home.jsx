import React from "react";
import * as triger from "../Redux/action";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { db } from "../firebaseconfig";
import { update, onValue, ref } from "firebase/database";
import "bootstrap/dist/css/bootstrap.min.css";
import Buttons from "./components/Button";
import "./All.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ButtonExample from "./components/Loader";
import TodoForm from "./components/Form";
import Swal from "sweetalert2";
import * as types from "../Redux/type";

const Home = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();

  const add = async (e) => {
    e.preventDefault();
    await update(ref(db, "users/" + state.uid), {
      list: [...state.list, state.input.trim()],
    });
  };

  const edit = (i) => {
    dispatch(triger.editData(i));
  };

  const updates = async (e) => {
    e.preventDefault();
    dispatch(triger.updateData());
    let newlist = [...state.list];
    newlist[state.index] = state.input.trim();
    await update(ref(db, "users/" + state.uid), {
      list: newlist,
    });
  };

  const deletes = async (i) => {
    let newlist = state.list.filter((e, index) => index !== i);
    await update(ref(db, "users/" + state.uid), {
      list: newlist,
    });
  };

  const removeAll = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "you want to Remove-all !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "sure",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await update(ref(db, "users/" + state.uid), {
          list: false,
        });
      }
    });
  };

  const signingOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "you want to sign-out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "sure",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await signOut(auth)
          .then(() => {
            dispatch({
              type: types.FIREBASE_UID,
              payload: false,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  useEffect(() => {
    return onValue(ref(db, "users/" + state.uid), (snapshot) => {
      const data = snapshot.val();
      dispatch(triger.getFirebaseData(data));
    });
  }, []);

  return (
    <div>
      <div className="flexDiv">
        <Buttons
          type="button"
          className="btn btn-outline-primary username"
          btnText={state.username == false ? <ButtonExample /> : state.username}
        />
        <Buttons
          onClick={signingOut}
          className="btn btn-outline-success"
          btnText="SignOut"
        />
      </div>
      <div className="dataDiv">
        <div>
          <TodoForm onSubmit={state.index === false ? add : updates} />
        </div>
        <div>
          {state?.list?.map((e, i) => (
            <div className="list" key={i}>
              <div className="data">{e}</div>
              <div className="btns">
                <Buttons
                  onClick={() => edit(i)}
                  className="btn  btn-outline-warning"
                  btnText="edit"
                />
                <Buttons
                  onClick={() => deletes(i)}
                  disabled={state.index !== false}
                  className="btn  btn-outline-danger"
                  btnText="delete"
                />
              </div>
            </div>
          ))}
        </div>
        {state.list.length > 0 && (
          <Buttons
            disabled={state.index !== false}
            btnText="Remove_all"
            className="btn  btn-outline-danger"
            onClick={removeAll}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
