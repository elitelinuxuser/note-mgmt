import {
  GET_NOTES,
  NOTES_ERROR,
  DELETE_NOTE,
  ADD_NOTE,
  GET_NOTE,
  UPDATE_NOTE
} from "../actions/types";

const initialState = {
  notes: [],
  note: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTES:
      return {
        ...state,
        notes: payload,
        loading: false
      };
    case GET_NOTE:
      return {
        ...state,
        note: payload,
        loading: false
      };
    case ADD_NOTE:
      return {
        ...state,
        notes: [payload, ...state.notes],
        loading: false
      };
    case DELETE_NOTE:
      console.log(state.notes);
      return {
        ...state,
        notes: state.notes.filter(
          note => note.title !== payload.title && note.desc !== payload.desc
        ),
        loading: false
      };
    case UPDATE_NOTE:
      console.log(state.notes);
      console.log(payload);
    // return {
    //   ...state,
    //   notes: state.notes.filter(
    //     note =>
    //     // note.title !== payload.title && note.desc !== payload.desc
    //   ),
    //   loading: false
    // };
    case NOTES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
