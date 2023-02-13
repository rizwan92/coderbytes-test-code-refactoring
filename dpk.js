const crypto = require("crypto");

/**
 * 
 * @param {*} event 
 * @returns string 
 * I have refactored the code to make it cleaner, more concise, and easier to understand.
 * have combined multiple if conditions into a single line, reduced the number of variables, and made the code more readable.
 * I have also added a default value to the event parameter to handle the case where it is not passed to the function.
 * Additionally, I have added a regular expression pattern to the test cases to check the format of the hashed string, making the tests more robust.
 * The new code is more readable because it is more concise, eliminates redundant code, and makes the logic more straightforward.
 */

exports.deterministicPartitionKey = (event = {}) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = event.partitionKey || JSON.stringify(event);

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto
      .createHash("sha3-512")
      .update(candidate)
      .digest("hex");
  }
  return candidate || TRIVIAL_PARTITION_KEY;
};