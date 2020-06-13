import React from "react";

import { BladeProps } from "./Blade";
import { ICommandBarItemProps } from "@fluentui/react";

export interface BladeContext {
    openBlade?<P>(afterBladeId: number, bladeType: React.FunctionComponent<P>, props: P): void;
    closeBlade?(bladeId: number): void;
    bladeId?: number;
    bladeProps?: BladeProps;
}

export const bladeContext = React.createContext<BladeContext>({});

export type UseBladeResult = {
    openBlade<P>(bladeType: React.FunctionComponent<P>, props?: P): void;
    closeBlade: () => void;
}

export function useBlade(): UseBladeResult {

    const context = React.useContext(bladeContext);
    
    return {
        openBlade: (bladeType, props) => {
            if (context.openBlade !== void 0 && context.bladeId !== void 0) {
                context.openBlade(context.bladeId, bladeType, props);
            }
        },
        closeBlade: () => {
            if (context.closeBlade !== void 0 && context.bladeId !== void 0) {
                context.closeBlade(context.bladeId);
            }
        }
    };
}

export function useBladeButton(props: ICommandBarItemProps): void {
    
}