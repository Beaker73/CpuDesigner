import { FixedUInt } from "./FixedUInt";

describe("FixedUInt", () => {

    it("maxValue", () => {
        const subject = new FixedUInt(32n, 834352n);
        expect(subject.maxValue).toBe(4294967295n);
    });

    it("concat", () => {
        const subject = new FixedUInt(8n, 170n);
        const other = new FixedUInt(8n, 85n);

        const result = subject.concat(other);

        expect(result.bitCount).toBe(16n);
        expect(result.value).toBe(43605n);
    });

    it("toString", () => {
        const subject = new FixedUInt(32n, 834352n);
        expect(subject.toString()).toBe("32'b00000000000011001011101100110000");
    });

    it("getBit", () => {
        const subject = new FixedUInt(32n, 834352n);
        expect(subject.getBit(4n)).toBe(true);
        expect(subject.getBit(10n)).toBe(false);
    });

    describe("equals", () => {
        it("same value, same size", () => {
            const a = new FixedUInt(64n, 7234287234n);
            const b = new FixedUInt(64n, 7234287234n);

            expect(a.equals(b)).toBe(true);
        });
        it("same value, differnt size", () => {
            const a = new FixedUInt(64n, 7234287234n);
            const b = new FixedUInt(60n, 7234287234n);

            expect(a.equals(b)).toBe(false);
        });
        it("different value, same size", () => {
            const a = new FixedUInt(64n, 7234287234n);
            const b = new FixedUInt(64n, 134348298387n);

            expect(a.equals(b)).toBe(false);
        });
        it("different value, different size", () => {
            const a = new FixedUInt(64n, 7234287234n);
            const b = new FixedUInt(128n, 134348298387n);

            expect(a.equals(b)).toBe(false);
        });
        
    })

    describe("msbEquals", () => {
        it("same value, same size", () => {
            const a = new FixedUInt(60n, 7234287234n);
            const b = new FixedUInt(60n, 7234287234n);

            expect(a.msbEquals(b)).toBe(true);
        });
        it("same msb value, different size", () => {
            const a = new FixedUInt(64n, 7234287234n << 4n);
            const b = new FixedUInt(60n, 7234287234n);

            expect(a.msbEquals(b)).toBe(true);
        });
        it("different value, same size", () => {
            const a = new FixedUInt(60n, 7234287234n);
            const b = new FixedUInt(60n, 9947837n);

            expect(a.msbEquals(b)).toBe(false);
        });
        it("different value, different size", () => {
            const a = new FixedUInt(64n, 968277347711n);
            const b = new FixedUInt(60n, 7234287234n);

            expect(a.msbEquals(b)).toBe(false);
        });
        it("same lsb value, different size", () => {
            const a = new FixedUInt(64n, 547234287234n);
            const b = new FixedUInt(60n,   7234287234n);

            expect(a.msbEquals(b)).toBe(false);
        });
    });

});