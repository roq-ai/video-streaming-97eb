import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { contentValidationSchema } from 'validationSchema/contents';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getContents();
    case 'POST':
      return createContent();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getContents() {
    const data = await prisma.content
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'content'));
    return res.status(200).json(data);
  }

  async function createContent() {
    await contentValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.premium_access?.length > 0) {
      const create_premium_access = body.premium_access;
      body.premium_access = {
        create: create_premium_access,
      };
    } else {
      delete body.premium_access;
    }
    const data = await prisma.content.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
