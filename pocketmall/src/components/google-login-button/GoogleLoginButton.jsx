import { GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/userContext/LoginContext"


function GoogleLoginButton() {
    let navigate = useNavigate()
    
    let { loggedIn } = useAuth() // custom authcontext hook

    let URL = "http://127.0.0.1:8000/api/auth/google/"  // api url sending token to backend 


    let GoogleLoginSuccess = async (response) => {
      try {
        let googleToken = response.credential
      
        let res = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ token: googleToken })
        })
      
        if (!res.ok) {
          throw new Error("Backend Login Failed")
        }
      
        let data = await res.json()
        let email = data.email
        let access = data.access
        let refresh = data.refresh

        localStorage.setItem("user",email)
        localStorage.setItem("access",access)
        localStorage.setItem("refresh",refresh)
      
        loggedIn({access,refresh,email})

        navigate("/")

      } catch (error) {
        console.error(error.message)
      }
}

    
    let GoogleLoginError = () => {
        console.error("Login Error")
    }

  return (
    
       <>
        <GoogleLogin 
        onSuccess = {GoogleLoginSuccess}
        onError = {GoogleLoginError}
        />
       </>
  )
}

export default GoogleLoginButton