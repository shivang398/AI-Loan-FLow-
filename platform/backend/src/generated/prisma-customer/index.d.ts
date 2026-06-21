
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
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model CustomerKyc
 * 
 */
export type CustomerKyc = $Result.DefaultSelection<Prisma.$CustomerKycPayload>
/**
 * Model CustomerAddress
 * 
 */
export type CustomerAddress = $Result.DefaultSelection<Prisma.$CustomerAddressPayload>
/**
 * Model CustomerHistory
 * 
 */
export type CustomerHistory = $Result.DefaultSelection<Prisma.$CustomerHistoryPayload>
/**
 * Model Lead
 * 
 */
export type Lead = $Result.DefaultSelection<Prisma.$LeadPayload>
/**
 * Model Document
 * 
 */
export type Document = $Result.DefaultSelection<Prisma.$DocumentPayload>
/**
 * Model DocumentVersion
 * 
 */
export type DocumentVersion = $Result.DefaultSelection<Prisma.$DocumentVersionPayload>
/**
 * Model DocumentAccessLog
 * 
 */
export type DocumentAccessLog = $Result.DefaultSelection<Prisma.$DocumentAccessLogPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Customers
 * const customers = await prisma.customer.findMany()
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
   * // Fetch zero or more Customers
   * const customers = await prisma.customer.findMany()
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
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs>;

  /**
   * `prisma.customerKyc`: Exposes CRUD operations for the **CustomerKyc** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CustomerKycs
    * const customerKycs = await prisma.customerKyc.findMany()
    * ```
    */
  get customerKyc(): Prisma.CustomerKycDelegate<ExtArgs>;

  /**
   * `prisma.customerAddress`: Exposes CRUD operations for the **CustomerAddress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CustomerAddresses
    * const customerAddresses = await prisma.customerAddress.findMany()
    * ```
    */
  get customerAddress(): Prisma.CustomerAddressDelegate<ExtArgs>;

  /**
   * `prisma.customerHistory`: Exposes CRUD operations for the **CustomerHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CustomerHistories
    * const customerHistories = await prisma.customerHistory.findMany()
    * ```
    */
  get customerHistory(): Prisma.CustomerHistoryDelegate<ExtArgs>;

  /**
   * `prisma.lead`: Exposes CRUD operations for the **Lead** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Leads
    * const leads = await prisma.lead.findMany()
    * ```
    */
  get lead(): Prisma.LeadDelegate<ExtArgs>;

  /**
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.document.findMany()
    * ```
    */
  get document(): Prisma.DocumentDelegate<ExtArgs>;

  /**
   * `prisma.documentVersion`: Exposes CRUD operations for the **DocumentVersion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DocumentVersions
    * const documentVersions = await prisma.documentVersion.findMany()
    * ```
    */
  get documentVersion(): Prisma.DocumentVersionDelegate<ExtArgs>;

  /**
   * `prisma.documentAccessLog`: Exposes CRUD operations for the **DocumentAccessLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DocumentAccessLogs
    * const documentAccessLogs = await prisma.documentAccessLog.findMany()
    * ```
    */
  get documentAccessLog(): Prisma.DocumentAccessLogDelegate<ExtArgs>;
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
    Customer: 'Customer',
    CustomerKyc: 'CustomerKyc',
    CustomerAddress: 'CustomerAddress',
    CustomerHistory: 'CustomerHistory',
    Lead: 'Lead',
    Document: 'Document',
    DocumentVersion: 'DocumentVersion',
    DocumentAccessLog: 'DocumentAccessLog'
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
      modelProps: "customer" | "customerKyc" | "customerAddress" | "customerHistory" | "lead" | "document" | "documentVersion" | "documentAccessLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      CustomerKyc: {
        payload: Prisma.$CustomerKycPayload<ExtArgs>
        fields: Prisma.CustomerKycFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerKycFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerKycPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerKycFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerKycPayload>
          }
          findFirst: {
            args: Prisma.CustomerKycFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerKycPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerKycFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerKycPayload>
          }
          findMany: {
            args: Prisma.CustomerKycFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerKycPayload>[]
          }
          create: {
            args: Prisma.CustomerKycCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerKycPayload>
          }
          createMany: {
            args: Prisma.CustomerKycCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CustomerKycDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerKycPayload>
          }
          update: {
            args: Prisma.CustomerKycUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerKycPayload>
          }
          deleteMany: {
            args: Prisma.CustomerKycDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerKycUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CustomerKycUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerKycPayload>
          }
          aggregate: {
            args: Prisma.CustomerKycAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomerKyc>
          }
          groupBy: {
            args: Prisma.CustomerKycGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerKycGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerKycCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerKycCountAggregateOutputType> | number
          }
        }
      }
      CustomerAddress: {
        payload: Prisma.$CustomerAddressPayload<ExtArgs>
        fields: Prisma.CustomerAddressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerAddressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerAddressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerAddressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerAddressPayload>
          }
          findFirst: {
            args: Prisma.CustomerAddressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerAddressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerAddressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerAddressPayload>
          }
          findMany: {
            args: Prisma.CustomerAddressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerAddressPayload>[]
          }
          create: {
            args: Prisma.CustomerAddressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerAddressPayload>
          }
          createMany: {
            args: Prisma.CustomerAddressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CustomerAddressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerAddressPayload>
          }
          update: {
            args: Prisma.CustomerAddressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerAddressPayload>
          }
          deleteMany: {
            args: Prisma.CustomerAddressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerAddressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CustomerAddressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerAddressPayload>
          }
          aggregate: {
            args: Prisma.CustomerAddressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomerAddress>
          }
          groupBy: {
            args: Prisma.CustomerAddressGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerAddressGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerAddressCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerAddressCountAggregateOutputType> | number
          }
        }
      }
      CustomerHistory: {
        payload: Prisma.$CustomerHistoryPayload<ExtArgs>
        fields: Prisma.CustomerHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerHistoryPayload>
          }
          findFirst: {
            args: Prisma.CustomerHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerHistoryPayload>
          }
          findMany: {
            args: Prisma.CustomerHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerHistoryPayload>[]
          }
          create: {
            args: Prisma.CustomerHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerHistoryPayload>
          }
          createMany: {
            args: Prisma.CustomerHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CustomerHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerHistoryPayload>
          }
          update: {
            args: Prisma.CustomerHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerHistoryPayload>
          }
          deleteMany: {
            args: Prisma.CustomerHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CustomerHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerHistoryPayload>
          }
          aggregate: {
            args: Prisma.CustomerHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomerHistory>
          }
          groupBy: {
            args: Prisma.CustomerHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerHistoryCountAggregateOutputType> | number
          }
        }
      }
      Lead: {
        payload: Prisma.$LeadPayload<ExtArgs>
        fields: Prisma.LeadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findFirst: {
            args: Prisma.LeadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findMany: {
            args: Prisma.LeadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          create: {
            args: Prisma.LeadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          createMany: {
            args: Prisma.LeadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.LeadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          update: {
            args: Prisma.LeadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          deleteMany: {
            args: Prisma.LeadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LeadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          aggregate: {
            args: Prisma.LeadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLead>
          }
          groupBy: {
            args: Prisma.LeadGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeadGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeadCountArgs<ExtArgs>
            result: $Utils.Optional<LeadCountAggregateOutputType> | number
          }
        }
      }
      Document: {
        payload: Prisma.$DocumentPayload<ExtArgs>
        fields: Prisma.DocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findFirst: {
            args: Prisma.DocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findMany: {
            args: Prisma.DocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          create: {
            args: Prisma.DocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          createMany: {
            args: Prisma.DocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.DocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          update: {
            args: Prisma.DocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          deleteMany: {
            args: Prisma.DocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          aggregate: {
            args: Prisma.DocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument>
          }
          groupBy: {
            args: Prisma.DocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentCountAggregateOutputType> | number
          }
        }
      }
      DocumentVersion: {
        payload: Prisma.$DocumentVersionPayload<ExtArgs>
        fields: Prisma.DocumentVersionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentVersionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentVersionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentVersionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentVersionPayload>
          }
          findFirst: {
            args: Prisma.DocumentVersionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentVersionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentVersionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentVersionPayload>
          }
          findMany: {
            args: Prisma.DocumentVersionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentVersionPayload>[]
          }
          create: {
            args: Prisma.DocumentVersionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentVersionPayload>
          }
          createMany: {
            args: Prisma.DocumentVersionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.DocumentVersionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentVersionPayload>
          }
          update: {
            args: Prisma.DocumentVersionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentVersionPayload>
          }
          deleteMany: {
            args: Prisma.DocumentVersionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentVersionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DocumentVersionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentVersionPayload>
          }
          aggregate: {
            args: Prisma.DocumentVersionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocumentVersion>
          }
          groupBy: {
            args: Prisma.DocumentVersionGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentVersionGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentVersionCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentVersionCountAggregateOutputType> | number
          }
        }
      }
      DocumentAccessLog: {
        payload: Prisma.$DocumentAccessLogPayload<ExtArgs>
        fields: Prisma.DocumentAccessLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentAccessLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentAccessLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentAccessLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentAccessLogPayload>
          }
          findFirst: {
            args: Prisma.DocumentAccessLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentAccessLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentAccessLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentAccessLogPayload>
          }
          findMany: {
            args: Prisma.DocumentAccessLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentAccessLogPayload>[]
          }
          create: {
            args: Prisma.DocumentAccessLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentAccessLogPayload>
          }
          createMany: {
            args: Prisma.DocumentAccessLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.DocumentAccessLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentAccessLogPayload>
          }
          update: {
            args: Prisma.DocumentAccessLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentAccessLogPayload>
          }
          deleteMany: {
            args: Prisma.DocumentAccessLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentAccessLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DocumentAccessLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentAccessLogPayload>
          }
          aggregate: {
            args: Prisma.DocumentAccessLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocumentAccessLog>
          }
          groupBy: {
            args: Prisma.DocumentAccessLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentAccessLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentAccessLogCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentAccessLogCountAggregateOutputType> | number
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
   * Count Type CustomerCountOutputType
   */

  export type CustomerCountOutputType = {
    addresses: number
    history: number
    leads: number
  }

  export type CustomerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    addresses?: boolean | CustomerCountOutputTypeCountAddressesArgs
    history?: boolean | CustomerCountOutputTypeCountHistoryArgs
    leads?: boolean | CustomerCountOutputTypeCountLeadsArgs
  }

  // Custom InputTypes
  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerCountOutputType
     */
    select?: CustomerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountAddressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerAddressWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerHistoryWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountLeadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
  }


  /**
   * Count Type DocumentCountOutputType
   */

  export type DocumentCountOutputType = {
    versions: number
    accessLogs: number
  }

  export type DocumentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    versions?: boolean | DocumentCountOutputTypeCountVersionsArgs
    accessLogs?: boolean | DocumentCountOutputTypeCountAccessLogsArgs
  }

  // Custom InputTypes
  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentCountOutputType
     */
    select?: DocumentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountVersionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentVersionWhereInput
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountAccessLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentAccessLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    mobile: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    mobile: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    email: number
    mobile: number
    createdAt: number
    updatedAt: number
    createdBy: number
    updatedBy: number
    _all: number
  }


  export type CustomerMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    mobile?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    mobile?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    mobile?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: string
    firstName: string
    lastName: string
    email: string
    mobile: string
    createdAt: Date
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    mobile?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    kyc?: boolean | Customer$kycArgs<ExtArgs>
    addresses?: boolean | Customer$addressesArgs<ExtArgs>
    history?: boolean | Customer$historyArgs<ExtArgs>
    leads?: boolean | Customer$leadsArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>


  export type CustomerSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    mobile?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
  }

  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kyc?: boolean | Customer$kycArgs<ExtArgs>
    addresses?: boolean | Customer$addressesArgs<ExtArgs>
    history?: boolean | Customer$historyArgs<ExtArgs>
    leads?: boolean | Customer$leadsArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      kyc: Prisma.$CustomerKycPayload<ExtArgs> | null
      addresses: Prisma.$CustomerAddressPayload<ExtArgs>[]
      history: Prisma.$CustomerHistoryPayload<ExtArgs>[]
      leads: Prisma.$LeadPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      lastName: string
      email: string
      mobile: string
      createdAt: Date
      updatedAt: Date | null
      createdBy: string | null
      updatedBy: string | null
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
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
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    kyc<T extends Customer$kycArgs<ExtArgs> = {}>(args?: Subset<T, Customer$kycArgs<ExtArgs>>): Prisma__CustomerKycClient<$Result.GetResult<Prisma.$CustomerKycPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    addresses<T extends Customer$addressesArgs<ExtArgs> = {}>(args?: Subset<T, Customer$addressesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerAddressPayload<ExtArgs>, T, "findMany"> | Null>
    history<T extends Customer$historyArgs<ExtArgs> = {}>(args?: Subset<T, Customer$historyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerHistoryPayload<ExtArgs>, T, "findMany"> | Null>
    leads<T extends Customer$leadsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$leadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Customer model
   */ 
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'String'>
    readonly firstName: FieldRef<"Customer", 'String'>
    readonly lastName: FieldRef<"Customer", 'String'>
    readonly email: FieldRef<"Customer", 'String'>
    readonly mobile: FieldRef<"Customer", 'String'>
    readonly createdAt: FieldRef<"Customer", 'DateTime'>
    readonly updatedAt: FieldRef<"Customer", 'DateTime'>
    readonly createdBy: FieldRef<"Customer", 'String'>
    readonly updatedBy: FieldRef<"Customer", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
  }

  /**
   * Customer.kyc
   */
  export type Customer$kycArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerKyc
     */
    select?: CustomerKycSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerKycInclude<ExtArgs> | null
    where?: CustomerKycWhereInput
  }

  /**
   * Customer.addresses
   */
  export type Customer$addressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerAddress
     */
    select?: CustomerAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerAddressInclude<ExtArgs> | null
    where?: CustomerAddressWhereInput
    orderBy?: CustomerAddressOrderByWithRelationInput | CustomerAddressOrderByWithRelationInput[]
    cursor?: CustomerAddressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CustomerAddressScalarFieldEnum | CustomerAddressScalarFieldEnum[]
  }

  /**
   * Customer.history
   */
  export type Customer$historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerHistory
     */
    select?: CustomerHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerHistoryInclude<ExtArgs> | null
    where?: CustomerHistoryWhereInput
    orderBy?: CustomerHistoryOrderByWithRelationInput | CustomerHistoryOrderByWithRelationInput[]
    cursor?: CustomerHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CustomerHistoryScalarFieldEnum | CustomerHistoryScalarFieldEnum[]
  }

  /**
   * Customer.leads
   */
  export type Customer$leadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    cursor?: LeadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
  }


  /**
   * Model CustomerKyc
   */

  export type AggregateCustomerKyc = {
    _count: CustomerKycCountAggregateOutputType | null
    _min: CustomerKycMinAggregateOutputType | null
    _max: CustomerKycMaxAggregateOutputType | null
  }

  export type CustomerKycMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    panNumber: string | null
    aadhaarNumber: string | null
    kycStatus: string | null
    verifiedAt: Date | null
  }

  export type CustomerKycMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    panNumber: string | null
    aadhaarNumber: string | null
    kycStatus: string | null
    verifiedAt: Date | null
  }

  export type CustomerKycCountAggregateOutputType = {
    id: number
    customerId: number
    panNumber: number
    aadhaarNumber: number
    kycStatus: number
    verifiedAt: number
    _all: number
  }


  export type CustomerKycMinAggregateInputType = {
    id?: true
    customerId?: true
    panNumber?: true
    aadhaarNumber?: true
    kycStatus?: true
    verifiedAt?: true
  }

  export type CustomerKycMaxAggregateInputType = {
    id?: true
    customerId?: true
    panNumber?: true
    aadhaarNumber?: true
    kycStatus?: true
    verifiedAt?: true
  }

  export type CustomerKycCountAggregateInputType = {
    id?: true
    customerId?: true
    panNumber?: true
    aadhaarNumber?: true
    kycStatus?: true
    verifiedAt?: true
    _all?: true
  }

  export type CustomerKycAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerKyc to aggregate.
     */
    where?: CustomerKycWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerKycs to fetch.
     */
    orderBy?: CustomerKycOrderByWithRelationInput | CustomerKycOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerKycWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerKycs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerKycs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CustomerKycs
    **/
    _count?: true | CustomerKycCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerKycMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerKycMaxAggregateInputType
  }

  export type GetCustomerKycAggregateType<T extends CustomerKycAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomerKyc]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomerKyc[P]>
      : GetScalarType<T[P], AggregateCustomerKyc[P]>
  }




  export type CustomerKycGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerKycWhereInput
    orderBy?: CustomerKycOrderByWithAggregationInput | CustomerKycOrderByWithAggregationInput[]
    by: CustomerKycScalarFieldEnum[] | CustomerKycScalarFieldEnum
    having?: CustomerKycScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerKycCountAggregateInputType | true
    _min?: CustomerKycMinAggregateInputType
    _max?: CustomerKycMaxAggregateInputType
  }

  export type CustomerKycGroupByOutputType = {
    id: string
    customerId: string | null
    panNumber: string
    aadhaarNumber: string | null
    kycStatus: string
    verifiedAt: Date | null
    _count: CustomerKycCountAggregateOutputType | null
    _min: CustomerKycMinAggregateOutputType | null
    _max: CustomerKycMaxAggregateOutputType | null
  }

  type GetCustomerKycGroupByPayload<T extends CustomerKycGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerKycGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerKycGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerKycGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerKycGroupByOutputType[P]>
        }
      >
    >


  export type CustomerKycSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    panNumber?: boolean
    aadhaarNumber?: boolean
    kycStatus?: boolean
    verifiedAt?: boolean
    customer?: boolean | CustomerKyc$customerArgs<ExtArgs>
  }, ExtArgs["result"]["customerKyc"]>


  export type CustomerKycSelectScalar = {
    id?: boolean
    customerId?: boolean
    panNumber?: boolean
    aadhaarNumber?: boolean
    kycStatus?: boolean
    verifiedAt?: boolean
  }

  export type CustomerKycInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerKyc$customerArgs<ExtArgs>
  }

  export type $CustomerKycPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CustomerKyc"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string | null
      panNumber: string
      aadhaarNumber: string | null
      kycStatus: string
      verifiedAt: Date | null
    }, ExtArgs["result"]["customerKyc"]>
    composites: {}
  }

  type CustomerKycGetPayload<S extends boolean | null | undefined | CustomerKycDefaultArgs> = $Result.GetResult<Prisma.$CustomerKycPayload, S>

  type CustomerKycCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CustomerKycFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CustomerKycCountAggregateInputType | true
    }

  export interface CustomerKycDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CustomerKyc'], meta: { name: 'CustomerKyc' } }
    /**
     * Find zero or one CustomerKyc that matches the filter.
     * @param {CustomerKycFindUniqueArgs} args - Arguments to find a CustomerKyc
     * @example
     * // Get one CustomerKyc
     * const customerKyc = await prisma.customerKyc.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerKycFindUniqueArgs>(args: SelectSubset<T, CustomerKycFindUniqueArgs<ExtArgs>>): Prisma__CustomerKycClient<$Result.GetResult<Prisma.$CustomerKycPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CustomerKyc that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CustomerKycFindUniqueOrThrowArgs} args - Arguments to find a CustomerKyc
     * @example
     * // Get one CustomerKyc
     * const customerKyc = await prisma.customerKyc.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerKycFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerKycFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerKycClient<$Result.GetResult<Prisma.$CustomerKycPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CustomerKyc that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerKycFindFirstArgs} args - Arguments to find a CustomerKyc
     * @example
     * // Get one CustomerKyc
     * const customerKyc = await prisma.customerKyc.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerKycFindFirstArgs>(args?: SelectSubset<T, CustomerKycFindFirstArgs<ExtArgs>>): Prisma__CustomerKycClient<$Result.GetResult<Prisma.$CustomerKycPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CustomerKyc that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerKycFindFirstOrThrowArgs} args - Arguments to find a CustomerKyc
     * @example
     * // Get one CustomerKyc
     * const customerKyc = await prisma.customerKyc.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerKycFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerKycFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerKycClient<$Result.GetResult<Prisma.$CustomerKycPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CustomerKycs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerKycFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CustomerKycs
     * const customerKycs = await prisma.customerKyc.findMany()
     * 
     * // Get first 10 CustomerKycs
     * const customerKycs = await prisma.customerKyc.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerKycWithIdOnly = await prisma.customerKyc.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerKycFindManyArgs>(args?: SelectSubset<T, CustomerKycFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerKycPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CustomerKyc.
     * @param {CustomerKycCreateArgs} args - Arguments to create a CustomerKyc.
     * @example
     * // Create one CustomerKyc
     * const CustomerKyc = await prisma.customerKyc.create({
     *   data: {
     *     // ... data to create a CustomerKyc
     *   }
     * })
     * 
     */
    create<T extends CustomerKycCreateArgs>(args: SelectSubset<T, CustomerKycCreateArgs<ExtArgs>>): Prisma__CustomerKycClient<$Result.GetResult<Prisma.$CustomerKycPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CustomerKycs.
     * @param {CustomerKycCreateManyArgs} args - Arguments to create many CustomerKycs.
     * @example
     * // Create many CustomerKycs
     * const customerKyc = await prisma.customerKyc.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerKycCreateManyArgs>(args?: SelectSubset<T, CustomerKycCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CustomerKyc.
     * @param {CustomerKycDeleteArgs} args - Arguments to delete one CustomerKyc.
     * @example
     * // Delete one CustomerKyc
     * const CustomerKyc = await prisma.customerKyc.delete({
     *   where: {
     *     // ... filter to delete one CustomerKyc
     *   }
     * })
     * 
     */
    delete<T extends CustomerKycDeleteArgs>(args: SelectSubset<T, CustomerKycDeleteArgs<ExtArgs>>): Prisma__CustomerKycClient<$Result.GetResult<Prisma.$CustomerKycPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CustomerKyc.
     * @param {CustomerKycUpdateArgs} args - Arguments to update one CustomerKyc.
     * @example
     * // Update one CustomerKyc
     * const customerKyc = await prisma.customerKyc.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerKycUpdateArgs>(args: SelectSubset<T, CustomerKycUpdateArgs<ExtArgs>>): Prisma__CustomerKycClient<$Result.GetResult<Prisma.$CustomerKycPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CustomerKycs.
     * @param {CustomerKycDeleteManyArgs} args - Arguments to filter CustomerKycs to delete.
     * @example
     * // Delete a few CustomerKycs
     * const { count } = await prisma.customerKyc.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerKycDeleteManyArgs>(args?: SelectSubset<T, CustomerKycDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomerKycs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerKycUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CustomerKycs
     * const customerKyc = await prisma.customerKyc.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerKycUpdateManyArgs>(args: SelectSubset<T, CustomerKycUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CustomerKyc.
     * @param {CustomerKycUpsertArgs} args - Arguments to update or create a CustomerKyc.
     * @example
     * // Update or create a CustomerKyc
     * const customerKyc = await prisma.customerKyc.upsert({
     *   create: {
     *     // ... data to create a CustomerKyc
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CustomerKyc we want to update
     *   }
     * })
     */
    upsert<T extends CustomerKycUpsertArgs>(args: SelectSubset<T, CustomerKycUpsertArgs<ExtArgs>>): Prisma__CustomerKycClient<$Result.GetResult<Prisma.$CustomerKycPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CustomerKycs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerKycCountArgs} args - Arguments to filter CustomerKycs to count.
     * @example
     * // Count the number of CustomerKycs
     * const count = await prisma.customerKyc.count({
     *   where: {
     *     // ... the filter for the CustomerKycs we want to count
     *   }
     * })
    **/
    count<T extends CustomerKycCountArgs>(
      args?: Subset<T, CustomerKycCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerKycCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CustomerKyc.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerKycAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CustomerKycAggregateArgs>(args: Subset<T, CustomerKycAggregateArgs>): Prisma.PrismaPromise<GetCustomerKycAggregateType<T>>

    /**
     * Group by CustomerKyc.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerKycGroupByArgs} args - Group by arguments.
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
      T extends CustomerKycGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerKycGroupByArgs['orderBy'] }
        : { orderBy?: CustomerKycGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CustomerKycGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerKycGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CustomerKyc model
   */
  readonly fields: CustomerKycFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CustomerKyc.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerKycClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerKyc$customerArgs<ExtArgs> = {}>(args?: Subset<T, CustomerKyc$customerArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the CustomerKyc model
   */ 
  interface CustomerKycFieldRefs {
    readonly id: FieldRef<"CustomerKyc", 'String'>
    readonly customerId: FieldRef<"CustomerKyc", 'String'>
    readonly panNumber: FieldRef<"CustomerKyc", 'String'>
    readonly aadhaarNumber: FieldRef<"CustomerKyc", 'String'>
    readonly kycStatus: FieldRef<"CustomerKyc", 'String'>
    readonly verifiedAt: FieldRef<"CustomerKyc", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CustomerKyc findUnique
   */
  export type CustomerKycFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerKyc
     */
    select?: CustomerKycSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerKycInclude<ExtArgs> | null
    /**
     * Filter, which CustomerKyc to fetch.
     */
    where: CustomerKycWhereUniqueInput
  }

  /**
   * CustomerKyc findUniqueOrThrow
   */
  export type CustomerKycFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerKyc
     */
    select?: CustomerKycSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerKycInclude<ExtArgs> | null
    /**
     * Filter, which CustomerKyc to fetch.
     */
    where: CustomerKycWhereUniqueInput
  }

  /**
   * CustomerKyc findFirst
   */
  export type CustomerKycFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerKyc
     */
    select?: CustomerKycSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerKycInclude<ExtArgs> | null
    /**
     * Filter, which CustomerKyc to fetch.
     */
    where?: CustomerKycWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerKycs to fetch.
     */
    orderBy?: CustomerKycOrderByWithRelationInput | CustomerKycOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerKycs.
     */
    cursor?: CustomerKycWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerKycs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerKycs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerKycs.
     */
    distinct?: CustomerKycScalarFieldEnum | CustomerKycScalarFieldEnum[]
  }

  /**
   * CustomerKyc findFirstOrThrow
   */
  export type CustomerKycFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerKyc
     */
    select?: CustomerKycSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerKycInclude<ExtArgs> | null
    /**
     * Filter, which CustomerKyc to fetch.
     */
    where?: CustomerKycWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerKycs to fetch.
     */
    orderBy?: CustomerKycOrderByWithRelationInput | CustomerKycOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerKycs.
     */
    cursor?: CustomerKycWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerKycs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerKycs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerKycs.
     */
    distinct?: CustomerKycScalarFieldEnum | CustomerKycScalarFieldEnum[]
  }

  /**
   * CustomerKyc findMany
   */
  export type CustomerKycFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerKyc
     */
    select?: CustomerKycSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerKycInclude<ExtArgs> | null
    /**
     * Filter, which CustomerKycs to fetch.
     */
    where?: CustomerKycWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerKycs to fetch.
     */
    orderBy?: CustomerKycOrderByWithRelationInput | CustomerKycOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CustomerKycs.
     */
    cursor?: CustomerKycWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerKycs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerKycs.
     */
    skip?: number
    distinct?: CustomerKycScalarFieldEnum | CustomerKycScalarFieldEnum[]
  }

  /**
   * CustomerKyc create
   */
  export type CustomerKycCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerKyc
     */
    select?: CustomerKycSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerKycInclude<ExtArgs> | null
    /**
     * The data needed to create a CustomerKyc.
     */
    data: XOR<CustomerKycCreateInput, CustomerKycUncheckedCreateInput>
  }

  /**
   * CustomerKyc createMany
   */
  export type CustomerKycCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CustomerKycs.
     */
    data: CustomerKycCreateManyInput | CustomerKycCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CustomerKyc update
   */
  export type CustomerKycUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerKyc
     */
    select?: CustomerKycSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerKycInclude<ExtArgs> | null
    /**
     * The data needed to update a CustomerKyc.
     */
    data: XOR<CustomerKycUpdateInput, CustomerKycUncheckedUpdateInput>
    /**
     * Choose, which CustomerKyc to update.
     */
    where: CustomerKycWhereUniqueInput
  }

  /**
   * CustomerKyc updateMany
   */
  export type CustomerKycUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CustomerKycs.
     */
    data: XOR<CustomerKycUpdateManyMutationInput, CustomerKycUncheckedUpdateManyInput>
    /**
     * Filter which CustomerKycs to update
     */
    where?: CustomerKycWhereInput
  }

  /**
   * CustomerKyc upsert
   */
  export type CustomerKycUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerKyc
     */
    select?: CustomerKycSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerKycInclude<ExtArgs> | null
    /**
     * The filter to search for the CustomerKyc to update in case it exists.
     */
    where: CustomerKycWhereUniqueInput
    /**
     * In case the CustomerKyc found by the `where` argument doesn't exist, create a new CustomerKyc with this data.
     */
    create: XOR<CustomerKycCreateInput, CustomerKycUncheckedCreateInput>
    /**
     * In case the CustomerKyc was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerKycUpdateInput, CustomerKycUncheckedUpdateInput>
  }

  /**
   * CustomerKyc delete
   */
  export type CustomerKycDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerKyc
     */
    select?: CustomerKycSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerKycInclude<ExtArgs> | null
    /**
     * Filter which CustomerKyc to delete.
     */
    where: CustomerKycWhereUniqueInput
  }

  /**
   * CustomerKyc deleteMany
   */
  export type CustomerKycDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerKycs to delete
     */
    where?: CustomerKycWhereInput
  }

  /**
   * CustomerKyc.customer
   */
  export type CustomerKyc$customerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
  }

  /**
   * CustomerKyc without action
   */
  export type CustomerKycDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerKyc
     */
    select?: CustomerKycSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerKycInclude<ExtArgs> | null
  }


  /**
   * Model CustomerAddress
   */

  export type AggregateCustomerAddress = {
    _count: CustomerAddressCountAggregateOutputType | null
    _min: CustomerAddressMinAggregateOutputType | null
    _max: CustomerAddressMaxAggregateOutputType | null
  }

  export type CustomerAddressMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    addressType: string | null
    street: string | null
    city: string | null
    state: string | null
    pincode: string | null
    isPrimary: boolean | null
  }

  export type CustomerAddressMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    addressType: string | null
    street: string | null
    city: string | null
    state: string | null
    pincode: string | null
    isPrimary: boolean | null
  }

  export type CustomerAddressCountAggregateOutputType = {
    id: number
    customerId: number
    addressType: number
    street: number
    city: number
    state: number
    pincode: number
    isPrimary: number
    _all: number
  }


  export type CustomerAddressMinAggregateInputType = {
    id?: true
    customerId?: true
    addressType?: true
    street?: true
    city?: true
    state?: true
    pincode?: true
    isPrimary?: true
  }

  export type CustomerAddressMaxAggregateInputType = {
    id?: true
    customerId?: true
    addressType?: true
    street?: true
    city?: true
    state?: true
    pincode?: true
    isPrimary?: true
  }

  export type CustomerAddressCountAggregateInputType = {
    id?: true
    customerId?: true
    addressType?: true
    street?: true
    city?: true
    state?: true
    pincode?: true
    isPrimary?: true
    _all?: true
  }

  export type CustomerAddressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerAddress to aggregate.
     */
    where?: CustomerAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerAddresses to fetch.
     */
    orderBy?: CustomerAddressOrderByWithRelationInput | CustomerAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerAddresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CustomerAddresses
    **/
    _count?: true | CustomerAddressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerAddressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerAddressMaxAggregateInputType
  }

  export type GetCustomerAddressAggregateType<T extends CustomerAddressAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomerAddress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomerAddress[P]>
      : GetScalarType<T[P], AggregateCustomerAddress[P]>
  }




  export type CustomerAddressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerAddressWhereInput
    orderBy?: CustomerAddressOrderByWithAggregationInput | CustomerAddressOrderByWithAggregationInput[]
    by: CustomerAddressScalarFieldEnum[] | CustomerAddressScalarFieldEnum
    having?: CustomerAddressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerAddressCountAggregateInputType | true
    _min?: CustomerAddressMinAggregateInputType
    _max?: CustomerAddressMaxAggregateInputType
  }

  export type CustomerAddressGroupByOutputType = {
    id: string
    customerId: string | null
    addressType: string
    street: string
    city: string
    state: string
    pincode: string
    isPrimary: boolean
    _count: CustomerAddressCountAggregateOutputType | null
    _min: CustomerAddressMinAggregateOutputType | null
    _max: CustomerAddressMaxAggregateOutputType | null
  }

  type GetCustomerAddressGroupByPayload<T extends CustomerAddressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerAddressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerAddressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerAddressGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerAddressGroupByOutputType[P]>
        }
      >
    >


  export type CustomerAddressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    addressType?: boolean
    street?: boolean
    city?: boolean
    state?: boolean
    pincode?: boolean
    isPrimary?: boolean
    customer?: boolean | CustomerAddress$customerArgs<ExtArgs>
  }, ExtArgs["result"]["customerAddress"]>


  export type CustomerAddressSelectScalar = {
    id?: boolean
    customerId?: boolean
    addressType?: boolean
    street?: boolean
    city?: boolean
    state?: boolean
    pincode?: boolean
    isPrimary?: boolean
  }

  export type CustomerAddressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerAddress$customerArgs<ExtArgs>
  }

  export type $CustomerAddressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CustomerAddress"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string | null
      addressType: string
      street: string
      city: string
      state: string
      pincode: string
      isPrimary: boolean
    }, ExtArgs["result"]["customerAddress"]>
    composites: {}
  }

  type CustomerAddressGetPayload<S extends boolean | null | undefined | CustomerAddressDefaultArgs> = $Result.GetResult<Prisma.$CustomerAddressPayload, S>

  type CustomerAddressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CustomerAddressFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CustomerAddressCountAggregateInputType | true
    }

  export interface CustomerAddressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CustomerAddress'], meta: { name: 'CustomerAddress' } }
    /**
     * Find zero or one CustomerAddress that matches the filter.
     * @param {CustomerAddressFindUniqueArgs} args - Arguments to find a CustomerAddress
     * @example
     * // Get one CustomerAddress
     * const customerAddress = await prisma.customerAddress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerAddressFindUniqueArgs>(args: SelectSubset<T, CustomerAddressFindUniqueArgs<ExtArgs>>): Prisma__CustomerAddressClient<$Result.GetResult<Prisma.$CustomerAddressPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CustomerAddress that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CustomerAddressFindUniqueOrThrowArgs} args - Arguments to find a CustomerAddress
     * @example
     * // Get one CustomerAddress
     * const customerAddress = await prisma.customerAddress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerAddressFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerAddressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerAddressClient<$Result.GetResult<Prisma.$CustomerAddressPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CustomerAddress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAddressFindFirstArgs} args - Arguments to find a CustomerAddress
     * @example
     * // Get one CustomerAddress
     * const customerAddress = await prisma.customerAddress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerAddressFindFirstArgs>(args?: SelectSubset<T, CustomerAddressFindFirstArgs<ExtArgs>>): Prisma__CustomerAddressClient<$Result.GetResult<Prisma.$CustomerAddressPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CustomerAddress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAddressFindFirstOrThrowArgs} args - Arguments to find a CustomerAddress
     * @example
     * // Get one CustomerAddress
     * const customerAddress = await prisma.customerAddress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerAddressFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerAddressFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerAddressClient<$Result.GetResult<Prisma.$CustomerAddressPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CustomerAddresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAddressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CustomerAddresses
     * const customerAddresses = await prisma.customerAddress.findMany()
     * 
     * // Get first 10 CustomerAddresses
     * const customerAddresses = await prisma.customerAddress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerAddressWithIdOnly = await prisma.customerAddress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerAddressFindManyArgs>(args?: SelectSubset<T, CustomerAddressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerAddressPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CustomerAddress.
     * @param {CustomerAddressCreateArgs} args - Arguments to create a CustomerAddress.
     * @example
     * // Create one CustomerAddress
     * const CustomerAddress = await prisma.customerAddress.create({
     *   data: {
     *     // ... data to create a CustomerAddress
     *   }
     * })
     * 
     */
    create<T extends CustomerAddressCreateArgs>(args: SelectSubset<T, CustomerAddressCreateArgs<ExtArgs>>): Prisma__CustomerAddressClient<$Result.GetResult<Prisma.$CustomerAddressPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CustomerAddresses.
     * @param {CustomerAddressCreateManyArgs} args - Arguments to create many CustomerAddresses.
     * @example
     * // Create many CustomerAddresses
     * const customerAddress = await prisma.customerAddress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerAddressCreateManyArgs>(args?: SelectSubset<T, CustomerAddressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CustomerAddress.
     * @param {CustomerAddressDeleteArgs} args - Arguments to delete one CustomerAddress.
     * @example
     * // Delete one CustomerAddress
     * const CustomerAddress = await prisma.customerAddress.delete({
     *   where: {
     *     // ... filter to delete one CustomerAddress
     *   }
     * })
     * 
     */
    delete<T extends CustomerAddressDeleteArgs>(args: SelectSubset<T, CustomerAddressDeleteArgs<ExtArgs>>): Prisma__CustomerAddressClient<$Result.GetResult<Prisma.$CustomerAddressPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CustomerAddress.
     * @param {CustomerAddressUpdateArgs} args - Arguments to update one CustomerAddress.
     * @example
     * // Update one CustomerAddress
     * const customerAddress = await prisma.customerAddress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerAddressUpdateArgs>(args: SelectSubset<T, CustomerAddressUpdateArgs<ExtArgs>>): Prisma__CustomerAddressClient<$Result.GetResult<Prisma.$CustomerAddressPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CustomerAddresses.
     * @param {CustomerAddressDeleteManyArgs} args - Arguments to filter CustomerAddresses to delete.
     * @example
     * // Delete a few CustomerAddresses
     * const { count } = await prisma.customerAddress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerAddressDeleteManyArgs>(args?: SelectSubset<T, CustomerAddressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomerAddresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAddressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CustomerAddresses
     * const customerAddress = await prisma.customerAddress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerAddressUpdateManyArgs>(args: SelectSubset<T, CustomerAddressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CustomerAddress.
     * @param {CustomerAddressUpsertArgs} args - Arguments to update or create a CustomerAddress.
     * @example
     * // Update or create a CustomerAddress
     * const customerAddress = await prisma.customerAddress.upsert({
     *   create: {
     *     // ... data to create a CustomerAddress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CustomerAddress we want to update
     *   }
     * })
     */
    upsert<T extends CustomerAddressUpsertArgs>(args: SelectSubset<T, CustomerAddressUpsertArgs<ExtArgs>>): Prisma__CustomerAddressClient<$Result.GetResult<Prisma.$CustomerAddressPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CustomerAddresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAddressCountArgs} args - Arguments to filter CustomerAddresses to count.
     * @example
     * // Count the number of CustomerAddresses
     * const count = await prisma.customerAddress.count({
     *   where: {
     *     // ... the filter for the CustomerAddresses we want to count
     *   }
     * })
    **/
    count<T extends CustomerAddressCountArgs>(
      args?: Subset<T, CustomerAddressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerAddressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CustomerAddress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAddressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CustomerAddressAggregateArgs>(args: Subset<T, CustomerAddressAggregateArgs>): Prisma.PrismaPromise<GetCustomerAddressAggregateType<T>>

    /**
     * Group by CustomerAddress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAddressGroupByArgs} args - Group by arguments.
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
      T extends CustomerAddressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerAddressGroupByArgs['orderBy'] }
        : { orderBy?: CustomerAddressGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CustomerAddressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerAddressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CustomerAddress model
   */
  readonly fields: CustomerAddressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CustomerAddress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerAddressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerAddress$customerArgs<ExtArgs> = {}>(args?: Subset<T, CustomerAddress$customerArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the CustomerAddress model
   */ 
  interface CustomerAddressFieldRefs {
    readonly id: FieldRef<"CustomerAddress", 'String'>
    readonly customerId: FieldRef<"CustomerAddress", 'String'>
    readonly addressType: FieldRef<"CustomerAddress", 'String'>
    readonly street: FieldRef<"CustomerAddress", 'String'>
    readonly city: FieldRef<"CustomerAddress", 'String'>
    readonly state: FieldRef<"CustomerAddress", 'String'>
    readonly pincode: FieldRef<"CustomerAddress", 'String'>
    readonly isPrimary: FieldRef<"CustomerAddress", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * CustomerAddress findUnique
   */
  export type CustomerAddressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerAddress
     */
    select?: CustomerAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerAddressInclude<ExtArgs> | null
    /**
     * Filter, which CustomerAddress to fetch.
     */
    where: CustomerAddressWhereUniqueInput
  }

  /**
   * CustomerAddress findUniqueOrThrow
   */
  export type CustomerAddressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerAddress
     */
    select?: CustomerAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerAddressInclude<ExtArgs> | null
    /**
     * Filter, which CustomerAddress to fetch.
     */
    where: CustomerAddressWhereUniqueInput
  }

  /**
   * CustomerAddress findFirst
   */
  export type CustomerAddressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerAddress
     */
    select?: CustomerAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerAddressInclude<ExtArgs> | null
    /**
     * Filter, which CustomerAddress to fetch.
     */
    where?: CustomerAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerAddresses to fetch.
     */
    orderBy?: CustomerAddressOrderByWithRelationInput | CustomerAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerAddresses.
     */
    cursor?: CustomerAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerAddresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerAddresses.
     */
    distinct?: CustomerAddressScalarFieldEnum | CustomerAddressScalarFieldEnum[]
  }

  /**
   * CustomerAddress findFirstOrThrow
   */
  export type CustomerAddressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerAddress
     */
    select?: CustomerAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerAddressInclude<ExtArgs> | null
    /**
     * Filter, which CustomerAddress to fetch.
     */
    where?: CustomerAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerAddresses to fetch.
     */
    orderBy?: CustomerAddressOrderByWithRelationInput | CustomerAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerAddresses.
     */
    cursor?: CustomerAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerAddresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerAddresses.
     */
    distinct?: CustomerAddressScalarFieldEnum | CustomerAddressScalarFieldEnum[]
  }

  /**
   * CustomerAddress findMany
   */
  export type CustomerAddressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerAddress
     */
    select?: CustomerAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerAddressInclude<ExtArgs> | null
    /**
     * Filter, which CustomerAddresses to fetch.
     */
    where?: CustomerAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerAddresses to fetch.
     */
    orderBy?: CustomerAddressOrderByWithRelationInput | CustomerAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CustomerAddresses.
     */
    cursor?: CustomerAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerAddresses.
     */
    skip?: number
    distinct?: CustomerAddressScalarFieldEnum | CustomerAddressScalarFieldEnum[]
  }

  /**
   * CustomerAddress create
   */
  export type CustomerAddressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerAddress
     */
    select?: CustomerAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerAddressInclude<ExtArgs> | null
    /**
     * The data needed to create a CustomerAddress.
     */
    data: XOR<CustomerAddressCreateInput, CustomerAddressUncheckedCreateInput>
  }

  /**
   * CustomerAddress createMany
   */
  export type CustomerAddressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CustomerAddresses.
     */
    data: CustomerAddressCreateManyInput | CustomerAddressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CustomerAddress update
   */
  export type CustomerAddressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerAddress
     */
    select?: CustomerAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerAddressInclude<ExtArgs> | null
    /**
     * The data needed to update a CustomerAddress.
     */
    data: XOR<CustomerAddressUpdateInput, CustomerAddressUncheckedUpdateInput>
    /**
     * Choose, which CustomerAddress to update.
     */
    where: CustomerAddressWhereUniqueInput
  }

  /**
   * CustomerAddress updateMany
   */
  export type CustomerAddressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CustomerAddresses.
     */
    data: XOR<CustomerAddressUpdateManyMutationInput, CustomerAddressUncheckedUpdateManyInput>
    /**
     * Filter which CustomerAddresses to update
     */
    where?: CustomerAddressWhereInput
  }

  /**
   * CustomerAddress upsert
   */
  export type CustomerAddressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerAddress
     */
    select?: CustomerAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerAddressInclude<ExtArgs> | null
    /**
     * The filter to search for the CustomerAddress to update in case it exists.
     */
    where: CustomerAddressWhereUniqueInput
    /**
     * In case the CustomerAddress found by the `where` argument doesn't exist, create a new CustomerAddress with this data.
     */
    create: XOR<CustomerAddressCreateInput, CustomerAddressUncheckedCreateInput>
    /**
     * In case the CustomerAddress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerAddressUpdateInput, CustomerAddressUncheckedUpdateInput>
  }

  /**
   * CustomerAddress delete
   */
  export type CustomerAddressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerAddress
     */
    select?: CustomerAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerAddressInclude<ExtArgs> | null
    /**
     * Filter which CustomerAddress to delete.
     */
    where: CustomerAddressWhereUniqueInput
  }

  /**
   * CustomerAddress deleteMany
   */
  export type CustomerAddressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerAddresses to delete
     */
    where?: CustomerAddressWhereInput
  }

  /**
   * CustomerAddress.customer
   */
  export type CustomerAddress$customerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
  }

  /**
   * CustomerAddress without action
   */
  export type CustomerAddressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerAddress
     */
    select?: CustomerAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerAddressInclude<ExtArgs> | null
  }


  /**
   * Model CustomerHistory
   */

  export type AggregateCustomerHistory = {
    _count: CustomerHistoryCountAggregateOutputType | null
    _min: CustomerHistoryMinAggregateOutputType | null
    _max: CustomerHistoryMaxAggregateOutputType | null
  }

  export type CustomerHistoryMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    action: string | null
    description: string | null
    actionAt: Date | null
    actionBy: string | null
  }

  export type CustomerHistoryMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    action: string | null
    description: string | null
    actionAt: Date | null
    actionBy: string | null
  }

  export type CustomerHistoryCountAggregateOutputType = {
    id: number
    customerId: number
    action: number
    description: number
    actionAt: number
    actionBy: number
    _all: number
  }


  export type CustomerHistoryMinAggregateInputType = {
    id?: true
    customerId?: true
    action?: true
    description?: true
    actionAt?: true
    actionBy?: true
  }

  export type CustomerHistoryMaxAggregateInputType = {
    id?: true
    customerId?: true
    action?: true
    description?: true
    actionAt?: true
    actionBy?: true
  }

  export type CustomerHistoryCountAggregateInputType = {
    id?: true
    customerId?: true
    action?: true
    description?: true
    actionAt?: true
    actionBy?: true
    _all?: true
  }

  export type CustomerHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerHistory to aggregate.
     */
    where?: CustomerHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerHistories to fetch.
     */
    orderBy?: CustomerHistoryOrderByWithRelationInput | CustomerHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CustomerHistories
    **/
    _count?: true | CustomerHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerHistoryMaxAggregateInputType
  }

  export type GetCustomerHistoryAggregateType<T extends CustomerHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomerHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomerHistory[P]>
      : GetScalarType<T[P], AggregateCustomerHistory[P]>
  }




  export type CustomerHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerHistoryWhereInput
    orderBy?: CustomerHistoryOrderByWithAggregationInput | CustomerHistoryOrderByWithAggregationInput[]
    by: CustomerHistoryScalarFieldEnum[] | CustomerHistoryScalarFieldEnum
    having?: CustomerHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerHistoryCountAggregateInputType | true
    _min?: CustomerHistoryMinAggregateInputType
    _max?: CustomerHistoryMaxAggregateInputType
  }

  export type CustomerHistoryGroupByOutputType = {
    id: string
    customerId: string | null
    action: string
    description: string | null
    actionAt: Date
    actionBy: string | null
    _count: CustomerHistoryCountAggregateOutputType | null
    _min: CustomerHistoryMinAggregateOutputType | null
    _max: CustomerHistoryMaxAggregateOutputType | null
  }

  type GetCustomerHistoryGroupByPayload<T extends CustomerHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerHistoryGroupByOutputType[P]>
        }
      >
    >


  export type CustomerHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    action?: boolean
    description?: boolean
    actionAt?: boolean
    actionBy?: boolean
    customer?: boolean | CustomerHistory$customerArgs<ExtArgs>
  }, ExtArgs["result"]["customerHistory"]>


  export type CustomerHistorySelectScalar = {
    id?: boolean
    customerId?: boolean
    action?: boolean
    description?: boolean
    actionAt?: boolean
    actionBy?: boolean
  }

  export type CustomerHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerHistory$customerArgs<ExtArgs>
  }

  export type $CustomerHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CustomerHistory"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string | null
      action: string
      description: string | null
      actionAt: Date
      actionBy: string | null
    }, ExtArgs["result"]["customerHistory"]>
    composites: {}
  }

  type CustomerHistoryGetPayload<S extends boolean | null | undefined | CustomerHistoryDefaultArgs> = $Result.GetResult<Prisma.$CustomerHistoryPayload, S>

  type CustomerHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CustomerHistoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CustomerHistoryCountAggregateInputType | true
    }

  export interface CustomerHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CustomerHistory'], meta: { name: 'CustomerHistory' } }
    /**
     * Find zero or one CustomerHistory that matches the filter.
     * @param {CustomerHistoryFindUniqueArgs} args - Arguments to find a CustomerHistory
     * @example
     * // Get one CustomerHistory
     * const customerHistory = await prisma.customerHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerHistoryFindUniqueArgs>(args: SelectSubset<T, CustomerHistoryFindUniqueArgs<ExtArgs>>): Prisma__CustomerHistoryClient<$Result.GetResult<Prisma.$CustomerHistoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CustomerHistory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CustomerHistoryFindUniqueOrThrowArgs} args - Arguments to find a CustomerHistory
     * @example
     * // Get one CustomerHistory
     * const customerHistory = await prisma.customerHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerHistoryClient<$Result.GetResult<Prisma.$CustomerHistoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CustomerHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerHistoryFindFirstArgs} args - Arguments to find a CustomerHistory
     * @example
     * // Get one CustomerHistory
     * const customerHistory = await prisma.customerHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerHistoryFindFirstArgs>(args?: SelectSubset<T, CustomerHistoryFindFirstArgs<ExtArgs>>): Prisma__CustomerHistoryClient<$Result.GetResult<Prisma.$CustomerHistoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CustomerHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerHistoryFindFirstOrThrowArgs} args - Arguments to find a CustomerHistory
     * @example
     * // Get one CustomerHistory
     * const customerHistory = await prisma.customerHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerHistoryClient<$Result.GetResult<Prisma.$CustomerHistoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CustomerHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CustomerHistories
     * const customerHistories = await prisma.customerHistory.findMany()
     * 
     * // Get first 10 CustomerHistories
     * const customerHistories = await prisma.customerHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerHistoryWithIdOnly = await prisma.customerHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerHistoryFindManyArgs>(args?: SelectSubset<T, CustomerHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerHistoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CustomerHistory.
     * @param {CustomerHistoryCreateArgs} args - Arguments to create a CustomerHistory.
     * @example
     * // Create one CustomerHistory
     * const CustomerHistory = await prisma.customerHistory.create({
     *   data: {
     *     // ... data to create a CustomerHistory
     *   }
     * })
     * 
     */
    create<T extends CustomerHistoryCreateArgs>(args: SelectSubset<T, CustomerHistoryCreateArgs<ExtArgs>>): Prisma__CustomerHistoryClient<$Result.GetResult<Prisma.$CustomerHistoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CustomerHistories.
     * @param {CustomerHistoryCreateManyArgs} args - Arguments to create many CustomerHistories.
     * @example
     * // Create many CustomerHistories
     * const customerHistory = await prisma.customerHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerHistoryCreateManyArgs>(args?: SelectSubset<T, CustomerHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CustomerHistory.
     * @param {CustomerHistoryDeleteArgs} args - Arguments to delete one CustomerHistory.
     * @example
     * // Delete one CustomerHistory
     * const CustomerHistory = await prisma.customerHistory.delete({
     *   where: {
     *     // ... filter to delete one CustomerHistory
     *   }
     * })
     * 
     */
    delete<T extends CustomerHistoryDeleteArgs>(args: SelectSubset<T, CustomerHistoryDeleteArgs<ExtArgs>>): Prisma__CustomerHistoryClient<$Result.GetResult<Prisma.$CustomerHistoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CustomerHistory.
     * @param {CustomerHistoryUpdateArgs} args - Arguments to update one CustomerHistory.
     * @example
     * // Update one CustomerHistory
     * const customerHistory = await prisma.customerHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerHistoryUpdateArgs>(args: SelectSubset<T, CustomerHistoryUpdateArgs<ExtArgs>>): Prisma__CustomerHistoryClient<$Result.GetResult<Prisma.$CustomerHistoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CustomerHistories.
     * @param {CustomerHistoryDeleteManyArgs} args - Arguments to filter CustomerHistories to delete.
     * @example
     * // Delete a few CustomerHistories
     * const { count } = await prisma.customerHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerHistoryDeleteManyArgs>(args?: SelectSubset<T, CustomerHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomerHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CustomerHistories
     * const customerHistory = await prisma.customerHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerHistoryUpdateManyArgs>(args: SelectSubset<T, CustomerHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CustomerHistory.
     * @param {CustomerHistoryUpsertArgs} args - Arguments to update or create a CustomerHistory.
     * @example
     * // Update or create a CustomerHistory
     * const customerHistory = await prisma.customerHistory.upsert({
     *   create: {
     *     // ... data to create a CustomerHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CustomerHistory we want to update
     *   }
     * })
     */
    upsert<T extends CustomerHistoryUpsertArgs>(args: SelectSubset<T, CustomerHistoryUpsertArgs<ExtArgs>>): Prisma__CustomerHistoryClient<$Result.GetResult<Prisma.$CustomerHistoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CustomerHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerHistoryCountArgs} args - Arguments to filter CustomerHistories to count.
     * @example
     * // Count the number of CustomerHistories
     * const count = await prisma.customerHistory.count({
     *   where: {
     *     // ... the filter for the CustomerHistories we want to count
     *   }
     * })
    **/
    count<T extends CustomerHistoryCountArgs>(
      args?: Subset<T, CustomerHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CustomerHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CustomerHistoryAggregateArgs>(args: Subset<T, CustomerHistoryAggregateArgs>): Prisma.PrismaPromise<GetCustomerHistoryAggregateType<T>>

    /**
     * Group by CustomerHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerHistoryGroupByArgs} args - Group by arguments.
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
      T extends CustomerHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerHistoryGroupByArgs['orderBy'] }
        : { orderBy?: CustomerHistoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CustomerHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CustomerHistory model
   */
  readonly fields: CustomerHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CustomerHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerHistory$customerArgs<ExtArgs> = {}>(args?: Subset<T, CustomerHistory$customerArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the CustomerHistory model
   */ 
  interface CustomerHistoryFieldRefs {
    readonly id: FieldRef<"CustomerHistory", 'String'>
    readonly customerId: FieldRef<"CustomerHistory", 'String'>
    readonly action: FieldRef<"CustomerHistory", 'String'>
    readonly description: FieldRef<"CustomerHistory", 'String'>
    readonly actionAt: FieldRef<"CustomerHistory", 'DateTime'>
    readonly actionBy: FieldRef<"CustomerHistory", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CustomerHistory findUnique
   */
  export type CustomerHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerHistory
     */
    select?: CustomerHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerHistoryInclude<ExtArgs> | null
    /**
     * Filter, which CustomerHistory to fetch.
     */
    where: CustomerHistoryWhereUniqueInput
  }

  /**
   * CustomerHistory findUniqueOrThrow
   */
  export type CustomerHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerHistory
     */
    select?: CustomerHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerHistoryInclude<ExtArgs> | null
    /**
     * Filter, which CustomerHistory to fetch.
     */
    where: CustomerHistoryWhereUniqueInput
  }

  /**
   * CustomerHistory findFirst
   */
  export type CustomerHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerHistory
     */
    select?: CustomerHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerHistoryInclude<ExtArgs> | null
    /**
     * Filter, which CustomerHistory to fetch.
     */
    where?: CustomerHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerHistories to fetch.
     */
    orderBy?: CustomerHistoryOrderByWithRelationInput | CustomerHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerHistories.
     */
    cursor?: CustomerHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerHistories.
     */
    distinct?: CustomerHistoryScalarFieldEnum | CustomerHistoryScalarFieldEnum[]
  }

  /**
   * CustomerHistory findFirstOrThrow
   */
  export type CustomerHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerHistory
     */
    select?: CustomerHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerHistoryInclude<ExtArgs> | null
    /**
     * Filter, which CustomerHistory to fetch.
     */
    where?: CustomerHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerHistories to fetch.
     */
    orderBy?: CustomerHistoryOrderByWithRelationInput | CustomerHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerHistories.
     */
    cursor?: CustomerHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerHistories.
     */
    distinct?: CustomerHistoryScalarFieldEnum | CustomerHistoryScalarFieldEnum[]
  }

  /**
   * CustomerHistory findMany
   */
  export type CustomerHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerHistory
     */
    select?: CustomerHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerHistoryInclude<ExtArgs> | null
    /**
     * Filter, which CustomerHistories to fetch.
     */
    where?: CustomerHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerHistories to fetch.
     */
    orderBy?: CustomerHistoryOrderByWithRelationInput | CustomerHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CustomerHistories.
     */
    cursor?: CustomerHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerHistories.
     */
    skip?: number
    distinct?: CustomerHistoryScalarFieldEnum | CustomerHistoryScalarFieldEnum[]
  }

  /**
   * CustomerHistory create
   */
  export type CustomerHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerHistory
     */
    select?: CustomerHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a CustomerHistory.
     */
    data: XOR<CustomerHistoryCreateInput, CustomerHistoryUncheckedCreateInput>
  }

  /**
   * CustomerHistory createMany
   */
  export type CustomerHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CustomerHistories.
     */
    data: CustomerHistoryCreateManyInput | CustomerHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CustomerHistory update
   */
  export type CustomerHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerHistory
     */
    select?: CustomerHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a CustomerHistory.
     */
    data: XOR<CustomerHistoryUpdateInput, CustomerHistoryUncheckedUpdateInput>
    /**
     * Choose, which CustomerHistory to update.
     */
    where: CustomerHistoryWhereUniqueInput
  }

  /**
   * CustomerHistory updateMany
   */
  export type CustomerHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CustomerHistories.
     */
    data: XOR<CustomerHistoryUpdateManyMutationInput, CustomerHistoryUncheckedUpdateManyInput>
    /**
     * Filter which CustomerHistories to update
     */
    where?: CustomerHistoryWhereInput
  }

  /**
   * CustomerHistory upsert
   */
  export type CustomerHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerHistory
     */
    select?: CustomerHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the CustomerHistory to update in case it exists.
     */
    where: CustomerHistoryWhereUniqueInput
    /**
     * In case the CustomerHistory found by the `where` argument doesn't exist, create a new CustomerHistory with this data.
     */
    create: XOR<CustomerHistoryCreateInput, CustomerHistoryUncheckedCreateInput>
    /**
     * In case the CustomerHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerHistoryUpdateInput, CustomerHistoryUncheckedUpdateInput>
  }

  /**
   * CustomerHistory delete
   */
  export type CustomerHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerHistory
     */
    select?: CustomerHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerHistoryInclude<ExtArgs> | null
    /**
     * Filter which CustomerHistory to delete.
     */
    where: CustomerHistoryWhereUniqueInput
  }

  /**
   * CustomerHistory deleteMany
   */
  export type CustomerHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerHistories to delete
     */
    where?: CustomerHistoryWhereInput
  }

  /**
   * CustomerHistory.customer
   */
  export type CustomerHistory$customerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
  }

  /**
   * CustomerHistory without action
   */
  export type CustomerHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerHistory
     */
    select?: CustomerHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerHistoryInclude<ExtArgs> | null
  }


  /**
   * Model Lead
   */

  export type AggregateLead = {
    _count: LeadCountAggregateOutputType | null
    _avg: LeadAvgAggregateOutputType | null
    _sum: LeadSumAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  export type LeadAvgAggregateOutputType = {
    loanAmount: Decimal | null
    netMonthlySalary: Decimal | null
    existingEmi: Decimal | null
  }

  export type LeadSumAggregateOutputType = {
    loanAmount: Decimal | null
    netMonthlySalary: Decimal | null
    existingEmi: Decimal | null
  }

  export type LeadMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    mobile: string | null
    panNumber: string | null
    aadhaarNumber: string | null
    loanType: string | null
    loanAmount: Decimal | null
    assignedTo: string | null
    status: string | null
    customerId: string | null
    createdAt: Date | null
    profession: string | null
    netMonthlySalary: Decimal | null
    gender: string | null
    maritalStatus: string | null
    dob: string | null
    alternateContact: string | null
    whatsappNo: string | null
    officialEmail: string | null
    currentAddressLine1: string | null
    currentAddressLine2: string | null
    currentState: string | null
    currentDistrict: string | null
    currentCity: string | null
    currentPincode: string | null
    residenceType: string | null
    permanentAddressLine1: string | null
    permanentAddressLine2: string | null
    permanentState: string | null
    permanentDistrict: string | null
    permanentCity: string | null
    permanentPincode: string | null
    jobType: string | null
    designation: string | null
    modeOfSalary: string | null
    officeAddress: string | null
    officeState: string | null
    officeDistrict: string | null
    officeCity: string | null
    officePincode: string | null
    existingEmi: Decimal | null
    hasPriorPersonalLoan: boolean | null
    opsNotes: string | null
    companyName: string | null
  }

  export type LeadMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    mobile: string | null
    panNumber: string | null
    aadhaarNumber: string | null
    loanType: string | null
    loanAmount: Decimal | null
    assignedTo: string | null
    status: string | null
    customerId: string | null
    createdAt: Date | null
    profession: string | null
    netMonthlySalary: Decimal | null
    gender: string | null
    maritalStatus: string | null
    dob: string | null
    alternateContact: string | null
    whatsappNo: string | null
    officialEmail: string | null
    currentAddressLine1: string | null
    currentAddressLine2: string | null
    currentState: string | null
    currentDistrict: string | null
    currentCity: string | null
    currentPincode: string | null
    residenceType: string | null
    permanentAddressLine1: string | null
    permanentAddressLine2: string | null
    permanentState: string | null
    permanentDistrict: string | null
    permanentCity: string | null
    permanentPincode: string | null
    jobType: string | null
    designation: string | null
    modeOfSalary: string | null
    officeAddress: string | null
    officeState: string | null
    officeDistrict: string | null
    officeCity: string | null
    officePincode: string | null
    existingEmi: Decimal | null
    hasPriorPersonalLoan: boolean | null
    opsNotes: string | null
    companyName: string | null
  }

  export type LeadCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    email: number
    mobile: number
    panNumber: number
    aadhaarNumber: number
    loanType: number
    loanAmount: number
    assignedTo: number
    status: number
    customerId: number
    createdAt: number
    profession: number
    netMonthlySalary: number
    gender: number
    maritalStatus: number
    dob: number
    alternateContact: number
    whatsappNo: number
    officialEmail: number
    currentAddressLine1: number
    currentAddressLine2: number
    currentState: number
    currentDistrict: number
    currentCity: number
    currentPincode: number
    residenceType: number
    permanentAddressLine1: number
    permanentAddressLine2: number
    permanentState: number
    permanentDistrict: number
    permanentCity: number
    permanentPincode: number
    jobType: number
    designation: number
    modeOfSalary: number
    officeAddress: number
    officeState: number
    officeDistrict: number
    officeCity: number
    officePincode: number
    existingEmi: number
    hasPriorPersonalLoan: number
    opsNotes: number
    companyName: number
    _all: number
  }


  export type LeadAvgAggregateInputType = {
    loanAmount?: true
    netMonthlySalary?: true
    existingEmi?: true
  }

  export type LeadSumAggregateInputType = {
    loanAmount?: true
    netMonthlySalary?: true
    existingEmi?: true
  }

  export type LeadMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    mobile?: true
    panNumber?: true
    aadhaarNumber?: true
    loanType?: true
    loanAmount?: true
    assignedTo?: true
    status?: true
    customerId?: true
    createdAt?: true
    profession?: true
    netMonthlySalary?: true
    gender?: true
    maritalStatus?: true
    dob?: true
    alternateContact?: true
    whatsappNo?: true
    officialEmail?: true
    currentAddressLine1?: true
    currentAddressLine2?: true
    currentState?: true
    currentDistrict?: true
    currentCity?: true
    currentPincode?: true
    residenceType?: true
    permanentAddressLine1?: true
    permanentAddressLine2?: true
    permanentState?: true
    permanentDistrict?: true
    permanentCity?: true
    permanentPincode?: true
    jobType?: true
    designation?: true
    modeOfSalary?: true
    officeAddress?: true
    officeState?: true
    officeDistrict?: true
    officeCity?: true
    officePincode?: true
    existingEmi?: true
    hasPriorPersonalLoan?: true
    opsNotes?: true
    companyName?: true
  }

  export type LeadMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    mobile?: true
    panNumber?: true
    aadhaarNumber?: true
    loanType?: true
    loanAmount?: true
    assignedTo?: true
    status?: true
    customerId?: true
    createdAt?: true
    profession?: true
    netMonthlySalary?: true
    gender?: true
    maritalStatus?: true
    dob?: true
    alternateContact?: true
    whatsappNo?: true
    officialEmail?: true
    currentAddressLine1?: true
    currentAddressLine2?: true
    currentState?: true
    currentDistrict?: true
    currentCity?: true
    currentPincode?: true
    residenceType?: true
    permanentAddressLine1?: true
    permanentAddressLine2?: true
    permanentState?: true
    permanentDistrict?: true
    permanentCity?: true
    permanentPincode?: true
    jobType?: true
    designation?: true
    modeOfSalary?: true
    officeAddress?: true
    officeState?: true
    officeDistrict?: true
    officeCity?: true
    officePincode?: true
    existingEmi?: true
    hasPriorPersonalLoan?: true
    opsNotes?: true
    companyName?: true
  }

  export type LeadCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    mobile?: true
    panNumber?: true
    aadhaarNumber?: true
    loanType?: true
    loanAmount?: true
    assignedTo?: true
    status?: true
    customerId?: true
    createdAt?: true
    profession?: true
    netMonthlySalary?: true
    gender?: true
    maritalStatus?: true
    dob?: true
    alternateContact?: true
    whatsappNo?: true
    officialEmail?: true
    currentAddressLine1?: true
    currentAddressLine2?: true
    currentState?: true
    currentDistrict?: true
    currentCity?: true
    currentPincode?: true
    residenceType?: true
    permanentAddressLine1?: true
    permanentAddressLine2?: true
    permanentState?: true
    permanentDistrict?: true
    permanentCity?: true
    permanentPincode?: true
    jobType?: true
    designation?: true
    modeOfSalary?: true
    officeAddress?: true
    officeState?: true
    officeDistrict?: true
    officeCity?: true
    officePincode?: true
    existingEmi?: true
    hasPriorPersonalLoan?: true
    opsNotes?: true
    companyName?: true
    _all?: true
  }

  export type LeadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lead to aggregate.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Leads
    **/
    _count?: true | LeadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LeadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LeadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeadMaxAggregateInputType
  }

  export type GetLeadAggregateType<T extends LeadAggregateArgs> = {
        [P in keyof T & keyof AggregateLead]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLead[P]>
      : GetScalarType<T[P], AggregateLead[P]>
  }




  export type LeadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithAggregationInput | LeadOrderByWithAggregationInput[]
    by: LeadScalarFieldEnum[] | LeadScalarFieldEnum
    having?: LeadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeadCountAggregateInputType | true
    _avg?: LeadAvgAggregateInputType
    _sum?: LeadSumAggregateInputType
    _min?: LeadMinAggregateInputType
    _max?: LeadMaxAggregateInputType
  }

  export type LeadGroupByOutputType = {
    id: string
    firstName: string
    lastName: string
    email: string
    mobile: string
    panNumber: string
    aadhaarNumber: string | null
    loanType: string | null
    loanAmount: Decimal | null
    assignedTo: string | null
    status: string
    customerId: string | null
    createdAt: Date
    profession: string | null
    netMonthlySalary: Decimal | null
    gender: string | null
    maritalStatus: string | null
    dob: string | null
    alternateContact: string | null
    whatsappNo: string | null
    officialEmail: string | null
    currentAddressLine1: string | null
    currentAddressLine2: string | null
    currentState: string | null
    currentDistrict: string | null
    currentCity: string | null
    currentPincode: string | null
    residenceType: string | null
    permanentAddressLine1: string | null
    permanentAddressLine2: string | null
    permanentState: string | null
    permanentDistrict: string | null
    permanentCity: string | null
    permanentPincode: string | null
    jobType: string | null
    designation: string | null
    modeOfSalary: string | null
    officeAddress: string | null
    officeState: string | null
    officeDistrict: string | null
    officeCity: string | null
    officePincode: string | null
    existingEmi: Decimal | null
    hasPriorPersonalLoan: boolean | null
    opsNotes: string | null
    companyName: string | null
    _count: LeadCountAggregateOutputType | null
    _avg: LeadAvgAggregateOutputType | null
    _sum: LeadSumAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  type GetLeadGroupByPayload<T extends LeadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeadGroupByOutputType[P]>
            : GetScalarType<T[P], LeadGroupByOutputType[P]>
        }
      >
    >


  export type LeadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    mobile?: boolean
    panNumber?: boolean
    aadhaarNumber?: boolean
    loanType?: boolean
    loanAmount?: boolean
    assignedTo?: boolean
    status?: boolean
    customerId?: boolean
    createdAt?: boolean
    profession?: boolean
    netMonthlySalary?: boolean
    gender?: boolean
    maritalStatus?: boolean
    dob?: boolean
    alternateContact?: boolean
    whatsappNo?: boolean
    officialEmail?: boolean
    currentAddressLine1?: boolean
    currentAddressLine2?: boolean
    currentState?: boolean
    currentDistrict?: boolean
    currentCity?: boolean
    currentPincode?: boolean
    residenceType?: boolean
    permanentAddressLine1?: boolean
    permanentAddressLine2?: boolean
    permanentState?: boolean
    permanentDistrict?: boolean
    permanentCity?: boolean
    permanentPincode?: boolean
    jobType?: boolean
    designation?: boolean
    modeOfSalary?: boolean
    officeAddress?: boolean
    officeState?: boolean
    officeDistrict?: boolean
    officeCity?: boolean
    officePincode?: boolean
    existingEmi?: boolean
    hasPriorPersonalLoan?: boolean
    opsNotes?: boolean
    companyName?: boolean
    customer?: boolean | Lead$customerArgs<ExtArgs>
  }, ExtArgs["result"]["lead"]>


  export type LeadSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    mobile?: boolean
    panNumber?: boolean
    aadhaarNumber?: boolean
    loanType?: boolean
    loanAmount?: boolean
    assignedTo?: boolean
    status?: boolean
    customerId?: boolean
    createdAt?: boolean
    profession?: boolean
    netMonthlySalary?: boolean
    gender?: boolean
    maritalStatus?: boolean
    dob?: boolean
    alternateContact?: boolean
    whatsappNo?: boolean
    officialEmail?: boolean
    currentAddressLine1?: boolean
    currentAddressLine2?: boolean
    currentState?: boolean
    currentDistrict?: boolean
    currentCity?: boolean
    currentPincode?: boolean
    residenceType?: boolean
    permanentAddressLine1?: boolean
    permanentAddressLine2?: boolean
    permanentState?: boolean
    permanentDistrict?: boolean
    permanentCity?: boolean
    permanentPincode?: boolean
    jobType?: boolean
    designation?: boolean
    modeOfSalary?: boolean
    officeAddress?: boolean
    officeState?: boolean
    officeDistrict?: boolean
    officeCity?: boolean
    officePincode?: boolean
    existingEmi?: boolean
    hasPriorPersonalLoan?: boolean
    opsNotes?: boolean
    companyName?: boolean
  }

  export type LeadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | Lead$customerArgs<ExtArgs>
  }

  export type $LeadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lead"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      lastName: string
      email: string
      mobile: string
      panNumber: string
      aadhaarNumber: string | null
      loanType: string | null
      loanAmount: Prisma.Decimal | null
      assignedTo: string | null
      status: string
      customerId: string | null
      createdAt: Date
      profession: string | null
      netMonthlySalary: Prisma.Decimal | null
      gender: string | null
      maritalStatus: string | null
      dob: string | null
      alternateContact: string | null
      whatsappNo: string | null
      officialEmail: string | null
      currentAddressLine1: string | null
      currentAddressLine2: string | null
      currentState: string | null
      currentDistrict: string | null
      currentCity: string | null
      currentPincode: string | null
      residenceType: string | null
      permanentAddressLine1: string | null
      permanentAddressLine2: string | null
      permanentState: string | null
      permanentDistrict: string | null
      permanentCity: string | null
      permanentPincode: string | null
      jobType: string | null
      designation: string | null
      modeOfSalary: string | null
      officeAddress: string | null
      officeState: string | null
      officeDistrict: string | null
      officeCity: string | null
      officePincode: string | null
      existingEmi: Prisma.Decimal | null
      hasPriorPersonalLoan: boolean | null
      opsNotes: string | null
      companyName: string | null
    }, ExtArgs["result"]["lead"]>
    composites: {}
  }

  type LeadGetPayload<S extends boolean | null | undefined | LeadDefaultArgs> = $Result.GetResult<Prisma.$LeadPayload, S>

  type LeadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LeadFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LeadCountAggregateInputType | true
    }

  export interface LeadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lead'], meta: { name: 'Lead' } }
    /**
     * Find zero or one Lead that matches the filter.
     * @param {LeadFindUniqueArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeadFindUniqueArgs>(args: SelectSubset<T, LeadFindUniqueArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Lead that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LeadFindUniqueOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeadFindUniqueOrThrowArgs>(args: SelectSubset<T, LeadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Lead that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeadFindFirstArgs>(args?: SelectSubset<T, LeadFindFirstArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Lead that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeadFindFirstOrThrowArgs>(args?: SelectSubset<T, LeadFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Leads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Leads
     * const leads = await prisma.lead.findMany()
     * 
     * // Get first 10 Leads
     * const leads = await prisma.lead.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leadWithIdOnly = await prisma.lead.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeadFindManyArgs>(args?: SelectSubset<T, LeadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Lead.
     * @param {LeadCreateArgs} args - Arguments to create a Lead.
     * @example
     * // Create one Lead
     * const Lead = await prisma.lead.create({
     *   data: {
     *     // ... data to create a Lead
     *   }
     * })
     * 
     */
    create<T extends LeadCreateArgs>(args: SelectSubset<T, LeadCreateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Leads.
     * @param {LeadCreateManyArgs} args - Arguments to create many Leads.
     * @example
     * // Create many Leads
     * const lead = await prisma.lead.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeadCreateManyArgs>(args?: SelectSubset<T, LeadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Lead.
     * @param {LeadDeleteArgs} args - Arguments to delete one Lead.
     * @example
     * // Delete one Lead
     * const Lead = await prisma.lead.delete({
     *   where: {
     *     // ... filter to delete one Lead
     *   }
     * })
     * 
     */
    delete<T extends LeadDeleteArgs>(args: SelectSubset<T, LeadDeleteArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Lead.
     * @param {LeadUpdateArgs} args - Arguments to update one Lead.
     * @example
     * // Update one Lead
     * const lead = await prisma.lead.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeadUpdateArgs>(args: SelectSubset<T, LeadUpdateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Leads.
     * @param {LeadDeleteManyArgs} args - Arguments to filter Leads to delete.
     * @example
     * // Delete a few Leads
     * const { count } = await prisma.lead.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeadDeleteManyArgs>(args?: SelectSubset<T, LeadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Leads
     * const lead = await prisma.lead.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeadUpdateManyArgs>(args: SelectSubset<T, LeadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Lead.
     * @param {LeadUpsertArgs} args - Arguments to update or create a Lead.
     * @example
     * // Update or create a Lead
     * const lead = await prisma.lead.upsert({
     *   create: {
     *     // ... data to create a Lead
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lead we want to update
     *   }
     * })
     */
    upsert<T extends LeadUpsertArgs>(args: SelectSubset<T, LeadUpsertArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCountArgs} args - Arguments to filter Leads to count.
     * @example
     * // Count the number of Leads
     * const count = await prisma.lead.count({
     *   where: {
     *     // ... the filter for the Leads we want to count
     *   }
     * })
    **/
    count<T extends LeadCountArgs>(
      args?: Subset<T, LeadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LeadAggregateArgs>(args: Subset<T, LeadAggregateArgs>): Prisma.PrismaPromise<GetLeadAggregateType<T>>

    /**
     * Group by Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadGroupByArgs} args - Group by arguments.
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
      T extends LeadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeadGroupByArgs['orderBy'] }
        : { orderBy?: LeadGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LeadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lead model
   */
  readonly fields: LeadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lead.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends Lead$customerArgs<ExtArgs> = {}>(args?: Subset<T, Lead$customerArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the Lead model
   */ 
  interface LeadFieldRefs {
    readonly id: FieldRef<"Lead", 'String'>
    readonly firstName: FieldRef<"Lead", 'String'>
    readonly lastName: FieldRef<"Lead", 'String'>
    readonly email: FieldRef<"Lead", 'String'>
    readonly mobile: FieldRef<"Lead", 'String'>
    readonly panNumber: FieldRef<"Lead", 'String'>
    readonly aadhaarNumber: FieldRef<"Lead", 'String'>
    readonly loanType: FieldRef<"Lead", 'String'>
    readonly loanAmount: FieldRef<"Lead", 'Decimal'>
    readonly assignedTo: FieldRef<"Lead", 'String'>
    readonly status: FieldRef<"Lead", 'String'>
    readonly customerId: FieldRef<"Lead", 'String'>
    readonly createdAt: FieldRef<"Lead", 'DateTime'>
    readonly profession: FieldRef<"Lead", 'String'>
    readonly netMonthlySalary: FieldRef<"Lead", 'Decimal'>
    readonly gender: FieldRef<"Lead", 'String'>
    readonly maritalStatus: FieldRef<"Lead", 'String'>
    readonly dob: FieldRef<"Lead", 'String'>
    readonly alternateContact: FieldRef<"Lead", 'String'>
    readonly whatsappNo: FieldRef<"Lead", 'String'>
    readonly officialEmail: FieldRef<"Lead", 'String'>
    readonly currentAddressLine1: FieldRef<"Lead", 'String'>
    readonly currentAddressLine2: FieldRef<"Lead", 'String'>
    readonly currentState: FieldRef<"Lead", 'String'>
    readonly currentDistrict: FieldRef<"Lead", 'String'>
    readonly currentCity: FieldRef<"Lead", 'String'>
    readonly currentPincode: FieldRef<"Lead", 'String'>
    readonly residenceType: FieldRef<"Lead", 'String'>
    readonly permanentAddressLine1: FieldRef<"Lead", 'String'>
    readonly permanentAddressLine2: FieldRef<"Lead", 'String'>
    readonly permanentState: FieldRef<"Lead", 'String'>
    readonly permanentDistrict: FieldRef<"Lead", 'String'>
    readonly permanentCity: FieldRef<"Lead", 'String'>
    readonly permanentPincode: FieldRef<"Lead", 'String'>
    readonly jobType: FieldRef<"Lead", 'String'>
    readonly designation: FieldRef<"Lead", 'String'>
    readonly modeOfSalary: FieldRef<"Lead", 'String'>
    readonly officeAddress: FieldRef<"Lead", 'String'>
    readonly officeState: FieldRef<"Lead", 'String'>
    readonly officeDistrict: FieldRef<"Lead", 'String'>
    readonly officeCity: FieldRef<"Lead", 'String'>
    readonly officePincode: FieldRef<"Lead", 'String'>
    readonly existingEmi: FieldRef<"Lead", 'Decimal'>
    readonly hasPriorPersonalLoan: FieldRef<"Lead", 'Boolean'>
    readonly opsNotes: FieldRef<"Lead", 'String'>
    readonly companyName: FieldRef<"Lead", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Lead findUnique
   */
  export type LeadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findUniqueOrThrow
   */
  export type LeadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findFirst
   */
  export type LeadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findFirstOrThrow
   */
  export type LeadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findMany
   */
  export type LeadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Leads to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead create
   */
  export type LeadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The data needed to create a Lead.
     */
    data: XOR<LeadCreateInput, LeadUncheckedCreateInput>
  }

  /**
   * Lead createMany
   */
  export type LeadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Leads.
     */
    data: LeadCreateManyInput | LeadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Lead update
   */
  export type LeadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The data needed to update a Lead.
     */
    data: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
    /**
     * Choose, which Lead to update.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead updateMany
   */
  export type LeadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Leads.
     */
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyInput>
    /**
     * Filter which Leads to update
     */
    where?: LeadWhereInput
  }

  /**
   * Lead upsert
   */
  export type LeadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The filter to search for the Lead to update in case it exists.
     */
    where: LeadWhereUniqueInput
    /**
     * In case the Lead found by the `where` argument doesn't exist, create a new Lead with this data.
     */
    create: XOR<LeadCreateInput, LeadUncheckedCreateInput>
    /**
     * In case the Lead was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
  }

  /**
   * Lead delete
   */
  export type LeadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter which Lead to delete.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead deleteMany
   */
  export type LeadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Leads to delete
     */
    where?: LeadWhereInput
  }

  /**
   * Lead.customer
   */
  export type Lead$customerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
  }

  /**
   * Lead without action
   */
  export type LeadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
  }


  /**
   * Model Document
   */

  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  export type DocumentAvgAggregateOutputType = {
    fileSizeBytes: number | null
  }

  export type DocumentSumAggregateOutputType = {
    fileSizeBytes: bigint | null
  }

  export type DocumentMinAggregateOutputType = {
    id: string | null
    loanId: string | null
    uploadedBy: string | null
    documentType: string | null
    s3Key: string | null
    fileName: string | null
    mimeType: string | null
    fileSizeBytes: bigint | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ownerId: string | null
    folderPath: string | null
    reviewerId: string | null
    reviewRemarks: string | null
    reviewedAt: Date | null
  }

  export type DocumentMaxAggregateOutputType = {
    id: string | null
    loanId: string | null
    uploadedBy: string | null
    documentType: string | null
    s3Key: string | null
    fileName: string | null
    mimeType: string | null
    fileSizeBytes: bigint | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ownerId: string | null
    folderPath: string | null
    reviewerId: string | null
    reviewRemarks: string | null
    reviewedAt: Date | null
  }

  export type DocumentCountAggregateOutputType = {
    id: number
    loanId: number
    uploadedBy: number
    documentType: number
    s3Key: number
    fileName: number
    mimeType: number
    fileSizeBytes: number
    status: number
    createdAt: number
    updatedAt: number
    ownerId: number
    folderPath: number
    reviewerId: number
    reviewRemarks: number
    reviewedAt: number
    _all: number
  }


  export type DocumentAvgAggregateInputType = {
    fileSizeBytes?: true
  }

  export type DocumentSumAggregateInputType = {
    fileSizeBytes?: true
  }

  export type DocumentMinAggregateInputType = {
    id?: true
    loanId?: true
    uploadedBy?: true
    documentType?: true
    s3Key?: true
    fileName?: true
    mimeType?: true
    fileSizeBytes?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
    folderPath?: true
    reviewerId?: true
    reviewRemarks?: true
    reviewedAt?: true
  }

  export type DocumentMaxAggregateInputType = {
    id?: true
    loanId?: true
    uploadedBy?: true
    documentType?: true
    s3Key?: true
    fileName?: true
    mimeType?: true
    fileSizeBytes?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
    folderPath?: true
    reviewerId?: true
    reviewRemarks?: true
    reviewedAt?: true
  }

  export type DocumentCountAggregateInputType = {
    id?: true
    loanId?: true
    uploadedBy?: true
    documentType?: true
    s3Key?: true
    fileName?: true
    mimeType?: true
    fileSizeBytes?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
    folderPath?: true
    reviewerId?: true
    reviewRemarks?: true
    reviewedAt?: true
    _all?: true
  }

  export type DocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Document to aggregate.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documents
    **/
    _count?: true | DocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentMaxAggregateInputType
  }

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>
  }




  export type DocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithAggregationInput | DocumentOrderByWithAggregationInput[]
    by: DocumentScalarFieldEnum[] | DocumentScalarFieldEnum
    having?: DocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentCountAggregateInputType | true
    _avg?: DocumentAvgAggregateInputType
    _sum?: DocumentSumAggregateInputType
    _min?: DocumentMinAggregateInputType
    _max?: DocumentMaxAggregateInputType
  }

  export type DocumentGroupByOutputType = {
    id: string
    loanId: string | null
    uploadedBy: string
    documentType: string
    s3Key: string
    fileName: string
    mimeType: string
    fileSizeBytes: bigint | null
    status: string
    createdAt: Date
    updatedAt: Date | null
    ownerId: string | null
    folderPath: string
    reviewerId: string | null
    reviewRemarks: string | null
    reviewedAt: Date | null
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanId?: boolean
    uploadedBy?: boolean
    documentType?: boolean
    s3Key?: boolean
    fileName?: boolean
    mimeType?: boolean
    fileSizeBytes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    folderPath?: boolean
    reviewerId?: boolean
    reviewRemarks?: boolean
    reviewedAt?: boolean
    versions?: boolean | Document$versionsArgs<ExtArgs>
    accessLogs?: boolean | Document$accessLogsArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>


  export type DocumentSelectScalar = {
    id?: boolean
    loanId?: boolean
    uploadedBy?: boolean
    documentType?: boolean
    s3Key?: boolean
    fileName?: boolean
    mimeType?: boolean
    fileSizeBytes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    folderPath?: boolean
    reviewerId?: boolean
    reviewRemarks?: boolean
    reviewedAt?: boolean
  }

  export type DocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    versions?: boolean | Document$versionsArgs<ExtArgs>
    accessLogs?: boolean | Document$accessLogsArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $DocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Document"
    objects: {
      versions: Prisma.$DocumentVersionPayload<ExtArgs>[]
      accessLogs: Prisma.$DocumentAccessLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      loanId: string | null
      uploadedBy: string
      documentType: string
      s3Key: string
      fileName: string
      mimeType: string
      fileSizeBytes: bigint | null
      status: string
      createdAt: Date
      updatedAt: Date | null
      ownerId: string | null
      folderPath: string
      reviewerId: string | null
      reviewRemarks: string | null
      reviewedAt: Date | null
    }, ExtArgs["result"]["document"]>
    composites: {}
  }

  type DocumentGetPayload<S extends boolean | null | undefined | DocumentDefaultArgs> = $Result.GetResult<Prisma.$DocumentPayload, S>

  type DocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DocumentCountAggregateInputType | true
    }

  export interface DocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Document'], meta: { name: 'Document' } }
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentFindUniqueArgs>(args: SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Document that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentFindFirstArgs>(args?: SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Document that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentFindManyArgs>(args?: SelectSubset<T, DocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     * 
     */
    create<T extends DocumentCreateArgs>(args: SelectSubset<T, DocumentCreateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Documents.
     * @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentCreateManyArgs>(args?: SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     * 
     */
    delete<T extends DocumentDeleteArgs>(args: SelectSubset<T, DocumentDeleteArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentUpdateArgs>(args: SelectSubset<T, DocumentUpdateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentDeleteManyArgs>(args?: SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentUpdateManyArgs>(args: SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
     */
    upsert<T extends DocumentUpsertArgs>(args: SelectSubset<T, DocumentUpsertArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DocumentAggregateArgs>(args: Subset<T, DocumentAggregateArgs>): Prisma.PrismaPromise<GetDocumentAggregateType<T>>

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
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
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Document model
   */
  readonly fields: DocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    versions<T extends Document$versionsArgs<ExtArgs> = {}>(args?: Subset<T, Document$versionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentVersionPayload<ExtArgs>, T, "findMany"> | Null>
    accessLogs<T extends Document$accessLogsArgs<ExtArgs> = {}>(args?: Subset<T, Document$accessLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentAccessLogPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Document model
   */ 
  interface DocumentFieldRefs {
    readonly id: FieldRef<"Document", 'String'>
    readonly loanId: FieldRef<"Document", 'String'>
    readonly uploadedBy: FieldRef<"Document", 'String'>
    readonly documentType: FieldRef<"Document", 'String'>
    readonly s3Key: FieldRef<"Document", 'String'>
    readonly fileName: FieldRef<"Document", 'String'>
    readonly mimeType: FieldRef<"Document", 'String'>
    readonly fileSizeBytes: FieldRef<"Document", 'BigInt'>
    readonly status: FieldRef<"Document", 'String'>
    readonly createdAt: FieldRef<"Document", 'DateTime'>
    readonly updatedAt: FieldRef<"Document", 'DateTime'>
    readonly ownerId: FieldRef<"Document", 'String'>
    readonly folderPath: FieldRef<"Document", 'String'>
    readonly reviewerId: FieldRef<"Document", 'String'>
    readonly reviewRemarks: FieldRef<"Document", 'String'>
    readonly reviewedAt: FieldRef<"Document", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Document findUnique
   */
  export type DocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findFirst
   */
  export type DocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Documents to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document create
   */
  export type DocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a Document.
     */
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
  }

  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Document update
   */
  export type DocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a Document.
     */
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
    /**
     * Choose, which Document to update.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
  }

  /**
   * Document upsert
   */
  export type DocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the Document to update in case it exists.
     */
    where: DocumentWhereUniqueInput
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     */
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
  }

  /**
   * Document delete
   */
  export type DocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter which Document to delete.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documents to delete
     */
    where?: DocumentWhereInput
  }

  /**
   * Document.versions
   */
  export type Document$versionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentVersion
     */
    select?: DocumentVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentVersionInclude<ExtArgs> | null
    where?: DocumentVersionWhereInput
    orderBy?: DocumentVersionOrderByWithRelationInput | DocumentVersionOrderByWithRelationInput[]
    cursor?: DocumentVersionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentVersionScalarFieldEnum | DocumentVersionScalarFieldEnum[]
  }

  /**
   * Document.accessLogs
   */
  export type Document$accessLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentAccessLog
     */
    select?: DocumentAccessLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentAccessLogInclude<ExtArgs> | null
    where?: DocumentAccessLogWhereInput
    orderBy?: DocumentAccessLogOrderByWithRelationInput | DocumentAccessLogOrderByWithRelationInput[]
    cursor?: DocumentAccessLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentAccessLogScalarFieldEnum | DocumentAccessLogScalarFieldEnum[]
  }

  /**
   * Document without action
   */
  export type DocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
  }


  /**
   * Model DocumentVersion
   */

  export type AggregateDocumentVersion = {
    _count: DocumentVersionCountAggregateOutputType | null
    _avg: DocumentVersionAvgAggregateOutputType | null
    _sum: DocumentVersionSumAggregateOutputType | null
    _min: DocumentVersionMinAggregateOutputType | null
    _max: DocumentVersionMaxAggregateOutputType | null
  }

  export type DocumentVersionAvgAggregateOutputType = {
    versionNumber: number | null
  }

  export type DocumentVersionSumAggregateOutputType = {
    versionNumber: number | null
  }

  export type DocumentVersionMinAggregateOutputType = {
    id: string | null
    documentId: string | null
    versionNumber: number | null
    s3Key: string | null
    uploadedAt: Date | null
    uploadedBy: string | null
  }

  export type DocumentVersionMaxAggregateOutputType = {
    id: string | null
    documentId: string | null
    versionNumber: number | null
    s3Key: string | null
    uploadedAt: Date | null
    uploadedBy: string | null
  }

  export type DocumentVersionCountAggregateOutputType = {
    id: number
    documentId: number
    versionNumber: number
    s3Key: number
    uploadedAt: number
    uploadedBy: number
    _all: number
  }


  export type DocumentVersionAvgAggregateInputType = {
    versionNumber?: true
  }

  export type DocumentVersionSumAggregateInputType = {
    versionNumber?: true
  }

  export type DocumentVersionMinAggregateInputType = {
    id?: true
    documentId?: true
    versionNumber?: true
    s3Key?: true
    uploadedAt?: true
    uploadedBy?: true
  }

  export type DocumentVersionMaxAggregateInputType = {
    id?: true
    documentId?: true
    versionNumber?: true
    s3Key?: true
    uploadedAt?: true
    uploadedBy?: true
  }

  export type DocumentVersionCountAggregateInputType = {
    id?: true
    documentId?: true
    versionNumber?: true
    s3Key?: true
    uploadedAt?: true
    uploadedBy?: true
    _all?: true
  }

  export type DocumentVersionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentVersion to aggregate.
     */
    where?: DocumentVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentVersions to fetch.
     */
    orderBy?: DocumentVersionOrderByWithRelationInput | DocumentVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DocumentVersions
    **/
    _count?: true | DocumentVersionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentVersionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentVersionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentVersionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentVersionMaxAggregateInputType
  }

  export type GetDocumentVersionAggregateType<T extends DocumentVersionAggregateArgs> = {
        [P in keyof T & keyof AggregateDocumentVersion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocumentVersion[P]>
      : GetScalarType<T[P], AggregateDocumentVersion[P]>
  }




  export type DocumentVersionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentVersionWhereInput
    orderBy?: DocumentVersionOrderByWithAggregationInput | DocumentVersionOrderByWithAggregationInput[]
    by: DocumentVersionScalarFieldEnum[] | DocumentVersionScalarFieldEnum
    having?: DocumentVersionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentVersionCountAggregateInputType | true
    _avg?: DocumentVersionAvgAggregateInputType
    _sum?: DocumentVersionSumAggregateInputType
    _min?: DocumentVersionMinAggregateInputType
    _max?: DocumentVersionMaxAggregateInputType
  }

  export type DocumentVersionGroupByOutputType = {
    id: string
    documentId: string | null
    versionNumber: number
    s3Key: string
    uploadedAt: Date
    uploadedBy: string | null
    _count: DocumentVersionCountAggregateOutputType | null
    _avg: DocumentVersionAvgAggregateOutputType | null
    _sum: DocumentVersionSumAggregateOutputType | null
    _min: DocumentVersionMinAggregateOutputType | null
    _max: DocumentVersionMaxAggregateOutputType | null
  }

  type GetDocumentVersionGroupByPayload<T extends DocumentVersionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentVersionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentVersionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentVersionGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentVersionGroupByOutputType[P]>
        }
      >
    >


  export type DocumentVersionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    versionNumber?: boolean
    s3Key?: boolean
    uploadedAt?: boolean
    uploadedBy?: boolean
    document?: boolean | DocumentVersion$documentArgs<ExtArgs>
  }, ExtArgs["result"]["documentVersion"]>


  export type DocumentVersionSelectScalar = {
    id?: boolean
    documentId?: boolean
    versionNumber?: boolean
    s3Key?: boolean
    uploadedAt?: boolean
    uploadedBy?: boolean
  }

  export type DocumentVersionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentVersion$documentArgs<ExtArgs>
  }

  export type $DocumentVersionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DocumentVersion"
    objects: {
      document: Prisma.$DocumentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      documentId: string | null
      versionNumber: number
      s3Key: string
      uploadedAt: Date
      uploadedBy: string | null
    }, ExtArgs["result"]["documentVersion"]>
    composites: {}
  }

  type DocumentVersionGetPayload<S extends boolean | null | undefined | DocumentVersionDefaultArgs> = $Result.GetResult<Prisma.$DocumentVersionPayload, S>

  type DocumentVersionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DocumentVersionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DocumentVersionCountAggregateInputType | true
    }

  export interface DocumentVersionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DocumentVersion'], meta: { name: 'DocumentVersion' } }
    /**
     * Find zero or one DocumentVersion that matches the filter.
     * @param {DocumentVersionFindUniqueArgs} args - Arguments to find a DocumentVersion
     * @example
     * // Get one DocumentVersion
     * const documentVersion = await prisma.documentVersion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentVersionFindUniqueArgs>(args: SelectSubset<T, DocumentVersionFindUniqueArgs<ExtArgs>>): Prisma__DocumentVersionClient<$Result.GetResult<Prisma.$DocumentVersionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DocumentVersion that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DocumentVersionFindUniqueOrThrowArgs} args - Arguments to find a DocumentVersion
     * @example
     * // Get one DocumentVersion
     * const documentVersion = await prisma.documentVersion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentVersionFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentVersionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentVersionClient<$Result.GetResult<Prisma.$DocumentVersionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DocumentVersion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentVersionFindFirstArgs} args - Arguments to find a DocumentVersion
     * @example
     * // Get one DocumentVersion
     * const documentVersion = await prisma.documentVersion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentVersionFindFirstArgs>(args?: SelectSubset<T, DocumentVersionFindFirstArgs<ExtArgs>>): Prisma__DocumentVersionClient<$Result.GetResult<Prisma.$DocumentVersionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DocumentVersion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentVersionFindFirstOrThrowArgs} args - Arguments to find a DocumentVersion
     * @example
     * // Get one DocumentVersion
     * const documentVersion = await prisma.documentVersion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentVersionFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentVersionFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentVersionClient<$Result.GetResult<Prisma.$DocumentVersionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DocumentVersions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentVersionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DocumentVersions
     * const documentVersions = await prisma.documentVersion.findMany()
     * 
     * // Get first 10 DocumentVersions
     * const documentVersions = await prisma.documentVersion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentVersionWithIdOnly = await prisma.documentVersion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentVersionFindManyArgs>(args?: SelectSubset<T, DocumentVersionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentVersionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DocumentVersion.
     * @param {DocumentVersionCreateArgs} args - Arguments to create a DocumentVersion.
     * @example
     * // Create one DocumentVersion
     * const DocumentVersion = await prisma.documentVersion.create({
     *   data: {
     *     // ... data to create a DocumentVersion
     *   }
     * })
     * 
     */
    create<T extends DocumentVersionCreateArgs>(args: SelectSubset<T, DocumentVersionCreateArgs<ExtArgs>>): Prisma__DocumentVersionClient<$Result.GetResult<Prisma.$DocumentVersionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DocumentVersions.
     * @param {DocumentVersionCreateManyArgs} args - Arguments to create many DocumentVersions.
     * @example
     * // Create many DocumentVersions
     * const documentVersion = await prisma.documentVersion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentVersionCreateManyArgs>(args?: SelectSubset<T, DocumentVersionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a DocumentVersion.
     * @param {DocumentVersionDeleteArgs} args - Arguments to delete one DocumentVersion.
     * @example
     * // Delete one DocumentVersion
     * const DocumentVersion = await prisma.documentVersion.delete({
     *   where: {
     *     // ... filter to delete one DocumentVersion
     *   }
     * })
     * 
     */
    delete<T extends DocumentVersionDeleteArgs>(args: SelectSubset<T, DocumentVersionDeleteArgs<ExtArgs>>): Prisma__DocumentVersionClient<$Result.GetResult<Prisma.$DocumentVersionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DocumentVersion.
     * @param {DocumentVersionUpdateArgs} args - Arguments to update one DocumentVersion.
     * @example
     * // Update one DocumentVersion
     * const documentVersion = await prisma.documentVersion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentVersionUpdateArgs>(args: SelectSubset<T, DocumentVersionUpdateArgs<ExtArgs>>): Prisma__DocumentVersionClient<$Result.GetResult<Prisma.$DocumentVersionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DocumentVersions.
     * @param {DocumentVersionDeleteManyArgs} args - Arguments to filter DocumentVersions to delete.
     * @example
     * // Delete a few DocumentVersions
     * const { count } = await prisma.documentVersion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentVersionDeleteManyArgs>(args?: SelectSubset<T, DocumentVersionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentVersionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DocumentVersions
     * const documentVersion = await prisma.documentVersion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentVersionUpdateManyArgs>(args: SelectSubset<T, DocumentVersionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DocumentVersion.
     * @param {DocumentVersionUpsertArgs} args - Arguments to update or create a DocumentVersion.
     * @example
     * // Update or create a DocumentVersion
     * const documentVersion = await prisma.documentVersion.upsert({
     *   create: {
     *     // ... data to create a DocumentVersion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DocumentVersion we want to update
     *   }
     * })
     */
    upsert<T extends DocumentVersionUpsertArgs>(args: SelectSubset<T, DocumentVersionUpsertArgs<ExtArgs>>): Prisma__DocumentVersionClient<$Result.GetResult<Prisma.$DocumentVersionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DocumentVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentVersionCountArgs} args - Arguments to filter DocumentVersions to count.
     * @example
     * // Count the number of DocumentVersions
     * const count = await prisma.documentVersion.count({
     *   where: {
     *     // ... the filter for the DocumentVersions we want to count
     *   }
     * })
    **/
    count<T extends DocumentVersionCountArgs>(
      args?: Subset<T, DocumentVersionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentVersionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DocumentVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentVersionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DocumentVersionAggregateArgs>(args: Subset<T, DocumentVersionAggregateArgs>): Prisma.PrismaPromise<GetDocumentVersionAggregateType<T>>

    /**
     * Group by DocumentVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentVersionGroupByArgs} args - Group by arguments.
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
      T extends DocumentVersionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentVersionGroupByArgs['orderBy'] }
        : { orderBy?: DocumentVersionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DocumentVersionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentVersionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DocumentVersion model
   */
  readonly fields: DocumentVersionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DocumentVersion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentVersionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    document<T extends DocumentVersion$documentArgs<ExtArgs> = {}>(args?: Subset<T, DocumentVersion$documentArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the DocumentVersion model
   */ 
  interface DocumentVersionFieldRefs {
    readonly id: FieldRef<"DocumentVersion", 'String'>
    readonly documentId: FieldRef<"DocumentVersion", 'String'>
    readonly versionNumber: FieldRef<"DocumentVersion", 'Int'>
    readonly s3Key: FieldRef<"DocumentVersion", 'String'>
    readonly uploadedAt: FieldRef<"DocumentVersion", 'DateTime'>
    readonly uploadedBy: FieldRef<"DocumentVersion", 'String'>
  }
    

  // Custom InputTypes
  /**
   * DocumentVersion findUnique
   */
  export type DocumentVersionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentVersion
     */
    select?: DocumentVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentVersionInclude<ExtArgs> | null
    /**
     * Filter, which DocumentVersion to fetch.
     */
    where: DocumentVersionWhereUniqueInput
  }

  /**
   * DocumentVersion findUniqueOrThrow
   */
  export type DocumentVersionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentVersion
     */
    select?: DocumentVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentVersionInclude<ExtArgs> | null
    /**
     * Filter, which DocumentVersion to fetch.
     */
    where: DocumentVersionWhereUniqueInput
  }

  /**
   * DocumentVersion findFirst
   */
  export type DocumentVersionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentVersion
     */
    select?: DocumentVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentVersionInclude<ExtArgs> | null
    /**
     * Filter, which DocumentVersion to fetch.
     */
    where?: DocumentVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentVersions to fetch.
     */
    orderBy?: DocumentVersionOrderByWithRelationInput | DocumentVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentVersions.
     */
    cursor?: DocumentVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentVersions.
     */
    distinct?: DocumentVersionScalarFieldEnum | DocumentVersionScalarFieldEnum[]
  }

  /**
   * DocumentVersion findFirstOrThrow
   */
  export type DocumentVersionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentVersion
     */
    select?: DocumentVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentVersionInclude<ExtArgs> | null
    /**
     * Filter, which DocumentVersion to fetch.
     */
    where?: DocumentVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentVersions to fetch.
     */
    orderBy?: DocumentVersionOrderByWithRelationInput | DocumentVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentVersions.
     */
    cursor?: DocumentVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentVersions.
     */
    distinct?: DocumentVersionScalarFieldEnum | DocumentVersionScalarFieldEnum[]
  }

  /**
   * DocumentVersion findMany
   */
  export type DocumentVersionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentVersion
     */
    select?: DocumentVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentVersionInclude<ExtArgs> | null
    /**
     * Filter, which DocumentVersions to fetch.
     */
    where?: DocumentVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentVersions to fetch.
     */
    orderBy?: DocumentVersionOrderByWithRelationInput | DocumentVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DocumentVersions.
     */
    cursor?: DocumentVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentVersions.
     */
    skip?: number
    distinct?: DocumentVersionScalarFieldEnum | DocumentVersionScalarFieldEnum[]
  }

  /**
   * DocumentVersion create
   */
  export type DocumentVersionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentVersion
     */
    select?: DocumentVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentVersionInclude<ExtArgs> | null
    /**
     * The data needed to create a DocumentVersion.
     */
    data: XOR<DocumentVersionCreateInput, DocumentVersionUncheckedCreateInput>
  }

  /**
   * DocumentVersion createMany
   */
  export type DocumentVersionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DocumentVersions.
     */
    data: DocumentVersionCreateManyInput | DocumentVersionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DocumentVersion update
   */
  export type DocumentVersionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentVersion
     */
    select?: DocumentVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentVersionInclude<ExtArgs> | null
    /**
     * The data needed to update a DocumentVersion.
     */
    data: XOR<DocumentVersionUpdateInput, DocumentVersionUncheckedUpdateInput>
    /**
     * Choose, which DocumentVersion to update.
     */
    where: DocumentVersionWhereUniqueInput
  }

  /**
   * DocumentVersion updateMany
   */
  export type DocumentVersionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DocumentVersions.
     */
    data: XOR<DocumentVersionUpdateManyMutationInput, DocumentVersionUncheckedUpdateManyInput>
    /**
     * Filter which DocumentVersions to update
     */
    where?: DocumentVersionWhereInput
  }

  /**
   * DocumentVersion upsert
   */
  export type DocumentVersionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentVersion
     */
    select?: DocumentVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentVersionInclude<ExtArgs> | null
    /**
     * The filter to search for the DocumentVersion to update in case it exists.
     */
    where: DocumentVersionWhereUniqueInput
    /**
     * In case the DocumentVersion found by the `where` argument doesn't exist, create a new DocumentVersion with this data.
     */
    create: XOR<DocumentVersionCreateInput, DocumentVersionUncheckedCreateInput>
    /**
     * In case the DocumentVersion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentVersionUpdateInput, DocumentVersionUncheckedUpdateInput>
  }

  /**
   * DocumentVersion delete
   */
  export type DocumentVersionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentVersion
     */
    select?: DocumentVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentVersionInclude<ExtArgs> | null
    /**
     * Filter which DocumentVersion to delete.
     */
    where: DocumentVersionWhereUniqueInput
  }

  /**
   * DocumentVersion deleteMany
   */
  export type DocumentVersionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentVersions to delete
     */
    where?: DocumentVersionWhereInput
  }

  /**
   * DocumentVersion.document
   */
  export type DocumentVersion$documentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
  }

  /**
   * DocumentVersion without action
   */
  export type DocumentVersionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentVersion
     */
    select?: DocumentVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentVersionInclude<ExtArgs> | null
  }


  /**
   * Model DocumentAccessLog
   */

  export type AggregateDocumentAccessLog = {
    _count: DocumentAccessLogCountAggregateOutputType | null
    _min: DocumentAccessLogMinAggregateOutputType | null
    _max: DocumentAccessLogMaxAggregateOutputType | null
  }

  export type DocumentAccessLogMinAggregateOutputType = {
    id: string | null
    documentId: string | null
    accessedBy: string | null
    accessType: string | null
    accessedAt: Date | null
  }

  export type DocumentAccessLogMaxAggregateOutputType = {
    id: string | null
    documentId: string | null
    accessedBy: string | null
    accessType: string | null
    accessedAt: Date | null
  }

  export type DocumentAccessLogCountAggregateOutputType = {
    id: number
    documentId: number
    accessedBy: number
    accessType: number
    accessedAt: number
    _all: number
  }


  export type DocumentAccessLogMinAggregateInputType = {
    id?: true
    documentId?: true
    accessedBy?: true
    accessType?: true
    accessedAt?: true
  }

  export type DocumentAccessLogMaxAggregateInputType = {
    id?: true
    documentId?: true
    accessedBy?: true
    accessType?: true
    accessedAt?: true
  }

  export type DocumentAccessLogCountAggregateInputType = {
    id?: true
    documentId?: true
    accessedBy?: true
    accessType?: true
    accessedAt?: true
    _all?: true
  }

  export type DocumentAccessLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentAccessLog to aggregate.
     */
    where?: DocumentAccessLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentAccessLogs to fetch.
     */
    orderBy?: DocumentAccessLogOrderByWithRelationInput | DocumentAccessLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentAccessLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentAccessLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentAccessLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DocumentAccessLogs
    **/
    _count?: true | DocumentAccessLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentAccessLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentAccessLogMaxAggregateInputType
  }

  export type GetDocumentAccessLogAggregateType<T extends DocumentAccessLogAggregateArgs> = {
        [P in keyof T & keyof AggregateDocumentAccessLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocumentAccessLog[P]>
      : GetScalarType<T[P], AggregateDocumentAccessLog[P]>
  }




  export type DocumentAccessLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentAccessLogWhereInput
    orderBy?: DocumentAccessLogOrderByWithAggregationInput | DocumentAccessLogOrderByWithAggregationInput[]
    by: DocumentAccessLogScalarFieldEnum[] | DocumentAccessLogScalarFieldEnum
    having?: DocumentAccessLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentAccessLogCountAggregateInputType | true
    _min?: DocumentAccessLogMinAggregateInputType
    _max?: DocumentAccessLogMaxAggregateInputType
  }

  export type DocumentAccessLogGroupByOutputType = {
    id: string
    documentId: string | null
    accessedBy: string
    accessType: string
    accessedAt: Date
    _count: DocumentAccessLogCountAggregateOutputType | null
    _min: DocumentAccessLogMinAggregateOutputType | null
    _max: DocumentAccessLogMaxAggregateOutputType | null
  }

  type GetDocumentAccessLogGroupByPayload<T extends DocumentAccessLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentAccessLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentAccessLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentAccessLogGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentAccessLogGroupByOutputType[P]>
        }
      >
    >


  export type DocumentAccessLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    accessedBy?: boolean
    accessType?: boolean
    accessedAt?: boolean
    document?: boolean | DocumentAccessLog$documentArgs<ExtArgs>
  }, ExtArgs["result"]["documentAccessLog"]>


  export type DocumentAccessLogSelectScalar = {
    id?: boolean
    documentId?: boolean
    accessedBy?: boolean
    accessType?: boolean
    accessedAt?: boolean
  }

  export type DocumentAccessLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentAccessLog$documentArgs<ExtArgs>
  }

  export type $DocumentAccessLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DocumentAccessLog"
    objects: {
      document: Prisma.$DocumentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      documentId: string | null
      accessedBy: string
      accessType: string
      accessedAt: Date
    }, ExtArgs["result"]["documentAccessLog"]>
    composites: {}
  }

  type DocumentAccessLogGetPayload<S extends boolean | null | undefined | DocumentAccessLogDefaultArgs> = $Result.GetResult<Prisma.$DocumentAccessLogPayload, S>

  type DocumentAccessLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DocumentAccessLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DocumentAccessLogCountAggregateInputType | true
    }

  export interface DocumentAccessLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DocumentAccessLog'], meta: { name: 'DocumentAccessLog' } }
    /**
     * Find zero or one DocumentAccessLog that matches the filter.
     * @param {DocumentAccessLogFindUniqueArgs} args - Arguments to find a DocumentAccessLog
     * @example
     * // Get one DocumentAccessLog
     * const documentAccessLog = await prisma.documentAccessLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentAccessLogFindUniqueArgs>(args: SelectSubset<T, DocumentAccessLogFindUniqueArgs<ExtArgs>>): Prisma__DocumentAccessLogClient<$Result.GetResult<Prisma.$DocumentAccessLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DocumentAccessLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DocumentAccessLogFindUniqueOrThrowArgs} args - Arguments to find a DocumentAccessLog
     * @example
     * // Get one DocumentAccessLog
     * const documentAccessLog = await prisma.documentAccessLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentAccessLogFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentAccessLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentAccessLogClient<$Result.GetResult<Prisma.$DocumentAccessLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DocumentAccessLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAccessLogFindFirstArgs} args - Arguments to find a DocumentAccessLog
     * @example
     * // Get one DocumentAccessLog
     * const documentAccessLog = await prisma.documentAccessLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentAccessLogFindFirstArgs>(args?: SelectSubset<T, DocumentAccessLogFindFirstArgs<ExtArgs>>): Prisma__DocumentAccessLogClient<$Result.GetResult<Prisma.$DocumentAccessLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DocumentAccessLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAccessLogFindFirstOrThrowArgs} args - Arguments to find a DocumentAccessLog
     * @example
     * // Get one DocumentAccessLog
     * const documentAccessLog = await prisma.documentAccessLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentAccessLogFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentAccessLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentAccessLogClient<$Result.GetResult<Prisma.$DocumentAccessLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DocumentAccessLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAccessLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DocumentAccessLogs
     * const documentAccessLogs = await prisma.documentAccessLog.findMany()
     * 
     * // Get first 10 DocumentAccessLogs
     * const documentAccessLogs = await prisma.documentAccessLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentAccessLogWithIdOnly = await prisma.documentAccessLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentAccessLogFindManyArgs>(args?: SelectSubset<T, DocumentAccessLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentAccessLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DocumentAccessLog.
     * @param {DocumentAccessLogCreateArgs} args - Arguments to create a DocumentAccessLog.
     * @example
     * // Create one DocumentAccessLog
     * const DocumentAccessLog = await prisma.documentAccessLog.create({
     *   data: {
     *     // ... data to create a DocumentAccessLog
     *   }
     * })
     * 
     */
    create<T extends DocumentAccessLogCreateArgs>(args: SelectSubset<T, DocumentAccessLogCreateArgs<ExtArgs>>): Prisma__DocumentAccessLogClient<$Result.GetResult<Prisma.$DocumentAccessLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DocumentAccessLogs.
     * @param {DocumentAccessLogCreateManyArgs} args - Arguments to create many DocumentAccessLogs.
     * @example
     * // Create many DocumentAccessLogs
     * const documentAccessLog = await prisma.documentAccessLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentAccessLogCreateManyArgs>(args?: SelectSubset<T, DocumentAccessLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a DocumentAccessLog.
     * @param {DocumentAccessLogDeleteArgs} args - Arguments to delete one DocumentAccessLog.
     * @example
     * // Delete one DocumentAccessLog
     * const DocumentAccessLog = await prisma.documentAccessLog.delete({
     *   where: {
     *     // ... filter to delete one DocumentAccessLog
     *   }
     * })
     * 
     */
    delete<T extends DocumentAccessLogDeleteArgs>(args: SelectSubset<T, DocumentAccessLogDeleteArgs<ExtArgs>>): Prisma__DocumentAccessLogClient<$Result.GetResult<Prisma.$DocumentAccessLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DocumentAccessLog.
     * @param {DocumentAccessLogUpdateArgs} args - Arguments to update one DocumentAccessLog.
     * @example
     * // Update one DocumentAccessLog
     * const documentAccessLog = await prisma.documentAccessLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentAccessLogUpdateArgs>(args: SelectSubset<T, DocumentAccessLogUpdateArgs<ExtArgs>>): Prisma__DocumentAccessLogClient<$Result.GetResult<Prisma.$DocumentAccessLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DocumentAccessLogs.
     * @param {DocumentAccessLogDeleteManyArgs} args - Arguments to filter DocumentAccessLogs to delete.
     * @example
     * // Delete a few DocumentAccessLogs
     * const { count } = await prisma.documentAccessLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentAccessLogDeleteManyArgs>(args?: SelectSubset<T, DocumentAccessLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentAccessLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAccessLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DocumentAccessLogs
     * const documentAccessLog = await prisma.documentAccessLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentAccessLogUpdateManyArgs>(args: SelectSubset<T, DocumentAccessLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DocumentAccessLog.
     * @param {DocumentAccessLogUpsertArgs} args - Arguments to update or create a DocumentAccessLog.
     * @example
     * // Update or create a DocumentAccessLog
     * const documentAccessLog = await prisma.documentAccessLog.upsert({
     *   create: {
     *     // ... data to create a DocumentAccessLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DocumentAccessLog we want to update
     *   }
     * })
     */
    upsert<T extends DocumentAccessLogUpsertArgs>(args: SelectSubset<T, DocumentAccessLogUpsertArgs<ExtArgs>>): Prisma__DocumentAccessLogClient<$Result.GetResult<Prisma.$DocumentAccessLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DocumentAccessLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAccessLogCountArgs} args - Arguments to filter DocumentAccessLogs to count.
     * @example
     * // Count the number of DocumentAccessLogs
     * const count = await prisma.documentAccessLog.count({
     *   where: {
     *     // ... the filter for the DocumentAccessLogs we want to count
     *   }
     * })
    **/
    count<T extends DocumentAccessLogCountArgs>(
      args?: Subset<T, DocumentAccessLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentAccessLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DocumentAccessLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAccessLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DocumentAccessLogAggregateArgs>(args: Subset<T, DocumentAccessLogAggregateArgs>): Prisma.PrismaPromise<GetDocumentAccessLogAggregateType<T>>

    /**
     * Group by DocumentAccessLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAccessLogGroupByArgs} args - Group by arguments.
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
      T extends DocumentAccessLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentAccessLogGroupByArgs['orderBy'] }
        : { orderBy?: DocumentAccessLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DocumentAccessLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentAccessLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DocumentAccessLog model
   */
  readonly fields: DocumentAccessLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DocumentAccessLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentAccessLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    document<T extends DocumentAccessLog$documentArgs<ExtArgs> = {}>(args?: Subset<T, DocumentAccessLog$documentArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the DocumentAccessLog model
   */ 
  interface DocumentAccessLogFieldRefs {
    readonly id: FieldRef<"DocumentAccessLog", 'String'>
    readonly documentId: FieldRef<"DocumentAccessLog", 'String'>
    readonly accessedBy: FieldRef<"DocumentAccessLog", 'String'>
    readonly accessType: FieldRef<"DocumentAccessLog", 'String'>
    readonly accessedAt: FieldRef<"DocumentAccessLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DocumentAccessLog findUnique
   */
  export type DocumentAccessLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentAccessLog
     */
    select?: DocumentAccessLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentAccessLogInclude<ExtArgs> | null
    /**
     * Filter, which DocumentAccessLog to fetch.
     */
    where: DocumentAccessLogWhereUniqueInput
  }

  /**
   * DocumentAccessLog findUniqueOrThrow
   */
  export type DocumentAccessLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentAccessLog
     */
    select?: DocumentAccessLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentAccessLogInclude<ExtArgs> | null
    /**
     * Filter, which DocumentAccessLog to fetch.
     */
    where: DocumentAccessLogWhereUniqueInput
  }

  /**
   * DocumentAccessLog findFirst
   */
  export type DocumentAccessLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentAccessLog
     */
    select?: DocumentAccessLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentAccessLogInclude<ExtArgs> | null
    /**
     * Filter, which DocumentAccessLog to fetch.
     */
    where?: DocumentAccessLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentAccessLogs to fetch.
     */
    orderBy?: DocumentAccessLogOrderByWithRelationInput | DocumentAccessLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentAccessLogs.
     */
    cursor?: DocumentAccessLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentAccessLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentAccessLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentAccessLogs.
     */
    distinct?: DocumentAccessLogScalarFieldEnum | DocumentAccessLogScalarFieldEnum[]
  }

  /**
   * DocumentAccessLog findFirstOrThrow
   */
  export type DocumentAccessLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentAccessLog
     */
    select?: DocumentAccessLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentAccessLogInclude<ExtArgs> | null
    /**
     * Filter, which DocumentAccessLog to fetch.
     */
    where?: DocumentAccessLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentAccessLogs to fetch.
     */
    orderBy?: DocumentAccessLogOrderByWithRelationInput | DocumentAccessLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentAccessLogs.
     */
    cursor?: DocumentAccessLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentAccessLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentAccessLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentAccessLogs.
     */
    distinct?: DocumentAccessLogScalarFieldEnum | DocumentAccessLogScalarFieldEnum[]
  }

  /**
   * DocumentAccessLog findMany
   */
  export type DocumentAccessLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentAccessLog
     */
    select?: DocumentAccessLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentAccessLogInclude<ExtArgs> | null
    /**
     * Filter, which DocumentAccessLogs to fetch.
     */
    where?: DocumentAccessLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentAccessLogs to fetch.
     */
    orderBy?: DocumentAccessLogOrderByWithRelationInput | DocumentAccessLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DocumentAccessLogs.
     */
    cursor?: DocumentAccessLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentAccessLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentAccessLogs.
     */
    skip?: number
    distinct?: DocumentAccessLogScalarFieldEnum | DocumentAccessLogScalarFieldEnum[]
  }

  /**
   * DocumentAccessLog create
   */
  export type DocumentAccessLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentAccessLog
     */
    select?: DocumentAccessLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentAccessLogInclude<ExtArgs> | null
    /**
     * The data needed to create a DocumentAccessLog.
     */
    data: XOR<DocumentAccessLogCreateInput, DocumentAccessLogUncheckedCreateInput>
  }

  /**
   * DocumentAccessLog createMany
   */
  export type DocumentAccessLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DocumentAccessLogs.
     */
    data: DocumentAccessLogCreateManyInput | DocumentAccessLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DocumentAccessLog update
   */
  export type DocumentAccessLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentAccessLog
     */
    select?: DocumentAccessLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentAccessLogInclude<ExtArgs> | null
    /**
     * The data needed to update a DocumentAccessLog.
     */
    data: XOR<DocumentAccessLogUpdateInput, DocumentAccessLogUncheckedUpdateInput>
    /**
     * Choose, which DocumentAccessLog to update.
     */
    where: DocumentAccessLogWhereUniqueInput
  }

  /**
   * DocumentAccessLog updateMany
   */
  export type DocumentAccessLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DocumentAccessLogs.
     */
    data: XOR<DocumentAccessLogUpdateManyMutationInput, DocumentAccessLogUncheckedUpdateManyInput>
    /**
     * Filter which DocumentAccessLogs to update
     */
    where?: DocumentAccessLogWhereInput
  }

  /**
   * DocumentAccessLog upsert
   */
  export type DocumentAccessLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentAccessLog
     */
    select?: DocumentAccessLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentAccessLogInclude<ExtArgs> | null
    /**
     * The filter to search for the DocumentAccessLog to update in case it exists.
     */
    where: DocumentAccessLogWhereUniqueInput
    /**
     * In case the DocumentAccessLog found by the `where` argument doesn't exist, create a new DocumentAccessLog with this data.
     */
    create: XOR<DocumentAccessLogCreateInput, DocumentAccessLogUncheckedCreateInput>
    /**
     * In case the DocumentAccessLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentAccessLogUpdateInput, DocumentAccessLogUncheckedUpdateInput>
  }

  /**
   * DocumentAccessLog delete
   */
  export type DocumentAccessLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentAccessLog
     */
    select?: DocumentAccessLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentAccessLogInclude<ExtArgs> | null
    /**
     * Filter which DocumentAccessLog to delete.
     */
    where: DocumentAccessLogWhereUniqueInput
  }

  /**
   * DocumentAccessLog deleteMany
   */
  export type DocumentAccessLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentAccessLogs to delete
     */
    where?: DocumentAccessLogWhereInput
  }

  /**
   * DocumentAccessLog.document
   */
  export type DocumentAccessLog$documentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
  }

  /**
   * DocumentAccessLog without action
   */
  export type DocumentAccessLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentAccessLog
     */
    select?: DocumentAccessLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentAccessLogInclude<ExtArgs> | null
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


  export const CustomerScalarFieldEnum: {
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

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const CustomerKycScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    panNumber: 'panNumber',
    aadhaarNumber: 'aadhaarNumber',
    kycStatus: 'kycStatus',
    verifiedAt: 'verifiedAt'
  };

  export type CustomerKycScalarFieldEnum = (typeof CustomerKycScalarFieldEnum)[keyof typeof CustomerKycScalarFieldEnum]


  export const CustomerAddressScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    addressType: 'addressType',
    street: 'street',
    city: 'city',
    state: 'state',
    pincode: 'pincode',
    isPrimary: 'isPrimary'
  };

  export type CustomerAddressScalarFieldEnum = (typeof CustomerAddressScalarFieldEnum)[keyof typeof CustomerAddressScalarFieldEnum]


  export const CustomerHistoryScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    action: 'action',
    description: 'description',
    actionAt: 'actionAt',
    actionBy: 'actionBy'
  };

  export type CustomerHistoryScalarFieldEnum = (typeof CustomerHistoryScalarFieldEnum)[keyof typeof CustomerHistoryScalarFieldEnum]


  export const LeadScalarFieldEnum: {
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
    companyName: 'companyName'
  };

  export type LeadScalarFieldEnum = (typeof LeadScalarFieldEnum)[keyof typeof LeadScalarFieldEnum]


  export const DocumentScalarFieldEnum: {
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

  export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum]


  export const DocumentVersionScalarFieldEnum: {
    id: 'id',
    documentId: 'documentId',
    versionNumber: 'versionNumber',
    s3Key: 's3Key',
    uploadedAt: 'uploadedAt',
    uploadedBy: 'uploadedBy'
  };

  export type DocumentVersionScalarFieldEnum = (typeof DocumentVersionScalarFieldEnum)[keyof typeof DocumentVersionScalarFieldEnum]


  export const DocumentAccessLogScalarFieldEnum: {
    id: 'id',
    documentId: 'documentId',
    accessedBy: 'accessedBy',
    accessType: 'accessType',
    accessedAt: 'accessedAt'
  };

  export type DocumentAccessLogScalarFieldEnum = (typeof DocumentAccessLogScalarFieldEnum)[keyof typeof DocumentAccessLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


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


  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: StringFilter<"Customer"> | string
    firstName?: StringFilter<"Customer"> | string
    lastName?: StringFilter<"Customer"> | string
    email?: StringFilter<"Customer"> | string
    mobile?: StringFilter<"Customer"> | string
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Customer"> | Date | string | null
    createdBy?: StringNullableFilter<"Customer"> | string | null
    updatedBy?: StringNullableFilter<"Customer"> | string | null
    kyc?: XOR<CustomerKycNullableRelationFilter, CustomerKycWhereInput> | null
    addresses?: CustomerAddressListRelationFilter
    history?: CustomerHistoryListRelationFilter
    leads?: LeadListRelationFilter
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    mobile?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    kyc?: CustomerKycOrderByWithRelationInput
    addresses?: CustomerAddressOrderByRelationAggregateInput
    history?: CustomerHistoryOrderByRelationAggregateInput
    leads?: LeadOrderByRelationAggregateInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    mobile?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    firstName?: StringFilter<"Customer"> | string
    lastName?: StringFilter<"Customer"> | string
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Customer"> | Date | string | null
    createdBy?: StringNullableFilter<"Customer"> | string | null
    updatedBy?: StringNullableFilter<"Customer"> | string | null
    kyc?: XOR<CustomerKycNullableRelationFilter, CustomerKycWhereInput> | null
    addresses?: CustomerAddressListRelationFilter
    history?: CustomerHistoryListRelationFilter
    leads?: LeadListRelationFilter
  }, "id" | "email" | "mobile">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    mobile?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Customer"> | string
    firstName?: StringWithAggregatesFilter<"Customer"> | string
    lastName?: StringWithAggregatesFilter<"Customer"> | string
    email?: StringWithAggregatesFilter<"Customer"> | string
    mobile?: StringWithAggregatesFilter<"Customer"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Customer"> | Date | string | null
    createdBy?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"Customer"> | string | null
  }

  export type CustomerKycWhereInput = {
    AND?: CustomerKycWhereInput | CustomerKycWhereInput[]
    OR?: CustomerKycWhereInput[]
    NOT?: CustomerKycWhereInput | CustomerKycWhereInput[]
    id?: StringFilter<"CustomerKyc"> | string
    customerId?: StringNullableFilter<"CustomerKyc"> | string | null
    panNumber?: StringFilter<"CustomerKyc"> | string
    aadhaarNumber?: StringNullableFilter<"CustomerKyc"> | string | null
    kycStatus?: StringFilter<"CustomerKyc"> | string
    verifiedAt?: DateTimeNullableFilter<"CustomerKyc"> | Date | string | null
    customer?: XOR<CustomerNullableRelationFilter, CustomerWhereInput> | null
  }

  export type CustomerKycOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrderInput | SortOrder
    panNumber?: SortOrder
    aadhaarNumber?: SortOrderInput | SortOrder
    kycStatus?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    customer?: CustomerOrderByWithRelationInput
  }

  export type CustomerKycWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    customerId?: string
    panNumber?: string
    aadhaarNumber?: string
    AND?: CustomerKycWhereInput | CustomerKycWhereInput[]
    OR?: CustomerKycWhereInput[]
    NOT?: CustomerKycWhereInput | CustomerKycWhereInput[]
    kycStatus?: StringFilter<"CustomerKyc"> | string
    verifiedAt?: DateTimeNullableFilter<"CustomerKyc"> | Date | string | null
    customer?: XOR<CustomerNullableRelationFilter, CustomerWhereInput> | null
  }, "id" | "customerId" | "panNumber" | "aadhaarNumber">

  export type CustomerKycOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrderInput | SortOrder
    panNumber?: SortOrder
    aadhaarNumber?: SortOrderInput | SortOrder
    kycStatus?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    _count?: CustomerKycCountOrderByAggregateInput
    _max?: CustomerKycMaxOrderByAggregateInput
    _min?: CustomerKycMinOrderByAggregateInput
  }

  export type CustomerKycScalarWhereWithAggregatesInput = {
    AND?: CustomerKycScalarWhereWithAggregatesInput | CustomerKycScalarWhereWithAggregatesInput[]
    OR?: CustomerKycScalarWhereWithAggregatesInput[]
    NOT?: CustomerKycScalarWhereWithAggregatesInput | CustomerKycScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CustomerKyc"> | string
    customerId?: StringNullableWithAggregatesFilter<"CustomerKyc"> | string | null
    panNumber?: StringWithAggregatesFilter<"CustomerKyc"> | string
    aadhaarNumber?: StringNullableWithAggregatesFilter<"CustomerKyc"> | string | null
    kycStatus?: StringWithAggregatesFilter<"CustomerKyc"> | string
    verifiedAt?: DateTimeNullableWithAggregatesFilter<"CustomerKyc"> | Date | string | null
  }

  export type CustomerAddressWhereInput = {
    AND?: CustomerAddressWhereInput | CustomerAddressWhereInput[]
    OR?: CustomerAddressWhereInput[]
    NOT?: CustomerAddressWhereInput | CustomerAddressWhereInput[]
    id?: StringFilter<"CustomerAddress"> | string
    customerId?: StringNullableFilter<"CustomerAddress"> | string | null
    addressType?: StringFilter<"CustomerAddress"> | string
    street?: StringFilter<"CustomerAddress"> | string
    city?: StringFilter<"CustomerAddress"> | string
    state?: StringFilter<"CustomerAddress"> | string
    pincode?: StringFilter<"CustomerAddress"> | string
    isPrimary?: BoolFilter<"CustomerAddress"> | boolean
    customer?: XOR<CustomerNullableRelationFilter, CustomerWhereInput> | null
  }

  export type CustomerAddressOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrderInput | SortOrder
    addressType?: SortOrder
    street?: SortOrder
    city?: SortOrder
    state?: SortOrder
    pincode?: SortOrder
    isPrimary?: SortOrder
    customer?: CustomerOrderByWithRelationInput
  }

  export type CustomerAddressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CustomerAddressWhereInput | CustomerAddressWhereInput[]
    OR?: CustomerAddressWhereInput[]
    NOT?: CustomerAddressWhereInput | CustomerAddressWhereInput[]
    customerId?: StringNullableFilter<"CustomerAddress"> | string | null
    addressType?: StringFilter<"CustomerAddress"> | string
    street?: StringFilter<"CustomerAddress"> | string
    city?: StringFilter<"CustomerAddress"> | string
    state?: StringFilter<"CustomerAddress"> | string
    pincode?: StringFilter<"CustomerAddress"> | string
    isPrimary?: BoolFilter<"CustomerAddress"> | boolean
    customer?: XOR<CustomerNullableRelationFilter, CustomerWhereInput> | null
  }, "id">

  export type CustomerAddressOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrderInput | SortOrder
    addressType?: SortOrder
    street?: SortOrder
    city?: SortOrder
    state?: SortOrder
    pincode?: SortOrder
    isPrimary?: SortOrder
    _count?: CustomerAddressCountOrderByAggregateInput
    _max?: CustomerAddressMaxOrderByAggregateInput
    _min?: CustomerAddressMinOrderByAggregateInput
  }

  export type CustomerAddressScalarWhereWithAggregatesInput = {
    AND?: CustomerAddressScalarWhereWithAggregatesInput | CustomerAddressScalarWhereWithAggregatesInput[]
    OR?: CustomerAddressScalarWhereWithAggregatesInput[]
    NOT?: CustomerAddressScalarWhereWithAggregatesInput | CustomerAddressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CustomerAddress"> | string
    customerId?: StringNullableWithAggregatesFilter<"CustomerAddress"> | string | null
    addressType?: StringWithAggregatesFilter<"CustomerAddress"> | string
    street?: StringWithAggregatesFilter<"CustomerAddress"> | string
    city?: StringWithAggregatesFilter<"CustomerAddress"> | string
    state?: StringWithAggregatesFilter<"CustomerAddress"> | string
    pincode?: StringWithAggregatesFilter<"CustomerAddress"> | string
    isPrimary?: BoolWithAggregatesFilter<"CustomerAddress"> | boolean
  }

  export type CustomerHistoryWhereInput = {
    AND?: CustomerHistoryWhereInput | CustomerHistoryWhereInput[]
    OR?: CustomerHistoryWhereInput[]
    NOT?: CustomerHistoryWhereInput | CustomerHistoryWhereInput[]
    id?: StringFilter<"CustomerHistory"> | string
    customerId?: StringNullableFilter<"CustomerHistory"> | string | null
    action?: StringFilter<"CustomerHistory"> | string
    description?: StringNullableFilter<"CustomerHistory"> | string | null
    actionAt?: DateTimeFilter<"CustomerHistory"> | Date | string
    actionBy?: StringNullableFilter<"CustomerHistory"> | string | null
    customer?: XOR<CustomerNullableRelationFilter, CustomerWhereInput> | null
  }

  export type CustomerHistoryOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrderInput | SortOrder
    action?: SortOrder
    description?: SortOrderInput | SortOrder
    actionAt?: SortOrder
    actionBy?: SortOrderInput | SortOrder
    customer?: CustomerOrderByWithRelationInput
  }

  export type CustomerHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CustomerHistoryWhereInput | CustomerHistoryWhereInput[]
    OR?: CustomerHistoryWhereInput[]
    NOT?: CustomerHistoryWhereInput | CustomerHistoryWhereInput[]
    customerId?: StringNullableFilter<"CustomerHistory"> | string | null
    action?: StringFilter<"CustomerHistory"> | string
    description?: StringNullableFilter<"CustomerHistory"> | string | null
    actionAt?: DateTimeFilter<"CustomerHistory"> | Date | string
    actionBy?: StringNullableFilter<"CustomerHistory"> | string | null
    customer?: XOR<CustomerNullableRelationFilter, CustomerWhereInput> | null
  }, "id">

  export type CustomerHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrderInput | SortOrder
    action?: SortOrder
    description?: SortOrderInput | SortOrder
    actionAt?: SortOrder
    actionBy?: SortOrderInput | SortOrder
    _count?: CustomerHistoryCountOrderByAggregateInput
    _max?: CustomerHistoryMaxOrderByAggregateInput
    _min?: CustomerHistoryMinOrderByAggregateInput
  }

  export type CustomerHistoryScalarWhereWithAggregatesInput = {
    AND?: CustomerHistoryScalarWhereWithAggregatesInput | CustomerHistoryScalarWhereWithAggregatesInput[]
    OR?: CustomerHistoryScalarWhereWithAggregatesInput[]
    NOT?: CustomerHistoryScalarWhereWithAggregatesInput | CustomerHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CustomerHistory"> | string
    customerId?: StringNullableWithAggregatesFilter<"CustomerHistory"> | string | null
    action?: StringWithAggregatesFilter<"CustomerHistory"> | string
    description?: StringNullableWithAggregatesFilter<"CustomerHistory"> | string | null
    actionAt?: DateTimeWithAggregatesFilter<"CustomerHistory"> | Date | string
    actionBy?: StringNullableWithAggregatesFilter<"CustomerHistory"> | string | null
  }

  export type LeadWhereInput = {
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    id?: StringFilter<"Lead"> | string
    firstName?: StringFilter<"Lead"> | string
    lastName?: StringFilter<"Lead"> | string
    email?: StringFilter<"Lead"> | string
    mobile?: StringFilter<"Lead"> | string
    panNumber?: StringFilter<"Lead"> | string
    aadhaarNumber?: StringNullableFilter<"Lead"> | string | null
    loanType?: StringNullableFilter<"Lead"> | string | null
    loanAmount?: DecimalNullableFilter<"Lead"> | Decimal | DecimalJsLike | number | string | null
    assignedTo?: StringNullableFilter<"Lead"> | string | null
    status?: StringFilter<"Lead"> | string
    customerId?: StringNullableFilter<"Lead"> | string | null
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    profession?: StringNullableFilter<"Lead"> | string | null
    netMonthlySalary?: DecimalNullableFilter<"Lead"> | Decimal | DecimalJsLike | number | string | null
    gender?: StringNullableFilter<"Lead"> | string | null
    maritalStatus?: StringNullableFilter<"Lead"> | string | null
    dob?: StringNullableFilter<"Lead"> | string | null
    alternateContact?: StringNullableFilter<"Lead"> | string | null
    whatsappNo?: StringNullableFilter<"Lead"> | string | null
    officialEmail?: StringNullableFilter<"Lead"> | string | null
    currentAddressLine1?: StringNullableFilter<"Lead"> | string | null
    currentAddressLine2?: StringNullableFilter<"Lead"> | string | null
    currentState?: StringNullableFilter<"Lead"> | string | null
    currentDistrict?: StringNullableFilter<"Lead"> | string | null
    currentCity?: StringNullableFilter<"Lead"> | string | null
    currentPincode?: StringNullableFilter<"Lead"> | string | null
    residenceType?: StringNullableFilter<"Lead"> | string | null
    permanentAddressLine1?: StringNullableFilter<"Lead"> | string | null
    permanentAddressLine2?: StringNullableFilter<"Lead"> | string | null
    permanentState?: StringNullableFilter<"Lead"> | string | null
    permanentDistrict?: StringNullableFilter<"Lead"> | string | null
    permanentCity?: StringNullableFilter<"Lead"> | string | null
    permanentPincode?: StringNullableFilter<"Lead"> | string | null
    jobType?: StringNullableFilter<"Lead"> | string | null
    designation?: StringNullableFilter<"Lead"> | string | null
    modeOfSalary?: StringNullableFilter<"Lead"> | string | null
    officeAddress?: StringNullableFilter<"Lead"> | string | null
    officeState?: StringNullableFilter<"Lead"> | string | null
    officeDistrict?: StringNullableFilter<"Lead"> | string | null
    officeCity?: StringNullableFilter<"Lead"> | string | null
    officePincode?: StringNullableFilter<"Lead"> | string | null
    existingEmi?: DecimalNullableFilter<"Lead"> | Decimal | DecimalJsLike | number | string | null
    hasPriorPersonalLoan?: BoolNullableFilter<"Lead"> | boolean | null
    opsNotes?: StringNullableFilter<"Lead"> | string | null
    companyName?: StringNullableFilter<"Lead"> | string | null
    customer?: XOR<CustomerNullableRelationFilter, CustomerWhereInput> | null
  }

  export type LeadOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    mobile?: SortOrder
    panNumber?: SortOrder
    aadhaarNumber?: SortOrderInput | SortOrder
    loanType?: SortOrderInput | SortOrder
    loanAmount?: SortOrderInput | SortOrder
    assignedTo?: SortOrderInput | SortOrder
    status?: SortOrder
    customerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    profession?: SortOrderInput | SortOrder
    netMonthlySalary?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    maritalStatus?: SortOrderInput | SortOrder
    dob?: SortOrderInput | SortOrder
    alternateContact?: SortOrderInput | SortOrder
    whatsappNo?: SortOrderInput | SortOrder
    officialEmail?: SortOrderInput | SortOrder
    currentAddressLine1?: SortOrderInput | SortOrder
    currentAddressLine2?: SortOrderInput | SortOrder
    currentState?: SortOrderInput | SortOrder
    currentDistrict?: SortOrderInput | SortOrder
    currentCity?: SortOrderInput | SortOrder
    currentPincode?: SortOrderInput | SortOrder
    residenceType?: SortOrderInput | SortOrder
    permanentAddressLine1?: SortOrderInput | SortOrder
    permanentAddressLine2?: SortOrderInput | SortOrder
    permanentState?: SortOrderInput | SortOrder
    permanentDistrict?: SortOrderInput | SortOrder
    permanentCity?: SortOrderInput | SortOrder
    permanentPincode?: SortOrderInput | SortOrder
    jobType?: SortOrderInput | SortOrder
    designation?: SortOrderInput | SortOrder
    modeOfSalary?: SortOrderInput | SortOrder
    officeAddress?: SortOrderInput | SortOrder
    officeState?: SortOrderInput | SortOrder
    officeDistrict?: SortOrderInput | SortOrder
    officeCity?: SortOrderInput | SortOrder
    officePincode?: SortOrderInput | SortOrder
    existingEmi?: SortOrderInput | SortOrder
    hasPriorPersonalLoan?: SortOrderInput | SortOrder
    opsNotes?: SortOrderInput | SortOrder
    companyName?: SortOrderInput | SortOrder
    customer?: CustomerOrderByWithRelationInput
  }

  export type LeadWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    firstName?: StringFilter<"Lead"> | string
    lastName?: StringFilter<"Lead"> | string
    email?: StringFilter<"Lead"> | string
    mobile?: StringFilter<"Lead"> | string
    panNumber?: StringFilter<"Lead"> | string
    aadhaarNumber?: StringNullableFilter<"Lead"> | string | null
    loanType?: StringNullableFilter<"Lead"> | string | null
    loanAmount?: DecimalNullableFilter<"Lead"> | Decimal | DecimalJsLike | number | string | null
    assignedTo?: StringNullableFilter<"Lead"> | string | null
    status?: StringFilter<"Lead"> | string
    customerId?: StringNullableFilter<"Lead"> | string | null
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    profession?: StringNullableFilter<"Lead"> | string | null
    netMonthlySalary?: DecimalNullableFilter<"Lead"> | Decimal | DecimalJsLike | number | string | null
    gender?: StringNullableFilter<"Lead"> | string | null
    maritalStatus?: StringNullableFilter<"Lead"> | string | null
    dob?: StringNullableFilter<"Lead"> | string | null
    alternateContact?: StringNullableFilter<"Lead"> | string | null
    whatsappNo?: StringNullableFilter<"Lead"> | string | null
    officialEmail?: StringNullableFilter<"Lead"> | string | null
    currentAddressLine1?: StringNullableFilter<"Lead"> | string | null
    currentAddressLine2?: StringNullableFilter<"Lead"> | string | null
    currentState?: StringNullableFilter<"Lead"> | string | null
    currentDistrict?: StringNullableFilter<"Lead"> | string | null
    currentCity?: StringNullableFilter<"Lead"> | string | null
    currentPincode?: StringNullableFilter<"Lead"> | string | null
    residenceType?: StringNullableFilter<"Lead"> | string | null
    permanentAddressLine1?: StringNullableFilter<"Lead"> | string | null
    permanentAddressLine2?: StringNullableFilter<"Lead"> | string | null
    permanentState?: StringNullableFilter<"Lead"> | string | null
    permanentDistrict?: StringNullableFilter<"Lead"> | string | null
    permanentCity?: StringNullableFilter<"Lead"> | string | null
    permanentPincode?: StringNullableFilter<"Lead"> | string | null
    jobType?: StringNullableFilter<"Lead"> | string | null
    designation?: StringNullableFilter<"Lead"> | string | null
    modeOfSalary?: StringNullableFilter<"Lead"> | string | null
    officeAddress?: StringNullableFilter<"Lead"> | string | null
    officeState?: StringNullableFilter<"Lead"> | string | null
    officeDistrict?: StringNullableFilter<"Lead"> | string | null
    officeCity?: StringNullableFilter<"Lead"> | string | null
    officePincode?: StringNullableFilter<"Lead"> | string | null
    existingEmi?: DecimalNullableFilter<"Lead"> | Decimal | DecimalJsLike | number | string | null
    hasPriorPersonalLoan?: BoolNullableFilter<"Lead"> | boolean | null
    opsNotes?: StringNullableFilter<"Lead"> | string | null
    companyName?: StringNullableFilter<"Lead"> | string | null
    customer?: XOR<CustomerNullableRelationFilter, CustomerWhereInput> | null
  }, "id">

  export type LeadOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    mobile?: SortOrder
    panNumber?: SortOrder
    aadhaarNumber?: SortOrderInput | SortOrder
    loanType?: SortOrderInput | SortOrder
    loanAmount?: SortOrderInput | SortOrder
    assignedTo?: SortOrderInput | SortOrder
    status?: SortOrder
    customerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    profession?: SortOrderInput | SortOrder
    netMonthlySalary?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    maritalStatus?: SortOrderInput | SortOrder
    dob?: SortOrderInput | SortOrder
    alternateContact?: SortOrderInput | SortOrder
    whatsappNo?: SortOrderInput | SortOrder
    officialEmail?: SortOrderInput | SortOrder
    currentAddressLine1?: SortOrderInput | SortOrder
    currentAddressLine2?: SortOrderInput | SortOrder
    currentState?: SortOrderInput | SortOrder
    currentDistrict?: SortOrderInput | SortOrder
    currentCity?: SortOrderInput | SortOrder
    currentPincode?: SortOrderInput | SortOrder
    residenceType?: SortOrderInput | SortOrder
    permanentAddressLine1?: SortOrderInput | SortOrder
    permanentAddressLine2?: SortOrderInput | SortOrder
    permanentState?: SortOrderInput | SortOrder
    permanentDistrict?: SortOrderInput | SortOrder
    permanentCity?: SortOrderInput | SortOrder
    permanentPincode?: SortOrderInput | SortOrder
    jobType?: SortOrderInput | SortOrder
    designation?: SortOrderInput | SortOrder
    modeOfSalary?: SortOrderInput | SortOrder
    officeAddress?: SortOrderInput | SortOrder
    officeState?: SortOrderInput | SortOrder
    officeDistrict?: SortOrderInput | SortOrder
    officeCity?: SortOrderInput | SortOrder
    officePincode?: SortOrderInput | SortOrder
    existingEmi?: SortOrderInput | SortOrder
    hasPriorPersonalLoan?: SortOrderInput | SortOrder
    opsNotes?: SortOrderInput | SortOrder
    companyName?: SortOrderInput | SortOrder
    _count?: LeadCountOrderByAggregateInput
    _avg?: LeadAvgOrderByAggregateInput
    _max?: LeadMaxOrderByAggregateInput
    _min?: LeadMinOrderByAggregateInput
    _sum?: LeadSumOrderByAggregateInput
  }

  export type LeadScalarWhereWithAggregatesInput = {
    AND?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    OR?: LeadScalarWhereWithAggregatesInput[]
    NOT?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Lead"> | string
    firstName?: StringWithAggregatesFilter<"Lead"> | string
    lastName?: StringWithAggregatesFilter<"Lead"> | string
    email?: StringWithAggregatesFilter<"Lead"> | string
    mobile?: StringWithAggregatesFilter<"Lead"> | string
    panNumber?: StringWithAggregatesFilter<"Lead"> | string
    aadhaarNumber?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    loanType?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    loanAmount?: DecimalNullableWithAggregatesFilter<"Lead"> | Decimal | DecimalJsLike | number | string | null
    assignedTo?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    status?: StringWithAggregatesFilter<"Lead"> | string
    customerId?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
    profession?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    netMonthlySalary?: DecimalNullableWithAggregatesFilter<"Lead"> | Decimal | DecimalJsLike | number | string | null
    gender?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    maritalStatus?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    dob?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    alternateContact?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    whatsappNo?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    officialEmail?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    currentAddressLine1?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    currentAddressLine2?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    currentState?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    currentDistrict?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    currentCity?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    currentPincode?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    residenceType?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    permanentAddressLine1?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    permanentAddressLine2?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    permanentState?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    permanentDistrict?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    permanentCity?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    permanentPincode?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    jobType?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    designation?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    modeOfSalary?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    officeAddress?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    officeState?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    officeDistrict?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    officeCity?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    officePincode?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    existingEmi?: DecimalNullableWithAggregatesFilter<"Lead"> | Decimal | DecimalJsLike | number | string | null
    hasPriorPersonalLoan?: BoolNullableWithAggregatesFilter<"Lead"> | boolean | null
    opsNotes?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    companyName?: StringNullableWithAggregatesFilter<"Lead"> | string | null
  }

  export type DocumentWhereInput = {
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    id?: StringFilter<"Document"> | string
    loanId?: StringNullableFilter<"Document"> | string | null
    uploadedBy?: StringFilter<"Document"> | string
    documentType?: StringFilter<"Document"> | string
    s3Key?: StringFilter<"Document"> | string
    fileName?: StringFilter<"Document"> | string
    mimeType?: StringFilter<"Document"> | string
    fileSizeBytes?: BigIntNullableFilter<"Document"> | bigint | number | null
    status?: StringFilter<"Document"> | string
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    ownerId?: StringNullableFilter<"Document"> | string | null
    folderPath?: StringFilter<"Document"> | string
    reviewerId?: StringNullableFilter<"Document"> | string | null
    reviewRemarks?: StringNullableFilter<"Document"> | string | null
    reviewedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    versions?: DocumentVersionListRelationFilter
    accessLogs?: DocumentAccessLogListRelationFilter
  }

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder
    loanId?: SortOrderInput | SortOrder
    uploadedBy?: SortOrder
    documentType?: SortOrder
    s3Key?: SortOrder
    fileName?: SortOrder
    mimeType?: SortOrder
    fileSizeBytes?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    ownerId?: SortOrderInput | SortOrder
    folderPath?: SortOrder
    reviewerId?: SortOrderInput | SortOrder
    reviewRemarks?: SortOrderInput | SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    versions?: DocumentVersionOrderByRelationAggregateInput
    accessLogs?: DocumentAccessLogOrderByRelationAggregateInput
  }

  export type DocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    loanId?: StringNullableFilter<"Document"> | string | null
    uploadedBy?: StringFilter<"Document"> | string
    documentType?: StringFilter<"Document"> | string
    s3Key?: StringFilter<"Document"> | string
    fileName?: StringFilter<"Document"> | string
    mimeType?: StringFilter<"Document"> | string
    fileSizeBytes?: BigIntNullableFilter<"Document"> | bigint | number | null
    status?: StringFilter<"Document"> | string
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    ownerId?: StringNullableFilter<"Document"> | string | null
    folderPath?: StringFilter<"Document"> | string
    reviewerId?: StringNullableFilter<"Document"> | string | null
    reviewRemarks?: StringNullableFilter<"Document"> | string | null
    reviewedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    versions?: DocumentVersionListRelationFilter
    accessLogs?: DocumentAccessLogListRelationFilter
  }, "id">

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder
    loanId?: SortOrderInput | SortOrder
    uploadedBy?: SortOrder
    documentType?: SortOrder
    s3Key?: SortOrder
    fileName?: SortOrder
    mimeType?: SortOrder
    fileSizeBytes?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    ownerId?: SortOrderInput | SortOrder
    folderPath?: SortOrder
    reviewerId?: SortOrderInput | SortOrder
    reviewRemarks?: SortOrderInput | SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    _count?: DocumentCountOrderByAggregateInput
    _avg?: DocumentAvgOrderByAggregateInput
    _max?: DocumentMaxOrderByAggregateInput
    _min?: DocumentMinOrderByAggregateInput
    _sum?: DocumentSumOrderByAggregateInput
  }

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    OR?: DocumentScalarWhereWithAggregatesInput[]
    NOT?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Document"> | string
    loanId?: StringNullableWithAggregatesFilter<"Document"> | string | null
    uploadedBy?: StringWithAggregatesFilter<"Document"> | string
    documentType?: StringWithAggregatesFilter<"Document"> | string
    s3Key?: StringWithAggregatesFilter<"Document"> | string
    fileName?: StringWithAggregatesFilter<"Document"> | string
    mimeType?: StringWithAggregatesFilter<"Document"> | string
    fileSizeBytes?: BigIntNullableWithAggregatesFilter<"Document"> | bigint | number | null
    status?: StringWithAggregatesFilter<"Document"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Document"> | Date | string | null
    ownerId?: StringNullableWithAggregatesFilter<"Document"> | string | null
    folderPath?: StringWithAggregatesFilter<"Document"> | string
    reviewerId?: StringNullableWithAggregatesFilter<"Document"> | string | null
    reviewRemarks?: StringNullableWithAggregatesFilter<"Document"> | string | null
    reviewedAt?: DateTimeNullableWithAggregatesFilter<"Document"> | Date | string | null
  }

  export type DocumentVersionWhereInput = {
    AND?: DocumentVersionWhereInput | DocumentVersionWhereInput[]
    OR?: DocumentVersionWhereInput[]
    NOT?: DocumentVersionWhereInput | DocumentVersionWhereInput[]
    id?: StringFilter<"DocumentVersion"> | string
    documentId?: StringNullableFilter<"DocumentVersion"> | string | null
    versionNumber?: IntFilter<"DocumentVersion"> | number
    s3Key?: StringFilter<"DocumentVersion"> | string
    uploadedAt?: DateTimeFilter<"DocumentVersion"> | Date | string
    uploadedBy?: StringNullableFilter<"DocumentVersion"> | string | null
    document?: XOR<DocumentNullableRelationFilter, DocumentWhereInput> | null
  }

  export type DocumentVersionOrderByWithRelationInput = {
    id?: SortOrder
    documentId?: SortOrderInput | SortOrder
    versionNumber?: SortOrder
    s3Key?: SortOrder
    uploadedAt?: SortOrder
    uploadedBy?: SortOrderInput | SortOrder
    document?: DocumentOrderByWithRelationInput
  }

  export type DocumentVersionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentVersionWhereInput | DocumentVersionWhereInput[]
    OR?: DocumentVersionWhereInput[]
    NOT?: DocumentVersionWhereInput | DocumentVersionWhereInput[]
    documentId?: StringNullableFilter<"DocumentVersion"> | string | null
    versionNumber?: IntFilter<"DocumentVersion"> | number
    s3Key?: StringFilter<"DocumentVersion"> | string
    uploadedAt?: DateTimeFilter<"DocumentVersion"> | Date | string
    uploadedBy?: StringNullableFilter<"DocumentVersion"> | string | null
    document?: XOR<DocumentNullableRelationFilter, DocumentWhereInput> | null
  }, "id">

  export type DocumentVersionOrderByWithAggregationInput = {
    id?: SortOrder
    documentId?: SortOrderInput | SortOrder
    versionNumber?: SortOrder
    s3Key?: SortOrder
    uploadedAt?: SortOrder
    uploadedBy?: SortOrderInput | SortOrder
    _count?: DocumentVersionCountOrderByAggregateInput
    _avg?: DocumentVersionAvgOrderByAggregateInput
    _max?: DocumentVersionMaxOrderByAggregateInput
    _min?: DocumentVersionMinOrderByAggregateInput
    _sum?: DocumentVersionSumOrderByAggregateInput
  }

  export type DocumentVersionScalarWhereWithAggregatesInput = {
    AND?: DocumentVersionScalarWhereWithAggregatesInput | DocumentVersionScalarWhereWithAggregatesInput[]
    OR?: DocumentVersionScalarWhereWithAggregatesInput[]
    NOT?: DocumentVersionScalarWhereWithAggregatesInput | DocumentVersionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DocumentVersion"> | string
    documentId?: StringNullableWithAggregatesFilter<"DocumentVersion"> | string | null
    versionNumber?: IntWithAggregatesFilter<"DocumentVersion"> | number
    s3Key?: StringWithAggregatesFilter<"DocumentVersion"> | string
    uploadedAt?: DateTimeWithAggregatesFilter<"DocumentVersion"> | Date | string
    uploadedBy?: StringNullableWithAggregatesFilter<"DocumentVersion"> | string | null
  }

  export type DocumentAccessLogWhereInput = {
    AND?: DocumentAccessLogWhereInput | DocumentAccessLogWhereInput[]
    OR?: DocumentAccessLogWhereInput[]
    NOT?: DocumentAccessLogWhereInput | DocumentAccessLogWhereInput[]
    id?: StringFilter<"DocumentAccessLog"> | string
    documentId?: StringNullableFilter<"DocumentAccessLog"> | string | null
    accessedBy?: StringFilter<"DocumentAccessLog"> | string
    accessType?: StringFilter<"DocumentAccessLog"> | string
    accessedAt?: DateTimeFilter<"DocumentAccessLog"> | Date | string
    document?: XOR<DocumentNullableRelationFilter, DocumentWhereInput> | null
  }

  export type DocumentAccessLogOrderByWithRelationInput = {
    id?: SortOrder
    documentId?: SortOrderInput | SortOrder
    accessedBy?: SortOrder
    accessType?: SortOrder
    accessedAt?: SortOrder
    document?: DocumentOrderByWithRelationInput
  }

  export type DocumentAccessLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentAccessLogWhereInput | DocumentAccessLogWhereInput[]
    OR?: DocumentAccessLogWhereInput[]
    NOT?: DocumentAccessLogWhereInput | DocumentAccessLogWhereInput[]
    documentId?: StringNullableFilter<"DocumentAccessLog"> | string | null
    accessedBy?: StringFilter<"DocumentAccessLog"> | string
    accessType?: StringFilter<"DocumentAccessLog"> | string
    accessedAt?: DateTimeFilter<"DocumentAccessLog"> | Date | string
    document?: XOR<DocumentNullableRelationFilter, DocumentWhereInput> | null
  }, "id">

  export type DocumentAccessLogOrderByWithAggregationInput = {
    id?: SortOrder
    documentId?: SortOrderInput | SortOrder
    accessedBy?: SortOrder
    accessType?: SortOrder
    accessedAt?: SortOrder
    _count?: DocumentAccessLogCountOrderByAggregateInput
    _max?: DocumentAccessLogMaxOrderByAggregateInput
    _min?: DocumentAccessLogMinOrderByAggregateInput
  }

  export type DocumentAccessLogScalarWhereWithAggregatesInput = {
    AND?: DocumentAccessLogScalarWhereWithAggregatesInput | DocumentAccessLogScalarWhereWithAggregatesInput[]
    OR?: DocumentAccessLogScalarWhereWithAggregatesInput[]
    NOT?: DocumentAccessLogScalarWhereWithAggregatesInput | DocumentAccessLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DocumentAccessLog"> | string
    documentId?: StringNullableWithAggregatesFilter<"DocumentAccessLog"> | string | null
    accessedBy?: StringWithAggregatesFilter<"DocumentAccessLog"> | string
    accessType?: StringWithAggregatesFilter<"DocumentAccessLog"> | string
    accessedAt?: DateTimeWithAggregatesFilter<"DocumentAccessLog"> | Date | string
  }

  export type CustomerCreateInput = {
    id: string
    firstName: string
    lastName: string
    email: string
    mobile: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    kyc?: CustomerKycCreateNestedOneWithoutCustomerInput
    addresses?: CustomerAddressCreateNestedManyWithoutCustomerInput
    history?: CustomerHistoryCreateNestedManyWithoutCustomerInput
    leads?: LeadCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateInput = {
    id: string
    firstName: string
    lastName: string
    email: string
    mobile: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    kyc?: CustomerKycUncheckedCreateNestedOneWithoutCustomerInput
    addresses?: CustomerAddressUncheckedCreateNestedManyWithoutCustomerInput
    history?: CustomerHistoryUncheckedCreateNestedManyWithoutCustomerInput
    leads?: LeadUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    kyc?: CustomerKycUpdateOneWithoutCustomerNestedInput
    addresses?: CustomerAddressUpdateManyWithoutCustomerNestedInput
    history?: CustomerHistoryUpdateManyWithoutCustomerNestedInput
    leads?: LeadUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    kyc?: CustomerKycUncheckedUpdateOneWithoutCustomerNestedInput
    addresses?: CustomerAddressUncheckedUpdateManyWithoutCustomerNestedInput
    history?: CustomerHistoryUncheckedUpdateManyWithoutCustomerNestedInput
    leads?: LeadUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateManyInput = {
    id: string
    firstName: string
    lastName: string
    email: string
    mobile: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
  }

  export type CustomerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CustomerKycCreateInput = {
    id: string
    panNumber: string
    aadhaarNumber?: string | null
    kycStatus: string
    verifiedAt?: Date | string | null
    customer?: CustomerCreateNestedOneWithoutKycInput
  }

  export type CustomerKycUncheckedCreateInput = {
    id: string
    customerId?: string | null
    panNumber: string
    aadhaarNumber?: string | null
    kycStatus: string
    verifiedAt?: Date | string | null
  }

  export type CustomerKycUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    panNumber?: StringFieldUpdateOperationsInput | string
    aadhaarNumber?: NullableStringFieldUpdateOperationsInput | string | null
    kycStatus?: StringFieldUpdateOperationsInput | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customer?: CustomerUpdateOneWithoutKycNestedInput
  }

  export type CustomerKycUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    panNumber?: StringFieldUpdateOperationsInput | string
    aadhaarNumber?: NullableStringFieldUpdateOperationsInput | string | null
    kycStatus?: StringFieldUpdateOperationsInput | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CustomerKycCreateManyInput = {
    id: string
    customerId?: string | null
    panNumber: string
    aadhaarNumber?: string | null
    kycStatus: string
    verifiedAt?: Date | string | null
  }

  export type CustomerKycUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    panNumber?: StringFieldUpdateOperationsInput | string
    aadhaarNumber?: NullableStringFieldUpdateOperationsInput | string | null
    kycStatus?: StringFieldUpdateOperationsInput | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CustomerKycUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    panNumber?: StringFieldUpdateOperationsInput | string
    aadhaarNumber?: NullableStringFieldUpdateOperationsInput | string | null
    kycStatus?: StringFieldUpdateOperationsInput | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CustomerAddressCreateInput = {
    id: string
    addressType: string
    street: string
    city: string
    state: string
    pincode: string
    isPrimary?: boolean
    customer?: CustomerCreateNestedOneWithoutAddressesInput
  }

  export type CustomerAddressUncheckedCreateInput = {
    id: string
    customerId?: string | null
    addressType: string
    street: string
    city: string
    state: string
    pincode: string
    isPrimary?: boolean
  }

  export type CustomerAddressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    addressType?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    customer?: CustomerUpdateOneWithoutAddressesNestedInput
  }

  export type CustomerAddressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    addressType?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CustomerAddressCreateManyInput = {
    id: string
    customerId?: string | null
    addressType: string
    street: string
    city: string
    state: string
    pincode: string
    isPrimary?: boolean
  }

  export type CustomerAddressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    addressType?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CustomerAddressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    addressType?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CustomerHistoryCreateInput = {
    id: string
    action: string
    description?: string | null
    actionAt: Date | string
    actionBy?: string | null
    customer?: CustomerCreateNestedOneWithoutHistoryInput
  }

  export type CustomerHistoryUncheckedCreateInput = {
    id: string
    customerId?: string | null
    action: string
    description?: string | null
    actionAt: Date | string
    actionBy?: string | null
  }

  export type CustomerHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    actionAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionBy?: NullableStringFieldUpdateOperationsInput | string | null
    customer?: CustomerUpdateOneWithoutHistoryNestedInput
  }

  export type CustomerHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    actionAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CustomerHistoryCreateManyInput = {
    id: string
    customerId?: string | null
    action: string
    description?: string | null
    actionAt: Date | string
    actionBy?: string | null
  }

  export type CustomerHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    actionAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CustomerHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    actionAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LeadCreateInput = {
    id: string
    firstName: string
    lastName: string
    email: string
    mobile: string
    panNumber: string
    aadhaarNumber?: string | null
    loanType?: string | null
    loanAmount?: Decimal | DecimalJsLike | number | string | null
    assignedTo?: string | null
    status?: string
    createdAt: Date | string
    profession?: string | null
    netMonthlySalary?: Decimal | DecimalJsLike | number | string | null
    gender?: string | null
    maritalStatus?: string | null
    dob?: string | null
    alternateContact?: string | null
    whatsappNo?: string | null
    officialEmail?: string | null
    currentAddressLine1?: string | null
    currentAddressLine2?: string | null
    currentState?: string | null
    currentDistrict?: string | null
    currentCity?: string | null
    currentPincode?: string | null
    residenceType?: string | null
    permanentAddressLine1?: string | null
    permanentAddressLine2?: string | null
    permanentState?: string | null
    permanentDistrict?: string | null
    permanentCity?: string | null
    permanentPincode?: string | null
    jobType?: string | null
    designation?: string | null
    modeOfSalary?: string | null
    officeAddress?: string | null
    officeState?: string | null
    officeDistrict?: string | null
    officeCity?: string | null
    officePincode?: string | null
    existingEmi?: Decimal | DecimalJsLike | number | string | null
    hasPriorPersonalLoan?: boolean | null
    opsNotes?: string | null
    companyName?: string | null
    customer?: CustomerCreateNestedOneWithoutLeadsInput
  }

  export type LeadUncheckedCreateInput = {
    id: string
    firstName: string
    lastName: string
    email: string
    mobile: string
    panNumber: string
    aadhaarNumber?: string | null
    loanType?: string | null
    loanAmount?: Decimal | DecimalJsLike | number | string | null
    assignedTo?: string | null
    status?: string
    customerId?: string | null
    createdAt: Date | string
    profession?: string | null
    netMonthlySalary?: Decimal | DecimalJsLike | number | string | null
    gender?: string | null
    maritalStatus?: string | null
    dob?: string | null
    alternateContact?: string | null
    whatsappNo?: string | null
    officialEmail?: string | null
    currentAddressLine1?: string | null
    currentAddressLine2?: string | null
    currentState?: string | null
    currentDistrict?: string | null
    currentCity?: string | null
    currentPincode?: string | null
    residenceType?: string | null
    permanentAddressLine1?: string | null
    permanentAddressLine2?: string | null
    permanentState?: string | null
    permanentDistrict?: string | null
    permanentCity?: string | null
    permanentPincode?: string | null
    jobType?: string | null
    designation?: string | null
    modeOfSalary?: string | null
    officeAddress?: string | null
    officeState?: string | null
    officeDistrict?: string | null
    officeCity?: string | null
    officePincode?: string | null
    existingEmi?: Decimal | DecimalJsLike | number | string | null
    hasPriorPersonalLoan?: boolean | null
    opsNotes?: string | null
    companyName?: string | null
  }

  export type LeadUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    panNumber?: StringFieldUpdateOperationsInput | string
    aadhaarNumber?: NullableStringFieldUpdateOperationsInput | string | null
    loanType?: NullableStringFieldUpdateOperationsInput | string | null
    loanAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profession?: NullableStringFieldUpdateOperationsInput | string | null
    netMonthlySalary?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    maritalStatus?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableStringFieldUpdateOperationsInput | string | null
    alternateContact?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappNo?: NullableStringFieldUpdateOperationsInput | string | null
    officialEmail?: NullableStringFieldUpdateOperationsInput | string | null
    currentAddressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    currentAddressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    currentState?: NullableStringFieldUpdateOperationsInput | string | null
    currentDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    currentCity?: NullableStringFieldUpdateOperationsInput | string | null
    currentPincode?: NullableStringFieldUpdateOperationsInput | string | null
    residenceType?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    permanentState?: NullableStringFieldUpdateOperationsInput | string | null
    permanentDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    permanentCity?: NullableStringFieldUpdateOperationsInput | string | null
    permanentPincode?: NullableStringFieldUpdateOperationsInput | string | null
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    modeOfSalary?: NullableStringFieldUpdateOperationsInput | string | null
    officeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    officeState?: NullableStringFieldUpdateOperationsInput | string | null
    officeDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    officeCity?: NullableStringFieldUpdateOperationsInput | string | null
    officePincode?: NullableStringFieldUpdateOperationsInput | string | null
    existingEmi?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    hasPriorPersonalLoan?: NullableBoolFieldUpdateOperationsInput | boolean | null
    opsNotes?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    customer?: CustomerUpdateOneWithoutLeadsNestedInput
  }

  export type LeadUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    panNumber?: StringFieldUpdateOperationsInput | string
    aadhaarNumber?: NullableStringFieldUpdateOperationsInput | string | null
    loanType?: NullableStringFieldUpdateOperationsInput | string | null
    loanAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profession?: NullableStringFieldUpdateOperationsInput | string | null
    netMonthlySalary?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    maritalStatus?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableStringFieldUpdateOperationsInput | string | null
    alternateContact?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappNo?: NullableStringFieldUpdateOperationsInput | string | null
    officialEmail?: NullableStringFieldUpdateOperationsInput | string | null
    currentAddressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    currentAddressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    currentState?: NullableStringFieldUpdateOperationsInput | string | null
    currentDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    currentCity?: NullableStringFieldUpdateOperationsInput | string | null
    currentPincode?: NullableStringFieldUpdateOperationsInput | string | null
    residenceType?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    permanentState?: NullableStringFieldUpdateOperationsInput | string | null
    permanentDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    permanentCity?: NullableStringFieldUpdateOperationsInput | string | null
    permanentPincode?: NullableStringFieldUpdateOperationsInput | string | null
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    modeOfSalary?: NullableStringFieldUpdateOperationsInput | string | null
    officeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    officeState?: NullableStringFieldUpdateOperationsInput | string | null
    officeDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    officeCity?: NullableStringFieldUpdateOperationsInput | string | null
    officePincode?: NullableStringFieldUpdateOperationsInput | string | null
    existingEmi?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    hasPriorPersonalLoan?: NullableBoolFieldUpdateOperationsInput | boolean | null
    opsNotes?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LeadCreateManyInput = {
    id: string
    firstName: string
    lastName: string
    email: string
    mobile: string
    panNumber: string
    aadhaarNumber?: string | null
    loanType?: string | null
    loanAmount?: Decimal | DecimalJsLike | number | string | null
    assignedTo?: string | null
    status?: string
    customerId?: string | null
    createdAt: Date | string
    profession?: string | null
    netMonthlySalary?: Decimal | DecimalJsLike | number | string | null
    gender?: string | null
    maritalStatus?: string | null
    dob?: string | null
    alternateContact?: string | null
    whatsappNo?: string | null
    officialEmail?: string | null
    currentAddressLine1?: string | null
    currentAddressLine2?: string | null
    currentState?: string | null
    currentDistrict?: string | null
    currentCity?: string | null
    currentPincode?: string | null
    residenceType?: string | null
    permanentAddressLine1?: string | null
    permanentAddressLine2?: string | null
    permanentState?: string | null
    permanentDistrict?: string | null
    permanentCity?: string | null
    permanentPincode?: string | null
    jobType?: string | null
    designation?: string | null
    modeOfSalary?: string | null
    officeAddress?: string | null
    officeState?: string | null
    officeDistrict?: string | null
    officeCity?: string | null
    officePincode?: string | null
    existingEmi?: Decimal | DecimalJsLike | number | string | null
    hasPriorPersonalLoan?: boolean | null
    opsNotes?: string | null
    companyName?: string | null
  }

  export type LeadUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    panNumber?: StringFieldUpdateOperationsInput | string
    aadhaarNumber?: NullableStringFieldUpdateOperationsInput | string | null
    loanType?: NullableStringFieldUpdateOperationsInput | string | null
    loanAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profession?: NullableStringFieldUpdateOperationsInput | string | null
    netMonthlySalary?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    maritalStatus?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableStringFieldUpdateOperationsInput | string | null
    alternateContact?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappNo?: NullableStringFieldUpdateOperationsInput | string | null
    officialEmail?: NullableStringFieldUpdateOperationsInput | string | null
    currentAddressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    currentAddressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    currentState?: NullableStringFieldUpdateOperationsInput | string | null
    currentDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    currentCity?: NullableStringFieldUpdateOperationsInput | string | null
    currentPincode?: NullableStringFieldUpdateOperationsInput | string | null
    residenceType?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    permanentState?: NullableStringFieldUpdateOperationsInput | string | null
    permanentDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    permanentCity?: NullableStringFieldUpdateOperationsInput | string | null
    permanentPincode?: NullableStringFieldUpdateOperationsInput | string | null
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    modeOfSalary?: NullableStringFieldUpdateOperationsInput | string | null
    officeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    officeState?: NullableStringFieldUpdateOperationsInput | string | null
    officeDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    officeCity?: NullableStringFieldUpdateOperationsInput | string | null
    officePincode?: NullableStringFieldUpdateOperationsInput | string | null
    existingEmi?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    hasPriorPersonalLoan?: NullableBoolFieldUpdateOperationsInput | boolean | null
    opsNotes?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LeadUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    panNumber?: StringFieldUpdateOperationsInput | string
    aadhaarNumber?: NullableStringFieldUpdateOperationsInput | string | null
    loanType?: NullableStringFieldUpdateOperationsInput | string | null
    loanAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profession?: NullableStringFieldUpdateOperationsInput | string | null
    netMonthlySalary?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    maritalStatus?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableStringFieldUpdateOperationsInput | string | null
    alternateContact?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappNo?: NullableStringFieldUpdateOperationsInput | string | null
    officialEmail?: NullableStringFieldUpdateOperationsInput | string | null
    currentAddressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    currentAddressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    currentState?: NullableStringFieldUpdateOperationsInput | string | null
    currentDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    currentCity?: NullableStringFieldUpdateOperationsInput | string | null
    currentPincode?: NullableStringFieldUpdateOperationsInput | string | null
    residenceType?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    permanentState?: NullableStringFieldUpdateOperationsInput | string | null
    permanentDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    permanentCity?: NullableStringFieldUpdateOperationsInput | string | null
    permanentPincode?: NullableStringFieldUpdateOperationsInput | string | null
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    modeOfSalary?: NullableStringFieldUpdateOperationsInput | string | null
    officeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    officeState?: NullableStringFieldUpdateOperationsInput | string | null
    officeDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    officeCity?: NullableStringFieldUpdateOperationsInput | string | null
    officePincode?: NullableStringFieldUpdateOperationsInput | string | null
    existingEmi?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    hasPriorPersonalLoan?: NullableBoolFieldUpdateOperationsInput | boolean | null
    opsNotes?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocumentCreateInput = {
    id: string
    loanId?: string | null
    uploadedBy: string
    documentType: string
    s3Key: string
    fileName: string
    mimeType: string
    fileSizeBytes?: bigint | number | null
    status: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    ownerId?: string | null
    folderPath?: string
    reviewerId?: string | null
    reviewRemarks?: string | null
    reviewedAt?: Date | string | null
    versions?: DocumentVersionCreateNestedManyWithoutDocumentInput
    accessLogs?: DocumentAccessLogCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateInput = {
    id: string
    loanId?: string | null
    uploadedBy: string
    documentType: string
    s3Key: string
    fileName: string
    mimeType: string
    fileSizeBytes?: bigint | number | null
    status: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    ownerId?: string | null
    folderPath?: string
    reviewerId?: string | null
    reviewRemarks?: string | null
    reviewedAt?: Date | string | null
    versions?: DocumentVersionUncheckedCreateNestedManyWithoutDocumentInput
    accessLogs?: DocumentAccessLogUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedBy?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSizeBytes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    folderPath?: StringFieldUpdateOperationsInput | string
    reviewerId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewRemarks?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versions?: DocumentVersionUpdateManyWithoutDocumentNestedInput
    accessLogs?: DocumentAccessLogUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedBy?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSizeBytes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    folderPath?: StringFieldUpdateOperationsInput | string
    reviewerId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewRemarks?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versions?: DocumentVersionUncheckedUpdateManyWithoutDocumentNestedInput
    accessLogs?: DocumentAccessLogUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentCreateManyInput = {
    id: string
    loanId?: string | null
    uploadedBy: string
    documentType: string
    s3Key: string
    fileName: string
    mimeType: string
    fileSizeBytes?: bigint | number | null
    status: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    ownerId?: string | null
    folderPath?: string
    reviewerId?: string | null
    reviewRemarks?: string | null
    reviewedAt?: Date | string | null
  }

  export type DocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedBy?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSizeBytes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    folderPath?: StringFieldUpdateOperationsInput | string
    reviewerId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewRemarks?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedBy?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSizeBytes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    folderPath?: StringFieldUpdateOperationsInput | string
    reviewerId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewRemarks?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DocumentVersionCreateInput = {
    id: string
    versionNumber: number
    s3Key: string
    uploadedAt: Date | string
    uploadedBy?: string | null
    document?: DocumentCreateNestedOneWithoutVersionsInput
  }

  export type DocumentVersionUncheckedCreateInput = {
    id: string
    documentId?: string | null
    versionNumber: number
    s3Key: string
    uploadedAt: Date | string
    uploadedBy?: string | null
  }

  export type DocumentVersionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedBy?: NullableStringFieldUpdateOperationsInput | string | null
    document?: DocumentUpdateOneWithoutVersionsNestedInput
  }

  export type DocumentVersionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: NullableStringFieldUpdateOperationsInput | string | null
    versionNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocumentVersionCreateManyInput = {
    id: string
    documentId?: string | null
    versionNumber: number
    s3Key: string
    uploadedAt: Date | string
    uploadedBy?: string | null
  }

  export type DocumentVersionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocumentVersionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: NullableStringFieldUpdateOperationsInput | string | null
    versionNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocumentAccessLogCreateInput = {
    id: string
    accessedBy: string
    accessType: string
    accessedAt: Date | string
    document?: DocumentCreateNestedOneWithoutAccessLogsInput
  }

  export type DocumentAccessLogUncheckedCreateInput = {
    id: string
    documentId?: string | null
    accessedBy: string
    accessType: string
    accessedAt: Date | string
  }

  export type DocumentAccessLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessedBy?: StringFieldUpdateOperationsInput | string
    accessType?: StringFieldUpdateOperationsInput | string
    accessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    document?: DocumentUpdateOneWithoutAccessLogsNestedInput
  }

  export type DocumentAccessLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: NullableStringFieldUpdateOperationsInput | string | null
    accessedBy?: StringFieldUpdateOperationsInput | string
    accessType?: StringFieldUpdateOperationsInput | string
    accessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentAccessLogCreateManyInput = {
    id: string
    documentId?: string | null
    accessedBy: string
    accessType: string
    accessedAt: Date | string
  }

  export type DocumentAccessLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessedBy?: StringFieldUpdateOperationsInput | string
    accessType?: StringFieldUpdateOperationsInput | string
    accessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentAccessLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: NullableStringFieldUpdateOperationsInput | string | null
    accessedBy?: StringFieldUpdateOperationsInput | string
    accessType?: StringFieldUpdateOperationsInput | string
    accessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type CustomerKycNullableRelationFilter = {
    is?: CustomerKycWhereInput | null
    isNot?: CustomerKycWhereInput | null
  }

  export type CustomerAddressListRelationFilter = {
    every?: CustomerAddressWhereInput
    some?: CustomerAddressWhereInput
    none?: CustomerAddressWhereInput
  }

  export type CustomerHistoryListRelationFilter = {
    every?: CustomerHistoryWhereInput
    some?: CustomerHistoryWhereInput
    none?: CustomerHistoryWhereInput
  }

  export type LeadListRelationFilter = {
    every?: LeadWhereInput
    some?: LeadWhereInput
    none?: LeadWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CustomerAddressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeadOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    mobile?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    mobile?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    mobile?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
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

  export type CustomerNullableRelationFilter = {
    is?: CustomerWhereInput | null
    isNot?: CustomerWhereInput | null
  }

  export type CustomerKycCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    panNumber?: SortOrder
    aadhaarNumber?: SortOrder
    kycStatus?: SortOrder
    verifiedAt?: SortOrder
  }

  export type CustomerKycMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    panNumber?: SortOrder
    aadhaarNumber?: SortOrder
    kycStatus?: SortOrder
    verifiedAt?: SortOrder
  }

  export type CustomerKycMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    panNumber?: SortOrder
    aadhaarNumber?: SortOrder
    kycStatus?: SortOrder
    verifiedAt?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CustomerAddressCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    addressType?: SortOrder
    street?: SortOrder
    city?: SortOrder
    state?: SortOrder
    pincode?: SortOrder
    isPrimary?: SortOrder
  }

  export type CustomerAddressMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    addressType?: SortOrder
    street?: SortOrder
    city?: SortOrder
    state?: SortOrder
    pincode?: SortOrder
    isPrimary?: SortOrder
  }

  export type CustomerAddressMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    addressType?: SortOrder
    street?: SortOrder
    city?: SortOrder
    state?: SortOrder
    pincode?: SortOrder
    isPrimary?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type CustomerHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    action?: SortOrder
    description?: SortOrder
    actionAt?: SortOrder
    actionBy?: SortOrder
  }

  export type CustomerHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    action?: SortOrder
    description?: SortOrder
    actionAt?: SortOrder
    actionBy?: SortOrder
  }

  export type CustomerHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    action?: SortOrder
    description?: SortOrder
    actionAt?: SortOrder
    actionBy?: SortOrder
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type LeadCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    mobile?: SortOrder
    panNumber?: SortOrder
    aadhaarNumber?: SortOrder
    loanType?: SortOrder
    loanAmount?: SortOrder
    assignedTo?: SortOrder
    status?: SortOrder
    customerId?: SortOrder
    createdAt?: SortOrder
    profession?: SortOrder
    netMonthlySalary?: SortOrder
    gender?: SortOrder
    maritalStatus?: SortOrder
    dob?: SortOrder
    alternateContact?: SortOrder
    whatsappNo?: SortOrder
    officialEmail?: SortOrder
    currentAddressLine1?: SortOrder
    currentAddressLine2?: SortOrder
    currentState?: SortOrder
    currentDistrict?: SortOrder
    currentCity?: SortOrder
    currentPincode?: SortOrder
    residenceType?: SortOrder
    permanentAddressLine1?: SortOrder
    permanentAddressLine2?: SortOrder
    permanentState?: SortOrder
    permanentDistrict?: SortOrder
    permanentCity?: SortOrder
    permanentPincode?: SortOrder
    jobType?: SortOrder
    designation?: SortOrder
    modeOfSalary?: SortOrder
    officeAddress?: SortOrder
    officeState?: SortOrder
    officeDistrict?: SortOrder
    officeCity?: SortOrder
    officePincode?: SortOrder
    existingEmi?: SortOrder
    hasPriorPersonalLoan?: SortOrder
    opsNotes?: SortOrder
    companyName?: SortOrder
  }

  export type LeadAvgOrderByAggregateInput = {
    loanAmount?: SortOrder
    netMonthlySalary?: SortOrder
    existingEmi?: SortOrder
  }

  export type LeadMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    mobile?: SortOrder
    panNumber?: SortOrder
    aadhaarNumber?: SortOrder
    loanType?: SortOrder
    loanAmount?: SortOrder
    assignedTo?: SortOrder
    status?: SortOrder
    customerId?: SortOrder
    createdAt?: SortOrder
    profession?: SortOrder
    netMonthlySalary?: SortOrder
    gender?: SortOrder
    maritalStatus?: SortOrder
    dob?: SortOrder
    alternateContact?: SortOrder
    whatsappNo?: SortOrder
    officialEmail?: SortOrder
    currentAddressLine1?: SortOrder
    currentAddressLine2?: SortOrder
    currentState?: SortOrder
    currentDistrict?: SortOrder
    currentCity?: SortOrder
    currentPincode?: SortOrder
    residenceType?: SortOrder
    permanentAddressLine1?: SortOrder
    permanentAddressLine2?: SortOrder
    permanentState?: SortOrder
    permanentDistrict?: SortOrder
    permanentCity?: SortOrder
    permanentPincode?: SortOrder
    jobType?: SortOrder
    designation?: SortOrder
    modeOfSalary?: SortOrder
    officeAddress?: SortOrder
    officeState?: SortOrder
    officeDistrict?: SortOrder
    officeCity?: SortOrder
    officePincode?: SortOrder
    existingEmi?: SortOrder
    hasPriorPersonalLoan?: SortOrder
    opsNotes?: SortOrder
    companyName?: SortOrder
  }

  export type LeadMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    mobile?: SortOrder
    panNumber?: SortOrder
    aadhaarNumber?: SortOrder
    loanType?: SortOrder
    loanAmount?: SortOrder
    assignedTo?: SortOrder
    status?: SortOrder
    customerId?: SortOrder
    createdAt?: SortOrder
    profession?: SortOrder
    netMonthlySalary?: SortOrder
    gender?: SortOrder
    maritalStatus?: SortOrder
    dob?: SortOrder
    alternateContact?: SortOrder
    whatsappNo?: SortOrder
    officialEmail?: SortOrder
    currentAddressLine1?: SortOrder
    currentAddressLine2?: SortOrder
    currentState?: SortOrder
    currentDistrict?: SortOrder
    currentCity?: SortOrder
    currentPincode?: SortOrder
    residenceType?: SortOrder
    permanentAddressLine1?: SortOrder
    permanentAddressLine2?: SortOrder
    permanentState?: SortOrder
    permanentDistrict?: SortOrder
    permanentCity?: SortOrder
    permanentPincode?: SortOrder
    jobType?: SortOrder
    designation?: SortOrder
    modeOfSalary?: SortOrder
    officeAddress?: SortOrder
    officeState?: SortOrder
    officeDistrict?: SortOrder
    officeCity?: SortOrder
    officePincode?: SortOrder
    existingEmi?: SortOrder
    hasPriorPersonalLoan?: SortOrder
    opsNotes?: SortOrder
    companyName?: SortOrder
  }

  export type LeadSumOrderByAggregateInput = {
    loanAmount?: SortOrder
    netMonthlySalary?: SortOrder
    existingEmi?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type DocumentVersionListRelationFilter = {
    every?: DocumentVersionWhereInput
    some?: DocumentVersionWhereInput
    none?: DocumentVersionWhereInput
  }

  export type DocumentAccessLogListRelationFilter = {
    every?: DocumentAccessLogWhereInput
    some?: DocumentAccessLogWhereInput
    none?: DocumentAccessLogWhereInput
  }

  export type DocumentVersionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentAccessLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder
    loanId?: SortOrder
    uploadedBy?: SortOrder
    documentType?: SortOrder
    s3Key?: SortOrder
    fileName?: SortOrder
    mimeType?: SortOrder
    fileSizeBytes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    folderPath?: SortOrder
    reviewerId?: SortOrder
    reviewRemarks?: SortOrder
    reviewedAt?: SortOrder
  }

  export type DocumentAvgOrderByAggregateInput = {
    fileSizeBytes?: SortOrder
  }

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    loanId?: SortOrder
    uploadedBy?: SortOrder
    documentType?: SortOrder
    s3Key?: SortOrder
    fileName?: SortOrder
    mimeType?: SortOrder
    fileSizeBytes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    folderPath?: SortOrder
    reviewerId?: SortOrder
    reviewRemarks?: SortOrder
    reviewedAt?: SortOrder
  }

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder
    loanId?: SortOrder
    uploadedBy?: SortOrder
    documentType?: SortOrder
    s3Key?: SortOrder
    fileName?: SortOrder
    mimeType?: SortOrder
    fileSizeBytes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    folderPath?: SortOrder
    reviewerId?: SortOrder
    reviewRemarks?: SortOrder
    reviewedAt?: SortOrder
  }

  export type DocumentSumOrderByAggregateInput = {
    fileSizeBytes?: SortOrder
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
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

  export type DocumentNullableRelationFilter = {
    is?: DocumentWhereInput | null
    isNot?: DocumentWhereInput | null
  }

  export type DocumentVersionCountOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    versionNumber?: SortOrder
    s3Key?: SortOrder
    uploadedAt?: SortOrder
    uploadedBy?: SortOrder
  }

  export type DocumentVersionAvgOrderByAggregateInput = {
    versionNumber?: SortOrder
  }

  export type DocumentVersionMaxOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    versionNumber?: SortOrder
    s3Key?: SortOrder
    uploadedAt?: SortOrder
    uploadedBy?: SortOrder
  }

  export type DocumentVersionMinOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    versionNumber?: SortOrder
    s3Key?: SortOrder
    uploadedAt?: SortOrder
    uploadedBy?: SortOrder
  }

  export type DocumentVersionSumOrderByAggregateInput = {
    versionNumber?: SortOrder
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

  export type DocumentAccessLogCountOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    accessedBy?: SortOrder
    accessType?: SortOrder
    accessedAt?: SortOrder
  }

  export type DocumentAccessLogMaxOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    accessedBy?: SortOrder
    accessType?: SortOrder
    accessedAt?: SortOrder
  }

  export type DocumentAccessLogMinOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    accessedBy?: SortOrder
    accessType?: SortOrder
    accessedAt?: SortOrder
  }

  export type CustomerKycCreateNestedOneWithoutCustomerInput = {
    create?: XOR<CustomerKycCreateWithoutCustomerInput, CustomerKycUncheckedCreateWithoutCustomerInput>
    connectOrCreate?: CustomerKycCreateOrConnectWithoutCustomerInput
    connect?: CustomerKycWhereUniqueInput
  }

  export type CustomerAddressCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CustomerAddressCreateWithoutCustomerInput, CustomerAddressUncheckedCreateWithoutCustomerInput> | CustomerAddressCreateWithoutCustomerInput[] | CustomerAddressUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerAddressCreateOrConnectWithoutCustomerInput | CustomerAddressCreateOrConnectWithoutCustomerInput[]
    createMany?: CustomerAddressCreateManyCustomerInputEnvelope
    connect?: CustomerAddressWhereUniqueInput | CustomerAddressWhereUniqueInput[]
  }

  export type CustomerHistoryCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CustomerHistoryCreateWithoutCustomerInput, CustomerHistoryUncheckedCreateWithoutCustomerInput> | CustomerHistoryCreateWithoutCustomerInput[] | CustomerHistoryUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerHistoryCreateOrConnectWithoutCustomerInput | CustomerHistoryCreateOrConnectWithoutCustomerInput[]
    createMany?: CustomerHistoryCreateManyCustomerInputEnvelope
    connect?: CustomerHistoryWhereUniqueInput | CustomerHistoryWhereUniqueInput[]
  }

  export type LeadCreateNestedManyWithoutCustomerInput = {
    create?: XOR<LeadCreateWithoutCustomerInput, LeadUncheckedCreateWithoutCustomerInput> | LeadCreateWithoutCustomerInput[] | LeadUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutCustomerInput | LeadCreateOrConnectWithoutCustomerInput[]
    createMany?: LeadCreateManyCustomerInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type CustomerKycUncheckedCreateNestedOneWithoutCustomerInput = {
    create?: XOR<CustomerKycCreateWithoutCustomerInput, CustomerKycUncheckedCreateWithoutCustomerInput>
    connectOrCreate?: CustomerKycCreateOrConnectWithoutCustomerInput
    connect?: CustomerKycWhereUniqueInput
  }

  export type CustomerAddressUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CustomerAddressCreateWithoutCustomerInput, CustomerAddressUncheckedCreateWithoutCustomerInput> | CustomerAddressCreateWithoutCustomerInput[] | CustomerAddressUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerAddressCreateOrConnectWithoutCustomerInput | CustomerAddressCreateOrConnectWithoutCustomerInput[]
    createMany?: CustomerAddressCreateManyCustomerInputEnvelope
    connect?: CustomerAddressWhereUniqueInput | CustomerAddressWhereUniqueInput[]
  }

  export type CustomerHistoryUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CustomerHistoryCreateWithoutCustomerInput, CustomerHistoryUncheckedCreateWithoutCustomerInput> | CustomerHistoryCreateWithoutCustomerInput[] | CustomerHistoryUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerHistoryCreateOrConnectWithoutCustomerInput | CustomerHistoryCreateOrConnectWithoutCustomerInput[]
    createMany?: CustomerHistoryCreateManyCustomerInputEnvelope
    connect?: CustomerHistoryWhereUniqueInput | CustomerHistoryWhereUniqueInput[]
  }

  export type LeadUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<LeadCreateWithoutCustomerInput, LeadUncheckedCreateWithoutCustomerInput> | LeadCreateWithoutCustomerInput[] | LeadUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutCustomerInput | LeadCreateOrConnectWithoutCustomerInput[]
    createMany?: LeadCreateManyCustomerInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type CustomerKycUpdateOneWithoutCustomerNestedInput = {
    create?: XOR<CustomerKycCreateWithoutCustomerInput, CustomerKycUncheckedCreateWithoutCustomerInput>
    connectOrCreate?: CustomerKycCreateOrConnectWithoutCustomerInput
    upsert?: CustomerKycUpsertWithoutCustomerInput
    disconnect?: CustomerKycWhereInput | boolean
    delete?: CustomerKycWhereInput | boolean
    connect?: CustomerKycWhereUniqueInput
    update?: XOR<XOR<CustomerKycUpdateToOneWithWhereWithoutCustomerInput, CustomerKycUpdateWithoutCustomerInput>, CustomerKycUncheckedUpdateWithoutCustomerInput>
  }

  export type CustomerAddressUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CustomerAddressCreateWithoutCustomerInput, CustomerAddressUncheckedCreateWithoutCustomerInput> | CustomerAddressCreateWithoutCustomerInput[] | CustomerAddressUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerAddressCreateOrConnectWithoutCustomerInput | CustomerAddressCreateOrConnectWithoutCustomerInput[]
    upsert?: CustomerAddressUpsertWithWhereUniqueWithoutCustomerInput | CustomerAddressUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CustomerAddressCreateManyCustomerInputEnvelope
    set?: CustomerAddressWhereUniqueInput | CustomerAddressWhereUniqueInput[]
    disconnect?: CustomerAddressWhereUniqueInput | CustomerAddressWhereUniqueInput[]
    delete?: CustomerAddressWhereUniqueInput | CustomerAddressWhereUniqueInput[]
    connect?: CustomerAddressWhereUniqueInput | CustomerAddressWhereUniqueInput[]
    update?: CustomerAddressUpdateWithWhereUniqueWithoutCustomerInput | CustomerAddressUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CustomerAddressUpdateManyWithWhereWithoutCustomerInput | CustomerAddressUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CustomerAddressScalarWhereInput | CustomerAddressScalarWhereInput[]
  }

  export type CustomerHistoryUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CustomerHistoryCreateWithoutCustomerInput, CustomerHistoryUncheckedCreateWithoutCustomerInput> | CustomerHistoryCreateWithoutCustomerInput[] | CustomerHistoryUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerHistoryCreateOrConnectWithoutCustomerInput | CustomerHistoryCreateOrConnectWithoutCustomerInput[]
    upsert?: CustomerHistoryUpsertWithWhereUniqueWithoutCustomerInput | CustomerHistoryUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CustomerHistoryCreateManyCustomerInputEnvelope
    set?: CustomerHistoryWhereUniqueInput | CustomerHistoryWhereUniqueInput[]
    disconnect?: CustomerHistoryWhereUniqueInput | CustomerHistoryWhereUniqueInput[]
    delete?: CustomerHistoryWhereUniqueInput | CustomerHistoryWhereUniqueInput[]
    connect?: CustomerHistoryWhereUniqueInput | CustomerHistoryWhereUniqueInput[]
    update?: CustomerHistoryUpdateWithWhereUniqueWithoutCustomerInput | CustomerHistoryUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CustomerHistoryUpdateManyWithWhereWithoutCustomerInput | CustomerHistoryUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CustomerHistoryScalarWhereInput | CustomerHistoryScalarWhereInput[]
  }

  export type LeadUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<LeadCreateWithoutCustomerInput, LeadUncheckedCreateWithoutCustomerInput> | LeadCreateWithoutCustomerInput[] | LeadUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutCustomerInput | LeadCreateOrConnectWithoutCustomerInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutCustomerInput | LeadUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: LeadCreateManyCustomerInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutCustomerInput | LeadUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutCustomerInput | LeadUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type CustomerKycUncheckedUpdateOneWithoutCustomerNestedInput = {
    create?: XOR<CustomerKycCreateWithoutCustomerInput, CustomerKycUncheckedCreateWithoutCustomerInput>
    connectOrCreate?: CustomerKycCreateOrConnectWithoutCustomerInput
    upsert?: CustomerKycUpsertWithoutCustomerInput
    disconnect?: CustomerKycWhereInput | boolean
    delete?: CustomerKycWhereInput | boolean
    connect?: CustomerKycWhereUniqueInput
    update?: XOR<XOR<CustomerKycUpdateToOneWithWhereWithoutCustomerInput, CustomerKycUpdateWithoutCustomerInput>, CustomerKycUncheckedUpdateWithoutCustomerInput>
  }

  export type CustomerAddressUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CustomerAddressCreateWithoutCustomerInput, CustomerAddressUncheckedCreateWithoutCustomerInput> | CustomerAddressCreateWithoutCustomerInput[] | CustomerAddressUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerAddressCreateOrConnectWithoutCustomerInput | CustomerAddressCreateOrConnectWithoutCustomerInput[]
    upsert?: CustomerAddressUpsertWithWhereUniqueWithoutCustomerInput | CustomerAddressUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CustomerAddressCreateManyCustomerInputEnvelope
    set?: CustomerAddressWhereUniqueInput | CustomerAddressWhereUniqueInput[]
    disconnect?: CustomerAddressWhereUniqueInput | CustomerAddressWhereUniqueInput[]
    delete?: CustomerAddressWhereUniqueInput | CustomerAddressWhereUniqueInput[]
    connect?: CustomerAddressWhereUniqueInput | CustomerAddressWhereUniqueInput[]
    update?: CustomerAddressUpdateWithWhereUniqueWithoutCustomerInput | CustomerAddressUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CustomerAddressUpdateManyWithWhereWithoutCustomerInput | CustomerAddressUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CustomerAddressScalarWhereInput | CustomerAddressScalarWhereInput[]
  }

  export type CustomerHistoryUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CustomerHistoryCreateWithoutCustomerInput, CustomerHistoryUncheckedCreateWithoutCustomerInput> | CustomerHistoryCreateWithoutCustomerInput[] | CustomerHistoryUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerHistoryCreateOrConnectWithoutCustomerInput | CustomerHistoryCreateOrConnectWithoutCustomerInput[]
    upsert?: CustomerHistoryUpsertWithWhereUniqueWithoutCustomerInput | CustomerHistoryUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CustomerHistoryCreateManyCustomerInputEnvelope
    set?: CustomerHistoryWhereUniqueInput | CustomerHistoryWhereUniqueInput[]
    disconnect?: CustomerHistoryWhereUniqueInput | CustomerHistoryWhereUniqueInput[]
    delete?: CustomerHistoryWhereUniqueInput | CustomerHistoryWhereUniqueInput[]
    connect?: CustomerHistoryWhereUniqueInput | CustomerHistoryWhereUniqueInput[]
    update?: CustomerHistoryUpdateWithWhereUniqueWithoutCustomerInput | CustomerHistoryUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CustomerHistoryUpdateManyWithWhereWithoutCustomerInput | CustomerHistoryUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CustomerHistoryScalarWhereInput | CustomerHistoryScalarWhereInput[]
  }

  export type LeadUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<LeadCreateWithoutCustomerInput, LeadUncheckedCreateWithoutCustomerInput> | LeadCreateWithoutCustomerInput[] | LeadUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutCustomerInput | LeadCreateOrConnectWithoutCustomerInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutCustomerInput | LeadUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: LeadCreateManyCustomerInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutCustomerInput | LeadUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutCustomerInput | LeadUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type CustomerCreateNestedOneWithoutKycInput = {
    create?: XOR<CustomerCreateWithoutKycInput, CustomerUncheckedCreateWithoutKycInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutKycInput
    connect?: CustomerWhereUniqueInput
  }

  export type CustomerUpdateOneWithoutKycNestedInput = {
    create?: XOR<CustomerCreateWithoutKycInput, CustomerUncheckedCreateWithoutKycInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutKycInput
    upsert?: CustomerUpsertWithoutKycInput
    disconnect?: CustomerWhereInput | boolean
    delete?: CustomerWhereInput | boolean
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutKycInput, CustomerUpdateWithoutKycInput>, CustomerUncheckedUpdateWithoutKycInput>
  }

  export type CustomerCreateNestedOneWithoutAddressesInput = {
    create?: XOR<CustomerCreateWithoutAddressesInput, CustomerUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutAddressesInput
    connect?: CustomerWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CustomerUpdateOneWithoutAddressesNestedInput = {
    create?: XOR<CustomerCreateWithoutAddressesInput, CustomerUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutAddressesInput
    upsert?: CustomerUpsertWithoutAddressesInput
    disconnect?: CustomerWhereInput | boolean
    delete?: CustomerWhereInput | boolean
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutAddressesInput, CustomerUpdateWithoutAddressesInput>, CustomerUncheckedUpdateWithoutAddressesInput>
  }

  export type CustomerCreateNestedOneWithoutHistoryInput = {
    create?: XOR<CustomerCreateWithoutHistoryInput, CustomerUncheckedCreateWithoutHistoryInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutHistoryInput
    connect?: CustomerWhereUniqueInput
  }

  export type CustomerUpdateOneWithoutHistoryNestedInput = {
    create?: XOR<CustomerCreateWithoutHistoryInput, CustomerUncheckedCreateWithoutHistoryInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutHistoryInput
    upsert?: CustomerUpsertWithoutHistoryInput
    disconnect?: CustomerWhereInput | boolean
    delete?: CustomerWhereInput | boolean
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutHistoryInput, CustomerUpdateWithoutHistoryInput>, CustomerUncheckedUpdateWithoutHistoryInput>
  }

  export type CustomerCreateNestedOneWithoutLeadsInput = {
    create?: XOR<CustomerCreateWithoutLeadsInput, CustomerUncheckedCreateWithoutLeadsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutLeadsInput
    connect?: CustomerWhereUniqueInput
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type CustomerUpdateOneWithoutLeadsNestedInput = {
    create?: XOR<CustomerCreateWithoutLeadsInput, CustomerUncheckedCreateWithoutLeadsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutLeadsInput
    upsert?: CustomerUpsertWithoutLeadsInput
    disconnect?: CustomerWhereInput | boolean
    delete?: CustomerWhereInput | boolean
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutLeadsInput, CustomerUpdateWithoutLeadsInput>, CustomerUncheckedUpdateWithoutLeadsInput>
  }

  export type DocumentVersionCreateNestedManyWithoutDocumentInput = {
    create?: XOR<DocumentVersionCreateWithoutDocumentInput, DocumentVersionUncheckedCreateWithoutDocumentInput> | DocumentVersionCreateWithoutDocumentInput[] | DocumentVersionUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentVersionCreateOrConnectWithoutDocumentInput | DocumentVersionCreateOrConnectWithoutDocumentInput[]
    createMany?: DocumentVersionCreateManyDocumentInputEnvelope
    connect?: DocumentVersionWhereUniqueInput | DocumentVersionWhereUniqueInput[]
  }

  export type DocumentAccessLogCreateNestedManyWithoutDocumentInput = {
    create?: XOR<DocumentAccessLogCreateWithoutDocumentInput, DocumentAccessLogUncheckedCreateWithoutDocumentInput> | DocumentAccessLogCreateWithoutDocumentInput[] | DocumentAccessLogUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentAccessLogCreateOrConnectWithoutDocumentInput | DocumentAccessLogCreateOrConnectWithoutDocumentInput[]
    createMany?: DocumentAccessLogCreateManyDocumentInputEnvelope
    connect?: DocumentAccessLogWhereUniqueInput | DocumentAccessLogWhereUniqueInput[]
  }

  export type DocumentVersionUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: XOR<DocumentVersionCreateWithoutDocumentInput, DocumentVersionUncheckedCreateWithoutDocumentInput> | DocumentVersionCreateWithoutDocumentInput[] | DocumentVersionUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentVersionCreateOrConnectWithoutDocumentInput | DocumentVersionCreateOrConnectWithoutDocumentInput[]
    createMany?: DocumentVersionCreateManyDocumentInputEnvelope
    connect?: DocumentVersionWhereUniqueInput | DocumentVersionWhereUniqueInput[]
  }

  export type DocumentAccessLogUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: XOR<DocumentAccessLogCreateWithoutDocumentInput, DocumentAccessLogUncheckedCreateWithoutDocumentInput> | DocumentAccessLogCreateWithoutDocumentInput[] | DocumentAccessLogUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentAccessLogCreateOrConnectWithoutDocumentInput | DocumentAccessLogCreateOrConnectWithoutDocumentInput[]
    createMany?: DocumentAccessLogCreateManyDocumentInputEnvelope
    connect?: DocumentAccessLogWhereUniqueInput | DocumentAccessLogWhereUniqueInput[]
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type DocumentVersionUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<DocumentVersionCreateWithoutDocumentInput, DocumentVersionUncheckedCreateWithoutDocumentInput> | DocumentVersionCreateWithoutDocumentInput[] | DocumentVersionUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentVersionCreateOrConnectWithoutDocumentInput | DocumentVersionCreateOrConnectWithoutDocumentInput[]
    upsert?: DocumentVersionUpsertWithWhereUniqueWithoutDocumentInput | DocumentVersionUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: DocumentVersionCreateManyDocumentInputEnvelope
    set?: DocumentVersionWhereUniqueInput | DocumentVersionWhereUniqueInput[]
    disconnect?: DocumentVersionWhereUniqueInput | DocumentVersionWhereUniqueInput[]
    delete?: DocumentVersionWhereUniqueInput | DocumentVersionWhereUniqueInput[]
    connect?: DocumentVersionWhereUniqueInput | DocumentVersionWhereUniqueInput[]
    update?: DocumentVersionUpdateWithWhereUniqueWithoutDocumentInput | DocumentVersionUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: DocumentVersionUpdateManyWithWhereWithoutDocumentInput | DocumentVersionUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: DocumentVersionScalarWhereInput | DocumentVersionScalarWhereInput[]
  }

  export type DocumentAccessLogUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<DocumentAccessLogCreateWithoutDocumentInput, DocumentAccessLogUncheckedCreateWithoutDocumentInput> | DocumentAccessLogCreateWithoutDocumentInput[] | DocumentAccessLogUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentAccessLogCreateOrConnectWithoutDocumentInput | DocumentAccessLogCreateOrConnectWithoutDocumentInput[]
    upsert?: DocumentAccessLogUpsertWithWhereUniqueWithoutDocumentInput | DocumentAccessLogUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: DocumentAccessLogCreateManyDocumentInputEnvelope
    set?: DocumentAccessLogWhereUniqueInput | DocumentAccessLogWhereUniqueInput[]
    disconnect?: DocumentAccessLogWhereUniqueInput | DocumentAccessLogWhereUniqueInput[]
    delete?: DocumentAccessLogWhereUniqueInput | DocumentAccessLogWhereUniqueInput[]
    connect?: DocumentAccessLogWhereUniqueInput | DocumentAccessLogWhereUniqueInput[]
    update?: DocumentAccessLogUpdateWithWhereUniqueWithoutDocumentInput | DocumentAccessLogUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: DocumentAccessLogUpdateManyWithWhereWithoutDocumentInput | DocumentAccessLogUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: DocumentAccessLogScalarWhereInput | DocumentAccessLogScalarWhereInput[]
  }

  export type DocumentVersionUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<DocumentVersionCreateWithoutDocumentInput, DocumentVersionUncheckedCreateWithoutDocumentInput> | DocumentVersionCreateWithoutDocumentInput[] | DocumentVersionUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentVersionCreateOrConnectWithoutDocumentInput | DocumentVersionCreateOrConnectWithoutDocumentInput[]
    upsert?: DocumentVersionUpsertWithWhereUniqueWithoutDocumentInput | DocumentVersionUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: DocumentVersionCreateManyDocumentInputEnvelope
    set?: DocumentVersionWhereUniqueInput | DocumentVersionWhereUniqueInput[]
    disconnect?: DocumentVersionWhereUniqueInput | DocumentVersionWhereUniqueInput[]
    delete?: DocumentVersionWhereUniqueInput | DocumentVersionWhereUniqueInput[]
    connect?: DocumentVersionWhereUniqueInput | DocumentVersionWhereUniqueInput[]
    update?: DocumentVersionUpdateWithWhereUniqueWithoutDocumentInput | DocumentVersionUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: DocumentVersionUpdateManyWithWhereWithoutDocumentInput | DocumentVersionUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: DocumentVersionScalarWhereInput | DocumentVersionScalarWhereInput[]
  }

  export type DocumentAccessLogUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<DocumentAccessLogCreateWithoutDocumentInput, DocumentAccessLogUncheckedCreateWithoutDocumentInput> | DocumentAccessLogCreateWithoutDocumentInput[] | DocumentAccessLogUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentAccessLogCreateOrConnectWithoutDocumentInput | DocumentAccessLogCreateOrConnectWithoutDocumentInput[]
    upsert?: DocumentAccessLogUpsertWithWhereUniqueWithoutDocumentInput | DocumentAccessLogUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: DocumentAccessLogCreateManyDocumentInputEnvelope
    set?: DocumentAccessLogWhereUniqueInput | DocumentAccessLogWhereUniqueInput[]
    disconnect?: DocumentAccessLogWhereUniqueInput | DocumentAccessLogWhereUniqueInput[]
    delete?: DocumentAccessLogWhereUniqueInput | DocumentAccessLogWhereUniqueInput[]
    connect?: DocumentAccessLogWhereUniqueInput | DocumentAccessLogWhereUniqueInput[]
    update?: DocumentAccessLogUpdateWithWhereUniqueWithoutDocumentInput | DocumentAccessLogUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: DocumentAccessLogUpdateManyWithWhereWithoutDocumentInput | DocumentAccessLogUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: DocumentAccessLogScalarWhereInput | DocumentAccessLogScalarWhereInput[]
  }

  export type DocumentCreateNestedOneWithoutVersionsInput = {
    create?: XOR<DocumentCreateWithoutVersionsInput, DocumentUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutVersionsInput
    connect?: DocumentWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DocumentUpdateOneWithoutVersionsNestedInput = {
    create?: XOR<DocumentCreateWithoutVersionsInput, DocumentUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutVersionsInput
    upsert?: DocumentUpsertWithoutVersionsInput
    disconnect?: DocumentWhereInput | boolean
    delete?: DocumentWhereInput | boolean
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutVersionsInput, DocumentUpdateWithoutVersionsInput>, DocumentUncheckedUpdateWithoutVersionsInput>
  }

  export type DocumentCreateNestedOneWithoutAccessLogsInput = {
    create?: XOR<DocumentCreateWithoutAccessLogsInput, DocumentUncheckedCreateWithoutAccessLogsInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutAccessLogsInput
    connect?: DocumentWhereUniqueInput
  }

  export type DocumentUpdateOneWithoutAccessLogsNestedInput = {
    create?: XOR<DocumentCreateWithoutAccessLogsInput, DocumentUncheckedCreateWithoutAccessLogsInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutAccessLogsInput
    upsert?: DocumentUpsertWithoutAccessLogsInput
    disconnect?: DocumentWhereInput | boolean
    delete?: DocumentWhereInput | boolean
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutAccessLogsInput, DocumentUpdateWithoutAccessLogsInput>, DocumentUncheckedUpdateWithoutAccessLogsInput>
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

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
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

  export type CustomerKycCreateWithoutCustomerInput = {
    id: string
    panNumber: string
    aadhaarNumber?: string | null
    kycStatus: string
    verifiedAt?: Date | string | null
  }

  export type CustomerKycUncheckedCreateWithoutCustomerInput = {
    id: string
    panNumber: string
    aadhaarNumber?: string | null
    kycStatus: string
    verifiedAt?: Date | string | null
  }

  export type CustomerKycCreateOrConnectWithoutCustomerInput = {
    where: CustomerKycWhereUniqueInput
    create: XOR<CustomerKycCreateWithoutCustomerInput, CustomerKycUncheckedCreateWithoutCustomerInput>
  }

  export type CustomerAddressCreateWithoutCustomerInput = {
    id: string
    addressType: string
    street: string
    city: string
    state: string
    pincode: string
    isPrimary?: boolean
  }

  export type CustomerAddressUncheckedCreateWithoutCustomerInput = {
    id: string
    addressType: string
    street: string
    city: string
    state: string
    pincode: string
    isPrimary?: boolean
  }

  export type CustomerAddressCreateOrConnectWithoutCustomerInput = {
    where: CustomerAddressWhereUniqueInput
    create: XOR<CustomerAddressCreateWithoutCustomerInput, CustomerAddressUncheckedCreateWithoutCustomerInput>
  }

  export type CustomerAddressCreateManyCustomerInputEnvelope = {
    data: CustomerAddressCreateManyCustomerInput | CustomerAddressCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type CustomerHistoryCreateWithoutCustomerInput = {
    id: string
    action: string
    description?: string | null
    actionAt: Date | string
    actionBy?: string | null
  }

  export type CustomerHistoryUncheckedCreateWithoutCustomerInput = {
    id: string
    action: string
    description?: string | null
    actionAt: Date | string
    actionBy?: string | null
  }

  export type CustomerHistoryCreateOrConnectWithoutCustomerInput = {
    where: CustomerHistoryWhereUniqueInput
    create: XOR<CustomerHistoryCreateWithoutCustomerInput, CustomerHistoryUncheckedCreateWithoutCustomerInput>
  }

  export type CustomerHistoryCreateManyCustomerInputEnvelope = {
    data: CustomerHistoryCreateManyCustomerInput | CustomerHistoryCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type LeadCreateWithoutCustomerInput = {
    id: string
    firstName: string
    lastName: string
    email: string
    mobile: string
    panNumber: string
    aadhaarNumber?: string | null
    loanType?: string | null
    loanAmount?: Decimal | DecimalJsLike | number | string | null
    assignedTo?: string | null
    status?: string
    createdAt: Date | string
    profession?: string | null
    netMonthlySalary?: Decimal | DecimalJsLike | number | string | null
    gender?: string | null
    maritalStatus?: string | null
    dob?: string | null
    alternateContact?: string | null
    whatsappNo?: string | null
    officialEmail?: string | null
    currentAddressLine1?: string | null
    currentAddressLine2?: string | null
    currentState?: string | null
    currentDistrict?: string | null
    currentCity?: string | null
    currentPincode?: string | null
    residenceType?: string | null
    permanentAddressLine1?: string | null
    permanentAddressLine2?: string | null
    permanentState?: string | null
    permanentDistrict?: string | null
    permanentCity?: string | null
    permanentPincode?: string | null
    jobType?: string | null
    designation?: string | null
    modeOfSalary?: string | null
    officeAddress?: string | null
    officeState?: string | null
    officeDistrict?: string | null
    officeCity?: string | null
    officePincode?: string | null
    existingEmi?: Decimal | DecimalJsLike | number | string | null
    hasPriorPersonalLoan?: boolean | null
    opsNotes?: string | null
    companyName?: string | null
  }

  export type LeadUncheckedCreateWithoutCustomerInput = {
    id: string
    firstName: string
    lastName: string
    email: string
    mobile: string
    panNumber: string
    aadhaarNumber?: string | null
    loanType?: string | null
    loanAmount?: Decimal | DecimalJsLike | number | string | null
    assignedTo?: string | null
    status?: string
    createdAt: Date | string
    profession?: string | null
    netMonthlySalary?: Decimal | DecimalJsLike | number | string | null
    gender?: string | null
    maritalStatus?: string | null
    dob?: string | null
    alternateContact?: string | null
    whatsappNo?: string | null
    officialEmail?: string | null
    currentAddressLine1?: string | null
    currentAddressLine2?: string | null
    currentState?: string | null
    currentDistrict?: string | null
    currentCity?: string | null
    currentPincode?: string | null
    residenceType?: string | null
    permanentAddressLine1?: string | null
    permanentAddressLine2?: string | null
    permanentState?: string | null
    permanentDistrict?: string | null
    permanentCity?: string | null
    permanentPincode?: string | null
    jobType?: string | null
    designation?: string | null
    modeOfSalary?: string | null
    officeAddress?: string | null
    officeState?: string | null
    officeDistrict?: string | null
    officeCity?: string | null
    officePincode?: string | null
    existingEmi?: Decimal | DecimalJsLike | number | string | null
    hasPriorPersonalLoan?: boolean | null
    opsNotes?: string | null
    companyName?: string | null
  }

  export type LeadCreateOrConnectWithoutCustomerInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutCustomerInput, LeadUncheckedCreateWithoutCustomerInput>
  }

  export type LeadCreateManyCustomerInputEnvelope = {
    data: LeadCreateManyCustomerInput | LeadCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type CustomerKycUpsertWithoutCustomerInput = {
    update: XOR<CustomerKycUpdateWithoutCustomerInput, CustomerKycUncheckedUpdateWithoutCustomerInput>
    create: XOR<CustomerKycCreateWithoutCustomerInput, CustomerKycUncheckedCreateWithoutCustomerInput>
    where?: CustomerKycWhereInput
  }

  export type CustomerKycUpdateToOneWithWhereWithoutCustomerInput = {
    where?: CustomerKycWhereInput
    data: XOR<CustomerKycUpdateWithoutCustomerInput, CustomerKycUncheckedUpdateWithoutCustomerInput>
  }

  export type CustomerKycUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    panNumber?: StringFieldUpdateOperationsInput | string
    aadhaarNumber?: NullableStringFieldUpdateOperationsInput | string | null
    kycStatus?: StringFieldUpdateOperationsInput | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CustomerKycUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    panNumber?: StringFieldUpdateOperationsInput | string
    aadhaarNumber?: NullableStringFieldUpdateOperationsInput | string | null
    kycStatus?: StringFieldUpdateOperationsInput | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CustomerAddressUpsertWithWhereUniqueWithoutCustomerInput = {
    where: CustomerAddressWhereUniqueInput
    update: XOR<CustomerAddressUpdateWithoutCustomerInput, CustomerAddressUncheckedUpdateWithoutCustomerInput>
    create: XOR<CustomerAddressCreateWithoutCustomerInput, CustomerAddressUncheckedCreateWithoutCustomerInput>
  }

  export type CustomerAddressUpdateWithWhereUniqueWithoutCustomerInput = {
    where: CustomerAddressWhereUniqueInput
    data: XOR<CustomerAddressUpdateWithoutCustomerInput, CustomerAddressUncheckedUpdateWithoutCustomerInput>
  }

  export type CustomerAddressUpdateManyWithWhereWithoutCustomerInput = {
    where: CustomerAddressScalarWhereInput
    data: XOR<CustomerAddressUpdateManyMutationInput, CustomerAddressUncheckedUpdateManyWithoutCustomerInput>
  }

  export type CustomerAddressScalarWhereInput = {
    AND?: CustomerAddressScalarWhereInput | CustomerAddressScalarWhereInput[]
    OR?: CustomerAddressScalarWhereInput[]
    NOT?: CustomerAddressScalarWhereInput | CustomerAddressScalarWhereInput[]
    id?: StringFilter<"CustomerAddress"> | string
    customerId?: StringNullableFilter<"CustomerAddress"> | string | null
    addressType?: StringFilter<"CustomerAddress"> | string
    street?: StringFilter<"CustomerAddress"> | string
    city?: StringFilter<"CustomerAddress"> | string
    state?: StringFilter<"CustomerAddress"> | string
    pincode?: StringFilter<"CustomerAddress"> | string
    isPrimary?: BoolFilter<"CustomerAddress"> | boolean
  }

  export type CustomerHistoryUpsertWithWhereUniqueWithoutCustomerInput = {
    where: CustomerHistoryWhereUniqueInput
    update: XOR<CustomerHistoryUpdateWithoutCustomerInput, CustomerHistoryUncheckedUpdateWithoutCustomerInput>
    create: XOR<CustomerHistoryCreateWithoutCustomerInput, CustomerHistoryUncheckedCreateWithoutCustomerInput>
  }

  export type CustomerHistoryUpdateWithWhereUniqueWithoutCustomerInput = {
    where: CustomerHistoryWhereUniqueInput
    data: XOR<CustomerHistoryUpdateWithoutCustomerInput, CustomerHistoryUncheckedUpdateWithoutCustomerInput>
  }

  export type CustomerHistoryUpdateManyWithWhereWithoutCustomerInput = {
    where: CustomerHistoryScalarWhereInput
    data: XOR<CustomerHistoryUpdateManyMutationInput, CustomerHistoryUncheckedUpdateManyWithoutCustomerInput>
  }

  export type CustomerHistoryScalarWhereInput = {
    AND?: CustomerHistoryScalarWhereInput | CustomerHistoryScalarWhereInput[]
    OR?: CustomerHistoryScalarWhereInput[]
    NOT?: CustomerHistoryScalarWhereInput | CustomerHistoryScalarWhereInput[]
    id?: StringFilter<"CustomerHistory"> | string
    customerId?: StringNullableFilter<"CustomerHistory"> | string | null
    action?: StringFilter<"CustomerHistory"> | string
    description?: StringNullableFilter<"CustomerHistory"> | string | null
    actionAt?: DateTimeFilter<"CustomerHistory"> | Date | string
    actionBy?: StringNullableFilter<"CustomerHistory"> | string | null
  }

  export type LeadUpsertWithWhereUniqueWithoutCustomerInput = {
    where: LeadWhereUniqueInput
    update: XOR<LeadUpdateWithoutCustomerInput, LeadUncheckedUpdateWithoutCustomerInput>
    create: XOR<LeadCreateWithoutCustomerInput, LeadUncheckedCreateWithoutCustomerInput>
  }

  export type LeadUpdateWithWhereUniqueWithoutCustomerInput = {
    where: LeadWhereUniqueInput
    data: XOR<LeadUpdateWithoutCustomerInput, LeadUncheckedUpdateWithoutCustomerInput>
  }

  export type LeadUpdateManyWithWhereWithoutCustomerInput = {
    where: LeadScalarWhereInput
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyWithoutCustomerInput>
  }

  export type LeadScalarWhereInput = {
    AND?: LeadScalarWhereInput | LeadScalarWhereInput[]
    OR?: LeadScalarWhereInput[]
    NOT?: LeadScalarWhereInput | LeadScalarWhereInput[]
    id?: StringFilter<"Lead"> | string
    firstName?: StringFilter<"Lead"> | string
    lastName?: StringFilter<"Lead"> | string
    email?: StringFilter<"Lead"> | string
    mobile?: StringFilter<"Lead"> | string
    panNumber?: StringFilter<"Lead"> | string
    aadhaarNumber?: StringNullableFilter<"Lead"> | string | null
    loanType?: StringNullableFilter<"Lead"> | string | null
    loanAmount?: DecimalNullableFilter<"Lead"> | Decimal | DecimalJsLike | number | string | null
    assignedTo?: StringNullableFilter<"Lead"> | string | null
    status?: StringFilter<"Lead"> | string
    customerId?: StringNullableFilter<"Lead"> | string | null
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    profession?: StringNullableFilter<"Lead"> | string | null
    netMonthlySalary?: DecimalNullableFilter<"Lead"> | Decimal | DecimalJsLike | number | string | null
    gender?: StringNullableFilter<"Lead"> | string | null
    maritalStatus?: StringNullableFilter<"Lead"> | string | null
    dob?: StringNullableFilter<"Lead"> | string | null
    alternateContact?: StringNullableFilter<"Lead"> | string | null
    whatsappNo?: StringNullableFilter<"Lead"> | string | null
    officialEmail?: StringNullableFilter<"Lead"> | string | null
    currentAddressLine1?: StringNullableFilter<"Lead"> | string | null
    currentAddressLine2?: StringNullableFilter<"Lead"> | string | null
    currentState?: StringNullableFilter<"Lead"> | string | null
    currentDistrict?: StringNullableFilter<"Lead"> | string | null
    currentCity?: StringNullableFilter<"Lead"> | string | null
    currentPincode?: StringNullableFilter<"Lead"> | string | null
    residenceType?: StringNullableFilter<"Lead"> | string | null
    permanentAddressLine1?: StringNullableFilter<"Lead"> | string | null
    permanentAddressLine2?: StringNullableFilter<"Lead"> | string | null
    permanentState?: StringNullableFilter<"Lead"> | string | null
    permanentDistrict?: StringNullableFilter<"Lead"> | string | null
    permanentCity?: StringNullableFilter<"Lead"> | string | null
    permanentPincode?: StringNullableFilter<"Lead"> | string | null
    jobType?: StringNullableFilter<"Lead"> | string | null
    designation?: StringNullableFilter<"Lead"> | string | null
    modeOfSalary?: StringNullableFilter<"Lead"> | string | null
    officeAddress?: StringNullableFilter<"Lead"> | string | null
    officeState?: StringNullableFilter<"Lead"> | string | null
    officeDistrict?: StringNullableFilter<"Lead"> | string | null
    officeCity?: StringNullableFilter<"Lead"> | string | null
    officePincode?: StringNullableFilter<"Lead"> | string | null
    existingEmi?: DecimalNullableFilter<"Lead"> | Decimal | DecimalJsLike | number | string | null
    hasPriorPersonalLoan?: BoolNullableFilter<"Lead"> | boolean | null
    opsNotes?: StringNullableFilter<"Lead"> | string | null
    companyName?: StringNullableFilter<"Lead"> | string | null
  }

  export type CustomerCreateWithoutKycInput = {
    id: string
    firstName: string
    lastName: string
    email: string
    mobile: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    addresses?: CustomerAddressCreateNestedManyWithoutCustomerInput
    history?: CustomerHistoryCreateNestedManyWithoutCustomerInput
    leads?: LeadCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutKycInput = {
    id: string
    firstName: string
    lastName: string
    email: string
    mobile: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    addresses?: CustomerAddressUncheckedCreateNestedManyWithoutCustomerInput
    history?: CustomerHistoryUncheckedCreateNestedManyWithoutCustomerInput
    leads?: LeadUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutKycInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutKycInput, CustomerUncheckedCreateWithoutKycInput>
  }

  export type CustomerUpsertWithoutKycInput = {
    update: XOR<CustomerUpdateWithoutKycInput, CustomerUncheckedUpdateWithoutKycInput>
    create: XOR<CustomerCreateWithoutKycInput, CustomerUncheckedCreateWithoutKycInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutKycInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutKycInput, CustomerUncheckedUpdateWithoutKycInput>
  }

  export type CustomerUpdateWithoutKycInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    addresses?: CustomerAddressUpdateManyWithoutCustomerNestedInput
    history?: CustomerHistoryUpdateManyWithoutCustomerNestedInput
    leads?: LeadUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutKycInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    addresses?: CustomerAddressUncheckedUpdateManyWithoutCustomerNestedInput
    history?: CustomerHistoryUncheckedUpdateManyWithoutCustomerNestedInput
    leads?: LeadUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateWithoutAddressesInput = {
    id: string
    firstName: string
    lastName: string
    email: string
    mobile: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    kyc?: CustomerKycCreateNestedOneWithoutCustomerInput
    history?: CustomerHistoryCreateNestedManyWithoutCustomerInput
    leads?: LeadCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutAddressesInput = {
    id: string
    firstName: string
    lastName: string
    email: string
    mobile: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    kyc?: CustomerKycUncheckedCreateNestedOneWithoutCustomerInput
    history?: CustomerHistoryUncheckedCreateNestedManyWithoutCustomerInput
    leads?: LeadUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutAddressesInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutAddressesInput, CustomerUncheckedCreateWithoutAddressesInput>
  }

  export type CustomerUpsertWithoutAddressesInput = {
    update: XOR<CustomerUpdateWithoutAddressesInput, CustomerUncheckedUpdateWithoutAddressesInput>
    create: XOR<CustomerCreateWithoutAddressesInput, CustomerUncheckedCreateWithoutAddressesInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutAddressesInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutAddressesInput, CustomerUncheckedUpdateWithoutAddressesInput>
  }

  export type CustomerUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    kyc?: CustomerKycUpdateOneWithoutCustomerNestedInput
    history?: CustomerHistoryUpdateManyWithoutCustomerNestedInput
    leads?: LeadUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    kyc?: CustomerKycUncheckedUpdateOneWithoutCustomerNestedInput
    history?: CustomerHistoryUncheckedUpdateManyWithoutCustomerNestedInput
    leads?: LeadUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateWithoutHistoryInput = {
    id: string
    firstName: string
    lastName: string
    email: string
    mobile: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    kyc?: CustomerKycCreateNestedOneWithoutCustomerInput
    addresses?: CustomerAddressCreateNestedManyWithoutCustomerInput
    leads?: LeadCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutHistoryInput = {
    id: string
    firstName: string
    lastName: string
    email: string
    mobile: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    kyc?: CustomerKycUncheckedCreateNestedOneWithoutCustomerInput
    addresses?: CustomerAddressUncheckedCreateNestedManyWithoutCustomerInput
    leads?: LeadUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutHistoryInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutHistoryInput, CustomerUncheckedCreateWithoutHistoryInput>
  }

  export type CustomerUpsertWithoutHistoryInput = {
    update: XOR<CustomerUpdateWithoutHistoryInput, CustomerUncheckedUpdateWithoutHistoryInput>
    create: XOR<CustomerCreateWithoutHistoryInput, CustomerUncheckedCreateWithoutHistoryInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutHistoryInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutHistoryInput, CustomerUncheckedUpdateWithoutHistoryInput>
  }

  export type CustomerUpdateWithoutHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    kyc?: CustomerKycUpdateOneWithoutCustomerNestedInput
    addresses?: CustomerAddressUpdateManyWithoutCustomerNestedInput
    leads?: LeadUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    kyc?: CustomerKycUncheckedUpdateOneWithoutCustomerNestedInput
    addresses?: CustomerAddressUncheckedUpdateManyWithoutCustomerNestedInput
    leads?: LeadUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateWithoutLeadsInput = {
    id: string
    firstName: string
    lastName: string
    email: string
    mobile: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    kyc?: CustomerKycCreateNestedOneWithoutCustomerInput
    addresses?: CustomerAddressCreateNestedManyWithoutCustomerInput
    history?: CustomerHistoryCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutLeadsInput = {
    id: string
    firstName: string
    lastName: string
    email: string
    mobile: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    kyc?: CustomerKycUncheckedCreateNestedOneWithoutCustomerInput
    addresses?: CustomerAddressUncheckedCreateNestedManyWithoutCustomerInput
    history?: CustomerHistoryUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutLeadsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutLeadsInput, CustomerUncheckedCreateWithoutLeadsInput>
  }

  export type CustomerUpsertWithoutLeadsInput = {
    update: XOR<CustomerUpdateWithoutLeadsInput, CustomerUncheckedUpdateWithoutLeadsInput>
    create: XOR<CustomerCreateWithoutLeadsInput, CustomerUncheckedCreateWithoutLeadsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutLeadsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutLeadsInput, CustomerUncheckedUpdateWithoutLeadsInput>
  }

  export type CustomerUpdateWithoutLeadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    kyc?: CustomerKycUpdateOneWithoutCustomerNestedInput
    addresses?: CustomerAddressUpdateManyWithoutCustomerNestedInput
    history?: CustomerHistoryUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutLeadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    kyc?: CustomerKycUncheckedUpdateOneWithoutCustomerNestedInput
    addresses?: CustomerAddressUncheckedUpdateManyWithoutCustomerNestedInput
    history?: CustomerHistoryUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type DocumentVersionCreateWithoutDocumentInput = {
    id: string
    versionNumber: number
    s3Key: string
    uploadedAt: Date | string
    uploadedBy?: string | null
  }

  export type DocumentVersionUncheckedCreateWithoutDocumentInput = {
    id: string
    versionNumber: number
    s3Key: string
    uploadedAt: Date | string
    uploadedBy?: string | null
  }

  export type DocumentVersionCreateOrConnectWithoutDocumentInput = {
    where: DocumentVersionWhereUniqueInput
    create: XOR<DocumentVersionCreateWithoutDocumentInput, DocumentVersionUncheckedCreateWithoutDocumentInput>
  }

  export type DocumentVersionCreateManyDocumentInputEnvelope = {
    data: DocumentVersionCreateManyDocumentInput | DocumentVersionCreateManyDocumentInput[]
    skipDuplicates?: boolean
  }

  export type DocumentAccessLogCreateWithoutDocumentInput = {
    id: string
    accessedBy: string
    accessType: string
    accessedAt: Date | string
  }

  export type DocumentAccessLogUncheckedCreateWithoutDocumentInput = {
    id: string
    accessedBy: string
    accessType: string
    accessedAt: Date | string
  }

  export type DocumentAccessLogCreateOrConnectWithoutDocumentInput = {
    where: DocumentAccessLogWhereUniqueInput
    create: XOR<DocumentAccessLogCreateWithoutDocumentInput, DocumentAccessLogUncheckedCreateWithoutDocumentInput>
  }

  export type DocumentAccessLogCreateManyDocumentInputEnvelope = {
    data: DocumentAccessLogCreateManyDocumentInput | DocumentAccessLogCreateManyDocumentInput[]
    skipDuplicates?: boolean
  }

  export type DocumentVersionUpsertWithWhereUniqueWithoutDocumentInput = {
    where: DocumentVersionWhereUniqueInput
    update: XOR<DocumentVersionUpdateWithoutDocumentInput, DocumentVersionUncheckedUpdateWithoutDocumentInput>
    create: XOR<DocumentVersionCreateWithoutDocumentInput, DocumentVersionUncheckedCreateWithoutDocumentInput>
  }

  export type DocumentVersionUpdateWithWhereUniqueWithoutDocumentInput = {
    where: DocumentVersionWhereUniqueInput
    data: XOR<DocumentVersionUpdateWithoutDocumentInput, DocumentVersionUncheckedUpdateWithoutDocumentInput>
  }

  export type DocumentVersionUpdateManyWithWhereWithoutDocumentInput = {
    where: DocumentVersionScalarWhereInput
    data: XOR<DocumentVersionUpdateManyMutationInput, DocumentVersionUncheckedUpdateManyWithoutDocumentInput>
  }

  export type DocumentVersionScalarWhereInput = {
    AND?: DocumentVersionScalarWhereInput | DocumentVersionScalarWhereInput[]
    OR?: DocumentVersionScalarWhereInput[]
    NOT?: DocumentVersionScalarWhereInput | DocumentVersionScalarWhereInput[]
    id?: StringFilter<"DocumentVersion"> | string
    documentId?: StringNullableFilter<"DocumentVersion"> | string | null
    versionNumber?: IntFilter<"DocumentVersion"> | number
    s3Key?: StringFilter<"DocumentVersion"> | string
    uploadedAt?: DateTimeFilter<"DocumentVersion"> | Date | string
    uploadedBy?: StringNullableFilter<"DocumentVersion"> | string | null
  }

  export type DocumentAccessLogUpsertWithWhereUniqueWithoutDocumentInput = {
    where: DocumentAccessLogWhereUniqueInput
    update: XOR<DocumentAccessLogUpdateWithoutDocumentInput, DocumentAccessLogUncheckedUpdateWithoutDocumentInput>
    create: XOR<DocumentAccessLogCreateWithoutDocumentInput, DocumentAccessLogUncheckedCreateWithoutDocumentInput>
  }

  export type DocumentAccessLogUpdateWithWhereUniqueWithoutDocumentInput = {
    where: DocumentAccessLogWhereUniqueInput
    data: XOR<DocumentAccessLogUpdateWithoutDocumentInput, DocumentAccessLogUncheckedUpdateWithoutDocumentInput>
  }

  export type DocumentAccessLogUpdateManyWithWhereWithoutDocumentInput = {
    where: DocumentAccessLogScalarWhereInput
    data: XOR<DocumentAccessLogUpdateManyMutationInput, DocumentAccessLogUncheckedUpdateManyWithoutDocumentInput>
  }

  export type DocumentAccessLogScalarWhereInput = {
    AND?: DocumentAccessLogScalarWhereInput | DocumentAccessLogScalarWhereInput[]
    OR?: DocumentAccessLogScalarWhereInput[]
    NOT?: DocumentAccessLogScalarWhereInput | DocumentAccessLogScalarWhereInput[]
    id?: StringFilter<"DocumentAccessLog"> | string
    documentId?: StringNullableFilter<"DocumentAccessLog"> | string | null
    accessedBy?: StringFilter<"DocumentAccessLog"> | string
    accessType?: StringFilter<"DocumentAccessLog"> | string
    accessedAt?: DateTimeFilter<"DocumentAccessLog"> | Date | string
  }

  export type DocumentCreateWithoutVersionsInput = {
    id: string
    loanId?: string | null
    uploadedBy: string
    documentType: string
    s3Key: string
    fileName: string
    mimeType: string
    fileSizeBytes?: bigint | number | null
    status: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    ownerId?: string | null
    folderPath?: string
    reviewerId?: string | null
    reviewRemarks?: string | null
    reviewedAt?: Date | string | null
    accessLogs?: DocumentAccessLogCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutVersionsInput = {
    id: string
    loanId?: string | null
    uploadedBy: string
    documentType: string
    s3Key: string
    fileName: string
    mimeType: string
    fileSizeBytes?: bigint | number | null
    status: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    ownerId?: string | null
    folderPath?: string
    reviewerId?: string | null
    reviewRemarks?: string | null
    reviewedAt?: Date | string | null
    accessLogs?: DocumentAccessLogUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutVersionsInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutVersionsInput, DocumentUncheckedCreateWithoutVersionsInput>
  }

  export type DocumentUpsertWithoutVersionsInput = {
    update: XOR<DocumentUpdateWithoutVersionsInput, DocumentUncheckedUpdateWithoutVersionsInput>
    create: XOR<DocumentCreateWithoutVersionsInput, DocumentUncheckedCreateWithoutVersionsInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutVersionsInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutVersionsInput, DocumentUncheckedUpdateWithoutVersionsInput>
  }

  export type DocumentUpdateWithoutVersionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedBy?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSizeBytes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    folderPath?: StringFieldUpdateOperationsInput | string
    reviewerId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewRemarks?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessLogs?: DocumentAccessLogUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutVersionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedBy?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSizeBytes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    folderPath?: StringFieldUpdateOperationsInput | string
    reviewerId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewRemarks?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessLogs?: DocumentAccessLogUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentCreateWithoutAccessLogsInput = {
    id: string
    loanId?: string | null
    uploadedBy: string
    documentType: string
    s3Key: string
    fileName: string
    mimeType: string
    fileSizeBytes?: bigint | number | null
    status: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    ownerId?: string | null
    folderPath?: string
    reviewerId?: string | null
    reviewRemarks?: string | null
    reviewedAt?: Date | string | null
    versions?: DocumentVersionCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutAccessLogsInput = {
    id: string
    loanId?: string | null
    uploadedBy: string
    documentType: string
    s3Key: string
    fileName: string
    mimeType: string
    fileSizeBytes?: bigint | number | null
    status: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    ownerId?: string | null
    folderPath?: string
    reviewerId?: string | null
    reviewRemarks?: string | null
    reviewedAt?: Date | string | null
    versions?: DocumentVersionUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutAccessLogsInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutAccessLogsInput, DocumentUncheckedCreateWithoutAccessLogsInput>
  }

  export type DocumentUpsertWithoutAccessLogsInput = {
    update: XOR<DocumentUpdateWithoutAccessLogsInput, DocumentUncheckedUpdateWithoutAccessLogsInput>
    create: XOR<DocumentCreateWithoutAccessLogsInput, DocumentUncheckedCreateWithoutAccessLogsInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutAccessLogsInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutAccessLogsInput, DocumentUncheckedUpdateWithoutAccessLogsInput>
  }

  export type DocumentUpdateWithoutAccessLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedBy?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSizeBytes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    folderPath?: StringFieldUpdateOperationsInput | string
    reviewerId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewRemarks?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versions?: DocumentVersionUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutAccessLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedBy?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSizeBytes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    folderPath?: StringFieldUpdateOperationsInput | string
    reviewerId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewRemarks?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versions?: DocumentVersionUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type CustomerAddressCreateManyCustomerInput = {
    id: string
    addressType: string
    street: string
    city: string
    state: string
    pincode: string
    isPrimary?: boolean
  }

  export type CustomerHistoryCreateManyCustomerInput = {
    id: string
    action: string
    description?: string | null
    actionAt: Date | string
    actionBy?: string | null
  }

  export type LeadCreateManyCustomerInput = {
    id: string
    firstName: string
    lastName: string
    email: string
    mobile: string
    panNumber: string
    aadhaarNumber?: string | null
    loanType?: string | null
    loanAmount?: Decimal | DecimalJsLike | number | string | null
    assignedTo?: string | null
    status?: string
    createdAt: Date | string
    profession?: string | null
    netMonthlySalary?: Decimal | DecimalJsLike | number | string | null
    gender?: string | null
    maritalStatus?: string | null
    dob?: string | null
    alternateContact?: string | null
    whatsappNo?: string | null
    officialEmail?: string | null
    currentAddressLine1?: string | null
    currentAddressLine2?: string | null
    currentState?: string | null
    currentDistrict?: string | null
    currentCity?: string | null
    currentPincode?: string | null
    residenceType?: string | null
    permanentAddressLine1?: string | null
    permanentAddressLine2?: string | null
    permanentState?: string | null
    permanentDistrict?: string | null
    permanentCity?: string | null
    permanentPincode?: string | null
    jobType?: string | null
    designation?: string | null
    modeOfSalary?: string | null
    officeAddress?: string | null
    officeState?: string | null
    officeDistrict?: string | null
    officeCity?: string | null
    officePincode?: string | null
    existingEmi?: Decimal | DecimalJsLike | number | string | null
    hasPriorPersonalLoan?: boolean | null
    opsNotes?: string | null
    companyName?: string | null
  }

  export type CustomerAddressUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    addressType?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CustomerAddressUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    addressType?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CustomerAddressUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    addressType?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CustomerHistoryUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    actionAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CustomerHistoryUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    actionAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CustomerHistoryUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    actionAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LeadUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    panNumber?: StringFieldUpdateOperationsInput | string
    aadhaarNumber?: NullableStringFieldUpdateOperationsInput | string | null
    loanType?: NullableStringFieldUpdateOperationsInput | string | null
    loanAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profession?: NullableStringFieldUpdateOperationsInput | string | null
    netMonthlySalary?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    maritalStatus?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableStringFieldUpdateOperationsInput | string | null
    alternateContact?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappNo?: NullableStringFieldUpdateOperationsInput | string | null
    officialEmail?: NullableStringFieldUpdateOperationsInput | string | null
    currentAddressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    currentAddressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    currentState?: NullableStringFieldUpdateOperationsInput | string | null
    currentDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    currentCity?: NullableStringFieldUpdateOperationsInput | string | null
    currentPincode?: NullableStringFieldUpdateOperationsInput | string | null
    residenceType?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    permanentState?: NullableStringFieldUpdateOperationsInput | string | null
    permanentDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    permanentCity?: NullableStringFieldUpdateOperationsInput | string | null
    permanentPincode?: NullableStringFieldUpdateOperationsInput | string | null
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    modeOfSalary?: NullableStringFieldUpdateOperationsInput | string | null
    officeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    officeState?: NullableStringFieldUpdateOperationsInput | string | null
    officeDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    officeCity?: NullableStringFieldUpdateOperationsInput | string | null
    officePincode?: NullableStringFieldUpdateOperationsInput | string | null
    existingEmi?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    hasPriorPersonalLoan?: NullableBoolFieldUpdateOperationsInput | boolean | null
    opsNotes?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LeadUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    panNumber?: StringFieldUpdateOperationsInput | string
    aadhaarNumber?: NullableStringFieldUpdateOperationsInput | string | null
    loanType?: NullableStringFieldUpdateOperationsInput | string | null
    loanAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profession?: NullableStringFieldUpdateOperationsInput | string | null
    netMonthlySalary?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    maritalStatus?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableStringFieldUpdateOperationsInput | string | null
    alternateContact?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappNo?: NullableStringFieldUpdateOperationsInput | string | null
    officialEmail?: NullableStringFieldUpdateOperationsInput | string | null
    currentAddressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    currentAddressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    currentState?: NullableStringFieldUpdateOperationsInput | string | null
    currentDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    currentCity?: NullableStringFieldUpdateOperationsInput | string | null
    currentPincode?: NullableStringFieldUpdateOperationsInput | string | null
    residenceType?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    permanentState?: NullableStringFieldUpdateOperationsInput | string | null
    permanentDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    permanentCity?: NullableStringFieldUpdateOperationsInput | string | null
    permanentPincode?: NullableStringFieldUpdateOperationsInput | string | null
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    modeOfSalary?: NullableStringFieldUpdateOperationsInput | string | null
    officeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    officeState?: NullableStringFieldUpdateOperationsInput | string | null
    officeDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    officeCity?: NullableStringFieldUpdateOperationsInput | string | null
    officePincode?: NullableStringFieldUpdateOperationsInput | string | null
    existingEmi?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    hasPriorPersonalLoan?: NullableBoolFieldUpdateOperationsInput | boolean | null
    opsNotes?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LeadUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    panNumber?: StringFieldUpdateOperationsInput | string
    aadhaarNumber?: NullableStringFieldUpdateOperationsInput | string | null
    loanType?: NullableStringFieldUpdateOperationsInput | string | null
    loanAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profession?: NullableStringFieldUpdateOperationsInput | string | null
    netMonthlySalary?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    maritalStatus?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableStringFieldUpdateOperationsInput | string | null
    alternateContact?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappNo?: NullableStringFieldUpdateOperationsInput | string | null
    officialEmail?: NullableStringFieldUpdateOperationsInput | string | null
    currentAddressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    currentAddressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    currentState?: NullableStringFieldUpdateOperationsInput | string | null
    currentDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    currentCity?: NullableStringFieldUpdateOperationsInput | string | null
    currentPincode?: NullableStringFieldUpdateOperationsInput | string | null
    residenceType?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    permanentAddressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    permanentState?: NullableStringFieldUpdateOperationsInput | string | null
    permanentDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    permanentCity?: NullableStringFieldUpdateOperationsInput | string | null
    permanentPincode?: NullableStringFieldUpdateOperationsInput | string | null
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    modeOfSalary?: NullableStringFieldUpdateOperationsInput | string | null
    officeAddress?: NullableStringFieldUpdateOperationsInput | string | null
    officeState?: NullableStringFieldUpdateOperationsInput | string | null
    officeDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    officeCity?: NullableStringFieldUpdateOperationsInput | string | null
    officePincode?: NullableStringFieldUpdateOperationsInput | string | null
    existingEmi?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    hasPriorPersonalLoan?: NullableBoolFieldUpdateOperationsInput | boolean | null
    opsNotes?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocumentVersionCreateManyDocumentInput = {
    id: string
    versionNumber: number
    s3Key: string
    uploadedAt: Date | string
    uploadedBy?: string | null
  }

  export type DocumentAccessLogCreateManyDocumentInput = {
    id: string
    accessedBy: string
    accessType: string
    accessedAt: Date | string
  }

  export type DocumentVersionUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocumentVersionUncheckedUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocumentVersionUncheckedUpdateManyWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocumentAccessLogUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessedBy?: StringFieldUpdateOperationsInput | string
    accessType?: StringFieldUpdateOperationsInput | string
    accessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentAccessLogUncheckedUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessedBy?: StringFieldUpdateOperationsInput | string
    accessType?: StringFieldUpdateOperationsInput | string
    accessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentAccessLogUncheckedUpdateManyWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessedBy?: StringFieldUpdateOperationsInput | string
    accessType?: StringFieldUpdateOperationsInput | string
    accessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use CustomerCountOutputTypeDefaultArgs instead
     */
    export type CustomerCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CustomerCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DocumentCountOutputTypeDefaultArgs instead
     */
    export type DocumentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DocumentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CustomerDefaultArgs instead
     */
    export type CustomerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CustomerDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CustomerKycDefaultArgs instead
     */
    export type CustomerKycArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CustomerKycDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CustomerAddressDefaultArgs instead
     */
    export type CustomerAddressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CustomerAddressDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CustomerHistoryDefaultArgs instead
     */
    export type CustomerHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CustomerHistoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LeadDefaultArgs instead
     */
    export type LeadArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LeadDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DocumentDefaultArgs instead
     */
    export type DocumentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DocumentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DocumentVersionDefaultArgs instead
     */
    export type DocumentVersionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DocumentVersionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DocumentAccessLogDefaultArgs instead
     */
    export type DocumentAccessLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DocumentAccessLogDefaultArgs<ExtArgs>

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