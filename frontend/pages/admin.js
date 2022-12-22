import { Box, VStack, Flex, Button, Text, CircularProgress, Center, TableContainer, Thead, Tr, Th, TableCaption, Td, Table, Tbody } from '@chakra-ui/react';
import React, { useState } from 'react';
import fetch from 'node-fetch';
import { useUser } from '@clerk/nextjs'

function Loading(loading, users, prog) {
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
                                        <Th>Start Pixel</Th>
                                        <Th>End Pixel</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {users.map(user => (
                                        <Tr>
                                            <Td>{user.firstName}&nbsp;{user.lastName}</Td>
                                            <Td>{user.username}</Td>
                                            <Td>{user.publicMetadata.public_metadata.range.split(",")[0]}</Td>
                                            <Td>{user.publicMetadata.public_metadata.range.split(",")[1]}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Center>
                </VStack>
                <br></br>
            </Box>);
    } else if (loading) {
        return (
            <Center>
                <CircularProgress color='#325BF1' value={prog} size="90px" />
            </Center>
        );
    }
}

const Admin = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    // const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState('');
    const [prog, setProg] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setUsers('');

        // call api to get list of users
        const response = await fetch('/api/users', {
            method: "GET",
            headers: { "key": process.env.NEXT_PUBLIC_KEY }
        });
        const result = await response.json();

        const resp = await fetch('/api/count');
        const res = await resp.json();

        var totalPixels = res.total_pixels
        const pixels = Math.floor(totalPixels / result.result.length);

        // add pixel ranges 
        var start = 1;
        var end = pixels;
        totalPixels -= pixels;
        for (var i = 0; i < result.result.length; i++) {
            console.log(start + "," + end);
            console.log(result.result[i].id)
            const resp = await fetch(`/api/users`, {
                method: "POST",
                body: JSON.stringify({
                    "id": result.result[i].id,
                    "public_metadata": { "range": start + "," + end }
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const res = await resp.json();
            console.log(res)

            totalPixels -= pixels;
            start += pixels;
            end += pixels;

            if (totalPixels < pixels) {
                end += totalPixels
            }

            setProg((i + 1) / result.result.length * 100);
        }

        // update users on main page
        const response2 = await fetch('/api/users', {
            headers: { "key": process.env.NEXT_PUBLIC_KEY }
        });
        const result2 = await response2.json();
        setUsers(result2.result);
        setLoading(false);
        setProg(0);
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
            {Loading(loading, users, prog)}
        </Flex>
    );
}

export default Admin;