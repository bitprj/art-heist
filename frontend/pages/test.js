import { Flex, Button, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import fetch from 'node-fetch';

const Check = () => {
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/check', {
        method: 'POST',
        body: JSON.stringify({
          "username": "testInput",
          "start": 1,
          "end": 3,
          "url": inputValue
      }),
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();
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
      {message && <Text mt={4}>{message}</Text>}
    </Flex>
  );
}

export default Check;