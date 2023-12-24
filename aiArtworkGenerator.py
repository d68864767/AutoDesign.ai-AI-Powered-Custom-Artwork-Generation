```python
# Importing required libraries
import sys
import os
import numpy as np
from PIL import Image
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.models import load_model

# Load the trained model
model = load_model('path_to_your_trained_model.h5')

# Function to generate artwork from text prompt
def generate_artwork(text_prompt):
    # Tokenize the text prompt
    tokenizer = Tokenizer(num_words=5000, oov_token="UNKNOWN_TOKEN")
    tokenizer.fit_on_texts([text_prompt])
    sequences = tokenizer.texts_to_sequences([text_prompt])
    text_prompt_padded = pad_sequences(sequences, maxlen=100)

    # Generate artwork using the model
    generated_artwork = model.predict(text_prompt_padded)

    # Convert the generated artwork to an image
    generated_artwork = np.squeeze(generated_artwork, axis=0)
    generated_artwork *= 255
    generated_artwork = generated_artwork.astype(np.uint8)
    image = Image.fromarray(generated_artwork)

    # Save the image
    image.save('generated_artwork.png')

    return 'Artwork generated successfully!'

# Get the text prompt from command line arguments
text_prompt = sys.argv[1]

# Generate artwork from text prompt
result = generate_artwork(text_prompt)

# Print the result
print(result)
```
