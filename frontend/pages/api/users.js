import fetch from 'node-fetch';

export default async function handler(req, res) {   
    var result = "";

    if (req.headers.key == process.env.NEXT_PUBLIC_KEY) {
        const response = await fetch('https://api.clerk.dev/v1/users?order_by=-created_at', {
            headers: { 'Authorization': `Bearer ${process.env.CLERK_API_KEY}` },
        });

        result = await response.json();
        console.log(result);
    } else {
        result = "Unauthorized request."
    }

    res.status(200).json({ users: result })
}