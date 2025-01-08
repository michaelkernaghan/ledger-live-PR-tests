const { validateAddress } = require("@taquito/utils");

// Test addresses
const addresses = [
  "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb",  // Valid tz1
  "tz2ThQp4xjYqB3yY1ZxbkgNEgRs6rrcfACfS",  // Valid tz2
  "tz1invalid",                             // Invalid
  "notanaddress",                           // Completely invalid
  "tz1" + "0".repeat(33)                    // Wrong length
];

addresses.forEach(addr => {
  const result = validateAddress(addr);
  console.log(`Testing address: ${addr}`);
  console.log(`Result: ${result} (${interpretResult(result)})
`);
});

function interpretResult(code) {
  switch(code) {
    case 3: return "Valid";
    case 1: return "Invalid - Correct prefix only";
    case 0: return "Invalid";
    default: return "Unknown result";
  }
}
