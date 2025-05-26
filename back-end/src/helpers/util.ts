import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPasswordHelper = async (plainPassword: string) => {
    try {
        return await bcrypt.hash(plainPassword, SALT_ROUNDS);
    } catch (error) {
        console.log('[util.ts][hashPassword] error', error);
    }
}