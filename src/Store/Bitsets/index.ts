import { BitsetsStoreModel } from "./StoreModel";
import { action, computed, thunk } from "easy-peasy";
import { Bitset } from "./Models/Bitset";
import { maxValueForBitCount } from "../../Types/FixedUInt";
import { FixedUIntMap } from "../../Types/FixedUIntSet";

export * from "./StoreModel";

export const bitsetsStore: BitsetsStoreModel = {
    bitSetsById: {},
    getBitsetById: computed(state => id => state.bitSetsById[id]),

    setBitCount: action((state, payload) => {
        const bitSet = state.bitSetsById[payload.id];
        if (bitSet && bitSet.values === null)
            bitSet.bitCount = payload.bitCount;
    }),
    setName: action((state, payload) => {
        const bitSet = state.bitSetsById[payload.id];
        if (bitSet)
            bitSet.name = payload.name;
    }),

    addBitset: action((state, payload) => {
        state.bitSetsById[payload.id] = payload;
    }),
    deleteBitset: action((state,payload) => {
        delete state.bitSetsById[payload.id];
    }),
    newBitset: thunk(({ addBitset }, payload) => {

        // create the bitset filled with those values
        const bitset: Bitset = {
            id: payload.id,
            bitCount: 3,
            name: "",
            values: null,
        };
        addBitset(bitset);

        return bitset;
    }),
    setValueTag: action((state, payload) => {
        const bitset = state.bitSetsById[payload.id];
        if(bitset && bitset.values) {
            bitset.values.update(payload.value, payload.tag);
        }
    }),
    generateSet: action((state, payload) => {
        const bitSet = state.bitSetsById[payload.id];
        if (bitSet) {
            bitSet.values = new FixedUIntMap(bitSet.bitCount);
            const maxValue = maxValueForBitCount(bitSet.bitCount);
            for (let i = 0n; i <= maxValue; i++) {
                const key = i.toString();
                if (!(key in bitSet.values))
                    bitSet.values.add(i, {name: i.toString()});
            }
        }
    }),
};