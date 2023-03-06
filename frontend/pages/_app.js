import "../styles/globals.css";
import { ClerkLoaded, ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { ChakraProvider, Center, extendTheme } from "@chakra-ui/react";
import Header from "../components/Header.jsx";
import { useRouter } from "next/router";
import { Global, css } from "@emotion/react";
import { useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";

const theme = extendTheme({
  components: {
    Steps,
  },
});

const publicPages = ["/", "/art", "/signin", "/signup", "/instructions"];

function ForceDarkMode({ children }) {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === "dark") return;
    toggleColorMode();
  }, [colorMode]);

  return children;
}

const GlobalStyle = ({ children }) => {
  return (
    <>
      <Global
        styles={css`
          html {
            min-width: 356px;
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background: #fffff;
          }
        `}
      />
      {children}
    </>
  );
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ChakraProvider theme={theme}>
      <GlobalStyle>
        <ForceDarkMode>
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
        </ForceDarkMode>
      </GlobalStyle>
    </ChakraProvider>
  );
}

export default MyApp;
