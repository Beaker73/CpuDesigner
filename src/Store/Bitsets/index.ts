import { BitsetsStoreModel } from "./StoreModel";
import { action } from "easy-peasy";
import { newBitset } from "./Models/Bitset";

export * from "./StoreModel";

export const bitsetsStore: BitsetsStoreModel = {
    bitSetsById: {},

    newBitset: action((state, payload) => {
        const bitset = newBitset(payload.bitCount, payload.name);
        state.bitSetsById[bitset.id] = bitset;
    }),
};