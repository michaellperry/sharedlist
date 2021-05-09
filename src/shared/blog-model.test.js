const { JinagaTest } = require("jinaga");
const { User, Post, Tag, PostTags, authorize } = require("./blog-model");

var j;

beforeEach(() => {
    j = JinagaTest.create({
        user: new User("---Blog Creator---"),
        authorization: authorize
    });
});

test("Blog creator is logged in", async () => {
    const { userFact: user } = await j.login();

    expect(user.publicKey).toBe("---Blog Creator---");
});

test("Can create a fact with a predecessor", async () => {
    const person = await j.fact(new User("---Blog Creator---"));
    const post = await j.fact(new Post(new Date(), person));

    expect(post.author.publicKey).toBe("---Blog Creator---");
});

test("Can add several tags to a post", async () => {
    const person = await j.fact(new User("---Blog Creator---"));
    const post = await j.fact(new Post(new Date(), person));

    const tag1 = await j.fact(new Tag("Historical Modeling"));
    const tag2 = await j.fact(new Tag("Math"));

    const tags = await j.fact(new PostTags(post, [ tag1, tag2 ]));

    expect(tags.tags[0].name).toBe("Historical Modeling");
    expect(tags.tags[1].name).toBe("Math");
});

test("Can query for posts by author", async () => {
    const person = await j.fact(new User("---Blog Creator---"));
    await j.fact(new Post(new Date(), person));

    const posts = await j.query(person, j.for(Post.byAuthor));

    expect(posts.length).toBe(1);
});

test("Can query for tags of posts", async () => {
    const person = await j.fact(new User("---Blog Creator---"));
    const post = await j.fact(new Post(new Date(), person));

    const tag1 = await j.fact(new Tag("Historical Modeling"));
    const tag2 = await j.fact(new Tag("Math"));

    await j.fact(new PostTags(post, [ tag1, tag2 ]));

    const tags = await j.query(post, j.for(Tag.forPost).then(PostTags.tags));

    expect(tags.length).toBe(2);
    expect(tags[0].name).toBe("Historical Modeling");
    expect(tags[1].name).toBe("Math");
});