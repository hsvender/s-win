import json
  
# Opening JSON file
f = open('2007.json')
  
# returns JSON object as 
# a dictionary
data = json.load(f)
  
# Iterating through the json
# list
for i in data['workplace']:
    print(i)

# Closing file
f.close()