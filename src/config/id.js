const fs = require('fs');

// Function to process the text file
function extractIdsFromFile(inputFilePath, outputFilePath) {

  
    // Read the file
    fs.readFile(inputFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        // Split lines and extract IDs
        const lines = data.split('\n');
        const ids = lines
            .map(line => line.trim()) // Remove leading/trailing whitespace
            .filter(line => line) // Skip empty lines
            .map(line => line.split('\t')[0]) // Extract the number before the tab character
            .filter(id => !isNaN(id)) // Ensure it's a valid number
            .map(id => parseInt(id, 10)); // Convert to number type

        // Write the IDs array to the output file
        fs.writeFile(outputFilePath, JSON.stringify(ids, null, 2), err => {
            if (err) {
                console.error('Error writing to the output file:', err);
                return;
            }
            console.log('Successfully written the IDs to', outputFilePath);
        });
    });
}
const inputFilePath = 'input.txt';
const outputFilePath = 'output.json';
// Run the function
extractIdsFromFile(inputFilePath, outputFilePath);