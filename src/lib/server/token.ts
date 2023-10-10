import { PrismaClient } from '@prisma/client';
import { generateRandomString, isWithinExpiration } from 'lucia/utils';

const prisma = new PrismaClient();
const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

export const generateEmailVerificationToken = async (userId: string) => {
  const storedUserTokens = await prisma.verificationToken.findMany({
    where: {
      userId: userId,
    },
  });

  if (storedUserTokens.length > 0) {
    const reusableStoredToken = storedUserTokens.find((token) => {
      // Check if expiration is within 1 hour and reuse the token if true
      return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
    });
    if (reusableStoredToken) return reusableStoredToken.id;
  }

  const token = generateRandomString(63);
  await prisma.verificationToken.create({
    data: {
      id: token,
      expires: new Date().getTime() + EXPIRES_IN,
      userId: userId,
    },
  });

  return token;
};

export const validateEmailVerificationToken = async (token: string) => {
  const storedToken = await prisma.verificationToken.findFirst({
    where: {
      id: token,
    },
  });

  if (!storedToken) throw new Error('Invalid token');

  const tokenExpires = Number(storedToken.expires); // bigint => number conversion
  if (!isWithinExpiration(tokenExpires)) {
    throw new Error('Expired token');
  }

  // Delete the token
  await prisma.verificationToken.delete({
    where: {
      id: token,
    },
  });

  return storedToken.userId;
};

export const generatePasswordResetToken = async (userId: string) => {
  const storedUserTokens = await prisma.resetVerificationToken.findMany({
    where: {
      userId: userId,
    },
  });

  if (storedUserTokens.length > 0) {
    const reusableStoredToken = storedUserTokens.find((token) => {
      // Check if expiration is within 1 hour and reuse the token if true
      return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
    });
    if (reusableStoredToken) return reusableStoredToken.id;
  }

  const token = generateRandomString(63);
  await prisma.resetVerificationToken.create({
    data: {
      id: token,
      expires: new Date().getTime() + EXPIRES_IN,
      userId: userId,
    },
  });

  return token;
};

export const validatePasswordResetToken = async (token: string) => {
  const storedToken = await prisma.resetVerificationToken.findFirst({
    where: {
      id: token,
    },
  });

  if (!storedToken) throw new Error('Invalid token');

  const tokenExpires = Number(storedToken.expires); // bigint => number conversion
  if (!isWithinExpiration(tokenExpires)) {
    throw new Error('Expired token');
  }

  // Delete the token
  await prisma.resetVerificationToken.delete({
    where: {
      id: token,
    },
  });

  return storedToken.userId;
};

export const isValidPasswordResetToken = async (token: string) => {
  const storedToken = await prisma.resetVerificationToken.findFirst({
    where: {
      id: token,
    },
  });

  if (!storedToken) return false;

  const tokenExpires = Number(storedToken.expires); // bigint => number conversion
  if (!isWithinExpiration(tokenExpires)) {
    return false;
  }

  return true;
};
