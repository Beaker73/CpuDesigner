import { BitsetsStoreModel } from "./StoreModel";
import { action, computed, thunk } from "easy-peasy";
import { Bitset } from "./Models/Bitset";

export * from "./StoreModel";

export const bitsetsStore: BitsetsStoreModel = {
    bitSetsById: {},
    getBitsetById: computed(state => id => state.bitSetsById[id]),
    getBitsetByName: computed(state => name => Object.values(state.bitSetsById).find(bs => bs.name === name)),
    addBitset: action((state, payload) => {
        state.bitSetsById[payload.id] = payload;
    }),
    newBitset: thunk(({ addBitset }, payload) => {
        const bitset: Bitset = {
            id: payload.id,
            bitCount: payload.bitCount,
            name: payload.name,
            values: {},
        };
        addBitset(bitset);
        return bitset;
    }),
};