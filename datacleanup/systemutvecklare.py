import ijson
import json
import codecs

input_filename = "2022.json"
output_filename = "sys_prog2022.json"

def save_texts(input_filename, output_filename):
    with open(input_filename, 'r') as f_input, codecs.open(output_filename, 'w', encoding='utf-8') as f_output:
        # Create a generator for all items in the file
        items = ijson.items(f_input, 'item')
        
        # List to store the description texts
        texts = []

        # Iterate over the items
        for item in items:
            # Check if the 'label' in 'occupation' is 'systemutvecklare'
            if item.get('occupation', {}).get('label', '').lower() == 'systemutvecklare/programmerare':
                # If so, get the 'text' in 'description' and append it to the list
                text = item.get('description', {}).get('text', None)
                if text is not None:
                    texts.append(text)
                    print(f"Found a 'systemutvecklare' entry, added its description to the list. Current count: {len(texts)}")

        # Write the texts to the output file as JSON
        json.dump(texts, f_output, ensure_ascii=False)

save_texts(input_filename, output_filename)
print('done!')
