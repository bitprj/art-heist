import fetch from 'node-fetch';

export default async function handler(req, res) {    
    const response = await fetch('https://api.clerk.dev/v1/users?order_by=-created_at', {
        headers: { 'Authorization': `Bearer ${process.env.CLERK_API_KEY}` },
    });

    const result = await response.json();
    console.log(result);

    res.status(200).json({ users: result})
}