import Link from "next/link";
import MetaTags from "./Metatags";
export default function PostFeed({ posts, admin }) {
  return posts.map(post => <PostItem key={posts.slug} post={post} admin={admin} />)
}

function PostItem({ post }) {
  return <div>
    <MetaTags title="SEDS - Blog" />
    <Link href={`/posts/${post.slug}`}>
      <h2><a>{post.title}</a></h2>
    </Link>
  </div>
}