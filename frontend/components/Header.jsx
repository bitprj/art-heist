import styles from "./Header.module.css";
import { useClerk, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

// Header component using <SignedIn> & <SignedOut>.
//
// The SignedIn and SignedOut components are used to control rendering depending
// on whether or not a visitor is signed in.
//
// https://clerk.dev/docs/component-reference/signed-in
// https://clerk.dev/docs/component-reference/signed-out

const Header = () => {
  const { openSignIn } = useClerk();

  return (
    <header className={styles.header}>
      <div className={styles.headerItem}>
        <Link href="/" className={styles.homeButton}>
          The NFT Heist
        </Link>
      </div>
      <SignedIn>
        <div className={styles.headerItem}>
          <UserButton userProfileUrl="/user" afterSignOutUrl="/" />
        </div>
      </SignedIn>
      <SignedOut>
        <div className={styles.headerItem}>
          <a onClick={() => openSignIn()} className={styles.signInButton}>
            Sign in
          </a>
        </div>
      </SignedOut>
    </header>
  );
};

export default Header;
