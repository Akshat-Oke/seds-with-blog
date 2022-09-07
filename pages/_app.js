import Navbar from '../components/navbar/Navbar';
import '../styles/globals.css'
import { UserContext } from "../lib/context";
import { useUserData } from '../lib/hooks';
import { Toaster } from "react-hot-toast"
function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  return (
    <>
      <div><Toaster /></div>
      <UserContext.Provider value={userData}>
        <Navbar />
        <Component {...pageProps} />
      </UserContext.Provider>
    </>
  );

}

export default MyApp
