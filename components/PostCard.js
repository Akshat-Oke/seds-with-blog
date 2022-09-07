import Link from "next/link";
import style from "../pages/posts/Posts.module.css";


export default function PostCard({ post }) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <a>
        <div className={style.post}>

        </div>
      </a>
    </Link>
  )
}