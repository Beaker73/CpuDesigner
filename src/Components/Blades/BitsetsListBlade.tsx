import * as React from "react";
import { DetailsList, IColumn } from "@fluentui/react";

import { Blade } from "./Host";

export function BitsetsListBlade(): JSX.Element {

    const columns: IColumn[] = [
        { key: "name", name: "Name", fieldName: "name", minWidth: 150, isRowHeader: true },
        { key: "bits", name: "Bits", fieldName: "bitCount", minWidth: 50 },
        { key: "values", name: "Values", fieldName: "count", minWidth: 50 },
    ];

    const items: any[] = [];

    return <Blade size={4} title="Bitsets">
        <DetailsList columns={columns} items={items} />
    </Blade>;
}