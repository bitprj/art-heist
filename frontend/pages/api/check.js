import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default async function handler(req, res) {
    console.log(req.body)
    const { start, end, url, username } = req.body;
    let response = ""
    let incorrectValue = false;

    try {
        for (let i = start; i <= end; i++) {
            let { data: art_pixels, error } = await supabase
                .from('art_pixels')
                .select('rgb_value, correct_hex')
                .eq('location', i)
    
            console.log(art_pixels)
            const rgb = art_pixels[0].rgb_value
    
            const res = await fetch(`${url}?rgb=${rgb}`);
            const hex = await res.json()
            console.log(hex.hex)

            if (art_pixels[0].correct_hex != hex.hex) {
                incorrectValue = true;
            }
    
            const { data, err } = await supabase
                .from('art_pixels')
                .update({ username: username, hex_value: hex.hex, updated_at: new Date().toLocaleString()})
                .eq('location', i)
    
            console.log(data);
        }
        
        if (incorrectValue) {
            response = `Successfully requested Lambda function, but the hex values are incorrect.`;
        } else {
            response = `Successfully requested Lambda function, and the hex values are correct!`;
        }

    } catch (e) {
        response = `There was an issue requesting your Lambda function. Here was the error: ${e}`;
    }

    res.status(200).json({ message: response })
}