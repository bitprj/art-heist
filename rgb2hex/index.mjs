import fetch from 'node-fetch';
import rgbHex from 'rgb-hex';

const SECRET = ""

export const handler = async(event) => {
    // TODO implement
    
    const location = event["queryStringParameters"]["location"];
    const username = event["queryStringParameters"]["username"];
    
    const res = await fetch(`https://meet-mako-28.hasura.app/api/rest/location/${location}`, { 
        headers: {
          'x-hasura-admin-secret': SECRET
        } 
    });
    const data = await res.json();
    
    const rgb = data.art_pixels[0].rgb_value.split(",")
    console.log(rgb)
    
    const hex = rgbHex(parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2]));
    
    const body = {
        "username": username,
        "loc": location,
        "hex_value": hex
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

    const response = {
        statusCode: 200,
        body: JSON.stringify(json),
    };
    return response;
};
