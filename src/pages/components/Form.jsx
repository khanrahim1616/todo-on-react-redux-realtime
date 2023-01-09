import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Buttons from "./Button";
import { Form } from "react-bootstrap";
import * as triger from "../../Redux/action";
import "../../pages/All.css";
import { useRef } from "react";

const TodoForm = ({ onSubmit, onChange, value }) => {
  const inputRef = useRef(null);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const cancel = () => {
    dispatch(triger.canelEdit());
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [state.input]);

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label style={{ fontSize: "25px", color: "antiquewhite" }}>
          Add your items here
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter some text"
          maxLength={80}
          ref={inputRef}
          value={state.input}
          onChange={(e) => {
            dispatch(triger.getInputValue(e.target.value));
          }}
        />
      </Form.Group>
      <Buttons
        className="btn btn-outline-info"
        btnText={state.index === false ? "Add" : "update"}
        disabled={!state?.input?.trim()}
        type="submit"
      />
      {state.index !== false && (
        <Buttons
          className="btn btn-outline-info"
          btnText="Cancel"
          type="button"
          onClick={cancel}
        />
      )}
    </Form>
  );
};

export default TodoForm;
