import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  Heading,
  Box,
  SimpleGrid,
  Link,
  Badge,
  Text,
  Stack,
  Img,
  Container,
  Divider,
} from "@chakra-ui/react";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>NFT Art Heist</title>
        <meta
          name="description"
          content="NFT Art Heist workshop by Bit Project for students to learn AWS Lambda, Node.js, and Serverless."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW="container.xl">
        <Box mt={4}>
          <Box color="gray.300">
            <Text textAlign="center">
              Last updated on 1/19/2023{" "}
              <Text as="span" color="green.300">
                •
              </Text>{" "}
              <Text as="span" fontWeight="bold">
                739 active learners
              </Text>
            </Text>
          </Box>
          <Heading textAlign="center" fontWeight="black" size="3xl" mt={8}>
            Bit Project's <br />
            <Text as="span" color="#87c0fa">
              NFT Art Heist Workshop
            </Text>
          </Heading>
          {/* show the tool badges */}
          <Stack direction="row" spacing={4} justifyContent="center" mt={4}>
            <Badge colorScheme="blue">AWS Lambda</Badge>
            <Badge colorScheme="green">Node.js</Badge>
            <Badge colorScheme="red">Serverless</Badge>
            <Badge colorScheme="orange">Beginner Friendly</Badge>
          </Stack>
        </Box>

        <Img
          src="/temp_img.png"
          alt="workshop in progress image"
          mt={16}
          maxH="500px"
          marginX="auto"
        />

        <SimpleGrid
          columns={{ base: "1", md: "2" }}
          spacing={16}
          mt={8}
          border="2px solid red"
          textAlign="center"
        >
          <Box>
            <Heading size="lg" fontWeight="black">
              Workshop Overview
            </Heading>
            <Text mt={4} color="gray.100" fontSize="lg">
              In this workshop, you will learn how to use AWS Lambda, Node.js,
              and Serverless to create a NFT Art Restorer. For more detailed
              instructions, please look at our GitHub's{" "}
              <Link
                href="https://github.com/bitprj/art-heist/blob/main/instructions.md"
                color="#87c0fa"
                isExternal
              >
                instructions.md file
              </Link>
              .
            </Text>
          </Box>
          <Box>
            <Heading size="lg" fontWeight="black">
              Get Started
            </Heading>
          </Box>
        </SimpleGrid>

        <Divider mt={8} />
        <Text textAlign="center" mt={4} color="gray.300">
          For any questions about this workshop, please email{" "}
          <Link href="mailto:info@bitproject.org" color="#87c0fa">
            info@bitproject.org
          </Link>
          .
        </Text>
      </Container>

      <main className={styles.main}>
        {/* <h1 className={styles.title}>
          Welcome to the{" "}
          <a href="/">
            <b>NFT Art Heist</b>
          </a>{" "}
          Workshop!
        </h1> */}

        <p className={styles.description}>
          Get started by <a href="/signin">signing in</a> or{" "}
          <a href="/signup">creating an account</a>.
          {/* <code className={styles.code}>pages/index.js</code> */}
        </p>

        <div className={styles.grid}>
          <a href="/art" className={styles.card}>
            <h2>🖼 The Art &rarr;</h2>
            <p>Click here to see the progress of art restoration.</p>
          </a>

          <a href="/test" className={styles.card}>
            <h2>🧪 Test &rarr;</h2>
            <p>Click here to test your NFT-Art-Restorer.</p>
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://www.bitproject.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by Bit Project&nbsp;&nbsp;
          <span>
            <Image
              src="https://www.bitproject.org/logo.png"
              alt="Bit Project Logo"
              width={30}
              height={30}
            />
          </span>
        </a>
      </footer>
    </div>
  );
}
