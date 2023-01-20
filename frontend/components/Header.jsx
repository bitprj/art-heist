import styles from "./Header.module.css";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button, Text, Link } from "@chakra-ui/react";

// Header component using <SignedIn> & <SignedOut>.
//
// The SignedIn and SignedOut components are used to control rendering depending
// on whether or not a visitor is signed in.
//
// https://clerk.dev/docs/component-reference/signed-in
// https://clerk.dev/docs/component-reference/signed-out

const Header = () => {
  // const { openSignIn } = useClerk();

  return (
    <header className={styles.header}>
      <div className={styles.headerItem}>
        <Link
          fontWeight="black"
          fontSize="2xl"
          color="#87c0fa"
          transition="all 0.2s"
          _hover={{
            color: "#0d5aa8",
          }}
          href="/"
        >
          NFT Heist Workshop
        </Link>
        {/* <Link href="/" className={styles.homeButton}>
          The NFT Heist
        </Link> */}
      </div>
      <SignedIn>
        <div className={styles.headerItem}>
          <UserButton userProfileUrl="/user" afterSignOutUrl="/" />
        </div>
      </SignedIn>
      <SignedOut>
        <div className={styles.headerItem}>
          <Button
            as="a"
            size="lg"
            href="/signin"
            bg="#0d5aa8"
            _hover={{
              bg: "#042c54",
            }}
          >
            Sign In
          </Button>
        </div>
      </SignedOut>
    </header>
  );
};

export default Header;
