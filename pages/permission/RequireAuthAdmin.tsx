
import Cookies from 'universal-cookie';
import jwt from "jsonwebtoken";
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
const Forbidden = dynamic(() => import('./Forbidden'))
type RequireAuthenticationProps = {
    children: React.ReactNode 
  };
function RequireAuthenticationAdmin({ children } : RequireAuthenticationProps) : JSX.Element | null {
  const cookies = new Cookies();
  const [isLoggedIn , setIsLoggedIn] = useState(false)
  useEffect(()=>{
    setIsLoggedIn(cookies.get('user') ? true : false)
  },[])
  const checkAdmin = () : boolean =>{
    if(isLoggedIn){
        let checkRole = jwt.decode(cookies.get('user')) as { username: string, role: string }
        return checkRole.role !== "admin" ? true : false
    }
    return true
  }
  if(checkAdmin()) return <Forbidden/>
  return <>{children}</>
}
export default RequireAuthenticationAdmin;
