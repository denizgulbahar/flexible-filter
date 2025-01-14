// Date Formats
const dateFormats = {
    'YYYY-MM-DD': /^\d{4}-\d{2}-\d{2}$/,
    'DD/MM/YYYY': /^\d{2}\/\d{2}\/\d{4}$/,
    'DD.MM.YYYY': /^\d{2}\.\d{2}\.\d{4}$/,
    'DD-MM-YYYY': /^\d{2}-\d{2}-\d{4}$/
};
  
// Convert date to YYYY-MM-DD format
export default function parseDate(dateString) {
    for (const [format, regex] of Object.entries(dateFormats)) {
        if (regex.test(dateString)) {
        // Date format change to YYYY-MM-DD Format
        return new Date(dateString
            .replace(/(\d{2})[\./-](\d{2})[\./-](\d{4})/, '$3-$2-$1')  
            // DD/MM/YYYY, DD.MM.YYYY ve DD-MM-YYYY
        );
        }
    }
    return null; // Invalid date format
}
  