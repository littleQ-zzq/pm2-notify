const yaml = require('js-yaml');
const fs = require('fs');
const config = yaml.load(fs.readFileSync('config.yaml', 'utf8'));
const { Telegraf } = require('telegraf')
const { HttpsProxyAgent } = require('https-proxy-agent');
const getProxyPool = require('./proxyUtil');

const botToken = config.telegram.bot.token
const agent = config.telegram.agent

class TgUtil {
    constructor() {
        if (agent) this.setAgent()
        this.bot = new Telegraf(botToken,
            {
                telegram: {
                    agent: this.agent
                }
            }
        )
    }

    async setAgent() {
        const proxyPool = await getProxyPool()
        const proxy = proxyPool.length === 0 ? '' : Array.from(proxyPool)[(Math.random() * proxyPool.length) | 0]
        this.agent = new HttpsProxyAgent(proxy)
        this.proxy = proxy
    }
}

module.exports = TgUtil;