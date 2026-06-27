
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

exports.Prisma.CustomerScalarFieldEnum = {
  id: 'id',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  mobile: 'mobile',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy'
};

exports.Prisma.CustomerKycScalarFieldEnum = {
  id: 'id',
  customerId: 'customerId',
  panNumber: 'panNumber',
  aadhaarNumber: 'aadhaarNumber',
  kycStatus: 'kycStatus',
  verifiedAt: 'verifiedAt'
};

exports.Prisma.CustomerAddressScalarFieldEnum = {
  id: 'id',
  customerId: 'customerId',
  addressType: 'addressType',
  street: 'street',
  city: 'city',
  state: 'state',
  pincode: 'pincode',
  isPrimary: 'isPrimary'
};

exports.Prisma.CustomerHistoryScalarFieldEnum = {
  id: 'id',
  customerId: 'customerId',
  action: 'action',
  description: 'description',
  actionAt: 'actionAt',
  actionBy: 'actionBy'
};

exports.Prisma.LeadScalarFieldEnum = {
  id: 'id',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  mobile: 'mobile',
  panNumber: 'panNumber',
  aadhaarNumber: 'aadhaarNumber',
  loanType: 'loanType',
  loanAmount: 'loanAmount',
  assignedTo: 'assignedTo',
  status: 'status',
  customerId: 'customerId',
  createdAt: 'createdAt',
  profession: 'profession',
  netMonthlySalary: 'netMonthlySalary',
  gender: 'gender',
  maritalStatus: 'maritalStatus',
  dob: 'dob',
  alternateContact: 'alternateContact',
  whatsappNo: 'whatsappNo',
  officialEmail: 'officialEmail',
  currentAddressLine1: 'currentAddressLine1',
  currentAddressLine2: 'currentAddressLine2',
  currentState: 'currentState',
  currentDistrict: 'currentDistrict',
  currentCity: 'currentCity',
  currentPincode: 'currentPincode',
  residenceType: 'residenceType',
  permanentAddressLine1: 'permanentAddressLine1',
  permanentAddressLine2: 'permanentAddressLine2',
  permanentState: 'permanentState',
  permanentDistrict: 'permanentDistrict',
  permanentCity: 'permanentCity',
  permanentPincode: 'permanentPincode',
  jobType: 'jobType',
  designation: 'designation',
  modeOfSalary: 'modeOfSalary',
  officeAddress: 'officeAddress',
  officeState: 'officeState',
  officeDistrict: 'officeDistrict',
  officeCity: 'officeCity',
  officePincode: 'officePincode',
  existingEmi: 'existingEmi',
  hasPriorPersonalLoan: 'hasPriorPersonalLoan',
  opsNotes: 'opsNotes',
  companyName: 'companyName',
  notes: 'notes',
  totalAttempts: 'totalAttempts',
  lastCalledAt: 'lastCalledAt',
  nextCallbackAt: 'nextCallbackAt',
  lastDisposition: 'lastDisposition'
};

exports.Prisma.CallLogScalarFieldEnum = {
  id: 'id',
  leadId: 'leadId',
  telecallerId: 'telecallerId',
  telecallerEmail: 'telecallerEmail',
  disposition: 'disposition',
  notes: 'notes',
  durationSeconds: 'durationSeconds',
  attemptNumber: 'attemptNumber',
  nextCallbackAt: 'nextCallbackAt',
  calledAt: 'calledAt'
};

exports.Prisma.DocumentScalarFieldEnum = {
  id: 'id',
  loanId: 'loanId',
  uploadedBy: 'uploadedBy',
  documentType: 'documentType',
  s3Key: 's3Key',
  fileName: 'fileName',
  mimeType: 'mimeType',
  fileSizeBytes: 'fileSizeBytes',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  ownerId: 'ownerId',
  folderPath: 'folderPath',
  reviewerId: 'reviewerId',
  reviewRemarks: 'reviewRemarks',
  reviewedAt: 'reviewedAt'
};

exports.Prisma.DocumentVersionScalarFieldEnum = {
  id: 'id',
  documentId: 'documentId',
  versionNumber: 'versionNumber',
  s3Key: 's3Key',
  uploadedAt: 'uploadedAt',
  uploadedBy: 'uploadedBy'
};

exports.Prisma.DocumentAccessLogScalarFieldEnum = {
  id: 'id',
  documentId: 'documentId',
  accessedBy: 'accessedBy',
  accessType: 'accessType',
  accessedAt: 'accessedAt'
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
  Customer: 'Customer',
  CustomerKyc: 'CustomerKyc',
  CustomerAddress: 'CustomerAddress',
  CustomerHistory: 'CustomerHistory',
  Lead: 'Lead',
  CallLog: 'CallLog',
  Document: 'Document',
  DocumentVersion: 'DocumentVersion',
  DocumentAccessLog: 'DocumentAccessLog'
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
