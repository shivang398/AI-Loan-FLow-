
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Conversation
 * 
 */
export type Conversation = $Result.DefaultSelection<Prisma.$ConversationPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model MessageAttachment
 * 
 */
export type MessageAttachment = $Result.DefaultSelection<Prisma.$MessageAttachmentPayload>
/**
 * Model MessageDeliveryStatus
 * 
 */
export type MessageDeliveryStatus = $Result.DefaultSelection<Prisma.$MessageDeliveryStatusPayload>
/**
 * Model WhatsappWebhookLog
 * 
 */
export type WhatsappWebhookLog = $Result.DefaultSelection<Prisma.$WhatsappWebhookLogPayload>
/**
 * Model NotificationTemplate
 * 
 */
export type NotificationTemplate = $Result.DefaultSelection<Prisma.$NotificationTemplatePayload>
/**
 * Model UnreadMessageTracking
 * 
 */
export type UnreadMessageTracking = $Result.DefaultSelection<Prisma.$UnreadMessageTrackingPayload>
/**
 * Model WebsocketSession
 * 
 */
export type WebsocketSession = $Result.DefaultSelection<Prisma.$WebsocketSessionPayload>
/**
 * Model TeamMeetingRoom
 * 
 */
export type TeamMeetingRoom = $Result.DefaultSelection<Prisma.$TeamMeetingRoomPayload>
/**
 * Model TeamMeetingMessage
 * 
 */
export type TeamMeetingMessage = $Result.DefaultSelection<Prisma.$TeamMeetingMessagePayload>
/**
 * Model WhatsappMessageTemplate
 * 
 */
export type WhatsappMessageTemplate = $Result.DefaultSelection<Prisma.$WhatsappMessageTemplatePayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model NotificationDeliveryLog
 * 
 */
export type NotificationDeliveryLog = $Result.DefaultSelection<Prisma.$NotificationDeliveryLogPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Conversations
 * const conversations = await prisma.conversation.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Conversations
   * const conversations = await prisma.conversation.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.conversation`: Exposes CRUD operations for the **Conversation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Conversations
    * const conversations = await prisma.conversation.findMany()
    * ```
    */
  get conversation(): Prisma.ConversationDelegate<ExtArgs>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs>;

  /**
   * `prisma.messageAttachment`: Exposes CRUD operations for the **MessageAttachment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MessageAttachments
    * const messageAttachments = await prisma.messageAttachment.findMany()
    * ```
    */
  get messageAttachment(): Prisma.MessageAttachmentDelegate<ExtArgs>;

  /**
   * `prisma.messageDeliveryStatus`: Exposes CRUD operations for the **MessageDeliveryStatus** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MessageDeliveryStatuses
    * const messageDeliveryStatuses = await prisma.messageDeliveryStatus.findMany()
    * ```
    */
  get messageDeliveryStatus(): Prisma.MessageDeliveryStatusDelegate<ExtArgs>;

  /**
   * `prisma.whatsappWebhookLog`: Exposes CRUD operations for the **WhatsappWebhookLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WhatsappWebhookLogs
    * const whatsappWebhookLogs = await prisma.whatsappWebhookLog.findMany()
    * ```
    */
  get whatsappWebhookLog(): Prisma.WhatsappWebhookLogDelegate<ExtArgs>;

  /**
   * `prisma.notificationTemplate`: Exposes CRUD operations for the **NotificationTemplate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NotificationTemplates
    * const notificationTemplates = await prisma.notificationTemplate.findMany()
    * ```
    */
  get notificationTemplate(): Prisma.NotificationTemplateDelegate<ExtArgs>;

  /**
   * `prisma.unreadMessageTracking`: Exposes CRUD operations for the **UnreadMessageTracking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UnreadMessageTrackings
    * const unreadMessageTrackings = await prisma.unreadMessageTracking.findMany()
    * ```
    */
  get unreadMessageTracking(): Prisma.UnreadMessageTrackingDelegate<ExtArgs>;

  /**
   * `prisma.websocketSession`: Exposes CRUD operations for the **WebsocketSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WebsocketSessions
    * const websocketSessions = await prisma.websocketSession.findMany()
    * ```
    */
  get websocketSession(): Prisma.WebsocketSessionDelegate<ExtArgs>;

  /**
   * `prisma.teamMeetingRoom`: Exposes CRUD operations for the **TeamMeetingRoom** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TeamMeetingRooms
    * const teamMeetingRooms = await prisma.teamMeetingRoom.findMany()
    * ```
    */
  get teamMeetingRoom(): Prisma.TeamMeetingRoomDelegate<ExtArgs>;

  /**
   * `prisma.teamMeetingMessage`: Exposes CRUD operations for the **TeamMeetingMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TeamMeetingMessages
    * const teamMeetingMessages = await prisma.teamMeetingMessage.findMany()
    * ```
    */
  get teamMeetingMessage(): Prisma.TeamMeetingMessageDelegate<ExtArgs>;

  /**
   * `prisma.whatsappMessageTemplate`: Exposes CRUD operations for the **WhatsappMessageTemplate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WhatsappMessageTemplates
    * const whatsappMessageTemplates = await prisma.whatsappMessageTemplate.findMany()
    * ```
    */
  get whatsappMessageTemplate(): Prisma.WhatsappMessageTemplateDelegate<ExtArgs>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs>;

  /**
   * `prisma.notificationDeliveryLog`: Exposes CRUD operations for the **NotificationDeliveryLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NotificationDeliveryLogs
    * const notificationDeliveryLogs = await prisma.notificationDeliveryLog.findMany()
    * ```
    */
  get notificationDeliveryLog(): Prisma.NotificationDeliveryLogDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "conversation" | "message" | "messageAttachment" | "messageDeliveryStatus" | "whatsappWebhookLog" | "notificationTemplate" | "unreadMessageTracking" | "websocketSession" | "teamMeetingRoom" | "teamMeetingMessage" | "whatsappMessageTemplate" | "notification" | "notificationDeliveryLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Conversation: {
        payload: Prisma.$ConversationPayload<ExtArgs>
        fields: Prisma.ConversationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConversationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConversationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findFirst: {
            args: Prisma.ConversationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConversationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findMany: {
            args: Prisma.ConversationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          create: {
            args: Prisma.ConversationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          createMany: {
            args: Prisma.ConversationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ConversationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          update: {
            args: Prisma.ConversationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          deleteMany: {
            args: Prisma.ConversationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConversationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ConversationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          aggregate: {
            args: Prisma.ConversationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConversation>
          }
          groupBy: {
            args: Prisma.ConversationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConversationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConversationCountArgs<ExtArgs>
            result: $Utils.Optional<ConversationCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      MessageAttachment: {
        payload: Prisma.$MessageAttachmentPayload<ExtArgs>
        fields: Prisma.MessageAttachmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageAttachmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageAttachmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageAttachmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageAttachmentPayload>
          }
          findFirst: {
            args: Prisma.MessageAttachmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageAttachmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageAttachmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageAttachmentPayload>
          }
          findMany: {
            args: Prisma.MessageAttachmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageAttachmentPayload>[]
          }
          create: {
            args: Prisma.MessageAttachmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageAttachmentPayload>
          }
          createMany: {
            args: Prisma.MessageAttachmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MessageAttachmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageAttachmentPayload>
          }
          update: {
            args: Prisma.MessageAttachmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageAttachmentPayload>
          }
          deleteMany: {
            args: Prisma.MessageAttachmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageAttachmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MessageAttachmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageAttachmentPayload>
          }
          aggregate: {
            args: Prisma.MessageAttachmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessageAttachment>
          }
          groupBy: {
            args: Prisma.MessageAttachmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageAttachmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageAttachmentCountArgs<ExtArgs>
            result: $Utils.Optional<MessageAttachmentCountAggregateOutputType> | number
          }
        }
      }
      MessageDeliveryStatus: {
        payload: Prisma.$MessageDeliveryStatusPayload<ExtArgs>
        fields: Prisma.MessageDeliveryStatusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageDeliveryStatusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageDeliveryStatusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageDeliveryStatusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageDeliveryStatusPayload>
          }
          findFirst: {
            args: Prisma.MessageDeliveryStatusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageDeliveryStatusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageDeliveryStatusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageDeliveryStatusPayload>
          }
          findMany: {
            args: Prisma.MessageDeliveryStatusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageDeliveryStatusPayload>[]
          }
          create: {
            args: Prisma.MessageDeliveryStatusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageDeliveryStatusPayload>
          }
          createMany: {
            args: Prisma.MessageDeliveryStatusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MessageDeliveryStatusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageDeliveryStatusPayload>
          }
          update: {
            args: Prisma.MessageDeliveryStatusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageDeliveryStatusPayload>
          }
          deleteMany: {
            args: Prisma.MessageDeliveryStatusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageDeliveryStatusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MessageDeliveryStatusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageDeliveryStatusPayload>
          }
          aggregate: {
            args: Prisma.MessageDeliveryStatusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessageDeliveryStatus>
          }
          groupBy: {
            args: Prisma.MessageDeliveryStatusGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageDeliveryStatusGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageDeliveryStatusCountArgs<ExtArgs>
            result: $Utils.Optional<MessageDeliveryStatusCountAggregateOutputType> | number
          }
        }
      }
      WhatsappWebhookLog: {
        payload: Prisma.$WhatsappWebhookLogPayload<ExtArgs>
        fields: Prisma.WhatsappWebhookLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WhatsappWebhookLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappWebhookLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WhatsappWebhookLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappWebhookLogPayload>
          }
          findFirst: {
            args: Prisma.WhatsappWebhookLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappWebhookLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WhatsappWebhookLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappWebhookLogPayload>
          }
          findMany: {
            args: Prisma.WhatsappWebhookLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappWebhookLogPayload>[]
          }
          create: {
            args: Prisma.WhatsappWebhookLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappWebhookLogPayload>
          }
          createMany: {
            args: Prisma.WhatsappWebhookLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.WhatsappWebhookLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappWebhookLogPayload>
          }
          update: {
            args: Prisma.WhatsappWebhookLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappWebhookLogPayload>
          }
          deleteMany: {
            args: Prisma.WhatsappWebhookLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WhatsappWebhookLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WhatsappWebhookLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappWebhookLogPayload>
          }
          aggregate: {
            args: Prisma.WhatsappWebhookLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWhatsappWebhookLog>
          }
          groupBy: {
            args: Prisma.WhatsappWebhookLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<WhatsappWebhookLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.WhatsappWebhookLogCountArgs<ExtArgs>
            result: $Utils.Optional<WhatsappWebhookLogCountAggregateOutputType> | number
          }
        }
      }
      NotificationTemplate: {
        payload: Prisma.$NotificationTemplatePayload<ExtArgs>
        fields: Prisma.NotificationTemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationTemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationTemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>
          }
          findFirst: {
            args: Prisma.NotificationTemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationTemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>
          }
          findMany: {
            args: Prisma.NotificationTemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>[]
          }
          create: {
            args: Prisma.NotificationTemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>
          }
          createMany: {
            args: Prisma.NotificationTemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.NotificationTemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>
          }
          update: {
            args: Prisma.NotificationTemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>
          }
          deleteMany: {
            args: Prisma.NotificationTemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationTemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotificationTemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTemplatePayload>
          }
          aggregate: {
            args: Prisma.NotificationTemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotificationTemplate>
          }
          groupBy: {
            args: Prisma.NotificationTemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationTemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationTemplateCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationTemplateCountAggregateOutputType> | number
          }
        }
      }
      UnreadMessageTracking: {
        payload: Prisma.$UnreadMessageTrackingPayload<ExtArgs>
        fields: Prisma.UnreadMessageTrackingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UnreadMessageTrackingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnreadMessageTrackingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UnreadMessageTrackingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnreadMessageTrackingPayload>
          }
          findFirst: {
            args: Prisma.UnreadMessageTrackingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnreadMessageTrackingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UnreadMessageTrackingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnreadMessageTrackingPayload>
          }
          findMany: {
            args: Prisma.UnreadMessageTrackingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnreadMessageTrackingPayload>[]
          }
          create: {
            args: Prisma.UnreadMessageTrackingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnreadMessageTrackingPayload>
          }
          createMany: {
            args: Prisma.UnreadMessageTrackingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UnreadMessageTrackingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnreadMessageTrackingPayload>
          }
          update: {
            args: Prisma.UnreadMessageTrackingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnreadMessageTrackingPayload>
          }
          deleteMany: {
            args: Prisma.UnreadMessageTrackingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UnreadMessageTrackingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UnreadMessageTrackingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnreadMessageTrackingPayload>
          }
          aggregate: {
            args: Prisma.UnreadMessageTrackingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUnreadMessageTracking>
          }
          groupBy: {
            args: Prisma.UnreadMessageTrackingGroupByArgs<ExtArgs>
            result: $Utils.Optional<UnreadMessageTrackingGroupByOutputType>[]
          }
          count: {
            args: Prisma.UnreadMessageTrackingCountArgs<ExtArgs>
            result: $Utils.Optional<UnreadMessageTrackingCountAggregateOutputType> | number
          }
        }
      }
      WebsocketSession: {
        payload: Prisma.$WebsocketSessionPayload<ExtArgs>
        fields: Prisma.WebsocketSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WebsocketSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsocketSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WebsocketSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsocketSessionPayload>
          }
          findFirst: {
            args: Prisma.WebsocketSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsocketSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WebsocketSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsocketSessionPayload>
          }
          findMany: {
            args: Prisma.WebsocketSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsocketSessionPayload>[]
          }
          create: {
            args: Prisma.WebsocketSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsocketSessionPayload>
          }
          createMany: {
            args: Prisma.WebsocketSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.WebsocketSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsocketSessionPayload>
          }
          update: {
            args: Prisma.WebsocketSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsocketSessionPayload>
          }
          deleteMany: {
            args: Prisma.WebsocketSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WebsocketSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WebsocketSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsocketSessionPayload>
          }
          aggregate: {
            args: Prisma.WebsocketSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWebsocketSession>
          }
          groupBy: {
            args: Prisma.WebsocketSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<WebsocketSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.WebsocketSessionCountArgs<ExtArgs>
            result: $Utils.Optional<WebsocketSessionCountAggregateOutputType> | number
          }
        }
      }
      TeamMeetingRoom: {
        payload: Prisma.$TeamMeetingRoomPayload<ExtArgs>
        fields: Prisma.TeamMeetingRoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamMeetingRoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMeetingRoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamMeetingRoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMeetingRoomPayload>
          }
          findFirst: {
            args: Prisma.TeamMeetingRoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMeetingRoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamMeetingRoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMeetingRoomPayload>
          }
          findMany: {
            args: Prisma.TeamMeetingRoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMeetingRoomPayload>[]
          }
          create: {
            args: Prisma.TeamMeetingRoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMeetingRoomPayload>
          }
          createMany: {
            args: Prisma.TeamMeetingRoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TeamMeetingRoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMeetingRoomPayload>
          }
          update: {
            args: Prisma.TeamMeetingRoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMeetingRoomPayload>
          }
          deleteMany: {
            args: Prisma.TeamMeetingRoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamMeetingRoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TeamMeetingRoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMeetingRoomPayload>
          }
          aggregate: {
            args: Prisma.TeamMeetingRoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeamMeetingRoom>
          }
          groupBy: {
            args: Prisma.TeamMeetingRoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamMeetingRoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamMeetingRoomCountArgs<ExtArgs>
            result: $Utils.Optional<TeamMeetingRoomCountAggregateOutputType> | number
          }
        }
      }
      TeamMeetingMessage: {
        payload: Prisma.$TeamMeetingMessagePayload<ExtArgs>
        fields: Prisma.TeamMeetingMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamMeetingMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMeetingMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamMeetingMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMeetingMessagePayload>
          }
          findFirst: {
            args: Prisma.TeamMeetingMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMeetingMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamMeetingMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMeetingMessagePayload>
          }
          findMany: {
            args: Prisma.TeamMeetingMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMeetingMessagePayload>[]
          }
          create: {
            args: Prisma.TeamMeetingMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMeetingMessagePayload>
          }
          createMany: {
            args: Prisma.TeamMeetingMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TeamMeetingMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMeetingMessagePayload>
          }
          update: {
            args: Prisma.TeamMeetingMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMeetingMessagePayload>
          }
          deleteMany: {
            args: Prisma.TeamMeetingMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamMeetingMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TeamMeetingMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMeetingMessagePayload>
          }
          aggregate: {
            args: Prisma.TeamMeetingMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeamMeetingMessage>
          }
          groupBy: {
            args: Prisma.TeamMeetingMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamMeetingMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamMeetingMessageCountArgs<ExtArgs>
            result: $Utils.Optional<TeamMeetingMessageCountAggregateOutputType> | number
          }
        }
      }
      WhatsappMessageTemplate: {
        payload: Prisma.$WhatsappMessageTemplatePayload<ExtArgs>
        fields: Prisma.WhatsappMessageTemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WhatsappMessageTemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappMessageTemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WhatsappMessageTemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappMessageTemplatePayload>
          }
          findFirst: {
            args: Prisma.WhatsappMessageTemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappMessageTemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WhatsappMessageTemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappMessageTemplatePayload>
          }
          findMany: {
            args: Prisma.WhatsappMessageTemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappMessageTemplatePayload>[]
          }
          create: {
            args: Prisma.WhatsappMessageTemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappMessageTemplatePayload>
          }
          createMany: {
            args: Prisma.WhatsappMessageTemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.WhatsappMessageTemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappMessageTemplatePayload>
          }
          update: {
            args: Prisma.WhatsappMessageTemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappMessageTemplatePayload>
          }
          deleteMany: {
            args: Prisma.WhatsappMessageTemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WhatsappMessageTemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WhatsappMessageTemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappMessageTemplatePayload>
          }
          aggregate: {
            args: Prisma.WhatsappMessageTemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWhatsappMessageTemplate>
          }
          groupBy: {
            args: Prisma.WhatsappMessageTemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<WhatsappMessageTemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.WhatsappMessageTemplateCountArgs<ExtArgs>
            result: $Utils.Optional<WhatsappMessageTemplateCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      NotificationDeliveryLog: {
        payload: Prisma.$NotificationDeliveryLogPayload<ExtArgs>
        fields: Prisma.NotificationDeliveryLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationDeliveryLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationDeliveryLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationDeliveryLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationDeliveryLogPayload>
          }
          findFirst: {
            args: Prisma.NotificationDeliveryLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationDeliveryLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationDeliveryLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationDeliveryLogPayload>
          }
          findMany: {
            args: Prisma.NotificationDeliveryLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationDeliveryLogPayload>[]
          }
          create: {
            args: Prisma.NotificationDeliveryLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationDeliveryLogPayload>
          }
          createMany: {
            args: Prisma.NotificationDeliveryLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.NotificationDeliveryLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationDeliveryLogPayload>
          }
          update: {
            args: Prisma.NotificationDeliveryLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationDeliveryLogPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeliveryLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationDeliveryLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotificationDeliveryLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationDeliveryLogPayload>
          }
          aggregate: {
            args: Prisma.NotificationDeliveryLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotificationDeliveryLog>
          }
          groupBy: {
            args: Prisma.NotificationDeliveryLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationDeliveryLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationDeliveryLogCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationDeliveryLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ConversationCountOutputType
   */

  export type ConversationCountOutputType = {
    messages: number
    unreadTracking: number
  }

  export type ConversationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | ConversationCountOutputTypeCountMessagesArgs
    unreadTracking?: boolean | ConversationCountOutputTypeCountUnreadTrackingArgs
  }

  // Custom InputTypes
  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationCountOutputType
     */
    select?: ConversationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountUnreadTrackingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UnreadMessageTrackingWhereInput
  }


  /**
   * Count Type MessageCountOutputType
   */

  export type MessageCountOutputType = {
    attachments: number
    deliveryStatuses: number
  }

  export type MessageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attachments?: boolean | MessageCountOutputTypeCountAttachmentsArgs
    deliveryStatuses?: boolean | MessageCountOutputTypeCountDeliveryStatusesArgs
  }

  // Custom InputTypes
  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageCountOutputType
     */
    select?: MessageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeCountAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageAttachmentWhereInput
  }

  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeCountDeliveryStatusesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageDeliveryStatusWhereInput
  }


  /**
   * Count Type NotificationCountOutputType
   */

  export type NotificationCountOutputType = {
    deliveryLogs: number
  }

  export type NotificationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deliveryLogs?: boolean | NotificationCountOutputTypeCountDeliveryLogsArgs
  }

  // Custom InputTypes
  /**
   * NotificationCountOutputType without action
   */
  export type NotificationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationCountOutputType
     */
    select?: NotificationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * NotificationCountOutputType without action
   */
  export type NotificationCountOutputTypeCountDeliveryLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationDeliveryLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Conversation
   */

  export type AggregateConversation = {
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  export type ConversationMinAggregateOutputType = {
    id: string | null
    connectorId: string | null
    rmId: string | null
    loanApplicationId: string | null
    assignedOpsUserId: string | null
    conversationStatus: string | null
    conversationType: string | null
    customerName: string | null
    customerPhone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConversationMaxAggregateOutputType = {
    id: string | null
    connectorId: string | null
    rmId: string | null
    loanApplicationId: string | null
    assignedOpsUserId: string | null
    conversationStatus: string | null
    conversationType: string | null
    customerName: string | null
    customerPhone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConversationCountAggregateOutputType = {
    id: number
    connectorId: number
    rmId: number
    loanApplicationId: number
    assignedOpsUserId: number
    conversationStatus: number
    conversationType: number
    customerName: number
    customerPhone: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ConversationMinAggregateInputType = {
    id?: true
    connectorId?: true
    rmId?: true
    loanApplicationId?: true
    assignedOpsUserId?: true
    conversationStatus?: true
    conversationType?: true
    customerName?: true
    customerPhone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConversationMaxAggregateInputType = {
    id?: true
    connectorId?: true
    rmId?: true
    loanApplicationId?: true
    assignedOpsUserId?: true
    conversationStatus?: true
    conversationType?: true
    customerName?: true
    customerPhone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConversationCountAggregateInputType = {
    id?: true
    connectorId?: true
    rmId?: true
    loanApplicationId?: true
    assignedOpsUserId?: true
    conversationStatus?: true
    conversationType?: true
    customerName?: true
    customerPhone?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ConversationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversation to aggregate.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Conversations
    **/
    _count?: true | ConversationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConversationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConversationMaxAggregateInputType
  }

  export type GetConversationAggregateType<T extends ConversationAggregateArgs> = {
        [P in keyof T & keyof AggregateConversation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConversation[P]>
      : GetScalarType<T[P], AggregateConversation[P]>
  }




  export type ConversationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithAggregationInput | ConversationOrderByWithAggregationInput[]
    by: ConversationScalarFieldEnum[] | ConversationScalarFieldEnum
    having?: ConversationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConversationCountAggregateInputType | true
    _min?: ConversationMinAggregateInputType
    _max?: ConversationMaxAggregateInputType
  }

  export type ConversationGroupByOutputType = {
    id: string
    connectorId: string | null
    rmId: string | null
    loanApplicationId: string | null
    assignedOpsUserId: string | null
    conversationStatus: string
    conversationType: string
    customerName: string | null
    customerPhone: string | null
    createdAt: Date
    updatedAt: Date
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  type GetConversationGroupByPayload<T extends ConversationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConversationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConversationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConversationGroupByOutputType[P]>
            : GetScalarType<T[P], ConversationGroupByOutputType[P]>
        }
      >
    >


  export type ConversationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    connectorId?: boolean
    rmId?: boolean
    loanApplicationId?: boolean
    assignedOpsUserId?: boolean
    conversationStatus?: boolean
    conversationType?: boolean
    customerName?: boolean
    customerPhone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    unreadTracking?: boolean | Conversation$unreadTrackingArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>


  export type ConversationSelectScalar = {
    id?: boolean
    connectorId?: boolean
    rmId?: boolean
    loanApplicationId?: boolean
    assignedOpsUserId?: boolean
    conversationStatus?: boolean
    conversationType?: boolean
    customerName?: boolean
    customerPhone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ConversationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    unreadTracking?: boolean | Conversation$unreadTrackingArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ConversationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Conversation"
    objects: {
      messages: Prisma.$MessagePayload<ExtArgs>[]
      unreadTracking: Prisma.$UnreadMessageTrackingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      connectorId: string | null
      rmId: string | null
      loanApplicationId: string | null
      assignedOpsUserId: string | null
      conversationStatus: string
      conversationType: string
      customerName: string | null
      customerPhone: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["conversation"]>
    composites: {}
  }

  type ConversationGetPayload<S extends boolean | null | undefined | ConversationDefaultArgs> = $Result.GetResult<Prisma.$ConversationPayload, S>

  type ConversationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ConversationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ConversationCountAggregateInputType | true
    }

  export interface ConversationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Conversation'], meta: { name: 'Conversation' } }
    /**
     * Find zero or one Conversation that matches the filter.
     * @param {ConversationFindUniqueArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConversationFindUniqueArgs>(args: SelectSubset<T, ConversationFindUniqueArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Conversation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ConversationFindUniqueOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConversationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Conversation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConversationFindFirstArgs>(args?: SelectSubset<T, ConversationFindFirstArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Conversation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConversationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Conversations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Conversations
     * const conversations = await prisma.conversation.findMany()
     * 
     * // Get first 10 Conversations
     * const conversations = await prisma.conversation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conversationWithIdOnly = await prisma.conversation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConversationFindManyArgs>(args?: SelectSubset<T, ConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Conversation.
     * @param {ConversationCreateArgs} args - Arguments to create a Conversation.
     * @example
     * // Create one Conversation
     * const Conversation = await prisma.conversation.create({
     *   data: {
     *     // ... data to create a Conversation
     *   }
     * })
     * 
     */
    create<T extends ConversationCreateArgs>(args: SelectSubset<T, ConversationCreateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Conversations.
     * @param {ConversationCreateManyArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConversationCreateManyArgs>(args?: SelectSubset<T, ConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Conversation.
     * @param {ConversationDeleteArgs} args - Arguments to delete one Conversation.
     * @example
     * // Delete one Conversation
     * const Conversation = await prisma.conversation.delete({
     *   where: {
     *     // ... filter to delete one Conversation
     *   }
     * })
     * 
     */
    delete<T extends ConversationDeleteArgs>(args: SelectSubset<T, ConversationDeleteArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Conversation.
     * @param {ConversationUpdateArgs} args - Arguments to update one Conversation.
     * @example
     * // Update one Conversation
     * const conversation = await prisma.conversation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConversationUpdateArgs>(args: SelectSubset<T, ConversationUpdateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Conversations.
     * @param {ConversationDeleteManyArgs} args - Arguments to filter Conversations to delete.
     * @example
     * // Delete a few Conversations
     * const { count } = await prisma.conversation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConversationDeleteManyArgs>(args?: SelectSubset<T, ConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConversationUpdateManyArgs>(args: SelectSubset<T, ConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Conversation.
     * @param {ConversationUpsertArgs} args - Arguments to update or create a Conversation.
     * @example
     * // Update or create a Conversation
     * const conversation = await prisma.conversation.upsert({
     *   create: {
     *     // ... data to create a Conversation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Conversation we want to update
     *   }
     * })
     */
    upsert<T extends ConversationUpsertArgs>(args: SelectSubset<T, ConversationUpsertArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationCountArgs} args - Arguments to filter Conversations to count.
     * @example
     * // Count the number of Conversations
     * const count = await prisma.conversation.count({
     *   where: {
     *     // ... the filter for the Conversations we want to count
     *   }
     * })
    **/
    count<T extends ConversationCountArgs>(
      args?: Subset<T, ConversationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConversationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConversationAggregateArgs>(args: Subset<T, ConversationAggregateArgs>): Prisma.PrismaPromise<GetConversationAggregateType<T>>

    /**
     * Group by Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConversationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConversationGroupByArgs['orderBy'] }
        : { orderBy?: ConversationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Conversation model
   */
  readonly fields: ConversationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Conversation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConversationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    messages<T extends Conversation$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany"> | Null>
    unreadTracking<T extends Conversation$unreadTrackingArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$unreadTrackingArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UnreadMessageTrackingPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Conversation model
   */ 
  interface ConversationFieldRefs {
    readonly id: FieldRef<"Conversation", 'String'>
    readonly connectorId: FieldRef<"Conversation", 'String'>
    readonly rmId: FieldRef<"Conversation", 'String'>
    readonly loanApplicationId: FieldRef<"Conversation", 'String'>
    readonly assignedOpsUserId: FieldRef<"Conversation", 'String'>
    readonly conversationStatus: FieldRef<"Conversation", 'String'>
    readonly conversationType: FieldRef<"Conversation", 'String'>
    readonly customerName: FieldRef<"Conversation", 'String'>
    readonly customerPhone: FieldRef<"Conversation", 'String'>
    readonly createdAt: FieldRef<"Conversation", 'DateTime'>
    readonly updatedAt: FieldRef<"Conversation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Conversation findUnique
   */
  export type ConversationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findUniqueOrThrow
   */
  export type ConversationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findFirst
   */
  export type ConversationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findFirstOrThrow
   */
  export type ConversationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findMany
   */
  export type ConversationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversations to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation create
   */
  export type ConversationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to create a Conversation.
     */
    data: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
  }

  /**
   * Conversation createMany
   */
  export type ConversationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Conversation update
   */
  export type ConversationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to update a Conversation.
     */
    data: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
    /**
     * Choose, which Conversation to update.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation updateMany
   */
  export type ConversationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
  }

  /**
   * Conversation upsert
   */
  export type ConversationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The filter to search for the Conversation to update in case it exists.
     */
    where: ConversationWhereUniqueInput
    /**
     * In case the Conversation found by the `where` argument doesn't exist, create a new Conversation with this data.
     */
    create: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
    /**
     * In case the Conversation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
  }

  /**
   * Conversation delete
   */
  export type ConversationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter which Conversation to delete.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation deleteMany
   */
  export type ConversationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversations to delete
     */
    where?: ConversationWhereInput
  }

  /**
   * Conversation.messages
   */
  export type Conversation$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Conversation.unreadTracking
   */
  export type Conversation$unreadTrackingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnreadMessageTracking
     */
    select?: UnreadMessageTrackingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnreadMessageTrackingInclude<ExtArgs> | null
    where?: UnreadMessageTrackingWhereInput
    orderBy?: UnreadMessageTrackingOrderByWithRelationInput | UnreadMessageTrackingOrderByWithRelationInput[]
    cursor?: UnreadMessageTrackingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UnreadMessageTrackingScalarFieldEnum | UnreadMessageTrackingScalarFieldEnum[]
  }

  /**
   * Conversation without action
   */
  export type ConversationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    conversationId: string | null
    senderType: string | null
    internalSenderId: string | null
    messageChannel: string | null
    messageBody: string | null
    messageType: string | null
    deliveryStatus: string | null
    whatsappMessageId: string | null
    traceId: string | null
    createdAt: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    conversationId: string | null
    senderType: string | null
    internalSenderId: string | null
    messageChannel: string | null
    messageBody: string | null
    messageType: string | null
    deliveryStatus: string | null
    whatsappMessageId: string | null
    traceId: string | null
    createdAt: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    conversationId: number
    senderType: number
    internalSenderId: number
    messageChannel: number
    messageBody: number
    messageType: number
    deliveryStatus: number
    whatsappMessageId: number
    traceId: number
    createdAt: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    conversationId?: true
    senderType?: true
    internalSenderId?: true
    messageChannel?: true
    messageBody?: true
    messageType?: true
    deliveryStatus?: true
    whatsappMessageId?: true
    traceId?: true
    createdAt?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    conversationId?: true
    senderType?: true
    internalSenderId?: true
    messageChannel?: true
    messageBody?: true
    messageType?: true
    deliveryStatus?: true
    whatsappMessageId?: true
    traceId?: true
    createdAt?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    conversationId?: true
    senderType?: true
    internalSenderId?: true
    messageChannel?: true
    messageBody?: true
    messageType?: true
    deliveryStatus?: true
    whatsappMessageId?: true
    traceId?: true
    createdAt?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    conversationId: string
    senderType: string
    internalSenderId: string | null
    messageChannel: string
    messageBody: string | null
    messageType: string
    deliveryStatus: string
    whatsappMessageId: string | null
    traceId: string | null
    createdAt: Date
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    senderType?: boolean
    internalSenderId?: boolean
    messageChannel?: boolean
    messageBody?: boolean
    messageType?: boolean
    deliveryStatus?: boolean
    whatsappMessageId?: boolean
    traceId?: boolean
    createdAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    attachments?: boolean | Message$attachmentsArgs<ExtArgs>
    deliveryStatuses?: boolean | Message$deliveryStatusesArgs<ExtArgs>
    _count?: boolean | MessageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>


  export type MessageSelectScalar = {
    id?: boolean
    conversationId?: boolean
    senderType?: boolean
    internalSenderId?: boolean
    messageChannel?: boolean
    messageBody?: boolean
    messageType?: boolean
    deliveryStatus?: boolean
    whatsappMessageId?: boolean
    traceId?: boolean
    createdAt?: boolean
  }

  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    attachments?: boolean | Message$attachmentsArgs<ExtArgs>
    deliveryStatuses?: boolean | Message$deliveryStatusesArgs<ExtArgs>
    _count?: boolean | MessageCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      conversation: Prisma.$ConversationPayload<ExtArgs>
      attachments: Prisma.$MessageAttachmentPayload<ExtArgs>[]
      deliveryStatuses: Prisma.$MessageDeliveryStatusPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      conversationId: string
      senderType: string
      internalSenderId: string | null
      messageChannel: string
      messageBody: string | null
      messageType: string
      deliveryStatus: string
      whatsappMessageId: string | null
      traceId: string | null
      createdAt: Date
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversation<T extends ConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConversationDefaultArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    attachments<T extends Message$attachmentsArgs<ExtArgs> = {}>(args?: Subset<T, Message$attachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "findMany"> | Null>
    deliveryStatuses<T extends Message$deliveryStatusesArgs<ExtArgs> = {}>(args?: Subset<T, Message$deliveryStatusesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageDeliveryStatusPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */ 
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly conversationId: FieldRef<"Message", 'String'>
    readonly senderType: FieldRef<"Message", 'String'>
    readonly internalSenderId: FieldRef<"Message", 'String'>
    readonly messageChannel: FieldRef<"Message", 'String'>
    readonly messageBody: FieldRef<"Message", 'String'>
    readonly messageType: FieldRef<"Message", 'String'>
    readonly deliveryStatus: FieldRef<"Message", 'String'>
    readonly whatsappMessageId: FieldRef<"Message", 'String'>
    readonly traceId: FieldRef<"Message", 'String'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
  }

  /**
   * Message.attachments
   */
  export type Message$attachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageAttachment
     */
    select?: MessageAttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageAttachmentInclude<ExtArgs> | null
    where?: MessageAttachmentWhereInput
    orderBy?: MessageAttachmentOrderByWithRelationInput | MessageAttachmentOrderByWithRelationInput[]
    cursor?: MessageAttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageAttachmentScalarFieldEnum | MessageAttachmentScalarFieldEnum[]
  }

  /**
   * Message.deliveryStatuses
   */
  export type Message$deliveryStatusesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageDeliveryStatus
     */
    select?: MessageDeliveryStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageDeliveryStatusInclude<ExtArgs> | null
    where?: MessageDeliveryStatusWhereInput
    orderBy?: MessageDeliveryStatusOrderByWithRelationInput | MessageDeliveryStatusOrderByWithRelationInput[]
    cursor?: MessageDeliveryStatusWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageDeliveryStatusScalarFieldEnum | MessageDeliveryStatusScalarFieldEnum[]
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model MessageAttachment
   */

  export type AggregateMessageAttachment = {
    _count: MessageAttachmentCountAggregateOutputType | null
    _avg: MessageAttachmentAvgAggregateOutputType | null
    _sum: MessageAttachmentSumAggregateOutputType | null
    _min: MessageAttachmentMinAggregateOutputType | null
    _max: MessageAttachmentMaxAggregateOutputType | null
  }

  export type MessageAttachmentAvgAggregateOutputType = {
    fileSize: number | null
  }

  export type MessageAttachmentSumAggregateOutputType = {
    fileSize: bigint | null
  }

  export type MessageAttachmentMinAggregateOutputType = {
    id: string | null
    messageId: string | null
    fileName: string | null
    fileType: string | null
    s3Key: string | null
    fileSize: bigint | null
    createdAt: Date | null
  }

  export type MessageAttachmentMaxAggregateOutputType = {
    id: string | null
    messageId: string | null
    fileName: string | null
    fileType: string | null
    s3Key: string | null
    fileSize: bigint | null
    createdAt: Date | null
  }

  export type MessageAttachmentCountAggregateOutputType = {
    id: number
    messageId: number
    fileName: number
    fileType: number
    s3Key: number
    fileSize: number
    createdAt: number
    _all: number
  }


  export type MessageAttachmentAvgAggregateInputType = {
    fileSize?: true
  }

  export type MessageAttachmentSumAggregateInputType = {
    fileSize?: true
  }

  export type MessageAttachmentMinAggregateInputType = {
    id?: true
    messageId?: true
    fileName?: true
    fileType?: true
    s3Key?: true
    fileSize?: true
    createdAt?: true
  }

  export type MessageAttachmentMaxAggregateInputType = {
    id?: true
    messageId?: true
    fileName?: true
    fileType?: true
    s3Key?: true
    fileSize?: true
    createdAt?: true
  }

  export type MessageAttachmentCountAggregateInputType = {
    id?: true
    messageId?: true
    fileName?: true
    fileType?: true
    s3Key?: true
    fileSize?: true
    createdAt?: true
    _all?: true
  }

  export type MessageAttachmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageAttachment to aggregate.
     */
    where?: MessageAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageAttachments to fetch.
     */
    orderBy?: MessageAttachmentOrderByWithRelationInput | MessageAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MessageAttachments
    **/
    _count?: true | MessageAttachmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MessageAttachmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MessageAttachmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageAttachmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageAttachmentMaxAggregateInputType
  }

  export type GetMessageAttachmentAggregateType<T extends MessageAttachmentAggregateArgs> = {
        [P in keyof T & keyof AggregateMessageAttachment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessageAttachment[P]>
      : GetScalarType<T[P], AggregateMessageAttachment[P]>
  }




  export type MessageAttachmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageAttachmentWhereInput
    orderBy?: MessageAttachmentOrderByWithAggregationInput | MessageAttachmentOrderByWithAggregationInput[]
    by: MessageAttachmentScalarFieldEnum[] | MessageAttachmentScalarFieldEnum
    having?: MessageAttachmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageAttachmentCountAggregateInputType | true
    _avg?: MessageAttachmentAvgAggregateInputType
    _sum?: MessageAttachmentSumAggregateInputType
    _min?: MessageAttachmentMinAggregateInputType
    _max?: MessageAttachmentMaxAggregateInputType
  }

  export type MessageAttachmentGroupByOutputType = {
    id: string
    messageId: string
    fileName: string
    fileType: string
    s3Key: string
    fileSize: bigint
    createdAt: Date
    _count: MessageAttachmentCountAggregateOutputType | null
    _avg: MessageAttachmentAvgAggregateOutputType | null
    _sum: MessageAttachmentSumAggregateOutputType | null
    _min: MessageAttachmentMinAggregateOutputType | null
    _max: MessageAttachmentMaxAggregateOutputType | null
  }

  type GetMessageAttachmentGroupByPayload<T extends MessageAttachmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageAttachmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageAttachmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageAttachmentGroupByOutputType[P]>
            : GetScalarType<T[P], MessageAttachmentGroupByOutputType[P]>
        }
      >
    >


  export type MessageAttachmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    fileName?: boolean
    fileType?: boolean
    s3Key?: boolean
    fileSize?: boolean
    createdAt?: boolean
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageAttachment"]>


  export type MessageAttachmentSelectScalar = {
    id?: boolean
    messageId?: boolean
    fileName?: boolean
    fileType?: boolean
    s3Key?: boolean
    fileSize?: boolean
    createdAt?: boolean
  }

  export type MessageAttachmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }

  export type $MessageAttachmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MessageAttachment"
    objects: {
      message: Prisma.$MessagePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      messageId: string
      fileName: string
      fileType: string
      s3Key: string
      fileSize: bigint
      createdAt: Date
    }, ExtArgs["result"]["messageAttachment"]>
    composites: {}
  }

  type MessageAttachmentGetPayload<S extends boolean | null | undefined | MessageAttachmentDefaultArgs> = $Result.GetResult<Prisma.$MessageAttachmentPayload, S>

  type MessageAttachmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MessageAttachmentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MessageAttachmentCountAggregateInputType | true
    }

  export interface MessageAttachmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MessageAttachment'], meta: { name: 'MessageAttachment' } }
    /**
     * Find zero or one MessageAttachment that matches the filter.
     * @param {MessageAttachmentFindUniqueArgs} args - Arguments to find a MessageAttachment
     * @example
     * // Get one MessageAttachment
     * const messageAttachment = await prisma.messageAttachment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageAttachmentFindUniqueArgs>(args: SelectSubset<T, MessageAttachmentFindUniqueArgs<ExtArgs>>): Prisma__MessageAttachmentClient<$Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MessageAttachment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MessageAttachmentFindUniqueOrThrowArgs} args - Arguments to find a MessageAttachment
     * @example
     * // Get one MessageAttachment
     * const messageAttachment = await prisma.messageAttachment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageAttachmentFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageAttachmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageAttachmentClient<$Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MessageAttachment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAttachmentFindFirstArgs} args - Arguments to find a MessageAttachment
     * @example
     * // Get one MessageAttachment
     * const messageAttachment = await prisma.messageAttachment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageAttachmentFindFirstArgs>(args?: SelectSubset<T, MessageAttachmentFindFirstArgs<ExtArgs>>): Prisma__MessageAttachmentClient<$Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MessageAttachment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAttachmentFindFirstOrThrowArgs} args - Arguments to find a MessageAttachment
     * @example
     * // Get one MessageAttachment
     * const messageAttachment = await prisma.messageAttachment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageAttachmentFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageAttachmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageAttachmentClient<$Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MessageAttachments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAttachmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MessageAttachments
     * const messageAttachments = await prisma.messageAttachment.findMany()
     * 
     * // Get first 10 MessageAttachments
     * const messageAttachments = await prisma.messageAttachment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageAttachmentWithIdOnly = await prisma.messageAttachment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageAttachmentFindManyArgs>(args?: SelectSubset<T, MessageAttachmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MessageAttachment.
     * @param {MessageAttachmentCreateArgs} args - Arguments to create a MessageAttachment.
     * @example
     * // Create one MessageAttachment
     * const MessageAttachment = await prisma.messageAttachment.create({
     *   data: {
     *     // ... data to create a MessageAttachment
     *   }
     * })
     * 
     */
    create<T extends MessageAttachmentCreateArgs>(args: SelectSubset<T, MessageAttachmentCreateArgs<ExtArgs>>): Prisma__MessageAttachmentClient<$Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MessageAttachments.
     * @param {MessageAttachmentCreateManyArgs} args - Arguments to create many MessageAttachments.
     * @example
     * // Create many MessageAttachments
     * const messageAttachment = await prisma.messageAttachment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageAttachmentCreateManyArgs>(args?: SelectSubset<T, MessageAttachmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MessageAttachment.
     * @param {MessageAttachmentDeleteArgs} args - Arguments to delete one MessageAttachment.
     * @example
     * // Delete one MessageAttachment
     * const MessageAttachment = await prisma.messageAttachment.delete({
     *   where: {
     *     // ... filter to delete one MessageAttachment
     *   }
     * })
     * 
     */
    delete<T extends MessageAttachmentDeleteArgs>(args: SelectSubset<T, MessageAttachmentDeleteArgs<ExtArgs>>): Prisma__MessageAttachmentClient<$Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MessageAttachment.
     * @param {MessageAttachmentUpdateArgs} args - Arguments to update one MessageAttachment.
     * @example
     * // Update one MessageAttachment
     * const messageAttachment = await prisma.messageAttachment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageAttachmentUpdateArgs>(args: SelectSubset<T, MessageAttachmentUpdateArgs<ExtArgs>>): Prisma__MessageAttachmentClient<$Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MessageAttachments.
     * @param {MessageAttachmentDeleteManyArgs} args - Arguments to filter MessageAttachments to delete.
     * @example
     * // Delete a few MessageAttachments
     * const { count } = await prisma.messageAttachment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageAttachmentDeleteManyArgs>(args?: SelectSubset<T, MessageAttachmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MessageAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAttachmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MessageAttachments
     * const messageAttachment = await prisma.messageAttachment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageAttachmentUpdateManyArgs>(args: SelectSubset<T, MessageAttachmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MessageAttachment.
     * @param {MessageAttachmentUpsertArgs} args - Arguments to update or create a MessageAttachment.
     * @example
     * // Update or create a MessageAttachment
     * const messageAttachment = await prisma.messageAttachment.upsert({
     *   create: {
     *     // ... data to create a MessageAttachment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MessageAttachment we want to update
     *   }
     * })
     */
    upsert<T extends MessageAttachmentUpsertArgs>(args: SelectSubset<T, MessageAttachmentUpsertArgs<ExtArgs>>): Prisma__MessageAttachmentClient<$Result.GetResult<Prisma.$MessageAttachmentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MessageAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAttachmentCountArgs} args - Arguments to filter MessageAttachments to count.
     * @example
     * // Count the number of MessageAttachments
     * const count = await prisma.messageAttachment.count({
     *   where: {
     *     // ... the filter for the MessageAttachments we want to count
     *   }
     * })
    **/
    count<T extends MessageAttachmentCountArgs>(
      args?: Subset<T, MessageAttachmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageAttachmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MessageAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAttachmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAttachmentAggregateArgs>(args: Subset<T, MessageAttachmentAggregateArgs>): Prisma.PrismaPromise<GetMessageAttachmentAggregateType<T>>

    /**
     * Group by MessageAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAttachmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageAttachmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageAttachmentGroupByArgs['orderBy'] }
        : { orderBy?: MessageAttachmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageAttachmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageAttachmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MessageAttachment model
   */
  readonly fields: MessageAttachmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MessageAttachment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageAttachmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    message<T extends MessageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MessageDefaultArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MessageAttachment model
   */ 
  interface MessageAttachmentFieldRefs {
    readonly id: FieldRef<"MessageAttachment", 'String'>
    readonly messageId: FieldRef<"MessageAttachment", 'String'>
    readonly fileName: FieldRef<"MessageAttachment", 'String'>
    readonly fileType: FieldRef<"MessageAttachment", 'String'>
    readonly s3Key: FieldRef<"MessageAttachment", 'String'>
    readonly fileSize: FieldRef<"MessageAttachment", 'BigInt'>
    readonly createdAt: FieldRef<"MessageAttachment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MessageAttachment findUnique
   */
  export type MessageAttachmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageAttachment
     */
    select?: MessageAttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which MessageAttachment to fetch.
     */
    where: MessageAttachmentWhereUniqueInput
  }

  /**
   * MessageAttachment findUniqueOrThrow
   */
  export type MessageAttachmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageAttachment
     */
    select?: MessageAttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which MessageAttachment to fetch.
     */
    where: MessageAttachmentWhereUniqueInput
  }

  /**
   * MessageAttachment findFirst
   */
  export type MessageAttachmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageAttachment
     */
    select?: MessageAttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which MessageAttachment to fetch.
     */
    where?: MessageAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageAttachments to fetch.
     */
    orderBy?: MessageAttachmentOrderByWithRelationInput | MessageAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageAttachments.
     */
    cursor?: MessageAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageAttachments.
     */
    distinct?: MessageAttachmentScalarFieldEnum | MessageAttachmentScalarFieldEnum[]
  }

  /**
   * MessageAttachment findFirstOrThrow
   */
  export type MessageAttachmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageAttachment
     */
    select?: MessageAttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which MessageAttachment to fetch.
     */
    where?: MessageAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageAttachments to fetch.
     */
    orderBy?: MessageAttachmentOrderByWithRelationInput | MessageAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageAttachments.
     */
    cursor?: MessageAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageAttachments.
     */
    distinct?: MessageAttachmentScalarFieldEnum | MessageAttachmentScalarFieldEnum[]
  }

  /**
   * MessageAttachment findMany
   */
  export type MessageAttachmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageAttachment
     */
    select?: MessageAttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which MessageAttachments to fetch.
     */
    where?: MessageAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageAttachments to fetch.
     */
    orderBy?: MessageAttachmentOrderByWithRelationInput | MessageAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MessageAttachments.
     */
    cursor?: MessageAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageAttachments.
     */
    skip?: number
    distinct?: MessageAttachmentScalarFieldEnum | MessageAttachmentScalarFieldEnum[]
  }

  /**
   * MessageAttachment create
   */
  export type MessageAttachmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageAttachment
     */
    select?: MessageAttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageAttachmentInclude<ExtArgs> | null
    /**
     * The data needed to create a MessageAttachment.
     */
    data: XOR<MessageAttachmentCreateInput, MessageAttachmentUncheckedCreateInput>
  }

  /**
   * MessageAttachment createMany
   */
  export type MessageAttachmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MessageAttachments.
     */
    data: MessageAttachmentCreateManyInput | MessageAttachmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MessageAttachment update
   */
  export type MessageAttachmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageAttachment
     */
    select?: MessageAttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageAttachmentInclude<ExtArgs> | null
    /**
     * The data needed to update a MessageAttachment.
     */
    data: XOR<MessageAttachmentUpdateInput, MessageAttachmentUncheckedUpdateInput>
    /**
     * Choose, which MessageAttachment to update.
     */
    where: MessageAttachmentWhereUniqueInput
  }

  /**
   * MessageAttachment updateMany
   */
  export type MessageAttachmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MessageAttachments.
     */
    data: XOR<MessageAttachmentUpdateManyMutationInput, MessageAttachmentUncheckedUpdateManyInput>
    /**
     * Filter which MessageAttachments to update
     */
    where?: MessageAttachmentWhereInput
  }

  /**
   * MessageAttachment upsert
   */
  export type MessageAttachmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageAttachment
     */
    select?: MessageAttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageAttachmentInclude<ExtArgs> | null
    /**
     * The filter to search for the MessageAttachment to update in case it exists.
     */
    where: MessageAttachmentWhereUniqueInput
    /**
     * In case the MessageAttachment found by the `where` argument doesn't exist, create a new MessageAttachment with this data.
     */
    create: XOR<MessageAttachmentCreateInput, MessageAttachmentUncheckedCreateInput>
    /**
     * In case the MessageAttachment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageAttachmentUpdateInput, MessageAttachmentUncheckedUpdateInput>
  }

  /**
   * MessageAttachment delete
   */
  export type MessageAttachmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageAttachment
     */
    select?: MessageAttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageAttachmentInclude<ExtArgs> | null
    /**
     * Filter which MessageAttachment to delete.
     */
    where: MessageAttachmentWhereUniqueInput
  }

  /**
   * MessageAttachment deleteMany
   */
  export type MessageAttachmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageAttachments to delete
     */
    where?: MessageAttachmentWhereInput
  }

  /**
   * MessageAttachment without action
   */
  export type MessageAttachmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageAttachment
     */
    select?: MessageAttachmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageAttachmentInclude<ExtArgs> | null
  }


  /**
   * Model MessageDeliveryStatus
   */

  export type AggregateMessageDeliveryStatus = {
    _count: MessageDeliveryStatusCountAggregateOutputType | null
    _min: MessageDeliveryStatusMinAggregateOutputType | null
    _max: MessageDeliveryStatusMaxAggregateOutputType | null
  }

  export type MessageDeliveryStatusMinAggregateOutputType = {
    id: string | null
    messageId: string | null
    status: string | null
    timestamp: Date | null
    remarks: string | null
  }

  export type MessageDeliveryStatusMaxAggregateOutputType = {
    id: string | null
    messageId: string | null
    status: string | null
    timestamp: Date | null
    remarks: string | null
  }

  export type MessageDeliveryStatusCountAggregateOutputType = {
    id: number
    messageId: number
    status: number
    timestamp: number
    remarks: number
    _all: number
  }


  export type MessageDeliveryStatusMinAggregateInputType = {
    id?: true
    messageId?: true
    status?: true
    timestamp?: true
    remarks?: true
  }

  export type MessageDeliveryStatusMaxAggregateInputType = {
    id?: true
    messageId?: true
    status?: true
    timestamp?: true
    remarks?: true
  }

  export type MessageDeliveryStatusCountAggregateInputType = {
    id?: true
    messageId?: true
    status?: true
    timestamp?: true
    remarks?: true
    _all?: true
  }

  export type MessageDeliveryStatusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageDeliveryStatus to aggregate.
     */
    where?: MessageDeliveryStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageDeliveryStatuses to fetch.
     */
    orderBy?: MessageDeliveryStatusOrderByWithRelationInput | MessageDeliveryStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageDeliveryStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageDeliveryStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageDeliveryStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MessageDeliveryStatuses
    **/
    _count?: true | MessageDeliveryStatusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageDeliveryStatusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageDeliveryStatusMaxAggregateInputType
  }

  export type GetMessageDeliveryStatusAggregateType<T extends MessageDeliveryStatusAggregateArgs> = {
        [P in keyof T & keyof AggregateMessageDeliveryStatus]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessageDeliveryStatus[P]>
      : GetScalarType<T[P], AggregateMessageDeliveryStatus[P]>
  }




  export type MessageDeliveryStatusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageDeliveryStatusWhereInput
    orderBy?: MessageDeliveryStatusOrderByWithAggregationInput | MessageDeliveryStatusOrderByWithAggregationInput[]
    by: MessageDeliveryStatusScalarFieldEnum[] | MessageDeliveryStatusScalarFieldEnum
    having?: MessageDeliveryStatusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageDeliveryStatusCountAggregateInputType | true
    _min?: MessageDeliveryStatusMinAggregateInputType
    _max?: MessageDeliveryStatusMaxAggregateInputType
  }

  export type MessageDeliveryStatusGroupByOutputType = {
    id: string
    messageId: string
    status: string
    timestamp: Date
    remarks: string | null
    _count: MessageDeliveryStatusCountAggregateOutputType | null
    _min: MessageDeliveryStatusMinAggregateOutputType | null
    _max: MessageDeliveryStatusMaxAggregateOutputType | null
  }

  type GetMessageDeliveryStatusGroupByPayload<T extends MessageDeliveryStatusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageDeliveryStatusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageDeliveryStatusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageDeliveryStatusGroupByOutputType[P]>
            : GetScalarType<T[P], MessageDeliveryStatusGroupByOutputType[P]>
        }
      >
    >


  export type MessageDeliveryStatusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    status?: boolean
    timestamp?: boolean
    remarks?: boolean
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageDeliveryStatus"]>


  export type MessageDeliveryStatusSelectScalar = {
    id?: boolean
    messageId?: boolean
    status?: boolean
    timestamp?: boolean
    remarks?: boolean
  }

  export type MessageDeliveryStatusInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    message?: boolean | MessageDefaultArgs<ExtArgs>
  }

  export type $MessageDeliveryStatusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MessageDeliveryStatus"
    objects: {
      message: Prisma.$MessagePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      messageId: string
      status: string
      timestamp: Date
      remarks: string | null
    }, ExtArgs["result"]["messageDeliveryStatus"]>
    composites: {}
  }

  type MessageDeliveryStatusGetPayload<S extends boolean | null | undefined | MessageDeliveryStatusDefaultArgs> = $Result.GetResult<Prisma.$MessageDeliveryStatusPayload, S>

  type MessageDeliveryStatusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MessageDeliveryStatusFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MessageDeliveryStatusCountAggregateInputType | true
    }

  export interface MessageDeliveryStatusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MessageDeliveryStatus'], meta: { name: 'MessageDeliveryStatus' } }
    /**
     * Find zero or one MessageDeliveryStatus that matches the filter.
     * @param {MessageDeliveryStatusFindUniqueArgs} args - Arguments to find a MessageDeliveryStatus
     * @example
     * // Get one MessageDeliveryStatus
     * const messageDeliveryStatus = await prisma.messageDeliveryStatus.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageDeliveryStatusFindUniqueArgs>(args: SelectSubset<T, MessageDeliveryStatusFindUniqueArgs<ExtArgs>>): Prisma__MessageDeliveryStatusClient<$Result.GetResult<Prisma.$MessageDeliveryStatusPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MessageDeliveryStatus that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MessageDeliveryStatusFindUniqueOrThrowArgs} args - Arguments to find a MessageDeliveryStatus
     * @example
     * // Get one MessageDeliveryStatus
     * const messageDeliveryStatus = await prisma.messageDeliveryStatus.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageDeliveryStatusFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageDeliveryStatusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageDeliveryStatusClient<$Result.GetResult<Prisma.$MessageDeliveryStatusPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MessageDeliveryStatus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageDeliveryStatusFindFirstArgs} args - Arguments to find a MessageDeliveryStatus
     * @example
     * // Get one MessageDeliveryStatus
     * const messageDeliveryStatus = await prisma.messageDeliveryStatus.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageDeliveryStatusFindFirstArgs>(args?: SelectSubset<T, MessageDeliveryStatusFindFirstArgs<ExtArgs>>): Prisma__MessageDeliveryStatusClient<$Result.GetResult<Prisma.$MessageDeliveryStatusPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MessageDeliveryStatus that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageDeliveryStatusFindFirstOrThrowArgs} args - Arguments to find a MessageDeliveryStatus
     * @example
     * // Get one MessageDeliveryStatus
     * const messageDeliveryStatus = await prisma.messageDeliveryStatus.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageDeliveryStatusFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageDeliveryStatusFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageDeliveryStatusClient<$Result.GetResult<Prisma.$MessageDeliveryStatusPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MessageDeliveryStatuses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageDeliveryStatusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MessageDeliveryStatuses
     * const messageDeliveryStatuses = await prisma.messageDeliveryStatus.findMany()
     * 
     * // Get first 10 MessageDeliveryStatuses
     * const messageDeliveryStatuses = await prisma.messageDeliveryStatus.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageDeliveryStatusWithIdOnly = await prisma.messageDeliveryStatus.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageDeliveryStatusFindManyArgs>(args?: SelectSubset<T, MessageDeliveryStatusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageDeliveryStatusPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MessageDeliveryStatus.
     * @param {MessageDeliveryStatusCreateArgs} args - Arguments to create a MessageDeliveryStatus.
     * @example
     * // Create one MessageDeliveryStatus
     * const MessageDeliveryStatus = await prisma.messageDeliveryStatus.create({
     *   data: {
     *     // ... data to create a MessageDeliveryStatus
     *   }
     * })
     * 
     */
    create<T extends MessageDeliveryStatusCreateArgs>(args: SelectSubset<T, MessageDeliveryStatusCreateArgs<ExtArgs>>): Prisma__MessageDeliveryStatusClient<$Result.GetResult<Prisma.$MessageDeliveryStatusPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MessageDeliveryStatuses.
     * @param {MessageDeliveryStatusCreateManyArgs} args - Arguments to create many MessageDeliveryStatuses.
     * @example
     * // Create many MessageDeliveryStatuses
     * const messageDeliveryStatus = await prisma.messageDeliveryStatus.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageDeliveryStatusCreateManyArgs>(args?: SelectSubset<T, MessageDeliveryStatusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MessageDeliveryStatus.
     * @param {MessageDeliveryStatusDeleteArgs} args - Arguments to delete one MessageDeliveryStatus.
     * @example
     * // Delete one MessageDeliveryStatus
     * const MessageDeliveryStatus = await prisma.messageDeliveryStatus.delete({
     *   where: {
     *     // ... filter to delete one MessageDeliveryStatus
     *   }
     * })
     * 
     */
    delete<T extends MessageDeliveryStatusDeleteArgs>(args: SelectSubset<T, MessageDeliveryStatusDeleteArgs<ExtArgs>>): Prisma__MessageDeliveryStatusClient<$Result.GetResult<Prisma.$MessageDeliveryStatusPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MessageDeliveryStatus.
     * @param {MessageDeliveryStatusUpdateArgs} args - Arguments to update one MessageDeliveryStatus.
     * @example
     * // Update one MessageDeliveryStatus
     * const messageDeliveryStatus = await prisma.messageDeliveryStatus.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageDeliveryStatusUpdateArgs>(args: SelectSubset<T, MessageDeliveryStatusUpdateArgs<ExtArgs>>): Prisma__MessageDeliveryStatusClient<$Result.GetResult<Prisma.$MessageDeliveryStatusPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MessageDeliveryStatuses.
     * @param {MessageDeliveryStatusDeleteManyArgs} args - Arguments to filter MessageDeliveryStatuses to delete.
     * @example
     * // Delete a few MessageDeliveryStatuses
     * const { count } = await prisma.messageDeliveryStatus.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeliveryStatusDeleteManyArgs>(args?: SelectSubset<T, MessageDeliveryStatusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MessageDeliveryStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageDeliveryStatusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MessageDeliveryStatuses
     * const messageDeliveryStatus = await prisma.messageDeliveryStatus.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageDeliveryStatusUpdateManyArgs>(args: SelectSubset<T, MessageDeliveryStatusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MessageDeliveryStatus.
     * @param {MessageDeliveryStatusUpsertArgs} args - Arguments to update or create a MessageDeliveryStatus.
     * @example
     * // Update or create a MessageDeliveryStatus
     * const messageDeliveryStatus = await prisma.messageDeliveryStatus.upsert({
     *   create: {
     *     // ... data to create a MessageDeliveryStatus
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MessageDeliveryStatus we want to update
     *   }
     * })
     */
    upsert<T extends MessageDeliveryStatusUpsertArgs>(args: SelectSubset<T, MessageDeliveryStatusUpsertArgs<ExtArgs>>): Prisma__MessageDeliveryStatusClient<$Result.GetResult<Prisma.$MessageDeliveryStatusPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MessageDeliveryStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageDeliveryStatusCountArgs} args - Arguments to filter MessageDeliveryStatuses to count.
     * @example
     * // Count the number of MessageDeliveryStatuses
     * const count = await prisma.messageDeliveryStatus.count({
     *   where: {
     *     // ... the filter for the MessageDeliveryStatuses we want to count
     *   }
     * })
    **/
    count<T extends MessageDeliveryStatusCountArgs>(
      args?: Subset<T, MessageDeliveryStatusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageDeliveryStatusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MessageDeliveryStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageDeliveryStatusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageDeliveryStatusAggregateArgs>(args: Subset<T, MessageDeliveryStatusAggregateArgs>): Prisma.PrismaPromise<GetMessageDeliveryStatusAggregateType<T>>

    /**
     * Group by MessageDeliveryStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageDeliveryStatusGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageDeliveryStatusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageDeliveryStatusGroupByArgs['orderBy'] }
        : { orderBy?: MessageDeliveryStatusGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageDeliveryStatusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageDeliveryStatusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MessageDeliveryStatus model
   */
  readonly fields: MessageDeliveryStatusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MessageDeliveryStatus.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageDeliveryStatusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    message<T extends MessageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MessageDefaultArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MessageDeliveryStatus model
   */ 
  interface MessageDeliveryStatusFieldRefs {
    readonly id: FieldRef<"MessageDeliveryStatus", 'String'>
    readonly messageId: FieldRef<"MessageDeliveryStatus", 'String'>
    readonly status: FieldRef<"MessageDeliveryStatus", 'String'>
    readonly timestamp: FieldRef<"MessageDeliveryStatus", 'DateTime'>
    readonly remarks: FieldRef<"MessageDeliveryStatus", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MessageDeliveryStatus findUnique
   */
  export type MessageDeliveryStatusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageDeliveryStatus
     */
    select?: MessageDeliveryStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageDeliveryStatusInclude<ExtArgs> | null
    /**
     * Filter, which MessageDeliveryStatus to fetch.
     */
    where: MessageDeliveryStatusWhereUniqueInput
  }

  /**
   * MessageDeliveryStatus findUniqueOrThrow
   */
  export type MessageDeliveryStatusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageDeliveryStatus
     */
    select?: MessageDeliveryStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageDeliveryStatusInclude<ExtArgs> | null
    /**
     * Filter, which MessageDeliveryStatus to fetch.
     */
    where: MessageDeliveryStatusWhereUniqueInput
  }

  /**
   * MessageDeliveryStatus findFirst
   */
  export type MessageDeliveryStatusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageDeliveryStatus
     */
    select?: MessageDeliveryStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageDeliveryStatusInclude<ExtArgs> | null
    /**
     * Filter, which MessageDeliveryStatus to fetch.
     */
    where?: MessageDeliveryStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageDeliveryStatuses to fetch.
     */
    orderBy?: MessageDeliveryStatusOrderByWithRelationInput | MessageDeliveryStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageDeliveryStatuses.
     */
    cursor?: MessageDeliveryStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageDeliveryStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageDeliveryStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageDeliveryStatuses.
     */
    distinct?: MessageDeliveryStatusScalarFieldEnum | MessageDeliveryStatusScalarFieldEnum[]
  }

  /**
   * MessageDeliveryStatus findFirstOrThrow
   */
  export type MessageDeliveryStatusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageDeliveryStatus
     */
    select?: MessageDeliveryStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageDeliveryStatusInclude<ExtArgs> | null
    /**
     * Filter, which MessageDeliveryStatus to fetch.
     */
    where?: MessageDeliveryStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageDeliveryStatuses to fetch.
     */
    orderBy?: MessageDeliveryStatusOrderByWithRelationInput | MessageDeliveryStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageDeliveryStatuses.
     */
    cursor?: MessageDeliveryStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageDeliveryStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageDeliveryStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageDeliveryStatuses.
     */
    distinct?: MessageDeliveryStatusScalarFieldEnum | MessageDeliveryStatusScalarFieldEnum[]
  }

  /**
   * MessageDeliveryStatus findMany
   */
  export type MessageDeliveryStatusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageDeliveryStatus
     */
    select?: MessageDeliveryStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageDeliveryStatusInclude<ExtArgs> | null
    /**
     * Filter, which MessageDeliveryStatuses to fetch.
     */
    where?: MessageDeliveryStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageDeliveryStatuses to fetch.
     */
    orderBy?: MessageDeliveryStatusOrderByWithRelationInput | MessageDeliveryStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MessageDeliveryStatuses.
     */
    cursor?: MessageDeliveryStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageDeliveryStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageDeliveryStatuses.
     */
    skip?: number
    distinct?: MessageDeliveryStatusScalarFieldEnum | MessageDeliveryStatusScalarFieldEnum[]
  }

  /**
   * MessageDeliveryStatus create
   */
  export type MessageDeliveryStatusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageDeliveryStatus
     */
    select?: MessageDeliveryStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageDeliveryStatusInclude<ExtArgs> | null
    /**
     * The data needed to create a MessageDeliveryStatus.
     */
    data: XOR<MessageDeliveryStatusCreateInput, MessageDeliveryStatusUncheckedCreateInput>
  }

  /**
   * MessageDeliveryStatus createMany
   */
  export type MessageDeliveryStatusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MessageDeliveryStatuses.
     */
    data: MessageDeliveryStatusCreateManyInput | MessageDeliveryStatusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MessageDeliveryStatus update
   */
  export type MessageDeliveryStatusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageDeliveryStatus
     */
    select?: MessageDeliveryStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageDeliveryStatusInclude<ExtArgs> | null
    /**
     * The data needed to update a MessageDeliveryStatus.
     */
    data: XOR<MessageDeliveryStatusUpdateInput, MessageDeliveryStatusUncheckedUpdateInput>
    /**
     * Choose, which MessageDeliveryStatus to update.
     */
    where: MessageDeliveryStatusWhereUniqueInput
  }

  /**
   * MessageDeliveryStatus updateMany
   */
  export type MessageDeliveryStatusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MessageDeliveryStatuses.
     */
    data: XOR<MessageDeliveryStatusUpdateManyMutationInput, MessageDeliveryStatusUncheckedUpdateManyInput>
    /**
     * Filter which MessageDeliveryStatuses to update
     */
    where?: MessageDeliveryStatusWhereInput
  }

  /**
   * MessageDeliveryStatus upsert
   */
  export type MessageDeliveryStatusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageDeliveryStatus
     */
    select?: MessageDeliveryStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageDeliveryStatusInclude<ExtArgs> | null
    /**
     * The filter to search for the MessageDeliveryStatus to update in case it exists.
     */
    where: MessageDeliveryStatusWhereUniqueInput
    /**
     * In case the MessageDeliveryStatus found by the `where` argument doesn't exist, create a new MessageDeliveryStatus with this data.
     */
    create: XOR<MessageDeliveryStatusCreateInput, MessageDeliveryStatusUncheckedCreateInput>
    /**
     * In case the MessageDeliveryStatus was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageDeliveryStatusUpdateInput, MessageDeliveryStatusUncheckedUpdateInput>
  }

  /**
   * MessageDeliveryStatus delete
   */
  export type MessageDeliveryStatusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageDeliveryStatus
     */
    select?: MessageDeliveryStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageDeliveryStatusInclude<ExtArgs> | null
    /**
     * Filter which MessageDeliveryStatus to delete.
     */
    where: MessageDeliveryStatusWhereUniqueInput
  }

  /**
   * MessageDeliveryStatus deleteMany
   */
  export type MessageDeliveryStatusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageDeliveryStatuses to delete
     */
    where?: MessageDeliveryStatusWhereInput
  }

  /**
   * MessageDeliveryStatus without action
   */
  export type MessageDeliveryStatusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageDeliveryStatus
     */
    select?: MessageDeliveryStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageDeliveryStatusInclude<ExtArgs> | null
  }


  /**
   * Model WhatsappWebhookLog
   */

  export type AggregateWhatsappWebhookLog = {
    _count: WhatsappWebhookLogCountAggregateOutputType | null
    _min: WhatsappWebhookLogMinAggregateOutputType | null
    _max: WhatsappWebhookLogMaxAggregateOutputType | null
  }

  export type WhatsappWebhookLogMinAggregateOutputType = {
    id: string | null
    processedStatus: string | null
    errorMessage: string | null
    createdAt: Date | null
  }

  export type WhatsappWebhookLogMaxAggregateOutputType = {
    id: string | null
    processedStatus: string | null
    errorMessage: string | null
    createdAt: Date | null
  }

  export type WhatsappWebhookLogCountAggregateOutputType = {
    id: number
    payload: number
    processedStatus: number
    errorMessage: number
    createdAt: number
    _all: number
  }


  export type WhatsappWebhookLogMinAggregateInputType = {
    id?: true
    processedStatus?: true
    errorMessage?: true
    createdAt?: true
  }

  export type WhatsappWebhookLogMaxAggregateInputType = {
    id?: true
    processedStatus?: true
    errorMessage?: true
    createdAt?: true
  }

  export type WhatsappWebhookLogCountAggregateInputType = {
    id?: true
    payload?: true
    processedStatus?: true
    errorMessage?: true
    createdAt?: true
    _all?: true
  }

  export type WhatsappWebhookLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WhatsappWebhookLog to aggregate.
     */
    where?: WhatsappWebhookLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WhatsappWebhookLogs to fetch.
     */
    orderBy?: WhatsappWebhookLogOrderByWithRelationInput | WhatsappWebhookLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WhatsappWebhookLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WhatsappWebhookLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WhatsappWebhookLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WhatsappWebhookLogs
    **/
    _count?: true | WhatsappWebhookLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WhatsappWebhookLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WhatsappWebhookLogMaxAggregateInputType
  }

  export type GetWhatsappWebhookLogAggregateType<T extends WhatsappWebhookLogAggregateArgs> = {
        [P in keyof T & keyof AggregateWhatsappWebhookLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWhatsappWebhookLog[P]>
      : GetScalarType<T[P], AggregateWhatsappWebhookLog[P]>
  }




  export type WhatsappWebhookLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WhatsappWebhookLogWhereInput
    orderBy?: WhatsappWebhookLogOrderByWithAggregationInput | WhatsappWebhookLogOrderByWithAggregationInput[]
    by: WhatsappWebhookLogScalarFieldEnum[] | WhatsappWebhookLogScalarFieldEnum
    having?: WhatsappWebhookLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WhatsappWebhookLogCountAggregateInputType | true
    _min?: WhatsappWebhookLogMinAggregateInputType
    _max?: WhatsappWebhookLogMaxAggregateInputType
  }

  export type WhatsappWebhookLogGroupByOutputType = {
    id: string
    payload: JsonValue
    processedStatus: string
    errorMessage: string | null
    createdAt: Date
    _count: WhatsappWebhookLogCountAggregateOutputType | null
    _min: WhatsappWebhookLogMinAggregateOutputType | null
    _max: WhatsappWebhookLogMaxAggregateOutputType | null
  }

  type GetWhatsappWebhookLogGroupByPayload<T extends WhatsappWebhookLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WhatsappWebhookLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WhatsappWebhookLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WhatsappWebhookLogGroupByOutputType[P]>
            : GetScalarType<T[P], WhatsappWebhookLogGroupByOutputType[P]>
        }
      >
    >


  export type WhatsappWebhookLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    payload?: boolean
    processedStatus?: boolean
    errorMessage?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["whatsappWebhookLog"]>


  export type WhatsappWebhookLogSelectScalar = {
    id?: boolean
    payload?: boolean
    processedStatus?: boolean
    errorMessage?: boolean
    createdAt?: boolean
  }


  export type $WhatsappWebhookLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WhatsappWebhookLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      payload: Prisma.JsonValue
      processedStatus: string
      errorMessage: string | null
      createdAt: Date
    }, ExtArgs["result"]["whatsappWebhookLog"]>
    composites: {}
  }

  type WhatsappWebhookLogGetPayload<S extends boolean | null | undefined | WhatsappWebhookLogDefaultArgs> = $Result.GetResult<Prisma.$WhatsappWebhookLogPayload, S>

  type WhatsappWebhookLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WhatsappWebhookLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WhatsappWebhookLogCountAggregateInputType | true
    }

  export interface WhatsappWebhookLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WhatsappWebhookLog'], meta: { name: 'WhatsappWebhookLog' } }
    /**
     * Find zero or one WhatsappWebhookLog that matches the filter.
     * @param {WhatsappWebhookLogFindUniqueArgs} args - Arguments to find a WhatsappWebhookLog
     * @example
     * // Get one WhatsappWebhookLog
     * const whatsappWebhookLog = await prisma.whatsappWebhookLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WhatsappWebhookLogFindUniqueArgs>(args: SelectSubset<T, WhatsappWebhookLogFindUniqueArgs<ExtArgs>>): Prisma__WhatsappWebhookLogClient<$Result.GetResult<Prisma.$WhatsappWebhookLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one WhatsappWebhookLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WhatsappWebhookLogFindUniqueOrThrowArgs} args - Arguments to find a WhatsappWebhookLog
     * @example
     * // Get one WhatsappWebhookLog
     * const whatsappWebhookLog = await prisma.whatsappWebhookLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WhatsappWebhookLogFindUniqueOrThrowArgs>(args: SelectSubset<T, WhatsappWebhookLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WhatsappWebhookLogClient<$Result.GetResult<Prisma.$WhatsappWebhookLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first WhatsappWebhookLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsappWebhookLogFindFirstArgs} args - Arguments to find a WhatsappWebhookLog
     * @example
     * // Get one WhatsappWebhookLog
     * const whatsappWebhookLog = await prisma.whatsappWebhookLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WhatsappWebhookLogFindFirstArgs>(args?: SelectSubset<T, WhatsappWebhookLogFindFirstArgs<ExtArgs>>): Prisma__WhatsappWebhookLogClient<$Result.GetResult<Prisma.$WhatsappWebhookLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first WhatsappWebhookLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsappWebhookLogFindFirstOrThrowArgs} args - Arguments to find a WhatsappWebhookLog
     * @example
     * // Get one WhatsappWebhookLog
     * const whatsappWebhookLog = await prisma.whatsappWebhookLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WhatsappWebhookLogFindFirstOrThrowArgs>(args?: SelectSubset<T, WhatsappWebhookLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__WhatsappWebhookLogClient<$Result.GetResult<Prisma.$WhatsappWebhookLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more WhatsappWebhookLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsappWebhookLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WhatsappWebhookLogs
     * const whatsappWebhookLogs = await prisma.whatsappWebhookLog.findMany()
     * 
     * // Get first 10 WhatsappWebhookLogs
     * const whatsappWebhookLogs = await prisma.whatsappWebhookLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const whatsappWebhookLogWithIdOnly = await prisma.whatsappWebhookLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WhatsappWebhookLogFindManyArgs>(args?: SelectSubset<T, WhatsappWebhookLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WhatsappWebhookLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a WhatsappWebhookLog.
     * @param {WhatsappWebhookLogCreateArgs} args - Arguments to create a WhatsappWebhookLog.
     * @example
     * // Create one WhatsappWebhookLog
     * const WhatsappWebhookLog = await prisma.whatsappWebhookLog.create({
     *   data: {
     *     // ... data to create a WhatsappWebhookLog
     *   }
     * })
     * 
     */
    create<T extends WhatsappWebhookLogCreateArgs>(args: SelectSubset<T, WhatsappWebhookLogCreateArgs<ExtArgs>>): Prisma__WhatsappWebhookLogClient<$Result.GetResult<Prisma.$WhatsappWebhookLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many WhatsappWebhookLogs.
     * @param {WhatsappWebhookLogCreateManyArgs} args - Arguments to create many WhatsappWebhookLogs.
     * @example
     * // Create many WhatsappWebhookLogs
     * const whatsappWebhookLog = await prisma.whatsappWebhookLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WhatsappWebhookLogCreateManyArgs>(args?: SelectSubset<T, WhatsappWebhookLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a WhatsappWebhookLog.
     * @param {WhatsappWebhookLogDeleteArgs} args - Arguments to delete one WhatsappWebhookLog.
     * @example
     * // Delete one WhatsappWebhookLog
     * const WhatsappWebhookLog = await prisma.whatsappWebhookLog.delete({
     *   where: {
     *     // ... filter to delete one WhatsappWebhookLog
     *   }
     * })
     * 
     */
    delete<T extends WhatsappWebhookLogDeleteArgs>(args: SelectSubset<T, WhatsappWebhookLogDeleteArgs<ExtArgs>>): Prisma__WhatsappWebhookLogClient<$Result.GetResult<Prisma.$WhatsappWebhookLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one WhatsappWebhookLog.
     * @param {WhatsappWebhookLogUpdateArgs} args - Arguments to update one WhatsappWebhookLog.
     * @example
     * // Update one WhatsappWebhookLog
     * const whatsappWebhookLog = await prisma.whatsappWebhookLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WhatsappWebhookLogUpdateArgs>(args: SelectSubset<T, WhatsappWebhookLogUpdateArgs<ExtArgs>>): Prisma__WhatsappWebhookLogClient<$Result.GetResult<Prisma.$WhatsappWebhookLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more WhatsappWebhookLogs.
     * @param {WhatsappWebhookLogDeleteManyArgs} args - Arguments to filter WhatsappWebhookLogs to delete.
     * @example
     * // Delete a few WhatsappWebhookLogs
     * const { count } = await prisma.whatsappWebhookLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WhatsappWebhookLogDeleteManyArgs>(args?: SelectSubset<T, WhatsappWebhookLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WhatsappWebhookLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsappWebhookLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WhatsappWebhookLogs
     * const whatsappWebhookLog = await prisma.whatsappWebhookLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WhatsappWebhookLogUpdateManyArgs>(args: SelectSubset<T, WhatsappWebhookLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WhatsappWebhookLog.
     * @param {WhatsappWebhookLogUpsertArgs} args - Arguments to update or create a WhatsappWebhookLog.
     * @example
     * // Update or create a WhatsappWebhookLog
     * const whatsappWebhookLog = await prisma.whatsappWebhookLog.upsert({
     *   create: {
     *     // ... data to create a WhatsappWebhookLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WhatsappWebhookLog we want to update
     *   }
     * })
     */
    upsert<T extends WhatsappWebhookLogUpsertArgs>(args: SelectSubset<T, WhatsappWebhookLogUpsertArgs<ExtArgs>>): Prisma__WhatsappWebhookLogClient<$Result.GetResult<Prisma.$WhatsappWebhookLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of WhatsappWebhookLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsappWebhookLogCountArgs} args - Arguments to filter WhatsappWebhookLogs to count.
     * @example
     * // Count the number of WhatsappWebhookLogs
     * const count = await prisma.whatsappWebhookLog.count({
     *   where: {
     *     // ... the filter for the WhatsappWebhookLogs we want to count
     *   }
     * })
    **/
    count<T extends WhatsappWebhookLogCountArgs>(
      args?: Subset<T, WhatsappWebhookLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WhatsappWebhookLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WhatsappWebhookLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsappWebhookLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WhatsappWebhookLogAggregateArgs>(args: Subset<T, WhatsappWebhookLogAggregateArgs>): Prisma.PrismaPromise<GetWhatsappWebhookLogAggregateType<T>>

    /**
     * Group by WhatsappWebhookLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsappWebhookLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WhatsappWebhookLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WhatsappWebhookLogGroupByArgs['orderBy'] }
        : { orderBy?: WhatsappWebhookLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WhatsappWebhookLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWhatsappWebhookLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WhatsappWebhookLog model
   */
  readonly fields: WhatsappWebhookLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WhatsappWebhookLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WhatsappWebhookLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WhatsappWebhookLog model
   */ 
  interface WhatsappWebhookLogFieldRefs {
    readonly id: FieldRef<"WhatsappWebhookLog", 'String'>
    readonly payload: FieldRef<"WhatsappWebhookLog", 'Json'>
    readonly processedStatus: FieldRef<"WhatsappWebhookLog", 'String'>
    readonly errorMessage: FieldRef<"WhatsappWebhookLog", 'String'>
    readonly createdAt: FieldRef<"WhatsappWebhookLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WhatsappWebhookLog findUnique
   */
  export type WhatsappWebhookLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappWebhookLog
     */
    select?: WhatsappWebhookLogSelect<ExtArgs> | null
    /**
     * Filter, which WhatsappWebhookLog to fetch.
     */
    where: WhatsappWebhookLogWhereUniqueInput
  }

  /**
   * WhatsappWebhookLog findUniqueOrThrow
   */
  export type WhatsappWebhookLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappWebhookLog
     */
    select?: WhatsappWebhookLogSelect<ExtArgs> | null
    /**
     * Filter, which WhatsappWebhookLog to fetch.
     */
    where: WhatsappWebhookLogWhereUniqueInput
  }

  /**
   * WhatsappWebhookLog findFirst
   */
  export type WhatsappWebhookLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappWebhookLog
     */
    select?: WhatsappWebhookLogSelect<ExtArgs> | null
    /**
     * Filter, which WhatsappWebhookLog to fetch.
     */
    where?: WhatsappWebhookLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WhatsappWebhookLogs to fetch.
     */
    orderBy?: WhatsappWebhookLogOrderByWithRelationInput | WhatsappWebhookLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WhatsappWebhookLogs.
     */
    cursor?: WhatsappWebhookLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WhatsappWebhookLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WhatsappWebhookLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WhatsappWebhookLogs.
     */
    distinct?: WhatsappWebhookLogScalarFieldEnum | WhatsappWebhookLogScalarFieldEnum[]
  }

  /**
   * WhatsappWebhookLog findFirstOrThrow
   */
  export type WhatsappWebhookLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappWebhookLog
     */
    select?: WhatsappWebhookLogSelect<ExtArgs> | null
    /**
     * Filter, which WhatsappWebhookLog to fetch.
     */
    where?: WhatsappWebhookLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WhatsappWebhookLogs to fetch.
     */
    orderBy?: WhatsappWebhookLogOrderByWithRelationInput | WhatsappWebhookLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WhatsappWebhookLogs.
     */
    cursor?: WhatsappWebhookLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WhatsappWebhookLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WhatsappWebhookLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WhatsappWebhookLogs.
     */
    distinct?: WhatsappWebhookLogScalarFieldEnum | WhatsappWebhookLogScalarFieldEnum[]
  }

  /**
   * WhatsappWebhookLog findMany
   */
  export type WhatsappWebhookLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappWebhookLog
     */
    select?: WhatsappWebhookLogSelect<ExtArgs> | null
    /**
     * Filter, which WhatsappWebhookLogs to fetch.
     */
    where?: WhatsappWebhookLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WhatsappWebhookLogs to fetch.
     */
    orderBy?: WhatsappWebhookLogOrderByWithRelationInput | WhatsappWebhookLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WhatsappWebhookLogs.
     */
    cursor?: WhatsappWebhookLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WhatsappWebhookLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WhatsappWebhookLogs.
     */
    skip?: number
    distinct?: WhatsappWebhookLogScalarFieldEnum | WhatsappWebhookLogScalarFieldEnum[]
  }

  /**
   * WhatsappWebhookLog create
   */
  export type WhatsappWebhookLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappWebhookLog
     */
    select?: WhatsappWebhookLogSelect<ExtArgs> | null
    /**
     * The data needed to create a WhatsappWebhookLog.
     */
    data: XOR<WhatsappWebhookLogCreateInput, WhatsappWebhookLogUncheckedCreateInput>
  }

  /**
   * WhatsappWebhookLog createMany
   */
  export type WhatsappWebhookLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WhatsappWebhookLogs.
     */
    data: WhatsappWebhookLogCreateManyInput | WhatsappWebhookLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WhatsappWebhookLog update
   */
  export type WhatsappWebhookLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappWebhookLog
     */
    select?: WhatsappWebhookLogSelect<ExtArgs> | null
    /**
     * The data needed to update a WhatsappWebhookLog.
     */
    data: XOR<WhatsappWebhookLogUpdateInput, WhatsappWebhookLogUncheckedUpdateInput>
    /**
     * Choose, which WhatsappWebhookLog to update.
     */
    where: WhatsappWebhookLogWhereUniqueInput
  }

  /**
   * WhatsappWebhookLog updateMany
   */
  export type WhatsappWebhookLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WhatsappWebhookLogs.
     */
    data: XOR<WhatsappWebhookLogUpdateManyMutationInput, WhatsappWebhookLogUncheckedUpdateManyInput>
    /**
     * Filter which WhatsappWebhookLogs to update
     */
    where?: WhatsappWebhookLogWhereInput
  }

  /**
   * WhatsappWebhookLog upsert
   */
  export type WhatsappWebhookLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappWebhookLog
     */
    select?: WhatsappWebhookLogSelect<ExtArgs> | null
    /**
     * The filter to search for the WhatsappWebhookLog to update in case it exists.
     */
    where: WhatsappWebhookLogWhereUniqueInput
    /**
     * In case the WhatsappWebhookLog found by the `where` argument doesn't exist, create a new WhatsappWebhookLog with this data.
     */
    create: XOR<WhatsappWebhookLogCreateInput, WhatsappWebhookLogUncheckedCreateInput>
    /**
     * In case the WhatsappWebhookLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WhatsappWebhookLogUpdateInput, WhatsappWebhookLogUncheckedUpdateInput>
  }

  /**
   * WhatsappWebhookLog delete
   */
  export type WhatsappWebhookLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappWebhookLog
     */
    select?: WhatsappWebhookLogSelect<ExtArgs> | null
    /**
     * Filter which WhatsappWebhookLog to delete.
     */
    where: WhatsappWebhookLogWhereUniqueInput
  }

  /**
   * WhatsappWebhookLog deleteMany
   */
  export type WhatsappWebhookLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WhatsappWebhookLogs to delete
     */
    where?: WhatsappWebhookLogWhereInput
  }

  /**
   * WhatsappWebhookLog without action
   */
  export type WhatsappWebhookLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappWebhookLog
     */
    select?: WhatsappWebhookLogSelect<ExtArgs> | null
  }


  /**
   * Model NotificationTemplate
   */

  export type AggregateNotificationTemplate = {
    _count: NotificationTemplateCountAggregateOutputType | null
    _min: NotificationTemplateMinAggregateOutputType | null
    _max: NotificationTemplateMaxAggregateOutputType | null
  }

  export type NotificationTemplateMinAggregateOutputType = {
    id: string | null
    templateName: string | null
    channel: string | null
    contentTemplate: string | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type NotificationTemplateMaxAggregateOutputType = {
    id: string | null
    templateName: string | null
    channel: string | null
    contentTemplate: string | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type NotificationTemplateCountAggregateOutputType = {
    id: number
    templateName: number
    channel: number
    contentTemplate: number
    isActive: number
    createdAt: number
    _all: number
  }


  export type NotificationTemplateMinAggregateInputType = {
    id?: true
    templateName?: true
    channel?: true
    contentTemplate?: true
    isActive?: true
    createdAt?: true
  }

  export type NotificationTemplateMaxAggregateInputType = {
    id?: true
    templateName?: true
    channel?: true
    contentTemplate?: true
    isActive?: true
    createdAt?: true
  }

  export type NotificationTemplateCountAggregateInputType = {
    id?: true
    templateName?: true
    channel?: true
    contentTemplate?: true
    isActive?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationTemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationTemplate to aggregate.
     */
    where?: NotificationTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationTemplates to fetch.
     */
    orderBy?: NotificationTemplateOrderByWithRelationInput | NotificationTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NotificationTemplates
    **/
    _count?: true | NotificationTemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationTemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationTemplateMaxAggregateInputType
  }

  export type GetNotificationTemplateAggregateType<T extends NotificationTemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateNotificationTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotificationTemplate[P]>
      : GetScalarType<T[P], AggregateNotificationTemplate[P]>
  }




  export type NotificationTemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationTemplateWhereInput
    orderBy?: NotificationTemplateOrderByWithAggregationInput | NotificationTemplateOrderByWithAggregationInput[]
    by: NotificationTemplateScalarFieldEnum[] | NotificationTemplateScalarFieldEnum
    having?: NotificationTemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationTemplateCountAggregateInputType | true
    _min?: NotificationTemplateMinAggregateInputType
    _max?: NotificationTemplateMaxAggregateInputType
  }

  export type NotificationTemplateGroupByOutputType = {
    id: string
    templateName: string
    channel: string
    contentTemplate: string
    isActive: boolean
    createdAt: Date
    _count: NotificationTemplateCountAggregateOutputType | null
    _min: NotificationTemplateMinAggregateOutputType | null
    _max: NotificationTemplateMaxAggregateOutputType | null
  }

  type GetNotificationTemplateGroupByPayload<T extends NotificationTemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationTemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationTemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationTemplateGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationTemplateGroupByOutputType[P]>
        }
      >
    >


  export type NotificationTemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    templateName?: boolean
    channel?: boolean
    contentTemplate?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["notificationTemplate"]>


  export type NotificationTemplateSelectScalar = {
    id?: boolean
    templateName?: boolean
    channel?: boolean
    contentTemplate?: boolean
    isActive?: boolean
    createdAt?: boolean
  }


  export type $NotificationTemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NotificationTemplate"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      templateName: string
      channel: string
      contentTemplate: string
      isActive: boolean
      createdAt: Date
    }, ExtArgs["result"]["notificationTemplate"]>
    composites: {}
  }

  type NotificationTemplateGetPayload<S extends boolean | null | undefined | NotificationTemplateDefaultArgs> = $Result.GetResult<Prisma.$NotificationTemplatePayload, S>

  type NotificationTemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NotificationTemplateFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NotificationTemplateCountAggregateInputType | true
    }

  export interface NotificationTemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NotificationTemplate'], meta: { name: 'NotificationTemplate' } }
    /**
     * Find zero or one NotificationTemplate that matches the filter.
     * @param {NotificationTemplateFindUniqueArgs} args - Arguments to find a NotificationTemplate
     * @example
     * // Get one NotificationTemplate
     * const notificationTemplate = await prisma.notificationTemplate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationTemplateFindUniqueArgs>(args: SelectSubset<T, NotificationTemplateFindUniqueArgs<ExtArgs>>): Prisma__NotificationTemplateClient<$Result.GetResult<Prisma.$NotificationTemplatePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one NotificationTemplate that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NotificationTemplateFindUniqueOrThrowArgs} args - Arguments to find a NotificationTemplate
     * @example
     * // Get one NotificationTemplate
     * const notificationTemplate = await prisma.notificationTemplate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationTemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationTemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationTemplateClient<$Result.GetResult<Prisma.$NotificationTemplatePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first NotificationTemplate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTemplateFindFirstArgs} args - Arguments to find a NotificationTemplate
     * @example
     * // Get one NotificationTemplate
     * const notificationTemplate = await prisma.notificationTemplate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationTemplateFindFirstArgs>(args?: SelectSubset<T, NotificationTemplateFindFirstArgs<ExtArgs>>): Prisma__NotificationTemplateClient<$Result.GetResult<Prisma.$NotificationTemplatePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first NotificationTemplate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTemplateFindFirstOrThrowArgs} args - Arguments to find a NotificationTemplate
     * @example
     * // Get one NotificationTemplate
     * const notificationTemplate = await prisma.notificationTemplate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationTemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationTemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationTemplateClient<$Result.GetResult<Prisma.$NotificationTemplatePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more NotificationTemplates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NotificationTemplates
     * const notificationTemplates = await prisma.notificationTemplate.findMany()
     * 
     * // Get first 10 NotificationTemplates
     * const notificationTemplates = await prisma.notificationTemplate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationTemplateWithIdOnly = await prisma.notificationTemplate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationTemplateFindManyArgs>(args?: SelectSubset<T, NotificationTemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationTemplatePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a NotificationTemplate.
     * @param {NotificationTemplateCreateArgs} args - Arguments to create a NotificationTemplate.
     * @example
     * // Create one NotificationTemplate
     * const NotificationTemplate = await prisma.notificationTemplate.create({
     *   data: {
     *     // ... data to create a NotificationTemplate
     *   }
     * })
     * 
     */
    create<T extends NotificationTemplateCreateArgs>(args: SelectSubset<T, NotificationTemplateCreateArgs<ExtArgs>>): Prisma__NotificationTemplateClient<$Result.GetResult<Prisma.$NotificationTemplatePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many NotificationTemplates.
     * @param {NotificationTemplateCreateManyArgs} args - Arguments to create many NotificationTemplates.
     * @example
     * // Create many NotificationTemplates
     * const notificationTemplate = await prisma.notificationTemplate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationTemplateCreateManyArgs>(args?: SelectSubset<T, NotificationTemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a NotificationTemplate.
     * @param {NotificationTemplateDeleteArgs} args - Arguments to delete one NotificationTemplate.
     * @example
     * // Delete one NotificationTemplate
     * const NotificationTemplate = await prisma.notificationTemplate.delete({
     *   where: {
     *     // ... filter to delete one NotificationTemplate
     *   }
     * })
     * 
     */
    delete<T extends NotificationTemplateDeleteArgs>(args: SelectSubset<T, NotificationTemplateDeleteArgs<ExtArgs>>): Prisma__NotificationTemplateClient<$Result.GetResult<Prisma.$NotificationTemplatePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one NotificationTemplate.
     * @param {NotificationTemplateUpdateArgs} args - Arguments to update one NotificationTemplate.
     * @example
     * // Update one NotificationTemplate
     * const notificationTemplate = await prisma.notificationTemplate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationTemplateUpdateArgs>(args: SelectSubset<T, NotificationTemplateUpdateArgs<ExtArgs>>): Prisma__NotificationTemplateClient<$Result.GetResult<Prisma.$NotificationTemplatePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more NotificationTemplates.
     * @param {NotificationTemplateDeleteManyArgs} args - Arguments to filter NotificationTemplates to delete.
     * @example
     * // Delete a few NotificationTemplates
     * const { count } = await prisma.notificationTemplate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationTemplateDeleteManyArgs>(args?: SelectSubset<T, NotificationTemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NotificationTemplates
     * const notificationTemplate = await prisma.notificationTemplate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationTemplateUpdateManyArgs>(args: SelectSubset<T, NotificationTemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one NotificationTemplate.
     * @param {NotificationTemplateUpsertArgs} args - Arguments to update or create a NotificationTemplate.
     * @example
     * // Update or create a NotificationTemplate
     * const notificationTemplate = await prisma.notificationTemplate.upsert({
     *   create: {
     *     // ... data to create a NotificationTemplate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NotificationTemplate we want to update
     *   }
     * })
     */
    upsert<T extends NotificationTemplateUpsertArgs>(args: SelectSubset<T, NotificationTemplateUpsertArgs<ExtArgs>>): Prisma__NotificationTemplateClient<$Result.GetResult<Prisma.$NotificationTemplatePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of NotificationTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTemplateCountArgs} args - Arguments to filter NotificationTemplates to count.
     * @example
     * // Count the number of NotificationTemplates
     * const count = await prisma.notificationTemplate.count({
     *   where: {
     *     // ... the filter for the NotificationTemplates we want to count
     *   }
     * })
    **/
    count<T extends NotificationTemplateCountArgs>(
      args?: Subset<T, NotificationTemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationTemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NotificationTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationTemplateAggregateArgs>(args: Subset<T, NotificationTemplateAggregateArgs>): Prisma.PrismaPromise<GetNotificationTemplateAggregateType<T>>

    /**
     * Group by NotificationTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTemplateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationTemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationTemplateGroupByArgs['orderBy'] }
        : { orderBy?: NotificationTemplateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NotificationTemplate model
   */
  readonly fields: NotificationTemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NotificationTemplate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationTemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NotificationTemplate model
   */ 
  interface NotificationTemplateFieldRefs {
    readonly id: FieldRef<"NotificationTemplate", 'String'>
    readonly templateName: FieldRef<"NotificationTemplate", 'String'>
    readonly channel: FieldRef<"NotificationTemplate", 'String'>
    readonly contentTemplate: FieldRef<"NotificationTemplate", 'String'>
    readonly isActive: FieldRef<"NotificationTemplate", 'Boolean'>
    readonly createdAt: FieldRef<"NotificationTemplate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NotificationTemplate findUnique
   */
  export type NotificationTemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTemplate
     */
    select?: NotificationTemplateSelect<ExtArgs> | null
    /**
     * Filter, which NotificationTemplate to fetch.
     */
    where: NotificationTemplateWhereUniqueInput
  }

  /**
   * NotificationTemplate findUniqueOrThrow
   */
  export type NotificationTemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTemplate
     */
    select?: NotificationTemplateSelect<ExtArgs> | null
    /**
     * Filter, which NotificationTemplate to fetch.
     */
    where: NotificationTemplateWhereUniqueInput
  }

  /**
   * NotificationTemplate findFirst
   */
  export type NotificationTemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTemplate
     */
    select?: NotificationTemplateSelect<ExtArgs> | null
    /**
     * Filter, which NotificationTemplate to fetch.
     */
    where?: NotificationTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationTemplates to fetch.
     */
    orderBy?: NotificationTemplateOrderByWithRelationInput | NotificationTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationTemplates.
     */
    cursor?: NotificationTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationTemplates.
     */
    distinct?: NotificationTemplateScalarFieldEnum | NotificationTemplateScalarFieldEnum[]
  }

  /**
   * NotificationTemplate findFirstOrThrow
   */
  export type NotificationTemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTemplate
     */
    select?: NotificationTemplateSelect<ExtArgs> | null
    /**
     * Filter, which NotificationTemplate to fetch.
     */
    where?: NotificationTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationTemplates to fetch.
     */
    orderBy?: NotificationTemplateOrderByWithRelationInput | NotificationTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationTemplates.
     */
    cursor?: NotificationTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationTemplates.
     */
    distinct?: NotificationTemplateScalarFieldEnum | NotificationTemplateScalarFieldEnum[]
  }

  /**
   * NotificationTemplate findMany
   */
  export type NotificationTemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTemplate
     */
    select?: NotificationTemplateSelect<ExtArgs> | null
    /**
     * Filter, which NotificationTemplates to fetch.
     */
    where?: NotificationTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationTemplates to fetch.
     */
    orderBy?: NotificationTemplateOrderByWithRelationInput | NotificationTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NotificationTemplates.
     */
    cursor?: NotificationTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationTemplates.
     */
    skip?: number
    distinct?: NotificationTemplateScalarFieldEnum | NotificationTemplateScalarFieldEnum[]
  }

  /**
   * NotificationTemplate create
   */
  export type NotificationTemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTemplate
     */
    select?: NotificationTemplateSelect<ExtArgs> | null
    /**
     * The data needed to create a NotificationTemplate.
     */
    data: XOR<NotificationTemplateCreateInput, NotificationTemplateUncheckedCreateInput>
  }

  /**
   * NotificationTemplate createMany
   */
  export type NotificationTemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NotificationTemplates.
     */
    data: NotificationTemplateCreateManyInput | NotificationTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificationTemplate update
   */
  export type NotificationTemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTemplate
     */
    select?: NotificationTemplateSelect<ExtArgs> | null
    /**
     * The data needed to update a NotificationTemplate.
     */
    data: XOR<NotificationTemplateUpdateInput, NotificationTemplateUncheckedUpdateInput>
    /**
     * Choose, which NotificationTemplate to update.
     */
    where: NotificationTemplateWhereUniqueInput
  }

  /**
   * NotificationTemplate updateMany
   */
  export type NotificationTemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NotificationTemplates.
     */
    data: XOR<NotificationTemplateUpdateManyMutationInput, NotificationTemplateUncheckedUpdateManyInput>
    /**
     * Filter which NotificationTemplates to update
     */
    where?: NotificationTemplateWhereInput
  }

  /**
   * NotificationTemplate upsert
   */
  export type NotificationTemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTemplate
     */
    select?: NotificationTemplateSelect<ExtArgs> | null
    /**
     * The filter to search for the NotificationTemplate to update in case it exists.
     */
    where: NotificationTemplateWhereUniqueInput
    /**
     * In case the NotificationTemplate found by the `where` argument doesn't exist, create a new NotificationTemplate with this data.
     */
    create: XOR<NotificationTemplateCreateInput, NotificationTemplateUncheckedCreateInput>
    /**
     * In case the NotificationTemplate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationTemplateUpdateInput, NotificationTemplateUncheckedUpdateInput>
  }

  /**
   * NotificationTemplate delete
   */
  export type NotificationTemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTemplate
     */
    select?: NotificationTemplateSelect<ExtArgs> | null
    /**
     * Filter which NotificationTemplate to delete.
     */
    where: NotificationTemplateWhereUniqueInput
  }

  /**
   * NotificationTemplate deleteMany
   */
  export type NotificationTemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationTemplates to delete
     */
    where?: NotificationTemplateWhereInput
  }

  /**
   * NotificationTemplate without action
   */
  export type NotificationTemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTemplate
     */
    select?: NotificationTemplateSelect<ExtArgs> | null
  }


  /**
   * Model UnreadMessageTracking
   */

  export type AggregateUnreadMessageTracking = {
    _count: UnreadMessageTrackingCountAggregateOutputType | null
    _avg: UnreadMessageTrackingAvgAggregateOutputType | null
    _sum: UnreadMessageTrackingSumAggregateOutputType | null
    _min: UnreadMessageTrackingMinAggregateOutputType | null
    _max: UnreadMessageTrackingMaxAggregateOutputType | null
  }

  export type UnreadMessageTrackingAvgAggregateOutputType = {
    unreadCount: number | null
  }

  export type UnreadMessageTrackingSumAggregateOutputType = {
    unreadCount: number | null
  }

  export type UnreadMessageTrackingMinAggregateOutputType = {
    userId: string | null
    conversationId: string | null
    unreadCount: number | null
  }

  export type UnreadMessageTrackingMaxAggregateOutputType = {
    userId: string | null
    conversationId: string | null
    unreadCount: number | null
  }

  export type UnreadMessageTrackingCountAggregateOutputType = {
    userId: number
    conversationId: number
    unreadCount: number
    _all: number
  }


  export type UnreadMessageTrackingAvgAggregateInputType = {
    unreadCount?: true
  }

  export type UnreadMessageTrackingSumAggregateInputType = {
    unreadCount?: true
  }

  export type UnreadMessageTrackingMinAggregateInputType = {
    userId?: true
    conversationId?: true
    unreadCount?: true
  }

  export type UnreadMessageTrackingMaxAggregateInputType = {
    userId?: true
    conversationId?: true
    unreadCount?: true
  }

  export type UnreadMessageTrackingCountAggregateInputType = {
    userId?: true
    conversationId?: true
    unreadCount?: true
    _all?: true
  }

  export type UnreadMessageTrackingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UnreadMessageTracking to aggregate.
     */
    where?: UnreadMessageTrackingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UnreadMessageTrackings to fetch.
     */
    orderBy?: UnreadMessageTrackingOrderByWithRelationInput | UnreadMessageTrackingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UnreadMessageTrackingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UnreadMessageTrackings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UnreadMessageTrackings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UnreadMessageTrackings
    **/
    _count?: true | UnreadMessageTrackingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UnreadMessageTrackingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UnreadMessageTrackingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UnreadMessageTrackingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UnreadMessageTrackingMaxAggregateInputType
  }

  export type GetUnreadMessageTrackingAggregateType<T extends UnreadMessageTrackingAggregateArgs> = {
        [P in keyof T & keyof AggregateUnreadMessageTracking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUnreadMessageTracking[P]>
      : GetScalarType<T[P], AggregateUnreadMessageTracking[P]>
  }




  export type UnreadMessageTrackingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UnreadMessageTrackingWhereInput
    orderBy?: UnreadMessageTrackingOrderByWithAggregationInput | UnreadMessageTrackingOrderByWithAggregationInput[]
    by: UnreadMessageTrackingScalarFieldEnum[] | UnreadMessageTrackingScalarFieldEnum
    having?: UnreadMessageTrackingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UnreadMessageTrackingCountAggregateInputType | true
    _avg?: UnreadMessageTrackingAvgAggregateInputType
    _sum?: UnreadMessageTrackingSumAggregateInputType
    _min?: UnreadMessageTrackingMinAggregateInputType
    _max?: UnreadMessageTrackingMaxAggregateInputType
  }

  export type UnreadMessageTrackingGroupByOutputType = {
    userId: string
    conversationId: string
    unreadCount: number
    _count: UnreadMessageTrackingCountAggregateOutputType | null
    _avg: UnreadMessageTrackingAvgAggregateOutputType | null
    _sum: UnreadMessageTrackingSumAggregateOutputType | null
    _min: UnreadMessageTrackingMinAggregateOutputType | null
    _max: UnreadMessageTrackingMaxAggregateOutputType | null
  }

  type GetUnreadMessageTrackingGroupByPayload<T extends UnreadMessageTrackingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UnreadMessageTrackingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UnreadMessageTrackingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UnreadMessageTrackingGroupByOutputType[P]>
            : GetScalarType<T[P], UnreadMessageTrackingGroupByOutputType[P]>
        }
      >
    >


  export type UnreadMessageTrackingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    conversationId?: boolean
    unreadCount?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["unreadMessageTracking"]>


  export type UnreadMessageTrackingSelectScalar = {
    userId?: boolean
    conversationId?: boolean
    unreadCount?: boolean
  }

  export type UnreadMessageTrackingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }

  export type $UnreadMessageTrackingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UnreadMessageTracking"
    objects: {
      conversation: Prisma.$ConversationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      conversationId: string
      unreadCount: number
    }, ExtArgs["result"]["unreadMessageTracking"]>
    composites: {}
  }

  type UnreadMessageTrackingGetPayload<S extends boolean | null | undefined | UnreadMessageTrackingDefaultArgs> = $Result.GetResult<Prisma.$UnreadMessageTrackingPayload, S>

  type UnreadMessageTrackingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UnreadMessageTrackingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UnreadMessageTrackingCountAggregateInputType | true
    }

  export interface UnreadMessageTrackingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UnreadMessageTracking'], meta: { name: 'UnreadMessageTracking' } }
    /**
     * Find zero or one UnreadMessageTracking that matches the filter.
     * @param {UnreadMessageTrackingFindUniqueArgs} args - Arguments to find a UnreadMessageTracking
     * @example
     * // Get one UnreadMessageTracking
     * const unreadMessageTracking = await prisma.unreadMessageTracking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UnreadMessageTrackingFindUniqueArgs>(args: SelectSubset<T, UnreadMessageTrackingFindUniqueArgs<ExtArgs>>): Prisma__UnreadMessageTrackingClient<$Result.GetResult<Prisma.$UnreadMessageTrackingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one UnreadMessageTracking that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UnreadMessageTrackingFindUniqueOrThrowArgs} args - Arguments to find a UnreadMessageTracking
     * @example
     * // Get one UnreadMessageTracking
     * const unreadMessageTracking = await prisma.unreadMessageTracking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UnreadMessageTrackingFindUniqueOrThrowArgs>(args: SelectSubset<T, UnreadMessageTrackingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UnreadMessageTrackingClient<$Result.GetResult<Prisma.$UnreadMessageTrackingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first UnreadMessageTracking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnreadMessageTrackingFindFirstArgs} args - Arguments to find a UnreadMessageTracking
     * @example
     * // Get one UnreadMessageTracking
     * const unreadMessageTracking = await prisma.unreadMessageTracking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UnreadMessageTrackingFindFirstArgs>(args?: SelectSubset<T, UnreadMessageTrackingFindFirstArgs<ExtArgs>>): Prisma__UnreadMessageTrackingClient<$Result.GetResult<Prisma.$UnreadMessageTrackingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first UnreadMessageTracking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnreadMessageTrackingFindFirstOrThrowArgs} args - Arguments to find a UnreadMessageTracking
     * @example
     * // Get one UnreadMessageTracking
     * const unreadMessageTracking = await prisma.unreadMessageTracking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UnreadMessageTrackingFindFirstOrThrowArgs>(args?: SelectSubset<T, UnreadMessageTrackingFindFirstOrThrowArgs<ExtArgs>>): Prisma__UnreadMessageTrackingClient<$Result.GetResult<Prisma.$UnreadMessageTrackingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more UnreadMessageTrackings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnreadMessageTrackingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UnreadMessageTrackings
     * const unreadMessageTrackings = await prisma.unreadMessageTracking.findMany()
     * 
     * // Get first 10 UnreadMessageTrackings
     * const unreadMessageTrackings = await prisma.unreadMessageTracking.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const unreadMessageTrackingWithUserIdOnly = await prisma.unreadMessageTracking.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends UnreadMessageTrackingFindManyArgs>(args?: SelectSubset<T, UnreadMessageTrackingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UnreadMessageTrackingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a UnreadMessageTracking.
     * @param {UnreadMessageTrackingCreateArgs} args - Arguments to create a UnreadMessageTracking.
     * @example
     * // Create one UnreadMessageTracking
     * const UnreadMessageTracking = await prisma.unreadMessageTracking.create({
     *   data: {
     *     // ... data to create a UnreadMessageTracking
     *   }
     * })
     * 
     */
    create<T extends UnreadMessageTrackingCreateArgs>(args: SelectSubset<T, UnreadMessageTrackingCreateArgs<ExtArgs>>): Prisma__UnreadMessageTrackingClient<$Result.GetResult<Prisma.$UnreadMessageTrackingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many UnreadMessageTrackings.
     * @param {UnreadMessageTrackingCreateManyArgs} args - Arguments to create many UnreadMessageTrackings.
     * @example
     * // Create many UnreadMessageTrackings
     * const unreadMessageTracking = await prisma.unreadMessageTracking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UnreadMessageTrackingCreateManyArgs>(args?: SelectSubset<T, UnreadMessageTrackingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UnreadMessageTracking.
     * @param {UnreadMessageTrackingDeleteArgs} args - Arguments to delete one UnreadMessageTracking.
     * @example
     * // Delete one UnreadMessageTracking
     * const UnreadMessageTracking = await prisma.unreadMessageTracking.delete({
     *   where: {
     *     // ... filter to delete one UnreadMessageTracking
     *   }
     * })
     * 
     */
    delete<T extends UnreadMessageTrackingDeleteArgs>(args: SelectSubset<T, UnreadMessageTrackingDeleteArgs<ExtArgs>>): Prisma__UnreadMessageTrackingClient<$Result.GetResult<Prisma.$UnreadMessageTrackingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one UnreadMessageTracking.
     * @param {UnreadMessageTrackingUpdateArgs} args - Arguments to update one UnreadMessageTracking.
     * @example
     * // Update one UnreadMessageTracking
     * const unreadMessageTracking = await prisma.unreadMessageTracking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UnreadMessageTrackingUpdateArgs>(args: SelectSubset<T, UnreadMessageTrackingUpdateArgs<ExtArgs>>): Prisma__UnreadMessageTrackingClient<$Result.GetResult<Prisma.$UnreadMessageTrackingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more UnreadMessageTrackings.
     * @param {UnreadMessageTrackingDeleteManyArgs} args - Arguments to filter UnreadMessageTrackings to delete.
     * @example
     * // Delete a few UnreadMessageTrackings
     * const { count } = await prisma.unreadMessageTracking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UnreadMessageTrackingDeleteManyArgs>(args?: SelectSubset<T, UnreadMessageTrackingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UnreadMessageTrackings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnreadMessageTrackingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UnreadMessageTrackings
     * const unreadMessageTracking = await prisma.unreadMessageTracking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UnreadMessageTrackingUpdateManyArgs>(args: SelectSubset<T, UnreadMessageTrackingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UnreadMessageTracking.
     * @param {UnreadMessageTrackingUpsertArgs} args - Arguments to update or create a UnreadMessageTracking.
     * @example
     * // Update or create a UnreadMessageTracking
     * const unreadMessageTracking = await prisma.unreadMessageTracking.upsert({
     *   create: {
     *     // ... data to create a UnreadMessageTracking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UnreadMessageTracking we want to update
     *   }
     * })
     */
    upsert<T extends UnreadMessageTrackingUpsertArgs>(args: SelectSubset<T, UnreadMessageTrackingUpsertArgs<ExtArgs>>): Prisma__UnreadMessageTrackingClient<$Result.GetResult<Prisma.$UnreadMessageTrackingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of UnreadMessageTrackings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnreadMessageTrackingCountArgs} args - Arguments to filter UnreadMessageTrackings to count.
     * @example
     * // Count the number of UnreadMessageTrackings
     * const count = await prisma.unreadMessageTracking.count({
     *   where: {
     *     // ... the filter for the UnreadMessageTrackings we want to count
     *   }
     * })
    **/
    count<T extends UnreadMessageTrackingCountArgs>(
      args?: Subset<T, UnreadMessageTrackingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UnreadMessageTrackingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UnreadMessageTracking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnreadMessageTrackingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UnreadMessageTrackingAggregateArgs>(args: Subset<T, UnreadMessageTrackingAggregateArgs>): Prisma.PrismaPromise<GetUnreadMessageTrackingAggregateType<T>>

    /**
     * Group by UnreadMessageTracking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnreadMessageTrackingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UnreadMessageTrackingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UnreadMessageTrackingGroupByArgs['orderBy'] }
        : { orderBy?: UnreadMessageTrackingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UnreadMessageTrackingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUnreadMessageTrackingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UnreadMessageTracking model
   */
  readonly fields: UnreadMessageTrackingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UnreadMessageTracking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UnreadMessageTrackingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversation<T extends ConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConversationDefaultArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UnreadMessageTracking model
   */ 
  interface UnreadMessageTrackingFieldRefs {
    readonly userId: FieldRef<"UnreadMessageTracking", 'String'>
    readonly conversationId: FieldRef<"UnreadMessageTracking", 'String'>
    readonly unreadCount: FieldRef<"UnreadMessageTracking", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * UnreadMessageTracking findUnique
   */
  export type UnreadMessageTrackingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnreadMessageTracking
     */
    select?: UnreadMessageTrackingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnreadMessageTrackingInclude<ExtArgs> | null
    /**
     * Filter, which UnreadMessageTracking to fetch.
     */
    where: UnreadMessageTrackingWhereUniqueInput
  }

  /**
   * UnreadMessageTracking findUniqueOrThrow
   */
  export type UnreadMessageTrackingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnreadMessageTracking
     */
    select?: UnreadMessageTrackingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnreadMessageTrackingInclude<ExtArgs> | null
    /**
     * Filter, which UnreadMessageTracking to fetch.
     */
    where: UnreadMessageTrackingWhereUniqueInput
  }

  /**
   * UnreadMessageTracking findFirst
   */
  export type UnreadMessageTrackingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnreadMessageTracking
     */
    select?: UnreadMessageTrackingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnreadMessageTrackingInclude<ExtArgs> | null
    /**
     * Filter, which UnreadMessageTracking to fetch.
     */
    where?: UnreadMessageTrackingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UnreadMessageTrackings to fetch.
     */
    orderBy?: UnreadMessageTrackingOrderByWithRelationInput | UnreadMessageTrackingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UnreadMessageTrackings.
     */
    cursor?: UnreadMessageTrackingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UnreadMessageTrackings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UnreadMessageTrackings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UnreadMessageTrackings.
     */
    distinct?: UnreadMessageTrackingScalarFieldEnum | UnreadMessageTrackingScalarFieldEnum[]
  }

  /**
   * UnreadMessageTracking findFirstOrThrow
   */
  export type UnreadMessageTrackingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnreadMessageTracking
     */
    select?: UnreadMessageTrackingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnreadMessageTrackingInclude<ExtArgs> | null
    /**
     * Filter, which UnreadMessageTracking to fetch.
     */
    where?: UnreadMessageTrackingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UnreadMessageTrackings to fetch.
     */
    orderBy?: UnreadMessageTrackingOrderByWithRelationInput | UnreadMessageTrackingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UnreadMessageTrackings.
     */
    cursor?: UnreadMessageTrackingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UnreadMessageTrackings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UnreadMessageTrackings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UnreadMessageTrackings.
     */
    distinct?: UnreadMessageTrackingScalarFieldEnum | UnreadMessageTrackingScalarFieldEnum[]
  }

  /**
   * UnreadMessageTracking findMany
   */
  export type UnreadMessageTrackingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnreadMessageTracking
     */
    select?: UnreadMessageTrackingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnreadMessageTrackingInclude<ExtArgs> | null
    /**
     * Filter, which UnreadMessageTrackings to fetch.
     */
    where?: UnreadMessageTrackingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UnreadMessageTrackings to fetch.
     */
    orderBy?: UnreadMessageTrackingOrderByWithRelationInput | UnreadMessageTrackingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UnreadMessageTrackings.
     */
    cursor?: UnreadMessageTrackingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UnreadMessageTrackings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UnreadMessageTrackings.
     */
    skip?: number
    distinct?: UnreadMessageTrackingScalarFieldEnum | UnreadMessageTrackingScalarFieldEnum[]
  }

  /**
   * UnreadMessageTracking create
   */
  export type UnreadMessageTrackingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnreadMessageTracking
     */
    select?: UnreadMessageTrackingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnreadMessageTrackingInclude<ExtArgs> | null
    /**
     * The data needed to create a UnreadMessageTracking.
     */
    data: XOR<UnreadMessageTrackingCreateInput, UnreadMessageTrackingUncheckedCreateInput>
  }

  /**
   * UnreadMessageTracking createMany
   */
  export type UnreadMessageTrackingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UnreadMessageTrackings.
     */
    data: UnreadMessageTrackingCreateManyInput | UnreadMessageTrackingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UnreadMessageTracking update
   */
  export type UnreadMessageTrackingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnreadMessageTracking
     */
    select?: UnreadMessageTrackingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnreadMessageTrackingInclude<ExtArgs> | null
    /**
     * The data needed to update a UnreadMessageTracking.
     */
    data: XOR<UnreadMessageTrackingUpdateInput, UnreadMessageTrackingUncheckedUpdateInput>
    /**
     * Choose, which UnreadMessageTracking to update.
     */
    where: UnreadMessageTrackingWhereUniqueInput
  }

  /**
   * UnreadMessageTracking updateMany
   */
  export type UnreadMessageTrackingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UnreadMessageTrackings.
     */
    data: XOR<UnreadMessageTrackingUpdateManyMutationInput, UnreadMessageTrackingUncheckedUpdateManyInput>
    /**
     * Filter which UnreadMessageTrackings to update
     */
    where?: UnreadMessageTrackingWhereInput
  }

  /**
   * UnreadMessageTracking upsert
   */
  export type UnreadMessageTrackingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnreadMessageTracking
     */
    select?: UnreadMessageTrackingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnreadMessageTrackingInclude<ExtArgs> | null
    /**
     * The filter to search for the UnreadMessageTracking to update in case it exists.
     */
    where: UnreadMessageTrackingWhereUniqueInput
    /**
     * In case the UnreadMessageTracking found by the `where` argument doesn't exist, create a new UnreadMessageTracking with this data.
     */
    create: XOR<UnreadMessageTrackingCreateInput, UnreadMessageTrackingUncheckedCreateInput>
    /**
     * In case the UnreadMessageTracking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UnreadMessageTrackingUpdateInput, UnreadMessageTrackingUncheckedUpdateInput>
  }

  /**
   * UnreadMessageTracking delete
   */
  export type UnreadMessageTrackingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnreadMessageTracking
     */
    select?: UnreadMessageTrackingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnreadMessageTrackingInclude<ExtArgs> | null
    /**
     * Filter which UnreadMessageTracking to delete.
     */
    where: UnreadMessageTrackingWhereUniqueInput
  }

  /**
   * UnreadMessageTracking deleteMany
   */
  export type UnreadMessageTrackingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UnreadMessageTrackings to delete
     */
    where?: UnreadMessageTrackingWhereInput
  }

  /**
   * UnreadMessageTracking without action
   */
  export type UnreadMessageTrackingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnreadMessageTracking
     */
    select?: UnreadMessageTrackingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnreadMessageTrackingInclude<ExtArgs> | null
  }


  /**
   * Model WebsocketSession
   */

  export type AggregateWebsocketSession = {
    _count: WebsocketSessionCountAggregateOutputType | null
    _min: WebsocketSessionMinAggregateOutputType | null
    _max: WebsocketSessionMaxAggregateOutputType | null
  }

  export type WebsocketSessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    connectedAt: Date | null
    lastHeartbeat: Date | null
  }

  export type WebsocketSessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    connectedAt: Date | null
    lastHeartbeat: Date | null
  }

  export type WebsocketSessionCountAggregateOutputType = {
    id: number
    userId: number
    connectedAt: number
    lastHeartbeat: number
    _all: number
  }


  export type WebsocketSessionMinAggregateInputType = {
    id?: true
    userId?: true
    connectedAt?: true
    lastHeartbeat?: true
  }

  export type WebsocketSessionMaxAggregateInputType = {
    id?: true
    userId?: true
    connectedAt?: true
    lastHeartbeat?: true
  }

  export type WebsocketSessionCountAggregateInputType = {
    id?: true
    userId?: true
    connectedAt?: true
    lastHeartbeat?: true
    _all?: true
  }

  export type WebsocketSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebsocketSession to aggregate.
     */
    where?: WebsocketSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebsocketSessions to fetch.
     */
    orderBy?: WebsocketSessionOrderByWithRelationInput | WebsocketSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebsocketSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebsocketSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebsocketSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WebsocketSessions
    **/
    _count?: true | WebsocketSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebsocketSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebsocketSessionMaxAggregateInputType
  }

  export type GetWebsocketSessionAggregateType<T extends WebsocketSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateWebsocketSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebsocketSession[P]>
      : GetScalarType<T[P], AggregateWebsocketSession[P]>
  }




  export type WebsocketSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebsocketSessionWhereInput
    orderBy?: WebsocketSessionOrderByWithAggregationInput | WebsocketSessionOrderByWithAggregationInput[]
    by: WebsocketSessionScalarFieldEnum[] | WebsocketSessionScalarFieldEnum
    having?: WebsocketSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebsocketSessionCountAggregateInputType | true
    _min?: WebsocketSessionMinAggregateInputType
    _max?: WebsocketSessionMaxAggregateInputType
  }

  export type WebsocketSessionGroupByOutputType = {
    id: string
    userId: string
    connectedAt: Date
    lastHeartbeat: Date | null
    _count: WebsocketSessionCountAggregateOutputType | null
    _min: WebsocketSessionMinAggregateOutputType | null
    _max: WebsocketSessionMaxAggregateOutputType | null
  }

  type GetWebsocketSessionGroupByPayload<T extends WebsocketSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebsocketSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebsocketSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebsocketSessionGroupByOutputType[P]>
            : GetScalarType<T[P], WebsocketSessionGroupByOutputType[P]>
        }
      >
    >


  export type WebsocketSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    connectedAt?: boolean
    lastHeartbeat?: boolean
  }, ExtArgs["result"]["websocketSession"]>


  export type WebsocketSessionSelectScalar = {
    id?: boolean
    userId?: boolean
    connectedAt?: boolean
    lastHeartbeat?: boolean
  }


  export type $WebsocketSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WebsocketSession"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      connectedAt: Date
      lastHeartbeat: Date | null
    }, ExtArgs["result"]["websocketSession"]>
    composites: {}
  }

  type WebsocketSessionGetPayload<S extends boolean | null | undefined | WebsocketSessionDefaultArgs> = $Result.GetResult<Prisma.$WebsocketSessionPayload, S>

  type WebsocketSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WebsocketSessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WebsocketSessionCountAggregateInputType | true
    }

  export interface WebsocketSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WebsocketSession'], meta: { name: 'WebsocketSession' } }
    /**
     * Find zero or one WebsocketSession that matches the filter.
     * @param {WebsocketSessionFindUniqueArgs} args - Arguments to find a WebsocketSession
     * @example
     * // Get one WebsocketSession
     * const websocketSession = await prisma.websocketSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WebsocketSessionFindUniqueArgs>(args: SelectSubset<T, WebsocketSessionFindUniqueArgs<ExtArgs>>): Prisma__WebsocketSessionClient<$Result.GetResult<Prisma.$WebsocketSessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one WebsocketSession that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WebsocketSessionFindUniqueOrThrowArgs} args - Arguments to find a WebsocketSession
     * @example
     * // Get one WebsocketSession
     * const websocketSession = await prisma.websocketSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WebsocketSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, WebsocketSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WebsocketSessionClient<$Result.GetResult<Prisma.$WebsocketSessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first WebsocketSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsocketSessionFindFirstArgs} args - Arguments to find a WebsocketSession
     * @example
     * // Get one WebsocketSession
     * const websocketSession = await prisma.websocketSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WebsocketSessionFindFirstArgs>(args?: SelectSubset<T, WebsocketSessionFindFirstArgs<ExtArgs>>): Prisma__WebsocketSessionClient<$Result.GetResult<Prisma.$WebsocketSessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first WebsocketSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsocketSessionFindFirstOrThrowArgs} args - Arguments to find a WebsocketSession
     * @example
     * // Get one WebsocketSession
     * const websocketSession = await prisma.websocketSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WebsocketSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, WebsocketSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__WebsocketSessionClient<$Result.GetResult<Prisma.$WebsocketSessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more WebsocketSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsocketSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebsocketSessions
     * const websocketSessions = await prisma.websocketSession.findMany()
     * 
     * // Get first 10 WebsocketSessions
     * const websocketSessions = await prisma.websocketSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const websocketSessionWithIdOnly = await prisma.websocketSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WebsocketSessionFindManyArgs>(args?: SelectSubset<T, WebsocketSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebsocketSessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a WebsocketSession.
     * @param {WebsocketSessionCreateArgs} args - Arguments to create a WebsocketSession.
     * @example
     * // Create one WebsocketSession
     * const WebsocketSession = await prisma.websocketSession.create({
     *   data: {
     *     // ... data to create a WebsocketSession
     *   }
     * })
     * 
     */
    create<T extends WebsocketSessionCreateArgs>(args: SelectSubset<T, WebsocketSessionCreateArgs<ExtArgs>>): Prisma__WebsocketSessionClient<$Result.GetResult<Prisma.$WebsocketSessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many WebsocketSessions.
     * @param {WebsocketSessionCreateManyArgs} args - Arguments to create many WebsocketSessions.
     * @example
     * // Create many WebsocketSessions
     * const websocketSession = await prisma.websocketSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WebsocketSessionCreateManyArgs>(args?: SelectSubset<T, WebsocketSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a WebsocketSession.
     * @param {WebsocketSessionDeleteArgs} args - Arguments to delete one WebsocketSession.
     * @example
     * // Delete one WebsocketSession
     * const WebsocketSession = await prisma.websocketSession.delete({
     *   where: {
     *     // ... filter to delete one WebsocketSession
     *   }
     * })
     * 
     */
    delete<T extends WebsocketSessionDeleteArgs>(args: SelectSubset<T, WebsocketSessionDeleteArgs<ExtArgs>>): Prisma__WebsocketSessionClient<$Result.GetResult<Prisma.$WebsocketSessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one WebsocketSession.
     * @param {WebsocketSessionUpdateArgs} args - Arguments to update one WebsocketSession.
     * @example
     * // Update one WebsocketSession
     * const websocketSession = await prisma.websocketSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WebsocketSessionUpdateArgs>(args: SelectSubset<T, WebsocketSessionUpdateArgs<ExtArgs>>): Prisma__WebsocketSessionClient<$Result.GetResult<Prisma.$WebsocketSessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more WebsocketSessions.
     * @param {WebsocketSessionDeleteManyArgs} args - Arguments to filter WebsocketSessions to delete.
     * @example
     * // Delete a few WebsocketSessions
     * const { count } = await prisma.websocketSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WebsocketSessionDeleteManyArgs>(args?: SelectSubset<T, WebsocketSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebsocketSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsocketSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebsocketSessions
     * const websocketSession = await prisma.websocketSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WebsocketSessionUpdateManyArgs>(args: SelectSubset<T, WebsocketSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WebsocketSession.
     * @param {WebsocketSessionUpsertArgs} args - Arguments to update or create a WebsocketSession.
     * @example
     * // Update or create a WebsocketSession
     * const websocketSession = await prisma.websocketSession.upsert({
     *   create: {
     *     // ... data to create a WebsocketSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebsocketSession we want to update
     *   }
     * })
     */
    upsert<T extends WebsocketSessionUpsertArgs>(args: SelectSubset<T, WebsocketSessionUpsertArgs<ExtArgs>>): Prisma__WebsocketSessionClient<$Result.GetResult<Prisma.$WebsocketSessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of WebsocketSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsocketSessionCountArgs} args - Arguments to filter WebsocketSessions to count.
     * @example
     * // Count the number of WebsocketSessions
     * const count = await prisma.websocketSession.count({
     *   where: {
     *     // ... the filter for the WebsocketSessions we want to count
     *   }
     * })
    **/
    count<T extends WebsocketSessionCountArgs>(
      args?: Subset<T, WebsocketSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebsocketSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WebsocketSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsocketSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WebsocketSessionAggregateArgs>(args: Subset<T, WebsocketSessionAggregateArgs>): Prisma.PrismaPromise<GetWebsocketSessionAggregateType<T>>

    /**
     * Group by WebsocketSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsocketSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WebsocketSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebsocketSessionGroupByArgs['orderBy'] }
        : { orderBy?: WebsocketSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WebsocketSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebsocketSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WebsocketSession model
   */
  readonly fields: WebsocketSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WebsocketSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebsocketSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WebsocketSession model
   */ 
  interface WebsocketSessionFieldRefs {
    readonly id: FieldRef<"WebsocketSession", 'String'>
    readonly userId: FieldRef<"WebsocketSession", 'String'>
    readonly connectedAt: FieldRef<"WebsocketSession", 'DateTime'>
    readonly lastHeartbeat: FieldRef<"WebsocketSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WebsocketSession findUnique
   */
  export type WebsocketSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsocketSession
     */
    select?: WebsocketSessionSelect<ExtArgs> | null
    /**
     * Filter, which WebsocketSession to fetch.
     */
    where: WebsocketSessionWhereUniqueInput
  }

  /**
   * WebsocketSession findUniqueOrThrow
   */
  export type WebsocketSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsocketSession
     */
    select?: WebsocketSessionSelect<ExtArgs> | null
    /**
     * Filter, which WebsocketSession to fetch.
     */
    where: WebsocketSessionWhereUniqueInput
  }

  /**
   * WebsocketSession findFirst
   */
  export type WebsocketSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsocketSession
     */
    select?: WebsocketSessionSelect<ExtArgs> | null
    /**
     * Filter, which WebsocketSession to fetch.
     */
    where?: WebsocketSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebsocketSessions to fetch.
     */
    orderBy?: WebsocketSessionOrderByWithRelationInput | WebsocketSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebsocketSessions.
     */
    cursor?: WebsocketSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebsocketSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebsocketSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebsocketSessions.
     */
    distinct?: WebsocketSessionScalarFieldEnum | WebsocketSessionScalarFieldEnum[]
  }

  /**
   * WebsocketSession findFirstOrThrow
   */
  export type WebsocketSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsocketSession
     */
    select?: WebsocketSessionSelect<ExtArgs> | null
    /**
     * Filter, which WebsocketSession to fetch.
     */
    where?: WebsocketSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebsocketSessions to fetch.
     */
    orderBy?: WebsocketSessionOrderByWithRelationInput | WebsocketSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebsocketSessions.
     */
    cursor?: WebsocketSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebsocketSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebsocketSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebsocketSessions.
     */
    distinct?: WebsocketSessionScalarFieldEnum | WebsocketSessionScalarFieldEnum[]
  }

  /**
   * WebsocketSession findMany
   */
  export type WebsocketSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsocketSession
     */
    select?: WebsocketSessionSelect<ExtArgs> | null
    /**
     * Filter, which WebsocketSessions to fetch.
     */
    where?: WebsocketSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebsocketSessions to fetch.
     */
    orderBy?: WebsocketSessionOrderByWithRelationInput | WebsocketSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WebsocketSessions.
     */
    cursor?: WebsocketSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebsocketSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebsocketSessions.
     */
    skip?: number
    distinct?: WebsocketSessionScalarFieldEnum | WebsocketSessionScalarFieldEnum[]
  }

  /**
   * WebsocketSession create
   */
  export type WebsocketSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsocketSession
     */
    select?: WebsocketSessionSelect<ExtArgs> | null
    /**
     * The data needed to create a WebsocketSession.
     */
    data: XOR<WebsocketSessionCreateInput, WebsocketSessionUncheckedCreateInput>
  }

  /**
   * WebsocketSession createMany
   */
  export type WebsocketSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WebsocketSessions.
     */
    data: WebsocketSessionCreateManyInput | WebsocketSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WebsocketSession update
   */
  export type WebsocketSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsocketSession
     */
    select?: WebsocketSessionSelect<ExtArgs> | null
    /**
     * The data needed to update a WebsocketSession.
     */
    data: XOR<WebsocketSessionUpdateInput, WebsocketSessionUncheckedUpdateInput>
    /**
     * Choose, which WebsocketSession to update.
     */
    where: WebsocketSessionWhereUniqueInput
  }

  /**
   * WebsocketSession updateMany
   */
  export type WebsocketSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WebsocketSessions.
     */
    data: XOR<WebsocketSessionUpdateManyMutationInput, WebsocketSessionUncheckedUpdateManyInput>
    /**
     * Filter which WebsocketSessions to update
     */
    where?: WebsocketSessionWhereInput
  }

  /**
   * WebsocketSession upsert
   */
  export type WebsocketSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsocketSession
     */
    select?: WebsocketSessionSelect<ExtArgs> | null
    /**
     * The filter to search for the WebsocketSession to update in case it exists.
     */
    where: WebsocketSessionWhereUniqueInput
    /**
     * In case the WebsocketSession found by the `where` argument doesn't exist, create a new WebsocketSession with this data.
     */
    create: XOR<WebsocketSessionCreateInput, WebsocketSessionUncheckedCreateInput>
    /**
     * In case the WebsocketSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebsocketSessionUpdateInput, WebsocketSessionUncheckedUpdateInput>
  }

  /**
   * WebsocketSession delete
   */
  export type WebsocketSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsocketSession
     */
    select?: WebsocketSessionSelect<ExtArgs> | null
    /**
     * Filter which WebsocketSession to delete.
     */
    where: WebsocketSessionWhereUniqueInput
  }

  /**
   * WebsocketSession deleteMany
   */
  export type WebsocketSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebsocketSessions to delete
     */
    where?: WebsocketSessionWhereInput
  }

  /**
   * WebsocketSession without action
   */
  export type WebsocketSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebsocketSession
     */
    select?: WebsocketSessionSelect<ExtArgs> | null
  }


  /**
   * Model TeamMeetingRoom
   */

  export type AggregateTeamMeetingRoom = {
    _count: TeamMeetingRoomCountAggregateOutputType | null
    _min: TeamMeetingRoomMinAggregateOutputType | null
    _max: TeamMeetingRoomMaxAggregateOutputType | null
  }

  export type TeamMeetingRoomMinAggregateOutputType = {
    id: string | null
    roomKey: string | null
    createdAt: Date | null
  }

  export type TeamMeetingRoomMaxAggregateOutputType = {
    id: string | null
    roomKey: string | null
    createdAt: Date | null
  }

  export type TeamMeetingRoomCountAggregateOutputType = {
    id: number
    roomKey: number
    createdAt: number
    _all: number
  }


  export type TeamMeetingRoomMinAggregateInputType = {
    id?: true
    roomKey?: true
    createdAt?: true
  }

  export type TeamMeetingRoomMaxAggregateInputType = {
    id?: true
    roomKey?: true
    createdAt?: true
  }

  export type TeamMeetingRoomCountAggregateInputType = {
    id?: true
    roomKey?: true
    createdAt?: true
    _all?: true
  }

  export type TeamMeetingRoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamMeetingRoom to aggregate.
     */
    where?: TeamMeetingRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMeetingRooms to fetch.
     */
    orderBy?: TeamMeetingRoomOrderByWithRelationInput | TeamMeetingRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamMeetingRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMeetingRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMeetingRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TeamMeetingRooms
    **/
    _count?: true | TeamMeetingRoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMeetingRoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMeetingRoomMaxAggregateInputType
  }

  export type GetTeamMeetingRoomAggregateType<T extends TeamMeetingRoomAggregateArgs> = {
        [P in keyof T & keyof AggregateTeamMeetingRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeamMeetingRoom[P]>
      : GetScalarType<T[P], AggregateTeamMeetingRoom[P]>
  }




  export type TeamMeetingRoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMeetingRoomWhereInput
    orderBy?: TeamMeetingRoomOrderByWithAggregationInput | TeamMeetingRoomOrderByWithAggregationInput[]
    by: TeamMeetingRoomScalarFieldEnum[] | TeamMeetingRoomScalarFieldEnum
    having?: TeamMeetingRoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamMeetingRoomCountAggregateInputType | true
    _min?: TeamMeetingRoomMinAggregateInputType
    _max?: TeamMeetingRoomMaxAggregateInputType
  }

  export type TeamMeetingRoomGroupByOutputType = {
    id: string
    roomKey: string
    createdAt: Date
    _count: TeamMeetingRoomCountAggregateOutputType | null
    _min: TeamMeetingRoomMinAggregateOutputType | null
    _max: TeamMeetingRoomMaxAggregateOutputType | null
  }

  type GetTeamMeetingRoomGroupByPayload<T extends TeamMeetingRoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamMeetingRoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamMeetingRoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamMeetingRoomGroupByOutputType[P]>
            : GetScalarType<T[P], TeamMeetingRoomGroupByOutputType[P]>
        }
      >
    >


  export type TeamMeetingRoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomKey?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["teamMeetingRoom"]>


  export type TeamMeetingRoomSelectScalar = {
    id?: boolean
    roomKey?: boolean
    createdAt?: boolean
  }


  export type $TeamMeetingRoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TeamMeetingRoom"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roomKey: string
      createdAt: Date
    }, ExtArgs["result"]["teamMeetingRoom"]>
    composites: {}
  }

  type TeamMeetingRoomGetPayload<S extends boolean | null | undefined | TeamMeetingRoomDefaultArgs> = $Result.GetResult<Prisma.$TeamMeetingRoomPayload, S>

  type TeamMeetingRoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TeamMeetingRoomFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TeamMeetingRoomCountAggregateInputType | true
    }

  export interface TeamMeetingRoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TeamMeetingRoom'], meta: { name: 'TeamMeetingRoom' } }
    /**
     * Find zero or one TeamMeetingRoom that matches the filter.
     * @param {TeamMeetingRoomFindUniqueArgs} args - Arguments to find a TeamMeetingRoom
     * @example
     * // Get one TeamMeetingRoom
     * const teamMeetingRoom = await prisma.teamMeetingRoom.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamMeetingRoomFindUniqueArgs>(args: SelectSubset<T, TeamMeetingRoomFindUniqueArgs<ExtArgs>>): Prisma__TeamMeetingRoomClient<$Result.GetResult<Prisma.$TeamMeetingRoomPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TeamMeetingRoom that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TeamMeetingRoomFindUniqueOrThrowArgs} args - Arguments to find a TeamMeetingRoom
     * @example
     * // Get one TeamMeetingRoom
     * const teamMeetingRoom = await prisma.teamMeetingRoom.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamMeetingRoomFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamMeetingRoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamMeetingRoomClient<$Result.GetResult<Prisma.$TeamMeetingRoomPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TeamMeetingRoom that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMeetingRoomFindFirstArgs} args - Arguments to find a TeamMeetingRoom
     * @example
     * // Get one TeamMeetingRoom
     * const teamMeetingRoom = await prisma.teamMeetingRoom.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamMeetingRoomFindFirstArgs>(args?: SelectSubset<T, TeamMeetingRoomFindFirstArgs<ExtArgs>>): Prisma__TeamMeetingRoomClient<$Result.GetResult<Prisma.$TeamMeetingRoomPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TeamMeetingRoom that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMeetingRoomFindFirstOrThrowArgs} args - Arguments to find a TeamMeetingRoom
     * @example
     * // Get one TeamMeetingRoom
     * const teamMeetingRoom = await prisma.teamMeetingRoom.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamMeetingRoomFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamMeetingRoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamMeetingRoomClient<$Result.GetResult<Prisma.$TeamMeetingRoomPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TeamMeetingRooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMeetingRoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TeamMeetingRooms
     * const teamMeetingRooms = await prisma.teamMeetingRoom.findMany()
     * 
     * // Get first 10 TeamMeetingRooms
     * const teamMeetingRooms = await prisma.teamMeetingRoom.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamMeetingRoomWithIdOnly = await prisma.teamMeetingRoom.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeamMeetingRoomFindManyArgs>(args?: SelectSubset<T, TeamMeetingRoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMeetingRoomPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TeamMeetingRoom.
     * @param {TeamMeetingRoomCreateArgs} args - Arguments to create a TeamMeetingRoom.
     * @example
     * // Create one TeamMeetingRoom
     * const TeamMeetingRoom = await prisma.teamMeetingRoom.create({
     *   data: {
     *     // ... data to create a TeamMeetingRoom
     *   }
     * })
     * 
     */
    create<T extends TeamMeetingRoomCreateArgs>(args: SelectSubset<T, TeamMeetingRoomCreateArgs<ExtArgs>>): Prisma__TeamMeetingRoomClient<$Result.GetResult<Prisma.$TeamMeetingRoomPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TeamMeetingRooms.
     * @param {TeamMeetingRoomCreateManyArgs} args - Arguments to create many TeamMeetingRooms.
     * @example
     * // Create many TeamMeetingRooms
     * const teamMeetingRoom = await prisma.teamMeetingRoom.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamMeetingRoomCreateManyArgs>(args?: SelectSubset<T, TeamMeetingRoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TeamMeetingRoom.
     * @param {TeamMeetingRoomDeleteArgs} args - Arguments to delete one TeamMeetingRoom.
     * @example
     * // Delete one TeamMeetingRoom
     * const TeamMeetingRoom = await prisma.teamMeetingRoom.delete({
     *   where: {
     *     // ... filter to delete one TeamMeetingRoom
     *   }
     * })
     * 
     */
    delete<T extends TeamMeetingRoomDeleteArgs>(args: SelectSubset<T, TeamMeetingRoomDeleteArgs<ExtArgs>>): Prisma__TeamMeetingRoomClient<$Result.GetResult<Prisma.$TeamMeetingRoomPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TeamMeetingRoom.
     * @param {TeamMeetingRoomUpdateArgs} args - Arguments to update one TeamMeetingRoom.
     * @example
     * // Update one TeamMeetingRoom
     * const teamMeetingRoom = await prisma.teamMeetingRoom.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamMeetingRoomUpdateArgs>(args: SelectSubset<T, TeamMeetingRoomUpdateArgs<ExtArgs>>): Prisma__TeamMeetingRoomClient<$Result.GetResult<Prisma.$TeamMeetingRoomPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TeamMeetingRooms.
     * @param {TeamMeetingRoomDeleteManyArgs} args - Arguments to filter TeamMeetingRooms to delete.
     * @example
     * // Delete a few TeamMeetingRooms
     * const { count } = await prisma.teamMeetingRoom.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamMeetingRoomDeleteManyArgs>(args?: SelectSubset<T, TeamMeetingRoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeamMeetingRooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMeetingRoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TeamMeetingRooms
     * const teamMeetingRoom = await prisma.teamMeetingRoom.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamMeetingRoomUpdateManyArgs>(args: SelectSubset<T, TeamMeetingRoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TeamMeetingRoom.
     * @param {TeamMeetingRoomUpsertArgs} args - Arguments to update or create a TeamMeetingRoom.
     * @example
     * // Update or create a TeamMeetingRoom
     * const teamMeetingRoom = await prisma.teamMeetingRoom.upsert({
     *   create: {
     *     // ... data to create a TeamMeetingRoom
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TeamMeetingRoom we want to update
     *   }
     * })
     */
    upsert<T extends TeamMeetingRoomUpsertArgs>(args: SelectSubset<T, TeamMeetingRoomUpsertArgs<ExtArgs>>): Prisma__TeamMeetingRoomClient<$Result.GetResult<Prisma.$TeamMeetingRoomPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TeamMeetingRooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMeetingRoomCountArgs} args - Arguments to filter TeamMeetingRooms to count.
     * @example
     * // Count the number of TeamMeetingRooms
     * const count = await prisma.teamMeetingRoom.count({
     *   where: {
     *     // ... the filter for the TeamMeetingRooms we want to count
     *   }
     * })
    **/
    count<T extends TeamMeetingRoomCountArgs>(
      args?: Subset<T, TeamMeetingRoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamMeetingRoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TeamMeetingRoom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMeetingRoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamMeetingRoomAggregateArgs>(args: Subset<T, TeamMeetingRoomAggregateArgs>): Prisma.PrismaPromise<GetTeamMeetingRoomAggregateType<T>>

    /**
     * Group by TeamMeetingRoom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMeetingRoomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamMeetingRoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamMeetingRoomGroupByArgs['orderBy'] }
        : { orderBy?: TeamMeetingRoomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamMeetingRoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamMeetingRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TeamMeetingRoom model
   */
  readonly fields: TeamMeetingRoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TeamMeetingRoom.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamMeetingRoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TeamMeetingRoom model
   */ 
  interface TeamMeetingRoomFieldRefs {
    readonly id: FieldRef<"TeamMeetingRoom", 'String'>
    readonly roomKey: FieldRef<"TeamMeetingRoom", 'String'>
    readonly createdAt: FieldRef<"TeamMeetingRoom", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TeamMeetingRoom findUnique
   */
  export type TeamMeetingRoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeetingRoom
     */
    select?: TeamMeetingRoomSelect<ExtArgs> | null
    /**
     * Filter, which TeamMeetingRoom to fetch.
     */
    where: TeamMeetingRoomWhereUniqueInput
  }

  /**
   * TeamMeetingRoom findUniqueOrThrow
   */
  export type TeamMeetingRoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeetingRoom
     */
    select?: TeamMeetingRoomSelect<ExtArgs> | null
    /**
     * Filter, which TeamMeetingRoom to fetch.
     */
    where: TeamMeetingRoomWhereUniqueInput
  }

  /**
   * TeamMeetingRoom findFirst
   */
  export type TeamMeetingRoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeetingRoom
     */
    select?: TeamMeetingRoomSelect<ExtArgs> | null
    /**
     * Filter, which TeamMeetingRoom to fetch.
     */
    where?: TeamMeetingRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMeetingRooms to fetch.
     */
    orderBy?: TeamMeetingRoomOrderByWithRelationInput | TeamMeetingRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamMeetingRooms.
     */
    cursor?: TeamMeetingRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMeetingRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMeetingRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamMeetingRooms.
     */
    distinct?: TeamMeetingRoomScalarFieldEnum | TeamMeetingRoomScalarFieldEnum[]
  }

  /**
   * TeamMeetingRoom findFirstOrThrow
   */
  export type TeamMeetingRoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeetingRoom
     */
    select?: TeamMeetingRoomSelect<ExtArgs> | null
    /**
     * Filter, which TeamMeetingRoom to fetch.
     */
    where?: TeamMeetingRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMeetingRooms to fetch.
     */
    orderBy?: TeamMeetingRoomOrderByWithRelationInput | TeamMeetingRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamMeetingRooms.
     */
    cursor?: TeamMeetingRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMeetingRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMeetingRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamMeetingRooms.
     */
    distinct?: TeamMeetingRoomScalarFieldEnum | TeamMeetingRoomScalarFieldEnum[]
  }

  /**
   * TeamMeetingRoom findMany
   */
  export type TeamMeetingRoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeetingRoom
     */
    select?: TeamMeetingRoomSelect<ExtArgs> | null
    /**
     * Filter, which TeamMeetingRooms to fetch.
     */
    where?: TeamMeetingRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMeetingRooms to fetch.
     */
    orderBy?: TeamMeetingRoomOrderByWithRelationInput | TeamMeetingRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TeamMeetingRooms.
     */
    cursor?: TeamMeetingRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMeetingRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMeetingRooms.
     */
    skip?: number
    distinct?: TeamMeetingRoomScalarFieldEnum | TeamMeetingRoomScalarFieldEnum[]
  }

  /**
   * TeamMeetingRoom create
   */
  export type TeamMeetingRoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeetingRoom
     */
    select?: TeamMeetingRoomSelect<ExtArgs> | null
    /**
     * The data needed to create a TeamMeetingRoom.
     */
    data: XOR<TeamMeetingRoomCreateInput, TeamMeetingRoomUncheckedCreateInput>
  }

  /**
   * TeamMeetingRoom createMany
   */
  export type TeamMeetingRoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TeamMeetingRooms.
     */
    data: TeamMeetingRoomCreateManyInput | TeamMeetingRoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TeamMeetingRoom update
   */
  export type TeamMeetingRoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeetingRoom
     */
    select?: TeamMeetingRoomSelect<ExtArgs> | null
    /**
     * The data needed to update a TeamMeetingRoom.
     */
    data: XOR<TeamMeetingRoomUpdateInput, TeamMeetingRoomUncheckedUpdateInput>
    /**
     * Choose, which TeamMeetingRoom to update.
     */
    where: TeamMeetingRoomWhereUniqueInput
  }

  /**
   * TeamMeetingRoom updateMany
   */
  export type TeamMeetingRoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TeamMeetingRooms.
     */
    data: XOR<TeamMeetingRoomUpdateManyMutationInput, TeamMeetingRoomUncheckedUpdateManyInput>
    /**
     * Filter which TeamMeetingRooms to update
     */
    where?: TeamMeetingRoomWhereInput
  }

  /**
   * TeamMeetingRoom upsert
   */
  export type TeamMeetingRoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeetingRoom
     */
    select?: TeamMeetingRoomSelect<ExtArgs> | null
    /**
     * The filter to search for the TeamMeetingRoom to update in case it exists.
     */
    where: TeamMeetingRoomWhereUniqueInput
    /**
     * In case the TeamMeetingRoom found by the `where` argument doesn't exist, create a new TeamMeetingRoom with this data.
     */
    create: XOR<TeamMeetingRoomCreateInput, TeamMeetingRoomUncheckedCreateInput>
    /**
     * In case the TeamMeetingRoom was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamMeetingRoomUpdateInput, TeamMeetingRoomUncheckedUpdateInput>
  }

  /**
   * TeamMeetingRoom delete
   */
  export type TeamMeetingRoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeetingRoom
     */
    select?: TeamMeetingRoomSelect<ExtArgs> | null
    /**
     * Filter which TeamMeetingRoom to delete.
     */
    where: TeamMeetingRoomWhereUniqueInput
  }

  /**
   * TeamMeetingRoom deleteMany
   */
  export type TeamMeetingRoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamMeetingRooms to delete
     */
    where?: TeamMeetingRoomWhereInput
  }

  /**
   * TeamMeetingRoom without action
   */
  export type TeamMeetingRoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeetingRoom
     */
    select?: TeamMeetingRoomSelect<ExtArgs> | null
  }


  /**
   * Model TeamMeetingMessage
   */

  export type AggregateTeamMeetingMessage = {
    _count: TeamMeetingMessageCountAggregateOutputType | null
    _min: TeamMeetingMessageMinAggregateOutputType | null
    _max: TeamMeetingMessageMaxAggregateOutputType | null
  }

  export type TeamMeetingMessageMinAggregateOutputType = {
    id: string | null
    roomKey: string | null
    senderId: string | null
    senderName: string | null
    senderRole: string | null
    senderInitials: string | null
    body: string | null
    messageType: string | null
    status: string | null
    createdAt: Date | null
  }

  export type TeamMeetingMessageMaxAggregateOutputType = {
    id: string | null
    roomKey: string | null
    senderId: string | null
    senderName: string | null
    senderRole: string | null
    senderInitials: string | null
    body: string | null
    messageType: string | null
    status: string | null
    createdAt: Date | null
  }

  export type TeamMeetingMessageCountAggregateOutputType = {
    id: number
    roomKey: number
    senderId: number
    senderName: number
    senderRole: number
    senderInitials: number
    body: number
    messageType: number
    status: number
    createdAt: number
    _all: number
  }


  export type TeamMeetingMessageMinAggregateInputType = {
    id?: true
    roomKey?: true
    senderId?: true
    senderName?: true
    senderRole?: true
    senderInitials?: true
    body?: true
    messageType?: true
    status?: true
    createdAt?: true
  }

  export type TeamMeetingMessageMaxAggregateInputType = {
    id?: true
    roomKey?: true
    senderId?: true
    senderName?: true
    senderRole?: true
    senderInitials?: true
    body?: true
    messageType?: true
    status?: true
    createdAt?: true
  }

  export type TeamMeetingMessageCountAggregateInputType = {
    id?: true
    roomKey?: true
    senderId?: true
    senderName?: true
    senderRole?: true
    senderInitials?: true
    body?: true
    messageType?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type TeamMeetingMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamMeetingMessage to aggregate.
     */
    where?: TeamMeetingMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMeetingMessages to fetch.
     */
    orderBy?: TeamMeetingMessageOrderByWithRelationInput | TeamMeetingMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamMeetingMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMeetingMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMeetingMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TeamMeetingMessages
    **/
    _count?: true | TeamMeetingMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMeetingMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMeetingMessageMaxAggregateInputType
  }

  export type GetTeamMeetingMessageAggregateType<T extends TeamMeetingMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateTeamMeetingMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeamMeetingMessage[P]>
      : GetScalarType<T[P], AggregateTeamMeetingMessage[P]>
  }




  export type TeamMeetingMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMeetingMessageWhereInput
    orderBy?: TeamMeetingMessageOrderByWithAggregationInput | TeamMeetingMessageOrderByWithAggregationInput[]
    by: TeamMeetingMessageScalarFieldEnum[] | TeamMeetingMessageScalarFieldEnum
    having?: TeamMeetingMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamMeetingMessageCountAggregateInputType | true
    _min?: TeamMeetingMessageMinAggregateInputType
    _max?: TeamMeetingMessageMaxAggregateInputType
  }

  export type TeamMeetingMessageGroupByOutputType = {
    id: string
    roomKey: string
    senderId: string
    senderName: string
    senderRole: string | null
    senderInitials: string | null
    body: string
    messageType: string
    status: string
    createdAt: Date
    _count: TeamMeetingMessageCountAggregateOutputType | null
    _min: TeamMeetingMessageMinAggregateOutputType | null
    _max: TeamMeetingMessageMaxAggregateOutputType | null
  }

  type GetTeamMeetingMessageGroupByPayload<T extends TeamMeetingMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamMeetingMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamMeetingMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamMeetingMessageGroupByOutputType[P]>
            : GetScalarType<T[P], TeamMeetingMessageGroupByOutputType[P]>
        }
      >
    >


  export type TeamMeetingMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomKey?: boolean
    senderId?: boolean
    senderName?: boolean
    senderRole?: boolean
    senderInitials?: boolean
    body?: boolean
    messageType?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["teamMeetingMessage"]>


  export type TeamMeetingMessageSelectScalar = {
    id?: boolean
    roomKey?: boolean
    senderId?: boolean
    senderName?: boolean
    senderRole?: boolean
    senderInitials?: boolean
    body?: boolean
    messageType?: boolean
    status?: boolean
    createdAt?: boolean
  }


  export type $TeamMeetingMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TeamMeetingMessage"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roomKey: string
      senderId: string
      senderName: string
      senderRole: string | null
      senderInitials: string | null
      body: string
      messageType: string
      status: string
      createdAt: Date
    }, ExtArgs["result"]["teamMeetingMessage"]>
    composites: {}
  }

  type TeamMeetingMessageGetPayload<S extends boolean | null | undefined | TeamMeetingMessageDefaultArgs> = $Result.GetResult<Prisma.$TeamMeetingMessagePayload, S>

  type TeamMeetingMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TeamMeetingMessageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TeamMeetingMessageCountAggregateInputType | true
    }

  export interface TeamMeetingMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TeamMeetingMessage'], meta: { name: 'TeamMeetingMessage' } }
    /**
     * Find zero or one TeamMeetingMessage that matches the filter.
     * @param {TeamMeetingMessageFindUniqueArgs} args - Arguments to find a TeamMeetingMessage
     * @example
     * // Get one TeamMeetingMessage
     * const teamMeetingMessage = await prisma.teamMeetingMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamMeetingMessageFindUniqueArgs>(args: SelectSubset<T, TeamMeetingMessageFindUniqueArgs<ExtArgs>>): Prisma__TeamMeetingMessageClient<$Result.GetResult<Prisma.$TeamMeetingMessagePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TeamMeetingMessage that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TeamMeetingMessageFindUniqueOrThrowArgs} args - Arguments to find a TeamMeetingMessage
     * @example
     * // Get one TeamMeetingMessage
     * const teamMeetingMessage = await prisma.teamMeetingMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamMeetingMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamMeetingMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamMeetingMessageClient<$Result.GetResult<Prisma.$TeamMeetingMessagePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TeamMeetingMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMeetingMessageFindFirstArgs} args - Arguments to find a TeamMeetingMessage
     * @example
     * // Get one TeamMeetingMessage
     * const teamMeetingMessage = await prisma.teamMeetingMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamMeetingMessageFindFirstArgs>(args?: SelectSubset<T, TeamMeetingMessageFindFirstArgs<ExtArgs>>): Prisma__TeamMeetingMessageClient<$Result.GetResult<Prisma.$TeamMeetingMessagePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TeamMeetingMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMeetingMessageFindFirstOrThrowArgs} args - Arguments to find a TeamMeetingMessage
     * @example
     * // Get one TeamMeetingMessage
     * const teamMeetingMessage = await prisma.teamMeetingMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamMeetingMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamMeetingMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamMeetingMessageClient<$Result.GetResult<Prisma.$TeamMeetingMessagePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TeamMeetingMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMeetingMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TeamMeetingMessages
     * const teamMeetingMessages = await prisma.teamMeetingMessage.findMany()
     * 
     * // Get first 10 TeamMeetingMessages
     * const teamMeetingMessages = await prisma.teamMeetingMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamMeetingMessageWithIdOnly = await prisma.teamMeetingMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeamMeetingMessageFindManyArgs>(args?: SelectSubset<T, TeamMeetingMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMeetingMessagePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TeamMeetingMessage.
     * @param {TeamMeetingMessageCreateArgs} args - Arguments to create a TeamMeetingMessage.
     * @example
     * // Create one TeamMeetingMessage
     * const TeamMeetingMessage = await prisma.teamMeetingMessage.create({
     *   data: {
     *     // ... data to create a TeamMeetingMessage
     *   }
     * })
     * 
     */
    create<T extends TeamMeetingMessageCreateArgs>(args: SelectSubset<T, TeamMeetingMessageCreateArgs<ExtArgs>>): Prisma__TeamMeetingMessageClient<$Result.GetResult<Prisma.$TeamMeetingMessagePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TeamMeetingMessages.
     * @param {TeamMeetingMessageCreateManyArgs} args - Arguments to create many TeamMeetingMessages.
     * @example
     * // Create many TeamMeetingMessages
     * const teamMeetingMessage = await prisma.teamMeetingMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamMeetingMessageCreateManyArgs>(args?: SelectSubset<T, TeamMeetingMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TeamMeetingMessage.
     * @param {TeamMeetingMessageDeleteArgs} args - Arguments to delete one TeamMeetingMessage.
     * @example
     * // Delete one TeamMeetingMessage
     * const TeamMeetingMessage = await prisma.teamMeetingMessage.delete({
     *   where: {
     *     // ... filter to delete one TeamMeetingMessage
     *   }
     * })
     * 
     */
    delete<T extends TeamMeetingMessageDeleteArgs>(args: SelectSubset<T, TeamMeetingMessageDeleteArgs<ExtArgs>>): Prisma__TeamMeetingMessageClient<$Result.GetResult<Prisma.$TeamMeetingMessagePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TeamMeetingMessage.
     * @param {TeamMeetingMessageUpdateArgs} args - Arguments to update one TeamMeetingMessage.
     * @example
     * // Update one TeamMeetingMessage
     * const teamMeetingMessage = await prisma.teamMeetingMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamMeetingMessageUpdateArgs>(args: SelectSubset<T, TeamMeetingMessageUpdateArgs<ExtArgs>>): Prisma__TeamMeetingMessageClient<$Result.GetResult<Prisma.$TeamMeetingMessagePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TeamMeetingMessages.
     * @param {TeamMeetingMessageDeleteManyArgs} args - Arguments to filter TeamMeetingMessages to delete.
     * @example
     * // Delete a few TeamMeetingMessages
     * const { count } = await prisma.teamMeetingMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamMeetingMessageDeleteManyArgs>(args?: SelectSubset<T, TeamMeetingMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeamMeetingMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMeetingMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TeamMeetingMessages
     * const teamMeetingMessage = await prisma.teamMeetingMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamMeetingMessageUpdateManyArgs>(args: SelectSubset<T, TeamMeetingMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TeamMeetingMessage.
     * @param {TeamMeetingMessageUpsertArgs} args - Arguments to update or create a TeamMeetingMessage.
     * @example
     * // Update or create a TeamMeetingMessage
     * const teamMeetingMessage = await prisma.teamMeetingMessage.upsert({
     *   create: {
     *     // ... data to create a TeamMeetingMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TeamMeetingMessage we want to update
     *   }
     * })
     */
    upsert<T extends TeamMeetingMessageUpsertArgs>(args: SelectSubset<T, TeamMeetingMessageUpsertArgs<ExtArgs>>): Prisma__TeamMeetingMessageClient<$Result.GetResult<Prisma.$TeamMeetingMessagePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TeamMeetingMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMeetingMessageCountArgs} args - Arguments to filter TeamMeetingMessages to count.
     * @example
     * // Count the number of TeamMeetingMessages
     * const count = await prisma.teamMeetingMessage.count({
     *   where: {
     *     // ... the filter for the TeamMeetingMessages we want to count
     *   }
     * })
    **/
    count<T extends TeamMeetingMessageCountArgs>(
      args?: Subset<T, TeamMeetingMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamMeetingMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TeamMeetingMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMeetingMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamMeetingMessageAggregateArgs>(args: Subset<T, TeamMeetingMessageAggregateArgs>): Prisma.PrismaPromise<GetTeamMeetingMessageAggregateType<T>>

    /**
     * Group by TeamMeetingMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMeetingMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamMeetingMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamMeetingMessageGroupByArgs['orderBy'] }
        : { orderBy?: TeamMeetingMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamMeetingMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamMeetingMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TeamMeetingMessage model
   */
  readonly fields: TeamMeetingMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TeamMeetingMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamMeetingMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TeamMeetingMessage model
   */ 
  interface TeamMeetingMessageFieldRefs {
    readonly id: FieldRef<"TeamMeetingMessage", 'String'>
    readonly roomKey: FieldRef<"TeamMeetingMessage", 'String'>
    readonly senderId: FieldRef<"TeamMeetingMessage", 'String'>
    readonly senderName: FieldRef<"TeamMeetingMessage", 'String'>
    readonly senderRole: FieldRef<"TeamMeetingMessage", 'String'>
    readonly senderInitials: FieldRef<"TeamMeetingMessage", 'String'>
    readonly body: FieldRef<"TeamMeetingMessage", 'String'>
    readonly messageType: FieldRef<"TeamMeetingMessage", 'String'>
    readonly status: FieldRef<"TeamMeetingMessage", 'String'>
    readonly createdAt: FieldRef<"TeamMeetingMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TeamMeetingMessage findUnique
   */
  export type TeamMeetingMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeetingMessage
     */
    select?: TeamMeetingMessageSelect<ExtArgs> | null
    /**
     * Filter, which TeamMeetingMessage to fetch.
     */
    where: TeamMeetingMessageWhereUniqueInput
  }

  /**
   * TeamMeetingMessage findUniqueOrThrow
   */
  export type TeamMeetingMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeetingMessage
     */
    select?: TeamMeetingMessageSelect<ExtArgs> | null
    /**
     * Filter, which TeamMeetingMessage to fetch.
     */
    where: TeamMeetingMessageWhereUniqueInput
  }

  /**
   * TeamMeetingMessage findFirst
   */
  export type TeamMeetingMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeetingMessage
     */
    select?: TeamMeetingMessageSelect<ExtArgs> | null
    /**
     * Filter, which TeamMeetingMessage to fetch.
     */
    where?: TeamMeetingMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMeetingMessages to fetch.
     */
    orderBy?: TeamMeetingMessageOrderByWithRelationInput | TeamMeetingMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamMeetingMessages.
     */
    cursor?: TeamMeetingMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMeetingMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMeetingMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamMeetingMessages.
     */
    distinct?: TeamMeetingMessageScalarFieldEnum | TeamMeetingMessageScalarFieldEnum[]
  }

  /**
   * TeamMeetingMessage findFirstOrThrow
   */
  export type TeamMeetingMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeetingMessage
     */
    select?: TeamMeetingMessageSelect<ExtArgs> | null
    /**
     * Filter, which TeamMeetingMessage to fetch.
     */
    where?: TeamMeetingMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMeetingMessages to fetch.
     */
    orderBy?: TeamMeetingMessageOrderByWithRelationInput | TeamMeetingMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamMeetingMessages.
     */
    cursor?: TeamMeetingMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMeetingMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMeetingMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamMeetingMessages.
     */
    distinct?: TeamMeetingMessageScalarFieldEnum | TeamMeetingMessageScalarFieldEnum[]
  }

  /**
   * TeamMeetingMessage findMany
   */
  export type TeamMeetingMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeetingMessage
     */
    select?: TeamMeetingMessageSelect<ExtArgs> | null
    /**
     * Filter, which TeamMeetingMessages to fetch.
     */
    where?: TeamMeetingMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMeetingMessages to fetch.
     */
    orderBy?: TeamMeetingMessageOrderByWithRelationInput | TeamMeetingMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TeamMeetingMessages.
     */
    cursor?: TeamMeetingMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMeetingMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMeetingMessages.
     */
    skip?: number
    distinct?: TeamMeetingMessageScalarFieldEnum | TeamMeetingMessageScalarFieldEnum[]
  }

  /**
   * TeamMeetingMessage create
   */
  export type TeamMeetingMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeetingMessage
     */
    select?: TeamMeetingMessageSelect<ExtArgs> | null
    /**
     * The data needed to create a TeamMeetingMessage.
     */
    data: XOR<TeamMeetingMessageCreateInput, TeamMeetingMessageUncheckedCreateInput>
  }

  /**
   * TeamMeetingMessage createMany
   */
  export type TeamMeetingMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TeamMeetingMessages.
     */
    data: TeamMeetingMessageCreateManyInput | TeamMeetingMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TeamMeetingMessage update
   */
  export type TeamMeetingMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeetingMessage
     */
    select?: TeamMeetingMessageSelect<ExtArgs> | null
    /**
     * The data needed to update a TeamMeetingMessage.
     */
    data: XOR<TeamMeetingMessageUpdateInput, TeamMeetingMessageUncheckedUpdateInput>
    /**
     * Choose, which TeamMeetingMessage to update.
     */
    where: TeamMeetingMessageWhereUniqueInput
  }

  /**
   * TeamMeetingMessage updateMany
   */
  export type TeamMeetingMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TeamMeetingMessages.
     */
    data: XOR<TeamMeetingMessageUpdateManyMutationInput, TeamMeetingMessageUncheckedUpdateManyInput>
    /**
     * Filter which TeamMeetingMessages to update
     */
    where?: TeamMeetingMessageWhereInput
  }

  /**
   * TeamMeetingMessage upsert
   */
  export type TeamMeetingMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeetingMessage
     */
    select?: TeamMeetingMessageSelect<ExtArgs> | null
    /**
     * The filter to search for the TeamMeetingMessage to update in case it exists.
     */
    where: TeamMeetingMessageWhereUniqueInput
    /**
     * In case the TeamMeetingMessage found by the `where` argument doesn't exist, create a new TeamMeetingMessage with this data.
     */
    create: XOR<TeamMeetingMessageCreateInput, TeamMeetingMessageUncheckedCreateInput>
    /**
     * In case the TeamMeetingMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamMeetingMessageUpdateInput, TeamMeetingMessageUncheckedUpdateInput>
  }

  /**
   * TeamMeetingMessage delete
   */
  export type TeamMeetingMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeetingMessage
     */
    select?: TeamMeetingMessageSelect<ExtArgs> | null
    /**
     * Filter which TeamMeetingMessage to delete.
     */
    where: TeamMeetingMessageWhereUniqueInput
  }

  /**
   * TeamMeetingMessage deleteMany
   */
  export type TeamMeetingMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamMeetingMessages to delete
     */
    where?: TeamMeetingMessageWhereInput
  }

  /**
   * TeamMeetingMessage without action
   */
  export type TeamMeetingMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMeetingMessage
     */
    select?: TeamMeetingMessageSelect<ExtArgs> | null
  }


  /**
   * Model WhatsappMessageTemplate
   */

  export type AggregateWhatsappMessageTemplate = {
    _count: WhatsappMessageTemplateCountAggregateOutputType | null
    _min: WhatsappMessageTemplateMinAggregateOutputType | null
    _max: WhatsappMessageTemplateMaxAggregateOutputType | null
  }

  export type WhatsappMessageTemplateMinAggregateOutputType = {
    id: string | null
    templateName: string | null
    templateBody: string | null
    templateCategory: string | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type WhatsappMessageTemplateMaxAggregateOutputType = {
    id: string | null
    templateName: string | null
    templateBody: string | null
    templateCategory: string | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type WhatsappMessageTemplateCountAggregateOutputType = {
    id: number
    templateName: number
    templateBody: number
    templateCategory: number
    isActive: number
    createdAt: number
    _all: number
  }


  export type WhatsappMessageTemplateMinAggregateInputType = {
    id?: true
    templateName?: true
    templateBody?: true
    templateCategory?: true
    isActive?: true
    createdAt?: true
  }

  export type WhatsappMessageTemplateMaxAggregateInputType = {
    id?: true
    templateName?: true
    templateBody?: true
    templateCategory?: true
    isActive?: true
    createdAt?: true
  }

  export type WhatsappMessageTemplateCountAggregateInputType = {
    id?: true
    templateName?: true
    templateBody?: true
    templateCategory?: true
    isActive?: true
    createdAt?: true
    _all?: true
  }

  export type WhatsappMessageTemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WhatsappMessageTemplate to aggregate.
     */
    where?: WhatsappMessageTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WhatsappMessageTemplates to fetch.
     */
    orderBy?: WhatsappMessageTemplateOrderByWithRelationInput | WhatsappMessageTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WhatsappMessageTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WhatsappMessageTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WhatsappMessageTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WhatsappMessageTemplates
    **/
    _count?: true | WhatsappMessageTemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WhatsappMessageTemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WhatsappMessageTemplateMaxAggregateInputType
  }

  export type GetWhatsappMessageTemplateAggregateType<T extends WhatsappMessageTemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateWhatsappMessageTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWhatsappMessageTemplate[P]>
      : GetScalarType<T[P], AggregateWhatsappMessageTemplate[P]>
  }




  export type WhatsappMessageTemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WhatsappMessageTemplateWhereInput
    orderBy?: WhatsappMessageTemplateOrderByWithAggregationInput | WhatsappMessageTemplateOrderByWithAggregationInput[]
    by: WhatsappMessageTemplateScalarFieldEnum[] | WhatsappMessageTemplateScalarFieldEnum
    having?: WhatsappMessageTemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WhatsappMessageTemplateCountAggregateInputType | true
    _min?: WhatsappMessageTemplateMinAggregateInputType
    _max?: WhatsappMessageTemplateMaxAggregateInputType
  }

  export type WhatsappMessageTemplateGroupByOutputType = {
    id: string
    templateName: string
    templateBody: string
    templateCategory: string
    isActive: boolean
    createdAt: Date
    _count: WhatsappMessageTemplateCountAggregateOutputType | null
    _min: WhatsappMessageTemplateMinAggregateOutputType | null
    _max: WhatsappMessageTemplateMaxAggregateOutputType | null
  }

  type GetWhatsappMessageTemplateGroupByPayload<T extends WhatsappMessageTemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WhatsappMessageTemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WhatsappMessageTemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WhatsappMessageTemplateGroupByOutputType[P]>
            : GetScalarType<T[P], WhatsappMessageTemplateGroupByOutputType[P]>
        }
      >
    >


  export type WhatsappMessageTemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    templateName?: boolean
    templateBody?: boolean
    templateCategory?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["whatsappMessageTemplate"]>


  export type WhatsappMessageTemplateSelectScalar = {
    id?: boolean
    templateName?: boolean
    templateBody?: boolean
    templateCategory?: boolean
    isActive?: boolean
    createdAt?: boolean
  }


  export type $WhatsappMessageTemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WhatsappMessageTemplate"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      templateName: string
      templateBody: string
      templateCategory: string
      isActive: boolean
      createdAt: Date
    }, ExtArgs["result"]["whatsappMessageTemplate"]>
    composites: {}
  }

  type WhatsappMessageTemplateGetPayload<S extends boolean | null | undefined | WhatsappMessageTemplateDefaultArgs> = $Result.GetResult<Prisma.$WhatsappMessageTemplatePayload, S>

  type WhatsappMessageTemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WhatsappMessageTemplateFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WhatsappMessageTemplateCountAggregateInputType | true
    }

  export interface WhatsappMessageTemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WhatsappMessageTemplate'], meta: { name: 'WhatsappMessageTemplate' } }
    /**
     * Find zero or one WhatsappMessageTemplate that matches the filter.
     * @param {WhatsappMessageTemplateFindUniqueArgs} args - Arguments to find a WhatsappMessageTemplate
     * @example
     * // Get one WhatsappMessageTemplate
     * const whatsappMessageTemplate = await prisma.whatsappMessageTemplate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WhatsappMessageTemplateFindUniqueArgs>(args: SelectSubset<T, WhatsappMessageTemplateFindUniqueArgs<ExtArgs>>): Prisma__WhatsappMessageTemplateClient<$Result.GetResult<Prisma.$WhatsappMessageTemplatePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one WhatsappMessageTemplate that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WhatsappMessageTemplateFindUniqueOrThrowArgs} args - Arguments to find a WhatsappMessageTemplate
     * @example
     * // Get one WhatsappMessageTemplate
     * const whatsappMessageTemplate = await prisma.whatsappMessageTemplate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WhatsappMessageTemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, WhatsappMessageTemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WhatsappMessageTemplateClient<$Result.GetResult<Prisma.$WhatsappMessageTemplatePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first WhatsappMessageTemplate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsappMessageTemplateFindFirstArgs} args - Arguments to find a WhatsappMessageTemplate
     * @example
     * // Get one WhatsappMessageTemplate
     * const whatsappMessageTemplate = await prisma.whatsappMessageTemplate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WhatsappMessageTemplateFindFirstArgs>(args?: SelectSubset<T, WhatsappMessageTemplateFindFirstArgs<ExtArgs>>): Prisma__WhatsappMessageTemplateClient<$Result.GetResult<Prisma.$WhatsappMessageTemplatePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first WhatsappMessageTemplate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsappMessageTemplateFindFirstOrThrowArgs} args - Arguments to find a WhatsappMessageTemplate
     * @example
     * // Get one WhatsappMessageTemplate
     * const whatsappMessageTemplate = await prisma.whatsappMessageTemplate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WhatsappMessageTemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, WhatsappMessageTemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__WhatsappMessageTemplateClient<$Result.GetResult<Prisma.$WhatsappMessageTemplatePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more WhatsappMessageTemplates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsappMessageTemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WhatsappMessageTemplates
     * const whatsappMessageTemplates = await prisma.whatsappMessageTemplate.findMany()
     * 
     * // Get first 10 WhatsappMessageTemplates
     * const whatsappMessageTemplates = await prisma.whatsappMessageTemplate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const whatsappMessageTemplateWithIdOnly = await prisma.whatsappMessageTemplate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WhatsappMessageTemplateFindManyArgs>(args?: SelectSubset<T, WhatsappMessageTemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WhatsappMessageTemplatePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a WhatsappMessageTemplate.
     * @param {WhatsappMessageTemplateCreateArgs} args - Arguments to create a WhatsappMessageTemplate.
     * @example
     * // Create one WhatsappMessageTemplate
     * const WhatsappMessageTemplate = await prisma.whatsappMessageTemplate.create({
     *   data: {
     *     // ... data to create a WhatsappMessageTemplate
     *   }
     * })
     * 
     */
    create<T extends WhatsappMessageTemplateCreateArgs>(args: SelectSubset<T, WhatsappMessageTemplateCreateArgs<ExtArgs>>): Prisma__WhatsappMessageTemplateClient<$Result.GetResult<Prisma.$WhatsappMessageTemplatePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many WhatsappMessageTemplates.
     * @param {WhatsappMessageTemplateCreateManyArgs} args - Arguments to create many WhatsappMessageTemplates.
     * @example
     * // Create many WhatsappMessageTemplates
     * const whatsappMessageTemplate = await prisma.whatsappMessageTemplate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WhatsappMessageTemplateCreateManyArgs>(args?: SelectSubset<T, WhatsappMessageTemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a WhatsappMessageTemplate.
     * @param {WhatsappMessageTemplateDeleteArgs} args - Arguments to delete one WhatsappMessageTemplate.
     * @example
     * // Delete one WhatsappMessageTemplate
     * const WhatsappMessageTemplate = await prisma.whatsappMessageTemplate.delete({
     *   where: {
     *     // ... filter to delete one WhatsappMessageTemplate
     *   }
     * })
     * 
     */
    delete<T extends WhatsappMessageTemplateDeleteArgs>(args: SelectSubset<T, WhatsappMessageTemplateDeleteArgs<ExtArgs>>): Prisma__WhatsappMessageTemplateClient<$Result.GetResult<Prisma.$WhatsappMessageTemplatePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one WhatsappMessageTemplate.
     * @param {WhatsappMessageTemplateUpdateArgs} args - Arguments to update one WhatsappMessageTemplate.
     * @example
     * // Update one WhatsappMessageTemplate
     * const whatsappMessageTemplate = await prisma.whatsappMessageTemplate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WhatsappMessageTemplateUpdateArgs>(args: SelectSubset<T, WhatsappMessageTemplateUpdateArgs<ExtArgs>>): Prisma__WhatsappMessageTemplateClient<$Result.GetResult<Prisma.$WhatsappMessageTemplatePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more WhatsappMessageTemplates.
     * @param {WhatsappMessageTemplateDeleteManyArgs} args - Arguments to filter WhatsappMessageTemplates to delete.
     * @example
     * // Delete a few WhatsappMessageTemplates
     * const { count } = await prisma.whatsappMessageTemplate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WhatsappMessageTemplateDeleteManyArgs>(args?: SelectSubset<T, WhatsappMessageTemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WhatsappMessageTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsappMessageTemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WhatsappMessageTemplates
     * const whatsappMessageTemplate = await prisma.whatsappMessageTemplate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WhatsappMessageTemplateUpdateManyArgs>(args: SelectSubset<T, WhatsappMessageTemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WhatsappMessageTemplate.
     * @param {WhatsappMessageTemplateUpsertArgs} args - Arguments to update or create a WhatsappMessageTemplate.
     * @example
     * // Update or create a WhatsappMessageTemplate
     * const whatsappMessageTemplate = await prisma.whatsappMessageTemplate.upsert({
     *   create: {
     *     // ... data to create a WhatsappMessageTemplate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WhatsappMessageTemplate we want to update
     *   }
     * })
     */
    upsert<T extends WhatsappMessageTemplateUpsertArgs>(args: SelectSubset<T, WhatsappMessageTemplateUpsertArgs<ExtArgs>>): Prisma__WhatsappMessageTemplateClient<$Result.GetResult<Prisma.$WhatsappMessageTemplatePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of WhatsappMessageTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsappMessageTemplateCountArgs} args - Arguments to filter WhatsappMessageTemplates to count.
     * @example
     * // Count the number of WhatsappMessageTemplates
     * const count = await prisma.whatsappMessageTemplate.count({
     *   where: {
     *     // ... the filter for the WhatsappMessageTemplates we want to count
     *   }
     * })
    **/
    count<T extends WhatsappMessageTemplateCountArgs>(
      args?: Subset<T, WhatsappMessageTemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WhatsappMessageTemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WhatsappMessageTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsappMessageTemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WhatsappMessageTemplateAggregateArgs>(args: Subset<T, WhatsappMessageTemplateAggregateArgs>): Prisma.PrismaPromise<GetWhatsappMessageTemplateAggregateType<T>>

    /**
     * Group by WhatsappMessageTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsappMessageTemplateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WhatsappMessageTemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WhatsappMessageTemplateGroupByArgs['orderBy'] }
        : { orderBy?: WhatsappMessageTemplateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WhatsappMessageTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWhatsappMessageTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WhatsappMessageTemplate model
   */
  readonly fields: WhatsappMessageTemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WhatsappMessageTemplate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WhatsappMessageTemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WhatsappMessageTemplate model
   */ 
  interface WhatsappMessageTemplateFieldRefs {
    readonly id: FieldRef<"WhatsappMessageTemplate", 'String'>
    readonly templateName: FieldRef<"WhatsappMessageTemplate", 'String'>
    readonly templateBody: FieldRef<"WhatsappMessageTemplate", 'String'>
    readonly templateCategory: FieldRef<"WhatsappMessageTemplate", 'String'>
    readonly isActive: FieldRef<"WhatsappMessageTemplate", 'Boolean'>
    readonly createdAt: FieldRef<"WhatsappMessageTemplate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WhatsappMessageTemplate findUnique
   */
  export type WhatsappMessageTemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappMessageTemplate
     */
    select?: WhatsappMessageTemplateSelect<ExtArgs> | null
    /**
     * Filter, which WhatsappMessageTemplate to fetch.
     */
    where: WhatsappMessageTemplateWhereUniqueInput
  }

  /**
   * WhatsappMessageTemplate findUniqueOrThrow
   */
  export type WhatsappMessageTemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappMessageTemplate
     */
    select?: WhatsappMessageTemplateSelect<ExtArgs> | null
    /**
     * Filter, which WhatsappMessageTemplate to fetch.
     */
    where: WhatsappMessageTemplateWhereUniqueInput
  }

  /**
   * WhatsappMessageTemplate findFirst
   */
  export type WhatsappMessageTemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappMessageTemplate
     */
    select?: WhatsappMessageTemplateSelect<ExtArgs> | null
    /**
     * Filter, which WhatsappMessageTemplate to fetch.
     */
    where?: WhatsappMessageTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WhatsappMessageTemplates to fetch.
     */
    orderBy?: WhatsappMessageTemplateOrderByWithRelationInput | WhatsappMessageTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WhatsappMessageTemplates.
     */
    cursor?: WhatsappMessageTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WhatsappMessageTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WhatsappMessageTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WhatsappMessageTemplates.
     */
    distinct?: WhatsappMessageTemplateScalarFieldEnum | WhatsappMessageTemplateScalarFieldEnum[]
  }

  /**
   * WhatsappMessageTemplate findFirstOrThrow
   */
  export type WhatsappMessageTemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappMessageTemplate
     */
    select?: WhatsappMessageTemplateSelect<ExtArgs> | null
    /**
     * Filter, which WhatsappMessageTemplate to fetch.
     */
    where?: WhatsappMessageTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WhatsappMessageTemplates to fetch.
     */
    orderBy?: WhatsappMessageTemplateOrderByWithRelationInput | WhatsappMessageTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WhatsappMessageTemplates.
     */
    cursor?: WhatsappMessageTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WhatsappMessageTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WhatsappMessageTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WhatsappMessageTemplates.
     */
    distinct?: WhatsappMessageTemplateScalarFieldEnum | WhatsappMessageTemplateScalarFieldEnum[]
  }

  /**
   * WhatsappMessageTemplate findMany
   */
  export type WhatsappMessageTemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappMessageTemplate
     */
    select?: WhatsappMessageTemplateSelect<ExtArgs> | null
    /**
     * Filter, which WhatsappMessageTemplates to fetch.
     */
    where?: WhatsappMessageTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WhatsappMessageTemplates to fetch.
     */
    orderBy?: WhatsappMessageTemplateOrderByWithRelationInput | WhatsappMessageTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WhatsappMessageTemplates.
     */
    cursor?: WhatsappMessageTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WhatsappMessageTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WhatsappMessageTemplates.
     */
    skip?: number
    distinct?: WhatsappMessageTemplateScalarFieldEnum | WhatsappMessageTemplateScalarFieldEnum[]
  }

  /**
   * WhatsappMessageTemplate create
   */
  export type WhatsappMessageTemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappMessageTemplate
     */
    select?: WhatsappMessageTemplateSelect<ExtArgs> | null
    /**
     * The data needed to create a WhatsappMessageTemplate.
     */
    data: XOR<WhatsappMessageTemplateCreateInput, WhatsappMessageTemplateUncheckedCreateInput>
  }

  /**
   * WhatsappMessageTemplate createMany
   */
  export type WhatsappMessageTemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WhatsappMessageTemplates.
     */
    data: WhatsappMessageTemplateCreateManyInput | WhatsappMessageTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WhatsappMessageTemplate update
   */
  export type WhatsappMessageTemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappMessageTemplate
     */
    select?: WhatsappMessageTemplateSelect<ExtArgs> | null
    /**
     * The data needed to update a WhatsappMessageTemplate.
     */
    data: XOR<WhatsappMessageTemplateUpdateInput, WhatsappMessageTemplateUncheckedUpdateInput>
    /**
     * Choose, which WhatsappMessageTemplate to update.
     */
    where: WhatsappMessageTemplateWhereUniqueInput
  }

  /**
   * WhatsappMessageTemplate updateMany
   */
  export type WhatsappMessageTemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WhatsappMessageTemplates.
     */
    data: XOR<WhatsappMessageTemplateUpdateManyMutationInput, WhatsappMessageTemplateUncheckedUpdateManyInput>
    /**
     * Filter which WhatsappMessageTemplates to update
     */
    where?: WhatsappMessageTemplateWhereInput
  }

  /**
   * WhatsappMessageTemplate upsert
   */
  export type WhatsappMessageTemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappMessageTemplate
     */
    select?: WhatsappMessageTemplateSelect<ExtArgs> | null
    /**
     * The filter to search for the WhatsappMessageTemplate to update in case it exists.
     */
    where: WhatsappMessageTemplateWhereUniqueInput
    /**
     * In case the WhatsappMessageTemplate found by the `where` argument doesn't exist, create a new WhatsappMessageTemplate with this data.
     */
    create: XOR<WhatsappMessageTemplateCreateInput, WhatsappMessageTemplateUncheckedCreateInput>
    /**
     * In case the WhatsappMessageTemplate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WhatsappMessageTemplateUpdateInput, WhatsappMessageTemplateUncheckedUpdateInput>
  }

  /**
   * WhatsappMessageTemplate delete
   */
  export type WhatsappMessageTemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappMessageTemplate
     */
    select?: WhatsappMessageTemplateSelect<ExtArgs> | null
    /**
     * Filter which WhatsappMessageTemplate to delete.
     */
    where: WhatsappMessageTemplateWhereUniqueInput
  }

  /**
   * WhatsappMessageTemplate deleteMany
   */
  export type WhatsappMessageTemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WhatsappMessageTemplates to delete
     */
    where?: WhatsappMessageTemplateWhereInput
  }

  /**
   * WhatsappMessageTemplate without action
   */
  export type WhatsappMessageTemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappMessageTemplate
     */
    select?: WhatsappMessageTemplateSelect<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationAvgAggregateOutputType = {
    retryCount: number | null
  }

  export type NotificationSumAggregateOutputType = {
    retryCount: number | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    recipientId: string | null
    channel: string | null
    type: string | null
    status: string | null
    content: string | null
    title: string | null
    read: boolean | null
    idempotencyKey: string | null
    retryCount: number | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    recipientId: string | null
    channel: string | null
    type: string | null
    status: string | null
    content: string | null
    title: string | null
    read: boolean | null
    idempotencyKey: string | null
    retryCount: number | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    recipientId: number
    channel: number
    type: number
    status: number
    content: number
    title: number
    read: number
    idempotencyKey: number
    retryCount: number
    createdAt: number
    _all: number
  }


  export type NotificationAvgAggregateInputType = {
    retryCount?: true
  }

  export type NotificationSumAggregateInputType = {
    retryCount?: true
  }

  export type NotificationMinAggregateInputType = {
    id?: true
    recipientId?: true
    channel?: true
    type?: true
    status?: true
    content?: true
    title?: true
    read?: true
    idempotencyKey?: true
    retryCount?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    recipientId?: true
    channel?: true
    type?: true
    status?: true
    content?: true
    title?: true
    read?: true
    idempotencyKey?: true
    retryCount?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    recipientId?: true
    channel?: true
    type?: true
    status?: true
    content?: true
    title?: true
    read?: true
    idempotencyKey?: true
    retryCount?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _avg?: NotificationAvgAggregateInputType
    _sum?: NotificationSumAggregateInputType
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    recipientId: string
    channel: string
    type: string
    status: string
    content: string | null
    title: string | null
    read: boolean
    idempotencyKey: string | null
    retryCount: number
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    recipientId?: boolean
    channel?: boolean
    type?: boolean
    status?: boolean
    content?: boolean
    title?: boolean
    read?: boolean
    idempotencyKey?: boolean
    retryCount?: boolean
    createdAt?: boolean
    deliveryLogs?: boolean | Notification$deliveryLogsArgs<ExtArgs>
    _count?: boolean | NotificationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>


  export type NotificationSelectScalar = {
    id?: boolean
    recipientId?: boolean
    channel?: boolean
    type?: boolean
    status?: boolean
    content?: boolean
    title?: boolean
    read?: boolean
    idempotencyKey?: boolean
    retryCount?: boolean
    createdAt?: boolean
  }

  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deliveryLogs?: boolean | Notification$deliveryLogsArgs<ExtArgs>
    _count?: boolean | NotificationCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      deliveryLogs: Prisma.$NotificationDeliveryLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      recipientId: string
      channel: string
      type: string
      status: string
      content: string | null
      title: string | null
      read: boolean
      idempotencyKey: string | null
      retryCount: number
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    deliveryLogs<T extends Notification$deliveryLogsArgs<ExtArgs> = {}>(args?: Subset<T, Notification$deliveryLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationDeliveryLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */ 
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly recipientId: FieldRef<"Notification", 'String'>
    readonly channel: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'String'>
    readonly status: FieldRef<"Notification", 'String'>
    readonly content: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly read: FieldRef<"Notification", 'Boolean'>
    readonly idempotencyKey: FieldRef<"Notification", 'String'>
    readonly retryCount: FieldRef<"Notification", 'Int'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification.deliveryLogs
   */
  export type Notification$deliveryLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDeliveryLog
     */
    select?: NotificationDeliveryLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationDeliveryLogInclude<ExtArgs> | null
    where?: NotificationDeliveryLogWhereInput
    orderBy?: NotificationDeliveryLogOrderByWithRelationInput | NotificationDeliveryLogOrderByWithRelationInput[]
    cursor?: NotificationDeliveryLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationDeliveryLogScalarFieldEnum | NotificationDeliveryLogScalarFieldEnum[]
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Model NotificationDeliveryLog
   */

  export type AggregateNotificationDeliveryLog = {
    _count: NotificationDeliveryLogCountAggregateOutputType | null
    _min: NotificationDeliveryLogMinAggregateOutputType | null
    _max: NotificationDeliveryLogMaxAggregateOutputType | null
  }

  export type NotificationDeliveryLogMinAggregateOutputType = {
    id: string | null
    notificationId: string | null
    deliveryStatus: string | null
    providerResponse: string | null
    attemptedAt: Date | null
  }

  export type NotificationDeliveryLogMaxAggregateOutputType = {
    id: string | null
    notificationId: string | null
    deliveryStatus: string | null
    providerResponse: string | null
    attemptedAt: Date | null
  }

  export type NotificationDeliveryLogCountAggregateOutputType = {
    id: number
    notificationId: number
    deliveryStatus: number
    providerResponse: number
    attemptedAt: number
    _all: number
  }


  export type NotificationDeliveryLogMinAggregateInputType = {
    id?: true
    notificationId?: true
    deliveryStatus?: true
    providerResponse?: true
    attemptedAt?: true
  }

  export type NotificationDeliveryLogMaxAggregateInputType = {
    id?: true
    notificationId?: true
    deliveryStatus?: true
    providerResponse?: true
    attemptedAt?: true
  }

  export type NotificationDeliveryLogCountAggregateInputType = {
    id?: true
    notificationId?: true
    deliveryStatus?: true
    providerResponse?: true
    attemptedAt?: true
    _all?: true
  }

  export type NotificationDeliveryLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationDeliveryLog to aggregate.
     */
    where?: NotificationDeliveryLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationDeliveryLogs to fetch.
     */
    orderBy?: NotificationDeliveryLogOrderByWithRelationInput | NotificationDeliveryLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationDeliveryLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationDeliveryLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationDeliveryLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NotificationDeliveryLogs
    **/
    _count?: true | NotificationDeliveryLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationDeliveryLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationDeliveryLogMaxAggregateInputType
  }

  export type GetNotificationDeliveryLogAggregateType<T extends NotificationDeliveryLogAggregateArgs> = {
        [P in keyof T & keyof AggregateNotificationDeliveryLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotificationDeliveryLog[P]>
      : GetScalarType<T[P], AggregateNotificationDeliveryLog[P]>
  }




  export type NotificationDeliveryLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationDeliveryLogWhereInput
    orderBy?: NotificationDeliveryLogOrderByWithAggregationInput | NotificationDeliveryLogOrderByWithAggregationInput[]
    by: NotificationDeliveryLogScalarFieldEnum[] | NotificationDeliveryLogScalarFieldEnum
    having?: NotificationDeliveryLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationDeliveryLogCountAggregateInputType | true
    _min?: NotificationDeliveryLogMinAggregateInputType
    _max?: NotificationDeliveryLogMaxAggregateInputType
  }

  export type NotificationDeliveryLogGroupByOutputType = {
    id: string
    notificationId: string | null
    deliveryStatus: string
    providerResponse: string | null
    attemptedAt: Date
    _count: NotificationDeliveryLogCountAggregateOutputType | null
    _min: NotificationDeliveryLogMinAggregateOutputType | null
    _max: NotificationDeliveryLogMaxAggregateOutputType | null
  }

  type GetNotificationDeliveryLogGroupByPayload<T extends NotificationDeliveryLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationDeliveryLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationDeliveryLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationDeliveryLogGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationDeliveryLogGroupByOutputType[P]>
        }
      >
    >


  export type NotificationDeliveryLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    notificationId?: boolean
    deliveryStatus?: boolean
    providerResponse?: boolean
    attemptedAt?: boolean
    notification?: boolean | NotificationDeliveryLog$notificationArgs<ExtArgs>
  }, ExtArgs["result"]["notificationDeliveryLog"]>


  export type NotificationDeliveryLogSelectScalar = {
    id?: boolean
    notificationId?: boolean
    deliveryStatus?: boolean
    providerResponse?: boolean
    attemptedAt?: boolean
  }

  export type NotificationDeliveryLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notification?: boolean | NotificationDeliveryLog$notificationArgs<ExtArgs>
  }

  export type $NotificationDeliveryLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NotificationDeliveryLog"
    objects: {
      notification: Prisma.$NotificationPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      notificationId: string | null
      deliveryStatus: string
      providerResponse: string | null
      attemptedAt: Date
    }, ExtArgs["result"]["notificationDeliveryLog"]>
    composites: {}
  }

  type NotificationDeliveryLogGetPayload<S extends boolean | null | undefined | NotificationDeliveryLogDefaultArgs> = $Result.GetResult<Prisma.$NotificationDeliveryLogPayload, S>

  type NotificationDeliveryLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NotificationDeliveryLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NotificationDeliveryLogCountAggregateInputType | true
    }

  export interface NotificationDeliveryLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NotificationDeliveryLog'], meta: { name: 'NotificationDeliveryLog' } }
    /**
     * Find zero or one NotificationDeliveryLog that matches the filter.
     * @param {NotificationDeliveryLogFindUniqueArgs} args - Arguments to find a NotificationDeliveryLog
     * @example
     * // Get one NotificationDeliveryLog
     * const notificationDeliveryLog = await prisma.notificationDeliveryLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationDeliveryLogFindUniqueArgs>(args: SelectSubset<T, NotificationDeliveryLogFindUniqueArgs<ExtArgs>>): Prisma__NotificationDeliveryLogClient<$Result.GetResult<Prisma.$NotificationDeliveryLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one NotificationDeliveryLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NotificationDeliveryLogFindUniqueOrThrowArgs} args - Arguments to find a NotificationDeliveryLog
     * @example
     * // Get one NotificationDeliveryLog
     * const notificationDeliveryLog = await prisma.notificationDeliveryLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationDeliveryLogFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationDeliveryLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationDeliveryLogClient<$Result.GetResult<Prisma.$NotificationDeliveryLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first NotificationDeliveryLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationDeliveryLogFindFirstArgs} args - Arguments to find a NotificationDeliveryLog
     * @example
     * // Get one NotificationDeliveryLog
     * const notificationDeliveryLog = await prisma.notificationDeliveryLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationDeliveryLogFindFirstArgs>(args?: SelectSubset<T, NotificationDeliveryLogFindFirstArgs<ExtArgs>>): Prisma__NotificationDeliveryLogClient<$Result.GetResult<Prisma.$NotificationDeliveryLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first NotificationDeliveryLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationDeliveryLogFindFirstOrThrowArgs} args - Arguments to find a NotificationDeliveryLog
     * @example
     * // Get one NotificationDeliveryLog
     * const notificationDeliveryLog = await prisma.notificationDeliveryLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationDeliveryLogFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationDeliveryLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationDeliveryLogClient<$Result.GetResult<Prisma.$NotificationDeliveryLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more NotificationDeliveryLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationDeliveryLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NotificationDeliveryLogs
     * const notificationDeliveryLogs = await prisma.notificationDeliveryLog.findMany()
     * 
     * // Get first 10 NotificationDeliveryLogs
     * const notificationDeliveryLogs = await prisma.notificationDeliveryLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationDeliveryLogWithIdOnly = await prisma.notificationDeliveryLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationDeliveryLogFindManyArgs>(args?: SelectSubset<T, NotificationDeliveryLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationDeliveryLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a NotificationDeliveryLog.
     * @param {NotificationDeliveryLogCreateArgs} args - Arguments to create a NotificationDeliveryLog.
     * @example
     * // Create one NotificationDeliveryLog
     * const NotificationDeliveryLog = await prisma.notificationDeliveryLog.create({
     *   data: {
     *     // ... data to create a NotificationDeliveryLog
     *   }
     * })
     * 
     */
    create<T extends NotificationDeliveryLogCreateArgs>(args: SelectSubset<T, NotificationDeliveryLogCreateArgs<ExtArgs>>): Prisma__NotificationDeliveryLogClient<$Result.GetResult<Prisma.$NotificationDeliveryLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many NotificationDeliveryLogs.
     * @param {NotificationDeliveryLogCreateManyArgs} args - Arguments to create many NotificationDeliveryLogs.
     * @example
     * // Create many NotificationDeliveryLogs
     * const notificationDeliveryLog = await prisma.notificationDeliveryLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationDeliveryLogCreateManyArgs>(args?: SelectSubset<T, NotificationDeliveryLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a NotificationDeliveryLog.
     * @param {NotificationDeliveryLogDeleteArgs} args - Arguments to delete one NotificationDeliveryLog.
     * @example
     * // Delete one NotificationDeliveryLog
     * const NotificationDeliveryLog = await prisma.notificationDeliveryLog.delete({
     *   where: {
     *     // ... filter to delete one NotificationDeliveryLog
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeliveryLogDeleteArgs>(args: SelectSubset<T, NotificationDeliveryLogDeleteArgs<ExtArgs>>): Prisma__NotificationDeliveryLogClient<$Result.GetResult<Prisma.$NotificationDeliveryLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one NotificationDeliveryLog.
     * @param {NotificationDeliveryLogUpdateArgs} args - Arguments to update one NotificationDeliveryLog.
     * @example
     * // Update one NotificationDeliveryLog
     * const notificationDeliveryLog = await prisma.notificationDeliveryLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationDeliveryLogUpdateArgs>(args: SelectSubset<T, NotificationDeliveryLogUpdateArgs<ExtArgs>>): Prisma__NotificationDeliveryLogClient<$Result.GetResult<Prisma.$NotificationDeliveryLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more NotificationDeliveryLogs.
     * @param {NotificationDeliveryLogDeleteManyArgs} args - Arguments to filter NotificationDeliveryLogs to delete.
     * @example
     * // Delete a few NotificationDeliveryLogs
     * const { count } = await prisma.notificationDeliveryLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeliveryLogDeleteManyArgs>(args?: SelectSubset<T, NotificationDeliveryLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationDeliveryLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationDeliveryLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NotificationDeliveryLogs
     * const notificationDeliveryLog = await prisma.notificationDeliveryLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationDeliveryLogUpdateManyArgs>(args: SelectSubset<T, NotificationDeliveryLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one NotificationDeliveryLog.
     * @param {NotificationDeliveryLogUpsertArgs} args - Arguments to update or create a NotificationDeliveryLog.
     * @example
     * // Update or create a NotificationDeliveryLog
     * const notificationDeliveryLog = await prisma.notificationDeliveryLog.upsert({
     *   create: {
     *     // ... data to create a NotificationDeliveryLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NotificationDeliveryLog we want to update
     *   }
     * })
     */
    upsert<T extends NotificationDeliveryLogUpsertArgs>(args: SelectSubset<T, NotificationDeliveryLogUpsertArgs<ExtArgs>>): Prisma__NotificationDeliveryLogClient<$Result.GetResult<Prisma.$NotificationDeliveryLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of NotificationDeliveryLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationDeliveryLogCountArgs} args - Arguments to filter NotificationDeliveryLogs to count.
     * @example
     * // Count the number of NotificationDeliveryLogs
     * const count = await prisma.notificationDeliveryLog.count({
     *   where: {
     *     // ... the filter for the NotificationDeliveryLogs we want to count
     *   }
     * })
    **/
    count<T extends NotificationDeliveryLogCountArgs>(
      args?: Subset<T, NotificationDeliveryLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationDeliveryLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NotificationDeliveryLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationDeliveryLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationDeliveryLogAggregateArgs>(args: Subset<T, NotificationDeliveryLogAggregateArgs>): Prisma.PrismaPromise<GetNotificationDeliveryLogAggregateType<T>>

    /**
     * Group by NotificationDeliveryLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationDeliveryLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationDeliveryLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationDeliveryLogGroupByArgs['orderBy'] }
        : { orderBy?: NotificationDeliveryLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationDeliveryLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationDeliveryLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NotificationDeliveryLog model
   */
  readonly fields: NotificationDeliveryLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NotificationDeliveryLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationDeliveryLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    notification<T extends NotificationDeliveryLog$notificationArgs<ExtArgs> = {}>(args?: Subset<T, NotificationDeliveryLog$notificationArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NotificationDeliveryLog model
   */ 
  interface NotificationDeliveryLogFieldRefs {
    readonly id: FieldRef<"NotificationDeliveryLog", 'String'>
    readonly notificationId: FieldRef<"NotificationDeliveryLog", 'String'>
    readonly deliveryStatus: FieldRef<"NotificationDeliveryLog", 'String'>
    readonly providerResponse: FieldRef<"NotificationDeliveryLog", 'String'>
    readonly attemptedAt: FieldRef<"NotificationDeliveryLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NotificationDeliveryLog findUnique
   */
  export type NotificationDeliveryLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDeliveryLog
     */
    select?: NotificationDeliveryLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationDeliveryLogInclude<ExtArgs> | null
    /**
     * Filter, which NotificationDeliveryLog to fetch.
     */
    where: NotificationDeliveryLogWhereUniqueInput
  }

  /**
   * NotificationDeliveryLog findUniqueOrThrow
   */
  export type NotificationDeliveryLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDeliveryLog
     */
    select?: NotificationDeliveryLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationDeliveryLogInclude<ExtArgs> | null
    /**
     * Filter, which NotificationDeliveryLog to fetch.
     */
    where: NotificationDeliveryLogWhereUniqueInput
  }

  /**
   * NotificationDeliveryLog findFirst
   */
  export type NotificationDeliveryLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDeliveryLog
     */
    select?: NotificationDeliveryLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationDeliveryLogInclude<ExtArgs> | null
    /**
     * Filter, which NotificationDeliveryLog to fetch.
     */
    where?: NotificationDeliveryLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationDeliveryLogs to fetch.
     */
    orderBy?: NotificationDeliveryLogOrderByWithRelationInput | NotificationDeliveryLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationDeliveryLogs.
     */
    cursor?: NotificationDeliveryLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationDeliveryLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationDeliveryLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationDeliveryLogs.
     */
    distinct?: NotificationDeliveryLogScalarFieldEnum | NotificationDeliveryLogScalarFieldEnum[]
  }

  /**
   * NotificationDeliveryLog findFirstOrThrow
   */
  export type NotificationDeliveryLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDeliveryLog
     */
    select?: NotificationDeliveryLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationDeliveryLogInclude<ExtArgs> | null
    /**
     * Filter, which NotificationDeliveryLog to fetch.
     */
    where?: NotificationDeliveryLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationDeliveryLogs to fetch.
     */
    orderBy?: NotificationDeliveryLogOrderByWithRelationInput | NotificationDeliveryLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationDeliveryLogs.
     */
    cursor?: NotificationDeliveryLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationDeliveryLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationDeliveryLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationDeliveryLogs.
     */
    distinct?: NotificationDeliveryLogScalarFieldEnum | NotificationDeliveryLogScalarFieldEnum[]
  }

  /**
   * NotificationDeliveryLog findMany
   */
  export type NotificationDeliveryLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDeliveryLog
     */
    select?: NotificationDeliveryLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationDeliveryLogInclude<ExtArgs> | null
    /**
     * Filter, which NotificationDeliveryLogs to fetch.
     */
    where?: NotificationDeliveryLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationDeliveryLogs to fetch.
     */
    orderBy?: NotificationDeliveryLogOrderByWithRelationInput | NotificationDeliveryLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NotificationDeliveryLogs.
     */
    cursor?: NotificationDeliveryLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationDeliveryLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationDeliveryLogs.
     */
    skip?: number
    distinct?: NotificationDeliveryLogScalarFieldEnum | NotificationDeliveryLogScalarFieldEnum[]
  }

  /**
   * NotificationDeliveryLog create
   */
  export type NotificationDeliveryLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDeliveryLog
     */
    select?: NotificationDeliveryLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationDeliveryLogInclude<ExtArgs> | null
    /**
     * The data needed to create a NotificationDeliveryLog.
     */
    data: XOR<NotificationDeliveryLogCreateInput, NotificationDeliveryLogUncheckedCreateInput>
  }

  /**
   * NotificationDeliveryLog createMany
   */
  export type NotificationDeliveryLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NotificationDeliveryLogs.
     */
    data: NotificationDeliveryLogCreateManyInput | NotificationDeliveryLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificationDeliveryLog update
   */
  export type NotificationDeliveryLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDeliveryLog
     */
    select?: NotificationDeliveryLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationDeliveryLogInclude<ExtArgs> | null
    /**
     * The data needed to update a NotificationDeliveryLog.
     */
    data: XOR<NotificationDeliveryLogUpdateInput, NotificationDeliveryLogUncheckedUpdateInput>
    /**
     * Choose, which NotificationDeliveryLog to update.
     */
    where: NotificationDeliveryLogWhereUniqueInput
  }

  /**
   * NotificationDeliveryLog updateMany
   */
  export type NotificationDeliveryLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NotificationDeliveryLogs.
     */
    data: XOR<NotificationDeliveryLogUpdateManyMutationInput, NotificationDeliveryLogUncheckedUpdateManyInput>
    /**
     * Filter which NotificationDeliveryLogs to update
     */
    where?: NotificationDeliveryLogWhereInput
  }

  /**
   * NotificationDeliveryLog upsert
   */
  export type NotificationDeliveryLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDeliveryLog
     */
    select?: NotificationDeliveryLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationDeliveryLogInclude<ExtArgs> | null
    /**
     * The filter to search for the NotificationDeliveryLog to update in case it exists.
     */
    where: NotificationDeliveryLogWhereUniqueInput
    /**
     * In case the NotificationDeliveryLog found by the `where` argument doesn't exist, create a new NotificationDeliveryLog with this data.
     */
    create: XOR<NotificationDeliveryLogCreateInput, NotificationDeliveryLogUncheckedCreateInput>
    /**
     * In case the NotificationDeliveryLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationDeliveryLogUpdateInput, NotificationDeliveryLogUncheckedUpdateInput>
  }

  /**
   * NotificationDeliveryLog delete
   */
  export type NotificationDeliveryLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDeliveryLog
     */
    select?: NotificationDeliveryLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationDeliveryLogInclude<ExtArgs> | null
    /**
     * Filter which NotificationDeliveryLog to delete.
     */
    where: NotificationDeliveryLogWhereUniqueInput
  }

  /**
   * NotificationDeliveryLog deleteMany
   */
  export type NotificationDeliveryLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationDeliveryLogs to delete
     */
    where?: NotificationDeliveryLogWhereInput
  }

  /**
   * NotificationDeliveryLog.notification
   */
  export type NotificationDeliveryLog$notificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
  }

  /**
   * NotificationDeliveryLog without action
   */
  export type NotificationDeliveryLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationDeliveryLog
     */
    select?: NotificationDeliveryLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationDeliveryLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ConversationScalarFieldEnum: {
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

  export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum]


  export const MessageScalarFieldEnum: {
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

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const MessageAttachmentScalarFieldEnum: {
    id: 'id',
    messageId: 'messageId',
    fileName: 'fileName',
    fileType: 'fileType',
    s3Key: 's3Key',
    fileSize: 'fileSize',
    createdAt: 'createdAt'
  };

  export type MessageAttachmentScalarFieldEnum = (typeof MessageAttachmentScalarFieldEnum)[keyof typeof MessageAttachmentScalarFieldEnum]


  export const MessageDeliveryStatusScalarFieldEnum: {
    id: 'id',
    messageId: 'messageId',
    status: 'status',
    timestamp: 'timestamp',
    remarks: 'remarks'
  };

  export type MessageDeliveryStatusScalarFieldEnum = (typeof MessageDeliveryStatusScalarFieldEnum)[keyof typeof MessageDeliveryStatusScalarFieldEnum]


  export const WhatsappWebhookLogScalarFieldEnum: {
    id: 'id',
    payload: 'payload',
    processedStatus: 'processedStatus',
    errorMessage: 'errorMessage',
    createdAt: 'createdAt'
  };

  export type WhatsappWebhookLogScalarFieldEnum = (typeof WhatsappWebhookLogScalarFieldEnum)[keyof typeof WhatsappWebhookLogScalarFieldEnum]


  export const NotificationTemplateScalarFieldEnum: {
    id: 'id',
    templateName: 'templateName',
    channel: 'channel',
    contentTemplate: 'contentTemplate',
    isActive: 'isActive',
    createdAt: 'createdAt'
  };

  export type NotificationTemplateScalarFieldEnum = (typeof NotificationTemplateScalarFieldEnum)[keyof typeof NotificationTemplateScalarFieldEnum]


  export const UnreadMessageTrackingScalarFieldEnum: {
    userId: 'userId',
    conversationId: 'conversationId',
    unreadCount: 'unreadCount'
  };

  export type UnreadMessageTrackingScalarFieldEnum = (typeof UnreadMessageTrackingScalarFieldEnum)[keyof typeof UnreadMessageTrackingScalarFieldEnum]


  export const WebsocketSessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    connectedAt: 'connectedAt',
    lastHeartbeat: 'lastHeartbeat'
  };

  export type WebsocketSessionScalarFieldEnum = (typeof WebsocketSessionScalarFieldEnum)[keyof typeof WebsocketSessionScalarFieldEnum]


  export const TeamMeetingRoomScalarFieldEnum: {
    id: 'id',
    roomKey: 'roomKey',
    createdAt: 'createdAt'
  };

  export type TeamMeetingRoomScalarFieldEnum = (typeof TeamMeetingRoomScalarFieldEnum)[keyof typeof TeamMeetingRoomScalarFieldEnum]


  export const TeamMeetingMessageScalarFieldEnum: {
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

  export type TeamMeetingMessageScalarFieldEnum = (typeof TeamMeetingMessageScalarFieldEnum)[keyof typeof TeamMeetingMessageScalarFieldEnum]


  export const WhatsappMessageTemplateScalarFieldEnum: {
    id: 'id',
    templateName: 'templateName',
    templateBody: 'templateBody',
    templateCategory: 'templateCategory',
    isActive: 'isActive',
    createdAt: 'createdAt'
  };

  export type WhatsappMessageTemplateScalarFieldEnum = (typeof WhatsappMessageTemplateScalarFieldEnum)[keyof typeof WhatsappMessageTemplateScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
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

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const NotificationDeliveryLogScalarFieldEnum: {
    id: 'id',
    notificationId: 'notificationId',
    deliveryStatus: 'deliveryStatus',
    providerResponse: 'providerResponse',
    attemptedAt: 'attemptedAt'
  };

  export type NotificationDeliveryLogScalarFieldEnum = (typeof NotificationDeliveryLogScalarFieldEnum)[keyof typeof NotificationDeliveryLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type ConversationWhereInput = {
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    id?: StringFilter<"Conversation"> | string
    connectorId?: StringNullableFilter<"Conversation"> | string | null
    rmId?: StringNullableFilter<"Conversation"> | string | null
    loanApplicationId?: StringNullableFilter<"Conversation"> | string | null
    assignedOpsUserId?: StringNullableFilter<"Conversation"> | string | null
    conversationStatus?: StringFilter<"Conversation"> | string
    conversationType?: StringFilter<"Conversation"> | string
    customerName?: StringNullableFilter<"Conversation"> | string | null
    customerPhone?: StringNullableFilter<"Conversation"> | string | null
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    messages?: MessageListRelationFilter
    unreadTracking?: UnreadMessageTrackingListRelationFilter
  }

  export type ConversationOrderByWithRelationInput = {
    id?: SortOrder
    connectorId?: SortOrderInput | SortOrder
    rmId?: SortOrderInput | SortOrder
    loanApplicationId?: SortOrderInput | SortOrder
    assignedOpsUserId?: SortOrderInput | SortOrder
    conversationStatus?: SortOrder
    conversationType?: SortOrder
    customerName?: SortOrderInput | SortOrder
    customerPhone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    messages?: MessageOrderByRelationAggregateInput
    unreadTracking?: UnreadMessageTrackingOrderByRelationAggregateInput
  }

  export type ConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    connectorId?: StringNullableFilter<"Conversation"> | string | null
    rmId?: StringNullableFilter<"Conversation"> | string | null
    loanApplicationId?: StringNullableFilter<"Conversation"> | string | null
    assignedOpsUserId?: StringNullableFilter<"Conversation"> | string | null
    conversationStatus?: StringFilter<"Conversation"> | string
    conversationType?: StringFilter<"Conversation"> | string
    customerName?: StringNullableFilter<"Conversation"> | string | null
    customerPhone?: StringNullableFilter<"Conversation"> | string | null
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    messages?: MessageListRelationFilter
    unreadTracking?: UnreadMessageTrackingListRelationFilter
  }, "id">

  export type ConversationOrderByWithAggregationInput = {
    id?: SortOrder
    connectorId?: SortOrderInput | SortOrder
    rmId?: SortOrderInput | SortOrder
    loanApplicationId?: SortOrderInput | SortOrder
    assignedOpsUserId?: SortOrderInput | SortOrder
    conversationStatus?: SortOrder
    conversationType?: SortOrder
    customerName?: SortOrderInput | SortOrder
    customerPhone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ConversationCountOrderByAggregateInput
    _max?: ConversationMaxOrderByAggregateInput
    _min?: ConversationMinOrderByAggregateInput
  }

  export type ConversationScalarWhereWithAggregatesInput = {
    AND?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    OR?: ConversationScalarWhereWithAggregatesInput[]
    NOT?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Conversation"> | string
    connectorId?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    rmId?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    loanApplicationId?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    assignedOpsUserId?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    conversationStatus?: StringWithAggregatesFilter<"Conversation"> | string
    conversationType?: StringWithAggregatesFilter<"Conversation"> | string
    customerName?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    customerPhone?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    conversationId?: StringFilter<"Message"> | string
    senderType?: StringFilter<"Message"> | string
    internalSenderId?: StringNullableFilter<"Message"> | string | null
    messageChannel?: StringFilter<"Message"> | string
    messageBody?: StringNullableFilter<"Message"> | string | null
    messageType?: StringFilter<"Message"> | string
    deliveryStatus?: StringFilter<"Message"> | string
    whatsappMessageId?: StringNullableFilter<"Message"> | string | null
    traceId?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    conversation?: XOR<ConversationRelationFilter, ConversationWhereInput>
    attachments?: MessageAttachmentListRelationFilter
    deliveryStatuses?: MessageDeliveryStatusListRelationFilter
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    senderType?: SortOrder
    internalSenderId?: SortOrderInput | SortOrder
    messageChannel?: SortOrder
    messageBody?: SortOrderInput | SortOrder
    messageType?: SortOrder
    deliveryStatus?: SortOrder
    whatsappMessageId?: SortOrderInput | SortOrder
    traceId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    conversation?: ConversationOrderByWithRelationInput
    attachments?: MessageAttachmentOrderByRelationAggregateInput
    deliveryStatuses?: MessageDeliveryStatusOrderByRelationAggregateInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    conversationId?: StringFilter<"Message"> | string
    senderType?: StringFilter<"Message"> | string
    internalSenderId?: StringNullableFilter<"Message"> | string | null
    messageChannel?: StringFilter<"Message"> | string
    messageBody?: StringNullableFilter<"Message"> | string | null
    messageType?: StringFilter<"Message"> | string
    deliveryStatus?: StringFilter<"Message"> | string
    whatsappMessageId?: StringNullableFilter<"Message"> | string | null
    traceId?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    conversation?: XOR<ConversationRelationFilter, ConversationWhereInput>
    attachments?: MessageAttachmentListRelationFilter
    deliveryStatuses?: MessageDeliveryStatusListRelationFilter
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    senderType?: SortOrder
    internalSenderId?: SortOrderInput | SortOrder
    messageChannel?: SortOrder
    messageBody?: SortOrderInput | SortOrder
    messageType?: SortOrder
    deliveryStatus?: SortOrder
    whatsappMessageId?: SortOrderInput | SortOrder
    traceId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    conversationId?: StringWithAggregatesFilter<"Message"> | string
    senderType?: StringWithAggregatesFilter<"Message"> | string
    internalSenderId?: StringNullableWithAggregatesFilter<"Message"> | string | null
    messageChannel?: StringWithAggregatesFilter<"Message"> | string
    messageBody?: StringNullableWithAggregatesFilter<"Message"> | string | null
    messageType?: StringWithAggregatesFilter<"Message"> | string
    deliveryStatus?: StringWithAggregatesFilter<"Message"> | string
    whatsappMessageId?: StringNullableWithAggregatesFilter<"Message"> | string | null
    traceId?: StringNullableWithAggregatesFilter<"Message"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
  }

  export type MessageAttachmentWhereInput = {
    AND?: MessageAttachmentWhereInput | MessageAttachmentWhereInput[]
    OR?: MessageAttachmentWhereInput[]
    NOT?: MessageAttachmentWhereInput | MessageAttachmentWhereInput[]
    id?: StringFilter<"MessageAttachment"> | string
    messageId?: StringFilter<"MessageAttachment"> | string
    fileName?: StringFilter<"MessageAttachment"> | string
    fileType?: StringFilter<"MessageAttachment"> | string
    s3Key?: StringFilter<"MessageAttachment"> | string
    fileSize?: BigIntFilter<"MessageAttachment"> | bigint | number
    createdAt?: DateTimeFilter<"MessageAttachment"> | Date | string
    message?: XOR<MessageRelationFilter, MessageWhereInput>
  }

  export type MessageAttachmentOrderByWithRelationInput = {
    id?: SortOrder
    messageId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    s3Key?: SortOrder
    fileSize?: SortOrder
    createdAt?: SortOrder
    message?: MessageOrderByWithRelationInput
  }

  export type MessageAttachmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageAttachmentWhereInput | MessageAttachmentWhereInput[]
    OR?: MessageAttachmentWhereInput[]
    NOT?: MessageAttachmentWhereInput | MessageAttachmentWhereInput[]
    messageId?: StringFilter<"MessageAttachment"> | string
    fileName?: StringFilter<"MessageAttachment"> | string
    fileType?: StringFilter<"MessageAttachment"> | string
    s3Key?: StringFilter<"MessageAttachment"> | string
    fileSize?: BigIntFilter<"MessageAttachment"> | bigint | number
    createdAt?: DateTimeFilter<"MessageAttachment"> | Date | string
    message?: XOR<MessageRelationFilter, MessageWhereInput>
  }, "id">

  export type MessageAttachmentOrderByWithAggregationInput = {
    id?: SortOrder
    messageId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    s3Key?: SortOrder
    fileSize?: SortOrder
    createdAt?: SortOrder
    _count?: MessageAttachmentCountOrderByAggregateInput
    _avg?: MessageAttachmentAvgOrderByAggregateInput
    _max?: MessageAttachmentMaxOrderByAggregateInput
    _min?: MessageAttachmentMinOrderByAggregateInput
    _sum?: MessageAttachmentSumOrderByAggregateInput
  }

  export type MessageAttachmentScalarWhereWithAggregatesInput = {
    AND?: MessageAttachmentScalarWhereWithAggregatesInput | MessageAttachmentScalarWhereWithAggregatesInput[]
    OR?: MessageAttachmentScalarWhereWithAggregatesInput[]
    NOT?: MessageAttachmentScalarWhereWithAggregatesInput | MessageAttachmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MessageAttachment"> | string
    messageId?: StringWithAggregatesFilter<"MessageAttachment"> | string
    fileName?: StringWithAggregatesFilter<"MessageAttachment"> | string
    fileType?: StringWithAggregatesFilter<"MessageAttachment"> | string
    s3Key?: StringWithAggregatesFilter<"MessageAttachment"> | string
    fileSize?: BigIntWithAggregatesFilter<"MessageAttachment"> | bigint | number
    createdAt?: DateTimeWithAggregatesFilter<"MessageAttachment"> | Date | string
  }

  export type MessageDeliveryStatusWhereInput = {
    AND?: MessageDeliveryStatusWhereInput | MessageDeliveryStatusWhereInput[]
    OR?: MessageDeliveryStatusWhereInput[]
    NOT?: MessageDeliveryStatusWhereInput | MessageDeliveryStatusWhereInput[]
    id?: StringFilter<"MessageDeliveryStatus"> | string
    messageId?: StringFilter<"MessageDeliveryStatus"> | string
    status?: StringFilter<"MessageDeliveryStatus"> | string
    timestamp?: DateTimeFilter<"MessageDeliveryStatus"> | Date | string
    remarks?: StringNullableFilter<"MessageDeliveryStatus"> | string | null
    message?: XOR<MessageRelationFilter, MessageWhereInput>
  }

  export type MessageDeliveryStatusOrderByWithRelationInput = {
    id?: SortOrder
    messageId?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    remarks?: SortOrderInput | SortOrder
    message?: MessageOrderByWithRelationInput
  }

  export type MessageDeliveryStatusWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageDeliveryStatusWhereInput | MessageDeliveryStatusWhereInput[]
    OR?: MessageDeliveryStatusWhereInput[]
    NOT?: MessageDeliveryStatusWhereInput | MessageDeliveryStatusWhereInput[]
    messageId?: StringFilter<"MessageDeliveryStatus"> | string
    status?: StringFilter<"MessageDeliveryStatus"> | string
    timestamp?: DateTimeFilter<"MessageDeliveryStatus"> | Date | string
    remarks?: StringNullableFilter<"MessageDeliveryStatus"> | string | null
    message?: XOR<MessageRelationFilter, MessageWhereInput>
  }, "id">

  export type MessageDeliveryStatusOrderByWithAggregationInput = {
    id?: SortOrder
    messageId?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    remarks?: SortOrderInput | SortOrder
    _count?: MessageDeliveryStatusCountOrderByAggregateInput
    _max?: MessageDeliveryStatusMaxOrderByAggregateInput
    _min?: MessageDeliveryStatusMinOrderByAggregateInput
  }

  export type MessageDeliveryStatusScalarWhereWithAggregatesInput = {
    AND?: MessageDeliveryStatusScalarWhereWithAggregatesInput | MessageDeliveryStatusScalarWhereWithAggregatesInput[]
    OR?: MessageDeliveryStatusScalarWhereWithAggregatesInput[]
    NOT?: MessageDeliveryStatusScalarWhereWithAggregatesInput | MessageDeliveryStatusScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MessageDeliveryStatus"> | string
    messageId?: StringWithAggregatesFilter<"MessageDeliveryStatus"> | string
    status?: StringWithAggregatesFilter<"MessageDeliveryStatus"> | string
    timestamp?: DateTimeWithAggregatesFilter<"MessageDeliveryStatus"> | Date | string
    remarks?: StringNullableWithAggregatesFilter<"MessageDeliveryStatus"> | string | null
  }

  export type WhatsappWebhookLogWhereInput = {
    AND?: WhatsappWebhookLogWhereInput | WhatsappWebhookLogWhereInput[]
    OR?: WhatsappWebhookLogWhereInput[]
    NOT?: WhatsappWebhookLogWhereInput | WhatsappWebhookLogWhereInput[]
    id?: StringFilter<"WhatsappWebhookLog"> | string
    payload?: JsonFilter<"WhatsappWebhookLog">
    processedStatus?: StringFilter<"WhatsappWebhookLog"> | string
    errorMessage?: StringNullableFilter<"WhatsappWebhookLog"> | string | null
    createdAt?: DateTimeFilter<"WhatsappWebhookLog"> | Date | string
  }

  export type WhatsappWebhookLogOrderByWithRelationInput = {
    id?: SortOrder
    payload?: SortOrder
    processedStatus?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type WhatsappWebhookLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WhatsappWebhookLogWhereInput | WhatsappWebhookLogWhereInput[]
    OR?: WhatsappWebhookLogWhereInput[]
    NOT?: WhatsappWebhookLogWhereInput | WhatsappWebhookLogWhereInput[]
    payload?: JsonFilter<"WhatsappWebhookLog">
    processedStatus?: StringFilter<"WhatsappWebhookLog"> | string
    errorMessage?: StringNullableFilter<"WhatsappWebhookLog"> | string | null
    createdAt?: DateTimeFilter<"WhatsappWebhookLog"> | Date | string
  }, "id">

  export type WhatsappWebhookLogOrderByWithAggregationInput = {
    id?: SortOrder
    payload?: SortOrder
    processedStatus?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: WhatsappWebhookLogCountOrderByAggregateInput
    _max?: WhatsappWebhookLogMaxOrderByAggregateInput
    _min?: WhatsappWebhookLogMinOrderByAggregateInput
  }

  export type WhatsappWebhookLogScalarWhereWithAggregatesInput = {
    AND?: WhatsappWebhookLogScalarWhereWithAggregatesInput | WhatsappWebhookLogScalarWhereWithAggregatesInput[]
    OR?: WhatsappWebhookLogScalarWhereWithAggregatesInput[]
    NOT?: WhatsappWebhookLogScalarWhereWithAggregatesInput | WhatsappWebhookLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WhatsappWebhookLog"> | string
    payload?: JsonWithAggregatesFilter<"WhatsappWebhookLog">
    processedStatus?: StringWithAggregatesFilter<"WhatsappWebhookLog"> | string
    errorMessage?: StringNullableWithAggregatesFilter<"WhatsappWebhookLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"WhatsappWebhookLog"> | Date | string
  }

  export type NotificationTemplateWhereInput = {
    AND?: NotificationTemplateWhereInput | NotificationTemplateWhereInput[]
    OR?: NotificationTemplateWhereInput[]
    NOT?: NotificationTemplateWhereInput | NotificationTemplateWhereInput[]
    id?: StringFilter<"NotificationTemplate"> | string
    templateName?: StringFilter<"NotificationTemplate"> | string
    channel?: StringFilter<"NotificationTemplate"> | string
    contentTemplate?: StringFilter<"NotificationTemplate"> | string
    isActive?: BoolFilter<"NotificationTemplate"> | boolean
    createdAt?: DateTimeFilter<"NotificationTemplate"> | Date | string
  }

  export type NotificationTemplateOrderByWithRelationInput = {
    id?: SortOrder
    templateName?: SortOrder
    channel?: SortOrder
    contentTemplate?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationTemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    templateName?: string
    AND?: NotificationTemplateWhereInput | NotificationTemplateWhereInput[]
    OR?: NotificationTemplateWhereInput[]
    NOT?: NotificationTemplateWhereInput | NotificationTemplateWhereInput[]
    channel?: StringFilter<"NotificationTemplate"> | string
    contentTemplate?: StringFilter<"NotificationTemplate"> | string
    isActive?: BoolFilter<"NotificationTemplate"> | boolean
    createdAt?: DateTimeFilter<"NotificationTemplate"> | Date | string
  }, "id" | "templateName">

  export type NotificationTemplateOrderByWithAggregationInput = {
    id?: SortOrder
    templateName?: SortOrder
    channel?: SortOrder
    contentTemplate?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    _count?: NotificationTemplateCountOrderByAggregateInput
    _max?: NotificationTemplateMaxOrderByAggregateInput
    _min?: NotificationTemplateMinOrderByAggregateInput
  }

  export type NotificationTemplateScalarWhereWithAggregatesInput = {
    AND?: NotificationTemplateScalarWhereWithAggregatesInput | NotificationTemplateScalarWhereWithAggregatesInput[]
    OR?: NotificationTemplateScalarWhereWithAggregatesInput[]
    NOT?: NotificationTemplateScalarWhereWithAggregatesInput | NotificationTemplateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NotificationTemplate"> | string
    templateName?: StringWithAggregatesFilter<"NotificationTemplate"> | string
    channel?: StringWithAggregatesFilter<"NotificationTemplate"> | string
    contentTemplate?: StringWithAggregatesFilter<"NotificationTemplate"> | string
    isActive?: BoolWithAggregatesFilter<"NotificationTemplate"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"NotificationTemplate"> | Date | string
  }

  export type UnreadMessageTrackingWhereInput = {
    AND?: UnreadMessageTrackingWhereInput | UnreadMessageTrackingWhereInput[]
    OR?: UnreadMessageTrackingWhereInput[]
    NOT?: UnreadMessageTrackingWhereInput | UnreadMessageTrackingWhereInput[]
    userId?: StringFilter<"UnreadMessageTracking"> | string
    conversationId?: StringFilter<"UnreadMessageTracking"> | string
    unreadCount?: IntFilter<"UnreadMessageTracking"> | number
    conversation?: XOR<ConversationRelationFilter, ConversationWhereInput>
  }

  export type UnreadMessageTrackingOrderByWithRelationInput = {
    userId?: SortOrder
    conversationId?: SortOrder
    unreadCount?: SortOrder
    conversation?: ConversationOrderByWithRelationInput
  }

  export type UnreadMessageTrackingWhereUniqueInput = Prisma.AtLeast<{
    userId_conversationId?: UnreadMessageTrackingUserIdConversationIdCompoundUniqueInput
    AND?: UnreadMessageTrackingWhereInput | UnreadMessageTrackingWhereInput[]
    OR?: UnreadMessageTrackingWhereInput[]
    NOT?: UnreadMessageTrackingWhereInput | UnreadMessageTrackingWhereInput[]
    userId?: StringFilter<"UnreadMessageTracking"> | string
    conversationId?: StringFilter<"UnreadMessageTracking"> | string
    unreadCount?: IntFilter<"UnreadMessageTracking"> | number
    conversation?: XOR<ConversationRelationFilter, ConversationWhereInput>
  }, "userId_conversationId">

  export type UnreadMessageTrackingOrderByWithAggregationInput = {
    userId?: SortOrder
    conversationId?: SortOrder
    unreadCount?: SortOrder
    _count?: UnreadMessageTrackingCountOrderByAggregateInput
    _avg?: UnreadMessageTrackingAvgOrderByAggregateInput
    _max?: UnreadMessageTrackingMaxOrderByAggregateInput
    _min?: UnreadMessageTrackingMinOrderByAggregateInput
    _sum?: UnreadMessageTrackingSumOrderByAggregateInput
  }

  export type UnreadMessageTrackingScalarWhereWithAggregatesInput = {
    AND?: UnreadMessageTrackingScalarWhereWithAggregatesInput | UnreadMessageTrackingScalarWhereWithAggregatesInput[]
    OR?: UnreadMessageTrackingScalarWhereWithAggregatesInput[]
    NOT?: UnreadMessageTrackingScalarWhereWithAggregatesInput | UnreadMessageTrackingScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"UnreadMessageTracking"> | string
    conversationId?: StringWithAggregatesFilter<"UnreadMessageTracking"> | string
    unreadCount?: IntWithAggregatesFilter<"UnreadMessageTracking"> | number
  }

  export type WebsocketSessionWhereInput = {
    AND?: WebsocketSessionWhereInput | WebsocketSessionWhereInput[]
    OR?: WebsocketSessionWhereInput[]
    NOT?: WebsocketSessionWhereInput | WebsocketSessionWhereInput[]
    id?: StringFilter<"WebsocketSession"> | string
    userId?: StringFilter<"WebsocketSession"> | string
    connectedAt?: DateTimeFilter<"WebsocketSession"> | Date | string
    lastHeartbeat?: DateTimeNullableFilter<"WebsocketSession"> | Date | string | null
  }

  export type WebsocketSessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    connectedAt?: SortOrder
    lastHeartbeat?: SortOrderInput | SortOrder
  }

  export type WebsocketSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WebsocketSessionWhereInput | WebsocketSessionWhereInput[]
    OR?: WebsocketSessionWhereInput[]
    NOT?: WebsocketSessionWhereInput | WebsocketSessionWhereInput[]
    userId?: StringFilter<"WebsocketSession"> | string
    connectedAt?: DateTimeFilter<"WebsocketSession"> | Date | string
    lastHeartbeat?: DateTimeNullableFilter<"WebsocketSession"> | Date | string | null
  }, "id">

  export type WebsocketSessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    connectedAt?: SortOrder
    lastHeartbeat?: SortOrderInput | SortOrder
    _count?: WebsocketSessionCountOrderByAggregateInput
    _max?: WebsocketSessionMaxOrderByAggregateInput
    _min?: WebsocketSessionMinOrderByAggregateInput
  }

  export type WebsocketSessionScalarWhereWithAggregatesInput = {
    AND?: WebsocketSessionScalarWhereWithAggregatesInput | WebsocketSessionScalarWhereWithAggregatesInput[]
    OR?: WebsocketSessionScalarWhereWithAggregatesInput[]
    NOT?: WebsocketSessionScalarWhereWithAggregatesInput | WebsocketSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WebsocketSession"> | string
    userId?: StringWithAggregatesFilter<"WebsocketSession"> | string
    connectedAt?: DateTimeWithAggregatesFilter<"WebsocketSession"> | Date | string
    lastHeartbeat?: DateTimeNullableWithAggregatesFilter<"WebsocketSession"> | Date | string | null
  }

  export type TeamMeetingRoomWhereInput = {
    AND?: TeamMeetingRoomWhereInput | TeamMeetingRoomWhereInput[]
    OR?: TeamMeetingRoomWhereInput[]
    NOT?: TeamMeetingRoomWhereInput | TeamMeetingRoomWhereInput[]
    id?: StringFilter<"TeamMeetingRoom"> | string
    roomKey?: StringFilter<"TeamMeetingRoom"> | string
    createdAt?: DateTimeFilter<"TeamMeetingRoom"> | Date | string
  }

  export type TeamMeetingRoomOrderByWithRelationInput = {
    id?: SortOrder
    roomKey?: SortOrder
    createdAt?: SortOrder
  }

  export type TeamMeetingRoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    roomKey?: string
    AND?: TeamMeetingRoomWhereInput | TeamMeetingRoomWhereInput[]
    OR?: TeamMeetingRoomWhereInput[]
    NOT?: TeamMeetingRoomWhereInput | TeamMeetingRoomWhereInput[]
    createdAt?: DateTimeFilter<"TeamMeetingRoom"> | Date | string
  }, "id" | "roomKey">

  export type TeamMeetingRoomOrderByWithAggregationInput = {
    id?: SortOrder
    roomKey?: SortOrder
    createdAt?: SortOrder
    _count?: TeamMeetingRoomCountOrderByAggregateInput
    _max?: TeamMeetingRoomMaxOrderByAggregateInput
    _min?: TeamMeetingRoomMinOrderByAggregateInput
  }

  export type TeamMeetingRoomScalarWhereWithAggregatesInput = {
    AND?: TeamMeetingRoomScalarWhereWithAggregatesInput | TeamMeetingRoomScalarWhereWithAggregatesInput[]
    OR?: TeamMeetingRoomScalarWhereWithAggregatesInput[]
    NOT?: TeamMeetingRoomScalarWhereWithAggregatesInput | TeamMeetingRoomScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TeamMeetingRoom"> | string
    roomKey?: StringWithAggregatesFilter<"TeamMeetingRoom"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TeamMeetingRoom"> | Date | string
  }

  export type TeamMeetingMessageWhereInput = {
    AND?: TeamMeetingMessageWhereInput | TeamMeetingMessageWhereInput[]
    OR?: TeamMeetingMessageWhereInput[]
    NOT?: TeamMeetingMessageWhereInput | TeamMeetingMessageWhereInput[]
    id?: StringFilter<"TeamMeetingMessage"> | string
    roomKey?: StringFilter<"TeamMeetingMessage"> | string
    senderId?: StringFilter<"TeamMeetingMessage"> | string
    senderName?: StringFilter<"TeamMeetingMessage"> | string
    senderRole?: StringNullableFilter<"TeamMeetingMessage"> | string | null
    senderInitials?: StringNullableFilter<"TeamMeetingMessage"> | string | null
    body?: StringFilter<"TeamMeetingMessage"> | string
    messageType?: StringFilter<"TeamMeetingMessage"> | string
    status?: StringFilter<"TeamMeetingMessage"> | string
    createdAt?: DateTimeFilter<"TeamMeetingMessage"> | Date | string
  }

  export type TeamMeetingMessageOrderByWithRelationInput = {
    id?: SortOrder
    roomKey?: SortOrder
    senderId?: SortOrder
    senderName?: SortOrder
    senderRole?: SortOrderInput | SortOrder
    senderInitials?: SortOrderInput | SortOrder
    body?: SortOrder
    messageType?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type TeamMeetingMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TeamMeetingMessageWhereInput | TeamMeetingMessageWhereInput[]
    OR?: TeamMeetingMessageWhereInput[]
    NOT?: TeamMeetingMessageWhereInput | TeamMeetingMessageWhereInput[]
    roomKey?: StringFilter<"TeamMeetingMessage"> | string
    senderId?: StringFilter<"TeamMeetingMessage"> | string
    senderName?: StringFilter<"TeamMeetingMessage"> | string
    senderRole?: StringNullableFilter<"TeamMeetingMessage"> | string | null
    senderInitials?: StringNullableFilter<"TeamMeetingMessage"> | string | null
    body?: StringFilter<"TeamMeetingMessage"> | string
    messageType?: StringFilter<"TeamMeetingMessage"> | string
    status?: StringFilter<"TeamMeetingMessage"> | string
    createdAt?: DateTimeFilter<"TeamMeetingMessage"> | Date | string
  }, "id">

  export type TeamMeetingMessageOrderByWithAggregationInput = {
    id?: SortOrder
    roomKey?: SortOrder
    senderId?: SortOrder
    senderName?: SortOrder
    senderRole?: SortOrderInput | SortOrder
    senderInitials?: SortOrderInput | SortOrder
    body?: SortOrder
    messageType?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: TeamMeetingMessageCountOrderByAggregateInput
    _max?: TeamMeetingMessageMaxOrderByAggregateInput
    _min?: TeamMeetingMessageMinOrderByAggregateInput
  }

  export type TeamMeetingMessageScalarWhereWithAggregatesInput = {
    AND?: TeamMeetingMessageScalarWhereWithAggregatesInput | TeamMeetingMessageScalarWhereWithAggregatesInput[]
    OR?: TeamMeetingMessageScalarWhereWithAggregatesInput[]
    NOT?: TeamMeetingMessageScalarWhereWithAggregatesInput | TeamMeetingMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TeamMeetingMessage"> | string
    roomKey?: StringWithAggregatesFilter<"TeamMeetingMessage"> | string
    senderId?: StringWithAggregatesFilter<"TeamMeetingMessage"> | string
    senderName?: StringWithAggregatesFilter<"TeamMeetingMessage"> | string
    senderRole?: StringNullableWithAggregatesFilter<"TeamMeetingMessage"> | string | null
    senderInitials?: StringNullableWithAggregatesFilter<"TeamMeetingMessage"> | string | null
    body?: StringWithAggregatesFilter<"TeamMeetingMessage"> | string
    messageType?: StringWithAggregatesFilter<"TeamMeetingMessage"> | string
    status?: StringWithAggregatesFilter<"TeamMeetingMessage"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TeamMeetingMessage"> | Date | string
  }

  export type WhatsappMessageTemplateWhereInput = {
    AND?: WhatsappMessageTemplateWhereInput | WhatsappMessageTemplateWhereInput[]
    OR?: WhatsappMessageTemplateWhereInput[]
    NOT?: WhatsappMessageTemplateWhereInput | WhatsappMessageTemplateWhereInput[]
    id?: StringFilter<"WhatsappMessageTemplate"> | string
    templateName?: StringFilter<"WhatsappMessageTemplate"> | string
    templateBody?: StringFilter<"WhatsappMessageTemplate"> | string
    templateCategory?: StringFilter<"WhatsappMessageTemplate"> | string
    isActive?: BoolFilter<"WhatsappMessageTemplate"> | boolean
    createdAt?: DateTimeFilter<"WhatsappMessageTemplate"> | Date | string
  }

  export type WhatsappMessageTemplateOrderByWithRelationInput = {
    id?: SortOrder
    templateName?: SortOrder
    templateBody?: SortOrder
    templateCategory?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type WhatsappMessageTemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    templateName?: string
    AND?: WhatsappMessageTemplateWhereInput | WhatsappMessageTemplateWhereInput[]
    OR?: WhatsappMessageTemplateWhereInput[]
    NOT?: WhatsappMessageTemplateWhereInput | WhatsappMessageTemplateWhereInput[]
    templateBody?: StringFilter<"WhatsappMessageTemplate"> | string
    templateCategory?: StringFilter<"WhatsappMessageTemplate"> | string
    isActive?: BoolFilter<"WhatsappMessageTemplate"> | boolean
    createdAt?: DateTimeFilter<"WhatsappMessageTemplate"> | Date | string
  }, "id" | "templateName">

  export type WhatsappMessageTemplateOrderByWithAggregationInput = {
    id?: SortOrder
    templateName?: SortOrder
    templateBody?: SortOrder
    templateCategory?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    _count?: WhatsappMessageTemplateCountOrderByAggregateInput
    _max?: WhatsappMessageTemplateMaxOrderByAggregateInput
    _min?: WhatsappMessageTemplateMinOrderByAggregateInput
  }

  export type WhatsappMessageTemplateScalarWhereWithAggregatesInput = {
    AND?: WhatsappMessageTemplateScalarWhereWithAggregatesInput | WhatsappMessageTemplateScalarWhereWithAggregatesInput[]
    OR?: WhatsappMessageTemplateScalarWhereWithAggregatesInput[]
    NOT?: WhatsappMessageTemplateScalarWhereWithAggregatesInput | WhatsappMessageTemplateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WhatsappMessageTemplate"> | string
    templateName?: StringWithAggregatesFilter<"WhatsappMessageTemplate"> | string
    templateBody?: StringWithAggregatesFilter<"WhatsappMessageTemplate"> | string
    templateCategory?: StringWithAggregatesFilter<"WhatsappMessageTemplate"> | string
    isActive?: BoolWithAggregatesFilter<"WhatsappMessageTemplate"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"WhatsappMessageTemplate"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    recipientId?: StringFilter<"Notification"> | string
    channel?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    status?: StringFilter<"Notification"> | string
    content?: StringNullableFilter<"Notification"> | string | null
    title?: StringNullableFilter<"Notification"> | string | null
    read?: BoolFilter<"Notification"> | boolean
    idempotencyKey?: StringNullableFilter<"Notification"> | string | null
    retryCount?: IntFilter<"Notification"> | number
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    deliveryLogs?: NotificationDeliveryLogListRelationFilter
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    recipientId?: SortOrder
    channel?: SortOrder
    type?: SortOrder
    status?: SortOrder
    content?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    read?: SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    retryCount?: SortOrder
    createdAt?: SortOrder
    deliveryLogs?: NotificationDeliveryLogOrderByRelationAggregateInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    idempotencyKey?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    recipientId?: StringFilter<"Notification"> | string
    channel?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    status?: StringFilter<"Notification"> | string
    content?: StringNullableFilter<"Notification"> | string | null
    title?: StringNullableFilter<"Notification"> | string | null
    read?: BoolFilter<"Notification"> | boolean
    retryCount?: IntFilter<"Notification"> | number
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    deliveryLogs?: NotificationDeliveryLogListRelationFilter
  }, "id" | "idempotencyKey">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    recipientId?: SortOrder
    channel?: SortOrder
    type?: SortOrder
    status?: SortOrder
    content?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    read?: SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    retryCount?: SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _avg?: NotificationAvgOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
    _sum?: NotificationSumOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    recipientId?: StringWithAggregatesFilter<"Notification"> | string
    channel?: StringWithAggregatesFilter<"Notification"> | string
    type?: StringWithAggregatesFilter<"Notification"> | string
    status?: StringWithAggregatesFilter<"Notification"> | string
    content?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    title?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    read?: BoolWithAggregatesFilter<"Notification"> | boolean
    idempotencyKey?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    retryCount?: IntWithAggregatesFilter<"Notification"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type NotificationDeliveryLogWhereInput = {
    AND?: NotificationDeliveryLogWhereInput | NotificationDeliveryLogWhereInput[]
    OR?: NotificationDeliveryLogWhereInput[]
    NOT?: NotificationDeliveryLogWhereInput | NotificationDeliveryLogWhereInput[]
    id?: StringFilter<"NotificationDeliveryLog"> | string
    notificationId?: StringNullableFilter<"NotificationDeliveryLog"> | string | null
    deliveryStatus?: StringFilter<"NotificationDeliveryLog"> | string
    providerResponse?: StringNullableFilter<"NotificationDeliveryLog"> | string | null
    attemptedAt?: DateTimeFilter<"NotificationDeliveryLog"> | Date | string
    notification?: XOR<NotificationNullableRelationFilter, NotificationWhereInput> | null
  }

  export type NotificationDeliveryLogOrderByWithRelationInput = {
    id?: SortOrder
    notificationId?: SortOrderInput | SortOrder
    deliveryStatus?: SortOrder
    providerResponse?: SortOrderInput | SortOrder
    attemptedAt?: SortOrder
    notification?: NotificationOrderByWithRelationInput
  }

  export type NotificationDeliveryLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationDeliveryLogWhereInput | NotificationDeliveryLogWhereInput[]
    OR?: NotificationDeliveryLogWhereInput[]
    NOT?: NotificationDeliveryLogWhereInput | NotificationDeliveryLogWhereInput[]
    notificationId?: StringNullableFilter<"NotificationDeliveryLog"> | string | null
    deliveryStatus?: StringFilter<"NotificationDeliveryLog"> | string
    providerResponse?: StringNullableFilter<"NotificationDeliveryLog"> | string | null
    attemptedAt?: DateTimeFilter<"NotificationDeliveryLog"> | Date | string
    notification?: XOR<NotificationNullableRelationFilter, NotificationWhereInput> | null
  }, "id">

  export type NotificationDeliveryLogOrderByWithAggregationInput = {
    id?: SortOrder
    notificationId?: SortOrderInput | SortOrder
    deliveryStatus?: SortOrder
    providerResponse?: SortOrderInput | SortOrder
    attemptedAt?: SortOrder
    _count?: NotificationDeliveryLogCountOrderByAggregateInput
    _max?: NotificationDeliveryLogMaxOrderByAggregateInput
    _min?: NotificationDeliveryLogMinOrderByAggregateInput
  }

  export type NotificationDeliveryLogScalarWhereWithAggregatesInput = {
    AND?: NotificationDeliveryLogScalarWhereWithAggregatesInput | NotificationDeliveryLogScalarWhereWithAggregatesInput[]
    OR?: NotificationDeliveryLogScalarWhereWithAggregatesInput[]
    NOT?: NotificationDeliveryLogScalarWhereWithAggregatesInput | NotificationDeliveryLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NotificationDeliveryLog"> | string
    notificationId?: StringNullableWithAggregatesFilter<"NotificationDeliveryLog"> | string | null
    deliveryStatus?: StringWithAggregatesFilter<"NotificationDeliveryLog"> | string
    providerResponse?: StringNullableWithAggregatesFilter<"NotificationDeliveryLog"> | string | null
    attemptedAt?: DateTimeWithAggregatesFilter<"NotificationDeliveryLog"> | Date | string
  }

  export type ConversationCreateInput = {
    id: string
    connectorId?: string | null
    rmId?: string | null
    loanApplicationId?: string | null
    assignedOpsUserId?: string | null
    conversationStatus: string
    conversationType?: string
    customerName?: string | null
    customerPhone?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    messages?: MessageCreateNestedManyWithoutConversationInput
    unreadTracking?: UnreadMessageTrackingCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateInput = {
    id: string
    connectorId?: string | null
    rmId?: string | null
    loanApplicationId?: string | null
    assignedOpsUserId?: string | null
    conversationStatus: string
    conversationType?: string
    customerName?: string | null
    customerPhone?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
    unreadTracking?: UnreadMessageTrackingUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectorId?: NullableStringFieldUpdateOperationsInput | string | null
    rmId?: NullableStringFieldUpdateOperationsInput | string | null
    loanApplicationId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedOpsUserId?: NullableStringFieldUpdateOperationsInput | string | null
    conversationStatus?: StringFieldUpdateOperationsInput | string
    conversationType?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutConversationNestedInput
    unreadTracking?: UnreadMessageTrackingUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectorId?: NullableStringFieldUpdateOperationsInput | string | null
    rmId?: NullableStringFieldUpdateOperationsInput | string | null
    loanApplicationId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedOpsUserId?: NullableStringFieldUpdateOperationsInput | string | null
    conversationStatus?: StringFieldUpdateOperationsInput | string
    conversationType?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
    unreadTracking?: UnreadMessageTrackingUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationCreateManyInput = {
    id: string
    connectorId?: string | null
    rmId?: string | null
    loanApplicationId?: string | null
    assignedOpsUserId?: string | null
    conversationStatus: string
    conversationType?: string
    customerName?: string | null
    customerPhone?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type ConversationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectorId?: NullableStringFieldUpdateOperationsInput | string | null
    rmId?: NullableStringFieldUpdateOperationsInput | string | null
    loanApplicationId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedOpsUserId?: NullableStringFieldUpdateOperationsInput | string | null
    conversationStatus?: StringFieldUpdateOperationsInput | string
    conversationType?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectorId?: NullableStringFieldUpdateOperationsInput | string | null
    rmId?: NullableStringFieldUpdateOperationsInput | string | null
    loanApplicationId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedOpsUserId?: NullableStringFieldUpdateOperationsInput | string | null
    conversationStatus?: StringFieldUpdateOperationsInput | string
    conversationType?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    id: string
    senderType: string
    internalSenderId?: string | null
    messageChannel: string
    messageBody?: string | null
    messageType: string
    deliveryStatus: string
    whatsappMessageId?: string | null
    traceId?: string | null
    createdAt: Date | string
    conversation: ConversationCreateNestedOneWithoutMessagesInput
    attachments?: MessageAttachmentCreateNestedManyWithoutMessageInput
    deliveryStatuses?: MessageDeliveryStatusCreateNestedManyWithoutMessageInput
  }

  export type MessageUncheckedCreateInput = {
    id: string
    conversationId: string
    senderType: string
    internalSenderId?: string | null
    messageChannel: string
    messageBody?: string | null
    messageType: string
    deliveryStatus: string
    whatsappMessageId?: string | null
    traceId?: string | null
    createdAt: Date | string
    attachments?: MessageAttachmentUncheckedCreateNestedManyWithoutMessageInput
    deliveryStatuses?: MessageDeliveryStatusUncheckedCreateNestedManyWithoutMessageInput
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderType?: StringFieldUpdateOperationsInput | string
    internalSenderId?: NullableStringFieldUpdateOperationsInput | string | null
    messageChannel?: StringFieldUpdateOperationsInput | string
    messageBody?: NullableStringFieldUpdateOperationsInput | string | null
    messageType?: StringFieldUpdateOperationsInput | string
    deliveryStatus?: StringFieldUpdateOperationsInput | string
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
    attachments?: MessageAttachmentUpdateManyWithoutMessageNestedInput
    deliveryStatuses?: MessageDeliveryStatusUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    senderType?: StringFieldUpdateOperationsInput | string
    internalSenderId?: NullableStringFieldUpdateOperationsInput | string | null
    messageChannel?: StringFieldUpdateOperationsInput | string
    messageBody?: NullableStringFieldUpdateOperationsInput | string | null
    messageType?: StringFieldUpdateOperationsInput | string
    deliveryStatus?: StringFieldUpdateOperationsInput | string
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: MessageAttachmentUncheckedUpdateManyWithoutMessageNestedInput
    deliveryStatuses?: MessageDeliveryStatusUncheckedUpdateManyWithoutMessageNestedInput
  }

  export type MessageCreateManyInput = {
    id: string
    conversationId: string
    senderType: string
    internalSenderId?: string | null
    messageChannel: string
    messageBody?: string | null
    messageType: string
    deliveryStatus: string
    whatsappMessageId?: string | null
    traceId?: string | null
    createdAt: Date | string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderType?: StringFieldUpdateOperationsInput | string
    internalSenderId?: NullableStringFieldUpdateOperationsInput | string | null
    messageChannel?: StringFieldUpdateOperationsInput | string
    messageBody?: NullableStringFieldUpdateOperationsInput | string | null
    messageType?: StringFieldUpdateOperationsInput | string
    deliveryStatus?: StringFieldUpdateOperationsInput | string
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    senderType?: StringFieldUpdateOperationsInput | string
    internalSenderId?: NullableStringFieldUpdateOperationsInput | string | null
    messageChannel?: StringFieldUpdateOperationsInput | string
    messageBody?: NullableStringFieldUpdateOperationsInput | string | null
    messageType?: StringFieldUpdateOperationsInput | string
    deliveryStatus?: StringFieldUpdateOperationsInput | string
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageAttachmentCreateInput = {
    id: string
    fileName: string
    fileType: string
    s3Key: string
    fileSize: bigint | number
    createdAt: Date | string
    message: MessageCreateNestedOneWithoutAttachmentsInput
  }

  export type MessageAttachmentUncheckedCreateInput = {
    id: string
    messageId: string
    fileName: string
    fileType: string
    s3Key: string
    fileSize: bigint | number
    createdAt: Date | string
  }

  export type MessageAttachmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    message?: MessageUpdateOneRequiredWithoutAttachmentsNestedInput
  }

  export type MessageAttachmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageAttachmentCreateManyInput = {
    id: string
    messageId: string
    fileName: string
    fileType: string
    s3Key: string
    fileSize: bigint | number
    createdAt: Date | string
  }

  export type MessageAttachmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageAttachmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageDeliveryStatusCreateInput = {
    id: string
    status: string
    timestamp: Date | string
    remarks?: string | null
    message: MessageCreateNestedOneWithoutDeliveryStatusesInput
  }

  export type MessageDeliveryStatusUncheckedCreateInput = {
    id: string
    messageId: string
    status: string
    timestamp: Date | string
    remarks?: string | null
  }

  export type MessageDeliveryStatusUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    message?: MessageUpdateOneRequiredWithoutDeliveryStatusesNestedInput
  }

  export type MessageDeliveryStatusUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MessageDeliveryStatusCreateManyInput = {
    id: string
    messageId: string
    status: string
    timestamp: Date | string
    remarks?: string | null
  }

  export type MessageDeliveryStatusUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MessageDeliveryStatusUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WhatsappWebhookLogCreateInput = {
    id: string
    payload: JsonNullValueInput | InputJsonValue
    processedStatus: string
    errorMessage?: string | null
    createdAt: Date | string
  }

  export type WhatsappWebhookLogUncheckedCreateInput = {
    id: string
    payload: JsonNullValueInput | InputJsonValue
    processedStatus: string
    errorMessage?: string | null
    createdAt: Date | string
  }

  export type WhatsappWebhookLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    processedStatus?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WhatsappWebhookLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    processedStatus?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WhatsappWebhookLogCreateManyInput = {
    id: string
    payload: JsonNullValueInput | InputJsonValue
    processedStatus: string
    errorMessage?: string | null
    createdAt: Date | string
  }

  export type WhatsappWebhookLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    processedStatus?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WhatsappWebhookLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    processedStatus?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationTemplateCreateInput = {
    id: string
    templateName: string
    channel: string
    contentTemplate: string
    isActive?: boolean
    createdAt: Date | string
  }

  export type NotificationTemplateUncheckedCreateInput = {
    id: string
    templateName: string
    channel: string
    contentTemplate: string
    isActive?: boolean
    createdAt: Date | string
  }

  export type NotificationTemplateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    templateName?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    contentTemplate?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationTemplateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    templateName?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    contentTemplate?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationTemplateCreateManyInput = {
    id: string
    templateName: string
    channel: string
    contentTemplate: string
    isActive?: boolean
    createdAt: Date | string
  }

  export type NotificationTemplateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    templateName?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    contentTemplate?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationTemplateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    templateName?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    contentTemplate?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UnreadMessageTrackingCreateInput = {
    userId: string
    unreadCount?: number
    conversation: ConversationCreateNestedOneWithoutUnreadTrackingInput
  }

  export type UnreadMessageTrackingUncheckedCreateInput = {
    userId: string
    conversationId: string
    unreadCount?: number
  }

  export type UnreadMessageTrackingUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    unreadCount?: IntFieldUpdateOperationsInput | number
    conversation?: ConversationUpdateOneRequiredWithoutUnreadTrackingNestedInput
  }

  export type UnreadMessageTrackingUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    unreadCount?: IntFieldUpdateOperationsInput | number
  }

  export type UnreadMessageTrackingCreateManyInput = {
    userId: string
    conversationId: string
    unreadCount?: number
  }

  export type UnreadMessageTrackingUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    unreadCount?: IntFieldUpdateOperationsInput | number
  }

  export type UnreadMessageTrackingUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    unreadCount?: IntFieldUpdateOperationsInput | number
  }

  export type WebsocketSessionCreateInput = {
    id: string
    userId: string
    connectedAt: Date | string
    lastHeartbeat?: Date | string | null
  }

  export type WebsocketSessionUncheckedCreateInput = {
    id: string
    userId: string
    connectedAt: Date | string
    lastHeartbeat?: Date | string | null
  }

  export type WebsocketSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    connectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastHeartbeat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WebsocketSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    connectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastHeartbeat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WebsocketSessionCreateManyInput = {
    id: string
    userId: string
    connectedAt: Date | string
    lastHeartbeat?: Date | string | null
  }

  export type WebsocketSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    connectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastHeartbeat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WebsocketSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    connectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastHeartbeat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TeamMeetingRoomCreateInput = {
    id?: string
    roomKey: string
    createdAt?: Date | string
  }

  export type TeamMeetingRoomUncheckedCreateInput = {
    id?: string
    roomKey: string
    createdAt?: Date | string
  }

  export type TeamMeetingRoomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMeetingRoomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMeetingRoomCreateManyInput = {
    id?: string
    roomKey: string
    createdAt?: Date | string
  }

  export type TeamMeetingRoomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMeetingRoomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMeetingMessageCreateInput = {
    id?: string
    roomKey: string
    senderId: string
    senderName: string
    senderRole?: string | null
    senderInitials?: string | null
    body: string
    messageType?: string
    status?: string
    createdAt?: Date | string
  }

  export type TeamMeetingMessageUncheckedCreateInput = {
    id?: string
    roomKey: string
    senderId: string
    senderName: string
    senderRole?: string | null
    senderInitials?: string | null
    body: string
    messageType?: string
    status?: string
    createdAt?: Date | string
  }

  export type TeamMeetingMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomKey?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    senderName?: StringFieldUpdateOperationsInput | string
    senderRole?: NullableStringFieldUpdateOperationsInput | string | null
    senderInitials?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    messageType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMeetingMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomKey?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    senderName?: StringFieldUpdateOperationsInput | string
    senderRole?: NullableStringFieldUpdateOperationsInput | string | null
    senderInitials?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    messageType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMeetingMessageCreateManyInput = {
    id?: string
    roomKey: string
    senderId: string
    senderName: string
    senderRole?: string | null
    senderInitials?: string | null
    body: string
    messageType?: string
    status?: string
    createdAt?: Date | string
  }

  export type TeamMeetingMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomKey?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    senderName?: StringFieldUpdateOperationsInput | string
    senderRole?: NullableStringFieldUpdateOperationsInput | string | null
    senderInitials?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    messageType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMeetingMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomKey?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    senderName?: StringFieldUpdateOperationsInput | string
    senderRole?: NullableStringFieldUpdateOperationsInput | string | null
    senderInitials?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    messageType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WhatsappMessageTemplateCreateInput = {
    id?: string
    templateName: string
    templateBody: string
    templateCategory?: string
    isActive?: boolean
    createdAt?: Date | string
  }

  export type WhatsappMessageTemplateUncheckedCreateInput = {
    id?: string
    templateName: string
    templateBody: string
    templateCategory?: string
    isActive?: boolean
    createdAt?: Date | string
  }

  export type WhatsappMessageTemplateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    templateName?: StringFieldUpdateOperationsInput | string
    templateBody?: StringFieldUpdateOperationsInput | string
    templateCategory?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WhatsappMessageTemplateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    templateName?: StringFieldUpdateOperationsInput | string
    templateBody?: StringFieldUpdateOperationsInput | string
    templateCategory?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WhatsappMessageTemplateCreateManyInput = {
    id?: string
    templateName: string
    templateBody: string
    templateCategory?: string
    isActive?: boolean
    createdAt?: Date | string
  }

  export type WhatsappMessageTemplateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    templateName?: StringFieldUpdateOperationsInput | string
    templateBody?: StringFieldUpdateOperationsInput | string
    templateCategory?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WhatsappMessageTemplateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    templateName?: StringFieldUpdateOperationsInput | string
    templateBody?: StringFieldUpdateOperationsInput | string
    templateCategory?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id: string
    recipientId: string
    channel: string
    type: string
    status: string
    content?: string | null
    title?: string | null
    read?: boolean
    idempotencyKey?: string | null
    retryCount?: number
    createdAt: Date | string
    deliveryLogs?: NotificationDeliveryLogCreateNestedManyWithoutNotificationInput
  }

  export type NotificationUncheckedCreateInput = {
    id: string
    recipientId: string
    channel: string
    type: string
    status: string
    content?: string | null
    title?: string | null
    read?: boolean
    idempotencyKey?: string | null
    retryCount?: number
    createdAt: Date | string
    deliveryLogs?: NotificationDeliveryLogUncheckedCreateNestedManyWithoutNotificationInput
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    recipientId?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryLogs?: NotificationDeliveryLogUpdateManyWithoutNotificationNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    recipientId?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryLogs?: NotificationDeliveryLogUncheckedUpdateManyWithoutNotificationNestedInput
  }

  export type NotificationCreateManyInput = {
    id: string
    recipientId: string
    channel: string
    type: string
    status: string
    content?: string | null
    title?: string | null
    read?: boolean
    idempotencyKey?: string | null
    retryCount?: number
    createdAt: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    recipientId?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    recipientId?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationDeliveryLogCreateInput = {
    id: string
    deliveryStatus: string
    providerResponse?: string | null
    attemptedAt: Date | string
    notification?: NotificationCreateNestedOneWithoutDeliveryLogsInput
  }

  export type NotificationDeliveryLogUncheckedCreateInput = {
    id: string
    notificationId?: string | null
    deliveryStatus: string
    providerResponse?: string | null
    attemptedAt: Date | string
  }

  export type NotificationDeliveryLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    deliveryStatus?: StringFieldUpdateOperationsInput | string
    providerResponse?: NullableStringFieldUpdateOperationsInput | string | null
    attemptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notification?: NotificationUpdateOneWithoutDeliveryLogsNestedInput
  }

  export type NotificationDeliveryLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    notificationId?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryStatus?: StringFieldUpdateOperationsInput | string
    providerResponse?: NullableStringFieldUpdateOperationsInput | string | null
    attemptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationDeliveryLogCreateManyInput = {
    id: string
    notificationId?: string | null
    deliveryStatus: string
    providerResponse?: string | null
    attemptedAt: Date | string
  }

  export type NotificationDeliveryLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    deliveryStatus?: StringFieldUpdateOperationsInput | string
    providerResponse?: NullableStringFieldUpdateOperationsInput | string | null
    attemptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationDeliveryLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    notificationId?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryStatus?: StringFieldUpdateOperationsInput | string
    providerResponse?: NullableStringFieldUpdateOperationsInput | string | null
    attemptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type UnreadMessageTrackingListRelationFilter = {
    every?: UnreadMessageTrackingWhereInput
    some?: UnreadMessageTrackingWhereInput
    none?: UnreadMessageTrackingWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UnreadMessageTrackingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConversationCountOrderByAggregateInput = {
    id?: SortOrder
    connectorId?: SortOrder
    rmId?: SortOrder
    loanApplicationId?: SortOrder
    assignedOpsUserId?: SortOrder
    conversationStatus?: SortOrder
    conversationType?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationMaxOrderByAggregateInput = {
    id?: SortOrder
    connectorId?: SortOrder
    rmId?: SortOrder
    loanApplicationId?: SortOrder
    assignedOpsUserId?: SortOrder
    conversationStatus?: SortOrder
    conversationType?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationMinOrderByAggregateInput = {
    id?: SortOrder
    connectorId?: SortOrder
    rmId?: SortOrder
    loanApplicationId?: SortOrder
    assignedOpsUserId?: SortOrder
    conversationStatus?: SortOrder
    conversationType?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ConversationRelationFilter = {
    is?: ConversationWhereInput
    isNot?: ConversationWhereInput
  }

  export type MessageAttachmentListRelationFilter = {
    every?: MessageAttachmentWhereInput
    some?: MessageAttachmentWhereInput
    none?: MessageAttachmentWhereInput
  }

  export type MessageDeliveryStatusListRelationFilter = {
    every?: MessageDeliveryStatusWhereInput
    some?: MessageDeliveryStatusWhereInput
    none?: MessageDeliveryStatusWhereInput
  }

  export type MessageAttachmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageDeliveryStatusOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    senderType?: SortOrder
    internalSenderId?: SortOrder
    messageChannel?: SortOrder
    messageBody?: SortOrder
    messageType?: SortOrder
    deliveryStatus?: SortOrder
    whatsappMessageId?: SortOrder
    traceId?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    senderType?: SortOrder
    internalSenderId?: SortOrder
    messageChannel?: SortOrder
    messageBody?: SortOrder
    messageType?: SortOrder
    deliveryStatus?: SortOrder
    whatsappMessageId?: SortOrder
    traceId?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    senderType?: SortOrder
    internalSenderId?: SortOrder
    messageChannel?: SortOrder
    messageBody?: SortOrder
    messageType?: SortOrder
    deliveryStatus?: SortOrder
    whatsappMessageId?: SortOrder
    traceId?: SortOrder
    createdAt?: SortOrder
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type MessageRelationFilter = {
    is?: MessageWhereInput
    isNot?: MessageWhereInput
  }

  export type MessageAttachmentCountOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    s3Key?: SortOrder
    fileSize?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageAttachmentAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type MessageAttachmentMaxOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    s3Key?: SortOrder
    fileSize?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageAttachmentMinOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    s3Key?: SortOrder
    fileSize?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageAttachmentSumOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type MessageDeliveryStatusCountOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    remarks?: SortOrder
  }

  export type MessageDeliveryStatusMaxOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    remarks?: SortOrder
  }

  export type MessageDeliveryStatusMinOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    remarks?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type WhatsappWebhookLogCountOrderByAggregateInput = {
    id?: SortOrder
    payload?: SortOrder
    processedStatus?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
  }

  export type WhatsappWebhookLogMaxOrderByAggregateInput = {
    id?: SortOrder
    processedStatus?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
  }

  export type WhatsappWebhookLogMinOrderByAggregateInput = {
    id?: SortOrder
    processedStatus?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NotificationTemplateCountOrderByAggregateInput = {
    id?: SortOrder
    templateName?: SortOrder
    channel?: SortOrder
    contentTemplate?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationTemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    templateName?: SortOrder
    channel?: SortOrder
    contentTemplate?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationTemplateMinOrderByAggregateInput = {
    id?: SortOrder
    templateName?: SortOrder
    channel?: SortOrder
    contentTemplate?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UnreadMessageTrackingUserIdConversationIdCompoundUniqueInput = {
    userId: string
    conversationId: string
  }

  export type UnreadMessageTrackingCountOrderByAggregateInput = {
    userId?: SortOrder
    conversationId?: SortOrder
    unreadCount?: SortOrder
  }

  export type UnreadMessageTrackingAvgOrderByAggregateInput = {
    unreadCount?: SortOrder
  }

  export type UnreadMessageTrackingMaxOrderByAggregateInput = {
    userId?: SortOrder
    conversationId?: SortOrder
    unreadCount?: SortOrder
  }

  export type UnreadMessageTrackingMinOrderByAggregateInput = {
    userId?: SortOrder
    conversationId?: SortOrder
    unreadCount?: SortOrder
  }

  export type UnreadMessageTrackingSumOrderByAggregateInput = {
    unreadCount?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type WebsocketSessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    connectedAt?: SortOrder
    lastHeartbeat?: SortOrder
  }

  export type WebsocketSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    connectedAt?: SortOrder
    lastHeartbeat?: SortOrder
  }

  export type WebsocketSessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    connectedAt?: SortOrder
    lastHeartbeat?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type TeamMeetingRoomCountOrderByAggregateInput = {
    id?: SortOrder
    roomKey?: SortOrder
    createdAt?: SortOrder
  }

  export type TeamMeetingRoomMaxOrderByAggregateInput = {
    id?: SortOrder
    roomKey?: SortOrder
    createdAt?: SortOrder
  }

  export type TeamMeetingRoomMinOrderByAggregateInput = {
    id?: SortOrder
    roomKey?: SortOrder
    createdAt?: SortOrder
  }

  export type TeamMeetingMessageCountOrderByAggregateInput = {
    id?: SortOrder
    roomKey?: SortOrder
    senderId?: SortOrder
    senderName?: SortOrder
    senderRole?: SortOrder
    senderInitials?: SortOrder
    body?: SortOrder
    messageType?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type TeamMeetingMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    roomKey?: SortOrder
    senderId?: SortOrder
    senderName?: SortOrder
    senderRole?: SortOrder
    senderInitials?: SortOrder
    body?: SortOrder
    messageType?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type TeamMeetingMessageMinOrderByAggregateInput = {
    id?: SortOrder
    roomKey?: SortOrder
    senderId?: SortOrder
    senderName?: SortOrder
    senderRole?: SortOrder
    senderInitials?: SortOrder
    body?: SortOrder
    messageType?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type WhatsappMessageTemplateCountOrderByAggregateInput = {
    id?: SortOrder
    templateName?: SortOrder
    templateBody?: SortOrder
    templateCategory?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type WhatsappMessageTemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    templateName?: SortOrder
    templateBody?: SortOrder
    templateCategory?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type WhatsappMessageTemplateMinOrderByAggregateInput = {
    id?: SortOrder
    templateName?: SortOrder
    templateBody?: SortOrder
    templateCategory?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationDeliveryLogListRelationFilter = {
    every?: NotificationDeliveryLogWhereInput
    some?: NotificationDeliveryLogWhereInput
    none?: NotificationDeliveryLogWhereInput
  }

  export type NotificationDeliveryLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    recipientId?: SortOrder
    channel?: SortOrder
    type?: SortOrder
    status?: SortOrder
    content?: SortOrder
    title?: SortOrder
    read?: SortOrder
    idempotencyKey?: SortOrder
    retryCount?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationAvgOrderByAggregateInput = {
    retryCount?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    recipientId?: SortOrder
    channel?: SortOrder
    type?: SortOrder
    status?: SortOrder
    content?: SortOrder
    title?: SortOrder
    read?: SortOrder
    idempotencyKey?: SortOrder
    retryCount?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    recipientId?: SortOrder
    channel?: SortOrder
    type?: SortOrder
    status?: SortOrder
    content?: SortOrder
    title?: SortOrder
    read?: SortOrder
    idempotencyKey?: SortOrder
    retryCount?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationSumOrderByAggregateInput = {
    retryCount?: SortOrder
  }

  export type NotificationNullableRelationFilter = {
    is?: NotificationWhereInput | null
    isNot?: NotificationWhereInput | null
  }

  export type NotificationDeliveryLogCountOrderByAggregateInput = {
    id?: SortOrder
    notificationId?: SortOrder
    deliveryStatus?: SortOrder
    providerResponse?: SortOrder
    attemptedAt?: SortOrder
  }

  export type NotificationDeliveryLogMaxOrderByAggregateInput = {
    id?: SortOrder
    notificationId?: SortOrder
    deliveryStatus?: SortOrder
    providerResponse?: SortOrder
    attemptedAt?: SortOrder
  }

  export type NotificationDeliveryLogMinOrderByAggregateInput = {
    id?: SortOrder
    notificationId?: SortOrder
    deliveryStatus?: SortOrder
    providerResponse?: SortOrder
    attemptedAt?: SortOrder
  }

  export type MessageCreateNestedManyWithoutConversationInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type UnreadMessageTrackingCreateNestedManyWithoutConversationInput = {
    create?: XOR<UnreadMessageTrackingCreateWithoutConversationInput, UnreadMessageTrackingUncheckedCreateWithoutConversationInput> | UnreadMessageTrackingCreateWithoutConversationInput[] | UnreadMessageTrackingUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: UnreadMessageTrackingCreateOrConnectWithoutConversationInput | UnreadMessageTrackingCreateOrConnectWithoutConversationInput[]
    createMany?: UnreadMessageTrackingCreateManyConversationInputEnvelope
    connect?: UnreadMessageTrackingWhereUniqueInput | UnreadMessageTrackingWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutConversationInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type UnreadMessageTrackingUncheckedCreateNestedManyWithoutConversationInput = {
    create?: XOR<UnreadMessageTrackingCreateWithoutConversationInput, UnreadMessageTrackingUncheckedCreateWithoutConversationInput> | UnreadMessageTrackingCreateWithoutConversationInput[] | UnreadMessageTrackingUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: UnreadMessageTrackingCreateOrConnectWithoutConversationInput | UnreadMessageTrackingCreateOrConnectWithoutConversationInput[]
    createMany?: UnreadMessageTrackingCreateManyConversationInputEnvelope
    connect?: UnreadMessageTrackingWhereUniqueInput | UnreadMessageTrackingWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MessageUpdateManyWithoutConversationNestedInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutConversationInput | MessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutConversationInput | MessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutConversationInput | MessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type UnreadMessageTrackingUpdateManyWithoutConversationNestedInput = {
    create?: XOR<UnreadMessageTrackingCreateWithoutConversationInput, UnreadMessageTrackingUncheckedCreateWithoutConversationInput> | UnreadMessageTrackingCreateWithoutConversationInput[] | UnreadMessageTrackingUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: UnreadMessageTrackingCreateOrConnectWithoutConversationInput | UnreadMessageTrackingCreateOrConnectWithoutConversationInput[]
    upsert?: UnreadMessageTrackingUpsertWithWhereUniqueWithoutConversationInput | UnreadMessageTrackingUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: UnreadMessageTrackingCreateManyConversationInputEnvelope
    set?: UnreadMessageTrackingWhereUniqueInput | UnreadMessageTrackingWhereUniqueInput[]
    disconnect?: UnreadMessageTrackingWhereUniqueInput | UnreadMessageTrackingWhereUniqueInput[]
    delete?: UnreadMessageTrackingWhereUniqueInput | UnreadMessageTrackingWhereUniqueInput[]
    connect?: UnreadMessageTrackingWhereUniqueInput | UnreadMessageTrackingWhereUniqueInput[]
    update?: UnreadMessageTrackingUpdateWithWhereUniqueWithoutConversationInput | UnreadMessageTrackingUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: UnreadMessageTrackingUpdateManyWithWhereWithoutConversationInput | UnreadMessageTrackingUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: UnreadMessageTrackingScalarWhereInput | UnreadMessageTrackingScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutConversationInput | MessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutConversationInput | MessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutConversationInput | MessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type UnreadMessageTrackingUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: XOR<UnreadMessageTrackingCreateWithoutConversationInput, UnreadMessageTrackingUncheckedCreateWithoutConversationInput> | UnreadMessageTrackingCreateWithoutConversationInput[] | UnreadMessageTrackingUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: UnreadMessageTrackingCreateOrConnectWithoutConversationInput | UnreadMessageTrackingCreateOrConnectWithoutConversationInput[]
    upsert?: UnreadMessageTrackingUpsertWithWhereUniqueWithoutConversationInput | UnreadMessageTrackingUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: UnreadMessageTrackingCreateManyConversationInputEnvelope
    set?: UnreadMessageTrackingWhereUniqueInput | UnreadMessageTrackingWhereUniqueInput[]
    disconnect?: UnreadMessageTrackingWhereUniqueInput | UnreadMessageTrackingWhereUniqueInput[]
    delete?: UnreadMessageTrackingWhereUniqueInput | UnreadMessageTrackingWhereUniqueInput[]
    connect?: UnreadMessageTrackingWhereUniqueInput | UnreadMessageTrackingWhereUniqueInput[]
    update?: UnreadMessageTrackingUpdateWithWhereUniqueWithoutConversationInput | UnreadMessageTrackingUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: UnreadMessageTrackingUpdateManyWithWhereWithoutConversationInput | UnreadMessageTrackingUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: UnreadMessageTrackingScalarWhereInput | UnreadMessageTrackingScalarWhereInput[]
  }

  export type ConversationCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
  }

  export type MessageAttachmentCreateNestedManyWithoutMessageInput = {
    create?: XOR<MessageAttachmentCreateWithoutMessageInput, MessageAttachmentUncheckedCreateWithoutMessageInput> | MessageAttachmentCreateWithoutMessageInput[] | MessageAttachmentUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageAttachmentCreateOrConnectWithoutMessageInput | MessageAttachmentCreateOrConnectWithoutMessageInput[]
    createMany?: MessageAttachmentCreateManyMessageInputEnvelope
    connect?: MessageAttachmentWhereUniqueInput | MessageAttachmentWhereUniqueInput[]
  }

  export type MessageDeliveryStatusCreateNestedManyWithoutMessageInput = {
    create?: XOR<MessageDeliveryStatusCreateWithoutMessageInput, MessageDeliveryStatusUncheckedCreateWithoutMessageInput> | MessageDeliveryStatusCreateWithoutMessageInput[] | MessageDeliveryStatusUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageDeliveryStatusCreateOrConnectWithoutMessageInput | MessageDeliveryStatusCreateOrConnectWithoutMessageInput[]
    createMany?: MessageDeliveryStatusCreateManyMessageInputEnvelope
    connect?: MessageDeliveryStatusWhereUniqueInput | MessageDeliveryStatusWhereUniqueInput[]
  }

  export type MessageAttachmentUncheckedCreateNestedManyWithoutMessageInput = {
    create?: XOR<MessageAttachmentCreateWithoutMessageInput, MessageAttachmentUncheckedCreateWithoutMessageInput> | MessageAttachmentCreateWithoutMessageInput[] | MessageAttachmentUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageAttachmentCreateOrConnectWithoutMessageInput | MessageAttachmentCreateOrConnectWithoutMessageInput[]
    createMany?: MessageAttachmentCreateManyMessageInputEnvelope
    connect?: MessageAttachmentWhereUniqueInput | MessageAttachmentWhereUniqueInput[]
  }

  export type MessageDeliveryStatusUncheckedCreateNestedManyWithoutMessageInput = {
    create?: XOR<MessageDeliveryStatusCreateWithoutMessageInput, MessageDeliveryStatusUncheckedCreateWithoutMessageInput> | MessageDeliveryStatusCreateWithoutMessageInput[] | MessageDeliveryStatusUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageDeliveryStatusCreateOrConnectWithoutMessageInput | MessageDeliveryStatusCreateOrConnectWithoutMessageInput[]
    createMany?: MessageDeliveryStatusCreateManyMessageInputEnvelope
    connect?: MessageDeliveryStatusWhereUniqueInput | MessageDeliveryStatusWhereUniqueInput[]
  }

  export type ConversationUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    upsert?: ConversationUpsertWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
    update?: XOR<XOR<ConversationUpdateToOneWithWhereWithoutMessagesInput, ConversationUpdateWithoutMessagesInput>, ConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type MessageAttachmentUpdateManyWithoutMessageNestedInput = {
    create?: XOR<MessageAttachmentCreateWithoutMessageInput, MessageAttachmentUncheckedCreateWithoutMessageInput> | MessageAttachmentCreateWithoutMessageInput[] | MessageAttachmentUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageAttachmentCreateOrConnectWithoutMessageInput | MessageAttachmentCreateOrConnectWithoutMessageInput[]
    upsert?: MessageAttachmentUpsertWithWhereUniqueWithoutMessageInput | MessageAttachmentUpsertWithWhereUniqueWithoutMessageInput[]
    createMany?: MessageAttachmentCreateManyMessageInputEnvelope
    set?: MessageAttachmentWhereUniqueInput | MessageAttachmentWhereUniqueInput[]
    disconnect?: MessageAttachmentWhereUniqueInput | MessageAttachmentWhereUniqueInput[]
    delete?: MessageAttachmentWhereUniqueInput | MessageAttachmentWhereUniqueInput[]
    connect?: MessageAttachmentWhereUniqueInput | MessageAttachmentWhereUniqueInput[]
    update?: MessageAttachmentUpdateWithWhereUniqueWithoutMessageInput | MessageAttachmentUpdateWithWhereUniqueWithoutMessageInput[]
    updateMany?: MessageAttachmentUpdateManyWithWhereWithoutMessageInput | MessageAttachmentUpdateManyWithWhereWithoutMessageInput[]
    deleteMany?: MessageAttachmentScalarWhereInput | MessageAttachmentScalarWhereInput[]
  }

  export type MessageDeliveryStatusUpdateManyWithoutMessageNestedInput = {
    create?: XOR<MessageDeliveryStatusCreateWithoutMessageInput, MessageDeliveryStatusUncheckedCreateWithoutMessageInput> | MessageDeliveryStatusCreateWithoutMessageInput[] | MessageDeliveryStatusUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageDeliveryStatusCreateOrConnectWithoutMessageInput | MessageDeliveryStatusCreateOrConnectWithoutMessageInput[]
    upsert?: MessageDeliveryStatusUpsertWithWhereUniqueWithoutMessageInput | MessageDeliveryStatusUpsertWithWhereUniqueWithoutMessageInput[]
    createMany?: MessageDeliveryStatusCreateManyMessageInputEnvelope
    set?: MessageDeliveryStatusWhereUniqueInput | MessageDeliveryStatusWhereUniqueInput[]
    disconnect?: MessageDeliveryStatusWhereUniqueInput | MessageDeliveryStatusWhereUniqueInput[]
    delete?: MessageDeliveryStatusWhereUniqueInput | MessageDeliveryStatusWhereUniqueInput[]
    connect?: MessageDeliveryStatusWhereUniqueInput | MessageDeliveryStatusWhereUniqueInput[]
    update?: MessageDeliveryStatusUpdateWithWhereUniqueWithoutMessageInput | MessageDeliveryStatusUpdateWithWhereUniqueWithoutMessageInput[]
    updateMany?: MessageDeliveryStatusUpdateManyWithWhereWithoutMessageInput | MessageDeliveryStatusUpdateManyWithWhereWithoutMessageInput[]
    deleteMany?: MessageDeliveryStatusScalarWhereInput | MessageDeliveryStatusScalarWhereInput[]
  }

  export type MessageAttachmentUncheckedUpdateManyWithoutMessageNestedInput = {
    create?: XOR<MessageAttachmentCreateWithoutMessageInput, MessageAttachmentUncheckedCreateWithoutMessageInput> | MessageAttachmentCreateWithoutMessageInput[] | MessageAttachmentUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageAttachmentCreateOrConnectWithoutMessageInput | MessageAttachmentCreateOrConnectWithoutMessageInput[]
    upsert?: MessageAttachmentUpsertWithWhereUniqueWithoutMessageInput | MessageAttachmentUpsertWithWhereUniqueWithoutMessageInput[]
    createMany?: MessageAttachmentCreateManyMessageInputEnvelope
    set?: MessageAttachmentWhereUniqueInput | MessageAttachmentWhereUniqueInput[]
    disconnect?: MessageAttachmentWhereUniqueInput | MessageAttachmentWhereUniqueInput[]
    delete?: MessageAttachmentWhereUniqueInput | MessageAttachmentWhereUniqueInput[]
    connect?: MessageAttachmentWhereUniqueInput | MessageAttachmentWhereUniqueInput[]
    update?: MessageAttachmentUpdateWithWhereUniqueWithoutMessageInput | MessageAttachmentUpdateWithWhereUniqueWithoutMessageInput[]
    updateMany?: MessageAttachmentUpdateManyWithWhereWithoutMessageInput | MessageAttachmentUpdateManyWithWhereWithoutMessageInput[]
    deleteMany?: MessageAttachmentScalarWhereInput | MessageAttachmentScalarWhereInput[]
  }

  export type MessageDeliveryStatusUncheckedUpdateManyWithoutMessageNestedInput = {
    create?: XOR<MessageDeliveryStatusCreateWithoutMessageInput, MessageDeliveryStatusUncheckedCreateWithoutMessageInput> | MessageDeliveryStatusCreateWithoutMessageInput[] | MessageDeliveryStatusUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageDeliveryStatusCreateOrConnectWithoutMessageInput | MessageDeliveryStatusCreateOrConnectWithoutMessageInput[]
    upsert?: MessageDeliveryStatusUpsertWithWhereUniqueWithoutMessageInput | MessageDeliveryStatusUpsertWithWhereUniqueWithoutMessageInput[]
    createMany?: MessageDeliveryStatusCreateManyMessageInputEnvelope
    set?: MessageDeliveryStatusWhereUniqueInput | MessageDeliveryStatusWhereUniqueInput[]
    disconnect?: MessageDeliveryStatusWhereUniqueInput | MessageDeliveryStatusWhereUniqueInput[]
    delete?: MessageDeliveryStatusWhereUniqueInput | MessageDeliveryStatusWhereUniqueInput[]
    connect?: MessageDeliveryStatusWhereUniqueInput | MessageDeliveryStatusWhereUniqueInput[]
    update?: MessageDeliveryStatusUpdateWithWhereUniqueWithoutMessageInput | MessageDeliveryStatusUpdateWithWhereUniqueWithoutMessageInput[]
    updateMany?: MessageDeliveryStatusUpdateManyWithWhereWithoutMessageInput | MessageDeliveryStatusUpdateManyWithWhereWithoutMessageInput[]
    deleteMany?: MessageDeliveryStatusScalarWhereInput | MessageDeliveryStatusScalarWhereInput[]
  }

  export type MessageCreateNestedOneWithoutAttachmentsInput = {
    create?: XOR<MessageCreateWithoutAttachmentsInput, MessageUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: MessageCreateOrConnectWithoutAttachmentsInput
    connect?: MessageWhereUniqueInput
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type MessageUpdateOneRequiredWithoutAttachmentsNestedInput = {
    create?: XOR<MessageCreateWithoutAttachmentsInput, MessageUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: MessageCreateOrConnectWithoutAttachmentsInput
    upsert?: MessageUpsertWithoutAttachmentsInput
    connect?: MessageWhereUniqueInput
    update?: XOR<XOR<MessageUpdateToOneWithWhereWithoutAttachmentsInput, MessageUpdateWithoutAttachmentsInput>, MessageUncheckedUpdateWithoutAttachmentsInput>
  }

  export type MessageCreateNestedOneWithoutDeliveryStatusesInput = {
    create?: XOR<MessageCreateWithoutDeliveryStatusesInput, MessageUncheckedCreateWithoutDeliveryStatusesInput>
    connectOrCreate?: MessageCreateOrConnectWithoutDeliveryStatusesInput
    connect?: MessageWhereUniqueInput
  }

  export type MessageUpdateOneRequiredWithoutDeliveryStatusesNestedInput = {
    create?: XOR<MessageCreateWithoutDeliveryStatusesInput, MessageUncheckedCreateWithoutDeliveryStatusesInput>
    connectOrCreate?: MessageCreateOrConnectWithoutDeliveryStatusesInput
    upsert?: MessageUpsertWithoutDeliveryStatusesInput
    connect?: MessageWhereUniqueInput
    update?: XOR<XOR<MessageUpdateToOneWithWhereWithoutDeliveryStatusesInput, MessageUpdateWithoutDeliveryStatusesInput>, MessageUncheckedUpdateWithoutDeliveryStatusesInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ConversationCreateNestedOneWithoutUnreadTrackingInput = {
    create?: XOR<ConversationCreateWithoutUnreadTrackingInput, ConversationUncheckedCreateWithoutUnreadTrackingInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutUnreadTrackingInput
    connect?: ConversationWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ConversationUpdateOneRequiredWithoutUnreadTrackingNestedInput = {
    create?: XOR<ConversationCreateWithoutUnreadTrackingInput, ConversationUncheckedCreateWithoutUnreadTrackingInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutUnreadTrackingInput
    upsert?: ConversationUpsertWithoutUnreadTrackingInput
    connect?: ConversationWhereUniqueInput
    update?: XOR<XOR<ConversationUpdateToOneWithWhereWithoutUnreadTrackingInput, ConversationUpdateWithoutUnreadTrackingInput>, ConversationUncheckedUpdateWithoutUnreadTrackingInput>
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NotificationDeliveryLogCreateNestedManyWithoutNotificationInput = {
    create?: XOR<NotificationDeliveryLogCreateWithoutNotificationInput, NotificationDeliveryLogUncheckedCreateWithoutNotificationInput> | NotificationDeliveryLogCreateWithoutNotificationInput[] | NotificationDeliveryLogUncheckedCreateWithoutNotificationInput[]
    connectOrCreate?: NotificationDeliveryLogCreateOrConnectWithoutNotificationInput | NotificationDeliveryLogCreateOrConnectWithoutNotificationInput[]
    createMany?: NotificationDeliveryLogCreateManyNotificationInputEnvelope
    connect?: NotificationDeliveryLogWhereUniqueInput | NotificationDeliveryLogWhereUniqueInput[]
  }

  export type NotificationDeliveryLogUncheckedCreateNestedManyWithoutNotificationInput = {
    create?: XOR<NotificationDeliveryLogCreateWithoutNotificationInput, NotificationDeliveryLogUncheckedCreateWithoutNotificationInput> | NotificationDeliveryLogCreateWithoutNotificationInput[] | NotificationDeliveryLogUncheckedCreateWithoutNotificationInput[]
    connectOrCreate?: NotificationDeliveryLogCreateOrConnectWithoutNotificationInput | NotificationDeliveryLogCreateOrConnectWithoutNotificationInput[]
    createMany?: NotificationDeliveryLogCreateManyNotificationInputEnvelope
    connect?: NotificationDeliveryLogWhereUniqueInput | NotificationDeliveryLogWhereUniqueInput[]
  }

  export type NotificationDeliveryLogUpdateManyWithoutNotificationNestedInput = {
    create?: XOR<NotificationDeliveryLogCreateWithoutNotificationInput, NotificationDeliveryLogUncheckedCreateWithoutNotificationInput> | NotificationDeliveryLogCreateWithoutNotificationInput[] | NotificationDeliveryLogUncheckedCreateWithoutNotificationInput[]
    connectOrCreate?: NotificationDeliveryLogCreateOrConnectWithoutNotificationInput | NotificationDeliveryLogCreateOrConnectWithoutNotificationInput[]
    upsert?: NotificationDeliveryLogUpsertWithWhereUniqueWithoutNotificationInput | NotificationDeliveryLogUpsertWithWhereUniqueWithoutNotificationInput[]
    createMany?: NotificationDeliveryLogCreateManyNotificationInputEnvelope
    set?: NotificationDeliveryLogWhereUniqueInput | NotificationDeliveryLogWhereUniqueInput[]
    disconnect?: NotificationDeliveryLogWhereUniqueInput | NotificationDeliveryLogWhereUniqueInput[]
    delete?: NotificationDeliveryLogWhereUniqueInput | NotificationDeliveryLogWhereUniqueInput[]
    connect?: NotificationDeliveryLogWhereUniqueInput | NotificationDeliveryLogWhereUniqueInput[]
    update?: NotificationDeliveryLogUpdateWithWhereUniqueWithoutNotificationInput | NotificationDeliveryLogUpdateWithWhereUniqueWithoutNotificationInput[]
    updateMany?: NotificationDeliveryLogUpdateManyWithWhereWithoutNotificationInput | NotificationDeliveryLogUpdateManyWithWhereWithoutNotificationInput[]
    deleteMany?: NotificationDeliveryLogScalarWhereInput | NotificationDeliveryLogScalarWhereInput[]
  }

  export type NotificationDeliveryLogUncheckedUpdateManyWithoutNotificationNestedInput = {
    create?: XOR<NotificationDeliveryLogCreateWithoutNotificationInput, NotificationDeliveryLogUncheckedCreateWithoutNotificationInput> | NotificationDeliveryLogCreateWithoutNotificationInput[] | NotificationDeliveryLogUncheckedCreateWithoutNotificationInput[]
    connectOrCreate?: NotificationDeliveryLogCreateOrConnectWithoutNotificationInput | NotificationDeliveryLogCreateOrConnectWithoutNotificationInput[]
    upsert?: NotificationDeliveryLogUpsertWithWhereUniqueWithoutNotificationInput | NotificationDeliveryLogUpsertWithWhereUniqueWithoutNotificationInput[]
    createMany?: NotificationDeliveryLogCreateManyNotificationInputEnvelope
    set?: NotificationDeliveryLogWhereUniqueInput | NotificationDeliveryLogWhereUniqueInput[]
    disconnect?: NotificationDeliveryLogWhereUniqueInput | NotificationDeliveryLogWhereUniqueInput[]
    delete?: NotificationDeliveryLogWhereUniqueInput | NotificationDeliveryLogWhereUniqueInput[]
    connect?: NotificationDeliveryLogWhereUniqueInput | NotificationDeliveryLogWhereUniqueInput[]
    update?: NotificationDeliveryLogUpdateWithWhereUniqueWithoutNotificationInput | NotificationDeliveryLogUpdateWithWhereUniqueWithoutNotificationInput[]
    updateMany?: NotificationDeliveryLogUpdateManyWithWhereWithoutNotificationInput | NotificationDeliveryLogUpdateManyWithWhereWithoutNotificationInput[]
    deleteMany?: NotificationDeliveryLogScalarWhereInput | NotificationDeliveryLogScalarWhereInput[]
  }

  export type NotificationCreateNestedOneWithoutDeliveryLogsInput = {
    create?: XOR<NotificationCreateWithoutDeliveryLogsInput, NotificationUncheckedCreateWithoutDeliveryLogsInput>
    connectOrCreate?: NotificationCreateOrConnectWithoutDeliveryLogsInput
    connect?: NotificationWhereUniqueInput
  }

  export type NotificationUpdateOneWithoutDeliveryLogsNestedInput = {
    create?: XOR<NotificationCreateWithoutDeliveryLogsInput, NotificationUncheckedCreateWithoutDeliveryLogsInput>
    connectOrCreate?: NotificationCreateOrConnectWithoutDeliveryLogsInput
    upsert?: NotificationUpsertWithoutDeliveryLogsInput
    disconnect?: NotificationWhereInput | boolean
    delete?: NotificationWhereInput | boolean
    connect?: NotificationWhereUniqueInput
    update?: XOR<XOR<NotificationUpdateToOneWithWhereWithoutDeliveryLogsInput, NotificationUpdateWithoutDeliveryLogsInput>, NotificationUncheckedUpdateWithoutDeliveryLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type MessageCreateWithoutConversationInput = {
    id: string
    senderType: string
    internalSenderId?: string | null
    messageChannel: string
    messageBody?: string | null
    messageType: string
    deliveryStatus: string
    whatsappMessageId?: string | null
    traceId?: string | null
    createdAt: Date | string
    attachments?: MessageAttachmentCreateNestedManyWithoutMessageInput
    deliveryStatuses?: MessageDeliveryStatusCreateNestedManyWithoutMessageInput
  }

  export type MessageUncheckedCreateWithoutConversationInput = {
    id: string
    senderType: string
    internalSenderId?: string | null
    messageChannel: string
    messageBody?: string | null
    messageType: string
    deliveryStatus: string
    whatsappMessageId?: string | null
    traceId?: string | null
    createdAt: Date | string
    attachments?: MessageAttachmentUncheckedCreateNestedManyWithoutMessageInput
    deliveryStatuses?: MessageDeliveryStatusUncheckedCreateNestedManyWithoutMessageInput
  }

  export type MessageCreateOrConnectWithoutConversationInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput>
  }

  export type MessageCreateManyConversationInputEnvelope = {
    data: MessageCreateManyConversationInput | MessageCreateManyConversationInput[]
    skipDuplicates?: boolean
  }

  export type UnreadMessageTrackingCreateWithoutConversationInput = {
    userId: string
    unreadCount?: number
  }

  export type UnreadMessageTrackingUncheckedCreateWithoutConversationInput = {
    userId: string
    unreadCount?: number
  }

  export type UnreadMessageTrackingCreateOrConnectWithoutConversationInput = {
    where: UnreadMessageTrackingWhereUniqueInput
    create: XOR<UnreadMessageTrackingCreateWithoutConversationInput, UnreadMessageTrackingUncheckedCreateWithoutConversationInput>
  }

  export type UnreadMessageTrackingCreateManyConversationInputEnvelope = {
    data: UnreadMessageTrackingCreateManyConversationInput | UnreadMessageTrackingCreateManyConversationInput[]
    skipDuplicates?: boolean
  }

  export type MessageUpsertWithWhereUniqueWithoutConversationInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutConversationInput, MessageUncheckedUpdateWithoutConversationInput>
    create: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutConversationInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutConversationInput, MessageUncheckedUpdateWithoutConversationInput>
  }

  export type MessageUpdateManyWithWhereWithoutConversationInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutConversationInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    conversationId?: StringFilter<"Message"> | string
    senderType?: StringFilter<"Message"> | string
    internalSenderId?: StringNullableFilter<"Message"> | string | null
    messageChannel?: StringFilter<"Message"> | string
    messageBody?: StringNullableFilter<"Message"> | string | null
    messageType?: StringFilter<"Message"> | string
    deliveryStatus?: StringFilter<"Message"> | string
    whatsappMessageId?: StringNullableFilter<"Message"> | string | null
    traceId?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
  }

  export type UnreadMessageTrackingUpsertWithWhereUniqueWithoutConversationInput = {
    where: UnreadMessageTrackingWhereUniqueInput
    update: XOR<UnreadMessageTrackingUpdateWithoutConversationInput, UnreadMessageTrackingUncheckedUpdateWithoutConversationInput>
    create: XOR<UnreadMessageTrackingCreateWithoutConversationInput, UnreadMessageTrackingUncheckedCreateWithoutConversationInput>
  }

  export type UnreadMessageTrackingUpdateWithWhereUniqueWithoutConversationInput = {
    where: UnreadMessageTrackingWhereUniqueInput
    data: XOR<UnreadMessageTrackingUpdateWithoutConversationInput, UnreadMessageTrackingUncheckedUpdateWithoutConversationInput>
  }

  export type UnreadMessageTrackingUpdateManyWithWhereWithoutConversationInput = {
    where: UnreadMessageTrackingScalarWhereInput
    data: XOR<UnreadMessageTrackingUpdateManyMutationInput, UnreadMessageTrackingUncheckedUpdateManyWithoutConversationInput>
  }

  export type UnreadMessageTrackingScalarWhereInput = {
    AND?: UnreadMessageTrackingScalarWhereInput | UnreadMessageTrackingScalarWhereInput[]
    OR?: UnreadMessageTrackingScalarWhereInput[]
    NOT?: UnreadMessageTrackingScalarWhereInput | UnreadMessageTrackingScalarWhereInput[]
    userId?: StringFilter<"UnreadMessageTracking"> | string
    conversationId?: StringFilter<"UnreadMessageTracking"> | string
    unreadCount?: IntFilter<"UnreadMessageTracking"> | number
  }

  export type ConversationCreateWithoutMessagesInput = {
    id: string
    connectorId?: string | null
    rmId?: string | null
    loanApplicationId?: string | null
    assignedOpsUserId?: string | null
    conversationStatus: string
    conversationType?: string
    customerName?: string | null
    customerPhone?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    unreadTracking?: UnreadMessageTrackingCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutMessagesInput = {
    id: string
    connectorId?: string | null
    rmId?: string | null
    loanApplicationId?: string | null
    assignedOpsUserId?: string | null
    conversationStatus: string
    conversationType?: string
    customerName?: string | null
    customerPhone?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    unreadTracking?: UnreadMessageTrackingUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutMessagesInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
  }

  export type MessageAttachmentCreateWithoutMessageInput = {
    id: string
    fileName: string
    fileType: string
    s3Key: string
    fileSize: bigint | number
    createdAt: Date | string
  }

  export type MessageAttachmentUncheckedCreateWithoutMessageInput = {
    id: string
    fileName: string
    fileType: string
    s3Key: string
    fileSize: bigint | number
    createdAt: Date | string
  }

  export type MessageAttachmentCreateOrConnectWithoutMessageInput = {
    where: MessageAttachmentWhereUniqueInput
    create: XOR<MessageAttachmentCreateWithoutMessageInput, MessageAttachmentUncheckedCreateWithoutMessageInput>
  }

  export type MessageAttachmentCreateManyMessageInputEnvelope = {
    data: MessageAttachmentCreateManyMessageInput | MessageAttachmentCreateManyMessageInput[]
    skipDuplicates?: boolean
  }

  export type MessageDeliveryStatusCreateWithoutMessageInput = {
    id: string
    status: string
    timestamp: Date | string
    remarks?: string | null
  }

  export type MessageDeliveryStatusUncheckedCreateWithoutMessageInput = {
    id: string
    status: string
    timestamp: Date | string
    remarks?: string | null
  }

  export type MessageDeliveryStatusCreateOrConnectWithoutMessageInput = {
    where: MessageDeliveryStatusWhereUniqueInput
    create: XOR<MessageDeliveryStatusCreateWithoutMessageInput, MessageDeliveryStatusUncheckedCreateWithoutMessageInput>
  }

  export type MessageDeliveryStatusCreateManyMessageInputEnvelope = {
    data: MessageDeliveryStatusCreateManyMessageInput | MessageDeliveryStatusCreateManyMessageInput[]
    skipDuplicates?: boolean
  }

  export type ConversationUpsertWithoutMessagesInput = {
    update: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    where?: ConversationWhereInput
  }

  export type ConversationUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ConversationWhereInput
    data: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type ConversationUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectorId?: NullableStringFieldUpdateOperationsInput | string | null
    rmId?: NullableStringFieldUpdateOperationsInput | string | null
    loanApplicationId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedOpsUserId?: NullableStringFieldUpdateOperationsInput | string | null
    conversationStatus?: StringFieldUpdateOperationsInput | string
    conversationType?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unreadTracking?: UnreadMessageTrackingUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectorId?: NullableStringFieldUpdateOperationsInput | string | null
    rmId?: NullableStringFieldUpdateOperationsInput | string | null
    loanApplicationId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedOpsUserId?: NullableStringFieldUpdateOperationsInput | string | null
    conversationStatus?: StringFieldUpdateOperationsInput | string
    conversationType?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    unreadTracking?: UnreadMessageTrackingUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type MessageAttachmentUpsertWithWhereUniqueWithoutMessageInput = {
    where: MessageAttachmentWhereUniqueInput
    update: XOR<MessageAttachmentUpdateWithoutMessageInput, MessageAttachmentUncheckedUpdateWithoutMessageInput>
    create: XOR<MessageAttachmentCreateWithoutMessageInput, MessageAttachmentUncheckedCreateWithoutMessageInput>
  }

  export type MessageAttachmentUpdateWithWhereUniqueWithoutMessageInput = {
    where: MessageAttachmentWhereUniqueInput
    data: XOR<MessageAttachmentUpdateWithoutMessageInput, MessageAttachmentUncheckedUpdateWithoutMessageInput>
  }

  export type MessageAttachmentUpdateManyWithWhereWithoutMessageInput = {
    where: MessageAttachmentScalarWhereInput
    data: XOR<MessageAttachmentUpdateManyMutationInput, MessageAttachmentUncheckedUpdateManyWithoutMessageInput>
  }

  export type MessageAttachmentScalarWhereInput = {
    AND?: MessageAttachmentScalarWhereInput | MessageAttachmentScalarWhereInput[]
    OR?: MessageAttachmentScalarWhereInput[]
    NOT?: MessageAttachmentScalarWhereInput | MessageAttachmentScalarWhereInput[]
    id?: StringFilter<"MessageAttachment"> | string
    messageId?: StringFilter<"MessageAttachment"> | string
    fileName?: StringFilter<"MessageAttachment"> | string
    fileType?: StringFilter<"MessageAttachment"> | string
    s3Key?: StringFilter<"MessageAttachment"> | string
    fileSize?: BigIntFilter<"MessageAttachment"> | bigint | number
    createdAt?: DateTimeFilter<"MessageAttachment"> | Date | string
  }

  export type MessageDeliveryStatusUpsertWithWhereUniqueWithoutMessageInput = {
    where: MessageDeliveryStatusWhereUniqueInput
    update: XOR<MessageDeliveryStatusUpdateWithoutMessageInput, MessageDeliveryStatusUncheckedUpdateWithoutMessageInput>
    create: XOR<MessageDeliveryStatusCreateWithoutMessageInput, MessageDeliveryStatusUncheckedCreateWithoutMessageInput>
  }

  export type MessageDeliveryStatusUpdateWithWhereUniqueWithoutMessageInput = {
    where: MessageDeliveryStatusWhereUniqueInput
    data: XOR<MessageDeliveryStatusUpdateWithoutMessageInput, MessageDeliveryStatusUncheckedUpdateWithoutMessageInput>
  }

  export type MessageDeliveryStatusUpdateManyWithWhereWithoutMessageInput = {
    where: MessageDeliveryStatusScalarWhereInput
    data: XOR<MessageDeliveryStatusUpdateManyMutationInput, MessageDeliveryStatusUncheckedUpdateManyWithoutMessageInput>
  }

  export type MessageDeliveryStatusScalarWhereInput = {
    AND?: MessageDeliveryStatusScalarWhereInput | MessageDeliveryStatusScalarWhereInput[]
    OR?: MessageDeliveryStatusScalarWhereInput[]
    NOT?: MessageDeliveryStatusScalarWhereInput | MessageDeliveryStatusScalarWhereInput[]
    id?: StringFilter<"MessageDeliveryStatus"> | string
    messageId?: StringFilter<"MessageDeliveryStatus"> | string
    status?: StringFilter<"MessageDeliveryStatus"> | string
    timestamp?: DateTimeFilter<"MessageDeliveryStatus"> | Date | string
    remarks?: StringNullableFilter<"MessageDeliveryStatus"> | string | null
  }

  export type MessageCreateWithoutAttachmentsInput = {
    id: string
    senderType: string
    internalSenderId?: string | null
    messageChannel: string
    messageBody?: string | null
    messageType: string
    deliveryStatus: string
    whatsappMessageId?: string | null
    traceId?: string | null
    createdAt: Date | string
    conversation: ConversationCreateNestedOneWithoutMessagesInput
    deliveryStatuses?: MessageDeliveryStatusCreateNestedManyWithoutMessageInput
  }

  export type MessageUncheckedCreateWithoutAttachmentsInput = {
    id: string
    conversationId: string
    senderType: string
    internalSenderId?: string | null
    messageChannel: string
    messageBody?: string | null
    messageType: string
    deliveryStatus: string
    whatsappMessageId?: string | null
    traceId?: string | null
    createdAt: Date | string
    deliveryStatuses?: MessageDeliveryStatusUncheckedCreateNestedManyWithoutMessageInput
  }

  export type MessageCreateOrConnectWithoutAttachmentsInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutAttachmentsInput, MessageUncheckedCreateWithoutAttachmentsInput>
  }

  export type MessageUpsertWithoutAttachmentsInput = {
    update: XOR<MessageUpdateWithoutAttachmentsInput, MessageUncheckedUpdateWithoutAttachmentsInput>
    create: XOR<MessageCreateWithoutAttachmentsInput, MessageUncheckedCreateWithoutAttachmentsInput>
    where?: MessageWhereInput
  }

  export type MessageUpdateToOneWithWhereWithoutAttachmentsInput = {
    where?: MessageWhereInput
    data: XOR<MessageUpdateWithoutAttachmentsInput, MessageUncheckedUpdateWithoutAttachmentsInput>
  }

  export type MessageUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderType?: StringFieldUpdateOperationsInput | string
    internalSenderId?: NullableStringFieldUpdateOperationsInput | string | null
    messageChannel?: StringFieldUpdateOperationsInput | string
    messageBody?: NullableStringFieldUpdateOperationsInput | string | null
    messageType?: StringFieldUpdateOperationsInput | string
    deliveryStatus?: StringFieldUpdateOperationsInput | string
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
    deliveryStatuses?: MessageDeliveryStatusUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    senderType?: StringFieldUpdateOperationsInput | string
    internalSenderId?: NullableStringFieldUpdateOperationsInput | string | null
    messageChannel?: StringFieldUpdateOperationsInput | string
    messageBody?: NullableStringFieldUpdateOperationsInput | string | null
    messageType?: StringFieldUpdateOperationsInput | string
    deliveryStatus?: StringFieldUpdateOperationsInput | string
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryStatuses?: MessageDeliveryStatusUncheckedUpdateManyWithoutMessageNestedInput
  }

  export type MessageCreateWithoutDeliveryStatusesInput = {
    id: string
    senderType: string
    internalSenderId?: string | null
    messageChannel: string
    messageBody?: string | null
    messageType: string
    deliveryStatus: string
    whatsappMessageId?: string | null
    traceId?: string | null
    createdAt: Date | string
    conversation: ConversationCreateNestedOneWithoutMessagesInput
    attachments?: MessageAttachmentCreateNestedManyWithoutMessageInput
  }

  export type MessageUncheckedCreateWithoutDeliveryStatusesInput = {
    id: string
    conversationId: string
    senderType: string
    internalSenderId?: string | null
    messageChannel: string
    messageBody?: string | null
    messageType: string
    deliveryStatus: string
    whatsappMessageId?: string | null
    traceId?: string | null
    createdAt: Date | string
    attachments?: MessageAttachmentUncheckedCreateNestedManyWithoutMessageInput
  }

  export type MessageCreateOrConnectWithoutDeliveryStatusesInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutDeliveryStatusesInput, MessageUncheckedCreateWithoutDeliveryStatusesInput>
  }

  export type MessageUpsertWithoutDeliveryStatusesInput = {
    update: XOR<MessageUpdateWithoutDeliveryStatusesInput, MessageUncheckedUpdateWithoutDeliveryStatusesInput>
    create: XOR<MessageCreateWithoutDeliveryStatusesInput, MessageUncheckedCreateWithoutDeliveryStatusesInput>
    where?: MessageWhereInput
  }

  export type MessageUpdateToOneWithWhereWithoutDeliveryStatusesInput = {
    where?: MessageWhereInput
    data: XOR<MessageUpdateWithoutDeliveryStatusesInput, MessageUncheckedUpdateWithoutDeliveryStatusesInput>
  }

  export type MessageUpdateWithoutDeliveryStatusesInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderType?: StringFieldUpdateOperationsInput | string
    internalSenderId?: NullableStringFieldUpdateOperationsInput | string | null
    messageChannel?: StringFieldUpdateOperationsInput | string
    messageBody?: NullableStringFieldUpdateOperationsInput | string | null
    messageType?: StringFieldUpdateOperationsInput | string
    deliveryStatus?: StringFieldUpdateOperationsInput | string
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
    attachments?: MessageAttachmentUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateWithoutDeliveryStatusesInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    senderType?: StringFieldUpdateOperationsInput | string
    internalSenderId?: NullableStringFieldUpdateOperationsInput | string | null
    messageChannel?: StringFieldUpdateOperationsInput | string
    messageBody?: NullableStringFieldUpdateOperationsInput | string | null
    messageType?: StringFieldUpdateOperationsInput | string
    deliveryStatus?: StringFieldUpdateOperationsInput | string
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: MessageAttachmentUncheckedUpdateManyWithoutMessageNestedInput
  }

  export type ConversationCreateWithoutUnreadTrackingInput = {
    id: string
    connectorId?: string | null
    rmId?: string | null
    loanApplicationId?: string | null
    assignedOpsUserId?: string | null
    conversationStatus: string
    conversationType?: string
    customerName?: string | null
    customerPhone?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    messages?: MessageCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutUnreadTrackingInput = {
    id: string
    connectorId?: string | null
    rmId?: string | null
    loanApplicationId?: string | null
    assignedOpsUserId?: string | null
    conversationStatus: string
    conversationType?: string
    customerName?: string | null
    customerPhone?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutUnreadTrackingInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutUnreadTrackingInput, ConversationUncheckedCreateWithoutUnreadTrackingInput>
  }

  export type ConversationUpsertWithoutUnreadTrackingInput = {
    update: XOR<ConversationUpdateWithoutUnreadTrackingInput, ConversationUncheckedUpdateWithoutUnreadTrackingInput>
    create: XOR<ConversationCreateWithoutUnreadTrackingInput, ConversationUncheckedCreateWithoutUnreadTrackingInput>
    where?: ConversationWhereInput
  }

  export type ConversationUpdateToOneWithWhereWithoutUnreadTrackingInput = {
    where?: ConversationWhereInput
    data: XOR<ConversationUpdateWithoutUnreadTrackingInput, ConversationUncheckedUpdateWithoutUnreadTrackingInput>
  }

  export type ConversationUpdateWithoutUnreadTrackingInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectorId?: NullableStringFieldUpdateOperationsInput | string | null
    rmId?: NullableStringFieldUpdateOperationsInput | string | null
    loanApplicationId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedOpsUserId?: NullableStringFieldUpdateOperationsInput | string | null
    conversationStatus?: StringFieldUpdateOperationsInput | string
    conversationType?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutUnreadTrackingInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectorId?: NullableStringFieldUpdateOperationsInput | string | null
    rmId?: NullableStringFieldUpdateOperationsInput | string | null
    loanApplicationId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedOpsUserId?: NullableStringFieldUpdateOperationsInput | string | null
    conversationStatus?: StringFieldUpdateOperationsInput | string
    conversationType?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type NotificationDeliveryLogCreateWithoutNotificationInput = {
    id: string
    deliveryStatus: string
    providerResponse?: string | null
    attemptedAt: Date | string
  }

  export type NotificationDeliveryLogUncheckedCreateWithoutNotificationInput = {
    id: string
    deliveryStatus: string
    providerResponse?: string | null
    attemptedAt: Date | string
  }

  export type NotificationDeliveryLogCreateOrConnectWithoutNotificationInput = {
    where: NotificationDeliveryLogWhereUniqueInput
    create: XOR<NotificationDeliveryLogCreateWithoutNotificationInput, NotificationDeliveryLogUncheckedCreateWithoutNotificationInput>
  }

  export type NotificationDeliveryLogCreateManyNotificationInputEnvelope = {
    data: NotificationDeliveryLogCreateManyNotificationInput | NotificationDeliveryLogCreateManyNotificationInput[]
    skipDuplicates?: boolean
  }

  export type NotificationDeliveryLogUpsertWithWhereUniqueWithoutNotificationInput = {
    where: NotificationDeliveryLogWhereUniqueInput
    update: XOR<NotificationDeliveryLogUpdateWithoutNotificationInput, NotificationDeliveryLogUncheckedUpdateWithoutNotificationInput>
    create: XOR<NotificationDeliveryLogCreateWithoutNotificationInput, NotificationDeliveryLogUncheckedCreateWithoutNotificationInput>
  }

  export type NotificationDeliveryLogUpdateWithWhereUniqueWithoutNotificationInput = {
    where: NotificationDeliveryLogWhereUniqueInput
    data: XOR<NotificationDeliveryLogUpdateWithoutNotificationInput, NotificationDeliveryLogUncheckedUpdateWithoutNotificationInput>
  }

  export type NotificationDeliveryLogUpdateManyWithWhereWithoutNotificationInput = {
    where: NotificationDeliveryLogScalarWhereInput
    data: XOR<NotificationDeliveryLogUpdateManyMutationInput, NotificationDeliveryLogUncheckedUpdateManyWithoutNotificationInput>
  }

  export type NotificationDeliveryLogScalarWhereInput = {
    AND?: NotificationDeliveryLogScalarWhereInput | NotificationDeliveryLogScalarWhereInput[]
    OR?: NotificationDeliveryLogScalarWhereInput[]
    NOT?: NotificationDeliveryLogScalarWhereInput | NotificationDeliveryLogScalarWhereInput[]
    id?: StringFilter<"NotificationDeliveryLog"> | string
    notificationId?: StringNullableFilter<"NotificationDeliveryLog"> | string | null
    deliveryStatus?: StringFilter<"NotificationDeliveryLog"> | string
    providerResponse?: StringNullableFilter<"NotificationDeliveryLog"> | string | null
    attemptedAt?: DateTimeFilter<"NotificationDeliveryLog"> | Date | string
  }

  export type NotificationCreateWithoutDeliveryLogsInput = {
    id: string
    recipientId: string
    channel: string
    type: string
    status: string
    content?: string | null
    title?: string | null
    read?: boolean
    idempotencyKey?: string | null
    retryCount?: number
    createdAt: Date | string
  }

  export type NotificationUncheckedCreateWithoutDeliveryLogsInput = {
    id: string
    recipientId: string
    channel: string
    type: string
    status: string
    content?: string | null
    title?: string | null
    read?: boolean
    idempotencyKey?: string | null
    retryCount?: number
    createdAt: Date | string
  }

  export type NotificationCreateOrConnectWithoutDeliveryLogsInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutDeliveryLogsInput, NotificationUncheckedCreateWithoutDeliveryLogsInput>
  }

  export type NotificationUpsertWithoutDeliveryLogsInput = {
    update: XOR<NotificationUpdateWithoutDeliveryLogsInput, NotificationUncheckedUpdateWithoutDeliveryLogsInput>
    create: XOR<NotificationCreateWithoutDeliveryLogsInput, NotificationUncheckedCreateWithoutDeliveryLogsInput>
    where?: NotificationWhereInput
  }

  export type NotificationUpdateToOneWithWhereWithoutDeliveryLogsInput = {
    where?: NotificationWhereInput
    data: XOR<NotificationUpdateWithoutDeliveryLogsInput, NotificationUncheckedUpdateWithoutDeliveryLogsInput>
  }

  export type NotificationUpdateWithoutDeliveryLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    recipientId?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutDeliveryLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    recipientId?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyConversationInput = {
    id: string
    senderType: string
    internalSenderId?: string | null
    messageChannel: string
    messageBody?: string | null
    messageType: string
    deliveryStatus: string
    whatsappMessageId?: string | null
    traceId?: string | null
    createdAt: Date | string
  }

  export type UnreadMessageTrackingCreateManyConversationInput = {
    userId: string
    unreadCount?: number
  }

  export type MessageUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderType?: StringFieldUpdateOperationsInput | string
    internalSenderId?: NullableStringFieldUpdateOperationsInput | string | null
    messageChannel?: StringFieldUpdateOperationsInput | string
    messageBody?: NullableStringFieldUpdateOperationsInput | string | null
    messageType?: StringFieldUpdateOperationsInput | string
    deliveryStatus?: StringFieldUpdateOperationsInput | string
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: MessageAttachmentUpdateManyWithoutMessageNestedInput
    deliveryStatuses?: MessageDeliveryStatusUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderType?: StringFieldUpdateOperationsInput | string
    internalSenderId?: NullableStringFieldUpdateOperationsInput | string | null
    messageChannel?: StringFieldUpdateOperationsInput | string
    messageBody?: NullableStringFieldUpdateOperationsInput | string | null
    messageType?: StringFieldUpdateOperationsInput | string
    deliveryStatus?: StringFieldUpdateOperationsInput | string
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: MessageAttachmentUncheckedUpdateManyWithoutMessageNestedInput
    deliveryStatuses?: MessageDeliveryStatusUncheckedUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateManyWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderType?: StringFieldUpdateOperationsInput | string
    internalSenderId?: NullableStringFieldUpdateOperationsInput | string | null
    messageChannel?: StringFieldUpdateOperationsInput | string
    messageBody?: NullableStringFieldUpdateOperationsInput | string | null
    messageType?: StringFieldUpdateOperationsInput | string
    deliveryStatus?: StringFieldUpdateOperationsInput | string
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UnreadMessageTrackingUpdateWithoutConversationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    unreadCount?: IntFieldUpdateOperationsInput | number
  }

  export type UnreadMessageTrackingUncheckedUpdateWithoutConversationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    unreadCount?: IntFieldUpdateOperationsInput | number
  }

  export type UnreadMessageTrackingUncheckedUpdateManyWithoutConversationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    unreadCount?: IntFieldUpdateOperationsInput | number
  }

  export type MessageAttachmentCreateManyMessageInput = {
    id: string
    fileName: string
    fileType: string
    s3Key: string
    fileSize: bigint | number
    createdAt: Date | string
  }

  export type MessageDeliveryStatusCreateManyMessageInput = {
    id: string
    status: string
    timestamp: Date | string
    remarks?: string | null
  }

  export type MessageAttachmentUpdateWithoutMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageAttachmentUncheckedUpdateWithoutMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageAttachmentUncheckedUpdateManyWithoutMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageDeliveryStatusUpdateWithoutMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MessageDeliveryStatusUncheckedUpdateWithoutMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MessageDeliveryStatusUncheckedUpdateManyWithoutMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NotificationDeliveryLogCreateManyNotificationInput = {
    id: string
    deliveryStatus: string
    providerResponse?: string | null
    attemptedAt: Date | string
  }

  export type NotificationDeliveryLogUpdateWithoutNotificationInput = {
    id?: StringFieldUpdateOperationsInput | string
    deliveryStatus?: StringFieldUpdateOperationsInput | string
    providerResponse?: NullableStringFieldUpdateOperationsInput | string | null
    attemptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationDeliveryLogUncheckedUpdateWithoutNotificationInput = {
    id?: StringFieldUpdateOperationsInput | string
    deliveryStatus?: StringFieldUpdateOperationsInput | string
    providerResponse?: NullableStringFieldUpdateOperationsInput | string | null
    attemptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationDeliveryLogUncheckedUpdateManyWithoutNotificationInput = {
    id?: StringFieldUpdateOperationsInput | string
    deliveryStatus?: StringFieldUpdateOperationsInput | string
    providerResponse?: NullableStringFieldUpdateOperationsInput | string | null
    attemptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ConversationCountOutputTypeDefaultArgs instead
     */
    export type ConversationCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ConversationCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MessageCountOutputTypeDefaultArgs instead
     */
    export type MessageCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MessageCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NotificationCountOutputTypeDefaultArgs instead
     */
    export type NotificationCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NotificationCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ConversationDefaultArgs instead
     */
    export type ConversationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ConversationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MessageDefaultArgs instead
     */
    export type MessageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MessageDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MessageAttachmentDefaultArgs instead
     */
    export type MessageAttachmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MessageAttachmentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MessageDeliveryStatusDefaultArgs instead
     */
    export type MessageDeliveryStatusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MessageDeliveryStatusDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WhatsappWebhookLogDefaultArgs instead
     */
    export type WhatsappWebhookLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WhatsappWebhookLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NotificationTemplateDefaultArgs instead
     */
    export type NotificationTemplateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NotificationTemplateDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UnreadMessageTrackingDefaultArgs instead
     */
    export type UnreadMessageTrackingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UnreadMessageTrackingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WebsocketSessionDefaultArgs instead
     */
    export type WebsocketSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WebsocketSessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TeamMeetingRoomDefaultArgs instead
     */
    export type TeamMeetingRoomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TeamMeetingRoomDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TeamMeetingMessageDefaultArgs instead
     */
    export type TeamMeetingMessageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TeamMeetingMessageDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WhatsappMessageTemplateDefaultArgs instead
     */
    export type WhatsappMessageTemplateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WhatsappMessageTemplateDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NotificationDefaultArgs instead
     */
    export type NotificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NotificationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NotificationDeliveryLogDefaultArgs instead
     */
    export type NotificationDeliveryLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NotificationDeliveryLogDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}