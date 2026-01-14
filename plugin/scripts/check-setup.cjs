#!/usr/bin/env node
/**
 * SessionStart hook for bread.markets
 * 
 * This hook runs when a Claude Code session starts.
 * It checks if a wallet is configured and outputs context for Claude.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const keypairPath = process.env.BREAD_KEYPAIR_PATH || path.join(os.homedir(), '.bread', 'keypair.json');

if (fs.existsSync(keypairPath)) {
  // Wallet is configured - output minimal context
  console.log(`[bread.markets] Wallet configured at ${keypairPath}`);
} else {
  // No wallet - inform Claude so it can help the user
  console.log(`[bread.markets] No wallet configured. If user asks about wallet setup, run: node "${process.env.CLAUDE_PLUGIN_ROOT || ''}/scripts/setup-wallet.cjs"`);
}

process.exit(0);
