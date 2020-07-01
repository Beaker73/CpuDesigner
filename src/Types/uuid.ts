import { v4 } from "uuid";

export type uuid = string;

export function newUuid(): uuid {
    return v4();
}