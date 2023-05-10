from collections import Counter
import json
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import os

# Define your competencies
software_competencies = ['python', 'java', 'c++', 'javascript', 'sql', 'html', 'css', 'ruby', 'perl', 'php', 'swift', 'bash', 'r', 
                'matlab', 'typescript', 'go', 'rust', 'kotlin', 'scala', 'shell', 'c#', 'aws', 'azure', 'gcp', 
                'docker', 'kubernetes', 'linux', 'git', 'agile', 'scrum', 'devops']

softskills_competencies = ['anpassningsförmåga', 'kommunikation', 'tidsplanering', 'kritiskt tänkanke', 'ledarskap', 'förhandlingsförmåga',
                           'beslutsfattande', 'nätverkande']

# Define stopwords
stop_words = set(stopwords.words('english')) 

# Initialize a Counter object
competency_count = Counter()

# Directory containing your JSON files
directory = r"C:/Users/nords/S-Win_Consulting/s-win/textfiles"

# Go through each JSON file in the directory
for filename in os.listdir(directory):
    if filename.endswith(".json"):
        with open(os.path.join(directory, filename), 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        # Go through each job posting in this file
        for job_posting in data:
            # Tokenize and clean text
            words = word_tokenize(job_posting.lower())
            words = [word for word in words if word not in stop_words and word.isalnum()]
            
            # Count competencies
            for word in words:
                if word in softskills_competencies:
                    competency_count[word] += 1

# Print the 10 most common competencies
print(competency_count.most_common(10))
