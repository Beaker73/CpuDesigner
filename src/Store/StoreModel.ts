import { ConfigurationStoreModel } from "./Configuration";
import { InstructionsStoreModel } from "./Instructions";

export interface StoreModel 
{
    configuration: ConfigurationStoreModel;
    instructions: InstructionsStoreModel;
}
