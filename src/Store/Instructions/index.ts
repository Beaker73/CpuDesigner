import { action, computed, thunk } from "easy-peasy";

import { InstructionsStoreModel } from "./StoreModel";
import { Instruction } from "./Models";

export * from "./Models";
export * from "./StoreModel";

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
}