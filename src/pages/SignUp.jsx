import React from "react";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { db } from "../firebaseconfig";
import { ref, set } from "firebase/database";

const SignUp = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [data, SetData] = useState({});
  const getData = (e) => {
    let input = { [e.target.name]: e.target.value };
    SetData({ ...data, ...input });
  };
  let { username, email, password } = data;

  const signup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        let userId = res.user.uid;
        await set(ref(db, "users/" + userId), {
          username: username,
          email: email,
          list: false,
        });
        navigate("/Home");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div>
      <form className="signup" onSubmit={signup}>
        <h1 className="p">Sign up</h1>
        <input
          required
          type="text"
          maxLength={12}
          placeholder="username"
          name="username"
          onChange={(e) => getData(e)}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={(e) => getData(e)}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={(e) => getData(e)}
        />
        <button type="submit" className="signupbtn">
          Sign Up
        </button>
        <p className="signuplink">
          Already have an account
          <span className="signuplink">
            <Link to="/">Log-in</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
