import React from "react";

import { BladeProps } from "./Blade";

export interface BladeContext {
    openBlade?: (afterBlade: number, bladeType: React.FunctionComponent) => void;
    bladeId?: number;
    bladeProps?: BladeProps;
}

export const bladeContext = React.createContext<BladeContext>({});

export type UseBladeResult = {
    openBlade: (bladeType: React.FunctionComponent) => void;
}

export function useBlade(): UseBladeResult {

    const context = React.useContext(bladeContext);
    
    return {
        openBlade: bladeType => {
            debugger;
            if (context.openBlade !== void 0 && context.bladeId !== void 0) {
                context.openBlade(context.bladeId, bladeType);
            }
        },
    };
}