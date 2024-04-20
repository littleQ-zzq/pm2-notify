require('./src/utils/logFormatUtil')
const pm2 = require('pm2');
const TgUtil = require('./src/utils/tgUtil')
const tgUtil = new TgUtil()
const fs = require('fs');
const yaml = require('js-yaml');
const config = yaml.load(fs.readFileSync('config.yaml', 'utf8'));
const toChatIds = config.telegram.toChatIds

async function start() {
    try {
        console.log(`PM2 Event Listening ... `)
        pm2.launchBus((err, bus) => {
            if (err) {
                console.error('Error connecting to PM2 bus:', err);
                return;
            }
            bus.on('process:event', data => {
                const event = data.event
                const processName = data.process.name
                const status = data.process.status
                console.log(`【${tgUtil.proxy}】New ${event} Event for process ${processName}, status: ${status}`)
                const msg = `
<b>⚠️ New PM2 process Event</b>

<i>Event: </i><b>${event}</b>
<i>ProcessName: </i><b>${processName}</b>
<i>Status: </i><b>${status}</b>
`
                for (const tgChatId of toChatIds) {
                    tgUtil.bot.telegram.sendMessage(tgChatId, msg, {
                        parse_mode: "HTML",

                    })
                }
            });

        });
    } catch (error) {
        console.error(error);
    }
}

start()