import { Jinaga, JinagaTest } from "jinaga";

var j: Jinaga;

beforeEach(() => {
    j = JinagaTest.create({});
})

test("Can create a list", async () => {
    const firstFact = await j.fact({
        type: "MyApplication.FirstFact",
        identifier: "my_fact_id"
    });

    expect(firstFact.identifier).toBe("my_fact_id");
});