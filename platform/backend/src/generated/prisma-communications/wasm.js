
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

exports.Prisma.ConversationScalarFieldEnum = {
  id: 'id',
  connectorId: 'connectorId',
  rmId: 'rmId',
  loanApplicationId: 'loanApplicationId',
  assignedOpsUserId: 'assignedOpsUserId',
  conversationStatus: 'conversationStatus',
  conversationType: 'conversationType',
  customerName: 'customerName',
  customerPhone: 'customerPhone',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MessageScalarFieldEnum = {
  id: 'id',
  conversationId: 'conversationId',
  senderType: 'senderType',
  internalSenderId: 'internalSenderId',
  messageChannel: 'messageChannel',
  messageBody: 'messageBody',
  messageType: 'messageType',
  deliveryStatus: 'deliveryStatus',
  whatsappMessageId: 'whatsappMessageId',
  traceId: 'traceId',
  createdAt: 'createdAt'
};

exports.Prisma.MessageAttachmentScalarFieldEnum = {
  id: 'id',
  messageId: 'messageId',
  fileName: 'fileName',
  fileType: 'fileType',
  s3Key: 's3Key',
  fileSize: 'fileSize',
  createdAt: 'createdAt'
};

exports.Prisma.MessageDeliveryStatusScalarFieldEnum = {
  id: 'id',
  messageId: 'messageId',
  status: 'status',
  timestamp: 'timestamp',
  remarks: 'remarks'
};

exports.Prisma.WhatsappWebhookLogScalarFieldEnum = {
  id: 'id',
  payload: 'payload',
  processedStatus: 'processedStatus',
  errorMessage: 'errorMessage',
  createdAt: 'createdAt'
};

exports.Prisma.NotificationTemplateScalarFieldEnum = {
  id: 'id',
  templateName: 'templateName',
  channel: 'channel',
  contentTemplate: 'contentTemplate',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.UnreadMessageTrackingScalarFieldEnum = {
  userId: 'userId',
  conversationId: 'conversationId',
  unreadCount: 'unreadCount'
};

exports.Prisma.WebsocketSessionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  connectedAt: 'connectedAt',
  lastHeartbeat: 'lastHeartbeat'
};

exports.Prisma.TeamMeetingRoomScalarFieldEnum = {
  id: 'id',
  roomKey: 'roomKey',
  createdAt: 'createdAt'
};

exports.Prisma.TeamMeetingMessageScalarFieldEnum = {
  id: 'id',
  roomKey: 'roomKey',
  senderId: 'senderId',
  senderName: 'senderName',
  senderRole: 'senderRole',
  senderInitials: 'senderInitials',
  body: 'body',
  messageType: 'messageType',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.WhatsappMessageTemplateScalarFieldEnum = {
  id: 'id',
  templateName: 'templateName',
  templateBody: 'templateBody',
  templateCategory: 'templateCategory',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  recipientId: 'recipientId',
  channel: 'channel',
  type: 'type',
  status: 'status',
  content: 'content',
  title: 'title',
  read: 'read',
  idempotencyKey: 'idempotencyKey',
  retryCount: 'retryCount',
  createdAt: 'createdAt'
};

exports.Prisma.NotificationDeliveryLogScalarFieldEnum = {
  id: 'id',
  notificationId: 'notificationId',
  deliveryStatus: 'deliveryStatus',
  providerResponse: 'providerResponse',
  attemptedAt: 'attemptedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};


exports.Prisma.ModelName = {
  Conversation: 'Conversation',
  Message: 'Message',
  MessageAttachment: 'MessageAttachment',
  MessageDeliveryStatus: 'MessageDeliveryStatus',
  WhatsappWebhookLog: 'WhatsappWebhookLog',
  NotificationTemplate: 'NotificationTemplate',
  UnreadMessageTracking: 'UnreadMessageTracking',
  WebsocketSession: 'WebsocketSession',
  TeamMeetingRoom: 'TeamMeetingRoom',
  TeamMeetingMessage: 'TeamMeetingMessage',
  WhatsappMessageTemplate: 'WhatsappMessageTemplate',
  Notification: 'Notification',
  NotificationDeliveryLog: 'NotificationDeliveryLog'
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
