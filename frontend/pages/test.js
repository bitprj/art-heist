import { Flex, Button, Input, Text, Spinner } from '@chakra-ui/react';
import React, { useState } from 'react';
import fetch from 'node-fetch';
import { useUser } from '@clerk/nextjs'


function Loading(loading, message) {
  if (message) {
    return (
      <Text mt={4}>{message}</Text>
    );
  } else if (loading) {
    return (
      <Spinner
      thickness='15px'
      speed='0.65s'
      emptyColor='#E6FFFA'
      color='#285E61'
      size='xl'
      label='Loading Art...'
    />
    );
  }
}

const Check = () => {
  const { isLoaded, isSignedIn, user } = useUser()

  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    setMessage('')

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
    } catch (error) {
      setMessage('An error occurred while submitting your URL.');
    }
  }

  return (
    <Flex direction="column" alignItems="center" mt={8}>
      <Text htmlFor="input">Enter your Lambda Function's endpoint:</Text>
      <Input
        id="input"
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <Button type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      {Loading(loading, message)}
    </Flex>
  );
}

export default Check;