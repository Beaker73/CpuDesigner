import { Instruction } from "./Models";
import { Action, Computed, Thunk } from "easy-peasy";

import { uuid, Dictionary, FixedUInt, FixedUIntMap } from "../../Types";

export interface InstructionsStoreState {
    all: Dictionary<Instruction>;
}

export interface InstructionsStoreModel extends InstructionsStoreState {
    newInstruction: Action<InstructionsStoreModel, { id: uuid }>;
    updateMnemonic: Action<InstructionsStoreModel, { id: uuid, mnemonic: string }>;
    updateDescription: Action<InstructionsStoreModel, { id: uuid, description: string }>;
    addBit: Action<InstructionsStoreModel, { id: uuid, bit: boolean }>;
    addBitset: Action<InstructionsStoreModel, { id: uuid, bitsetId: uuid }>;
}

export function deserializeInstructionState(state: InstructionsStoreState): InstructionsStoreState {
    return {
        all: Object.fromEntries(
            Object.entries(state.all).map(([k,v]) => ([k, {
                ...v,
                bitSets: v.bitSets.map(bs => {
                    if(typeof bs === "string") {
                        console.log({type: 'string', bs});
                        return bs;
                    }
                    if(typeof bs === "object") {
                        const v = FixedUInt.parse(bs.bitCount, (bs as any).value)
                        console.log({type: 'object', bs, v});
                        return v;
                    }
                    throw new Error("invalid state");
                })
            }]))
        ),
    }
}