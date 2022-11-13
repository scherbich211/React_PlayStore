import formate from "../../../src/utils/dateTransform";

describe("Date transfrorm", () => {
  it("new Date().toISOString()", () => {
    const myString = "2022-11-13T18:01:22.451Z";
    expect(formate(myString)).toBe("11/13/2022");
  });
});
