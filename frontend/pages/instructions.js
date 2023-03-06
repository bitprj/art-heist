import Head from "next/head";
import {
  List,
  Link,
  ListItem,
  Container,
  Button,
  Box,
  Text,
  SimpleGrid,
  Heading,
  Flex,
  LoremIpsum,
  ListIcon,
} from "@chakra-ui/react";
import { Basic } from "../components/Steps";

const steps = [{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }];

const content = <Flex py={4}>test test test</Flex>;

export default function ArtHeistInstructions() {
  return (
    <>
      <Head>
        <title>Instructions | NFT Art Heist Workshop</title>
        <meta
          name="description"
          content="Instructions for the Bit Project NFT Art Heist Workshop."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="container.lg" p="15px">
        <Link href="/" color="blue.300">
          ← Back to home
        </Link>
      </Container>

      <Container maxW="container.lg" p="15px" bg="black">
        <Box
          p="1rem"
          maxW={{
            base: "xl",
            md: "7xl",
          }}
          mx="auto"
          bg="black"
          color="white"
        >
          <Heading
            as="h1"
            size="xl"
            fontWeight="extrabold"
            maxW="48rem"
            lineHeight="1.2"
            letterSpacing="tight"
          >
            Art Heist Instructions
          </Heading>
          <Box my="1rem">
            <Text fontSize="lg" mr="3rem">
              Instructions for the{" "}
              <Link
                href="https://art-heist-bitprj.vercel.app/"
                isExternal
                color="blue.300"
              >
                Bit Project Art Heist Workshop
              </Link>
              .
            </Text>
          </Box>
        </Box>

        <Basic />
      </Container>
    </>
  );
}
