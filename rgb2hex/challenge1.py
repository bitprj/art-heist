import json

def lambda_handler(event, context):
    # Get the RGB value from the event
    rgb = event["queryStringParameters"]["rgb"]

    # Split the RGB value into separate red, green, and blue values
    r, g, b = rgb.split(',')

    # Convert the new RGB value into a hex value
    hex_value = '{:02x}{:02x}{:02x}'.format(int(r), int(g), int(b))
    print(r, g, b)

    # Return the hex value
    return { 'hex': hex_value }