import React, { createContext, useEffect, useState } from 'react'

interface UserProviderProps {
  children: React.ReactNode
}

type status = 'idle' | 'pending' | 'resolved' | 'rejected'

interface UserContextType {
  user: {}
  setUser: React.Dispatch<React.SetStateAction<{}>>
  userStatus: status
  setUserStatus: React.Dispatch<React.SetStateAction<status>>
}

export const UserContext = createContext<UserContextType>({
  user: {},
  setUser: () => {},
  userStatus: 'idle',
  setUserStatus: () => {},
})

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState({})
  const [userStatus, setUserStatus] = useState<status>('idle')

  return (
    <UserContext.Provider value={{ user, setUser, userStatus, setUserStatus }}>
      {children}
    </UserContext.Provider>
  )
}
