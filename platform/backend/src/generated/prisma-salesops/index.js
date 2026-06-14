
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/library.js')


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

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

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




  const path = require('path')

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
  FoirAssessment: 'FoirAssessment'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/home/shivang/Desktop/Auditor/platform/backend/src/generated/prisma-salesops",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "debian-openssl-3.0.x",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "/home/shivang/Desktop/Auditor/platform/backend/prisma/salesops/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../../../prisma/salesops",
  "clientVersion": "5.22.0",
  "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "mysql",
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "SALESOPS_DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider = \"prisma-client-js\"\n  output   = \"../../src/generated/prisma-salesops\"\n}\n\ndatasource db {\n  provider = \"mysql\"\n  url      = env(\"SALESOPS_DATABASE_URL\")\n}\n\nmodel Connector {\n  id            String                   @id @db.Char(36)\n  userId        String                   @unique @map(\"user_id\") @db.Char(36)\n  firstName     String                   @map(\"first_name\") @db.VarChar(100)\n  lastName      String                   @map(\"last_name\") @db.VarChar(100)\n  phone         String?                  @unique @db.VarChar(20)\n  email         String?                  @db.VarChar(255)\n  region        String?                  @db.VarChar(100)\n  status        String                   @db.VarChar(50)\n  platformRole  String?                  @map(\"platform_role\") @db.VarChar(50)\n  createdAt     DateTime                 @map(\"created_at\")\n  updatedAt     DateTime?                @map(\"updated_at\")\n  createdBy     String?                  @map(\"created_by\") @db.Char(36)\n  updatedBy     String?                  @map(\"updated_by\") @db.Char(36)\n  hierarchies   HierarchyMapping[]       @relation(\"ConnectorHierarchies\")\n  managed       HierarchyMapping[]       @relation(\"ManagerHierarchies\")\n  statusHistory ConnectorStatusHistory[]\n  performance   ConnectorPerformance?\n  payoutSlabs   PayoutSlab[]\n  commissions   CommissionTransaction[]\n\n  @@index([email])\n  @@map(\"connectors\")\n}\n\nmodel HierarchyMapping {\n  id          String     @id @db.Char(36)\n  connectorId String?    @map(\"connector_id\") @db.Char(36)\n  managerId   String?    @map(\"manager_id\") @db.Char(36)\n  role        String     @db.VarChar(50)\n  assignedAt  DateTime   @map(\"assigned_at\")\n  assignedBy  String?    @map(\"assigned_by\") @db.Char(36)\n  connector   Connector? @relation(\"ConnectorHierarchies\", fields: [connectorId], references: [id])\n  manager     Connector? @relation(\"ManagerHierarchies\", fields: [managerId], references: [id])\n\n  @@map(\"hierarchy_mapping\")\n}\n\nmodel ConnectorStatusHistory {\n  id          String     @id @db.Char(36)\n  connectorId String?    @map(\"connector_id\") @db.Char(36)\n  status      String     @db.VarChar(50)\n  changedAt   DateTime   @map(\"changed_at\")\n  changedBy   String?    @map(\"changed_by\") @db.Char(36)\n  remarks     String?    @db.Text\n  connector   Connector? @relation(fields: [connectorId], references: [id])\n\n  @@map(\"connector_status_history\")\n}\n\nmodel ConnectorPerformance {\n  id               String     @id @db.Char(36)\n  connectorId      String?    @unique @map(\"connector_id\") @db.Char(36)\n  totalLeads       Int        @default(0) @map(\"total_leads\")\n  convertedLeads   Int        @default(0) @map(\"converted_leads\")\n  totalCommission  Decimal    @default(0) @map(\"total_commission\") @db.Decimal(15, 2)\n  lastCalculatedAt DateTime?  @map(\"last_calculated_at\")\n  connector        Connector? @relation(fields: [connectorId], references: [id])\n\n  @@map(\"connector_performance\")\n}\n\nmodel CommissionRule {\n  id             String  @id @db.Char(36)\n  ruleName       String  @unique @map(\"rule_name\") @db.VarChar(100)\n  connectorRate  Decimal @map(\"connector_rate\") @db.Decimal(5, 4)\n  tlOverrideRate Decimal @default(0) @map(\"tl_override_rate\") @db.Decimal(5, 4)\n  rmOverrideRate Decimal @default(0) @map(\"rm_override_rate\") @db.Decimal(5, 4)\n  isActive       Boolean @default(true) @map(\"is_active\")\n\n  @@map(\"commission_rules\")\n}\n\nmodel CommissionTransaction {\n  id                  String          @id @db.Char(36)\n  loanId              String          @map(\"loan_id\") @db.Char(36)\n  connectorId         String          @map(\"connector_id\") @db.Char(36)\n  loanAmount          Decimal         @map(\"loan_amount\") @db.Decimal(15, 2)\n  connectorRate       Decimal         @map(\"connector_rate\") @db.Decimal(5, 4)\n  connectorCommission Decimal         @map(\"connector_commission\") @db.Decimal(15, 2)\n  teamLeaderOverride  Decimal?        @map(\"team_leader_override\") @db.Decimal(15, 2)\n  rmOverride          Decimal?        @map(\"rm_override\") @db.Decimal(15, 2)\n  totalPayout         Decimal         @map(\"total_payout\") @db.Decimal(15, 2)\n  status              String          @db.VarChar(50)\n  amountPaid          Decimal         @default(0) @map(\"amount_paid\") @db.Decimal(15, 2)\n  paymentDate         DateTime?       @map(\"payment_date\")\n  createdAt           DateTime        @map(\"created_at\")\n  connector           Connector       @relation(fields: [connectorId], references: [id])\n  payoutHistory       PayoutHistory[]\n\n  @@map(\"commission_transactions\")\n}\n\nmodel PayoutHistory {\n  id            String                 @id @db.Char(36)\n  transactionId String?                @map(\"transaction_id\") @db.Char(36)\n  paidAmount    Decimal                @map(\"paid_amount\") @db.Decimal(15, 2)\n  paidAt        DateTime               @map(\"paid_at\")\n  paidBy        String?                @map(\"paid_by\") @db.Char(36)\n  transaction   CommissionTransaction? @relation(fields: [transactionId], references: [id])\n\n  @@map(\"payout_history\")\n}\n\nmodel PayoutSlab {\n  id                    String     @id @db.Char(36)\n  connectorId           String?    @map(\"connector_id\") @db.Char(36)\n  bankName              String     @map(\"bank_name\") @db.VarChar(100)\n  productCategory       String     @map(\"product_category\") @db.VarChar(100)\n  payoutRate            Decimal    @map(\"payout_rate\") @db.Decimal(5, 4)\n  minDisbursementAmount Decimal?   @map(\"min_disbursement_amount\") @db.Decimal(15, 2)\n  status                String     @db.VarChar(50)\n  createdAt             DateTime   @map(\"created_at\")\n  updatedAt             DateTime?  @map(\"updated_at\")\n  connector             Connector? @relation(fields: [connectorId], references: [id])\n\n  @@map(\"payout_slabs\")\n}\n\nmodel SalesManager {\n  id              String           @id @db.Char(36)\n  userId          String           @unique @map(\"user_id\") @db.Char(36)\n  branchId        String?          @map(\"branch_id\") @db.VarChar(50)\n  approvalRate    Decimal          @default(0.0) @map(\"approval_rate\") @db.Decimal(5, 2)\n  tatScore        Decimal          @default(0.0) @map(\"tat_score\") @db.Decimal(5, 2)\n  currentCapacity Int              @default(0) @map(\"current_capacity\")\n  maxCapacity     Int              @default(100) @map(\"max_capacity\")\n  experienceScore Decimal          @default(0.0) @map(\"experience_score\") @db.Decimal(5, 2)\n  isActive        Boolean          @default(true) @map(\"is_active\")\n  createdAt       DateTime         @map(\"created_at\")\n  updatedAt       DateTime?        @map(\"updated_at\")\n  routingHistory  RoutingHistory[]\n\n  @@map(\"sales_managers\")\n}\n\nmodel RoutingHistory {\n  id           String        @id @db.Char(36)\n  loanId       String        @map(\"loan_id\") @db.Char(36)\n  assignedSmId String?       @map(\"assigned_sm_id\") @db.Char(36)\n  routingScore Decimal?      @map(\"routing_score\") @db.Decimal(10, 4)\n  assignedAt   DateTime      @map(\"assigned_at\")\n  manager      SalesManager? @relation(fields: [assignedSmId], references: [id])\n\n  @@map(\"routing_history\")\n}\n\nmodel FoirAssessment {\n  id                         String   @id @db.Char(36)\n  userId                     String   @map(\"user_id\") @db.Char(36)\n  loanType                   String   @map(\"loan_type\") @db.VarChar(50)\n  grossMonthlyIncome         Decimal  @map(\"gross_monthly_income\") @db.Decimal(15, 2)\n  existingMonthlyObligations Decimal  @map(\"existing_monthly_obligations\") @db.Decimal(15, 2)\n  requestedLoanAmount        Decimal  @map(\"requested_loan_amount\") @db.Decimal(15, 2)\n  requestedTenureMonths      Int      @map(\"requested_tenure_months\")\n  annualInterestRate         Decimal  @map(\"annual_interest_rate\") @db.Decimal(5, 2)\n  calculatedFoirPercentage   Decimal  @map(\"calculated_foir_percentage\") @db.Decimal(5, 2)\n  maxEligibleEmi             Decimal  @map(\"max_eligible_emi\") @db.Decimal(15, 2)\n  maxEligibleLoanAmount      Decimal  @map(\"max_eligible_loan_amount\") @db.Decimal(15, 2)\n  postLoanFoirPercentage     Decimal  @map(\"post_loan_foir_percentage\") @db.Decimal(5, 2)\n  eligibilityStatus          String   @map(\"eligibility_status\") @db.VarChar(20)\n  foirLimitApplied           Decimal  @map(\"foir_limit_applied\") @db.Decimal(5, 2)\n  incomeSource               String   @map(\"income_source\") @db.VarChar(50)\n  assessmentNotes            String?  @map(\"assessment_notes\") @db.Text\n  createdAt                  DateTime @map(\"created_at\")\n  updatedAt                  DateTime @map(\"updated_at\")\n\n  @@index([userId])\n  @@index([loanType])\n  @@index([eligibilityStatus])\n  @@index([createdAt])\n  @@map(\"foir_assessments\")\n}\n",
  "inlineSchemaHash": "bd6f6741b2ec85c15dc1b902ac1d9d0b9fbee13c59aef50a9d65b2e32d2b4834",
  "copyEngine": true
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "src/generated/prisma-salesops",
    "generated/prisma-salesops",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"Connector\":{\"dbName\":\"connectors\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"firstName\",\"dbName\":\"first_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastName\",\"dbName\":\"last_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phone\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"region\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"platformRole\",\"dbName\":\"platform_role\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdBy\",\"dbName\":\"created_by\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedBy\",\"dbName\":\"updated_by\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hierarchies\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"HierarchyMapping\",\"relationName\":\"ConnectorHierarchies\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"managed\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"HierarchyMapping\",\"relationName\":\"ManagerHierarchies\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"statusHistory\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ConnectorStatusHistory\",\"relationName\":\"ConnectorToConnectorStatusHistory\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"performance\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ConnectorPerformance\",\"relationName\":\"ConnectorToConnectorPerformance\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payoutSlabs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PayoutSlab\",\"relationName\":\"ConnectorToPayoutSlab\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"commissions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CommissionTransaction\",\"relationName\":\"CommissionTransactionToConnector\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"HierarchyMapping\":{\"dbName\":\"hierarchy_mapping\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"connectorId\",\"dbName\":\"connector_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"managerId\",\"dbName\":\"manager_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"assignedAt\",\"dbName\":\"assigned_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"assignedBy\",\"dbName\":\"assigned_by\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"connector\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Connector\",\"relationName\":\"ConnectorHierarchies\",\"relationFromFields\":[\"connectorId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"manager\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Connector\",\"relationName\":\"ManagerHierarchies\",\"relationFromFields\":[\"managerId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ConnectorStatusHistory\":{\"dbName\":\"connector_status_history\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"connectorId\",\"dbName\":\"connector_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"changedAt\",\"dbName\":\"changed_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"changedBy\",\"dbName\":\"changed_by\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"remarks\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"connector\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Connector\",\"relationName\":\"ConnectorToConnectorStatusHistory\",\"relationFromFields\":[\"connectorId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ConnectorPerformance\":{\"dbName\":\"connector_performance\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"connectorId\",\"dbName\":\"connector_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalLeads\",\"dbName\":\"total_leads\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"convertedLeads\",\"dbName\":\"converted_leads\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalCommission\",\"dbName\":\"total_commission\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastCalculatedAt\",\"dbName\":\"last_calculated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"connector\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Connector\",\"relationName\":\"ConnectorToConnectorPerformance\",\"relationFromFields\":[\"connectorId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CommissionRule\":{\"dbName\":\"commission_rules\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ruleName\",\"dbName\":\"rule_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"connectorRate\",\"dbName\":\"connector_rate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tlOverrideRate\",\"dbName\":\"tl_override_rate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rmOverrideRate\",\"dbName\":\"rm_override_rate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"dbName\":\"is_active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CommissionTransaction\":{\"dbName\":\"commission_transactions\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"loanId\",\"dbName\":\"loan_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"connectorId\",\"dbName\":\"connector_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"loanAmount\",\"dbName\":\"loan_amount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"connectorRate\",\"dbName\":\"connector_rate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"connectorCommission\",\"dbName\":\"connector_commission\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"teamLeaderOverride\",\"dbName\":\"team_leader_override\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rmOverride\",\"dbName\":\"rm_override\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalPayout\",\"dbName\":\"total_payout\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"amountPaid\",\"dbName\":\"amount_paid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"paymentDate\",\"dbName\":\"payment_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"connector\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Connector\",\"relationName\":\"CommissionTransactionToConnector\",\"relationFromFields\":[\"connectorId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payoutHistory\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PayoutHistory\",\"relationName\":\"CommissionTransactionToPayoutHistory\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PayoutHistory\":{\"dbName\":\"payout_history\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"transactionId\",\"dbName\":\"transaction_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"paidAmount\",\"dbName\":\"paid_amount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"paidAt\",\"dbName\":\"paid_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"paidBy\",\"dbName\":\"paid_by\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"transaction\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CommissionTransaction\",\"relationName\":\"CommissionTransactionToPayoutHistory\",\"relationFromFields\":[\"transactionId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PayoutSlab\":{\"dbName\":\"payout_slabs\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"connectorId\",\"dbName\":\"connector_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bankName\",\"dbName\":\"bank_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"productCategory\",\"dbName\":\"product_category\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payoutRate\",\"dbName\":\"payout_rate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"minDisbursementAmount\",\"dbName\":\"min_disbursement_amount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"connector\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Connector\",\"relationName\":\"ConnectorToPayoutSlab\",\"relationFromFields\":[\"connectorId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"SalesManager\":{\"dbName\":\"sales_managers\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"branchId\",\"dbName\":\"branch_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"approvalRate\",\"dbName\":\"approval_rate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tatScore\",\"dbName\":\"tat_score\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currentCapacity\",\"dbName\":\"current_capacity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"maxCapacity\",\"dbName\":\"max_capacity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":100,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"experienceScore\",\"dbName\":\"experience_score\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"dbName\":\"is_active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"routingHistory\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RoutingHistory\",\"relationName\":\"RoutingHistoryToSalesManager\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"RoutingHistory\":{\"dbName\":\"routing_history\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"loanId\",\"dbName\":\"loan_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"assignedSmId\",\"dbName\":\"assigned_sm_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"routingScore\",\"dbName\":\"routing_score\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"assignedAt\",\"dbName\":\"assigned_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"manager\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SalesManager\",\"relationName\":\"RoutingHistoryToSalesManager\",\"relationFromFields\":[\"assignedSmId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"FoirAssessment\":{\"dbName\":\"foir_assessments\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"loanType\",\"dbName\":\"loan_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"grossMonthlyIncome\",\"dbName\":\"gross_monthly_income\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"existingMonthlyObligations\",\"dbName\":\"existing_monthly_obligations\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestedLoanAmount\",\"dbName\":\"requested_loan_amount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestedTenureMonths\",\"dbName\":\"requested_tenure_months\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"annualInterestRate\",\"dbName\":\"annual_interest_rate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"calculatedFoirPercentage\",\"dbName\":\"calculated_foir_percentage\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"maxEligibleEmi\",\"dbName\":\"max_eligible_emi\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"maxEligibleLoanAmount\",\"dbName\":\"max_eligible_loan_amount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"postLoanFoirPercentage\",\"dbName\":\"post_loan_foir_percentage\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"eligibilityStatus\",\"dbName\":\"eligibility_status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"foirLimitApplied\",\"dbName\":\"foir_limit_applied\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"incomeSource\",\"dbName\":\"income_source\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"assessmentNotes\",\"dbName\":\"assessment_notes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined


const { warnEnvConflicts } = require('./runtime/library.js')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-debian-openssl-3.0.x.so.node");
path.join(process.cwd(), "src/generated/prisma-salesops/libquery_engine-debian-openssl-3.0.x.so.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "src/generated/prisma-salesops/schema.prisma")
