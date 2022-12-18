import clerk from '@clerk/clerk-sdk-node';

export default async function handler(req, res) {
    var result = "";
    console.log(req.method)

    if (req.method == "GET") {
        if (req.headers.key == process.env.NEXT_PUBLIC_KEY) {
            result = await clerk.users.getUserList();
            console.log(result)
        } else {
            result = "Unauthorized request."
        }
    } else {
        const {id, public_metadata} = req.body
        console.log(id, public_metadata)
        result = await clerk.users.updateUser(id, { publicMetadata: {public_metadata} });
    }

    res.status(200).json({ result: result })
}