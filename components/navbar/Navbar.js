import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image';
import logo from '../../public/sedsblack.svg'
import styles from '../../styles/navbar/navbar.module.css'
import { UserContext } from '../../lib/context';
import { SignOutButton } from '../../lib/firebase';

function Navbar() {
  const { user, username } = React.useContext(UserContext)
  return (
    <>
      <div className={styles.container}>
        <div className={styles.buttons}>
          <Link href="/about"> Who are we</Link>
        </div>
        <div className={styles.buttons}>
          <Link href=""> CanSat</Link>
        </div>
        <div className={styles.buttons}>
          <Image alt="" src={logo} width={140} height={60}></Image>
        </div>
        <div className={styles.buttons}>
          <Link href=""> CubeSat</Link>
        </div>
        <div className={styles.buttons}>
          <Link href=""> RnD</Link>
        </div>
        {user ? <div className={styles.buttons}>
          <SignOutButton />
        </div> : null}
      </div>
    </>
  );
}
function NavBarNew() {
  const { user, username } = React.useContext(UserContext)
  const router = useRouter();
  const invertNav = router.asPath.includes("/teams");
  function toggleClass(id, className) {
    document.getElementById(id).classList.toggle(className);
  }
  function removeClass() {
    document.getElementById('menu').classList.remove('open');
  }
  function addClass() {
    document.getElementById('menu').classList.add('open')
  }
  return (
    <>
      <div className="menu" id="menu">
        <div
          className="close"
          onClick={removeClass}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
        {user && <Link href="/admin"><a className="nav-ele admin">Admin</a></Link>}
        <a className="nav-ele" href="/about/">Who are we</a>
        <Link href="/teams/"><a className="nav-ele">Team</a></Link>
        {/* <h2>Projects</h2> */}
        <a className="nav-ele mobile-projects" href="#!" onClick={() => toggleClass("mobile-dropdown", "active")}>Projects</a>
        <div className="mobile-dropdown" id="mobile-dropdown">
          {/* <div className="divider"></div> */}
          <a className="nav-project" href="../sacup/">Rocket</a>
          <a className="nav-project" href="../cansat/">CanSat</a>
          <a className="nav-project" href="../cubesat/">CubeSat</a>
          <a className="nav-project" href="../archangel/">R&D</a>
        </div>
        <Link href="/posts/"><a className="nav-ele">Blog</a></Link>
        <a className="nav-ele" href="/about/">Sponsors</a>
        <a className="nav-ele" href="../contact/">Contact</a>
        {user && <SignOutButton />}
      </div>
      <nav className={`navbar row ${invertNav ? "invert" : ""}`}>
        <i
          id="menu-open"
          onClick={addClass}
          className="nav-ele fa-solid fa-bars"
        ></i>
        {user && <Link href="/admin"><a className="nav-ele admin">Admin</a></Link>}
        <a className="nav-ele" href="../sacup/">Rocket</a>
        <a className="nav-ele" href="../cansat/">CanSat</a>
        <Link href="/home/index.html?#end"><a><img src="/assets/images/seds_logo_w.png" alt="SEDS Logo" /></a></Link>
        <a className="nav-ele" href="../cubesat/">CubeSat</a>
        <a className="nav-ele" href="../archangel/">R&D</a>
        {user && <SignOutButton />}
        <i className="nav-ele fa fa-search" aria-hidden="true"></i>
      </nav>
    </>
  );
}
export default NavBarNew