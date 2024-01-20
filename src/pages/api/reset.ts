// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/prisma-client';
import { getTitle, sendMessage } from '@/twitch/twitch';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success: string;
  twitch?: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const nuke = await prisma.nuke.update({
    where: {
      id: 1,
    },
    data: {
      number: 0
    }
  });

  if (!process.env.TWITCH_TOKEN) {
    return res.status(200).json({ success: 'OK', twitch: false })
  }

  const title = await getTitle();

  if (!title) {
    return res.status(200).json({ success: 'OK', twitch: false })
  }

  const newTitle = title.replaceAll(/[0-9]\/5/g, `${nuke.number}/5`);

  if (newTitle) {
    await sendMessage(`!setTitle ${newTitle}`)
  }

  return res.status(200).json({ success: 'OK', twitch: true })
}
