import PostContent from "../../components/PostContent.js";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { auth, db, postToJSON } from "../../lib/firebase";
import { doc, getDoc, collection, getDocs, updateDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { useEffect } from "react";

export async function getStaticProps({ params }) {
  const { slug } = params;
  // console.log("slug", slug);
  let post, path;
  const docRef = doc(db, "posts", slug);
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    post = postToJSON(docSnap);
    path = docRef.path;
  } else {
    return { notFound: true }
  }
  return {
    props: { post, path, slug },
    revalidate: 3600
  }
}
export async function getStaticPaths() {
  const querySnapshot = await getDocs(collection(db, "posts"));
  const paths = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return { params: { slug: data?.slug } }
  })
  //log paths
  console.log("paths", paths);
  return {
    paths,
    fallback: 'blocking'
  }
}

export default function PostDetailpage({ post, slug }) {
  useEffect(() => {
    const postRef = doc(db, "posts", slug);
    updateDoc(postRef, { views: post.views + 1 });
  }, [])
  toast.remove();
  return (
    <main style={{ paddingTop: "12vh" }}>
      <PostContent post={post} />
    </main>
  )
}