import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default async function handler(req, res) {
    console.log(req.body)
    const { location, url, username, challenge } = req.body;
    var c = ""
    var correct_hex = "";
    var incorrectValue = false;

    try {
        let { data: art_pixels, error } = await supabase
            .from('art_pixels')
            .select('rgb_value, correct_hex_one, correct_hex_two, location')
            .eq('location', location)

        console.log(art_pixels)
        const rgb = art_pixels[0].rgb_value

        const res = await fetch(`${url}?rgb=${rgb}`);
        const hex = await res.json()
        console.log(hex.hex)

        if (challenge == 1) {
            correct_hex = art_pixels[0].correct_hex_one;
        } else {
            correct_hex = art_pixels[0].correct_hex_two;
        }

        c = {
            "correct_hex": correct_hex,
            "received_hex": hex.hex,
            "location": art_pixels[0].location
        }

        if (correct_hex != hex.hex) {
            incorrectValue = true;
            c.status = "❌";
        } else {
            c.status = "✅";
        }

        const { data, err } = await supabase
            .from('art_pixels')
            .update({ username: username, hex_value: hex.hex, updated_at: new Date().getTime() })
            .eq('location', location)

        console.log(c);
        console.log(data);

    } catch (e) {
        c = `There was an error requesting your function: ${e}`
    }

    res.status(200).json({ case: c })
}