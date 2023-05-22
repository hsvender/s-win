import csv

with open('2022.csv', 'r') as csv_file:
    reader = csv.reader(csv_file)

    for row in reader:
        print(row)
