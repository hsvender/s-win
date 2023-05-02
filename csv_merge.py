
import pandas as pd

file1 = "/Users/lisamaneskold/Downloads/2021.csv"
file2 = "/Users/lisamaneskold/Downloads/2022.csv"

print("Merging multiple CSV files...")

# merge
dataFrame = pd.concat(
   map(pd.read_csv, [file1, file2]), ignore_index=True)
print(dataFrame)