import { action, computed, thunk } from "easy-peasy";

import { InstructionsStoreModel } from "./StoreModel";
import { newInstruction } from "./Models";

export * from "./Models";
export * from "./StoreModel";

export const instructionsStore: InstructionsStoreModel = {
    all: {},
    newInstruction: action((state, payload) => {
        const instr = newInstruction();
        state.all[instr.id] = instr;
    }),
}