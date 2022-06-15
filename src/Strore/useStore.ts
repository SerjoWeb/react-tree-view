import axios from 'axios';
import create from 'zustand';
import { StoreInterface } from '../Models/interfaces';

const BASE_URL = 'https://api.github.com/gists/e1702c1ef26cddd006da989aa47d4f62';

const useStore = create<StoreInterface>((set, get) => ({
  tree: [],
  getTree: async () => {
    try {
      await axios
        .get(BASE_URL)
        .then((response) => {
          set({
            tree: response.data
          });
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}));

export default useStore;
