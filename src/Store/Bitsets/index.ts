import wu from "wu";

import { BitsetsStoreModel } from "./StoreModel";
import { action, computed, thunk } from "easy-peasy";
import { Bitset, BitsetValueTag } from "./Models/Bitset";
import { maxValueForBitCount } from "../../Types/FixedUInt";
import { FixedUIntMap } from "../../Types/FixedUIntSet";

export * from "./StoreModel";
export * from "./Models";

export const bitsetsStore: BitsetsStoreModel = {
    bitSetsById: {},
    isBitsetInUse: computed(
        [
            state => state.bitSetsById,
            (state, store) => store.instructions.all
        ],
        (sets, instrs) => id => {
            const set = sets[id];
            if(set) {
                return wu.values(instrs).some(i => 
                    i.bitSets.some(bs => typeof bs === "string" && bs === id));
            }

            return false;
        }
    ),

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
    deleteValue: action((state, payload) => {
        const bitset = state.bitSetsById[payload.id];
        if(bitset && bitset.values) {
            bitset.values.delete(payload.value);
        }
    }),
    cloneBitset: action((state, payload) => {
        const bitset = state.bitSetsById[payload.bitsetToCloneId];
        if(bitset && bitset.values) {
            const newBitset: Bitset = {
                ...bitset,
                id: payload.newId,
                name: `${bitset.name} (copy)`,
                values: bitset.values?.clone(),
            }
            state.bitSetsById[payload.newId] = newBitset;
        }
    }),
    generateSet: action((state, payload) => {
        const bitSet = state.bitSetsById[payload.id];
        if (bitSet) {
            if(!bitSet.values)
                bitSet.values = new FixedUIntMap<BitsetValueTag>(bitSet.bitCount);
            const maxValue = maxValueForBitCount(bitSet.bitCount);
            for (let i = 0n; i <= maxValue; i++) {
                if (!bitSet.values.has(i)) {
                    bitSet.values.add(i, {name: i.toString()});
                }
            }
        }
    }),
};
