import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_NOTES,
  NOTES_ERROR,
  DELETE_NOTE,
  ADD_NOTE,
  GET_NOTE,
  UPDATE_NOTE
} from "./types";

// const url = "http://35.244.44.23:5000";

const url = "http://localhost:5000";

// Get posts
export const getNotes = () => async dispatch => {
  try {
    const res = await axios.get(`${url}/api/list`);
    // console.log(res.data);

    dispatch({
      type: GET_NOTES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: NOTES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Note
export const deleteNote = formData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    await axios.post(`${url}/api/remove`, formData, config);

    dispatch({
      type: DELETE_NOTE,
      payload: formData
    });

    dispatch(setAlert("Note Removed", "success"));
  } catch (err) {
    dispatch({
      type: NOTES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Update a note
export const updateNote = formData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.post(`${url}/api/update`, formData, config);

    dispatch({
      type: UPDATE_NOTE,
      payload: { ...res.data, oldId: formData.id }
    });

    dispatch(setAlert("Note Removed", "success"));
  } catch (err) {
    dispatch({
      type: NOTES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add post
export const addNote = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(`${url}/api/add`, formData, config);

    dispatch({
      type: ADD_NOTE,
      payload: res.data
    });

    dispatch(setAlert("Note Created", "success"));
  } catch (err) {
    dispatch({
      type: NOTES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get post
export const getNote = id => async dispatch => {
  try {
    const res = await axios.get(`${url}/api/posts/${id}`);

    dispatch({
      type: GET_NOTE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: NOTES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
