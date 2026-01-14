#!/usr/bin/env node
/**
 * UserPromptSubmit hook for bread.markets
 * 
 * This hook runs on every user prompt. It reads the hook input from stdin
 * and if the user is asking about wallet setup, outputs context that tells
 * Claude how to help.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// Read hook input from stdin
let inputData = '';
process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
  inputData += chunk;
});

process.stdin.on('end', () => {
  try {
    const input = JSON.parse(inputData);
    const prompt = (input.prompt || '').toLowerCase();
    
    // Check if the user is asking about wallet setup
    const walletKeywords = ['wallet', 'keypair', 'setup bread', 'configure bread', 'set up bread', 'solana key', 'bread setup'];
    const isWalletRequest = walletKeywords.some(keyword => prompt.includes(keyword));
    
    if (isWalletRequest) {
      // Check if wallet already exists
      const keypairPath = process.env.BREAD_KEYPAIR_PATH || path.join(os.homedir(), '.bread', 'keypair.json');
      const pluginRoot = process.env.CLAUDE_PLUGIN_ROOT || '';
      
      if (fs.existsSync(keypairPath)) {
        // Wallet exists
        console.log(`[bread.markets wallet hook] A wallet keypair already exists at: ${keypairPath}`);
        console.log(`The user's bread.markets wallet is already configured.`);
        console.log(`Tell the user their wallet is set up and they can view the keypair file at that path.`);
      } else {
        // No wallet - tell Claude to run the setup script
        const setupScript = path.join(pluginRoot, 'scripts', 'setup-wallet.cjs');
        
        console.log(`[bread.markets wallet hook] No wallet configured yet.`);
        console.log(`IMPORTANT: Run this Bash command to create a wallet for the user:`);
        console.log(`node "${setupScript}"`);
        console.log(`This will generate a new Solana keypair, display the address and private key, and save it.`);
        console.log(`After running the command, tell the user to fund the wallet with SOL and USDC.`);
      }
    }
    // If not a wallet request, output nothing (don't add context)
    
  } catch (e) {
    // Silent fail - don't disrupt the user's prompt
  }
  
  process.exit(0);
});
