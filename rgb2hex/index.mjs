// Set up API Gateway

export const handler = async(event) => {
    // TODO implement
    
    const rgb = event["queryStringParameters"]["rgb"];
    console.log(rgb)
    
    const hex = rgbToHex(parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2]));

    const response = {
        statusCode: 200,
        body: JSON.stringify({"hex": hex}),
    };
    return response;
};

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return componentToHex(r) + componentToHex(g) + componentToHex(b);
}