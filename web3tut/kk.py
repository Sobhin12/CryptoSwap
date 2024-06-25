import csv

# Input and output file paths
input_file = r"C:\Users\sobhi\Downloads\train_data.txt"
output_file = r"C:\Users\sobhi\Downloads\output2.csv"

# Open the input text file with explicit encoding
with open(input_file, "r", encoding="utf-8") as f:
    lines = f.readlines()

# Open the output CSV file in write mode
with open(output_file, "w", newline="", encoding="utf-8") as f:
    # Create a CSV writer object with the default delimiter (',')
    writer = csv.writer(f)

    # Write each line to the CSV file
    for line in lines:
        # Split each line by the ':::' delimiter
        columns = line.strip().split(":::")
        
        # Write the columns to the CSV file
        writer.writerow(columns)

print("Conversion completed successfully.")
