import { createCipheriv, createDecipheriv, randomBytes, pbkdf2Sync } from 'node:crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;
const KEY_LENGTH = 32;
const ITERATIONS = 100000;

export function encrypt(data: any, key: string): string {
  const iv = randomBytes(IV_LENGTH);
  const salt = randomBytes(SALT_LENGTH);
  
  // Derive key using PBKDF2
  const derivedKey = pbkdf2Sync(
    key,
    salt,
    ITERATIONS,
    KEY_LENGTH,
    'sha256'
  );

  const cipher = createCipheriv(ALGORITHM, derivedKey, iv);
  
  const jsonString = JSON.stringify(data);
  const encrypted = Buffer.concat([
    cipher.update(jsonString, 'utf8'),
    cipher.final()
  ]);

  const tag = cipher.getAuthTag();

  // Combine all components
  const result = Buffer.concat([
    salt,
    iv,
    tag,
    encrypted
  ]);

  return result.toString('base64');
}

export function decrypt(encryptedData: string, key: string): any {
  const buffer = Buffer.from(encryptedData, 'base64');

  // Extract components
  const salt = buffer.subarray(0, SALT_LENGTH);
  const iv = buffer.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
  const tag = buffer.subarray(SALT_LENGTH + IV_LENGTH, SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
  const encrypted = buffer.subarray(SALT_LENGTH + IV_LENGTH + TAG_LENGTH);

  // Derive key using PBKDF2
  const derivedKey = pbkdf2Sync(
    key,
    salt,
    ITERATIONS,
    KEY_LENGTH,
    'sha256'
  );

  const decipher = createDecipheriv(ALGORITHM, derivedKey, iv);
  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final()
  ]);

  return JSON.parse(decrypted.toString('utf8'));
} 