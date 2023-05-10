import ijson

filename = "2023.json"

def get_occupations(filename):
    with open(filename, 'r') as f:
        objects = ijson.items(f, 'item.occupation.label')
        occupations = []
        for i, occupation in enumerate(objects):
            if i >= 100:
                break
            occupations.append(occupation)
        return occupations

occupations = get_occupations(filename)
for occupation in occupations:
    print(occupation)
