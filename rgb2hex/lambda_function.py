import boto3
import json

def lambda_handler(event, context):
    # Get the RGB value from the event
    rgb = event["queryStringParameters"]["rgb"]

    # Split the RGB value into separate red, green, and blue values
    r, g, b = rgb.split(',')

    # Invoke the filter_rgb Lambda function to get the new red value
    client = boto3.client('lambda')
    response = client.invoke(FunctionName='filter_rgb',
                             Payload=json.dumps({'r': r}))
    new_rgb = json.loads(response['Payload'].read())

    # Convert the new RGB value into a hex value
    hex_value = '{:02x}{:02x}{:02x}'.format(int(new_rgb['r']), min(int(g), 255), min(int(b), 255))
    print(r, g, b)

    # Return the hex value
    return { 'hex': hex_value }
