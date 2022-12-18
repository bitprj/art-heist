import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default async function handler(req, res) {    
    const { error, data, count } = await supabase
    .from('art_pixels')
    .select('*', { count: 'exact' })

    console.log(count);

    res.status(200).json({ total_pixels: count })
}