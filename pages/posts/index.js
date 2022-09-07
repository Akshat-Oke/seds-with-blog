import { useState } from 'react';
import style from "./Posts.module.css"
import PostFeed from '../../components/PostFeed';
import PostCard from "../../components/PostCard";
import { db, postToJSON } from "../../lib/firebase";
import { collection, query, where, getDocs, orderBy, startAfter, endBefore, limit, Timestamp } from "firebase/firestore"
import toast from 'react-hot-toast'
import MetaTags from '../../components/Metatags';

const FILTER = {
  popular: 'views', chronological: 'date'
}
const DIR = {
  forward: 'f', backward: 'b'
}

export async function getServerSideProps() {
  let posts = null;
  const q = query(collection(db, "posts"),
    where("published", "==", true), orderBy("date", "desc"), limit(6));
  const querySnapshot = await getDocs(q);
  posts = querySnapshot.docs.map(doc => postToJSON(doc));
  // console.log("posts", posts);
  return {
    props: { posts }, //passed as props
  }
}

export default function PostsPage(props) {
  let filterType = FILTER.chronological;
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);
  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];
    const cursor =
      typeof last.date === "number" ? Timestamp.fromMillis(last.date) : last.date;
    const q = query(collection(db, "posts"), where("published", "==", true), startAfter(cursor));
    const newPosts = (await getDocs(q)).docs.map(doc => postToJSON(doc));
    setPosts(posts.concat(newPosts));
  }
  const handleFilter = async (filter) => {
    const tid = toast.loading("Loading...")
    filterType = filter;
    const q = query(collection(db, "posts"), where("published", "==", true), orderBy(filter, "desc"), limit(6));
    const newPosts = (await getDocs(q)).docs.map(doc => postToJSON(doc));
    setPage(1);
    setPosts(newPosts);
    toast.remove(tid);
  }
  const navigate = async (direction) => {
    const tid = toast.loading("Loading...")
    let cursorFunc = null;
    let pageIncrement = 0;
    let orderByField = null;
    let marker;
    let index;
    if (direction == DIR.forward) {
      pageIncrement = 1;
      cursorFunc = startAfter;
      index = - 1;
    } else {
      index = 0;
      pageIncrement = -1;
      cursorFunc = endBefore;
    }
    if (filterType == FILTER.chronological) {
      orderByField = "date";
      const last = posts.at(index);
      marker = typeof last.date === "number" ? Timestamp.fromMillis(last.date) : last.date;
    } else {
      orderByField = "views";
      marker = posts.at(index).views;
    }
    console.log("marker", marker);
    console.log("orderByField", orderByField);
    // return;
    let q = query(collection(db, "posts"), where("published", "==", true), orderBy(orderByField, "desc"), cursorFunc(marker), limit(6));
    if (filterType == FILTER.popular) {
      q = query(collection(db, "posts"), where("published", "==", true), orderBy(orderByField, "desc"), orderBy("date", "desc"), cursorFunc(marker), limit(6));

    }
    const newPosts = (await getDocs(q)).docs.map(doc => postToJSON(doc));
    if (newPosts.length == 0) {
      toast.error("No more posts");
      return;
    }
    page += pageIncrement;
    setPage(page);
    setPosts(newPosts);
    toast.remove(tid);
  }
  return (
    <main className={style.main}>
      <MetaTags title="SEDS - Blog | Home" description="The SEDS Blog home page" />
      <SortBy onChange={handleFilter} />
      <PostGrid posts={posts} navigate={navigate} postsEnd={posts.length < 6} postsStart={page == 1} />
      {/* <PostFeed posts={posts} /> */}
    </main>
  )
}
function PostGrid({ posts, navigate, postsEnd, postsStart }) {
  function c() {
    toast.loading("Loading...");
  }
  return (
    <div className={style.post_wrapper}>
      <div className={style.navigate}>
        {!postsStart && <i onClick={() => navigate(DIR.backward)} className="fa-solid fa-angle-left"></i>}
        {!postsEnd && <i onClick={() => navigate(DIR.forward)} className="fa-solid fa-angle-right"></i>}
      </div>
      <div className={style.post_grid}>
        {posts.map(post => <PostCard key={post.slug} post={post} onClick={c} />)}
      </div>
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