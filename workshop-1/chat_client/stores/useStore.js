import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      channelCreated: false,

      setUser: (user, token) => {
        set({ user, token });
      },

      setChannelCreated: (value) => {
        set({ channelCreated: value });
      },

      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: 'user-storage', // key in localStorage or sessionStorage
      getStorage: () => localStorage, // (optional) default is localStorage
    }
  )
);

export default useUserStore;
