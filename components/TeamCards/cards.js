import React from 'react'
import styles from '../../styles/teams/card.module.css'
import Image from 'next/image'
import Link from 'next/link'

function Cards({ datas }) {
  return (
    <>
      {datas.map((data, i) => {
        return (
          <div key={i} className={styles.container}>
            <div className={styles.images}>
              <div className={styles.img}>
                <Image src={`/assets/images/Profile_pics/${data.img}`} height={233} width={299} />
              </div>
            </div>
            <a href={data.url ?? "#!"} target="_blank" rel="noreferrer">
              <div className={styles.name}>{data.name}</div>
            </a>
            <div className={styles.por}>{data.por}</div>
            {/* <div className={styles.links}>
              <div className={styles.link}>
                <Link href={data.hrefL ?? "#!"}>A</Link>
              </div>
              <div className={styles.link}>
                <Link href={data.hrefF ?? "#!"}>B</Link>
              </div>
            </div> */}
          </div>
        );
      })}
    </>
  );
}

export default Cards