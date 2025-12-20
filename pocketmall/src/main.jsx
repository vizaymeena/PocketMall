import React from "react";
import ReactDOM from "react-dom/client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/userContext/LoginContext";
import { CartProvider } from "./contexts/userContext/CartContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   
    <BrowserRouter>
    
       <GoogleOAuthProvider clientId="896067105432-6r4sq2ggtmh35mcbk24eemps7a6i6c30.apps.googleusercontent.com">
        <CartProvider>
         <AuthProvider> 
          <App />
         </AuthProvider> 
         </CartProvider>
       </GoogleOAuthProvider>
     
    </BrowserRouter>
   
  </React.StrictMode>
);
