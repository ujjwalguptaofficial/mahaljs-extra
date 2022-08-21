if (process.env.NODE_ENV === 'production') {
    module.exports = require('./mahal-util.min.js');
}
else {
    module.exports = require('./mahal-util.js');
}
