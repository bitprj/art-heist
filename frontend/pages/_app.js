import '../styles/globals.css'
import {ClerkLoaded, ClerkProvider, SignedIn, SignedOut} from "@clerk/nextjs";
import { ChakraProvider, Center } from '@chakra-ui/react'
import Header from "../components/Header.jsx";
import {useRouter} from "next/router";

const publicPages = ["/", "/art"];


function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ChakraProvider>
    <ClerkProvider {...pageProps}>
      <ClerkLoaded>
        <Header />
        {publicPages.includes(router.pathname) ? (
          <main>
            <Component {...pageProps} />
          </main>
        ) : (
          <>
            <SignedIn>
              <Component {...pageProps} />
            </SignedIn>
            <SignedOut>
              <div className="protected">
                <Center>
                  <p>🔐 You need to be signed in to access this page.</p>
                </Center>
              </div>
            </SignedOut>
          </>
        )}
       </ClerkLoaded>
      </ClerkProvider>
   </ChakraProvider>
  );
}

export default MyApp
