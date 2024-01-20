import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/prisma-client';
import { getTitle, sendMessage } from '@/twitch/twitch';

type Data = {
  newNumber: Number,
  twitch?: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const nuke = await prisma.nuke.upsert({
    where: {
      id: 1,
    },
    update: {
      number: {
        increment: 1,
      },
    },
    create: {
      id: 1,
      number: 0
    }
  });

  if (!process.env.TWITCH_TOKEN) {
    return res.status(200).json({ newNumber: nuke.number, twitch: false })
  }

  const title = await getTitle();
  console.log('[TITLE]', title);

  if (!title) {
    return res.status(200).json({ newNumber: nuke.number, twitch: false })
  }

  const newTitle = title.replaceAll(/[0-9]\/5/g, `${nuke.number}/5`);

  if (newTitle) {
    await sendMessage(`!setTitle ${newTitle}`)
  }

  return res.status(200).json({ newNumber: nuke.number, twitch: true })
}
