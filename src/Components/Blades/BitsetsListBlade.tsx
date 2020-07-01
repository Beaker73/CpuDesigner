import * as React from "react";
import { DetailsList, IColumn, ICommandBarItemProps, SelectionMode } from "@fluentui/react";

import { Blade, useBlade } from "@beaker73/fluentui-blades";
import { BitsetBlade } from "./BitsetBlade";
import { useStoreActions, useStoreState } from "../../Store";
import { newUuid } from "../../Types/uuid";
import { Bitset } from "../../Store/Bitsets/Models/Bitset";
import { maxValueForBitCount } from "../../Types/FixedUInt";

export function BitsetsListBlade(): JSX.Element {

    const blade = useBlade();
    const newBitset = useStoreActions(store => store.bitsets.newBitset)
    const bitSets = useStoreState(store => store.bitsets.bitSetsById);

    const columns: IColumn[] = [
        { key: "name", name: "Name", fieldName: "name", minWidth: 150, isRowHeader: true },
        { key: "bits", name: "Bits", fieldName: "bitCount", minWidth: 50 },
        { key: "values", name: "Values", minWidth: 50, onRender: countValues },
    ];

    const items: Bitset[] = Object
        .values(bitSets)
        .sort((a,b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0);

    const buttons: ICommandBarItemProps[] = [
        { key: "add", name: "Add", iconProps: { iconName: "Add" }, onClick: addBitset },
    ];

    return <Blade title="Bitsets" buttons={buttons}>
        <DetailsList columns={columns} items={items} selectionMode={SelectionMode.none} onActiveItemChanged={editItem} />
    </Blade>;

    function editItem(item: Bitset): void {
        blade.openBlade(BitsetBlade, { id: item.id });
    }

    function addBitset(): void {
        const id = newUuid();
        newBitset({ id });
        blade.openBlade(BitsetBlade, { id });
    }

    function countValues(item: Bitset) {
        const maxSize = maxValueForBitCount(item.bitCount) + 1n;
        if (!item.values)
            return "-/" + maxSize;
        return item.values.size + "/" + maxSize;

    }
}