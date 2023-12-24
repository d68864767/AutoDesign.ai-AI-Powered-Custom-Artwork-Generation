```python
# Importing required libraries
import sys
import requests
import xml.etree.ElementTree as ET

# Function to check if a phrase is trademarked
def check_trademark(phrase):
    # Define the URL for the USPTO API
    url = "http://tmsearch.uspto.gov/bin/gate.exe"

    # Define the parameters for the API request
    params = {
        "f": "toc",
        "state": "4809:1.1.1.1.1.1.1.1",
        "p_search": "search_str",
        "BackReference": "&&d=PTXT",
        "p_L": "50",
        "p_plural": "yes",
        "p_s_ALL": phrase
    }

    # Send a GET request to the USPTO API
    response = requests.get(url, params=params)

    # Parse the XML response
    root = ET.fromstring(response.content)

    # Check if the phrase is trademarked
    for child in root:
        if child.tag == "regnumber":
            return "The phrase is trademarked."

    return "The phrase is not trademarked."

# Get the phrase from command line arguments
phrase = sys.argv[1]

# Check if the phrase is trademarked
result = check_trademark(phrase)

# Print the result
print(result)
```
