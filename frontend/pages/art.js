import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/core';
import { Center, SimpleGrid } from '@chakra-ui/react'

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
    <Center bg='black' w='calc(100vw)' h='calc(100vh)' color='white'>
      <SimpleGrid spacingX='0px' spacingY='0px' w='calc(45vw)' h='calc(75vh)' columns={7}>
        {hexValues.map(hexValue => (
          <Box p={2} bg={"#" + hexValue.hex_value}>
          </Box>
        ))}
      </SimpleGrid>
    </Center>
  );
};

export default Art;