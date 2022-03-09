import { NextApiRequest, NextApiResponse } from 'next'
export default function Hello(req: NextApiRequest, res: NextApiResponse): any {
  return res.status(200).json({
    status: 'success',
    message: 'Hello world',
  })
}
