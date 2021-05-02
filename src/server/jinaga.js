const { JinagaServer } = require('jinaga');

function configureJinaga(app) {
    const { handler } = JinagaServer.create({});

    app.use('/jinaga', handler);
}

module.exports = { configureJinaga };