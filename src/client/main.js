import { JinagaBrowser } from "jinaga/dist/jinaga";

const j = JinagaBrowser.create({
    httpEndpoint: "/jinaga"
});

j.fact({
    type: "MyApplication.Visit",
    date: new Date()
});
