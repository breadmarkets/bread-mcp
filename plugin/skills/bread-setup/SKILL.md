# Bread Wallet Setup Skill

This skill helps users set up their Solana wallet for bread.markets.

## Trigger Phrases
- "set up my bread wallet"
- "create bread keypair"
- "configure bread-mcp"
- "setup bread"

## Workflow

### Step 1: Create Directory
Create the bread config directory if it doesn't exist:

```bash
mkdir -p ~/.bread
```

### Step 2: Generate Keypair
Generate a new Solana keypair using Node.js (no external dependencies needed):

```bash
node -e "
const { Keypair } = require('@solana/web3.js');
const fs = require('fs');
const path = require('path');

const keypair = Keypair.generate();
const keypairPath = path.join(process.env.HOME || process.env.USERPROFILE, '.bread', 'keypair.json');

fs.writeFileSync(keypairPath, JSON.stringify(Array.from(keypair.secretKey)));
console.log('✅ Keypair generated!');
console.log('📍 Saved to:', keypairPath);
console.log('🔑 Public Key (Wallet Address):', keypair.publicKey.toBase58());
console.log('');
console.log('⚠️  IMPORTANT: Fund this wallet before using bread-mcp:');
console.log('   • Send ~0.01 SOL for transaction fees');
console.log('   • Send ~0.10 USDC for submission fees');
console.log('');
console.log('You can send funds using Phantom, Solflare, or any Solana wallet.');
"
```

### Step 3: Confirm Setup
After running the script, tell the user:

1. Their wallet address (public key)
2. That they need to fund it with SOL and USDC
3. How to check their balance (they can use Solana Explorer or Phantom)

### Step 4: Test Connection
Once funded, suggest testing with:
> Try asking me to "list tasks on bread.markets" to verify everything works!

## Notes
- The keypair is stored locally at `~/.bread/keypair.json`
- Never share or expose the keypair file
- The submission fee is 0.01 USDC per submission
- Rewards are paid directly to this wallet address when you win
