import fetch from 'node-fetch';

const SECRET = ""

for (let i = 31; i < 50; i++) {
    const res = await fetch(`https://meet-mako-28.hasura.app/api/rest/location/${i}`, {
        headers: {
            'x-hasura-admin-secret': SECRET
        }
    });
    const data = await res.json();
    console.log(data)
    const rgb = data.art_pixels[0].rgb_value

    const res1 = await fetch(`https://o48pvkru03.execute-api.us-east-1.amazonaws.com/rgb2hex?rgb=${rgb}`);
    const hex = await res1.json()
    console.log(hex.hex)

    const body = {
        "username": "test",
        "loc": i,
        "hex_value": hex.hex
    };

    const res2 = await fetch('https://meet-mako-28.hasura.app/api/rest/steal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': SECRET
        },
        body: JSON.stringify(body)
    });

    const json = await res2.json();
    console.log(json)

}
