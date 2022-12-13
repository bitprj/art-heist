import React, { useState, useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';

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
        <Flex>
        {hexValues.map(hexValue => (
            <Box p={2} bg={"#" + hexValue.hex_value}>

            </Box>
        ))}
        </Flex>
    );
};

export default Art;