import Link from "next/link";
import style from "../pages/posts/Posts.module.css";
import { getStringFromDate } from "../lib/date";


export default function PostCard({ post, onClick }) {
  const date = typeof post?.date === 'number' ? new Date(post.date) : post.date.toDate();

  const coverUrl =
    post.coverImage ? `url(${post.coverImage})` : null;
  return (
    <Link href={`/posts/${post.slug}`}  >
      <a onClick={onClick}>
        <div className={coverUrl ? style.post : style.post_no_cover} style={{ backgroundImage: coverUrl ?? '' }}>
          <div className={style.post_data}>
            {/* title */}
            <h2 className={style.post_title}>{post.title}</h2>
            {/* date */}
            <p className={style.post_date}>
              {date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
              })}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
}