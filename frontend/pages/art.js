import React, { useState, useEffect } from 'react';
import { Popover, PopoverTrigger, PopoverContent, Box } from '@chakra-ui/core';
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
          .select("hex_value, username, updated_at")
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
    )
  }

  return (
    <Center bg='black' w='calc(100vw)' h='calc(100vh)' color='white'>
      <SimpleGrid spacingX='0px' spacingY='0px' w='auto' h='auto' columns={32}>
        {hexValues.map(hexValue => (
          <Popover trigger="hover" matchWidth="true">
            <PopoverTrigger>
              <Box _hover={{bg: "#fff"}} p={2} bg={"#" + hexValue.hex_value}>
              </Box>
            </PopoverTrigger>
            <PopoverContent boxShadow='dark-lg' borderRadius="6px" pl="3" pr="3" borderWidth="1px" borderColor="gray.500" opacity="0.8" w="auto">
                  <Text color="black"><b>User: </b>{hexValue.username}<br></br><b>Time: </b>{hexValue.updated_at} EST</Text>
            </PopoverContent>
          </Popover>
        ))}
      </SimpleGrid>
    </Center>
  );
};

export default Art;