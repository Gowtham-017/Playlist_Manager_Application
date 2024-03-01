import { createStore } from 'redux';

const initialState = {};

const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_LIKE':
      return {
        ...state,
        [action.payload]: !state[action.payload], 
      };
    default:
      return state;
  }
};

const store = createStore(songsReducer);

export default store;

// Actions
export const toggleLike = (songId) => {
  return {
    type: 'TOGGLE_LIKE',
    payload: songId,
  };
};