import { useStoreState, Instruction } from "..";

import { uuid } from "../../Types";
import { Bitset } from "../Bitsets";

export function useExpandedInstruction(instructionId: uuid): Instruction {

    const instr = useStoreState(state => state.instructions.all[instructionId]!);
    const setIds = instr.bitSets.filter(bs => typeof bs === "string") as string[];
    const sets = useStoreState(state => setIds.map<Bitset>(id => state.bitsets.bitSetsById[id]!));
    
    const exp: Instruction = {
        ...instr,
        bitSets: instr.bitSets.map(s => typeof s === "string" 
            ? sets.find(bs => bs.id === s)!.values!
            : s
        )
    }

    return exp;
}