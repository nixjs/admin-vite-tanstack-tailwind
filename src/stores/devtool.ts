import { DevtoolsOptions } from 'zustand/middleware'

const devtoolConfig = (name: string, prefix: 'staking.app') => {
  return {
    name: `${prefix}/${name}`,
    enabled: import.meta.env.VITE_ENV !== 'prod',
  } as DevtoolsOptions
}

export default devtoolConfig
