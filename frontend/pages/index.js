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
  OrderedList,
  ListItem,
  Button,
} from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Bit Project NFT Art Heist Workshop</title>
        <meta
          name="description"
          content="NFT Art Heist workshop by Bit Project for students to learn AWS Lambda, Python, and Serverless."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW="container.xl">
        <Box mt={4}>
          <Box color="gray.300">
            <Text textAlign="center">
              Last updated on 3/5/2023{" "}
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
            <Badge colorScheme="green">Python</Badge>
            <Badge colorScheme="red">Serverless</Badge>
            <Badge colorScheme="orange">Beginner Friendly</Badge>
          </Stack>

          <Stack direction="row" spacing={4} justifyContent="center" mt={4}>
            <Button as="a" href="/art" colorScheme="blue" size="md">
              Progress of art restoration
            </Button>
            <Button as="a" href="/test" colorScheme="green" size="md">
              Test your NFT-Art-Restorer
            </Button>
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
          columns={{ base: "1", lg: "2" }}
          spacing={16}
          mt={8}
          textAlign="left"
        >
          <Box>
            <Heading size="lg" fontWeight="black">
              Workshop Overview
            </Heading>
            <Text mt={4} color="gray.100" fontSize="lg">
              In this workshop, you will learn how to use AWS Lambda, Node.js,
              and Serverless to create a NFT Art Restorer. To get started,
              please read the{" "}
              <Link href="/instructions" color="#87c0fa" isExternal>
                instructions page
              </Link>
              .
            </Text>
          </Box>
          <Box>
            <Heading size="lg" fontWeight="black">
              Get Started
            </Heading>

            <OrderedList mt={4} color="gray.100" fontSize="lg">
              <ListItem>
                If you don&apos;t have an account, head to the{" "}
                <Link href="/signup" color="#87c0fa">
                  sign up page
                </Link>
                .
              </ListItem>
              <ListItem>
                If you already have an account, head to the{" "}
                <Link href="/signin" color="#87c0fa">
                  sign in page
                </Link>
                .
              </ListItem>
              <ListItem>
                Read the{" "}
                <Link href="/instructions" color="#87c0fa" isExternal>
                  instructions
                </Link>{" "}
                to get started.
              </ListItem>
            </OrderedList>
          </Box>
        </SimpleGrid>

        <Divider mt={8} />
        <Text textAlign="center" my={4} color="gray.300">
          For any questions about this workshop, please email{" "}
          <Link href="mailto:info@bitproject.org" color="#87c0fa">
            info@bitproject.org
          </Link>
          .
        </Text>
      </Container>
    </>
  );
}
