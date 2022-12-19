## The NFT Art Heist

### Quick Links
* [AWS Lambda](https://aws.amazon.com/lambda/)
* [Art Page](https://art-heist.vercel.app/art)

### Premise
A very important NFT was recently corrupted, and we need your help to restore the art! We have these tools handy:
1. The RGB values of each pixel in the art
2. A way to display hex values to restore the art

However, we still don't have a way to efficiently convert RGB values to hex values to restore the NFT. That's where you come in.

### The Task
Your task is to harness the power of AWS Lambda serverless functions to deploy code in the cloud that:
* Receives an RGB value formatted as `r,g,b` through a parameter named `rgb`
> Example: `https://sample-url.com?rgb=255,255,255`
* Returns the equivalent hex value formatted as `ffffff` in a JSON object with `hex` as the key name.
> Example: `{"hex":"ffffff"}`

In the portal, you will be automatically assigned pixel values that your function will restore when it functions correctly.

### Getting Started
1. Make an account on [the workshop website](https://art-heist.vercel.app/)
2. Access your AWS account using the provided credentials.

### Coding in AWS
1. Navigate to AWS Lambda
2. Create a new serverless function
3. Code the function
4. Create an API Gateway
5. Test

### Testing Your Function
To see if your function is able to correctly restore the NFT, navigate to [/test](https://art-heist.vercel.app/test) and submit the function's URL. You will:
1. See feedback about which hex values were correct and which were not.
2. Be able to see your successfully restored pixels on [/art](https://art-heist.vercel.app/art) along with your peers'.

> :bulb: **Tip:** Roll your mouse over filled in pixels to see who did it and the time it was restored!
3. Submit your function again to keep testing it.