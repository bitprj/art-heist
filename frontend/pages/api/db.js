import postgres from 'postgres';
const sql = postgres(process.env.NEXT_PUBLIC_DATABASE_URL);

export default async function handler(req, res) {
    const data = await sql`
    select
        hex_value
    from art_pixels`

    console.log(data)
    res.status(200).json({data})
}

