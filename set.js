const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-XFORCE••<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkdUZitjcFdrQ2VoM3oyTUJwaEZHNTZLTVJPaWM0N0wrd1g4TzVGL0tYOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicGpkYkx2WXdYWmhLRW1yUUQvOVF6d0ZyRTdGMkNTQ1d6NXIxY2VKRGlYZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzR2JrS2hyeVFGckxiZ3pYTlNJbkc3a1dTT3MwSDEvdjNDNXBBL3IybGtjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKT2V2QUo2bHpkQnYxWFA4bFMySVcxOFhkOWNXb0tPS1Nic2JxampwSGt3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklCRzVqK1RoejBSS0prMDFram1VR1FIVlNPcFMrS3pLcktCT3Q5Z0FwRTg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlpETDhrWXlWYlZhalM3a0ZXeWdjM21PSzRnSmFubjVYYmRjUGxqM01Ubm89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUFtZFVhd3VRRFZ4OW1ERnZoU3RsaUhmNTdkMEpiN1R3dUVDcktwWmhHQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidWJhS2IyaS8zV0QxSG1wM29xWGZ3aGZIWUNLSEJvbkQ2ZlJxR1hlSDJnWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxWV1AyWjIwVkpuUTh1bTEzd290RGpUMHNOQXF1a2ZXV0thLzIxWHFtcGcrWVIwMkx1b1dSVDl4bmNXNXhKRXVKYjJkUmlmWEJlczk0b3NRWFlUR0NBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjgsImFkdlNlY3JldEtleSI6Ii8vMWVxbXhBaitGSWdDaGM5R1lCNDlhY1NWT2FsWlpjSEwyZS9OWUYrZFU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjI1NTExOTEwNzNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQTU4QUNEREEwNzQ4QjM4ODhDNTQ3ODEzMEZBRjU4RTgifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1OTkyMjAzOX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjI1NTExOTEwNzNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQTU2MjE2QUJBMTgyRDVGODc0ODAzMzYzQjcyMEQwMUQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1OTkyMjAzOX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjI1NTExOTEwNzNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQTVGQUFEQ0VCQjJERjg2MjQ1RDIyODkzNDA3NzExQ0IifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1OTkyMjA2NX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjI1NTExOTEwNzNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQTVCRjlENjhCM0NGREY4Mjk0NzBDMzc4REY1NzNCOTEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1OTkyMjA3MX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjI1NTExOTEwNzNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQTVGNjBCRDUyQzQ3QkVCQzFERjgxQjI4QjMwMEU3MzUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1OTkyMjA3NX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOmZhbHNlLCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSmFEMy9RQkVOMk9tY2NHR0JRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiVkJhNWlpb0dEQ2RxaUdzRXR0bUZ1UFhjcDlsNkRTMDQyNU5IbnZVYWszWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoidHp2K1Z1ckt1dnl3dTBSQkM2MDZGd2tGVjQ3ZDFubCtsRFBkZFpZOTZGcU4vbXJJdEhxVjh2eXRQTEY2WXRTQ2tXdlQ5Vk8vUzNRaXBzRS9IYnNGRFE9PSIsImRldmljZVNpZ25hdHVyZSI6ImhoRXlQMUpkWEdkcmhwK3RZWW55eXRzMWd0OFM3YWdVSWFYejRpY1BJUllSYnFZWituUHc0YlVWVzl0aGxtZEIzRHVtVFkvRU1IVkFnSXVWOUZoRENRPT0ifSwibWUiOnsiaWQiOiIyMjU1MTE5MTA3MzoyM0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZqG8J2akvCdmqMg8J2ZsvCdmorwnZqdIiwibGlkIjoiNTQwNjEyNTY3Mjg3NjU6MjNAbGlkIn0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIyNTUxMTkxMDczOjIzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZRV3VZb3FCZ3duYW9ockJMYlpoYmoxM0tmWmVnMHRPTnVUUjU3MUdwTjIifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBSVFBeEFBIn0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1OTkyMjAyOSwibGFzdFByb3BIYXNoIjoiM2dQVUprIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFKSXEifQ==',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/mr-X-force/LUCKY-MD-XFORCE',
    OWNER_NAME : process.env.OWNER_NAME || "𝚆𝚒𝚣 𝙲𝚊𝚝",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2250151191073",
    DEV : process.env.DEV || "𝚆𝚒𝚣 𝙲𝚊𝚝",
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT : process.env.AUTO_REACTION || "no", 
    AUTO_STICKER : process.env.AUTO_STICKER || "no",
    AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL2: process.env.URL2 || "https://files.catbox.moe/k6ga92.mp4",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'no',              
    CHAT_BOT: process.env.CHAT_BOT || "no",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    GREET : process.env.GREET_MESSAGE || "no", 
    AUTO_STICKER : process.env.AUTO_STICKER || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || '𝚆𝚒𝚣 𝙲𝚊𝚝 a vu le status',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    ANTI_BUG : process.env.ANTI_BUG || "no",
    ANTI_MENTION_GROUP : process.env.ANTI_MENTION_GROUP || "on",
    ANTI_TAG : process.env.ANTI_TAG || "on",
    ANTI_BAD : process.env.ANTI_BAD || "on",
    ANTI_SHARE_GROUP : process.env.ANTI_SHARE_GROUP || "on",
    ANTI_LINK_GROUP : process.env.ANTI_LINK_GROUP || "on",
    AUTO_BIO: process.env.AUTO_BIO || 'no',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://fredi-ai-site.vercel.app",
    CAPTION : process.env.CAPTION || "𝚆𝚒𝚣 𝙲𝚊𝚝 done!",
    BOT : process.env.BOT_NAME || '𝚆𝚒𝚣 𝙲𝚊𝚝 done!',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGES || 'no',
    ANTI_DELETE_GROUP : process.env.ANTI_DELETE_GROUP || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'no', 
    VOICE_CHATBOT_INBOX : process.env.VOICE_CHATBOT_INBOX || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
