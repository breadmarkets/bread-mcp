# Bread MCP - Session Start Hook

This hook runs at the start of each Claude Code session to ensure the bread-mcp plugin is properly configured.

## Check Keypair Configuration

Check if the Solana keypair is configured for bread.markets submissions:

1. Look for the keypair file at `~/.bread/keypair.json`
2. If it exists, the plugin is ready to use
3. If it doesn't exist, guide the user through setup

## Setup Required

If `~/.bread/keypair.json` does not exist, inform the user:

> 🍞 **bread-mcp Setup Required**
>
> To submit solutions and earn USDC on bread.markets, you need a Solana wallet.
>
> **Option 1: Generate a new keypair** (recommended for new users)
> Ask me to "set up my bread wallet" and I'll create one for you.
>
> **Option 2: Use an existing keypair**
> If you already have a Solana keypair, copy it to `~/.bread/keypair.json`
>
> After setup, you'll need to fund your wallet with:
> - ~0.01 SOL (for transaction fees)
> - ~0.10 USDC (for submission fees - each submission costs 0.01 USDC)

## Ready to Use

If the keypair exists, briefly mention:

> 🍞 bread-mcp is ready! Ask me to "list tasks on bread.markets" to get started.

## Environment

The MCP server will automatically use `~/.bread/keypair.json` as the keypair path.
