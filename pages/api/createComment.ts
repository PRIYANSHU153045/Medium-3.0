// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import sanityClient from '@sanity/client';
export const config = {

  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,


  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
}
const client = sanityClient(config);
export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id, name, email, comment } = JSON.parse(req.body);
  try {
     await client.create(
      {
        _type: 'comment',
        post: {
          _type: 'reference',
          _ref: _id,
        },
        name,
        email,
        comment,
      }
    );
  } catch (err)
  {
    return res.status(500).json({ message: 'Could not submit comment ', err });
  }
  console.log('Commit successfully')
  res.status(200).json({message:"comment successfully"})
}

// skDRJ186SDB4cBOJfiEJlFuAppQJr7WkwtiZ3812GVsC3n5vOK399luX4w8uAXK7MkYrsUVXKx9q5UOZ0dJ7IW1W7EJQ8PCs3iyQrB9nnFkikQkMn4p7bXUwaHl12f9tbnwM2NokIkabQWjLy2HkgCG2bswkvABBV0hUDQP23seBhpIzd6aH 
