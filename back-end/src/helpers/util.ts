import bcrypt from 'bcrypt';

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