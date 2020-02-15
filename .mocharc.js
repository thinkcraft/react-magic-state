module.exports = {
    extension: [
        "ts",
        "tsx"
    ],
    recursive: true,
    require: [
        "ts-node/register/transpile-only",
        "./test/setup"
    ]
};