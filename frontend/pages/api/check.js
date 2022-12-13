import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

for (let i = 1; i < 50; i++) {
    let { data: art_pixels, error } = await supabase
    .from('art_pixels')
    .select("rgb_value")
    .eq('location', i)

    console.log(art_pixels)
    const rgb = art_pixels[0].rgb_value

    const res = await fetch(`https://o48pvkru03.execute-api.us-east-1.amazonaws.com/rgb2hex?rgb=${rgb}`);
    const hex = await res.json()
    console.log(hex.hex)

    const { data, err } = await supabase
        .from('art_pixels')
        .update({ username: 'test', hex_value: hex.hex })
        .eq('location', i)

    console.log(data)
}
