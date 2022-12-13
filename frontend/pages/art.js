import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/core';
import { Center, SimpleGrid } from '@chakra-ui/react';

const Art = () => {
  const [hexValues, setHexValues] = useState([]);

  useEffect(() => {
    fetch('/api/db')
      .then(res => res.json())
      .then(({ data }) => {
        setHexValues(data.data);
        console.log("Hexes" + hexValues)
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