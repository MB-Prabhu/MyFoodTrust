import  { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import  {jwtDecode} from 'jwt-decode';

function ProtectedRoute({ children , requiredRole }) {
  const navigate = useNavigate()

  const roleToLoginPath = {
    admin: "/admin",   // path name for login page for admin
    user: "/userlogin",     // path name for login page for user
    trust: "/trustlogin",   // path name for login page for trust
  };

    const checkAuth = () => {

      const roleToCookieName = {
        admin: "admintoken",
        trust: "authToken",
        user: "userlogintoken",
      };
  
      // Get the cookie name for the required role
      const cookieName = roleToCookieName[requiredRole];

      const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith(`${cookieName}=`));

      if (token) {
        const decodedToken = jwtDecode(token.split('=')[1]);
        if (decodedToken.role === requiredRole) {
          return true; // Authorized
        } else {
          navigate(roleToLoginPath[decodedToken.role]);
          return false;
        }
      } else {
        navigate(roleToLoginPath[requiredRole]); // Redirect to login if no token
        return false;
      }
    }  

    useEffect(() => {
      checkAuth(); // Only called once when component mounts
    }, [requiredRole, navigate]); 

  return children;  // If authenticated, render the protected route's children
}

export default ProtectedRoute;
