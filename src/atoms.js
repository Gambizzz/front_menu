import { atom } from 'jotai';

export const nightModeAtom = atom(false);

export const dyslexicModeAtom = atom(false);

export const userAtom = atom({
  email: "",
  id: "",
  token: "",
  isLoggedIn: false,
  isAdmin: false,
});