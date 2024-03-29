import { FormHelperText, FormErrorMessage, CircularProgress, Box, VStack, Flex, Button, Input, Text, Center, TableContainer, Thead, Tr, Th, TableCaption, Td, Table, Tbody, FormControl } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs'
import axios from 'axios';

function Bar(loading, prog) {
  if (loading) {
    return (
      <Center>
        <CircularProgress color='#325BF1' value={prog} size="90px" />
      </Center>
    );
  }
}

function Loading(message, cases) {
  if (message) {
    console.log(cases);
    if (cases != "") {
      return (
        <Box pl="30px" pr="30px" w="auto" borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow="xl">
          <VStack spacing={4}>
            <Text mt={4}>{message}</Text>
            <Center>
              <TableContainer>
                <Table variant='simple'>
                  <TableCaption placement="top">Test Cases</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Pixel #</Th>
                      <Th>Status</Th>
                      <Th>Expected hex value</Th>
                      <Th>Received hex value</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {cases.map(c => (
                      <Tr>
                        <Td>{c.location}</Td>
                        <Td>{c.status}</Td>
                        <Td>#{c.correct_hex}</Td>
                        <Td>#{c.received_hex}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Center>
          </VStack>
        </Box>
      );
    } else {
      return (
        <Box pl="30px" pr="30px" w="auto" borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow="xl">
          <VStack spacing={4}>
            <Text mt={4}>{message}</Text>
            <br></br>
          </VStack>
        </Box>
      );
    }
  }
}

const Test = () => {
  const { user } = useUser();
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [cases, setCases] = useState({});
  const [prog, setProg] = useState(0);
  const [loading, setLoading] = useState(false);
  var startPixel = "";
  var endPixel = "";
  const isError = inputValue === '';

  try {
    startPixel = user.publicMetadata.public_metadata.range.split(",")[0];
    endPixel = user.publicMetadata.public_metadata.range.split(",")[1];
  } catch (e) {
    return (
      <div className="protected">
        <Center>
          <p>⏳ This page will be unlocked once the workshop begins.</p>
        </Center>
      </div>
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setCases('');
    setProg(0);
    var cases = [];
    var message = "";
    var success = true;
    var start = parseInt(user.publicMetadata.public_metadata.range.split(",")[0]);
    var end = parseInt(user.publicMetadata.public_metadata.range.split(",")[1]);

    try {
      // Set the number of requests to send in each batch
      const batchSize = 50;
      var output = [];
      var total = end - start + 1;

      // Split the range of integers into batches
      var s = start;
      var e = start + batchSize;
      var interval = Math.floor(total / batchSize);
      console.log(s, e, total, total / batchSize)
      var batches = [];
      total -= batchSize;
      for (var i = 0; i < interval; i++) {
        let a = []
        for (var x = s; x < e; x++) {
          a.push(x);
        }
        batches.push(a)

        total -= batchSize;
        s += batchSize;
        e += batchSize;

        if (total < batchSize) {
          e += total;
        }
      }

      // Send the requests in batches using Promise.all
      for (const batch of batches) {
        const promises = batch.map(i => axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}api/check`,
          {
            location: i,
            username: user.username,
            url: inputValue,
            challenge: 2
          }),
          {
            headers: {
              'Content-Type': 'application/json'
            },
          })

        setProg(Math.floor((batch[batch.length / 2] - start) / (end - start + 1) * 100));

        const results = await Promise.all(promises);
        // Do something with the results
        output = output.concat(results);
      }

      console.log(output);

      for (var i = 0; i < output.length; i++) {
        console.log(output[i]);
        if (typeof output[i].data.case === 'string' || output[i].data.case instanceof String) {
          message = output[i].data.case;
          success = false;
          setLoading(false);
          break;
        } else if (output[i].data.case.status == "❌") {
          success = false;
        }

        cases.push(output[i].data.case);
      }

      if (success) {
        message = "🥳 Success! Your portion of the artwork was recovered. " + message;
      } else {
        message = "😔 Uh oh. Something went wrong. " + message;
      }

      setLoading(false);
      setMessage(message);
      setCases(cases);
      setProg(0);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setMessage('An error occurred while submitting your URL.');
    }
  }

  return (
    <Center>
      <Flex direction="column" alignItems="center" mt={8}>
        <Flex>
          <Text htmlFor="input" fontSize="5xl">Welcome to <b>Challenge 2</b>,&nbsp;</Text>
          <Text htmlFor="input" fontSize="5xl" color="#325BF1"><b>{user.firstName}</b></Text>
          <Text htmlFor="input" fontSize="5xl">!</Text>
        </Flex>
        <Text htmlFor="input" fontSize="md">(aka <b>@{user.username}</b>)</Text>
        <br></br>
        <Box pl="30px" pr="30px" w="auto" borderWidth='1px' borderRadius='3xl' overflow='hidden' boxShadow="sm">
          <Text htmlFor="input" fontSize="large">Your function will restore pixels <b>{startPixel}</b> through <b>{endPixel}</b>.</Text>
        </Box>
        <br></br>
        <Box pl="300px" pr="300px" w="auto" overflow='hidden'>
          <Text align="center" fontSize="lg">You are the NFT thief, known only by your online handle. Your specialty is breaking into the digital vaults of the wealthy and powerful, stealing their valuable NFTs and selling them on the dark web for a hefty profit.
          </Text>
          <br></br>
          <Text align="center" fontSize="lg">
          But your latest theft is different. As you go through the NFTs you have just stolen, you receive a cryptic letter in your inbox. It reads: "You have something that belongs to us. Adjust the RGB value of the NFT and the hidden message will be revealed.
          </Text>
          <br></br>
          <Text align="center" fontSize="lg">
          It's your job now to create another child serverless function to adjust the rgb values from the results of the API to a format that works for the super duper secret art heist storage system.
          </Text>
        </Box>
        <br></br>
        <Flex direction="column" alignItems="center">
          <Text htmlFor="input" fontSize="xl">Enter your Lambda function's endpoint:</Text>
          <FormControl isInvalid={isError}>
            <Input
              id="input"
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Your Lambda function's URL"
              width="600px"
              isRequired
            />
            {!isError ? (
              <FormHelperText>
                Press submit to test.
              </FormHelperText>
            ) : (
              <FormErrorMessage>URL is required.</FormErrorMessage>
            )}
          </FormControl>
        </Flex>
        <br></br>
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
        <br></br>
        {Loading(message, cases)}
        {Bar(loading, prog)}
      </Flex>
    </Center>
  );
}

export default Test;