import { VStack, Flex, Button, Input, Text, Spinner, Center, TableContainer, Thead, Tr, Th, TableCaption, Td, Table, Tbody } from '@chakra-ui/react';
import React, { useState } from 'react';
import fetch from 'node-fetch';
import { useUser } from '@clerk/nextjs'


function Loading(loading, message, cases) {
  if (message) {
    console.log(cases);
    return (
      <VStack spacing={4}>
        <Text mt={4}>{message}</Text>
        <Center>
          <TableContainer>
            <Table variant='simple'>
              <TableCaption placement="top">Test Cases</TableCaption>
              <Thead>
                <Tr>
                  <Th>Status</Th>
                  <Th>Expected hex value</Th>
                  <Th>Received hex value</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cases.map(c => (
                  <Tr>
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
    );
  } else if (loading) {
    return (
      <Spinner
        thickness='15px'
        speed='0.65s'
        emptyColor='#E6FFFA'
        color='#285E61'
        size='xl'
      />
    );
  }
}

const Test = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [cases, setCases] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/check', {
        method: 'POST',
        body: JSON.stringify({
          "username": user.username,
          "start": 1,
          "end": 3,
          "url": inputValue
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();
      setLoading(false);
      setMessage(result.message);
      setCases(result.cases);
    } catch (error) {
      setMessage('An error occurred while submitting your URL.');
    }
  }

  return (
    <Flex pl="280px" pr="280px" direction="column" alignItems="center" mt={8}>
      <Text htmlFor="input" fontSize="xl">Welcome, <b>{user.firstName}</b>! Enter your Lambda Function's endpoint:</Text>
      <Input
        id="input"
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <br></br>
      <Button type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      {Loading(loading, message, cases)}
    </Flex>
  );
}

export default Test;