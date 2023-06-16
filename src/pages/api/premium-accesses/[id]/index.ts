import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { premiumAccessValidationSchema } from 'validationSchema/premium-accesses';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.premium_access
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPremiumAccessById();
    case 'PUT':
      return updatePremiumAccessById();
    case 'DELETE':
      return deletePremiumAccessById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPremiumAccessById() {
    const data = await prisma.premium_access.findFirst(convertQueryToPrismaUtil(req.query, 'premium_access'));
    return res.status(200).json(data);
  }

  async function updatePremiumAccessById() {
    await premiumAccessValidationSchema.validate(req.body);
    const data = await prisma.premium_access.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deletePremiumAccessById() {
    const data = await prisma.premium_access.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
