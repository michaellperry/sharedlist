const { JinagaTest } = require("jinaga");
const { User, Post, Tag, PostTags } = require("./blog-model");

var j;

beforeEach(() => {
    j = JinagaTest.create({});
})

test("Can create a fact with a predecessor", async () => {
    const person = await j.fact(new User("---IF THIS WERE A REAL USER, THEIR PUBLIC KEY WOULD BE HERE---"));
    const post = await j.fact(new Post(new Date(), person));

    expect(post.author.publicKey).toBe("---IF THIS WERE A REAL USER, THEIR PUBLIC KEY WOULD BE HERE---");
});

test("Can add several tags to a post", async () => {
    const person = await j.fact(new User("---IF THIS WERE A REAL USER, THEIR PUBLIC KEY WOULD BE HERE---"));
    const post = await j.fact(new Post(new Date(), person));

    const tag1 = await j.fact(new Tag("Historical Modeling"));
    const tag2 = await j.fact(new Tag("Math"));

    const tags = await j.fact(new PostTags(post, [ tag1, tag2 ]));

    expect(tags.tags[0].name).toBe("Historical Modeling");
    expect(tags.tags[1].name).toBe("Math");
});

test("Can query for posts by author", async () => {
    const person = await j.fact(new User("---IF THIS WERE A REAL USER, THEIR PUBLIC KEY WOULD BE HERE---"));
    await j.fact(new Post(new Date(), person));

    const posts = await j.query(person, j.for(Post.byAuthor));

    expect(posts.length).toBe(1);
});

test("Can query for tags of posts", async () => {
    const person = await j.fact(new User("---IF THIS WERE A REAL USER, THEIR PUBLIC KEY WOULD BE HERE---"));
    const post = await j.fact(new Post(new Date(), person));

    const tag1 = await j.fact(new Tag("Historical Modeling"));
    const tag2 = await j.fact(new Tag("Math"));

    await j.fact(new PostTags(post, [ tag1, tag2 ]));

    const tags = await j.query(post, j.for(Tag.forPost).then(PostTags.tags));

    expect(tags.length).toBe(2);
    expect(tags[0].name).toBe("Historical Modeling");
    expect(tags[1].name).toBe("Math");
});