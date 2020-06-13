import React from "react";

import { BladeProps } from "./Blade";

export interface BladeContext {
    openBlade?: (afterBladeId: number, bladeType: React.FunctionComponent) => void;
    closeBlade?: (bladeId: number) => void;
    bladeId?: number;
    bladeProps?: BladeProps;
}

export const bladeContext = React.createContext<BladeContext>({});

export type UseBladeResult = {
    openBlade: (bladeType: React.FunctionComponent) => void;
    closeBlade: () => void;
}

export function useBlade(): UseBladeResult {

    const context = React.useContext(bladeContext);
    
    return {
        openBlade: bladeType => {
            if (context.openBlade !== void 0 && context.bladeId !== void 0) {
                context.openBlade(context.bladeId, bladeType);
            }
        },
        closeBlade: () => {
            if (context.closeBlade !== void 0 && context.bladeId !== void 0) {
                context.closeBlade(context.bladeId);
            }
        }
    };
}