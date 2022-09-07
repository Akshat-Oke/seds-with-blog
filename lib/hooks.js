import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../lib/firebase"

export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  useEffect(() => {
    let unsubscribe;
    if (user) {
      const ref = doc(db, "users", user.uid);
      getDoc(ref).then(docSnap => {
        if (docSnap.exists()) {
          setUsername(docSnap.data()?.username);
        } else
          setUsername(null);
      });
      // const ref = firestore.collection('users').doc(user.uid);
      // unsubscribe = ref.onSnapshot((doc) => {
      //   setUsername(doc.data()?.username);
      // })
    }
    else {
      setUsername(null);
    }
    return unsubscribe;
  }, [user]);
  return { user, username };
}