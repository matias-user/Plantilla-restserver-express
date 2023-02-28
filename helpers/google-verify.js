const { OAuth2Client } = require('google-auth-library');

async function googleVerify(id_token = '') {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID
    });
    const { name, picture, email } = ticket.getPayload();

    return { 
        name, 
        image: picture, 
        email 
    };
}

module.exports = googleVerify;