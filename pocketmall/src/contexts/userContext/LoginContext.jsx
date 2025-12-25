import { createContext, useContext, useEffect, useState } from "react"

let AuthContext = createContext(null)

export function AuthProvider({ children }) {
  let [user, setUser] = useState(null)
  let [isAuthenticated, setIsAuthenticated] = useState(false)
  let [isLoading, setLoading] = useState(true)

  useEffect(() => {
    let access = localStorage.getItem("access")
    let email = localStorage.getItem("user")

    if (access && email) {
      setUser(email)
      setIsAuthenticated(true)
    }

    setLoading(false)
  }, [])

  let loggedIn = ({ access, refresh, email }) => {
    if (!access || !refresh || !email) return
    setUser(email)
    setIsAuthenticated(true)
  }

  let loggedOut = () => {
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

export let useAuth = () => useContext(AuthContext)
