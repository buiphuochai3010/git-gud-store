import { faker } from '@faker-js/faker';
import { PrismaClient, AccountType } from '@prisma/client';
import { BaseAccountDto } from '../src/modules/accounts/dto/base-account.dto';
import { hashPasswordHelper } from '../src/helpers/util';

const prisma = new PrismaClient();

const NUMBER_OF_ACCOUNTS = 100;

async function generateRandomAccounts(number_of_accounts: number): Promise<BaseAccountDto[]> {
    const accounts: BaseAccountDto[] = [];
    
    for (let i = 0; i < number_of_accounts; i++) {
        const account: BaseAccountDto = {
            username: faker.internet.username(),
            email: faker.internet.email(),
            password: await hashPasswordHelper(faker.internet.password()),
            account_type: 'LOCAL',
            is_active: true,
        }

        accounts.push(account);
    }

    return accounts;
}

async function seedDatabase() {
    try {
        console.log('🌱 Starting to seed database with random accounts...');

        if (NUMBER_OF_ACCOUNTS <= 0) {
            throw new Error('Số lượng tài khoản phải lớn hơn 0');
        } else if (NUMBER_OF_ACCOUNTS > 50) {
            throw new Error('Số lượng tài khoản không được lớn hơn 50');
        }

        const random_accounts = await generateRandomAccounts(NUMBER_OF_ACCOUNTS);

        for (const account_data of random_accounts) {
            await prisma.account.create({
                data: {
                    username: account_data.username,
                    email: account_data.email,
                    password: account_data.password,
                    account_type: account_data.account_type as AccountType,
                    is_active: account_data.is_active ?? false,
                }
            })
        }
        console.log(`✅ Successfully created ${random_accounts.length} random accounts!`);

        const created_accounts = await prisma.account.findMany({
            take: random_accounts.length,
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                username: true,
                email: true,
                account_type: true,
                is_active: true,
                createdAt: true,
            }
        });

        console.table(created_accounts, ['id', 'username', 'email', 'account_type', 'is_active', 'createdAt']);
        return
    } catch (error) {
        console.error('[seedDatabase] error', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

// Chạy script
seedDatabase();