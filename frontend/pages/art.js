import React, { useState, useEffect } from 'react';
import { Center, SimpleGrid, Text, Spinner, Popover, PopoverTrigger, PopoverContent, PopoverBody, Box } from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js';
import { QuestionOutlineIcon } from '@chakra-ui/icons';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

function Pixel(hexValue) {
  if (hexValue.hex_value == null) {
    return (
      <QuestionOutlineIcon boxSize={2} color="black" />
    );
  } else {
    var dateTime = new Date(parseInt(hexValue.updated_at))
    return (
      <Popover trigger="hover">
        <PopoverTrigger>
          <Box _hover={{ filter: 'brightness(250%)' }} w='8px' h='8px' bg={"#" + hexValue.hex_value}>
          </Box>
        </PopoverTrigger>
        <PopoverContent borderRadius="4px" w='auto' h='auto' bg='white'>
          <PopoverBody >
            <Center pr='10px' pl='10px'>
              <Text color="black"><b>User: </b>{hexValue.username}<br></br><b>Time: </b>{dateTime.toLocaleString()}<br></br><b>Pixel: </b>{hexValue.location}</Text>
            </Center>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  }
}

const Art = () => {
  const [hexValues, setHexValues] = useState([])
  const [loading, setLoading] = useState(true);
  var l = 0;

  useEffect(() => {
    const interval = setInterval( async () => {
      try {
        if (l < 0) {
          setLoading(true);
          l++;
        }
        let { data: art_pixels, error } = await supabase
          .from('art_pixels')
          .select("hex_value, username, updated_at, location")
          .order('location', { ascending: true })

        console.log(art_pixels)
        setHexValues(art_pixels);
      } catch (e) {
        alert(e);
      } finally {
        setLoading(false);
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [hexValues])

  // if loading, just show basic message
  if (loading) {
    return (
      <Center bg='white' w='calc(100vw)' h='calc(80vh)'>
        <Spinner
          thickness='10px'
          speed='0.65s'
          emptyColor='#ccd6fc'
          color='#325BF1'
          size='xl'
          label='Loading Art...'
        />
      </Center>
    )
  }

  return (
    <Center bg='white' w='calc(100vw)' h='calc(80vh)' color='white'>
      <SimpleGrid spacingX='0px' spacingY='0px' w='auto' h='auto' columns={80}>
        {hexValues.map(hexValue => Pixel(hexValue))}
      </SimpleGrid>
    </Center>
  );
};

export default Art;