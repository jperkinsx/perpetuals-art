import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Epochs represent each auction cycle
export const epochs = pgTable("epochs", {
  id: serial("id").primaryKey(),
  epochNumber: integer("epoch_number").notNull().unique(),
  tokenId: integer("token_id"),
  title: text("title").notNull(),
  description: text("description"),
  artworkUrl: text("artwork_url"),
  generatedAt: timestamp("generated_at").defaultNow(),
  auctionStartTime: timestamp("auction_start_time"),
  auctionEndTime: timestamp("auction_end_time"),
  finalPrice: text("final_price"),
  winnerId: text("winner_id"),
  vaultBalance: text("vault_balance").default("0"),
  status: text("status").default("pending"), // pending, active, settling, settled
  createdAt: timestamp("created_at").defaultNow(),
});

// Bids placed during auctions
export const bids = pgTable("bids", {
  id: serial("id").primaryKey(),
  epochId: integer("epoch_id").references(() => epochs.id),
  bidder: text("bidder").notNull(),
  amount: text("amount").notNull(),
  txHash: text("tx_hash"),
  bidTime: timestamp("bid_time").defaultNow(),
  isWinning: boolean("is_winning").default(false),
});

// Sentinel AI events
export const sentinelEvents = pgTable("sentinel_events", {
  id: serial("id").primaryKey(),
  epochId: integer("epoch_id").references(() => epochs.id),
  eventType: text("event_type").notNull(), // analysis, flag, approve, reject
  description: text("description"),
  score: text("score"),
  metadata: text("metadata"),
  detectedAt: timestamp("detected_at").defaultNow(),
});

// Vault snapshots
export const vaultSnapshots = pgTable("vault_snapshots", {
  id: serial("id").primaryKey(),
  epochId: integer("epoch_id").references(() => epochs.id),
  totalValueLocked: text("total_value_locked"),
  yieldEarned: text("yield_earned"),
  apy: text("apy"),
  bankrStrategyId: text("bankr_strategy_id"),
  snapshotAt: timestamp("snapshot_at").defaultNow(),
});

export const insertEpochSchema = createInsertSchema(epochs);
export const insertBidSchema = createInsertSchema(bids);
export const insertSentinelEventSchema = createInsertSchema(sentinelEvents);
export const insertVaultSnapshotSchema = createInsertSchema(vaultSnapshots);

export type Epoch = typeof epochs.$inferSelect;
export type Bid = typeof bids.$inferSelect;
export type SentinelEvent = typeof sentinelEvents.$inferSelect;
export type VaultSnapshot = typeof vaultSnapshots.$inferSelect;

export type InsertEpoch = z.infer<typeof insertEpochSchema>;
export type InsertBid = z.infer<typeof insertBidSchema>;
export type InsertSentinelEvent = z.infer<typeof insertSentinelEventSchema>;
export type InsertVaultSnapshot = z.infer<typeof insertVaultSnapshotSchema>;
