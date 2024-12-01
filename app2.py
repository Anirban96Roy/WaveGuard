# pip install flask sbnltk pandas scikit-learn
# pip install -U bnlp_toolkit
# pip install fasttext-wheel
# https://github.com/sagorbrur/bnlp/blob/main/docs/README.md#bengali-fasttext

from flask import Flask, request, jsonify
from sbnltk.Ner_bert import Bert_Multilingual_Cased_NER
from bnlp.embedding.fasttext import BengaliFasttext
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

app = Flask(__name__)
ner_model = Bert_Multilingual_Cased_NER()

# Initialize BengaliFasttext and load the model
bft = BengaliFasttext()

# Pre-defined severity words in Bengali and their English translations
severity_keywords = ['স্বাভাবিক', 'ভয়াবহ', 'মারাত্মক']

# Generate vectors for severity keywords using FastText
severity_vectors = {
    word: bft.get_word_vector(word) for word in severity_keywords
}

# Column name translation map
column_translation_map = {
    "স্বাভাবিক": "normal",
    "ভয়াবহ": "moderate",
    "মারাত্মক": "severe"
}

@app.route('/process_posts', methods=['POST'])
def process_posts():
    """Process posts, extract locations and severity counts, and save to Excel."""
    data = request.json
    posts = data.get('posts', [])
    if not posts:
        return jsonify({"error": "No posts provided"}), 400

    # Initialize dictionary to store aggregated counts for each location
    location_data = {}

    for post_idx, post in enumerate(posts, start=1):
        # Perform NER to extract locations
        ner_tags = ner_model.tag([post])[0]
        locations = [word for word, tag in ner_tags if 'LOC' in tag]
        location = locations[0] if locations else "Unknown"

        # Initialize the location's severity counts if not already present
        if location not in location_data:
            location_data[location] = {key: 0 for key in severity_keywords}

        # Tokenize the post and check semantic similarity
        words = post.split()
        for word in words:
            # Get word vector for each word in the post
            word_vector = bft.get_word_vector(word).reshape(1, -1)
            if word_vector is not None:
                for severity, sev_vector in severity_vectors.items():
                    # Compute cosine similarity
                    similarity = cosine_similarity(word_vector, sev_vector.reshape(1, -1))[0][0]
                    if similarity > 0.7:  # Adjust the threshold as needed
                        location_data[location][severity] += 1

    # Create a DataFrame from the location data
    df = pd.DataFrame([{
        "location": loc,
        **counts
    } for loc, counts in location_data.items()])

    # Translate the columns based on the translation map
    df = df.rename(columns=column_translation_map)

    # Save the aggregated results to an Excel file
    output_path = "data.xlsx"
    df.to_excel(output_path, index=False)

    return jsonify({"message": f"Data processed and saved to {output_path}"}), 200

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
