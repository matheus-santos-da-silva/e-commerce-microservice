import * as crypto from 'node:crypto';

const generateProductCode = () => {
  const randomBytes = crypto.randomBytes(6); 
  const codeProduct = randomBytes.readUInt32BE(0);
  return String(codeProduct);
};

export { generateProductCode };