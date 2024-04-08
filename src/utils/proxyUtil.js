const fs = require('fs');
const yaml = require('js-yaml');
const config = yaml.load(fs.readFileSync('config.yaml', 'utf8'));

async function getProxyPool(n = 0, proxySource = undefined) {
    let proxy = []
    if (!proxySource) proxySource = config.proxy.source
    if (proxySource === 'internal') {
        proxy = [config.proxy.proxy]
    }
    else if (proxySource === "static") {
        proxy = config.proxy.staticProxy.split(',')
    }
    else if (proxySource === "static2") {
        proxy = config.proxy.staticProxy2.split(',')
    }

    return proxy
}

module.exports = getProxyPool
