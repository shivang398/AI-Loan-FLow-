import { PrismaClient as AuthClient } from '../generated/prisma-auth';
import { PrismaClient as LoanClient } from '../generated/prisma-loan';
import { PrismaClient as CustomerClient } from '../generated/prisma-customer';
import { PrismaClient as SalesOpsClient } from '../generated/prisma-salesops';
import { PrismaClient as CommsClient } from '../generated/prisma-communications';
import { PrismaClient as AnalyticsClient } from '../generated/prisma-analytics';

export const authDb = new AuthClient();
export const loanDb = new LoanClient();
export const customerDb = new CustomerClient();
export const salesOpsDb = new SalesOpsClient();
export const commsDb = new CommsClient();
export const analyticsDb = new AnalyticsClient();

export async function connectAllDatabases() {
  await Promise.all([
    authDb.$connect(),
    loanDb.$connect(),
    customerDb.$connect(),
    salesOpsDb.$connect(),
    commsDb.$connect(),
    analyticsDb.$connect(),
  ]);
}

export async function disconnectAllDatabases() {
  await Promise.all([
    authDb.$disconnect(),
    loanDb.$disconnect(),
    customerDb.$disconnect(),
    salesOpsDb.$disconnect(),
    commsDb.$disconnect(),
    analyticsDb.$disconnect(),
  ]);
}
