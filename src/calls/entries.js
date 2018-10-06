import axios from '../util/axios';

export const getRandomEntries = async (n = 50) => {
  try {
    const response = await axios.get(`/entries/random?count=${n}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getEntryEntries = async (entry, n = 50) => {
  try {
    const response = await axios.get(`/entries/name/${entry}?limit=${n}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
