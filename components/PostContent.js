import Link from "next/link";
import style from "../pages/posts/post.module.css"
import ReactMarkdown from "react-markdown";
import React from 'react';
import { UserContext } from "../lib/context.js"
import { getStringFromDate } from "../lib/date";
import Metatags from "./Metatags";
export default function PostContent({ post }) {
  const { user, username } = React.useContext(UserContext)
  console.log("views", post.views);
  const date = typeof post?.date === 'number' ? new Date(post.date) : post.date.toDate();
  const cover = post.coverImage;
  return (
    <>
      <Metatags title={post?.title} description={post.content?.substring(0, 40)} image={post.coverImage} />
      {user &&
        <Link href={`/admin/${post.slug}`}>
          <a className={style.post_edit_button}>
            <i className="fa-solid fa-pen-nib"></i>
          </a>
        </Link>
      }
      <div className={cover ? style.header : ""} style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${cover})` ?? "" }}>
        <div className={style.back_button}>
          <Link href="/posts">
            BACK TO BLOGS
          </Link>
        </div>
      </div>
      <div className={style.blog}>
        <div className={style.metadata}>
          <h1>{post?.title}</h1>
          <div className={style.date}>{getStringFromDate(date)}</div>
          <div className={style.author}>Written by {post.author}</div>
        </div>
        <div className={style.divider}></div>
        <div className={style.content}>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </>
    // <div className={style.blog}>
    //   <div>{date.toISOString()}</div>
    //   <h1>{post?.title}</h1>
    //   <ReactMarkdown>{post?.content}</ReactMarkdown>
    // </div>
  )
}