# from bnlp.embedding.fasttext import BengaliFasttext
#
# bft = BengaliFasttext()
#
# word = "গ্রাম"
# word_vector = bft.get_word_vector(word)
# print(word_vector)



from bnlp.embedding.fasttext import BengaliFasttext
import numpy as np

# Load Bengali FastText embeddings
bft = BengaliFasttext()

# Words to compare
word1 = "ভয়াবহ"
word2 = "মারাত্মক"

# Get word vectors for both words
vector1 = bft.get_word_vector(word1)
vector2 = bft.get_word_vector(word2)

# Define a function to compute cosine similarity
def cosine_similarity(vec1, vec2):
    # Dot product of the vectors
    dot_product = np.dot(vec1, vec2)
    # Magnitudes of the vectors
    magnitude1 = np.linalg.norm(vec1)
    magnitude2 = np.linalg.norm(vec2)
    # Cosine similarity
    return dot_product / (magnitude1 * magnitude2)

# Calculate the cosine similarity between the two word vectors
similarity = cosine_similarity(vector1, vector2)

# Print the cosine similarity
print(f"Cosine similarity between '{word1}' and '{word2}': {similarity}")
