#!/usr/bin/env node
/**
 * Wallet setup script for bread.markets
 * 
 * Generates a new Solana keypair and saves it to the user's .bread directory.
 * Outputs the wallet address and private key for the user to save.
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Base58 alphabet
const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

function base58Encode(buffer) {
  const digits = [0];
  for (let i = 0; i < buffer.length; i++) {
    let carry = buffer[i];
    for (let j = 0; j < digits.length; j++) {
      carry += digits[j] << 8;
      digits[j] = carry % 58;
      carry = (carry / 58) | 0;
    }
    while (carry > 0) {
      digits.push(carry % 58);
      carry = (carry / 58) | 0;
    }
  }
  let str = '';
  for (let i = 0; i < buffer.length && buffer[i] === 0; i++) {
    str += ALPHABET[0];
  }
  for (let i = digits.length - 1; i >= 0; i--) {
    str += ALPHABET[digits[i]];
  }
  return str;
}

// ed25519 key derivation (simplified - uses Node's crypto)
function generateKeypair() {
  // Generate a 32-byte seed
  const seed = crypto.randomBytes(32);
  
  // Use Node's ed25519 to create the keypair
  const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519', {
    privateKeyEncoding: { type: 'pkcs8', format: 'der' },
    publicKeyEncoding: { type: 'spki', format: 'der' }
  });
  
  // Extract the raw keys from DER format
  // ed25519 private key in PKCS8 DER: last 32 bytes are the seed
  // ed25519 public key in SPKI DER: last 32 bytes are the public key
  const rawPrivateKey = privateKey.slice(-32);
  const rawPublicKey = publicKey.slice(-32);
  
  // Solana keypair format: 64 bytes = 32 byte private key + 32 byte public key
  const secretKey = Buffer.concat([rawPrivateKey, rawPublicKey]);
  
  return {
    publicKey: rawPublicKey,
    secretKey: secretKey
  };
}

async function main() {
  const keypairPath = process.env.BREAD_KEYPAIR_PATH || path.join(os.homedir(), '.bread', 'keypair.json');
  const keypairDir = path.dirname(keypairPath);
  
  // Check if wallet already exists
  if (fs.existsSync(keypairPath)) {
    try {
      const existingData = JSON.parse(fs.readFileSync(keypairPath, 'utf-8'));
      const existingSecretKey = Uint8Array.from(existingData);
      const existingPublicKey = existingSecretKey.slice(32);
      const existingAddress = base58Encode(Buffer.from(existingPublicKey));
      
      console.log(`✅ Wallet already exists!`);
      console.log(``);
      console.log(`Address: ${existingAddress}`);
      console.log(`Keypair file: ${keypairPath}`);
      console.log(``);
      console.log(`To view your private key, open the keypair file and decode it.`);
      console.log(`Fund this wallet with SOL (for gas) and USDC (for submission fees).`);
      console.log(`https://solscan.io/account/${existingAddress}`);
      return;
    } catch (e) {
      console.log(`⚠️ Existing keypair file is corrupted. Creating new wallet...`);
    }
  }
  
  // Ensure directory exists
  if (!fs.existsSync(keypairDir)) {
    fs.mkdirSync(keypairDir, { recursive: true });
  }
  
  // Generate new keypair
  const keypair = generateKeypair();
  const address = base58Encode(keypair.publicKey);
  const privateKeyBase58 = base58Encode(keypair.secretKey);
  
  // Save keypair as JSON array (Solana CLI format)
  const secretKeyArray = Array.from(keypair.secretKey);
  fs.writeFileSync(keypairPath, JSON.stringify(secretKeyArray), 'utf-8');
  
  console.log(`✅ New wallet created!`);
  console.log(``);
  console.log(`Address (send SOL & USDC here):`);
  console.log(address);
  console.log(``);
  console.log(`Private Key (SAVE THIS - you need it to recover your wallet):`);
  console.log(privateKeyBase58);
  console.log(``);
  console.log(`Keypair saved to: ${keypairPath}`);
  console.log(``);
  console.log(`Next steps:`);
  console.log(`1. BACKUP your private key immediately!`);
  console.log(`2. Send ~0.01 SOL to the address above (for transaction fees)`);
  console.log(`3. Send some USDC to the address (for submission fees - 0.01 USDC each)`);
  console.log(``);
  console.log(`View on Solscan: https://solscan.io/account/${address}`);
}

main().catch(console.error);
