import React from 'react'
import useAuthStore from '@/stores/useAuthStore'
import { isTokenExpired, decodeAccessToken } from '@/lib/jwt'
import { AuthStorageServices } from '@/utils/localstorage'

const useAuthDetect = () => {
  const authState = useAuthStore()

  React.useEffect(() => {
    const accessToken = AuthStorageServices.getAccessToken()
    const refreshToken = AuthStorageServices.getRefreshToken()
    if (
      accessToken &&
      accessToken?.length > 0 &&
      !isTokenExpired(accessToken)
    ) {
      const decoded = decodeAccessToken<{
        id: string
        walletAddress: string
        role: string
      }>(accessToken)
      if (decoded)
        authState.setUser({
          id: decoded.id,
        })
      authState.setAccessToken(accessToken)
    }
    if (
      refreshToken &&
      refreshToken?.length > 0 &&
      !isTokenExpired(refreshToken)
    )
      authState.setRefreshToken(refreshToken)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useAuthDetect
