import { ArchitectureStoreModel } from "./Architecture";
import { InstructionsStoreModel } from "./Instructions";
import { BitsetsStoreModel } from "./Bitsets";

export interface StoreModel 
{
    architecture: ArchitectureStoreModel;
    bitsets: BitsetsStoreModel;
    instructions: InstructionsStoreModel;
}
