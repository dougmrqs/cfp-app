import { User } from '@prisma/client';

const FIVE_MINUTES_IN_SECONDS = 300


type SignFunctionType = (payload: Record<string, unknown>) => Promise<string> 

// export function makeSignToken(signFunction: SignFunctionType) {
//   return async (user: User) => {
//     const payload = {
//       sub: user.id,
//       iat: Math.floor(Date.now() / 1000),
//       exp: Math.floor(Date.now() / 1000) + FIVE_MINUTES_IN_SECONDS
//     }

//     try {
//       const jwt = await signFunction(payload)

//       return jwt
//     } catch (err) {
//       console.log(err)
//       throw (err)
//     }

//   }
// }

export async function signToken(user: User, signFunction: SignFunctionType) {
  const payload = {
    sub: user.id,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + FIVE_MINUTES_IN_SECONDS
  }

  try {
    const jwt = await signFunction(payload)
    return jwt
  } catch (err) {
    console.log(err)
    throw (err)
  }
}
