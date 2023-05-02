import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
type RequireAuthenticationProps = {
    children: React.ReactNode 
  };
function RequireAuthentication({ children } : RequireAuthenticationProps) : JSX.Element | null {
  const router = useRouter();
  const cookies = new Cookies();
  useEffect(() => {
    if (cookies.get('user') ? true : false) {
      router.push('/');
    }
  }, []);
  return <>{children}</>;
}
export default RequireAuthentication;
