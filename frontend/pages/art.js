import React, { useState, useEffect } from 'react';
import { SimpleGrid } from '@chakra-ui/react'
import { Box } from '@chakra-ui/core';
import { Center, Square, Circle } from '@chakra-ui/react'

const SECRET = ""

const Art = () => {
  const [hexValues, setHexValues] = useState([]);

  useEffect(() => {
    fetch('https://meet-mako-28.hasura.app/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': SECRET
      },
      body: JSON.stringify({
        query: `
        query GetHex {
            art_pixels {
              hex_value
            }
          }
        `,
      }),
    })
      .then(res => res.json())
      .then(({ data }) => {
        setHexValues(data.art_pixels);
        console.log(hexValues)
      });
  }, []);

  return (
    <Center bg='black' h='100px' color='white'>
      <SimpleGrid w="8%" h="100%" columns={7}>
        {hexValues.map(hexValue => (
          <Box w="25%" h="25%" p={2} bg={"#" + hexValue.hex_value}>
          </Box>
        ))}
      </SimpleGrid>
    </Center>
  );
};

export default Art;