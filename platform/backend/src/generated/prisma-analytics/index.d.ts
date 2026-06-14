
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
 * Model AnalyticsSnapshot
 * 
 */
export type AnalyticsSnapshot = $Result.DefaultSelection<Prisma.$AnalyticsSnapshotPayload>
/**
 * Model AggregationLog
 * 
 */
export type AggregationLog = $Result.DefaultSelection<Prisma.$AggregationLogPayload>
/**
 * Model ReportJob
 * 
 */
export type ReportJob = $Result.DefaultSelection<Prisma.$ReportJobPayload>
/**
 * Model MisReport
 * 
 */
export type MisReport = $Result.DefaultSelection<Prisma.$MisReportPayload>
/**
 * Model EmailConfig
 * 
 */
export type EmailConfig = $Result.DefaultSelection<Prisma.$EmailConfigPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AnalyticsSnapshots
 * const analyticsSnapshots = await prisma.analyticsSnapshot.findMany()
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
   * // Fetch zero or more AnalyticsSnapshots
   * const analyticsSnapshots = await prisma.analyticsSnapshot.findMany()
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
   * `prisma.analyticsSnapshot`: Exposes CRUD operations for the **AnalyticsSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AnalyticsSnapshots
    * const analyticsSnapshots = await prisma.analyticsSnapshot.findMany()
    * ```
    */
  get analyticsSnapshot(): Prisma.AnalyticsSnapshotDelegate<ExtArgs>;

  /**
   * `prisma.aggregationLog`: Exposes CRUD operations for the **AggregationLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AggregationLogs
    * const aggregationLogs = await prisma.aggregationLog.findMany()
    * ```
    */
  get aggregationLog(): Prisma.AggregationLogDelegate<ExtArgs>;

  /**
   * `prisma.reportJob`: Exposes CRUD operations for the **ReportJob** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReportJobs
    * const reportJobs = await prisma.reportJob.findMany()
    * ```
    */
  get reportJob(): Prisma.ReportJobDelegate<ExtArgs>;

  /**
   * `prisma.misReport`: Exposes CRUD operations for the **MisReport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MisReports
    * const misReports = await prisma.misReport.findMany()
    * ```
    */
  get misReport(): Prisma.MisReportDelegate<ExtArgs>;

  /**
   * `prisma.emailConfig`: Exposes CRUD operations for the **EmailConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmailConfigs
    * const emailConfigs = await prisma.emailConfig.findMany()
    * ```
    */
  get emailConfig(): Prisma.EmailConfigDelegate<ExtArgs>;
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
    AnalyticsSnapshot: 'AnalyticsSnapshot',
    AggregationLog: 'AggregationLog',
    ReportJob: 'ReportJob',
    MisReport: 'MisReport',
    EmailConfig: 'EmailConfig'
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
      modelProps: "analyticsSnapshot" | "aggregationLog" | "reportJob" | "misReport" | "emailConfig"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AnalyticsSnapshot: {
        payload: Prisma.$AnalyticsSnapshotPayload<ExtArgs>
        fields: Prisma.AnalyticsSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnalyticsSnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnalyticsSnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsSnapshotPayload>
          }
          findFirst: {
            args: Prisma.AnalyticsSnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnalyticsSnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsSnapshotPayload>
          }
          findMany: {
            args: Prisma.AnalyticsSnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsSnapshotPayload>[]
          }
          create: {
            args: Prisma.AnalyticsSnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsSnapshotPayload>
          }
          createMany: {
            args: Prisma.AnalyticsSnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AnalyticsSnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsSnapshotPayload>
          }
          update: {
            args: Prisma.AnalyticsSnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.AnalyticsSnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnalyticsSnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AnalyticsSnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsSnapshotPayload>
          }
          aggregate: {
            args: Prisma.AnalyticsSnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnalyticsSnapshot>
          }
          groupBy: {
            args: Prisma.AnalyticsSnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnalyticsSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnalyticsSnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<AnalyticsSnapshotCountAggregateOutputType> | number
          }
        }
      }
      AggregationLog: {
        payload: Prisma.$AggregationLogPayload<ExtArgs>
        fields: Prisma.AggregationLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AggregationLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AggregationLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AggregationLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AggregationLogPayload>
          }
          findFirst: {
            args: Prisma.AggregationLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AggregationLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AggregationLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AggregationLogPayload>
          }
          findMany: {
            args: Prisma.AggregationLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AggregationLogPayload>[]
          }
          create: {
            args: Prisma.AggregationLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AggregationLogPayload>
          }
          createMany: {
            args: Prisma.AggregationLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AggregationLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AggregationLogPayload>
          }
          update: {
            args: Prisma.AggregationLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AggregationLogPayload>
          }
          deleteMany: {
            args: Prisma.AggregationLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AggregationLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AggregationLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AggregationLogPayload>
          }
          aggregate: {
            args: Prisma.AggregationLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAggregationLog>
          }
          groupBy: {
            args: Prisma.AggregationLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AggregationLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AggregationLogCountArgs<ExtArgs>
            result: $Utils.Optional<AggregationLogCountAggregateOutputType> | number
          }
        }
      }
      ReportJob: {
        payload: Prisma.$ReportJobPayload<ExtArgs>
        fields: Prisma.ReportJobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReportJobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportJobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReportJobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportJobPayload>
          }
          findFirst: {
            args: Prisma.ReportJobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportJobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReportJobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportJobPayload>
          }
          findMany: {
            args: Prisma.ReportJobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportJobPayload>[]
          }
          create: {
            args: Prisma.ReportJobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportJobPayload>
          }
          createMany: {
            args: Prisma.ReportJobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ReportJobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportJobPayload>
          }
          update: {
            args: Prisma.ReportJobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportJobPayload>
          }
          deleteMany: {
            args: Prisma.ReportJobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReportJobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReportJobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportJobPayload>
          }
          aggregate: {
            args: Prisma.ReportJobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReportJob>
          }
          groupBy: {
            args: Prisma.ReportJobGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReportJobGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReportJobCountArgs<ExtArgs>
            result: $Utils.Optional<ReportJobCountAggregateOutputType> | number
          }
        }
      }
      MisReport: {
        payload: Prisma.$MisReportPayload<ExtArgs>
        fields: Prisma.MisReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MisReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MisReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MisReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MisReportPayload>
          }
          findFirst: {
            args: Prisma.MisReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MisReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MisReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MisReportPayload>
          }
          findMany: {
            args: Prisma.MisReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MisReportPayload>[]
          }
          create: {
            args: Prisma.MisReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MisReportPayload>
          }
          createMany: {
            args: Prisma.MisReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MisReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MisReportPayload>
          }
          update: {
            args: Prisma.MisReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MisReportPayload>
          }
          deleteMany: {
            args: Prisma.MisReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MisReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MisReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MisReportPayload>
          }
          aggregate: {
            args: Prisma.MisReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMisReport>
          }
          groupBy: {
            args: Prisma.MisReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<MisReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.MisReportCountArgs<ExtArgs>
            result: $Utils.Optional<MisReportCountAggregateOutputType> | number
          }
        }
      }
      EmailConfig: {
        payload: Prisma.$EmailConfigPayload<ExtArgs>
        fields: Prisma.EmailConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailConfigPayload>
          }
          findFirst: {
            args: Prisma.EmailConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailConfigPayload>
          }
          findMany: {
            args: Prisma.EmailConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailConfigPayload>[]
          }
          create: {
            args: Prisma.EmailConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailConfigPayload>
          }
          createMany: {
            args: Prisma.EmailConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EmailConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailConfigPayload>
          }
          update: {
            args: Prisma.EmailConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailConfigPayload>
          }
          deleteMany: {
            args: Prisma.EmailConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EmailConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailConfigPayload>
          }
          aggregate: {
            args: Prisma.EmailConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmailConfig>
          }
          groupBy: {
            args: Prisma.EmailConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailConfigCountArgs<ExtArgs>
            result: $Utils.Optional<EmailConfigCountAggregateOutputType> | number
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
   * Models
   */

  /**
   * Model AnalyticsSnapshot
   */

  export type AggregateAnalyticsSnapshot = {
    _count: AnalyticsSnapshotCountAggregateOutputType | null
    _avg: AnalyticsSnapshotAvgAggregateOutputType | null
    _sum: AnalyticsSnapshotSumAggregateOutputType | null
    _min: AnalyticsSnapshotMinAggregateOutputType | null
    _max: AnalyticsSnapshotMaxAggregateOutputType | null
  }

  export type AnalyticsSnapshotAvgAggregateOutputType = {
    metricValue: number | null
  }

  export type AnalyticsSnapshotSumAggregateOutputType = {
    metricValue: number | null
  }

  export type AnalyticsSnapshotMinAggregateOutputType = {
    id: string | null
    snapshotDate: Date | null
    metricType: string | null
    metricValue: number | null
    dimension: string | null
    dimensionValue: string | null
    createdAt: Date | null
  }

  export type AnalyticsSnapshotMaxAggregateOutputType = {
    id: string | null
    snapshotDate: Date | null
    metricType: string | null
    metricValue: number | null
    dimension: string | null
    dimensionValue: string | null
    createdAt: Date | null
  }

  export type AnalyticsSnapshotCountAggregateOutputType = {
    id: number
    snapshotDate: number
    metricType: number
    metricValue: number
    dimension: number
    dimensionValue: number
    createdAt: number
    _all: number
  }


  export type AnalyticsSnapshotAvgAggregateInputType = {
    metricValue?: true
  }

  export type AnalyticsSnapshotSumAggregateInputType = {
    metricValue?: true
  }

  export type AnalyticsSnapshotMinAggregateInputType = {
    id?: true
    snapshotDate?: true
    metricType?: true
    metricValue?: true
    dimension?: true
    dimensionValue?: true
    createdAt?: true
  }

  export type AnalyticsSnapshotMaxAggregateInputType = {
    id?: true
    snapshotDate?: true
    metricType?: true
    metricValue?: true
    dimension?: true
    dimensionValue?: true
    createdAt?: true
  }

  export type AnalyticsSnapshotCountAggregateInputType = {
    id?: true
    snapshotDate?: true
    metricType?: true
    metricValue?: true
    dimension?: true
    dimensionValue?: true
    createdAt?: true
    _all?: true
  }

  export type AnalyticsSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnalyticsSnapshot to aggregate.
     */
    where?: AnalyticsSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsSnapshots to fetch.
     */
    orderBy?: AnalyticsSnapshotOrderByWithRelationInput | AnalyticsSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnalyticsSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AnalyticsSnapshots
    **/
    _count?: true | AnalyticsSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnalyticsSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnalyticsSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnalyticsSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnalyticsSnapshotMaxAggregateInputType
  }

  export type GetAnalyticsSnapshotAggregateType<T extends AnalyticsSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateAnalyticsSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnalyticsSnapshot[P]>
      : GetScalarType<T[P], AggregateAnalyticsSnapshot[P]>
  }




  export type AnalyticsSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalyticsSnapshotWhereInput
    orderBy?: AnalyticsSnapshotOrderByWithAggregationInput | AnalyticsSnapshotOrderByWithAggregationInput[]
    by: AnalyticsSnapshotScalarFieldEnum[] | AnalyticsSnapshotScalarFieldEnum
    having?: AnalyticsSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnalyticsSnapshotCountAggregateInputType | true
    _avg?: AnalyticsSnapshotAvgAggregateInputType
    _sum?: AnalyticsSnapshotSumAggregateInputType
    _min?: AnalyticsSnapshotMinAggregateInputType
    _max?: AnalyticsSnapshotMaxAggregateInputType
  }

  export type AnalyticsSnapshotGroupByOutputType = {
    id: string
    snapshotDate: Date
    metricType: string
    metricValue: number
    dimension: string | null
    dimensionValue: string | null
    createdAt: Date
    _count: AnalyticsSnapshotCountAggregateOutputType | null
    _avg: AnalyticsSnapshotAvgAggregateOutputType | null
    _sum: AnalyticsSnapshotSumAggregateOutputType | null
    _min: AnalyticsSnapshotMinAggregateOutputType | null
    _max: AnalyticsSnapshotMaxAggregateOutputType | null
  }

  type GetAnalyticsSnapshotGroupByPayload<T extends AnalyticsSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnalyticsSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnalyticsSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnalyticsSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], AnalyticsSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type AnalyticsSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    snapshotDate?: boolean
    metricType?: boolean
    metricValue?: boolean
    dimension?: boolean
    dimensionValue?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["analyticsSnapshot"]>


  export type AnalyticsSnapshotSelectScalar = {
    id?: boolean
    snapshotDate?: boolean
    metricType?: boolean
    metricValue?: boolean
    dimension?: boolean
    dimensionValue?: boolean
    createdAt?: boolean
  }


  export type $AnalyticsSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AnalyticsSnapshot"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      snapshotDate: Date
      metricType: string
      metricValue: number
      dimension: string | null
      dimensionValue: string | null
      createdAt: Date
    }, ExtArgs["result"]["analyticsSnapshot"]>
    composites: {}
  }

  type AnalyticsSnapshotGetPayload<S extends boolean | null | undefined | AnalyticsSnapshotDefaultArgs> = $Result.GetResult<Prisma.$AnalyticsSnapshotPayload, S>

  type AnalyticsSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AnalyticsSnapshotFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AnalyticsSnapshotCountAggregateInputType | true
    }

  export interface AnalyticsSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AnalyticsSnapshot'], meta: { name: 'AnalyticsSnapshot' } }
    /**
     * Find zero or one AnalyticsSnapshot that matches the filter.
     * @param {AnalyticsSnapshotFindUniqueArgs} args - Arguments to find a AnalyticsSnapshot
     * @example
     * // Get one AnalyticsSnapshot
     * const analyticsSnapshot = await prisma.analyticsSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnalyticsSnapshotFindUniqueArgs>(args: SelectSubset<T, AnalyticsSnapshotFindUniqueArgs<ExtArgs>>): Prisma__AnalyticsSnapshotClient<$Result.GetResult<Prisma.$AnalyticsSnapshotPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AnalyticsSnapshot that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AnalyticsSnapshotFindUniqueOrThrowArgs} args - Arguments to find a AnalyticsSnapshot
     * @example
     * // Get one AnalyticsSnapshot
     * const analyticsSnapshot = await prisma.analyticsSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnalyticsSnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, AnalyticsSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnalyticsSnapshotClient<$Result.GetResult<Prisma.$AnalyticsSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AnalyticsSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsSnapshotFindFirstArgs} args - Arguments to find a AnalyticsSnapshot
     * @example
     * // Get one AnalyticsSnapshot
     * const analyticsSnapshot = await prisma.analyticsSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnalyticsSnapshotFindFirstArgs>(args?: SelectSubset<T, AnalyticsSnapshotFindFirstArgs<ExtArgs>>): Prisma__AnalyticsSnapshotClient<$Result.GetResult<Prisma.$AnalyticsSnapshotPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AnalyticsSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsSnapshotFindFirstOrThrowArgs} args - Arguments to find a AnalyticsSnapshot
     * @example
     * // Get one AnalyticsSnapshot
     * const analyticsSnapshot = await prisma.analyticsSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnalyticsSnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, AnalyticsSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnalyticsSnapshotClient<$Result.GetResult<Prisma.$AnalyticsSnapshotPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AnalyticsSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsSnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AnalyticsSnapshots
     * const analyticsSnapshots = await prisma.analyticsSnapshot.findMany()
     * 
     * // Get first 10 AnalyticsSnapshots
     * const analyticsSnapshots = await prisma.analyticsSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const analyticsSnapshotWithIdOnly = await prisma.analyticsSnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnalyticsSnapshotFindManyArgs>(args?: SelectSubset<T, AnalyticsSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsSnapshotPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AnalyticsSnapshot.
     * @param {AnalyticsSnapshotCreateArgs} args - Arguments to create a AnalyticsSnapshot.
     * @example
     * // Create one AnalyticsSnapshot
     * const AnalyticsSnapshot = await prisma.analyticsSnapshot.create({
     *   data: {
     *     // ... data to create a AnalyticsSnapshot
     *   }
     * })
     * 
     */
    create<T extends AnalyticsSnapshotCreateArgs>(args: SelectSubset<T, AnalyticsSnapshotCreateArgs<ExtArgs>>): Prisma__AnalyticsSnapshotClient<$Result.GetResult<Prisma.$AnalyticsSnapshotPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AnalyticsSnapshots.
     * @param {AnalyticsSnapshotCreateManyArgs} args - Arguments to create many AnalyticsSnapshots.
     * @example
     * // Create many AnalyticsSnapshots
     * const analyticsSnapshot = await prisma.analyticsSnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnalyticsSnapshotCreateManyArgs>(args?: SelectSubset<T, AnalyticsSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AnalyticsSnapshot.
     * @param {AnalyticsSnapshotDeleteArgs} args - Arguments to delete one AnalyticsSnapshot.
     * @example
     * // Delete one AnalyticsSnapshot
     * const AnalyticsSnapshot = await prisma.analyticsSnapshot.delete({
     *   where: {
     *     // ... filter to delete one AnalyticsSnapshot
     *   }
     * })
     * 
     */
    delete<T extends AnalyticsSnapshotDeleteArgs>(args: SelectSubset<T, AnalyticsSnapshotDeleteArgs<ExtArgs>>): Prisma__AnalyticsSnapshotClient<$Result.GetResult<Prisma.$AnalyticsSnapshotPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AnalyticsSnapshot.
     * @param {AnalyticsSnapshotUpdateArgs} args - Arguments to update one AnalyticsSnapshot.
     * @example
     * // Update one AnalyticsSnapshot
     * const analyticsSnapshot = await prisma.analyticsSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnalyticsSnapshotUpdateArgs>(args: SelectSubset<T, AnalyticsSnapshotUpdateArgs<ExtArgs>>): Prisma__AnalyticsSnapshotClient<$Result.GetResult<Prisma.$AnalyticsSnapshotPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AnalyticsSnapshots.
     * @param {AnalyticsSnapshotDeleteManyArgs} args - Arguments to filter AnalyticsSnapshots to delete.
     * @example
     * // Delete a few AnalyticsSnapshots
     * const { count } = await prisma.analyticsSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnalyticsSnapshotDeleteManyArgs>(args?: SelectSubset<T, AnalyticsSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnalyticsSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AnalyticsSnapshots
     * const analyticsSnapshot = await prisma.analyticsSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnalyticsSnapshotUpdateManyArgs>(args: SelectSubset<T, AnalyticsSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AnalyticsSnapshot.
     * @param {AnalyticsSnapshotUpsertArgs} args - Arguments to update or create a AnalyticsSnapshot.
     * @example
     * // Update or create a AnalyticsSnapshot
     * const analyticsSnapshot = await prisma.analyticsSnapshot.upsert({
     *   create: {
     *     // ... data to create a AnalyticsSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AnalyticsSnapshot we want to update
     *   }
     * })
     */
    upsert<T extends AnalyticsSnapshotUpsertArgs>(args: SelectSubset<T, AnalyticsSnapshotUpsertArgs<ExtArgs>>): Prisma__AnalyticsSnapshotClient<$Result.GetResult<Prisma.$AnalyticsSnapshotPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AnalyticsSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsSnapshotCountArgs} args - Arguments to filter AnalyticsSnapshots to count.
     * @example
     * // Count the number of AnalyticsSnapshots
     * const count = await prisma.analyticsSnapshot.count({
     *   where: {
     *     // ... the filter for the AnalyticsSnapshots we want to count
     *   }
     * })
    **/
    count<T extends AnalyticsSnapshotCountArgs>(
      args?: Subset<T, AnalyticsSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnalyticsSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AnalyticsSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AnalyticsSnapshotAggregateArgs>(args: Subset<T, AnalyticsSnapshotAggregateArgs>): Prisma.PrismaPromise<GetAnalyticsSnapshotAggregateType<T>>

    /**
     * Group by AnalyticsSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsSnapshotGroupByArgs} args - Group by arguments.
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
      T extends AnalyticsSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnalyticsSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: AnalyticsSnapshotGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AnalyticsSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnalyticsSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AnalyticsSnapshot model
   */
  readonly fields: AnalyticsSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AnalyticsSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnalyticsSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AnalyticsSnapshot model
   */ 
  interface AnalyticsSnapshotFieldRefs {
    readonly id: FieldRef<"AnalyticsSnapshot", 'String'>
    readonly snapshotDate: FieldRef<"AnalyticsSnapshot", 'DateTime'>
    readonly metricType: FieldRef<"AnalyticsSnapshot", 'String'>
    readonly metricValue: FieldRef<"AnalyticsSnapshot", 'Float'>
    readonly dimension: FieldRef<"AnalyticsSnapshot", 'String'>
    readonly dimensionValue: FieldRef<"AnalyticsSnapshot", 'String'>
    readonly createdAt: FieldRef<"AnalyticsSnapshot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AnalyticsSnapshot findUnique
   */
  export type AnalyticsSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsSnapshot
     */
    select?: AnalyticsSnapshotSelect<ExtArgs> | null
    /**
     * Filter, which AnalyticsSnapshot to fetch.
     */
    where: AnalyticsSnapshotWhereUniqueInput
  }

  /**
   * AnalyticsSnapshot findUniqueOrThrow
   */
  export type AnalyticsSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsSnapshot
     */
    select?: AnalyticsSnapshotSelect<ExtArgs> | null
    /**
     * Filter, which AnalyticsSnapshot to fetch.
     */
    where: AnalyticsSnapshotWhereUniqueInput
  }

  /**
   * AnalyticsSnapshot findFirst
   */
  export type AnalyticsSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsSnapshot
     */
    select?: AnalyticsSnapshotSelect<ExtArgs> | null
    /**
     * Filter, which AnalyticsSnapshot to fetch.
     */
    where?: AnalyticsSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsSnapshots to fetch.
     */
    orderBy?: AnalyticsSnapshotOrderByWithRelationInput | AnalyticsSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnalyticsSnapshots.
     */
    cursor?: AnalyticsSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnalyticsSnapshots.
     */
    distinct?: AnalyticsSnapshotScalarFieldEnum | AnalyticsSnapshotScalarFieldEnum[]
  }

  /**
   * AnalyticsSnapshot findFirstOrThrow
   */
  export type AnalyticsSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsSnapshot
     */
    select?: AnalyticsSnapshotSelect<ExtArgs> | null
    /**
     * Filter, which AnalyticsSnapshot to fetch.
     */
    where?: AnalyticsSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsSnapshots to fetch.
     */
    orderBy?: AnalyticsSnapshotOrderByWithRelationInput | AnalyticsSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnalyticsSnapshots.
     */
    cursor?: AnalyticsSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnalyticsSnapshots.
     */
    distinct?: AnalyticsSnapshotScalarFieldEnum | AnalyticsSnapshotScalarFieldEnum[]
  }

  /**
   * AnalyticsSnapshot findMany
   */
  export type AnalyticsSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsSnapshot
     */
    select?: AnalyticsSnapshotSelect<ExtArgs> | null
    /**
     * Filter, which AnalyticsSnapshots to fetch.
     */
    where?: AnalyticsSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsSnapshots to fetch.
     */
    orderBy?: AnalyticsSnapshotOrderByWithRelationInput | AnalyticsSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AnalyticsSnapshots.
     */
    cursor?: AnalyticsSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsSnapshots.
     */
    skip?: number
    distinct?: AnalyticsSnapshotScalarFieldEnum | AnalyticsSnapshotScalarFieldEnum[]
  }

  /**
   * AnalyticsSnapshot create
   */
  export type AnalyticsSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsSnapshot
     */
    select?: AnalyticsSnapshotSelect<ExtArgs> | null
    /**
     * The data needed to create a AnalyticsSnapshot.
     */
    data: XOR<AnalyticsSnapshotCreateInput, AnalyticsSnapshotUncheckedCreateInput>
  }

  /**
   * AnalyticsSnapshot createMany
   */
  export type AnalyticsSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AnalyticsSnapshots.
     */
    data: AnalyticsSnapshotCreateManyInput | AnalyticsSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AnalyticsSnapshot update
   */
  export type AnalyticsSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsSnapshot
     */
    select?: AnalyticsSnapshotSelect<ExtArgs> | null
    /**
     * The data needed to update a AnalyticsSnapshot.
     */
    data: XOR<AnalyticsSnapshotUpdateInput, AnalyticsSnapshotUncheckedUpdateInput>
    /**
     * Choose, which AnalyticsSnapshot to update.
     */
    where: AnalyticsSnapshotWhereUniqueInput
  }

  /**
   * AnalyticsSnapshot updateMany
   */
  export type AnalyticsSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AnalyticsSnapshots.
     */
    data: XOR<AnalyticsSnapshotUpdateManyMutationInput, AnalyticsSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which AnalyticsSnapshots to update
     */
    where?: AnalyticsSnapshotWhereInput
  }

  /**
   * AnalyticsSnapshot upsert
   */
  export type AnalyticsSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsSnapshot
     */
    select?: AnalyticsSnapshotSelect<ExtArgs> | null
    /**
     * The filter to search for the AnalyticsSnapshot to update in case it exists.
     */
    where: AnalyticsSnapshotWhereUniqueInput
    /**
     * In case the AnalyticsSnapshot found by the `where` argument doesn't exist, create a new AnalyticsSnapshot with this data.
     */
    create: XOR<AnalyticsSnapshotCreateInput, AnalyticsSnapshotUncheckedCreateInput>
    /**
     * In case the AnalyticsSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnalyticsSnapshotUpdateInput, AnalyticsSnapshotUncheckedUpdateInput>
  }

  /**
   * AnalyticsSnapshot delete
   */
  export type AnalyticsSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsSnapshot
     */
    select?: AnalyticsSnapshotSelect<ExtArgs> | null
    /**
     * Filter which AnalyticsSnapshot to delete.
     */
    where: AnalyticsSnapshotWhereUniqueInput
  }

  /**
   * AnalyticsSnapshot deleteMany
   */
  export type AnalyticsSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnalyticsSnapshots to delete
     */
    where?: AnalyticsSnapshotWhereInput
  }

  /**
   * AnalyticsSnapshot without action
   */
  export type AnalyticsSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsSnapshot
     */
    select?: AnalyticsSnapshotSelect<ExtArgs> | null
  }


  /**
   * Model AggregationLog
   */

  export type AggregateAggregationLog = {
    _count: AggregationLogCountAggregateOutputType | null
    _avg: AggregationLogAvgAggregateOutputType | null
    _sum: AggregationLogSumAggregateOutputType | null
    _min: AggregationLogMinAggregateOutputType | null
    _max: AggregationLogMaxAggregateOutputType | null
  }

  export type AggregationLogAvgAggregateOutputType = {
    recordsProcessed: number | null
  }

  export type AggregationLogSumAggregateOutputType = {
    recordsProcessed: number | null
  }

  export type AggregationLogMinAggregateOutputType = {
    id: string | null
    jobType: string | null
    startedAt: Date | null
    completedAt: Date | null
    recordsProcessed: number | null
    status: string | null
  }

  export type AggregationLogMaxAggregateOutputType = {
    id: string | null
    jobType: string | null
    startedAt: Date | null
    completedAt: Date | null
    recordsProcessed: number | null
    status: string | null
  }

  export type AggregationLogCountAggregateOutputType = {
    id: number
    jobType: number
    startedAt: number
    completedAt: number
    recordsProcessed: number
    status: number
    _all: number
  }


  export type AggregationLogAvgAggregateInputType = {
    recordsProcessed?: true
  }

  export type AggregationLogSumAggregateInputType = {
    recordsProcessed?: true
  }

  export type AggregationLogMinAggregateInputType = {
    id?: true
    jobType?: true
    startedAt?: true
    completedAt?: true
    recordsProcessed?: true
    status?: true
  }

  export type AggregationLogMaxAggregateInputType = {
    id?: true
    jobType?: true
    startedAt?: true
    completedAt?: true
    recordsProcessed?: true
    status?: true
  }

  export type AggregationLogCountAggregateInputType = {
    id?: true
    jobType?: true
    startedAt?: true
    completedAt?: true
    recordsProcessed?: true
    status?: true
    _all?: true
  }

  export type AggregationLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AggregationLog to aggregate.
     */
    where?: AggregationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AggregationLogs to fetch.
     */
    orderBy?: AggregationLogOrderByWithRelationInput | AggregationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AggregationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AggregationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AggregationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AggregationLogs
    **/
    _count?: true | AggregationLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AggregationLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AggregationLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AggregationLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AggregationLogMaxAggregateInputType
  }

  export type GetAggregationLogAggregateType<T extends AggregationLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAggregationLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAggregationLog[P]>
      : GetScalarType<T[P], AggregateAggregationLog[P]>
  }




  export type AggregationLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AggregationLogWhereInput
    orderBy?: AggregationLogOrderByWithAggregationInput | AggregationLogOrderByWithAggregationInput[]
    by: AggregationLogScalarFieldEnum[] | AggregationLogScalarFieldEnum
    having?: AggregationLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AggregationLogCountAggregateInputType | true
    _avg?: AggregationLogAvgAggregateInputType
    _sum?: AggregationLogSumAggregateInputType
    _min?: AggregationLogMinAggregateInputType
    _max?: AggregationLogMaxAggregateInputType
  }

  export type AggregationLogGroupByOutputType = {
    id: string
    jobType: string
    startedAt: Date
    completedAt: Date | null
    recordsProcessed: number
    status: string
    _count: AggregationLogCountAggregateOutputType | null
    _avg: AggregationLogAvgAggregateOutputType | null
    _sum: AggregationLogSumAggregateOutputType | null
    _min: AggregationLogMinAggregateOutputType | null
    _max: AggregationLogMaxAggregateOutputType | null
  }

  type GetAggregationLogGroupByPayload<T extends AggregationLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AggregationLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AggregationLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AggregationLogGroupByOutputType[P]>
            : GetScalarType<T[P], AggregationLogGroupByOutputType[P]>
        }
      >
    >


  export type AggregationLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobType?: boolean
    startedAt?: boolean
    completedAt?: boolean
    recordsProcessed?: boolean
    status?: boolean
  }, ExtArgs["result"]["aggregationLog"]>


  export type AggregationLogSelectScalar = {
    id?: boolean
    jobType?: boolean
    startedAt?: boolean
    completedAt?: boolean
    recordsProcessed?: boolean
    status?: boolean
  }


  export type $AggregationLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AggregationLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      jobType: string
      startedAt: Date
      completedAt: Date | null
      recordsProcessed: number
      status: string
    }, ExtArgs["result"]["aggregationLog"]>
    composites: {}
  }

  type AggregationLogGetPayload<S extends boolean | null | undefined | AggregationLogDefaultArgs> = $Result.GetResult<Prisma.$AggregationLogPayload, S>

  type AggregationLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AggregationLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AggregationLogCountAggregateInputType | true
    }

  export interface AggregationLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AggregationLog'], meta: { name: 'AggregationLog' } }
    /**
     * Find zero or one AggregationLog that matches the filter.
     * @param {AggregationLogFindUniqueArgs} args - Arguments to find a AggregationLog
     * @example
     * // Get one AggregationLog
     * const aggregationLog = await prisma.aggregationLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AggregationLogFindUniqueArgs>(args: SelectSubset<T, AggregationLogFindUniqueArgs<ExtArgs>>): Prisma__AggregationLogClient<$Result.GetResult<Prisma.$AggregationLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AggregationLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AggregationLogFindUniqueOrThrowArgs} args - Arguments to find a AggregationLog
     * @example
     * // Get one AggregationLog
     * const aggregationLog = await prisma.aggregationLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AggregationLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AggregationLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AggregationLogClient<$Result.GetResult<Prisma.$AggregationLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AggregationLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AggregationLogFindFirstArgs} args - Arguments to find a AggregationLog
     * @example
     * // Get one AggregationLog
     * const aggregationLog = await prisma.aggregationLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AggregationLogFindFirstArgs>(args?: SelectSubset<T, AggregationLogFindFirstArgs<ExtArgs>>): Prisma__AggregationLogClient<$Result.GetResult<Prisma.$AggregationLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AggregationLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AggregationLogFindFirstOrThrowArgs} args - Arguments to find a AggregationLog
     * @example
     * // Get one AggregationLog
     * const aggregationLog = await prisma.aggregationLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AggregationLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AggregationLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AggregationLogClient<$Result.GetResult<Prisma.$AggregationLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AggregationLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AggregationLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AggregationLogs
     * const aggregationLogs = await prisma.aggregationLog.findMany()
     * 
     * // Get first 10 AggregationLogs
     * const aggregationLogs = await prisma.aggregationLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aggregationLogWithIdOnly = await prisma.aggregationLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AggregationLogFindManyArgs>(args?: SelectSubset<T, AggregationLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AggregationLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AggregationLog.
     * @param {AggregationLogCreateArgs} args - Arguments to create a AggregationLog.
     * @example
     * // Create one AggregationLog
     * const AggregationLog = await prisma.aggregationLog.create({
     *   data: {
     *     // ... data to create a AggregationLog
     *   }
     * })
     * 
     */
    create<T extends AggregationLogCreateArgs>(args: SelectSubset<T, AggregationLogCreateArgs<ExtArgs>>): Prisma__AggregationLogClient<$Result.GetResult<Prisma.$AggregationLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AggregationLogs.
     * @param {AggregationLogCreateManyArgs} args - Arguments to create many AggregationLogs.
     * @example
     * // Create many AggregationLogs
     * const aggregationLog = await prisma.aggregationLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AggregationLogCreateManyArgs>(args?: SelectSubset<T, AggregationLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AggregationLog.
     * @param {AggregationLogDeleteArgs} args - Arguments to delete one AggregationLog.
     * @example
     * // Delete one AggregationLog
     * const AggregationLog = await prisma.aggregationLog.delete({
     *   where: {
     *     // ... filter to delete one AggregationLog
     *   }
     * })
     * 
     */
    delete<T extends AggregationLogDeleteArgs>(args: SelectSubset<T, AggregationLogDeleteArgs<ExtArgs>>): Prisma__AggregationLogClient<$Result.GetResult<Prisma.$AggregationLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AggregationLog.
     * @param {AggregationLogUpdateArgs} args - Arguments to update one AggregationLog.
     * @example
     * // Update one AggregationLog
     * const aggregationLog = await prisma.aggregationLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AggregationLogUpdateArgs>(args: SelectSubset<T, AggregationLogUpdateArgs<ExtArgs>>): Prisma__AggregationLogClient<$Result.GetResult<Prisma.$AggregationLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AggregationLogs.
     * @param {AggregationLogDeleteManyArgs} args - Arguments to filter AggregationLogs to delete.
     * @example
     * // Delete a few AggregationLogs
     * const { count } = await prisma.aggregationLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AggregationLogDeleteManyArgs>(args?: SelectSubset<T, AggregationLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AggregationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AggregationLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AggregationLogs
     * const aggregationLog = await prisma.aggregationLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AggregationLogUpdateManyArgs>(args: SelectSubset<T, AggregationLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AggregationLog.
     * @param {AggregationLogUpsertArgs} args - Arguments to update or create a AggregationLog.
     * @example
     * // Update or create a AggregationLog
     * const aggregationLog = await prisma.aggregationLog.upsert({
     *   create: {
     *     // ... data to create a AggregationLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AggregationLog we want to update
     *   }
     * })
     */
    upsert<T extends AggregationLogUpsertArgs>(args: SelectSubset<T, AggregationLogUpsertArgs<ExtArgs>>): Prisma__AggregationLogClient<$Result.GetResult<Prisma.$AggregationLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AggregationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AggregationLogCountArgs} args - Arguments to filter AggregationLogs to count.
     * @example
     * // Count the number of AggregationLogs
     * const count = await prisma.aggregationLog.count({
     *   where: {
     *     // ... the filter for the AggregationLogs we want to count
     *   }
     * })
    **/
    count<T extends AggregationLogCountArgs>(
      args?: Subset<T, AggregationLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AggregationLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AggregationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AggregationLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AggregationLogAggregateArgs>(args: Subset<T, AggregationLogAggregateArgs>): Prisma.PrismaPromise<GetAggregationLogAggregateType<T>>

    /**
     * Group by AggregationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AggregationLogGroupByArgs} args - Group by arguments.
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
      T extends AggregationLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AggregationLogGroupByArgs['orderBy'] }
        : { orderBy?: AggregationLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AggregationLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAggregationLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AggregationLog model
   */
  readonly fields: AggregationLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AggregationLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AggregationLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AggregationLog model
   */ 
  interface AggregationLogFieldRefs {
    readonly id: FieldRef<"AggregationLog", 'String'>
    readonly jobType: FieldRef<"AggregationLog", 'String'>
    readonly startedAt: FieldRef<"AggregationLog", 'DateTime'>
    readonly completedAt: FieldRef<"AggregationLog", 'DateTime'>
    readonly recordsProcessed: FieldRef<"AggregationLog", 'Int'>
    readonly status: FieldRef<"AggregationLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AggregationLog findUnique
   */
  export type AggregationLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AggregationLog
     */
    select?: AggregationLogSelect<ExtArgs> | null
    /**
     * Filter, which AggregationLog to fetch.
     */
    where: AggregationLogWhereUniqueInput
  }

  /**
   * AggregationLog findUniqueOrThrow
   */
  export type AggregationLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AggregationLog
     */
    select?: AggregationLogSelect<ExtArgs> | null
    /**
     * Filter, which AggregationLog to fetch.
     */
    where: AggregationLogWhereUniqueInput
  }

  /**
   * AggregationLog findFirst
   */
  export type AggregationLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AggregationLog
     */
    select?: AggregationLogSelect<ExtArgs> | null
    /**
     * Filter, which AggregationLog to fetch.
     */
    where?: AggregationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AggregationLogs to fetch.
     */
    orderBy?: AggregationLogOrderByWithRelationInput | AggregationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AggregationLogs.
     */
    cursor?: AggregationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AggregationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AggregationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AggregationLogs.
     */
    distinct?: AggregationLogScalarFieldEnum | AggregationLogScalarFieldEnum[]
  }

  /**
   * AggregationLog findFirstOrThrow
   */
  export type AggregationLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AggregationLog
     */
    select?: AggregationLogSelect<ExtArgs> | null
    /**
     * Filter, which AggregationLog to fetch.
     */
    where?: AggregationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AggregationLogs to fetch.
     */
    orderBy?: AggregationLogOrderByWithRelationInput | AggregationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AggregationLogs.
     */
    cursor?: AggregationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AggregationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AggregationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AggregationLogs.
     */
    distinct?: AggregationLogScalarFieldEnum | AggregationLogScalarFieldEnum[]
  }

  /**
   * AggregationLog findMany
   */
  export type AggregationLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AggregationLog
     */
    select?: AggregationLogSelect<ExtArgs> | null
    /**
     * Filter, which AggregationLogs to fetch.
     */
    where?: AggregationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AggregationLogs to fetch.
     */
    orderBy?: AggregationLogOrderByWithRelationInput | AggregationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AggregationLogs.
     */
    cursor?: AggregationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AggregationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AggregationLogs.
     */
    skip?: number
    distinct?: AggregationLogScalarFieldEnum | AggregationLogScalarFieldEnum[]
  }

  /**
   * AggregationLog create
   */
  export type AggregationLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AggregationLog
     */
    select?: AggregationLogSelect<ExtArgs> | null
    /**
     * The data needed to create a AggregationLog.
     */
    data: XOR<AggregationLogCreateInput, AggregationLogUncheckedCreateInput>
  }

  /**
   * AggregationLog createMany
   */
  export type AggregationLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AggregationLogs.
     */
    data: AggregationLogCreateManyInput | AggregationLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AggregationLog update
   */
  export type AggregationLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AggregationLog
     */
    select?: AggregationLogSelect<ExtArgs> | null
    /**
     * The data needed to update a AggregationLog.
     */
    data: XOR<AggregationLogUpdateInput, AggregationLogUncheckedUpdateInput>
    /**
     * Choose, which AggregationLog to update.
     */
    where: AggregationLogWhereUniqueInput
  }

  /**
   * AggregationLog updateMany
   */
  export type AggregationLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AggregationLogs.
     */
    data: XOR<AggregationLogUpdateManyMutationInput, AggregationLogUncheckedUpdateManyInput>
    /**
     * Filter which AggregationLogs to update
     */
    where?: AggregationLogWhereInput
  }

  /**
   * AggregationLog upsert
   */
  export type AggregationLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AggregationLog
     */
    select?: AggregationLogSelect<ExtArgs> | null
    /**
     * The filter to search for the AggregationLog to update in case it exists.
     */
    where: AggregationLogWhereUniqueInput
    /**
     * In case the AggregationLog found by the `where` argument doesn't exist, create a new AggregationLog with this data.
     */
    create: XOR<AggregationLogCreateInput, AggregationLogUncheckedCreateInput>
    /**
     * In case the AggregationLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AggregationLogUpdateInput, AggregationLogUncheckedUpdateInput>
  }

  /**
   * AggregationLog delete
   */
  export type AggregationLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AggregationLog
     */
    select?: AggregationLogSelect<ExtArgs> | null
    /**
     * Filter which AggregationLog to delete.
     */
    where: AggregationLogWhereUniqueInput
  }

  /**
   * AggregationLog deleteMany
   */
  export type AggregationLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AggregationLogs to delete
     */
    where?: AggregationLogWhereInput
  }

  /**
   * AggregationLog without action
   */
  export type AggregationLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AggregationLog
     */
    select?: AggregationLogSelect<ExtArgs> | null
  }


  /**
   * Model ReportJob
   */

  export type AggregateReportJob = {
    _count: ReportJobCountAggregateOutputType | null
    _min: ReportJobMinAggregateOutputType | null
    _max: ReportJobMaxAggregateOutputType | null
  }

  export type ReportJobMinAggregateOutputType = {
    id: string | null
    reportType: string | null
    status: string | null
    requestedBy: string | null
    filePath: string | null
    requestedAt: Date | null
    completedAt: Date | null
  }

  export type ReportJobMaxAggregateOutputType = {
    id: string | null
    reportType: string | null
    status: string | null
    requestedBy: string | null
    filePath: string | null
    requestedAt: Date | null
    completedAt: Date | null
  }

  export type ReportJobCountAggregateOutputType = {
    id: number
    reportType: number
    status: number
    requestedBy: number
    filePath: number
    requestedAt: number
    completedAt: number
    _all: number
  }


  export type ReportJobMinAggregateInputType = {
    id?: true
    reportType?: true
    status?: true
    requestedBy?: true
    filePath?: true
    requestedAt?: true
    completedAt?: true
  }

  export type ReportJobMaxAggregateInputType = {
    id?: true
    reportType?: true
    status?: true
    requestedBy?: true
    filePath?: true
    requestedAt?: true
    completedAt?: true
  }

  export type ReportJobCountAggregateInputType = {
    id?: true
    reportType?: true
    status?: true
    requestedBy?: true
    filePath?: true
    requestedAt?: true
    completedAt?: true
    _all?: true
  }

  export type ReportJobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReportJob to aggregate.
     */
    where?: ReportJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportJobs to fetch.
     */
    orderBy?: ReportJobOrderByWithRelationInput | ReportJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReportJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReportJobs
    **/
    _count?: true | ReportJobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportJobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportJobMaxAggregateInputType
  }

  export type GetReportJobAggregateType<T extends ReportJobAggregateArgs> = {
        [P in keyof T & keyof AggregateReportJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReportJob[P]>
      : GetScalarType<T[P], AggregateReportJob[P]>
  }




  export type ReportJobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportJobWhereInput
    orderBy?: ReportJobOrderByWithAggregationInput | ReportJobOrderByWithAggregationInput[]
    by: ReportJobScalarFieldEnum[] | ReportJobScalarFieldEnum
    having?: ReportJobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportJobCountAggregateInputType | true
    _min?: ReportJobMinAggregateInputType
    _max?: ReportJobMaxAggregateInputType
  }

  export type ReportJobGroupByOutputType = {
    id: string
    reportType: string
    status: string
    requestedBy: string | null
    filePath: string | null
    requestedAt: Date
    completedAt: Date | null
    _count: ReportJobCountAggregateOutputType | null
    _min: ReportJobMinAggregateOutputType | null
    _max: ReportJobMaxAggregateOutputType | null
  }

  type GetReportJobGroupByPayload<T extends ReportJobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReportJobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportJobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportJobGroupByOutputType[P]>
            : GetScalarType<T[P], ReportJobGroupByOutputType[P]>
        }
      >
    >


  export type ReportJobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportType?: boolean
    status?: boolean
    requestedBy?: boolean
    filePath?: boolean
    requestedAt?: boolean
    completedAt?: boolean
  }, ExtArgs["result"]["reportJob"]>


  export type ReportJobSelectScalar = {
    id?: boolean
    reportType?: boolean
    status?: boolean
    requestedBy?: boolean
    filePath?: boolean
    requestedAt?: boolean
    completedAt?: boolean
  }


  export type $ReportJobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReportJob"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      reportType: string
      status: string
      requestedBy: string | null
      filePath: string | null
      requestedAt: Date
      completedAt: Date | null
    }, ExtArgs["result"]["reportJob"]>
    composites: {}
  }

  type ReportJobGetPayload<S extends boolean | null | undefined | ReportJobDefaultArgs> = $Result.GetResult<Prisma.$ReportJobPayload, S>

  type ReportJobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReportJobFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReportJobCountAggregateInputType | true
    }

  export interface ReportJobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReportJob'], meta: { name: 'ReportJob' } }
    /**
     * Find zero or one ReportJob that matches the filter.
     * @param {ReportJobFindUniqueArgs} args - Arguments to find a ReportJob
     * @example
     * // Get one ReportJob
     * const reportJob = await prisma.reportJob.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReportJobFindUniqueArgs>(args: SelectSubset<T, ReportJobFindUniqueArgs<ExtArgs>>): Prisma__ReportJobClient<$Result.GetResult<Prisma.$ReportJobPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ReportJob that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReportJobFindUniqueOrThrowArgs} args - Arguments to find a ReportJob
     * @example
     * // Get one ReportJob
     * const reportJob = await prisma.reportJob.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReportJobFindUniqueOrThrowArgs>(args: SelectSubset<T, ReportJobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReportJobClient<$Result.GetResult<Prisma.$ReportJobPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ReportJob that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportJobFindFirstArgs} args - Arguments to find a ReportJob
     * @example
     * // Get one ReportJob
     * const reportJob = await prisma.reportJob.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReportJobFindFirstArgs>(args?: SelectSubset<T, ReportJobFindFirstArgs<ExtArgs>>): Prisma__ReportJobClient<$Result.GetResult<Prisma.$ReportJobPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ReportJob that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportJobFindFirstOrThrowArgs} args - Arguments to find a ReportJob
     * @example
     * // Get one ReportJob
     * const reportJob = await prisma.reportJob.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReportJobFindFirstOrThrowArgs>(args?: SelectSubset<T, ReportJobFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReportJobClient<$Result.GetResult<Prisma.$ReportJobPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ReportJobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportJobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReportJobs
     * const reportJobs = await prisma.reportJob.findMany()
     * 
     * // Get first 10 ReportJobs
     * const reportJobs = await prisma.reportJob.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reportJobWithIdOnly = await prisma.reportJob.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReportJobFindManyArgs>(args?: SelectSubset<T, ReportJobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportJobPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ReportJob.
     * @param {ReportJobCreateArgs} args - Arguments to create a ReportJob.
     * @example
     * // Create one ReportJob
     * const ReportJob = await prisma.reportJob.create({
     *   data: {
     *     // ... data to create a ReportJob
     *   }
     * })
     * 
     */
    create<T extends ReportJobCreateArgs>(args: SelectSubset<T, ReportJobCreateArgs<ExtArgs>>): Prisma__ReportJobClient<$Result.GetResult<Prisma.$ReportJobPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ReportJobs.
     * @param {ReportJobCreateManyArgs} args - Arguments to create many ReportJobs.
     * @example
     * // Create many ReportJobs
     * const reportJob = await prisma.reportJob.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReportJobCreateManyArgs>(args?: SelectSubset<T, ReportJobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ReportJob.
     * @param {ReportJobDeleteArgs} args - Arguments to delete one ReportJob.
     * @example
     * // Delete one ReportJob
     * const ReportJob = await prisma.reportJob.delete({
     *   where: {
     *     // ... filter to delete one ReportJob
     *   }
     * })
     * 
     */
    delete<T extends ReportJobDeleteArgs>(args: SelectSubset<T, ReportJobDeleteArgs<ExtArgs>>): Prisma__ReportJobClient<$Result.GetResult<Prisma.$ReportJobPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ReportJob.
     * @param {ReportJobUpdateArgs} args - Arguments to update one ReportJob.
     * @example
     * // Update one ReportJob
     * const reportJob = await prisma.reportJob.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReportJobUpdateArgs>(args: SelectSubset<T, ReportJobUpdateArgs<ExtArgs>>): Prisma__ReportJobClient<$Result.GetResult<Prisma.$ReportJobPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ReportJobs.
     * @param {ReportJobDeleteManyArgs} args - Arguments to filter ReportJobs to delete.
     * @example
     * // Delete a few ReportJobs
     * const { count } = await prisma.reportJob.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReportJobDeleteManyArgs>(args?: SelectSubset<T, ReportJobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReportJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportJobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReportJobs
     * const reportJob = await prisma.reportJob.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReportJobUpdateManyArgs>(args: SelectSubset<T, ReportJobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ReportJob.
     * @param {ReportJobUpsertArgs} args - Arguments to update or create a ReportJob.
     * @example
     * // Update or create a ReportJob
     * const reportJob = await prisma.reportJob.upsert({
     *   create: {
     *     // ... data to create a ReportJob
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReportJob we want to update
     *   }
     * })
     */
    upsert<T extends ReportJobUpsertArgs>(args: SelectSubset<T, ReportJobUpsertArgs<ExtArgs>>): Prisma__ReportJobClient<$Result.GetResult<Prisma.$ReportJobPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ReportJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportJobCountArgs} args - Arguments to filter ReportJobs to count.
     * @example
     * // Count the number of ReportJobs
     * const count = await prisma.reportJob.count({
     *   where: {
     *     // ... the filter for the ReportJobs we want to count
     *   }
     * })
    **/
    count<T extends ReportJobCountArgs>(
      args?: Subset<T, ReportJobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportJobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReportJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportJobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReportJobAggregateArgs>(args: Subset<T, ReportJobAggregateArgs>): Prisma.PrismaPromise<GetReportJobAggregateType<T>>

    /**
     * Group by ReportJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportJobGroupByArgs} args - Group by arguments.
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
      T extends ReportJobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportJobGroupByArgs['orderBy'] }
        : { orderBy?: ReportJobGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ReportJobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReportJob model
   */
  readonly fields: ReportJobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReportJob.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReportJobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ReportJob model
   */ 
  interface ReportJobFieldRefs {
    readonly id: FieldRef<"ReportJob", 'String'>
    readonly reportType: FieldRef<"ReportJob", 'String'>
    readonly status: FieldRef<"ReportJob", 'String'>
    readonly requestedBy: FieldRef<"ReportJob", 'String'>
    readonly filePath: FieldRef<"ReportJob", 'String'>
    readonly requestedAt: FieldRef<"ReportJob", 'DateTime'>
    readonly completedAt: FieldRef<"ReportJob", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReportJob findUnique
   */
  export type ReportJobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportJob
     */
    select?: ReportJobSelect<ExtArgs> | null
    /**
     * Filter, which ReportJob to fetch.
     */
    where: ReportJobWhereUniqueInput
  }

  /**
   * ReportJob findUniqueOrThrow
   */
  export type ReportJobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportJob
     */
    select?: ReportJobSelect<ExtArgs> | null
    /**
     * Filter, which ReportJob to fetch.
     */
    where: ReportJobWhereUniqueInput
  }

  /**
   * ReportJob findFirst
   */
  export type ReportJobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportJob
     */
    select?: ReportJobSelect<ExtArgs> | null
    /**
     * Filter, which ReportJob to fetch.
     */
    where?: ReportJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportJobs to fetch.
     */
    orderBy?: ReportJobOrderByWithRelationInput | ReportJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReportJobs.
     */
    cursor?: ReportJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReportJobs.
     */
    distinct?: ReportJobScalarFieldEnum | ReportJobScalarFieldEnum[]
  }

  /**
   * ReportJob findFirstOrThrow
   */
  export type ReportJobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportJob
     */
    select?: ReportJobSelect<ExtArgs> | null
    /**
     * Filter, which ReportJob to fetch.
     */
    where?: ReportJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportJobs to fetch.
     */
    orderBy?: ReportJobOrderByWithRelationInput | ReportJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReportJobs.
     */
    cursor?: ReportJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReportJobs.
     */
    distinct?: ReportJobScalarFieldEnum | ReportJobScalarFieldEnum[]
  }

  /**
   * ReportJob findMany
   */
  export type ReportJobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportJob
     */
    select?: ReportJobSelect<ExtArgs> | null
    /**
     * Filter, which ReportJobs to fetch.
     */
    where?: ReportJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportJobs to fetch.
     */
    orderBy?: ReportJobOrderByWithRelationInput | ReportJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReportJobs.
     */
    cursor?: ReportJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportJobs.
     */
    skip?: number
    distinct?: ReportJobScalarFieldEnum | ReportJobScalarFieldEnum[]
  }

  /**
   * ReportJob create
   */
  export type ReportJobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportJob
     */
    select?: ReportJobSelect<ExtArgs> | null
    /**
     * The data needed to create a ReportJob.
     */
    data: XOR<ReportJobCreateInput, ReportJobUncheckedCreateInput>
  }

  /**
   * ReportJob createMany
   */
  export type ReportJobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReportJobs.
     */
    data: ReportJobCreateManyInput | ReportJobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReportJob update
   */
  export type ReportJobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportJob
     */
    select?: ReportJobSelect<ExtArgs> | null
    /**
     * The data needed to update a ReportJob.
     */
    data: XOR<ReportJobUpdateInput, ReportJobUncheckedUpdateInput>
    /**
     * Choose, which ReportJob to update.
     */
    where: ReportJobWhereUniqueInput
  }

  /**
   * ReportJob updateMany
   */
  export type ReportJobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReportJobs.
     */
    data: XOR<ReportJobUpdateManyMutationInput, ReportJobUncheckedUpdateManyInput>
    /**
     * Filter which ReportJobs to update
     */
    where?: ReportJobWhereInput
  }

  /**
   * ReportJob upsert
   */
  export type ReportJobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportJob
     */
    select?: ReportJobSelect<ExtArgs> | null
    /**
     * The filter to search for the ReportJob to update in case it exists.
     */
    where: ReportJobWhereUniqueInput
    /**
     * In case the ReportJob found by the `where` argument doesn't exist, create a new ReportJob with this data.
     */
    create: XOR<ReportJobCreateInput, ReportJobUncheckedCreateInput>
    /**
     * In case the ReportJob was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReportJobUpdateInput, ReportJobUncheckedUpdateInput>
  }

  /**
   * ReportJob delete
   */
  export type ReportJobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportJob
     */
    select?: ReportJobSelect<ExtArgs> | null
    /**
     * Filter which ReportJob to delete.
     */
    where: ReportJobWhereUniqueInput
  }

  /**
   * ReportJob deleteMany
   */
  export type ReportJobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReportJobs to delete
     */
    where?: ReportJobWhereInput
  }

  /**
   * ReportJob without action
   */
  export type ReportJobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportJob
     */
    select?: ReportJobSelect<ExtArgs> | null
  }


  /**
   * Model MisReport
   */

  export type AggregateMisReport = {
    _count: MisReportCountAggregateOutputType | null
    _avg: MisReportAvgAggregateOutputType | null
    _sum: MisReportSumAggregateOutputType | null
    _min: MisReportMinAggregateOutputType | null
    _max: MisReportMaxAggregateOutputType | null
  }

  export type MisReportAvgAggregateOutputType = {
    volume: Decimal | null
  }

  export type MisReportSumAggregateOutputType = {
    volume: Decimal | null
  }

  export type MisReportMinAggregateOutputType = {
    id: string | null
    rmName: string | null
    fileName: string | null
    volume: Decimal | null
    status: string | null
    uploadedAt: Date | null
  }

  export type MisReportMaxAggregateOutputType = {
    id: string | null
    rmName: string | null
    fileName: string | null
    volume: Decimal | null
    status: string | null
    uploadedAt: Date | null
  }

  export type MisReportCountAggregateOutputType = {
    id: number
    rmName: number
    fileName: number
    volume: number
    status: number
    uploadedAt: number
    _all: number
  }


  export type MisReportAvgAggregateInputType = {
    volume?: true
  }

  export type MisReportSumAggregateInputType = {
    volume?: true
  }

  export type MisReportMinAggregateInputType = {
    id?: true
    rmName?: true
    fileName?: true
    volume?: true
    status?: true
    uploadedAt?: true
  }

  export type MisReportMaxAggregateInputType = {
    id?: true
    rmName?: true
    fileName?: true
    volume?: true
    status?: true
    uploadedAt?: true
  }

  export type MisReportCountAggregateInputType = {
    id?: true
    rmName?: true
    fileName?: true
    volume?: true
    status?: true
    uploadedAt?: true
    _all?: true
  }

  export type MisReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MisReport to aggregate.
     */
    where?: MisReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MisReports to fetch.
     */
    orderBy?: MisReportOrderByWithRelationInput | MisReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MisReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MisReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MisReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MisReports
    **/
    _count?: true | MisReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MisReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MisReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MisReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MisReportMaxAggregateInputType
  }

  export type GetMisReportAggregateType<T extends MisReportAggregateArgs> = {
        [P in keyof T & keyof AggregateMisReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMisReport[P]>
      : GetScalarType<T[P], AggregateMisReport[P]>
  }




  export type MisReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MisReportWhereInput
    orderBy?: MisReportOrderByWithAggregationInput | MisReportOrderByWithAggregationInput[]
    by: MisReportScalarFieldEnum[] | MisReportScalarFieldEnum
    having?: MisReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MisReportCountAggregateInputType | true
    _avg?: MisReportAvgAggregateInputType
    _sum?: MisReportSumAggregateInputType
    _min?: MisReportMinAggregateInputType
    _max?: MisReportMaxAggregateInputType
  }

  export type MisReportGroupByOutputType = {
    id: string
    rmName: string
    fileName: string | null
    volume: Decimal
    status: string
    uploadedAt: Date
    _count: MisReportCountAggregateOutputType | null
    _avg: MisReportAvgAggregateOutputType | null
    _sum: MisReportSumAggregateOutputType | null
    _min: MisReportMinAggregateOutputType | null
    _max: MisReportMaxAggregateOutputType | null
  }

  type GetMisReportGroupByPayload<T extends MisReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MisReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MisReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MisReportGroupByOutputType[P]>
            : GetScalarType<T[P], MisReportGroupByOutputType[P]>
        }
      >
    >


  export type MisReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rmName?: boolean
    fileName?: boolean
    volume?: boolean
    status?: boolean
    uploadedAt?: boolean
  }, ExtArgs["result"]["misReport"]>


  export type MisReportSelectScalar = {
    id?: boolean
    rmName?: boolean
    fileName?: boolean
    volume?: boolean
    status?: boolean
    uploadedAt?: boolean
  }


  export type $MisReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MisReport"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      rmName: string
      fileName: string | null
      volume: Prisma.Decimal
      status: string
      uploadedAt: Date
    }, ExtArgs["result"]["misReport"]>
    composites: {}
  }

  type MisReportGetPayload<S extends boolean | null | undefined | MisReportDefaultArgs> = $Result.GetResult<Prisma.$MisReportPayload, S>

  type MisReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MisReportFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MisReportCountAggregateInputType | true
    }

  export interface MisReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MisReport'], meta: { name: 'MisReport' } }
    /**
     * Find zero or one MisReport that matches the filter.
     * @param {MisReportFindUniqueArgs} args - Arguments to find a MisReport
     * @example
     * // Get one MisReport
     * const misReport = await prisma.misReport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MisReportFindUniqueArgs>(args: SelectSubset<T, MisReportFindUniqueArgs<ExtArgs>>): Prisma__MisReportClient<$Result.GetResult<Prisma.$MisReportPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MisReport that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MisReportFindUniqueOrThrowArgs} args - Arguments to find a MisReport
     * @example
     * // Get one MisReport
     * const misReport = await prisma.misReport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MisReportFindUniqueOrThrowArgs>(args: SelectSubset<T, MisReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MisReportClient<$Result.GetResult<Prisma.$MisReportPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MisReport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MisReportFindFirstArgs} args - Arguments to find a MisReport
     * @example
     * // Get one MisReport
     * const misReport = await prisma.misReport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MisReportFindFirstArgs>(args?: SelectSubset<T, MisReportFindFirstArgs<ExtArgs>>): Prisma__MisReportClient<$Result.GetResult<Prisma.$MisReportPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MisReport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MisReportFindFirstOrThrowArgs} args - Arguments to find a MisReport
     * @example
     * // Get one MisReport
     * const misReport = await prisma.misReport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MisReportFindFirstOrThrowArgs>(args?: SelectSubset<T, MisReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__MisReportClient<$Result.GetResult<Prisma.$MisReportPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MisReports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MisReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MisReports
     * const misReports = await prisma.misReport.findMany()
     * 
     * // Get first 10 MisReports
     * const misReports = await prisma.misReport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const misReportWithIdOnly = await prisma.misReport.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MisReportFindManyArgs>(args?: SelectSubset<T, MisReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MisReportPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MisReport.
     * @param {MisReportCreateArgs} args - Arguments to create a MisReport.
     * @example
     * // Create one MisReport
     * const MisReport = await prisma.misReport.create({
     *   data: {
     *     // ... data to create a MisReport
     *   }
     * })
     * 
     */
    create<T extends MisReportCreateArgs>(args: SelectSubset<T, MisReportCreateArgs<ExtArgs>>): Prisma__MisReportClient<$Result.GetResult<Prisma.$MisReportPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MisReports.
     * @param {MisReportCreateManyArgs} args - Arguments to create many MisReports.
     * @example
     * // Create many MisReports
     * const misReport = await prisma.misReport.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MisReportCreateManyArgs>(args?: SelectSubset<T, MisReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MisReport.
     * @param {MisReportDeleteArgs} args - Arguments to delete one MisReport.
     * @example
     * // Delete one MisReport
     * const MisReport = await prisma.misReport.delete({
     *   where: {
     *     // ... filter to delete one MisReport
     *   }
     * })
     * 
     */
    delete<T extends MisReportDeleteArgs>(args: SelectSubset<T, MisReportDeleteArgs<ExtArgs>>): Prisma__MisReportClient<$Result.GetResult<Prisma.$MisReportPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MisReport.
     * @param {MisReportUpdateArgs} args - Arguments to update one MisReport.
     * @example
     * // Update one MisReport
     * const misReport = await prisma.misReport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MisReportUpdateArgs>(args: SelectSubset<T, MisReportUpdateArgs<ExtArgs>>): Prisma__MisReportClient<$Result.GetResult<Prisma.$MisReportPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MisReports.
     * @param {MisReportDeleteManyArgs} args - Arguments to filter MisReports to delete.
     * @example
     * // Delete a few MisReports
     * const { count } = await prisma.misReport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MisReportDeleteManyArgs>(args?: SelectSubset<T, MisReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MisReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MisReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MisReports
     * const misReport = await prisma.misReport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MisReportUpdateManyArgs>(args: SelectSubset<T, MisReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MisReport.
     * @param {MisReportUpsertArgs} args - Arguments to update or create a MisReport.
     * @example
     * // Update or create a MisReport
     * const misReport = await prisma.misReport.upsert({
     *   create: {
     *     // ... data to create a MisReport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MisReport we want to update
     *   }
     * })
     */
    upsert<T extends MisReportUpsertArgs>(args: SelectSubset<T, MisReportUpsertArgs<ExtArgs>>): Prisma__MisReportClient<$Result.GetResult<Prisma.$MisReportPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MisReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MisReportCountArgs} args - Arguments to filter MisReports to count.
     * @example
     * // Count the number of MisReports
     * const count = await prisma.misReport.count({
     *   where: {
     *     // ... the filter for the MisReports we want to count
     *   }
     * })
    **/
    count<T extends MisReportCountArgs>(
      args?: Subset<T, MisReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MisReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MisReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MisReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MisReportAggregateArgs>(args: Subset<T, MisReportAggregateArgs>): Prisma.PrismaPromise<GetMisReportAggregateType<T>>

    /**
     * Group by MisReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MisReportGroupByArgs} args - Group by arguments.
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
      T extends MisReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MisReportGroupByArgs['orderBy'] }
        : { orderBy?: MisReportGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MisReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMisReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MisReport model
   */
  readonly fields: MisReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MisReport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MisReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the MisReport model
   */ 
  interface MisReportFieldRefs {
    readonly id: FieldRef<"MisReport", 'String'>
    readonly rmName: FieldRef<"MisReport", 'String'>
    readonly fileName: FieldRef<"MisReport", 'String'>
    readonly volume: FieldRef<"MisReport", 'Decimal'>
    readonly status: FieldRef<"MisReport", 'String'>
    readonly uploadedAt: FieldRef<"MisReport", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MisReport findUnique
   */
  export type MisReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MisReport
     */
    select?: MisReportSelect<ExtArgs> | null
    /**
     * Filter, which MisReport to fetch.
     */
    where: MisReportWhereUniqueInput
  }

  /**
   * MisReport findUniqueOrThrow
   */
  export type MisReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MisReport
     */
    select?: MisReportSelect<ExtArgs> | null
    /**
     * Filter, which MisReport to fetch.
     */
    where: MisReportWhereUniqueInput
  }

  /**
   * MisReport findFirst
   */
  export type MisReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MisReport
     */
    select?: MisReportSelect<ExtArgs> | null
    /**
     * Filter, which MisReport to fetch.
     */
    where?: MisReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MisReports to fetch.
     */
    orderBy?: MisReportOrderByWithRelationInput | MisReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MisReports.
     */
    cursor?: MisReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MisReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MisReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MisReports.
     */
    distinct?: MisReportScalarFieldEnum | MisReportScalarFieldEnum[]
  }

  /**
   * MisReport findFirstOrThrow
   */
  export type MisReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MisReport
     */
    select?: MisReportSelect<ExtArgs> | null
    /**
     * Filter, which MisReport to fetch.
     */
    where?: MisReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MisReports to fetch.
     */
    orderBy?: MisReportOrderByWithRelationInput | MisReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MisReports.
     */
    cursor?: MisReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MisReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MisReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MisReports.
     */
    distinct?: MisReportScalarFieldEnum | MisReportScalarFieldEnum[]
  }

  /**
   * MisReport findMany
   */
  export type MisReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MisReport
     */
    select?: MisReportSelect<ExtArgs> | null
    /**
     * Filter, which MisReports to fetch.
     */
    where?: MisReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MisReports to fetch.
     */
    orderBy?: MisReportOrderByWithRelationInput | MisReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MisReports.
     */
    cursor?: MisReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MisReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MisReports.
     */
    skip?: number
    distinct?: MisReportScalarFieldEnum | MisReportScalarFieldEnum[]
  }

  /**
   * MisReport create
   */
  export type MisReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MisReport
     */
    select?: MisReportSelect<ExtArgs> | null
    /**
     * The data needed to create a MisReport.
     */
    data: XOR<MisReportCreateInput, MisReportUncheckedCreateInput>
  }

  /**
   * MisReport createMany
   */
  export type MisReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MisReports.
     */
    data: MisReportCreateManyInput | MisReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MisReport update
   */
  export type MisReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MisReport
     */
    select?: MisReportSelect<ExtArgs> | null
    /**
     * The data needed to update a MisReport.
     */
    data: XOR<MisReportUpdateInput, MisReportUncheckedUpdateInput>
    /**
     * Choose, which MisReport to update.
     */
    where: MisReportWhereUniqueInput
  }

  /**
   * MisReport updateMany
   */
  export type MisReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MisReports.
     */
    data: XOR<MisReportUpdateManyMutationInput, MisReportUncheckedUpdateManyInput>
    /**
     * Filter which MisReports to update
     */
    where?: MisReportWhereInput
  }

  /**
   * MisReport upsert
   */
  export type MisReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MisReport
     */
    select?: MisReportSelect<ExtArgs> | null
    /**
     * The filter to search for the MisReport to update in case it exists.
     */
    where: MisReportWhereUniqueInput
    /**
     * In case the MisReport found by the `where` argument doesn't exist, create a new MisReport with this data.
     */
    create: XOR<MisReportCreateInput, MisReportUncheckedCreateInput>
    /**
     * In case the MisReport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MisReportUpdateInput, MisReportUncheckedUpdateInput>
  }

  /**
   * MisReport delete
   */
  export type MisReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MisReport
     */
    select?: MisReportSelect<ExtArgs> | null
    /**
     * Filter which MisReport to delete.
     */
    where: MisReportWhereUniqueInput
  }

  /**
   * MisReport deleteMany
   */
  export type MisReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MisReports to delete
     */
    where?: MisReportWhereInput
  }

  /**
   * MisReport without action
   */
  export type MisReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MisReport
     */
    select?: MisReportSelect<ExtArgs> | null
  }


  /**
   * Model EmailConfig
   */

  export type AggregateEmailConfig = {
    _count: EmailConfigCountAggregateOutputType | null
    _min: EmailConfigMinAggregateOutputType | null
    _max: EmailConfigMaxAggregateOutputType | null
  }

  export type EmailConfigMinAggregateOutputType = {
    id: string | null
    frequency: string | null
    recipients: string | null
    updatedAt: Date | null
  }

  export type EmailConfigMaxAggregateOutputType = {
    id: string | null
    frequency: string | null
    recipients: string | null
    updatedAt: Date | null
  }

  export type EmailConfigCountAggregateOutputType = {
    id: number
    frequency: number
    recipients: number
    updatedAt: number
    _all: number
  }


  export type EmailConfigMinAggregateInputType = {
    id?: true
    frequency?: true
    recipients?: true
    updatedAt?: true
  }

  export type EmailConfigMaxAggregateInputType = {
    id?: true
    frequency?: true
    recipients?: true
    updatedAt?: true
  }

  export type EmailConfigCountAggregateInputType = {
    id?: true
    frequency?: true
    recipients?: true
    updatedAt?: true
    _all?: true
  }

  export type EmailConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailConfig to aggregate.
     */
    where?: EmailConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailConfigs to fetch.
     */
    orderBy?: EmailConfigOrderByWithRelationInput | EmailConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmailConfigs
    **/
    _count?: true | EmailConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailConfigMaxAggregateInputType
  }

  export type GetEmailConfigAggregateType<T extends EmailConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateEmailConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmailConfig[P]>
      : GetScalarType<T[P], AggregateEmailConfig[P]>
  }




  export type EmailConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailConfigWhereInput
    orderBy?: EmailConfigOrderByWithAggregationInput | EmailConfigOrderByWithAggregationInput[]
    by: EmailConfigScalarFieldEnum[] | EmailConfigScalarFieldEnum
    having?: EmailConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailConfigCountAggregateInputType | true
    _min?: EmailConfigMinAggregateInputType
    _max?: EmailConfigMaxAggregateInputType
  }

  export type EmailConfigGroupByOutputType = {
    id: string
    frequency: string
    recipients: string
    updatedAt: Date
    _count: EmailConfigCountAggregateOutputType | null
    _min: EmailConfigMinAggregateOutputType | null
    _max: EmailConfigMaxAggregateOutputType | null
  }

  type GetEmailConfigGroupByPayload<T extends EmailConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailConfigGroupByOutputType[P]>
            : GetScalarType<T[P], EmailConfigGroupByOutputType[P]>
        }
      >
    >


  export type EmailConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    frequency?: boolean
    recipients?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["emailConfig"]>


  export type EmailConfigSelectScalar = {
    id?: boolean
    frequency?: boolean
    recipients?: boolean
    updatedAt?: boolean
  }


  export type $EmailConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmailConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      frequency: string
      recipients: string
      updatedAt: Date
    }, ExtArgs["result"]["emailConfig"]>
    composites: {}
  }

  type EmailConfigGetPayload<S extends boolean | null | undefined | EmailConfigDefaultArgs> = $Result.GetResult<Prisma.$EmailConfigPayload, S>

  type EmailConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EmailConfigFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EmailConfigCountAggregateInputType | true
    }

  export interface EmailConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmailConfig'], meta: { name: 'EmailConfig' } }
    /**
     * Find zero or one EmailConfig that matches the filter.
     * @param {EmailConfigFindUniqueArgs} args - Arguments to find a EmailConfig
     * @example
     * // Get one EmailConfig
     * const emailConfig = await prisma.emailConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailConfigFindUniqueArgs>(args: SelectSubset<T, EmailConfigFindUniqueArgs<ExtArgs>>): Prisma__EmailConfigClient<$Result.GetResult<Prisma.$EmailConfigPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one EmailConfig that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EmailConfigFindUniqueOrThrowArgs} args - Arguments to find a EmailConfig
     * @example
     * // Get one EmailConfig
     * const emailConfig = await prisma.emailConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailConfigClient<$Result.GetResult<Prisma.$EmailConfigPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first EmailConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailConfigFindFirstArgs} args - Arguments to find a EmailConfig
     * @example
     * // Get one EmailConfig
     * const emailConfig = await prisma.emailConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailConfigFindFirstArgs>(args?: SelectSubset<T, EmailConfigFindFirstArgs<ExtArgs>>): Prisma__EmailConfigClient<$Result.GetResult<Prisma.$EmailConfigPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first EmailConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailConfigFindFirstOrThrowArgs} args - Arguments to find a EmailConfig
     * @example
     * // Get one EmailConfig
     * const emailConfig = await prisma.emailConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailConfigClient<$Result.GetResult<Prisma.$EmailConfigPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more EmailConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmailConfigs
     * const emailConfigs = await prisma.emailConfig.findMany()
     * 
     * // Get first 10 EmailConfigs
     * const emailConfigs = await prisma.emailConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailConfigWithIdOnly = await prisma.emailConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmailConfigFindManyArgs>(args?: SelectSubset<T, EmailConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailConfigPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a EmailConfig.
     * @param {EmailConfigCreateArgs} args - Arguments to create a EmailConfig.
     * @example
     * // Create one EmailConfig
     * const EmailConfig = await prisma.emailConfig.create({
     *   data: {
     *     // ... data to create a EmailConfig
     *   }
     * })
     * 
     */
    create<T extends EmailConfigCreateArgs>(args: SelectSubset<T, EmailConfigCreateArgs<ExtArgs>>): Prisma__EmailConfigClient<$Result.GetResult<Prisma.$EmailConfigPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many EmailConfigs.
     * @param {EmailConfigCreateManyArgs} args - Arguments to create many EmailConfigs.
     * @example
     * // Create many EmailConfigs
     * const emailConfig = await prisma.emailConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailConfigCreateManyArgs>(args?: SelectSubset<T, EmailConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a EmailConfig.
     * @param {EmailConfigDeleteArgs} args - Arguments to delete one EmailConfig.
     * @example
     * // Delete one EmailConfig
     * const EmailConfig = await prisma.emailConfig.delete({
     *   where: {
     *     // ... filter to delete one EmailConfig
     *   }
     * })
     * 
     */
    delete<T extends EmailConfigDeleteArgs>(args: SelectSubset<T, EmailConfigDeleteArgs<ExtArgs>>): Prisma__EmailConfigClient<$Result.GetResult<Prisma.$EmailConfigPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one EmailConfig.
     * @param {EmailConfigUpdateArgs} args - Arguments to update one EmailConfig.
     * @example
     * // Update one EmailConfig
     * const emailConfig = await prisma.emailConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailConfigUpdateArgs>(args: SelectSubset<T, EmailConfigUpdateArgs<ExtArgs>>): Prisma__EmailConfigClient<$Result.GetResult<Prisma.$EmailConfigPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more EmailConfigs.
     * @param {EmailConfigDeleteManyArgs} args - Arguments to filter EmailConfigs to delete.
     * @example
     * // Delete a few EmailConfigs
     * const { count } = await prisma.emailConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailConfigDeleteManyArgs>(args?: SelectSubset<T, EmailConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmailConfigs
     * const emailConfig = await prisma.emailConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailConfigUpdateManyArgs>(args: SelectSubset<T, EmailConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EmailConfig.
     * @param {EmailConfigUpsertArgs} args - Arguments to update or create a EmailConfig.
     * @example
     * // Update or create a EmailConfig
     * const emailConfig = await prisma.emailConfig.upsert({
     *   create: {
     *     // ... data to create a EmailConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmailConfig we want to update
     *   }
     * })
     */
    upsert<T extends EmailConfigUpsertArgs>(args: SelectSubset<T, EmailConfigUpsertArgs<ExtArgs>>): Prisma__EmailConfigClient<$Result.GetResult<Prisma.$EmailConfigPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of EmailConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailConfigCountArgs} args - Arguments to filter EmailConfigs to count.
     * @example
     * // Count the number of EmailConfigs
     * const count = await prisma.emailConfig.count({
     *   where: {
     *     // ... the filter for the EmailConfigs we want to count
     *   }
     * })
    **/
    count<T extends EmailConfigCountArgs>(
      args?: Subset<T, EmailConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmailConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmailConfigAggregateArgs>(args: Subset<T, EmailConfigAggregateArgs>): Prisma.PrismaPromise<GetEmailConfigAggregateType<T>>

    /**
     * Group by EmailConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailConfigGroupByArgs} args - Group by arguments.
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
      T extends EmailConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailConfigGroupByArgs['orderBy'] }
        : { orderBy?: EmailConfigGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EmailConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmailConfig model
   */
  readonly fields: EmailConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmailConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the EmailConfig model
   */ 
  interface EmailConfigFieldRefs {
    readonly id: FieldRef<"EmailConfig", 'String'>
    readonly frequency: FieldRef<"EmailConfig", 'String'>
    readonly recipients: FieldRef<"EmailConfig", 'String'>
    readonly updatedAt: FieldRef<"EmailConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmailConfig findUnique
   */
  export type EmailConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailConfig
     */
    select?: EmailConfigSelect<ExtArgs> | null
    /**
     * Filter, which EmailConfig to fetch.
     */
    where: EmailConfigWhereUniqueInput
  }

  /**
   * EmailConfig findUniqueOrThrow
   */
  export type EmailConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailConfig
     */
    select?: EmailConfigSelect<ExtArgs> | null
    /**
     * Filter, which EmailConfig to fetch.
     */
    where: EmailConfigWhereUniqueInput
  }

  /**
   * EmailConfig findFirst
   */
  export type EmailConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailConfig
     */
    select?: EmailConfigSelect<ExtArgs> | null
    /**
     * Filter, which EmailConfig to fetch.
     */
    where?: EmailConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailConfigs to fetch.
     */
    orderBy?: EmailConfigOrderByWithRelationInput | EmailConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailConfigs.
     */
    cursor?: EmailConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailConfigs.
     */
    distinct?: EmailConfigScalarFieldEnum | EmailConfigScalarFieldEnum[]
  }

  /**
   * EmailConfig findFirstOrThrow
   */
  export type EmailConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailConfig
     */
    select?: EmailConfigSelect<ExtArgs> | null
    /**
     * Filter, which EmailConfig to fetch.
     */
    where?: EmailConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailConfigs to fetch.
     */
    orderBy?: EmailConfigOrderByWithRelationInput | EmailConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailConfigs.
     */
    cursor?: EmailConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailConfigs.
     */
    distinct?: EmailConfigScalarFieldEnum | EmailConfigScalarFieldEnum[]
  }

  /**
   * EmailConfig findMany
   */
  export type EmailConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailConfig
     */
    select?: EmailConfigSelect<ExtArgs> | null
    /**
     * Filter, which EmailConfigs to fetch.
     */
    where?: EmailConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailConfigs to fetch.
     */
    orderBy?: EmailConfigOrderByWithRelationInput | EmailConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmailConfigs.
     */
    cursor?: EmailConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailConfigs.
     */
    skip?: number
    distinct?: EmailConfigScalarFieldEnum | EmailConfigScalarFieldEnum[]
  }

  /**
   * EmailConfig create
   */
  export type EmailConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailConfig
     */
    select?: EmailConfigSelect<ExtArgs> | null
    /**
     * The data needed to create a EmailConfig.
     */
    data: XOR<EmailConfigCreateInput, EmailConfigUncheckedCreateInput>
  }

  /**
   * EmailConfig createMany
   */
  export type EmailConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmailConfigs.
     */
    data: EmailConfigCreateManyInput | EmailConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailConfig update
   */
  export type EmailConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailConfig
     */
    select?: EmailConfigSelect<ExtArgs> | null
    /**
     * The data needed to update a EmailConfig.
     */
    data: XOR<EmailConfigUpdateInput, EmailConfigUncheckedUpdateInput>
    /**
     * Choose, which EmailConfig to update.
     */
    where: EmailConfigWhereUniqueInput
  }

  /**
   * EmailConfig updateMany
   */
  export type EmailConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmailConfigs.
     */
    data: XOR<EmailConfigUpdateManyMutationInput, EmailConfigUncheckedUpdateManyInput>
    /**
     * Filter which EmailConfigs to update
     */
    where?: EmailConfigWhereInput
  }

  /**
   * EmailConfig upsert
   */
  export type EmailConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailConfig
     */
    select?: EmailConfigSelect<ExtArgs> | null
    /**
     * The filter to search for the EmailConfig to update in case it exists.
     */
    where: EmailConfigWhereUniqueInput
    /**
     * In case the EmailConfig found by the `where` argument doesn't exist, create a new EmailConfig with this data.
     */
    create: XOR<EmailConfigCreateInput, EmailConfigUncheckedCreateInput>
    /**
     * In case the EmailConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailConfigUpdateInput, EmailConfigUncheckedUpdateInput>
  }

  /**
   * EmailConfig delete
   */
  export type EmailConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailConfig
     */
    select?: EmailConfigSelect<ExtArgs> | null
    /**
     * Filter which EmailConfig to delete.
     */
    where: EmailConfigWhereUniqueInput
  }

  /**
   * EmailConfig deleteMany
   */
  export type EmailConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailConfigs to delete
     */
    where?: EmailConfigWhereInput
  }

  /**
   * EmailConfig without action
   */
  export type EmailConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailConfig
     */
    select?: EmailConfigSelect<ExtArgs> | null
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


  export const AnalyticsSnapshotScalarFieldEnum: {
    id: 'id',
    snapshotDate: 'snapshotDate',
    metricType: 'metricType',
    metricValue: 'metricValue',
    dimension: 'dimension',
    dimensionValue: 'dimensionValue',
    createdAt: 'createdAt'
  };

  export type AnalyticsSnapshotScalarFieldEnum = (typeof AnalyticsSnapshotScalarFieldEnum)[keyof typeof AnalyticsSnapshotScalarFieldEnum]


  export const AggregationLogScalarFieldEnum: {
    id: 'id',
    jobType: 'jobType',
    startedAt: 'startedAt',
    completedAt: 'completedAt',
    recordsProcessed: 'recordsProcessed',
    status: 'status'
  };

  export type AggregationLogScalarFieldEnum = (typeof AggregationLogScalarFieldEnum)[keyof typeof AggregationLogScalarFieldEnum]


  export const ReportJobScalarFieldEnum: {
    id: 'id',
    reportType: 'reportType',
    status: 'status',
    requestedBy: 'requestedBy',
    filePath: 'filePath',
    requestedAt: 'requestedAt',
    completedAt: 'completedAt'
  };

  export type ReportJobScalarFieldEnum = (typeof ReportJobScalarFieldEnum)[keyof typeof ReportJobScalarFieldEnum]


  export const MisReportScalarFieldEnum: {
    id: 'id',
    rmName: 'rmName',
    fileName: 'fileName',
    volume: 'volume',
    status: 'status',
    uploadedAt: 'uploadedAt'
  };

  export type MisReportScalarFieldEnum = (typeof MisReportScalarFieldEnum)[keyof typeof MisReportScalarFieldEnum]


  export const EmailConfigScalarFieldEnum: {
    id: 'id',
    frequency: 'frequency',
    recipients: 'recipients',
    updatedAt: 'updatedAt'
  };

  export type EmailConfigScalarFieldEnum = (typeof EmailConfigScalarFieldEnum)[keyof typeof EmailConfigScalarFieldEnum]


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
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    
  /**
   * Deep Input Types
   */


  export type AnalyticsSnapshotWhereInput = {
    AND?: AnalyticsSnapshotWhereInput | AnalyticsSnapshotWhereInput[]
    OR?: AnalyticsSnapshotWhereInput[]
    NOT?: AnalyticsSnapshotWhereInput | AnalyticsSnapshotWhereInput[]
    id?: StringFilter<"AnalyticsSnapshot"> | string
    snapshotDate?: DateTimeFilter<"AnalyticsSnapshot"> | Date | string
    metricType?: StringFilter<"AnalyticsSnapshot"> | string
    metricValue?: FloatFilter<"AnalyticsSnapshot"> | number
    dimension?: StringNullableFilter<"AnalyticsSnapshot"> | string | null
    dimensionValue?: StringNullableFilter<"AnalyticsSnapshot"> | string | null
    createdAt?: DateTimeFilter<"AnalyticsSnapshot"> | Date | string
  }

  export type AnalyticsSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    snapshotDate?: SortOrder
    metricType?: SortOrder
    metricValue?: SortOrder
    dimension?: SortOrderInput | SortOrder
    dimensionValue?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type AnalyticsSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AnalyticsSnapshotWhereInput | AnalyticsSnapshotWhereInput[]
    OR?: AnalyticsSnapshotWhereInput[]
    NOT?: AnalyticsSnapshotWhereInput | AnalyticsSnapshotWhereInput[]
    snapshotDate?: DateTimeFilter<"AnalyticsSnapshot"> | Date | string
    metricType?: StringFilter<"AnalyticsSnapshot"> | string
    metricValue?: FloatFilter<"AnalyticsSnapshot"> | number
    dimension?: StringNullableFilter<"AnalyticsSnapshot"> | string | null
    dimensionValue?: StringNullableFilter<"AnalyticsSnapshot"> | string | null
    createdAt?: DateTimeFilter<"AnalyticsSnapshot"> | Date | string
  }, "id">

  export type AnalyticsSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    snapshotDate?: SortOrder
    metricType?: SortOrder
    metricValue?: SortOrder
    dimension?: SortOrderInput | SortOrder
    dimensionValue?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AnalyticsSnapshotCountOrderByAggregateInput
    _avg?: AnalyticsSnapshotAvgOrderByAggregateInput
    _max?: AnalyticsSnapshotMaxOrderByAggregateInput
    _min?: AnalyticsSnapshotMinOrderByAggregateInput
    _sum?: AnalyticsSnapshotSumOrderByAggregateInput
  }

  export type AnalyticsSnapshotScalarWhereWithAggregatesInput = {
    AND?: AnalyticsSnapshotScalarWhereWithAggregatesInput | AnalyticsSnapshotScalarWhereWithAggregatesInput[]
    OR?: AnalyticsSnapshotScalarWhereWithAggregatesInput[]
    NOT?: AnalyticsSnapshotScalarWhereWithAggregatesInput | AnalyticsSnapshotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AnalyticsSnapshot"> | string
    snapshotDate?: DateTimeWithAggregatesFilter<"AnalyticsSnapshot"> | Date | string
    metricType?: StringWithAggregatesFilter<"AnalyticsSnapshot"> | string
    metricValue?: FloatWithAggregatesFilter<"AnalyticsSnapshot"> | number
    dimension?: StringNullableWithAggregatesFilter<"AnalyticsSnapshot"> | string | null
    dimensionValue?: StringNullableWithAggregatesFilter<"AnalyticsSnapshot"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AnalyticsSnapshot"> | Date | string
  }

  export type AggregationLogWhereInput = {
    AND?: AggregationLogWhereInput | AggregationLogWhereInput[]
    OR?: AggregationLogWhereInput[]
    NOT?: AggregationLogWhereInput | AggregationLogWhereInput[]
    id?: StringFilter<"AggregationLog"> | string
    jobType?: StringFilter<"AggregationLog"> | string
    startedAt?: DateTimeFilter<"AggregationLog"> | Date | string
    completedAt?: DateTimeNullableFilter<"AggregationLog"> | Date | string | null
    recordsProcessed?: IntFilter<"AggregationLog"> | number
    status?: StringFilter<"AggregationLog"> | string
  }

  export type AggregationLogOrderByWithRelationInput = {
    id?: SortOrder
    jobType?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    recordsProcessed?: SortOrder
    status?: SortOrder
  }

  export type AggregationLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AggregationLogWhereInput | AggregationLogWhereInput[]
    OR?: AggregationLogWhereInput[]
    NOT?: AggregationLogWhereInput | AggregationLogWhereInput[]
    jobType?: StringFilter<"AggregationLog"> | string
    startedAt?: DateTimeFilter<"AggregationLog"> | Date | string
    completedAt?: DateTimeNullableFilter<"AggregationLog"> | Date | string | null
    recordsProcessed?: IntFilter<"AggregationLog"> | number
    status?: StringFilter<"AggregationLog"> | string
  }, "id">

  export type AggregationLogOrderByWithAggregationInput = {
    id?: SortOrder
    jobType?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    recordsProcessed?: SortOrder
    status?: SortOrder
    _count?: AggregationLogCountOrderByAggregateInput
    _avg?: AggregationLogAvgOrderByAggregateInput
    _max?: AggregationLogMaxOrderByAggregateInput
    _min?: AggregationLogMinOrderByAggregateInput
    _sum?: AggregationLogSumOrderByAggregateInput
  }

  export type AggregationLogScalarWhereWithAggregatesInput = {
    AND?: AggregationLogScalarWhereWithAggregatesInput | AggregationLogScalarWhereWithAggregatesInput[]
    OR?: AggregationLogScalarWhereWithAggregatesInput[]
    NOT?: AggregationLogScalarWhereWithAggregatesInput | AggregationLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AggregationLog"> | string
    jobType?: StringWithAggregatesFilter<"AggregationLog"> | string
    startedAt?: DateTimeWithAggregatesFilter<"AggregationLog"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"AggregationLog"> | Date | string | null
    recordsProcessed?: IntWithAggregatesFilter<"AggregationLog"> | number
    status?: StringWithAggregatesFilter<"AggregationLog"> | string
  }

  export type ReportJobWhereInput = {
    AND?: ReportJobWhereInput | ReportJobWhereInput[]
    OR?: ReportJobWhereInput[]
    NOT?: ReportJobWhereInput | ReportJobWhereInput[]
    id?: StringFilter<"ReportJob"> | string
    reportType?: StringFilter<"ReportJob"> | string
    status?: StringFilter<"ReportJob"> | string
    requestedBy?: StringNullableFilter<"ReportJob"> | string | null
    filePath?: StringNullableFilter<"ReportJob"> | string | null
    requestedAt?: DateTimeFilter<"ReportJob"> | Date | string
    completedAt?: DateTimeNullableFilter<"ReportJob"> | Date | string | null
  }

  export type ReportJobOrderByWithRelationInput = {
    id?: SortOrder
    reportType?: SortOrder
    status?: SortOrder
    requestedBy?: SortOrderInput | SortOrder
    filePath?: SortOrderInput | SortOrder
    requestedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
  }

  export type ReportJobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReportJobWhereInput | ReportJobWhereInput[]
    OR?: ReportJobWhereInput[]
    NOT?: ReportJobWhereInput | ReportJobWhereInput[]
    reportType?: StringFilter<"ReportJob"> | string
    status?: StringFilter<"ReportJob"> | string
    requestedBy?: StringNullableFilter<"ReportJob"> | string | null
    filePath?: StringNullableFilter<"ReportJob"> | string | null
    requestedAt?: DateTimeFilter<"ReportJob"> | Date | string
    completedAt?: DateTimeNullableFilter<"ReportJob"> | Date | string | null
  }, "id">

  export type ReportJobOrderByWithAggregationInput = {
    id?: SortOrder
    reportType?: SortOrder
    status?: SortOrder
    requestedBy?: SortOrderInput | SortOrder
    filePath?: SortOrderInput | SortOrder
    requestedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    _count?: ReportJobCountOrderByAggregateInput
    _max?: ReportJobMaxOrderByAggregateInput
    _min?: ReportJobMinOrderByAggregateInput
  }

  export type ReportJobScalarWhereWithAggregatesInput = {
    AND?: ReportJobScalarWhereWithAggregatesInput | ReportJobScalarWhereWithAggregatesInput[]
    OR?: ReportJobScalarWhereWithAggregatesInput[]
    NOT?: ReportJobScalarWhereWithAggregatesInput | ReportJobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReportJob"> | string
    reportType?: StringWithAggregatesFilter<"ReportJob"> | string
    status?: StringWithAggregatesFilter<"ReportJob"> | string
    requestedBy?: StringNullableWithAggregatesFilter<"ReportJob"> | string | null
    filePath?: StringNullableWithAggregatesFilter<"ReportJob"> | string | null
    requestedAt?: DateTimeWithAggregatesFilter<"ReportJob"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"ReportJob"> | Date | string | null
  }

  export type MisReportWhereInput = {
    AND?: MisReportWhereInput | MisReportWhereInput[]
    OR?: MisReportWhereInput[]
    NOT?: MisReportWhereInput | MisReportWhereInput[]
    id?: StringFilter<"MisReport"> | string
    rmName?: StringFilter<"MisReport"> | string
    fileName?: StringNullableFilter<"MisReport"> | string | null
    volume?: DecimalFilter<"MisReport"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"MisReport"> | string
    uploadedAt?: DateTimeFilter<"MisReport"> | Date | string
  }

  export type MisReportOrderByWithRelationInput = {
    id?: SortOrder
    rmName?: SortOrder
    fileName?: SortOrderInput | SortOrder
    volume?: SortOrder
    status?: SortOrder
    uploadedAt?: SortOrder
  }

  export type MisReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MisReportWhereInput | MisReportWhereInput[]
    OR?: MisReportWhereInput[]
    NOT?: MisReportWhereInput | MisReportWhereInput[]
    rmName?: StringFilter<"MisReport"> | string
    fileName?: StringNullableFilter<"MisReport"> | string | null
    volume?: DecimalFilter<"MisReport"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"MisReport"> | string
    uploadedAt?: DateTimeFilter<"MisReport"> | Date | string
  }, "id">

  export type MisReportOrderByWithAggregationInput = {
    id?: SortOrder
    rmName?: SortOrder
    fileName?: SortOrderInput | SortOrder
    volume?: SortOrder
    status?: SortOrder
    uploadedAt?: SortOrder
    _count?: MisReportCountOrderByAggregateInput
    _avg?: MisReportAvgOrderByAggregateInput
    _max?: MisReportMaxOrderByAggregateInput
    _min?: MisReportMinOrderByAggregateInput
    _sum?: MisReportSumOrderByAggregateInput
  }

  export type MisReportScalarWhereWithAggregatesInput = {
    AND?: MisReportScalarWhereWithAggregatesInput | MisReportScalarWhereWithAggregatesInput[]
    OR?: MisReportScalarWhereWithAggregatesInput[]
    NOT?: MisReportScalarWhereWithAggregatesInput | MisReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MisReport"> | string
    rmName?: StringWithAggregatesFilter<"MisReport"> | string
    fileName?: StringNullableWithAggregatesFilter<"MisReport"> | string | null
    volume?: DecimalWithAggregatesFilter<"MisReport"> | Decimal | DecimalJsLike | number | string
    status?: StringWithAggregatesFilter<"MisReport"> | string
    uploadedAt?: DateTimeWithAggregatesFilter<"MisReport"> | Date | string
  }

  export type EmailConfigWhereInput = {
    AND?: EmailConfigWhereInput | EmailConfigWhereInput[]
    OR?: EmailConfigWhereInput[]
    NOT?: EmailConfigWhereInput | EmailConfigWhereInput[]
    id?: StringFilter<"EmailConfig"> | string
    frequency?: StringFilter<"EmailConfig"> | string
    recipients?: StringFilter<"EmailConfig"> | string
    updatedAt?: DateTimeFilter<"EmailConfig"> | Date | string
  }

  export type EmailConfigOrderByWithRelationInput = {
    id?: SortOrder
    frequency?: SortOrder
    recipients?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmailConfigWhereInput | EmailConfigWhereInput[]
    OR?: EmailConfigWhereInput[]
    NOT?: EmailConfigWhereInput | EmailConfigWhereInput[]
    frequency?: StringFilter<"EmailConfig"> | string
    recipients?: StringFilter<"EmailConfig"> | string
    updatedAt?: DateTimeFilter<"EmailConfig"> | Date | string
  }, "id">

  export type EmailConfigOrderByWithAggregationInput = {
    id?: SortOrder
    frequency?: SortOrder
    recipients?: SortOrder
    updatedAt?: SortOrder
    _count?: EmailConfigCountOrderByAggregateInput
    _max?: EmailConfigMaxOrderByAggregateInput
    _min?: EmailConfigMinOrderByAggregateInput
  }

  export type EmailConfigScalarWhereWithAggregatesInput = {
    AND?: EmailConfigScalarWhereWithAggregatesInput | EmailConfigScalarWhereWithAggregatesInput[]
    OR?: EmailConfigScalarWhereWithAggregatesInput[]
    NOT?: EmailConfigScalarWhereWithAggregatesInput | EmailConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmailConfig"> | string
    frequency?: StringWithAggregatesFilter<"EmailConfig"> | string
    recipients?: StringWithAggregatesFilter<"EmailConfig"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"EmailConfig"> | Date | string
  }

  export type AnalyticsSnapshotCreateInput = {
    id: string
    snapshotDate: Date | string
    metricType: string
    metricValue: number
    dimension?: string | null
    dimensionValue?: string | null
    createdAt: Date | string
  }

  export type AnalyticsSnapshotUncheckedCreateInput = {
    id: string
    snapshotDate: Date | string
    metricType: string
    metricValue: number
    dimension?: string | null
    dimensionValue?: string | null
    createdAt: Date | string
  }

  export type AnalyticsSnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    snapshotDate?: DateTimeFieldUpdateOperationsInput | Date | string
    metricType?: StringFieldUpdateOperationsInput | string
    metricValue?: FloatFieldUpdateOperationsInput | number
    dimension?: NullableStringFieldUpdateOperationsInput | string | null
    dimensionValue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsSnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    snapshotDate?: DateTimeFieldUpdateOperationsInput | Date | string
    metricType?: StringFieldUpdateOperationsInput | string
    metricValue?: FloatFieldUpdateOperationsInput | number
    dimension?: NullableStringFieldUpdateOperationsInput | string | null
    dimensionValue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsSnapshotCreateManyInput = {
    id: string
    snapshotDate: Date | string
    metricType: string
    metricValue: number
    dimension?: string | null
    dimensionValue?: string | null
    createdAt: Date | string
  }

  export type AnalyticsSnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    snapshotDate?: DateTimeFieldUpdateOperationsInput | Date | string
    metricType?: StringFieldUpdateOperationsInput | string
    metricValue?: FloatFieldUpdateOperationsInput | number
    dimension?: NullableStringFieldUpdateOperationsInput | string | null
    dimensionValue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsSnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    snapshotDate?: DateTimeFieldUpdateOperationsInput | Date | string
    metricType?: StringFieldUpdateOperationsInput | string
    metricValue?: FloatFieldUpdateOperationsInput | number
    dimension?: NullableStringFieldUpdateOperationsInput | string | null
    dimensionValue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AggregationLogCreateInput = {
    id: string
    jobType: string
    startedAt: Date | string
    completedAt?: Date | string | null
    recordsProcessed?: number
    status: string
  }

  export type AggregationLogUncheckedCreateInput = {
    id: string
    jobType: string
    startedAt: Date | string
    completedAt?: Date | string | null
    recordsProcessed?: number
    status: string
  }

  export type AggregationLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobType?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recordsProcessed?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
  }

  export type AggregationLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobType?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recordsProcessed?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
  }

  export type AggregationLogCreateManyInput = {
    id: string
    jobType: string
    startedAt: Date | string
    completedAt?: Date | string | null
    recordsProcessed?: number
    status: string
  }

  export type AggregationLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobType?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recordsProcessed?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
  }

  export type AggregationLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobType?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recordsProcessed?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
  }

  export type ReportJobCreateInput = {
    id: string
    reportType: string
    status: string
    requestedBy?: string | null
    filePath?: string | null
    requestedAt: Date | string
    completedAt?: Date | string | null
  }

  export type ReportJobUncheckedCreateInput = {
    id: string
    reportType: string
    status: string
    requestedBy?: string | null
    filePath?: string | null
    requestedAt: Date | string
    completedAt?: Date | string | null
  }

  export type ReportJobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    requestedBy?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ReportJobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    requestedBy?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ReportJobCreateManyInput = {
    id: string
    reportType: string
    status: string
    requestedBy?: string | null
    filePath?: string | null
    requestedAt: Date | string
    completedAt?: Date | string | null
  }

  export type ReportJobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    requestedBy?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ReportJobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    requestedBy?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MisReportCreateInput = {
    id?: string
    rmName: string
    fileName?: string | null
    volume?: Decimal | DecimalJsLike | number | string
    status?: string
    uploadedAt?: Date | string
  }

  export type MisReportUncheckedCreateInput = {
    id?: string
    rmName: string
    fileName?: string | null
    volume?: Decimal | DecimalJsLike | number | string
    status?: string
    uploadedAt?: Date | string
  }

  export type MisReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rmName?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    volume?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MisReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rmName?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    volume?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MisReportCreateManyInput = {
    id?: string
    rmName: string
    fileName?: string | null
    volume?: Decimal | DecimalJsLike | number | string
    status?: string
    uploadedAt?: Date | string
  }

  export type MisReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rmName?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    volume?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MisReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    rmName?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    volume?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailConfigCreateInput = {
    id?: string
    frequency?: string
    recipients: string
    updatedAt?: Date | string
  }

  export type EmailConfigUncheckedCreateInput = {
    id?: string
    frequency?: string
    recipients: string
    updatedAt?: Date | string
  }

  export type EmailConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    recipients?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    recipients?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailConfigCreateManyInput = {
    id?: string
    frequency?: string
    recipients: string
    updatedAt?: Date | string
  }

  export type EmailConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    recipients?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    recipients?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AnalyticsSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    snapshotDate?: SortOrder
    metricType?: SortOrder
    metricValue?: SortOrder
    dimension?: SortOrder
    dimensionValue?: SortOrder
    createdAt?: SortOrder
  }

  export type AnalyticsSnapshotAvgOrderByAggregateInput = {
    metricValue?: SortOrder
  }

  export type AnalyticsSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    snapshotDate?: SortOrder
    metricType?: SortOrder
    metricValue?: SortOrder
    dimension?: SortOrder
    dimensionValue?: SortOrder
    createdAt?: SortOrder
  }

  export type AnalyticsSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    snapshotDate?: SortOrder
    metricType?: SortOrder
    metricValue?: SortOrder
    dimension?: SortOrder
    dimensionValue?: SortOrder
    createdAt?: SortOrder
  }

  export type AnalyticsSnapshotSumOrderByAggregateInput = {
    metricValue?: SortOrder
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

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
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

  export type AggregationLogCountOrderByAggregateInput = {
    id?: SortOrder
    jobType?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    recordsProcessed?: SortOrder
    status?: SortOrder
  }

  export type AggregationLogAvgOrderByAggregateInput = {
    recordsProcessed?: SortOrder
  }

  export type AggregationLogMaxOrderByAggregateInput = {
    id?: SortOrder
    jobType?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    recordsProcessed?: SortOrder
    status?: SortOrder
  }

  export type AggregationLogMinOrderByAggregateInput = {
    id?: SortOrder
    jobType?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    recordsProcessed?: SortOrder
    status?: SortOrder
  }

  export type AggregationLogSumOrderByAggregateInput = {
    recordsProcessed?: SortOrder
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

  export type ReportJobCountOrderByAggregateInput = {
    id?: SortOrder
    reportType?: SortOrder
    status?: SortOrder
    requestedBy?: SortOrder
    filePath?: SortOrder
    requestedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type ReportJobMaxOrderByAggregateInput = {
    id?: SortOrder
    reportType?: SortOrder
    status?: SortOrder
    requestedBy?: SortOrder
    filePath?: SortOrder
    requestedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type ReportJobMinOrderByAggregateInput = {
    id?: SortOrder
    reportType?: SortOrder
    status?: SortOrder
    requestedBy?: SortOrder
    filePath?: SortOrder
    requestedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type MisReportCountOrderByAggregateInput = {
    id?: SortOrder
    rmName?: SortOrder
    fileName?: SortOrder
    volume?: SortOrder
    status?: SortOrder
    uploadedAt?: SortOrder
  }

  export type MisReportAvgOrderByAggregateInput = {
    volume?: SortOrder
  }

  export type MisReportMaxOrderByAggregateInput = {
    id?: SortOrder
    rmName?: SortOrder
    fileName?: SortOrder
    volume?: SortOrder
    status?: SortOrder
    uploadedAt?: SortOrder
  }

  export type MisReportMinOrderByAggregateInput = {
    id?: SortOrder
    rmName?: SortOrder
    fileName?: SortOrder
    volume?: SortOrder
    status?: SortOrder
    uploadedAt?: SortOrder
  }

  export type MisReportSumOrderByAggregateInput = {
    volume?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EmailConfigCountOrderByAggregateInput = {
    id?: SortOrder
    frequency?: SortOrder
    recipients?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    frequency?: SortOrder
    recipients?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailConfigMinOrderByAggregateInput = {
    id?: SortOrder
    frequency?: SortOrder
    recipients?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
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

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
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

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use AnalyticsSnapshotDefaultArgs instead
     */
    export type AnalyticsSnapshotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AnalyticsSnapshotDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AggregationLogDefaultArgs instead
     */
    export type AggregationLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AggregationLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReportJobDefaultArgs instead
     */
    export type ReportJobArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReportJobDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MisReportDefaultArgs instead
     */
    export type MisReportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MisReportDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EmailConfigDefaultArgs instead
     */
    export type EmailConfigArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EmailConfigDefaultArgs<ExtArgs>

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