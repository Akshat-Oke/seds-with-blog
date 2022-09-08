import Navbar from '../components/navbar/Navbar';
import '../styles/globals.css'
import { UserContext } from "../lib/context";
import { useUserData } from '../lib/hooks';
import { Toaster } from "react-hot-toast"
import Head from 'next/head';
function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600&family=Ubuntu:wght@300;500&display=swap" />
      </Head>
      <div><Toaster toastOptions={{
        style: {
          fontSize: '1.6rem'
        }
      }} /></div>
      <UserContext.Provider value={userData}>
        <Navbar />
        <Component {...pageProps} />
      </UserContext.Provider>
    </>
  );

}

export default MyApp
