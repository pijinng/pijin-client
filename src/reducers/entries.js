// import {
//   ADD_RANDOM_ENTRIES,
//   SET_RANDOM_ENTRIES,
//   ADD_ENTRY_ENTRIES,
//   SET_ENTRY_ENTRIES,
//   SET_HAS_LOADED_ENTRIES,
// } from '../actions/types';

// const initialState = {};

// export default function(state = initialState, action) {
//   switch (action.type) {
//     case SET_RANDOM_ENTRIES:
//       return {
//         ...state,
//         random: action.payload.entries,
//       };
//     case ADD_RANDOM_ENTRIES:
//       return {
//         ...state,
//         random: [...state.random, ...action.payload.entries],
//       };
//     case SET_ENTRY_ENTRIES:
//       return {
//         ...state,
//         entry: action.payload.entries,
//       };
//     case ADD_ENTRY_ENTRIES:
//       return {
//         ...state,
//         entry: [...state.entry, ...action.payload.entries],
//       };
//     case SET_HAS_LOADED_ENTRIES:
//       return {
//         ...state,
//         hasLoadedEntries: action.payload.hasLoadedEntries,
//       };
//     default:
//       return state;
//   }
// }
