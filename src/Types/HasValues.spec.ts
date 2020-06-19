import { FixedUInt, toFixedUInt } from "./FixedUInt";
import { FixedUIntSet, FixedUIntMap } from "./FixedUIntSet";
import { HasValues, cartasianProduct, intersect, overlap } from "./HasValues";

describe("cartesianProduct", () => {

    it("Simple Enumeration", () => {
        // arrange
        var sets: HasValues[] = [
            new FixedUInt(1, 0n),
            new FixedUIntMap<string>(2, [
                [0n, "0"], [1n, "1"], [2n, "2"], [3n, "3"],
            ]),
            new FixedUInt(1, 0n),
        ];

        // act
        const result = [...cartasianProduct(sets)];

        // assert
        const expectedResult = [0n, 1n, 2n, 3n].map(i => new FixedUInt(4, i * 2n));
        expect(result).toEqual(expectedResult);
    });

    it("Complex Enumeration", () => {
        // arrange
        var sets: HasValues[] = [
            new FixedUIntMap<string>(2, [[1n, "A"], [3n, "B"]]),
            new FixedUInt(1, 0n),
            new FixedUIntMap<number>(2, [[0n, 0], [1n, 1], [2n, 2], [3n, 3]]),
            new FixedUInt(1, 1n),
        ]

        // act
        const result = [...cartasianProduct(sets)];

        // assert
        const expectedResults = [
            "6'b010001",
            "6'b010011",
            "6'b010101",
            "6'b010111",
            "6'b110001",
            "6'b110011",
            "6'b110101",
            "6'b110111"
        ];
        expect(result.map(r => r.toString())).toEqual(expectedResults);
    });

});

describe("intersect", () => {

    it("baseIntersect", () => {
        const set1 = [new FixedUInt(4, 2n), new FixedUInt(4, 5n), new FixedUInt(4, 7n)];
        const set2 = [new FixedUInt(4, 3n), new FixedUInt(4, 7n), new FixedUInt(4, 9n)];
        const result = [...intersect(set1, set2)];

        const expectedResult = [new FixedUInt(4, 7n)];

        expect(result).toEqual(expectedResult);
    });

    it("shifted bitsets", () => {
        const set1: HasValues[] = [
            new FixedUIntMap<number>(2, [[0n, 0], [1n, 1], [2n, 2], [3n, 3]]),
            new FixedUInt(1, 0n),
        ]
        const set2: HasValues[] = [
            new FixedUInt(1, 0n),
            new FixedUIntMap<number>(2, [[0n, 0], [1n, 1], [2n, 2], [3n, 3]]),
        ]

        const result = [...intersect(cartasianProduct(set1), cartasianProduct(set2))];

        // 000 --- 010 --- 100 110
        // 000 001 010 011 --- ---
        // -----------------------
        // 000     010
        const expectedResult = [new FixedUInt(3, 0n), new FixedUInt(3, 2n)];

        expect(result).toEqual(expectedResult);

    });

});

describe("overlap", () => {

    it("base overlap", () => {

        // set of 8 bits, where bottom 4 have all values
        const set8 = [new FixedUInt(4, 0n), new FixedUIntSet(4, [0n, 1n, 15n])];

        // set of 12 bits, top 7 are always 0, so only first bit of set will match
        const set12 = [new FixedUInt(7, 0n), new FixedUIntSet(5, [0n, 1n, 3n, 7n, 15n, 31n])];
        const result = [...overlap(cartasianProduct(set8), cartasianProduct(set12))];

        // 0000000|0| 0000000|0|0000 match
        // 0000000|0| 0000000|0|0001 match
        // 0000000|0| 0000000|0|0011 match
        // 0000000|0| 0000000|0|0111 match
        // 0000000|0| 0000000|0|1111 match
        // 0000000|0| 0000000|1|1111
        // 0000000|1| 0000000|0|0000 
        // 0000000|1| 0000000|0|0001 
        // 0000000|1| 0000000|0|0011
        // 0000000|1| 0000000|0|0111
        // 0000000|1| 0000000|0|1111
        // 0000000|1| 0000000|1|1111 match
        // 0000111|1| 0000000|0|0000 
        // 0000111|1| 0000000|0|0001 
        // 0000111|1| 0000000|0|0011
        // 0000111|1| 0000000|0|0111
        // 0000111|1| 0000000|0|1111
        // 0000111|1| 0000000|1|1111
        const expectedResult = [...toFixedUInt(8, [0n, 1n, 3n, 7n, 15n, 31n])];

        expect(result).toEqual(expectedResult);
    });

});