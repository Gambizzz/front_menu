import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils'

export const nightModeAtom = atom(false);

export const dyslexicModeAtom = atom(false);

export const userAtom = atomWithStorage('user', {
  email: "",
  id: "",
  token: "",
  isLoggedIn: false,
  isAdmin: false,
});
