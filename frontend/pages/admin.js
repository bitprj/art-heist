import { Box, VStack, Flex, Button, Text, Spinner, Center, TableContainer, Thead, Tr, Th, TableCaption, Td, Table, Tbody } from '@chakra-ui/react';
import React, { useState } from 'react';
import fetch from 'node-fetch';
import { useUser } from '@clerk/nextjs'

function Loading(loading, users) {
    if (users) {
        console.log(users)
        return (
            <Box pl="30px" pr="30px" w="auto" borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow="xl">
                <VStack spacing={4}>
                    {/* <Text mt={4}>{message}</Text> */}
                    <Center>
                        <TableContainer>
                            <Table variant='simple'>
                                <TableCaption placement="top">Registered Users</TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>Name</Th>
                                        <Th>Username</Th>
                                        <Th>Pixels</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {users.map(user => (
                                        <Tr>
                                            <Td>{user.first_name}&nbsp;{user.last_name}</Td>
                                            <Td>{user.username}</Td>
                                            <Td>Temp</Td>
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
    // const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setUsers('');

        const response = await fetch('/api/users');
        const result = await response.json();
        setUsers(result.users);

        const resp = await fetch('/api/count');
        const res = await resp.json();

        setLoading(false);
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
            {Loading(loading, users)}
            PUT CURRENT LIST OF USERS AND total number of people
        </Flex>
    );
}

export default Admin;