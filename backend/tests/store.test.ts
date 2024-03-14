import { it, describe, expect } from "vitest";
import type { Store, NFT } from "../src/models";
import { MockStore, CollectionMock } from "../src/models/mock";

describe("Store", () => {
  describe("collection", () => {
    it("should list collections", async () => {
      const store: Store = new MockStore();
      const collections = await store.listCollections();
      expect(collections).toEqual([]);
    });
  });
  describe("NFTs", () => {});
});
