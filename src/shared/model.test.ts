import { Jinaga, JinagaTest } from "jinaga";
import { authorize, List, User } from "./model";

var j: Jinaga;

beforeEach(() => {
    j = JinagaTest.create({
        authorization: authorize,
        user: new User("---List Creator---")
    });
});

test("Can create a list", async () => {
    const creator = await j.fact(new User("---List Creator---"));
    const list = await j.fact(new List(creator));

    expect(list.creator.publicKey).toBe("---List Creator---");
});

test("Can get all lists that a user has created", async () => {
    const creator = await j.fact(new User("---List Creator---"));
    const list = await j.fact(new List(creator));

    const lists = await j.query(creator, j.for(List.fromCreator));
    expect(lists.length).toBe(1);
});