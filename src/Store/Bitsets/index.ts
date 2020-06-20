import { BitsetsStoreModel } from "./StoreModel";
import { action, computed, thunk } from "easy-peasy";
import { Bitset } from "./Models/Bitset";

export * from "./StoreModel";

export const bitsetsStore: BitsetsStoreModel = {
    bitSetsById: {},
    getBitsetById: computed(state => id => state.bitSetsById[id]),

    setBitCount: action((state, payload) => {
        const bitSet = state.bitSetsById[payload.id];
        if(bitSet)
            bitSet.bitCount = payload.bitCount;
    }),
    setName: action((state, payload) => {
        const bitSet = state.bitSetsById[payload.id];
        if(bitSet)
            bitSet.name = payload.name;
    }),

    addBitset: action((state, payload) => {
        state.bitSetsById[payload.id] = payload;
    }),
    newBitset: thunk(({ addBitset }, payload) => {

        // create the bitset filled with those values
        const bitset: Bitset = {
            id: payload.id,
            bitCount: 3,
            name: "",
            values: {},
        };
        addBitset(bitset);

        return bitset;
    }),
};