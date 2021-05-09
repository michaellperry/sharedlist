const { Jinaga: j, ensure } = require("jinaga");

class User {
    constructor (
        publicKey
    ) {
        this.type = User.Type
        this.publicKey = publicKey
    }
}
User.Type = "Jinaga.User";

class Post {
    constructor (
        created,
        author
    ) {
        this.type = Post.Type;
        this.created = created;
        this.author = author;
    }
}
Post.Type = "Blog.Post";

Post.byAuthor = function(author) {
    return j.match({
        type: "Blog.Post",
        author
    });
};

class Tag {
    constructor (
        name
    ) {
        this.type = Tag.Type;
        this.name = name;
    }
}
Tag.Type = "Blog.Tag";

Tag.forPost = function(post) {
    return j.match({
        type: "Blog.Post.Tags",
        post
    });
};

class PostTags {
    constructor (
        post,
        tags
    ) {
        this.type = PostTags.Type;
        this.post = post;
        this.tags = tags;
    }
}
PostTags.Type = "Blog.Post.Tags";

PostTags.tags = function(postTags) {
    ensure(postTags).has("tags");

    return j.match(postTags.tags);
};

module.exports = {
    User,
    Post,
    Tag,
    PostTags
};