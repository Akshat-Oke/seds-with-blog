import { useRouter } from 'next/router';
import { useContext, useState } from "react"
import { UserContext } from '../../lib/context';
import AuthCheck from "../../components/AuthCheck";
import { collection, query, serverTimestamp, where, doc, setDoc } from "firebase/firestore"
import { db } from "../../lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import PostFeed from "../../components/PostFeed";
import { postToJSON } from "../../lib/firebase";
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';
export default function Page({ }) {

  return (
    <main>
      <AuthCheck>
        <h1>Admin</h1>
        {/* <PostList /> */}
        <CreateNewPost />
      </AuthCheck>
    </main>
  )
}
function PostList() {
  let posts = null;
  const q = query(collection(db, "posts"),
    where("published", "==", false)/* , orderBy("date", "desc") */);
  const [values, loading, error] = useCollectionData(q);
  return (
    <>
      {loading && <div>Loading</div>}
      {/* {values && <PostFeed admin posts={values.map(v => postToJSON(v))} />} */}
    </>
  )
}
function CreateNewPost() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");

  const slug = encodeURI(kebabCase(title));
  const isValid = title.length > 3 && title.length < 100

  const createPost = async (e) => {
    // console.log("Hello there!")
    e.preventDefault();
    const data = {
      title, slug,
      author: "a",
      published: false,
      date: serverTimestamp(),
      content: "# Hello world\nVery nice.\n\n---\n\n*This* is a post.",
    }
    await setDoc(doc(db, "posts", slug), data);
    // console.log("Hello there!")
    toast.success("Post created!");
    router.push(`/admin/${slug}`);
  }
  return (
    <form onSubmit={createPost}>
      <input type="text" placeholder="title"
        onChange={e => setTitle(e.target.value)} value={title} />
      <button type="submit">Create post</button>
    </form>
  )
}