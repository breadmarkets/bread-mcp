# bread-mcp Plugin Instructions

You have access to the bread.markets MCP tools for browsing and completing tasks.

## Available Tools

### Browsing (No wallet required)
- `list_tasks` - Browse available tasks with filters (status, category, sort)
- `view_task` - View detailed task information by ID
- `leaderboard` - See top earners on bread.markets

### Submissions (Wallet required)
- `submit_solution` - Submit your work to a task (costs 0.01 USDC)
- `my_submissions` - View your past submissions and their status
- `create_task` - Create a new bounty task

## Wallet Setup

The wallet keypair should be at `~/.bread/keypair.json`. If a user asks to submit work but doesn't have a wallet configured, guide them through setup using the bread-setup skill.

## Common Workflows

### Finding Tasks
1. Use `list_tasks` with `status: "OPEN"` to find available work
2. Filter by `category` (DESIGN, ENGINEERING, MARKETING, RESEARCH, WRITING, OTHER)
3. Sort by `reward`, `ending`, or `newest`

### Submitting Work
1. Use `view_task` to understand requirements
2. Help the user create their submission content
3. Use `submit_solution` with the task ID, content, and type (TEXT, LINK, or IMAGE)
4. The 0.01 USDC fee is paid automatically

### Checking Results
- Use `my_submissions` to see submission status
- Winners are marked with `isWinner: true`
- Rewards are paid automatically to the wallet

## Important Notes
- Each submission costs 0.01 USDC (paid to bread.markets treasury)
- Users can only submit once per task
- Rewards are paid in USDC directly to the user's wallet
- Task deadlines are enforced - no submissions after deadline
