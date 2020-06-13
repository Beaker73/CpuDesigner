import { createStore, createTypedHooks } from "easy-peasy";

import { configurationStore } from "./Configuration";
import { bitsetsStore } from "./Bitsets";
import { instructionsStore } from "./Instructions";
import { StoreModel } from "./StoreModel";

export * from "./Configuration";
export * from "./Instructions";
export * from "./StoreModel"

const rootStore: StoreModel = {
    configuration: configurationStore,
    bitsets: bitsetsStore,
    instructions: instructionsStore,
}

export const store = createStore(rootStore);

const typedHooks = createTypedHooks<StoreModel>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
