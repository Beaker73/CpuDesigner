import { FixedUInt } from "./FixedUInt";
import { FixedUIntSet } from "./FixedUIntSet";

describe("FixedUIntSet - Untagged", () => {

    const subject = new FixedUIntSet(4n);
    subject.addVal(1n)
    subject.addVal(2n);

    it("values",() => {
        expect([...subject.values()])
            .toEqual([new FixedUInt(4n, 1n), new FixedUInt(4n, 2n)]);
    });
    it("items",() => {
        expect([...subject.items()])
            .toEqual([new FixedUInt(4n, 1n), new FixedUInt(4n, 2n)]);
    });
    it("count", () => expect(subject.count).toEqual(2n));
    it("addDuplicateCount", () => {
        const subject = new FixedUIntSet(4n);
        subject.addVal(1n)
        subject.addVal(2n);
        subject.addVal(2n);
        expect(subject.count).toEqual(2n);
    });
});

describe("FixedUIntSet - Tagged", () => {

    const subject = new FixedUIntSet<string>(4n);
    subject.addVal(1n, "First")
    subject.addVal(2n, "Second");

    it("values",() => {
        expect([...subject.values()])
            .toEqual([new FixedUInt(4n, 1n), new FixedUInt(4n, 2n)]);
    });
    it("items",() => {
        expect([...subject.items()])
            .toEqual([
                [new FixedUInt(4n, 1n), "First"], 
                [new FixedUInt(4n, 2n), "Second"]
            ]);
    });
    it("count", () => expect(subject.count).toEqual(2n));
    it("addDuplicateCount", () => {
        const subject = new FixedUIntSet<string>(4n);
        subject.addVal(1n, "First")
        subject.addVal(2n, "Second");
        subject.addVal(2n, "Second");
        expect(subject.count).toEqual(2n);
    });

});