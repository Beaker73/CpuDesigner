import { Instruction } from "./Models";
import { Action, Computed, Thunk } from "easy-peasy";

import { uuid, Dictionary } from "../../Types";

export interface InstructionsStoreModel {
    all: Dictionary<Instruction>;
    newInstruction: Action<InstructionsStoreModel, { id: uuid }>;
    updateMnemonic: Action<InstructionsStoreModel, { id: uuid, mnemonic: string }>;
    updateDescription: Action<InstructionsStoreModel, { id: uuid, description: string }>;
}