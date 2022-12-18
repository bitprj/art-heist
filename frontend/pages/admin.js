import { Flex, Button, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import fetch from 'node-fetch';
import { useUser } from '@clerk/nextjs'

function Loading(loading, message, users) {
    if (message) {
        return (
            <Box pl="30px" pr="30px" w="auto" borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow="xl">
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
                                    {users.map(c => (
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
            </Box>);
    } else if (loading) {
        return (
            <Spinner
                thickness='15px'
                speed='0.65s'
                emptyColor='#ccd6fc'
                color='#325BF1'
                size='xl'
            />
        );
    }
}

const Admin = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState({});

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
        } catch (error) {
            setMessage('An error occurred while starting the workshop.');
        }
    }

    return (
        <Flex pl="280px" pr="280px" direction="column" alignItems="center" mt={8}>
            <Flex>
                <Text htmlFor="input" fontSize="5xl" color="#325BF1"><b>Admin</b></Text>
                <Text htmlFor="input" fontSize="5xl">&nbsp;Page</Text>
            </Flex>
            <Text htmlFor="input" fontSize="xl">Click the button below to start the workshop:</Text>
            <br></br>
            <Button type="submit" onClick={handleSubmit}>
                Start Workshop
            </Button>
            <br></br>
            {Loading(loading, message)}
            PUT CURRENT LIST OF USERS AND total number of people
        </Flex>
    );
}

export default Admin;