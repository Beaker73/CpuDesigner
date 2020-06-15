import React from "react";
import { ICommandBarItemProps } from "@fluentui/react";

import { BladeProps } from "./Blade";
import { DefineBladeProps } from "./BladeHost";

export interface BladeContext {
    openBlade?(afterBladeId: number, blade: DefineBladeProps): void;
    closeBlade?(bladeId: number): void;
    bladeId?: number;
    bladeProps?: BladeProps;
}

export const bladeContext = React.createContext<BladeContext>({});
  
export type UseBladeResult = {
    openBlade<P extends {} = {}>(bladeType: React.FunctionComponent<P>, props?: P): void;
    replaceBlade<P extends {} = {}>(bladeType: React.FunctionComponent<P>, props?: P): void;
    closeBlade: () => void;
}

export function useBlade(): UseBladeResult {

    const context = React.useContext(bladeContext);

    return {
        openBlade: (bladeType: React.FunctionComponent<{}>, bladeProps) => {
            if (context.openBlade !== void 0 && context.bladeId !== void 0) {
                context.openBlade(context.bladeId, { bladeType, bladeProps: bladeProps ?? {} });
            }
        },
        replaceBlade: (bladeType: React.FunctionComponent<{}>, bladeProps) => {
            if (context.openBlade !== void 0 && context.bladeId !== void 0) {
                console.log({ id: context.bladeId, bladeType, props: bladeProps });
                context.openBlade(context.bladeId - 1, { bladeType, bladeProps: bladeProps ?? {} });
            }
        },
        closeBlade: () => {
            if (context.closeBlade !== void 0 && context.bladeId !== void 0) {
                context.closeBlade(context.bladeId);
            }
        },
    };
}

export function useBladeButton(props: ICommandBarItemProps): void {

}