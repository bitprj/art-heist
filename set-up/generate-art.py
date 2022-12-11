# To run, python3 generate-art.py [number of participants]

import psycopg2
import sys, math
from PIL import Image

# Connect to DB
HOST = ""
DBNAME = ""
USER = ""
PASS = ""

# Open the image file
with Image.open("image.jpg") as image:
  participants = int(sys.argv[1])

  # Get the original width and height of the image
  original_width, original_height = image.size

  # Calculate the number of original pixels
  original_pixels = original_width * original_height

  # Calculate the scaling factor
  scaling_factor = (participants / original_pixels) ** 0.5
  width = int(math.ceil(original_width * scaling_factor))
  height = int(math.ceil(original_height * scaling_factor))
  print(width, height)
  
  # Resize the image to a smaller size
  image.resize((width, height))

  # Convert the image to RGB format
  image.type = "truecolor"

  # Connect to the database
  conn = psycopg2.connect(f"host={HOST} dbname={DBNAME} user={USER} password={PASS}")

  # Open a cursor to perform database operations
  cur = conn.cursor()

  # Create the table to store the pixel data
  cur.execute("DROP TABLE art_pixels")
  cur.execute("CREATE TABLE art_pixels (location INTEGER, rgb_value VARCHAR(255), hex_value VARCHAR(255), username VARCHAR(255))")

  # Loop through the image pixels and store their RGB values in the database
  count = 0
  for x in range(width):
    for y in range(height):
      count += 1
      r, g, b = image.getpixel((x, y))
      rgb_value = str(r) + "," + str(g) + "," + str(b)
      print(rgb_value, count)
      cur.execute("INSERT INTO art_pixels (location, rgb_value) VALUES (%s, %s)", (count, rgb_value))

  # Save the changes to the database
  conn.commit()

  # Close the cursor and connection
  cur.close()
  conn.close()