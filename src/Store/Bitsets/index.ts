import { BitsetsStoreModel } from "./StoreModel";
import { action, computed } from "easy-peasy";
import { newBitset } from "./Models/Bitset";

export * from "./StoreModel";

export const bitsetsStore: BitsetsStoreModel = {
    bitSetsById: {},
    getBitsById: computed(state => id => state.bitSetsById[id]),
    getBitsByName: computed(state => name => Object.values(state.bitSetsById).find(bs => bs.name === name)),
    newBitset: action((state, payload) => {
        const bitset = newBitset(payload.bitCount, payload.name);
        state.bitSetsById[bitset.id] = bitset;
    }),
};