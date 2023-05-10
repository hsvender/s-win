import spacy
import json
import codecs

# Load SpaCy model
nlp = spacy.load('sv_core_news_sm')

# Load your JSON data
with codecs.open('systemutvecklare.json', 'r', encoding='utf-8') as f:
    texts = json.load(f)

# Process texts in batches
for i in range(0, len(texts), 100):
    batch = texts[i:i+100]
    docs = list(nlp.pipe(batch))
    
    # Iterate over the docs in the batch
    for doc in docs:
        # Iterate over the entities in each doc
        for ent in doc.ents:
            # Print the entity text and its label
            print(ent.text, ent.label_)
