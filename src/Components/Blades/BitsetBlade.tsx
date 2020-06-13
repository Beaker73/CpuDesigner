import React from "react";
import { uuid } from "../../Types/uuid";
import { Stack, Label, Text, TextField } from "@fluentui/react";

import { Blade } from "./Host";

export interface BitsetBladeProps {
    bitsetId?: uuid;
}

export function BitsetBlade(props: BitsetBladeProps): JSX.Element {
    return <Blade size={4} title="New bitset">
        <Stack>
            <Stack.Item>
                <Label>Name <Text variant="small" style={{ opacity: 0.5 }}>of the Bitset</Text></Label>
                <TextField />
            </Stack.Item>
        </Stack>
    </Blade>
}