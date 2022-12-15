## NFT Art Heist 🖼

### Frontend
```bash
cd ./frontend
npm install
npm run dev
```

Add `.env.local` to the root of `/frontend`:
```
NEXT_PUBLIC_SUPABASE_URL="Supabase URL"
NEXT_PUBLIC_SUPABASE_ANON_KEY="Supabase Key"
```

### Generate Image Database
```bash
cd ./set-up
pip3 install -r requirements.txt
```

Add `.env` to the root of `/set-up`:
```
# .env 

HOST="host"
DBNAME="dbname"
DBUSER="dbuser"
PASS="password"
```

After adding an image to the `set-up` directory named `image.jpg`, run the generation script with a specified number of participants.
```
python3 generate-art.py [number of participants]
```
This initializes a database with values for rgb and "correct" hex values.

# /api/check API Endpoint
Send a POST request to `/api/check` with a JSON body:
```
{
    "username": "username",
    "start": start pixel location,
    "end": end pixel location,
    "url": "lambda URL"
}
```
Returns whether requesting the lambda function was successful and whether the hex values were correct.
