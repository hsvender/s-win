import json
import codecs
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from collections import Counter

# If not previously performed:
nltk.download('punkt')
nltk.download('stopwords')

# Load your JSON data
with codecs.open('systemutvecklare.json', 'r', encoding='utf-8') as f:
    texts = json.load(f)

# Define stopwords (you can extend this list)
stop_words = set(stopwords.words('english')).union(stopwords.words('swedish'))
stop_words.update(['kommer', 'vill', 'tillsammans', 'team', 'erfarenhet', 'arbeta', 'hos', 'kunder'])

# This will hold all words
all_words = []

# Iterate over all texts
for text in texts:
    # Tokenize the text
    word_tokens = word_tokenize(text.lower())
    # Remove stopwords and punctuation
    filtered_sentence = [w for w in word_tokens if not w in stop_words and w.isalnum()]
    all_words.extend(filtered_sentence)

# Count frequencies
word_frequencies = Counter(all_words)

# Print the 50 most common words
print(word_frequencies.most_common(50))
