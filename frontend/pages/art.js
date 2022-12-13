import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/core';
import { Center, SimpleGrid, Text } from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

const Art = () => {
  const [hexValues, setHexValues] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPixels = async () => {
      try {
        setLoading(true);
        let { data: art_pixels, error } = await supabase
        .from('art_pixels')
        .select("hex_value")
        .order('location', { ascending: true })

        console.log(art_pixels)
        setHexValues(art_pixels);
      } catch (e) {
        alert(e);
      } finally {
        setLoading(false);
      }
    };
    loadPixels();
  }, []);

  // if loading, just show basic message
  if (loading) {
    return (
    <Center bg='black' w='calc(100vw)' h='calc(100vh)' color='white'>
      <Text>Loading...</Text>
    </Center>
    )}

  return (
    <Center bg='black' w='calc(100vw)' h='calc(100vh)' color='white'>
      <SimpleGrid spacingX='0px' spacingY='0px' w='calc(45vw)' h='calc(75vh)' columns={32}>
        {hexValues.map(hexValue => (
          <Box p={2} bg={"#" + hexValue.hex_value}>
          </Box>
        ))}
      </SimpleGrid>
    </Center>
  );
};

export default Art;