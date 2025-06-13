import bcrypt from 'bcrypt';
import dayjs from 'dayjs';

const SALT_ROUNDS = 10;

export const hashPasswordHelper = async (plain_password: string): Promise<string> => {
    try {
        return await bcrypt.hash(plain_password, SALT_ROUNDS);
    } catch (error) {
        console.error('[util.ts][hashPassword] error', error);
        throw new Error('Failed to hash password');
    }
}

export const comparePasswordHelper = async (plain_password: string, hashed_password: string): Promise<boolean> => {
    try {
        return await bcrypt.compare(plain_password, hashed_password);
    } catch (error) {
        console.error('[util.ts][comparePassword] error', error);
        throw new Error('Failed to compare password');
    }
}

export const generateRegisterCode = (): number => {
    return Math.floor(100000 + Math.random() * 900000);
}

export const generateRegisterCodeExpiry = (): Date => {
    return dayjs().add(5, 'minutes').toDate();
}