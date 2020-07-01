import { FixedUInt } from "./FixedUInt";
import { FixedUIntSet, FixedUIntMap } from "./FixedUIntSet";

describe("FixedUIntSet", () => {

    const subject = new FixedUIntSet(4);
    subject.add(1n)
    subject.add(2n);

    it("values", () => {
        expect([...subject.values()])
            .toEqual([new FixedUInt(4, 1n), new FixedUInt(4, 2n)]);
    });
    it("nakedValues", () => {
        expect([...subject.nakedValues()])
            .toEqual([1n, 2n]);
    });
    it("count", () => expect(subject.size).toEqual(2));
    it("addDuplicateCount", () => {
        const subject = new FixedUIntSet(4);
        subject.add(1n)
        subject.add(2n);
        subject.add(2n);
        expect(subject.size).toEqual(2n);
    });
});

describe("FixedUIntMap", () => {

    const subject = new FixedUIntMap<string>(4);
    subject.add(1n, "First")
    subject.add(2n, "Second");

    it("values", () => {
        expect([...subject.values()])
            .toEqual([new FixedUInt(4, 1n), new FixedUInt(4, 2n)]);
    });
    it("items", () => {
        expect([...subject.items()])
            .toEqual([
                [new FixedUInt(4, 1n), "First"],
                [new FixedUInt(4, 2n), "Second"]
            ]);
    });
    it("count", () => expect(subject.size).toEqual(2));
    it("addDuplicateCount", () => {
        const subject = new FixedUIntMap<string>(4);
        subject.add(1n, "First")
        subject.add(2n, "Second");
        subject.add(2n, "Second");
        expect(subject.size).toEqual(2);
    });

});