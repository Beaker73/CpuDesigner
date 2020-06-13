import { ConfigurationStoreModel } from "./Configuration";
import { InstructionsStoreModel } from "./Instructions";
import { BitsetsStoreModel } from "./Bitsets";

export interface StoreModel 
{
    configuration: ConfigurationStoreModel;
    bitsets: BitsetsStoreModel;
    instructions: InstructionsStoreModel;
}
