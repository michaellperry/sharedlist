define(function (require) {
    const { JinagaBrowser } = require("jinaga");
    const j = JinagaBrowser.create({
        httpEndpoint: "/jinaga"
    });

    j.fact({
        type: "MyApplication.Visit",
        date: new Date()
    });
});
