import { ApiRequest, MethodPath } from '@/model/base';


export const Auth: Record<'Login', ApiRequest> = {
  Login: { path: 'auth/cms-login', method: 'POST' },
}

export const Category: Record<MethodPath, ApiRequest> = {
  Add: { path: 'category', method: 'POST' },
  Update: { path: 'category', method: 'PUT' },
  Find: { path: 'category', method: 'GET' },
  FindAll: { path: 'category/list', method: 'GET' },
}

export const StakingConfig: Record<MethodPath, ApiRequest> = {
  Add: { path: 'staking-configs', method: 'POST' },
  Update: { path: 'staking-configs', method: 'PUT' },
  Find: { path: 'staking-configs', method: 'GET' },
  FindAll: { path: 'staking-configs/list', method: 'GET' },
}