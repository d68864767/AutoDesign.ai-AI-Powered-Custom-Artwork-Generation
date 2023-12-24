```python
# Importing required libraries
import sys
import os
from PIL import Image

# Function to standardize the design format
def standardize_format(artwork_path, output_path, output_size=(4500, 5400), dpi=300):
    # Load the final artwork
    artwork = Image.open(artwork_path)

    # Resize the artwork to the desired output size
    artwork = artwork.resize(output_size)

    # Save the artwork in the desired format (PNG) and DPI
    artwork.save(output_path, 'PNG', dpi=(dpi, dpi))

    return 'Design format standardization completed successfully!'

# Get the artwork path, output path, output size, and DPI from command line arguments
artwork_path = sys.argv[1]
output_path = sys.argv[2]
output_size = eval(sys.argv[3])  # Convert string to tuple
dpi = int(sys.argv[4])

# Standardize the design format
result = standardize_format(artwork_path, output_path, output_size, dpi)

# Print the result
print(result)
```
