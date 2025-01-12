import axios from 'axios';
import * as API from '@/consts/api';
import { Authorization } from '@/model/auth';


export const loginRequest = async (
  username: string,
  password: string
): Promise<Authorization> => {
  const response = await axios({
    baseURL: import.meta.env.VITE_API,
    url: `/${API.Auth.Login.path}`,
    method: API.Auth.Login.method,
    data: {
      walletAddress: username,
      password,
    },
  })
  return response.data
}