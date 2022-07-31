module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: 3
            }
        ],
        [
            '@babel/preset-typescript',
            {
                allExtensions: true
            }
        ]
    ],
    plugins: [
        [
            '@babel/plugin-transform-runtime',
            {
                corejs: 3
            }
        ],
        '@babel/proposal-class-properties',
        '@babel/proposal-object-rest-spread'
    ]
};
