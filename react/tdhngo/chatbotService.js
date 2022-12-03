const { NlpManager } = require('node-nlp');
const manager = new NlpManager({ languages: ['en'] });
// Let's import fs module to read our json files.
const fs = require("fs");
// Let's read all our intents files in the folder intents
const files = fs.readdirSync("./intents");
// 1 - Train the IA
async function trainChatBotIA() {
    return new Promise(async (resolve, reject) => {
        // Adds the utterances and intents for the NLP
        // Train also the NLG
        for (const file of files) {
            let data = fs.readFileSync(`./intents/${file}`);
            data = JSON.parse(data);
            const intent = file.replace(".json", "");
            for (const question of data.questions) {
                manager.addDocument("en", question, intent);
            }
            for (const answer of data.answers) {
                manager.addAnswer("en", intent, answer);
            }
        }
        await manager.train();
        manager.save();
        console.log("AI has been trained.")
        resolve(true);
    })
}

async function generateResponseAI(qsm) {
    // Train and save the mode
    return new Promise(async (resolve, reject) => {
        let response = await manager.process('en', qsm);
        resolve(response);
    })
}

module.exports = {
    trainChatBotIA,
    generateResponseAI
}
