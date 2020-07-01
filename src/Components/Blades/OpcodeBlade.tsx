import React, { useMemo, CSSProperties } from "react";

import { uuid, FixedUInt } from "../../Types";
import { Blade } from "@beaker73/fluentui-blades";
import { useStoreState, useStoreActions, useExpandedInstruction } from "../../Store";
import { Field } from "../Field";
import { TextField, Stack, getTheme, DefaultButton, CommandBar, ICommandBarItemProps, ContextualMenuItemType, VerticalDivider, mergeStyleSets, ITheme, rgb2hex } from "@fluentui/react";

export interface OpcodeBladeProps {
    id: uuid;
}

export function OpcodeBlade(props: OpcodeBladeProps): JSX.Element {

    const theme = getTheme();
    const style = useMemo(useStyle, [theme]);
    const tints = useMemo(() => getThemeTints(theme), [theme]);

    const bitCount = useStoreState(state => state.architecture.bitCount);
    const instr = useExpandedInstruction(props.id);
    const sets = useStoreState(state => Object.values(state.bitsets.bitSetsById).map(bs => ({ key: bs.id, text: bs.name })));
    const { updateMnemonic, updateDescription, addBit, addBitset } = useStoreActions(state => state.instructions);

    const editButtons: ICommandBarItemProps[] = [
        { key: "zero", text: "0", iconProps: { iconName: "Add" }, onClick: e => insertBit(false) },
        { key: "sep0", onRender: () => <VerticalDivider /> },
        { key: "one", text: "1", iconProps: { iconName: "Add" }, onClick: e => insertBit(true) },
        { key: "sep1", onRender: () => <VerticalDivider /> },
        {
            key: "set", text: "Sets", iconProps: { iconName: "List" }, subMenuProps: {
                items: sets.map(s => ({
                    ...s,
                    onClick: e => insertBitset(s.key),
                })),
            }
        },
    ];

    const lines: JSX.Element[] = [];
    let bits: JSX.Element[] = [];
    // process all sets
    let b = "";
    for (const set of instr.bitSets) {
        if (typeof set !== "string") {
            // walk from high bit to low (left-right)
            for (var i = set.bitCount - 1; i >= 0; i--) {
                let c = '';
                if (set instanceof FixedUInt)
                    c = set.getBit(i) ? '1' : '0';
                else
                    c = '•';
                const bitBack: CSSProperties = {
                    background: c == '0' ? theme.semanticColors.disabledBackground
                        : c == '1' ? theme.semanticColors.bodyBackground
                            : theme.palette.themeLighter,
                    color: c == '0' ? theme.semanticColors.disabledText
                        : c == '1' ? theme.semanticColors.bodyText
                            : theme.semanticColors.bodyText,
                    borderColor: c != '0' && c != '1' ? theme.palette.themeTertiary : undefined,
                };
                b += c;
                bits.push(<Stack className={style.bit} style={bitBack} horizontal horizontalAlign="center" verticalAlign="baseline">
                    {c}
                </Stack>);
                lineEnd();
            }
        }
    }
    if (bits.length > 0)
        lineEnd();

    function lineEnd() {
        if (bits.length >= bitCount) {
            const v = parseInt(b.replace(/•/g, '0'), 2).toString(16);
            bits.push(<Stack className={style.value} horizontal verticalAlign="baseline">0x{v}</Stack>)
            lines.push(<Stack horizontal className={style.bitContainer} tokens={{ childrenGap: theme.spacing.s2 }}>{bits}</Stack>);
            bits = [];
            b = "";
        }
    }

    return <Blade title={instr.mnemonic}>
        <Stack tokens={{ childrenGap: theme.spacing.m }}>
            <Field label="Mnemonic" subLabel="for the Instruction">
                <TextField value={instr.mnemonic} onChange={onUpdateMnemonic} />
            </Field>
            <Field label="Description" subLabel="of the Instruction">
                <TextField value={instr.description} onChange={onUpdateDescription} multiline rows={3} />
            </Field>
            <Field label="Bits" subLabel="comprising the instruction">
                <CommandBar items={editButtons} />
                <Stack tokens={{ childrenGap: theme.spacing.s2 }}>
                    {lines}
                </Stack>
            </Field>
        </Stack>
    </Blade>

    function onUpdateMnemonic<T>(e: React.FormEvent<T>, newMnemonic?: string) {
        updateMnemonic({ id: instr.id, mnemonic: newMnemonic ?? "" });
    }
    function onUpdateDescription<T>(e: React.FormEvent<T>, newDescription?: string) {
        updateDescription({ id: instr.id, description: newDescription ?? "" });
    }

    function insertBit(bit: boolean) {
        addBit({ id: instr.id, bit });
    }
    function insertBitset(bitsetId: uuid) {
        addBitset({ id: instr.id, bitsetId });
    }

    function useStyle() {
        return mergeStyleSets({
            bitContainer: {
                marginTop: theme.spacing.m,
            },
            bit: {
                width: 24, height: 24,
                border: `solid 1px ${theme.palette.neutralTertiary}`,
                borderRadius: theme.effects.roundedCorner2,
                boxShadow: theme.effects.elevation4,
            },
            value: {
                width: 24, height: 24,
                border: `solid 1px transparent`,
                flexGrow: 1,
            },
            break: {
                flexBasis: '100%',
                height: 0,
            }
        })
    }
}

interface ITint {
    border: string;
    background: string;
}

interface IThemeTints {
    red: ITint;
    tints: ITint[];
}

type rgb = [number, number, number];

function getThemeTints(theme: ITheme): IThemeTints {
    const tints: ITint[] = [];

    return {
        red: tint(theme.palette.red),
        tints,
    }

    function tint(colour: string): ITint {
        const tint: ITint = {
            border: colour,
            background: mix(colour, theme.semanticColors.bodyBackground),
        };

        tints.push(tint);
        return tint;
    }

    function mix(colour1: string, colour2: string): string {
        const rgb1 = parseRgb(colour1);
        const rgb2 = parseRgb(colour2);
        const rgb3 = mixRgb(rgb1, rgb2);
        console.log({ colour1, colour2, rgb1, rgb2, rgb3 });
        return rgbToString(rgb3);
    }

    function parseRgb(colour: string): [number, number, number] {
        const m = /#?(?<r>[0-9a-f]{2})(?<g>[0-9a-f]{2})(?<b>[0-9a-f]{2})/gi.exec(colour);
        if (!m)
            throw new Error("format exception");
        return [
            parseInt(m[1], 16),
            parseInt(m[2], 16),
            parseInt(m[3], 16)
        ];
    }

    function mixRgb(rgb1: rgb, rgb2: rgb): rgb {
        return [
            (rgb1[0] + rgb2[0]) / 2,
            (rgb1[1] + rgb2[1]) / 2,
            (rgb1[2] + rgb2[2]) / 2,
        ];
    }

    function rgbToString(rgb: rgb) {
        return '#' + pad(rgb[0]) + pad(rgb[1]) + pad(rgb[2]);
        function pad(n: number) {
            let h = n.toString(16);
            if (h.length < 2)
                h = '0' + h;
            return h;
        }
    }
}