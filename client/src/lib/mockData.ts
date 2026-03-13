import type { Epoch, Bid, SentinelEvent, VaultSnapshot } from "@shared/schema";

const now = Date.now();
const day = 86400000;

export const mockEpochs: Epoch[] = [
  {
    id: 3, epochNumber: 3, tokenId: 3, title: "Recursive Horizon",
    description: "Generative orbits collapse inward, forming new attractors.",
    artworkUrl: null, generatedAt: new Date(now - 3 * day),
    auctionStartTime: new Date(now - 2 * day),
    auctionEndTime: new Date(now + 5 * day),
    finalPrice: null, winnerId: null, vaultBalance: "12.4",
    status: "active", createdAt: new Date(now - 3 * day),
  },
  {
    id: 2, epochNumber: 2, tokenId: 2, title: "Fractal Convergence",
    description: "Self-similar patterns emerge from chaos theory applied to light.",
    artworkUrl: null, generatedAt: new Date(now - 10 * day),
    auctionStartTime: new Date(now - 9 * day),
    auctionEndTime: new Date(now - 2 * day),
    finalPrice: "3.2", winnerId: "0x742d35Cc6634C0532925a3b8D4C9D4b1Afe8b523",
    vaultBalance: "9.6", status: "settled", createdAt: new Date(now - 10 * day),
  },
  {
    id: 1, epochNumber: 1, tokenId: 1, title: "Genesis Spiral",
    description: "The first perpetual — born from pure mathematical recursion.",
    artworkUrl: null, generatedAt: new Date(now - 20 * day),
    auctionStartTime: new Date(now - 19 * day),
    auctionEndTime: new Date(now - 12 * day),
    finalPrice: "2.1", winnerId: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    vaultBalance: "6.3", status: "settled", createdAt: new Date(now - 20 * day),
  },
];

export const mockBids: Bid[] = [
  { id: 1, epochId: 3, bidder: "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE", amount: "1.8", txHash: "0xabc123", bidTime: new Date(now - 1 * day), isWinning: true },
  { id: 2, epochId: 3, bidder: "0x742d35Cc6634C0532925a3b8D4C9D4b1Afe8b523", amount: "1.5", txHash: "0xdef456", bidTime: new Date(now - 1.5 * day), isWinning: false },
  { id: 3, epochId: 3, bidder: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b", amount: "1.2", txHash: "0xghi789", bidTime: new Date(now - 2 * day), isWinning: false },
];

export const mockSentinelEvents: SentinelEvent[] = [
  { id: 1, epochId: 3, eventType: "analysis", description: "Engagement pattern analysis complete — 94% authentic signals", score: "94", metadata: null, detectedAt: new Date(now - 2 * 60 * 60 * 1000) },
  { id: 2, epochId: 3, eventType: "flag", description: "Suspicious bid cluster detected from similar IP ranges", score: "45", metadata: null, detectedAt: new Date(now - 4 * 60 * 60 * 1000) },
  { id: 3, epochId: 3, eventType: "analysis", description: "Social signal quality: high sentiment authenticity", score: "87", metadata: null, detectedAt: new Date(now - 6 * 60 * 60 * 1000) },
];

export const mockVaultSnapshots: VaultSnapshot[] = [
  { id: 1, epochId: 3, totalValueLocked: "12.4", yieldEarned: "0.6", apy: "8.5", bankrStrategyId: "bankr-eth-001", snapshotAt: new Date(now - 1 * day) },
  { id: 2, epochId: 2, totalValueLocked: "9.6", yieldEarned: "0.4", apy: "7.8", bankrStrategyId: "bankr-eth-001", snapshotAt: new Date(now - 8 * day) },
];

export const mockData = {
  epoch: {
    number: 3,
    title: "Recursive Horizon",
    description: "Generative orbits collapse inward, forming new attractors.",
    totalRaised: "5.3",
    vaultBalance: "12.4",
  },
  auction: {
    currentBid: "1.8",
    currentBidder: "0x3f5CE5...f0bE",
    startTime: new Date(now - 2 * day).toISOString(),
    endTime: new Date(now + 5 * day).toISOString(),
    bids: [
      { bidder: "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE", amount: "1.8", time: "2h ago" },
      { bidder: "0x742d35Cc6634C0532925a3b8D4C9D4b1Afe8b523", amount: "1.5", time: "5h ago" },
      { bidder: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b", amount: "1.2", time: "1d ago" },
    ],
  },
  vault: {
    totalValueLocked: "12.4 ETH",
    tvlGrowth: "12.5",
    apy: "8.5",
    totalYieldEarned: "1.0 ETH",
    allocation: [
      { protocol: "Bankr ETH Yield", percentage: 60, amount: "7.44 ETH" },
      { protocol: "Bankr Stable Yield", percentage: 30, amount: "3.72 ETH" },
      { protocol: "Reserve", percentage: 10, amount: "1.24 ETH" },
    ],
    transactions: [
      { type: "deposit", description: "Epoch 3 auction proceeds", amount: "+2.8 ETH", date: "2d ago" },
      { type: "yield", description: "Monthly yield distribution", amount: "+0.3 ETH", date: "5d ago" },
      { type: "deposit", description: "Epoch 2 auction proceeds", amount: "+3.2 ETH", date: "10d ago" },
    ],
  },
  sentinel: {
    authenticityScore: 94,
    signalsAnalyzed: 1247,
    flaggedSignals: 23,
    categories: [
      { name: "Bid Authenticity", score: 96 },
      { name: "Social Engagement", score: 87 },
      { name: "Collector Reputation", score: 91 },
      { name: "Market Manipulation", score: 98 },
    ],
    recentAnalysis: [
      { description: "Engagement pattern analysis complete", status: "authentic", time: "2h ago" },
      { description: "Suspicious bid cluster detected", status: "suspicious", time: "4h ago" },
      { description: "Social signal quality assessment", status: "authentic", time: "6h ago" },
    ],
  },
  collection: {
    items: [
      { id: 3, title: "Recursive Horizon", description: "Generative orbits collapse inward.", currentBid: "1.8", status: "current" },
      { id: 2, title: "Fractal Convergence", description: "Self-similar patterns from chaos theory.", finalBid: "3.2", status: "sold" },
      { id: 1, title: "Genesis Spiral", description: "Born from pure mathematical recursion.", finalBid: "2.1", status: "sold" },
    ],
  },
};
