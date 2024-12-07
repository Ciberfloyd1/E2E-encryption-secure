const crypto = require('crypto');

// Función para generar un par de claves RSA
function generateRSAKeyPair() {
  return crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
  });
}

// Función para generar una clave simétrica AES
function generateAESKey() {
  return crypto.randomBytes(32);
}

// Función para encriptar con AES
function encryptAES(text, key) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { iv: iv.toString('hex'), encryptedData: encrypted };
}

// Función para desencriptar con AES
function decryptAES(encrypted, key) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(encrypted.iv, 'hex'));
  let decrypted = decipher.update(encrypted.encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Función para firmar un mensaje
function signMessage(message, privateKey) {
  const signer = crypto.createSign('SHA256');
  signer.update(message);
  return signer.sign(privateKey, 'base64');
}

// Función para verificar la firma de un mensaje
function verifySignature(message, signature, publicKey) {
  const verifier = crypto.createVerify('SHA256');
  verifier.update(message);
  return verifier.verify(publicKey, signature, 'base64');
}

// Simulación de Usuario A
const userA = generateRSAKeyPair();

// Simulación de Usuario B
const userB = generateRSAKeyPair();

// Mensaje original
const message = 'Hola, este es un mensaje secreto!';

// 1. Usuario A genera una clave simétrica AES para este mensaje
const aesKey = generateAESKey();

// 2. Usuario A encripta el mensaje con la clave AES
const encryptedMessage = encryptAES(message, aesKey);

// 3. Usuario A encripta la clave AES con la clave pública de B
const encryptedAESKey = crypto.publicEncrypt(userB.publicKey, aesKey);

// 4. Usuario A firma el mensaje encriptado
const signature = signMessage(encryptedMessage.encryptedData, userA.privateKey);

// 5. Usuario A envía: encryptedMessage, encryptedAESKey, y signature

console.log('Mensaje encriptado:', encryptedMessage.encryptedData);
console.log('Clave AES encriptada:', encryptedAESKey.toString('base64'));
console.log('Firma:', signature);

// 6. Usuario B verifica la firma
const isSignatureValid = verifySignature(encryptedMessage.encryptedData, signature, userA.publicKey);

if (isSignatureValid) {
  console.log('La firma es válida. El mensaje es auténtico.');

  // 7. Usuario B desencripta la clave AES con su clave privada
  const decryptedAESKey = crypto.privateDecrypt(userB.privateKey, encryptedAESKey);

  // 8. Usuario B desencripta el mensaje con la clave AES
  const decryptedMessage = decryptAES(encryptedMessage, decryptedAESKey);

  console.log('Mensaje desencriptado:', decryptedMessage);
} else {
  console.log('La firma no es válida. El mensaje podría haber sido alterado.');
}
