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

> :bulb: **Tip:** Don't worry if you don't know how do work with the input and output of serverless functions! We'll walk through that.

In your portal, you will be automatically assigned pixel values that your function will restore when it functions correctly.

### What the heck is a serverless function?
**Topics to be familiar with:**
* HTTP Requests
* APIs
* "The Cloud"

In short, a serverless function is a way to run code *without worrying about how to host a server*. It allows developers to run small snippets of code meant to be executed over and over again on servers they don't need to manage.

[A deeper dive into what "serverless" is.](https://www.redhat.com/en/topics/cloud-native-apps/what-is-serverless)

### Getting Started
1. Make an account on [the workshop website](https://art-heist.vercel.app/)
2. Access your AWS account using the provided credentials.

### Coding in AWS
<details>
<summary>1. Navigate to AWS Lambda.</summary>
<br>

Go to the [homepage](https://aws.amazon.com/lambda/) of AWS Lambda and click on the orange button named `Get Started with AWS Lambda`.
![image](https://user-images.githubusercontent.com/69332964/208800699-74d3157e-75eb-481d-9f9e-731e3147b10a.png)

</details>

<details>
<summary>2. Create a new serverless function</summary>
<br>

On the dashboard of AWS Lambda, click on the orange button titled `Create function`.
![image](https://user-images.githubusercontent.com/69332964/208800858-4685552b-a3f5-4340-ae3e-e4ae84029864.png)

Leave the default settings as is and name the function whatever you want! (Ideally, it should be something identifiable later.) Press the **Create function** button at the bottom right corner to create the function.

</details>

<details>
<summary>3. Create an API Gateway</summary>
<br>

An [API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) acts as a "doorway" to expose your AWS resources to the public; a way to let information in and direct it out. In our case, it'll act as a way for users to pass in a RGB color value through a parameter.

Navigate to [this page](https://aws.amazon.com/api-gateway/) and click `Get started with Amazon API Gateway`.

Click on `Build` for the `HTTP API` option. 

> **Why are we not using a REST API?** They have more options that make the API more secure, but those are not necessary for this use case.

![image](https://user-images.githubusercontent.com/69332964/208803779-152946ad-8854-481f-9c4e-155dd5cc1dd5.png)

At `Step 1`, select `Lambda` as an integration and find the function you just created in the dropdown. Name your API.
![image](https://user-images.githubusercontent.com/69332964/208804697-95aeb3ca-b3ac-49a0-97a8-d9d5f19b80de.png)

Click `Next` to go to `Step 2` and delete the text in `Resource Path`. Keep clicking `Next` until you get to `Step 4: Review and create`. Then, click `Create`.
![image](https://user-images.githubusercontent.com/69332964/208805376-042d05bc-bbb0-45db-9ca2-7da19a7809dd.png)

Lastly, make sure to keep this URL in handy! We'll be using it to access our Lambda function.
![image](https://user-images.githubusercontent.com/69332964/208805803-f31166dd-b870-4d13-93c4-cdb3b700ce80.png)

</details>

<details>
<summary>4. Code the function</summary>
<br>

Click on the **index.mjs** file in the browser IDE that should have opened once your function was created.

If you closed that tab, navigate back [with this link](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions). 

*This is where the code for your serverless function will be edited and deployed.*
![image](https://user-images.githubusercontent.com/69332964/208801909-3aeceb96-c383-434b-b143-d2a1f1ef9cca.png)

Recall that your function should do three things:
1. Receive a RGB color value as an input from a URL parameter named `rgb`.
2. Convert the RGB color value to its hex equivalent.
3. Return the hex equivalent in a JSON object formatted as `{"hex": "the hex value"}`.

**Starter Code:**
```py
import json

def lambda_handler(event, context):
    # Get the RGB value from the event object (parameter)
    rgb = event["queryStringParameters"]["rgb"]

    # Split the RGB value into separate red, green, and blue values
    split_rgb = rgb.split(',')
    
    # Access each hex value by indexes (make sure to convert to integer!)
    red = # Your code here
    green = # Your code here
    blue = # Your code here

    # Convert the red, green, blue color values to hex representation
    hex_red = # Your code here
    hex_green = # Your code here
    hex_blue = # Your code here
    
    # Concatenate hex values
    hex_value = # Your code here
    
    # Return the hex value
    return { 'hex': hex_value}
```

**1. Parameters**

[URL Parameters](https://www.searchenginejournal.com/technical-seo/url-parameter-handling/#:~:text=What%20Are%20URL%20Parameters%3F,page%20by%20using%20an%20ampersand.) are a simply a way of passing information. They look like this:

```
www.test.com?parameter1=value1&parameter2=value2
```
In our case, we put this line in our code to receive the "rgb" parameter.

```py
rgb = event["queryStringParameters"]["rgb"]
```

**2. Converting Values**

* [What are RGB and hex values and how do they relate to each other?](https://users.cs.utah.edu/~germain/PPS/Topics/color.html)
* [Experimenting with hex and RGB values](https://imagecolorpicker.com/en)

First, keep in mind that the input type of the RGB value is a *string* and that it is formatted like `r,g,b`.

A user would've passed it in the URL like so, where the red, green, and blue values are all 1.
```
www.test.com?rgb=1,1,1
```

The next line of code splits the user's input into a Python List with the separated red, green, and blue values.
```py
split_rgb = rgb.split(',')
# Example value of split_rgb: [1, 1, 1]
```

Using `split_rgb`, assign the red, green, and blue values from the List to their own variables. **Be sure to convert them to integers!**
```py
red = # Your code here
green = # Your code here
blue = # Your code here
```

Format strings in Python can come in handy when you're converting between data values. Using this format string `f'{your_variable:02x}'`, format the `red`, `green`, and `blue` RGB values in hex.
```py
hex_red = # Your code here
hex_green = # Your code here
hex_blue = # Your code here
```

Finally, concatenate the values (now in hex) together in order of red, green, and blue to create a full color hex code.
```py
hex_value = # Your code here
```

**3. Returning a Response**

The last line in the code provided returns your converted `hex_value` with this statement in a dictionary object.
```py
return { 'hex': hex_value}
```
> :question: **Where is this returning to?** If you're confused about where the function is returning its information to, head to the next section to see your lambda function in action.

</details>

<details>
<summary>5. Test</summary>
<br>

Get your URL you obtained from your API Gateway back in **Step 3**.

**Case 1:**
```
https://yoururl.com?rgb=100,100,100
```
**Expected Result:**
```
{"hex":"646464"}
```

**Case 2:**
```
https://yoururl.com?rgb=8,45,240
```
**Expected Result:**
```
{"hex":"082df0"}
```

**Checking your logs!**

Don't know what's erroring out? Click on `Monitor` on the top menu bar.
![image](https://user-images.githubusercontent.com/69332964/208808375-9ee02bcd-c799-4643-8f7d-589430e593c0.png)

Then, click on the most recent `LogStream` to see your function's logs.
![image](https://user-images.githubusercontent.com/69332964/208808591-4b8f5bb4-50e3-4bf6-bb31-66c58014c7e2.png)

</details>

### Help us restore the NFT!
![image](https://user-images.githubusercontent.com/69332964/208809383-bd9eaba2-0e26-4aa5-b39a-624847b74328.png)
To see if your function is able to correctly restore the NFT, navigate to [/test](https://art-heist.vercel.app/test) and submit the function's URL. You will:
1. See feedback about which hex values were correct and which were not.
2. Be able to see your successfully restored pixels on [/art](https://art-heist.vercel.app/art) along with your peers'.
![image](https://user-images.githubusercontent.com/69332964/208809710-9c536dda-479d-473a-92c9-231fe277aaee.png)
> :bulb: **Tip:** Roll your mouse over filled in pixels to see who did it and the time it was restored!
3. Submit your function again to keep testing it.

