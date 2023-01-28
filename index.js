const sqlite = require("sqlite")
const sqlite3 = require("sqlite3")
const fs = require('fs').promises
const userID = 1

async function main(){
    const db = await sqlite.open({filename: './db.sqlite', driver: sqlite3.Database})
    const rows = await db.all("SELECT * FROM chusan_user_playlog WHERE user_id = ?", userID)
    let count = 0
    const final = {
        meta: {
            game: "chunithm",
            playtype: "Single",
            service: "aqua2kamai"
        },
        scores: []
    }
    for (score of rows) {
        const difficulty = getDifficulty(score);
        if (!difficulty) continue;  
        if (score.music_id > 1500) continue;  
        count++
        scoreObj = {
            matchType: "inGameID",
            identifier: score.music_id.toString(),
            difficulty,
            score: score.score,
            lamp: getLamp(score),
            timeAchieved: score.user_play_date,
            optional:{
                maxCombo: score.max_combo
            },
            judgements: {
                miss: score.judge_guilty,
                attack: score.judge_attack,
                justice: score.judge_justice,
                jcrit : score.judge_heaven + score.judge_critical
            }
        }
        final.scores.push(scoreObj)
    }
    await fs.writeFile('SCORES.json', JSON.stringify(final))
    console.log(`Exported ${count} scores from player UID ${userID}`)
}


function getLamp(score){
    if (score.is_all_justice && score.judge_justice === 0) return "ALL JUSTICE CRITICAL";
    if (score.is_full_combo) return "FULL COMBO";
    if (score.is_clear) return "CLEAR";
    return "FAILED";
}

function getDifficulty(score){
    switch(score.level){
        case 0: return "BASIC";
        case 1: return "ADVANCED";
        case 2: return "EXPERT";
        case 3: return "MASTER";
        default: return false
    }
}

main();