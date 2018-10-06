import {
  ADD_RANDOM_ENTRIES,
  SET_RANDOM_ENTRIES,
  SET_ENTRY_ENTRIES,
  ADD_ENTRY_ENTRIES,
  SET_HAS_LOADED_ENTRIES,
} from './types';
import axios from '../util/axios';
const BASE_URL = 'http://127.0.0.1:4000/v1';

const setHasLoadedEntriesType = hasLoadedEntries => ({
  type: SET_HAS_LOADED_ENTRIES,
  payload: {
    hasLoadedEntries,
  },
});

function setRandomEntriesType({ entries }) {
  return {
    type: SET_RANDOM_ENTRIES,
    payload: {
      entries,
    },
  };
}

function addRandomEntriesType({ entries }) {
  return {
    type: ADD_RANDOM_ENTRIES,
    payload: {
      entries,
    },
  };
}

function setEntryEntriesType({ entries }) {
  return {
    type: SET_ENTRY_ENTRIES,
    payload: {
      entries,
    },
  };
}

function addEntryEntriesType({ entries }) {
  return {
    type: ADD_ENTRY_ENTRIES,
    payload: {
      entries,
    },
  };
}

export const addRandomEntries = (n, { set } = {}) => async dispatch => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:4000/v1/entries/random?count=${n}`
    );
    set
      ? dispatch(setRandomEntriesType({ entries: response.data.data }))
      : dispatch(addRandomEntriesType({ entries: response.data.data }));
  } catch (error) {
    console.error(error);
  }
};

export const addEntryEntries = (entry, n, { set } = {}) => async dispatch => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:4000/v1/entries/name/${entry}?limit=${n}`
    );
    console.log(response.data.data);
    set
      ? dispatch(setEntryEntriesType({ entries: response.data.data }))
      : dispatch(addEntryEntriesType({ entries: response.data.data }));
  } catch (error) {
    console.error(error);
  }
};

export const setHasLoadedEntries = hasLoadedEntries => dispatch => {
  dispatch(setHasLoadedEntriesType(hasLoadedEntries));
};
