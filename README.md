# Perpetuals

**A self-perpetuating autonomous art project.**

Perpetuals is an autonomous system that creates, auctions, and reinvests in generative art — perpetually. Built on [Rare Protocol](https://rare.xyz) and [Bankr](https://bankr.fi).

## Architecture

- **Perpetual.sol** — ERC-721 contract for minting generative art epochs
- **SuperRareBazaar** — Auction settlement via Rare Protocol marketplace
- **BankerVault** — Treasury management through Bankr yield strategies
- **Sentinel** — AI agent that scores engagement authenticity (sycophancy-resistant)

## Stack

- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Express backend
- Drizzle ORM

## Development

```bash
npm install
npm run dev
```

## Links

- **Live**: [perpetuals.art](https://perpetuals.art)
- **Rare Protocol**: [rare.xyz](https://rare.xyz)
- **Bankr**: [bankr.fi](https://bankr.fi)

## License

MIT
