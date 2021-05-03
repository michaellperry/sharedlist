import { AuthorizationRules, ensure, Jinaga as j } from "jinaga";

export class User {
    public static Type = "Jinaga.User";
    type = User.Type;

    constructor(
        public publicKey: string
    ) { }
}

export class UserName {
    public static Type = "SharedList.UserName";
    public type = UserName.Type;

    constructor (
        public user: User,
        public value: string,
        public prior: UserName[]
    ) { }

    static forUser(user: User) {
        return j.match(<UserName>{
            type: UserName.Type,
            user
        }).suchThat(UserName.isCurrent);
    }

    static isCurrent(userName: UserName) {
        return j.notExists(<UserName>{
            type: UserName.Type,
            prior: [userName]
        });
    }

    static user(userName: UserName) {
        ensure(userName).has("user");
        return j.match(userName.user);
    }
}

export class List {
    static Type = "SharedList.List";
    type = List.Type;

    constructor(
        public creator: User
    ) { }

    static fromCreator(creator: User) {
        return j.match(<List>{
            type: List.Type,
            creator
        }); 
    }

    static creator(list: List) {
        ensure(list).has("creator");
        return j.match(list.creator);
    }
}

export function authorize(a: AuthorizationRules) {
    return a
        .any(User.Type)
        .type(List.Type, j.for(List.creator))
        ;
}