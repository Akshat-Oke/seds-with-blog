import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import logo from '../../public/seds_logo_w.png'
import styles from '../../styles/navbar/navbar.module.css'

function Navbar() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.buttons}>
          <Link href=""> Rocket</Link>
        </div>
        <div className={styles.buttons}>
          <Link href=""> CanSat</Link>
        </div>
        <div className={styles.buttons}>
          <Image src={logo} width={120} height={50}></Image>
        </div>
        <div className={styles.buttons}>
          <Link href=""> CubeSat</Link>
        </div>
        <div className={styles.buttons}>
          <Link href=""> RnD</Link>
        </div>
      </div>
    </>
  );
}

export default Navbar