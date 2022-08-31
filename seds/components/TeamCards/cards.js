import React from 'react'
import styles from '../../styles/teams/card.module.css'
import Image from 'next/image'
import Link from 'next/link'

function Cards({datas}) {
    return (
      <>
        {datas.map((data) => {
          return (
            <div className={styles.container}>
              <div className={styles.images}>
                <div className={styles.img}>
                  <Image src={data.img} height={220} width={260} />
                </div>
              </div>
              <div className={styles.name}>{data.name}</div>
              <div className={styles.por}>{data.por}</div>
              <div className={styles.links}>
                <div className={styles.link}>
                  <Link href={data.hrefL}>A</Link>
                </div>
                <div className={styles.link}>
                  <Link href={data.hrefF}>B</Link>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
}

export default Cards