const yaml = require('js-yaml');
const fs = require('fs');
const config = yaml.load(fs.readFileSync('config.yaml', 'utf8'));
const { Telegraf } = require('telegraf')
const { HttpsProxyAgent } = require('https-proxy-agent');

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
        const proxy = config.telegram.proxy
        this.agent = new HttpsProxyAgent(proxy)
        this.proxy = proxy
    }
}

module.exports = TgUtil;