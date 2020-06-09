import { Instruction } from "./Models";
import { Action, Computed, Thunk } from "easy-peasy";

import { Dictionary } from "../../Types";

type NewInstructionPayload = void;

export interface InstructionsStoreModel {
    all: Dictionary<Instruction>;
    newInstruction: Action<InstructionsStoreModel, NewInstructionPayload>;
}