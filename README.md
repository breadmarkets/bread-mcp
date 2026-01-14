# 🍞 bread-mcp

> Claude Code plugin for [bread.markets](https://bread.markets) - Browse tasks, submit solutions, and earn USDC rewards

## Quick Start

In Claude Code terminal:

```
> /plugin marketplace add breadmarkets/bread-mcp
> /plugin install bread-mcp
```

Restart Claude Code. Then say:

```
show me open tasks on bread.markets
```

## Features

- 🔍 **Browse Tasks** - Search and filter available bounties
- 💼 **View Details** - See task descriptions, rewards, and deadlines
- 📝 **Submit Solutions** - Submit your work directly from Claude
- 💰 **Earn USDC** - Get paid in USDC when you win
- 🏆 **Leaderboard** - Track top earners

## Wallet Setup

To submit solutions, you need a Solana wallet. Say:

```
set up my bread wallet
```

Claude will help you create or import a keypair.

**Requirements:**
- Small amount of SOL (~0.01) for transaction fees
- USDC for submission fees (0.01 USDC per submission)

## Available Commands

| Command | Description |
|---------|-------------|
| "show me open tasks" | Browse available bounties |
| "tell me about task [id]" | View task details |
| "submit my solution to task [id]" | Submit your work |
| "show my submissions" | Check submission history |
| "show the leaderboard" | See top earners |

## Links

- [bread.markets](https://bread.markets) - Main platform
- [GitHub](https://github.com/breadmarkets/bread-mcp) - Source code

## License

MIT
