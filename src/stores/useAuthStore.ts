import { Authorization, User } from '@/model/auth';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AuthStorageServices } from '@/utils/localstorage';
import devtoolConfig from './devtool';


export interface AuthState extends Authorization {
  user: User | null
}

interface AuthAction {
  setUser: (payload: User) => void
  setAccessToken: (payload: string) => void
  setRefreshToken: (payload: string) => void
  reset: () => void
}

const initialState: AuthState = {
  accessToken: '',
  refreshToken: '',
  user: null,
}

const useAuthStore = create<AuthState & AuthAction>()(
  devtools(
    (set) => ({
      ...initialState,
      setUser: (payload) => set(() => ({ user: payload })),
      setAccessToken: (payload) =>
        set(() => {
          AuthStorageServices.storeAccessToken(payload)
          return { accessToken: payload }
        }),
      setRefreshToken: (payload) =>
        set(() => {
          AuthStorageServices.storeRefreshToken(payload)
          return { refreshToken: payload }
        }),
      reset: () =>
        set(() => {
          AuthStorageServices.removeAccessToken()
          AuthStorageServices.removeRefreshToken()
          return { ...initialState }
        }),
    }),
    devtoolConfig('auth', 'staking.app')
  )
)

export const useAuth = () => useAuthStore((state) => state)

export default useAuthStore