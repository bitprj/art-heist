import { Progress, Box, VStack, Flex, Button, Input, Text, Spinner, Center, TableContainer, Thead, Tr, Th, TableCaption, Td, Table, Tbody } from '@chakra-ui/react';
import React, { useState } from 'react';
import fetch from 'node-fetch';
import { useUser } from '@clerk/nextjs'


function Loading(loading, message, cases, prog) {
  if (loading) {
    return (
      <Center>     
        <Progress color='#325BF1' value={prog} />
      </Center>
    );
  } else if (message) {
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

    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      setMessage('');
      setCases('');
      var cases = [];
      var message = "";
      var success = true;
      // var start = parseInt(user.publicMetadata.public_metadata.range.split(",")[0]);
      // var end = parseInt(user.publicMetadata.public_metadata.range.split(",")[1]);
      var start = 1;
      var end = 5;

      try {
        for (let i = start; i <= end; i++) {
          const response = await fetch('/api/check', {
            method: 'POST',
            body: JSON.stringify({
              "location": i,
              "username": user.username,
              "url": inputValue
            }),
            headers: { 'Content-Type': 'application/json' },
          });

          const result = await response.json();
          console.log(result.case);

          if (typeof result.case === 'string' || result.case instanceof String) {
            message = result.case;
            success = false;
            setLoading(false);
            break;
          } else if (result.case.status == "❌") {
            success = false;
          }

          console.log(result);
          cases.push(result.case);

          setProg(Math.floor(start / (end - start + 1)));
        }

        if (success) {
          message = "🥳 Success! Your portion of the artwork was recovered. " + message;
        } else {
          message = "😔 Uh oh. Something went wrong. " + message;
        }

        setLoading(false);
        setMessage(message);
        setCases(cases);
      } catch (error) {
        console.log(error)
        setLoading(false);
        setMessage('An error occurred while submitting your URL.');
      }
    }

    return (
      <Flex pl="280px" pr="280px" direction="column" alignItems="center" mt={8}>
        <Flex>
          <Text htmlFor="input" fontSize="5xl">Welcome,&nbsp;</Text>
          <Text htmlFor="input" fontSize="5xl" color="#325BF1"><b>{user.firstName}</b></Text>
          <Text htmlFor="input" fontSize="5xl">!</Text>
        </Flex>
        <Text htmlFor="input" fontSize="md">(aka <b>@{user.username}</b>)</Text>
        <br></br>
        <Text htmlFor="input" fontSize="xl">Enter your Lambda function's endpoint:</Text>
        <Input
          id="input"
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Your Lambda function's URL"
          isRequired
        />
        <br></br>
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
        <br></br>
        {Loading(loading, message, cases, prog)}
      </Flex>
    );
  }

  export default Test;