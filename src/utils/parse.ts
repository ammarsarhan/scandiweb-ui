// Used to parse the object to string without quotes for passing as a mutation parameter

export default function convertTypeToString(obj: any): string {
  if (Array.isArray(obj)) {
    // Handle array by mapping each item with customStringifyWithoutQuotes
    return `[${obj.map(item => convertTypeToString(item)).join(',')}]`;
  } else if (typeof obj === 'object' && obj !== null) {
    const entries = Object.entries(obj).map(([key, value]) => {
      // Recursively handle nested objects
      const formattedValue = typeof value === 'object' && value !== null
        ? convertTypeToString(value)
        : JSON.stringify(value);

      // Construct the string with key without quotes
      return `${key}:${formattedValue}`;
    });

    // Join all entries with commas and wrap with curly braces
    return `{${entries.join(',')}}`;
  } else {
    // For primitive values, directly convert to string
    return JSON.stringify(obj);
  }
}

export function convertToKebabCase(str: string): string {
  return str
  // Convert to lowercase
  .toLowerCase()
  // Replace spaces and underscores with hyphens
  .replace(/[\s_]+/g, '-')
  // Remove any non-alphanumeric characters except hyphens
  .replace(/[^a-z0-9-]/g, '')
  // Remove leading and trailing hyphens
  .replace(/^-+|-+$/g, '');
}