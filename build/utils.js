'use strict';
const path = require('path');

const packageConfig = require('../package.json');

exports.projectPackage = packageConfig;

exports.joinPrePath = dir => {
    return path.join(__dirname, '..', dir);
};

// 拼接打包以后资源路径
exports.assetsPath = _path => {
    return path.posix.join('static', _path);
};

exports.env = (process.argv.length === 8 ? process.argv.slice(7, 8) : process.argv.slice(2, 3)).toString();

const configs = require('../config');

exports.createNotifierCallback = () => {
    const notifier = require('node-notifier');

    return (severity, errors) => {
        if (severity !== 'error') return;

        const error = errors[0];
        const filename = error.file && error.file.split('!').pop();

        notifier.notify({
            title: packageConfig.name,
            message: `${severity}: ${error.name}`,
            subtitle: filename || ''
        });
    };
};

exports.config = configs[this.env];
