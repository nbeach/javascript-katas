let paramIt = (name, test, table) => {
    table.forEach(data => {
        it(name.replace("#case", data.case), () => { test(data) });
    });
};

module.exports = paramIt;
