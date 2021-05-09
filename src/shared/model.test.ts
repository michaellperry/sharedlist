import { Jinaga, JinagaTest } from "jinaga";
import { authorize, Completed, Item, List, User } from "./model";

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

test("Can add an item to a list", async () => {
    const { userFact: creator } = await j.login<User>();
    const list = await j.fact(new List(creator));

    const item = await j.fact(new Item(list, "Write your first test", new Date()));
    expect(item.description).toBe("Write your first test");
});

test("Can get all items on a list", async () => {
    const { userFact: creator } = await j.login<User>();
    const list = await j.fact(new List(creator));
    await j.fact(new Item(list, "Write your first test", new Date()));
    await j.fact(new Item(list, "Write another one", new Date()));

    const items = await j.query(list, j.for(Item.inList));
    expect(items.length).toBe(2);
    expect(items[0].description).toBe("Write your first test");
    expect(items[1].description).toBe("Write another one");
});

test("Can mark a test as complete", async () => {
    const { userFact: creator } = await j.login<User>();
    const list = await j.fact(new List(creator));
    const item = await j.fact(new Item(list, "Write your first test", new Date()));

    const completed = await j.fact(new Completed(item));
    expect(completed.item.description).toBe("Write your first test");
});

test("Completed items do not appear on the list", async () => {
    const { userFact: creator } = await j.login<User>();
    const list = await j.fact(new List(creator));
    const item = await j.fact(new Item(list, "Write your first test", new Date()));
    await j.fact(new Item(list, "Write another one", new Date()));
    await j.fact(new Completed(item));

    const items = await j.query(list, j.for(Item.inList));
    expect(items.length).toBe(1);
    expect(items[0].description).toBe("Write another one");
});