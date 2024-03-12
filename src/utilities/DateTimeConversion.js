const convertToHumanReadable = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust locale and options as needed
  };

export {
    convertToHumanReadable
}