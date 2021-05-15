import { ensure, Jinaga as j } from "jinaga";

export class List {
    static Type = "SharedList.List";
    type = List.Type;

    constructor(
        public topic: string
    ) { }
}

export class Item {
    static Type = "SharedList.Item";
    type = Item.Type;

    constructor(
        public list: List,
        public description: string,
        public created: Date | string
    ) { }

    static inList(list: List) {
        return j.match(<Item>{
            type: Item.Type,
            list
        }).suchThat(Item.isNotCompleted);
    }

    static isNotCompleted(item: Item) {
        return j.notExists(<Completed>{
            type: Completed.Type,
            item
        });
    }

    static list(item: Item) {
        ensure(item).has("list");
        return j.match(item.list);
    }
}

export class Completed {
    static Type = "SharedList.Item.Completed";
    type = Completed.Type;

    constructor(
        public item: Item
    ) { }

    static item(completed: Completed) {
        ensure(completed).has("item");
        return j.match(completed.item);
    }
}
