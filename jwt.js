const crypto = require('crypto');

// Generate a 64-byte random key and encode it in hexadecimal
const key = crypto.randomBytes(64).toString('hex');
console.log(key);
