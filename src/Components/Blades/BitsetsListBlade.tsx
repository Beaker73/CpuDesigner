import * as React from "react";
import { DetailsList, IColumn, ICommandBarItemProps } from "@fluentui/react";

import { Blade, useBlade } from "./Host";
import { BitsetCreateBlade } from "./BitsetCreateBlade";

export function BitsetsListBlade(): JSX.Element {

    const blade = useBlade();

    const columns: IColumn[] = [
        { key: "name", name: "Name", fieldName: "name", minWidth: 150, isRowHeader: true },
        { key: "bits", name: "Bits", fieldName: "bitCount", minWidth: 50 },
        { key: "values", name: "Values", fieldName: "count", minWidth: 50 },
    ];

    const items: any[] = [];

    const buttons: ICommandBarItemProps[] = [
        { key: "add", name: "Add...", iconProps: { iconName: "Add" }, onClick: addBitset },
    ];

    return <Blade title="Bitsets" buttons={buttons}>
        <DetailsList columns={columns} items={items} />
    </Blade>;

    function addBitset(): void {
        blade.openBlade(BitsetCreateBlade, { bitsetId: void 0 });
    }
}