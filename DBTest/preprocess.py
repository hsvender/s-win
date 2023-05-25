import nltk
from nltk.tokenize import word_tokenize

nltk.download('punkt')

tokenizer = nltk.data.load('nltk:tokenizers/punkt/english.pickle')

job_description = "We are looking for a software engineer with experience in Java and Python programming."
tokens = word_tokenize(job_description)
print(tokens)