export const handler = async (event) => {
  // TODO implement

  const rgb = event["queryStringParameters"]["rgb"].split(",");
  console.log(rgb)

  const hex = rgbToHex(parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2]));

  const response = {
    statusCode: 200,
    body: JSON.stringify({ "hex": hex }),
  };
  return response;
};

function valueToHex(c) {
  var hex = c.toString(16);
  return hex
}

function rgbToHex(r, g, b) {
  return (valueToHex(r) + valueToHex(g) + valueToHex(b));
}