import { mockData } from "../client/src/lib/mockData";

export interface IStorage {
  getCurrentEpoch(): Promise<any>;
  getAuctionStatus(): Promise<any>;
  getVaultMetrics(): Promise<any>;
  getSentinelData(): Promise<any>;
  getCollection(): Promise<any>;
}

export class MemStorage implements IStorage {
  async getCurrentEpoch() {
    return mockData.epoch;
  }

  async getAuctionStatus() {
    return mockData.auction;
  }

  async getVaultMetrics() {
    return mockData.vault;
  }

  async getSentinelData() {
    return mockData.sentinel;
  }

  async getCollection() {
    return mockData.collection;
  }
}

export const storage = new MemStorage();
