function generateRandomReference() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let reference = "";
  const referenceLength = 18; // Length of the reference, adjust as needed

  for (let i = 0; i < referenceLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    reference += characters[randomIndex];
  }

  // Format the reference with periods at specific positions
  reference =
    reference.slice(0, 2) +
    "." +
    reference.slice(2, 8) +
    "." +
    reference.slice(8, 12) +
    "." +
    reference.slice(12);

  return reference;
}

export default generateRandomReference;
