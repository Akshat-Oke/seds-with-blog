import { useState } from 'react';
import style from "./Posts.module.css"
import PostFeed from '../../components/PostFeed';
import { db, postToJSON } from "../../lib/firebase";
import { collection, query, where, getDocs, orderBy, startAfter } from "firebase/firestore"
import toast from 'react-hot-toast'

const FILTER = {
  popular: 'p', chronological: 'c'
}

export async function getServerSideProps() {
  let posts = null;
  const q = query(collection(db, "posts"),
    where("published", "==", true), orderBy("date", "desc"));
  const querySnapshot = await getDocs(q);
  posts = querySnapshot.docs.map(doc => postToJSON(doc));
  // console.log("posts", posts);
  return {
    props: { posts }, //passed as props
  }
}

export default function PostsPage(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);
  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];
    const cursor =
      typeof last.date === "number" ? fromMillis(last.date) : last.date;
    const q = query(collection(db, "posts"), where("published", "==", true), startAfter(cursor));
    const newPosts = (await getDocs(q)).docs.map(doc => postToJSON(doc));
    setPosts(posts.concat(newPosts));
  }
  const handleFilter = (filter) => {

  }
  return (
    <main className={style.main}>
      <SortBy onChange={handleFilter} />
      <PostGrid />
      <PostFeed posts={posts} />
    </main>
  )
}
function PostGrid() {
  function c() {
    toast.success("Asd");
  }
  return (
    <div className={style.post_grid}>
      <div onClick={c} className={style.post}></div>
      <div className={style.post}></div>
      <div className={style.post}></div>
      <div className={style.post}></div>
      <div className={style.post}></div>
      <div className={style.post}></div>
    </div>
  )
}
function SortBy({ onChange }) {
  const [active, setActive] = useState(FILTER.chronological);
  const clicked = (option) => {
    setActive(option);
    onChange(option);
  }
  return (
    <div className={style.container}>
      <div>Sort By</div>
      <div className={style.sort_by}>
        <div className={active == FILTER.popular ? style.active : ""} onClick={() => clicked(FILTER.popular)} >Popular</div>
        <div className={active == FILTER.chronological ? style.active : ""} onClick={() => clicked(FILTER.chronological)} >Chronological</div>
      </div>
    </div>
  )
}