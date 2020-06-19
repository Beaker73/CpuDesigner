import { BitsetsStoreModel } from "./StoreModel";
import { action, computed, thunk } from "easy-peasy";
import { Bitset } from "./Models/Bitset";
import { Dictionary } from "../../Types";
import { maxValueForBitCount } from "../../Types/FixedUInt";

export * from "./StoreModel";

export const bitsetsStore: BitsetsStoreModel = {
    bitSetsById: {},
    getBitsetById: computed(state => id => state.bitSetsById[id]),
    getBitsetByName: computed(state => name => Object.values(state.bitSetsById).find(bs => bs.name === name)),
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