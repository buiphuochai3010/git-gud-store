import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPasswordHelper = async (plainPassword: string): Promise<string> => {
    try {
        return await bcrypt.hash(plainPassword, SALT_ROUNDS);
    } catch (error) {
        console.error('[util.ts][hashPassword] error', error);
        throw new Error('Failed to hash password');
    }
}