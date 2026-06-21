
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.ConnectorScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  firstName: 'firstName',
  lastName: 'lastName',
  phone: 'phone',
  email: 'email',
  region: 'region',
  status: 'status',
  platformRole: 'platformRole',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy'
};

exports.Prisma.HierarchyMappingScalarFieldEnum = {
  id: 'id',
  connectorId: 'connectorId',
  managerId: 'managerId',
  role: 'role',
  assignedAt: 'assignedAt',
  assignedBy: 'assignedBy'
};

exports.Prisma.ConnectorStatusHistoryScalarFieldEnum = {
  id: 'id',
  connectorId: 'connectorId',
  status: 'status',
  changedAt: 'changedAt',
  changedBy: 'changedBy',
  remarks: 'remarks'
};

exports.Prisma.ConnectorPerformanceScalarFieldEnum = {
  id: 'id',
  connectorId: 'connectorId',
  totalLeads: 'totalLeads',
  convertedLeads: 'convertedLeads',
  totalCommission: 'totalCommission',
  lastCalculatedAt: 'lastCalculatedAt'
};

exports.Prisma.CommissionRuleScalarFieldEnum = {
  id: 'id',
  ruleName: 'ruleName',
  connectorRate: 'connectorRate',
  tlOverrideRate: 'tlOverrideRate',
  rmOverrideRate: 'rmOverrideRate',
  isActive: 'isActive'
};

exports.Prisma.CommissionTransactionScalarFieldEnum = {
  id: 'id',
  loanId: 'loanId',
  connectorId: 'connectorId',
  loanAmount: 'loanAmount',
  connectorRate: 'connectorRate',
  connectorCommission: 'connectorCommission',
  teamLeaderOverride: 'teamLeaderOverride',
  rmOverride: 'rmOverride',
  totalPayout: 'totalPayout',
  status: 'status',
  amountPaid: 'amountPaid',
  paymentDate: 'paymentDate',
  createdAt: 'createdAt'
};

exports.Prisma.PayoutHistoryScalarFieldEnum = {
  id: 'id',
  transactionId: 'transactionId',
  paidAmount: 'paidAmount',
  paidAt: 'paidAt',
  paidBy: 'paidBy'
};

exports.Prisma.PayoutSlabScalarFieldEnum = {
  id: 'id',
  connectorId: 'connectorId',
  bankName: 'bankName',
  productCategory: 'productCategory',
  payoutRate: 'payoutRate',
  minDisbursementAmount: 'minDisbursementAmount',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SalesManagerScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  branchId: 'branchId',
  approvalRate: 'approvalRate',
  tatScore: 'tatScore',
  currentCapacity: 'currentCapacity',
  maxCapacity: 'maxCapacity',
  experienceScore: 'experienceScore',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RoutingHistoryScalarFieldEnum = {
  id: 'id',
  loanId: 'loanId',
  assignedSmId: 'assignedSmId',
  routingScore: 'routingScore',
  assignedAt: 'assignedAt'
};

exports.Prisma.CareerApplicationScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  mobile: 'mobile',
  role: 'role',
  experience: 'experience',
  coverNote: 'coverNote',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.FoirAssessmentScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  loanType: 'loanType',
  grossMonthlyIncome: 'grossMonthlyIncome',
  existingMonthlyObligations: 'existingMonthlyObligations',
  requestedLoanAmount: 'requestedLoanAmount',
  requestedTenureMonths: 'requestedTenureMonths',
  annualInterestRate: 'annualInterestRate',
  calculatedFoirPercentage: 'calculatedFoirPercentage',
  maxEligibleEmi: 'maxEligibleEmi',
  maxEligibleLoanAmount: 'maxEligibleLoanAmount',
  postLoanFoirPercentage: 'postLoanFoirPercentage',
  eligibilityStatus: 'eligibilityStatus',
  foirLimitApplied: 'foirLimitApplied',
  incomeSource: 'incomeSource',
  assessmentNotes: 'assessmentNotes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  Connector: 'Connector',
  HierarchyMapping: 'HierarchyMapping',
  ConnectorStatusHistory: 'ConnectorStatusHistory',
  ConnectorPerformance: 'ConnectorPerformance',
  CommissionRule: 'CommissionRule',
  CommissionTransaction: 'CommissionTransaction',
  PayoutHistory: 'PayoutHistory',
  PayoutSlab: 'PayoutSlab',
  SalesManager: 'SalesManager',
  RoutingHistory: 'RoutingHistory',
  CareerApplication: 'CareerApplication',
  FoirAssessment: 'FoirAssessment'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
