import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const access = localStorage.getItem("access")
    const email = localStorage.getItem("user")

    if (access && email) {
      setUser(email)
      setIsAuthenticated(true)
    }

    setLoading(false)
  }, [])

  const loggedIn = ({ access, refresh, email }) => {
    if (!access || !refresh || !email) return
    setUser(email)
    setIsAuthenticated(true)
  }

  const loggedOut = () => {
    localStorage.clear()
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      loggedIn,
      loggedOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
