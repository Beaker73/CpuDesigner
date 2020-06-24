import { action, computed, thunk } from "easy-peasy";

import { InstructionsStoreModel } from "./StoreModel";
import { Instruction } from "./Models";
import { FixedUIntMap, FixedUInt } from "../../Types";

export * from "./Models";
export * from "./StoreModel";
export * from "./Hooks";

export const instructionsStore: InstructionsStoreModel = {
    all: {},
    newInstruction: action((state, payload) => {
        const instr: Instruction = {
            id: payload.id,
            mnemonic: "",
            description: "",
            bitSets: [],
        };
        state.all[instr.id] = instr;
    }),
    updateMnemonic: action((state, payload) => {
        const instr = state.all[payload.id];
        if (instr)
            instr.mnemonic = payload.mnemonic ?? "";
    }),
    updateDescription: action((state, payload) => {
        const instr = state.all[payload.id];
        if (instr)
            instr.description = payload.description ?? "";
    }),
    addBit: action((state , payload) => {
        const instr = state.all[payload.id];
        if (instr) {
            const simpleAdd: () => void = () => instr.bitSets.push(new FixedUInt(1, payload.bit ? 1n : 0n));

            if(instr.bitSets.length === 0) {
                // empty so simple add
                simpleAdd();
            } else {
                // get last entry
                const last = instr.bitSets[instr.bitSets.length-1];
                if(last instanceof FixedUInt) {
                    // fixed value, so combine
                    instr.bitSets.splice(instr.bitSets.length-1,1);
                    const newEnd = last.concat(new FixedUInt(1, payload.bit ? 1n : 0n));
                    instr.bitSets.push(newEnd);
                } else {
                    // other value, so append
                    simpleAdd();
                }
            }
        }
    }),
    addBitset: action((state, payload) => {
        const instr = state.all[payload.id];
        if (instr) {
            instr.bitSets.push(payload.bitsetId);
        }
    }),
}