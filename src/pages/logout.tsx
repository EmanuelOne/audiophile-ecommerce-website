import { removeCookie } from 'components/Storage/cookies'
import { useRouter } from 'next/router'
import React, { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from 'store/userReducer'

const Logout = () => {
  const route = useRouter()
  const dispatch = useDispatch()
  useLayoutEffect(() => {
    dispatch(removeUser({}))
    route.replace('/login')
  }, [dispatch, route])
  return <div />
}

export default Logout
