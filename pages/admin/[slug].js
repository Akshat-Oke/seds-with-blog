import Link from "next/link";
import AuthCheck from "../../components/AuthCheck";
import { useRouter } from 'next/router';
import style from "./admin.module.css";
import { useContext, useState } from "react"
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useDocumentData, useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import toast from 'react-hot-toast'
import ImageUploader from "../../components/ImageUploader";
export default function AdminEditPage({ }) {
  return (
    <main className={style.main}>
      <AuthCheck>
        <PostManager />
      </AuthCheck>
    </main>
  )
}
function PostManager() {
  const [preview, setPreview] = useState(false);
  const router = useRouter();
  const { slug } = router.query;
  const postRef = doc(db, "posts", slug);
  const [post] = useDocumentData(postRef);
  return (
    <div className={style.container}>
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID: {post.slug}</p>
            <PostForm postRef={postRef} defaultValues={post} preview={preview} />
          </section>
          <aside>
            <h3>Tools</h3>
            <button className={style.previewButton} onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button>
            <Link href={`/posts/${post.slug}`}>
              <button className={style.btn_blue}>Live view</button>
            </Link>
          </aside>
        </>
      )}
    </div>
  )
}
function PostForm({ defaultValues, postRef, preview }) {
  const { register, handleSubmit, reset, watch } = useForm({ defaultValues, mode: 'onChange' });
  async function updatePost({ content, published, coverImage }) {
    await updateDoc(postRef, { content, published, coverImage, updatedAt: serverTimestamp() });
    toast.success("Updated successfully")
  }
  return (
    <form onSubmit={handleSubmit(updatePost)} className={style.post_form}>
      <ImageUploader />
      {preview && (
        <div className="card">
          <ReactMarkdown>{watch('content')}</ReactMarkdown>
        </div>
      )}
      {
        !preview && (
          <div className={style.controls}>
            <h3>Cover image</h3>
            <input className={style.coverImage} type="text" placeholder="Cover Image URL" {...register('coverImage')} />
            <h3>Author name</h3>
            <input className={style.coverImage} type="text" placeholder="Author name" {...register('author')} />
            <h3>Content</h3>
            <textarea name="content" {...register("content")} />
            <fieldset>
              <input className={style.checkbox} name="published" type="checkbox" {...register("published")} />
              <label>Published</label>
            </fieldset>
            <button type="submit" className={style.submit}>Save Changes</button>
          </div>
        )
      }
    </form>
  )
}