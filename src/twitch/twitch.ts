import tmi from 'tmi.js';
import fetch from 'node-fetch';
require('dotenv').config();

const connectToTwitch = async () => {
    const client = await new tmi.Client({
        connection: {
            reconnect: true
        },
        channels: [
            process.env.TWITCH_NAME || ''
        ],
        identity: {
            username: process.env.TWITCH_NAME || '',
            password: process.env.TWITCH_TOKEN || ''
        }
    });

    await client.connect();

    return client;
}

export const sendMessage = async (message: string) => {
    const client = await connectToTwitch();

    await client.say(process.env.TWITCH_NAME || '', message);
}

type ChannelInfoData = {
    data: Array<{
        broadcaster_id: string,
        broadcaster_login: string,
        broadcaster_name: string,
        broadcaster_language: string,
        game_id: string,
        game_name: string,
        title: string,
        delay: number,
        tags: [string],
        content_classification_labels: [unknown],
        is_branded_content: boolean
    }>
}

type OauthRequest = {
    access_token?: string,
    expires_in?: number,
    token_type?: "bearer"
}

export const getTitle = async () => {
    const { access_token: token } = await (await fetch(`https://id.twitch.tv/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: `${process.env.TWITCH_CLIENT_ID}`,
            client_secret: `${process.env.TWITCH_SECRET}`,
            grant_type: `client_credentials`
        })
    })).json() as OauthRequest;

    const { data } = await ((await fetch(`https://api.twitch.tv/helix/channels?broadcaster_id=${process.env.TWITCH_STREAMER_ID}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Client-Id': `${process.env.TWITCH_CLIENT_ID}`
        }
    })).json() as Promise<ChannelInfoData>);

    return data.length > 0 && data[0].title;
}