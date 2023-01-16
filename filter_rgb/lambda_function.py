def lambda_handler(event, context):
    # TODO implement
    return {
        'statusCode': 200,
        'r': min(255, int(event['r']) * 5)
    }
