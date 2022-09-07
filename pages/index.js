import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import PostContent from '../components/PostContent'
import styles from '../styles/Home.module.css'
import style from "./posts/post.module.css"
export default function Home() {
  return (
    <main>
      <div className={style.header}>
        <div className={style.back_button}>
          <Link href="/posts">
            BACK TO BLOGS
          </Link>
        </div>
      </div>
      <div className={style.blog}>
        <div className={style.metadata}>
          <h1>Up up and Away</h1>
          <div className={style.date}>30th February, 2022</div>
          <div className={style.author}>Written by John Doe</div>
        </div>
        <div className={style.divider}></div>
        <div className={style.content}>
          Lorem ipsum dolor sit amet, consectetur adipsing and yes
          <h2>yeah, a heading</h2>
          grid-template-columns: minmax(auto, 50%) 1fr 3em;
          The minmax() function accepts 2 arguments: the first is the minimum size of the track and the second the maximum size. Alongside length values, the values can also be auto, which allows the track to grow/stretch based on the size of the content.

          In this example, the first row track is set to have a minimum height of 100px, but its maximum size of auto will allow the row track to grow it the content is taller than 100px.

          The first column track has a minimum size of auto, but its maximum size of 50% will prevent it from getting no wider than 50% of the grid container width.

          1
          2
          3
          4. This item has more content than the others and is intentionally, unnecessarily, superfluously, uselessly, and annoyingly verbose for the sake of example. This item has more content than the others and is intentionally, unnecessarily, superfluously, uselessly, and annoyingly verbose for the sake of example. This item has more content than the others and is intentionally, unnecessarily, superfluously, uselessly, and annoyingly verbose for the sake of example.
          5
          6
          Repeating Grid Tracks
          Define repeating grid tracks using the repeat() notation. This is useful for grids with items with equal sizes or many items.

          grid-template-rows:    repeat(4, 100px);
          grid-template-columns: repeat(3, 1fr);
          The repeat() notation accepts 2 arguments: the first represents the number of times the defined tracks should repeat, and the second is the track definition.

          1
          2
          3
          4
          5
          6
          7
          8
          9
          10
          11
          12
          grid-template-columns: 30px repeat(3, 1fr) 30px
          repeat() can also be used within track listings.

          In this example, the first and last column tracks have widths of 30px, and the 3 column tracks in between, created by repeat(), have widths of 1fr each.
        </div>
      </div>
    </main>
  )
}
