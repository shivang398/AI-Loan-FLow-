
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
 * Model Connector
 * 
 */
export type Connector = $Result.DefaultSelection<Prisma.$ConnectorPayload>
/**
 * Model HierarchyMapping
 * 
 */
export type HierarchyMapping = $Result.DefaultSelection<Prisma.$HierarchyMappingPayload>
/**
 * Model ConnectorStatusHistory
 * 
 */
export type ConnectorStatusHistory = $Result.DefaultSelection<Prisma.$ConnectorStatusHistoryPayload>
/**
 * Model ConnectorPerformance
 * 
 */
export type ConnectorPerformance = $Result.DefaultSelection<Prisma.$ConnectorPerformancePayload>
/**
 * Model CommissionRule
 * 
 */
export type CommissionRule = $Result.DefaultSelection<Prisma.$CommissionRulePayload>
/**
 * Model CommissionTransaction
 * 
 */
export type CommissionTransaction = $Result.DefaultSelection<Prisma.$CommissionTransactionPayload>
/**
 * Model PayoutHistory
 * 
 */
export type PayoutHistory = $Result.DefaultSelection<Prisma.$PayoutHistoryPayload>
/**
 * Model PayoutSlab
 * 
 */
export type PayoutSlab = $Result.DefaultSelection<Prisma.$PayoutSlabPayload>
/**
 * Model SalesManager
 * 
 */
export type SalesManager = $Result.DefaultSelection<Prisma.$SalesManagerPayload>
/**
 * Model RoutingHistory
 * 
 */
export type RoutingHistory = $Result.DefaultSelection<Prisma.$RoutingHistoryPayload>
/**
 * Model CareerApplication
 * 
 */
export type CareerApplication = $Result.DefaultSelection<Prisma.$CareerApplicationPayload>
/**
 * Model FoirAssessment
 * 
 */
export type FoirAssessment = $Result.DefaultSelection<Prisma.$FoirAssessmentPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Connectors
 * const connectors = await prisma.connector.findMany()
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
   * // Fetch zero or more Connectors
   * const connectors = await prisma.connector.findMany()
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
   * `prisma.connector`: Exposes CRUD operations for the **Connector** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Connectors
    * const connectors = await prisma.connector.findMany()
    * ```
    */
  get connector(): Prisma.ConnectorDelegate<ExtArgs>;

  /**
   * `prisma.hierarchyMapping`: Exposes CRUD operations for the **HierarchyMapping** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HierarchyMappings
    * const hierarchyMappings = await prisma.hierarchyMapping.findMany()
    * ```
    */
  get hierarchyMapping(): Prisma.HierarchyMappingDelegate<ExtArgs>;

  /**
   * `prisma.connectorStatusHistory`: Exposes CRUD operations for the **ConnectorStatusHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ConnectorStatusHistories
    * const connectorStatusHistories = await prisma.connectorStatusHistory.findMany()
    * ```
    */
  get connectorStatusHistory(): Prisma.ConnectorStatusHistoryDelegate<ExtArgs>;

  /**
   * `prisma.connectorPerformance`: Exposes CRUD operations for the **ConnectorPerformance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ConnectorPerformances
    * const connectorPerformances = await prisma.connectorPerformance.findMany()
    * ```
    */
  get connectorPerformance(): Prisma.ConnectorPerformanceDelegate<ExtArgs>;

  /**
   * `prisma.commissionRule`: Exposes CRUD operations for the **CommissionRule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CommissionRules
    * const commissionRules = await prisma.commissionRule.findMany()
    * ```
    */
  get commissionRule(): Prisma.CommissionRuleDelegate<ExtArgs>;

  /**
   * `prisma.commissionTransaction`: Exposes CRUD operations for the **CommissionTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CommissionTransactions
    * const commissionTransactions = await prisma.commissionTransaction.findMany()
    * ```
    */
  get commissionTransaction(): Prisma.CommissionTransactionDelegate<ExtArgs>;

  /**
   * `prisma.payoutHistory`: Exposes CRUD operations for the **PayoutHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PayoutHistories
    * const payoutHistories = await prisma.payoutHistory.findMany()
    * ```
    */
  get payoutHistory(): Prisma.PayoutHistoryDelegate<ExtArgs>;

  /**
   * `prisma.payoutSlab`: Exposes CRUD operations for the **PayoutSlab** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PayoutSlabs
    * const payoutSlabs = await prisma.payoutSlab.findMany()
    * ```
    */
  get payoutSlab(): Prisma.PayoutSlabDelegate<ExtArgs>;

  /**
   * `prisma.salesManager`: Exposes CRUD operations for the **SalesManager** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SalesManagers
    * const salesManagers = await prisma.salesManager.findMany()
    * ```
    */
  get salesManager(): Prisma.SalesManagerDelegate<ExtArgs>;

  /**
   * `prisma.routingHistory`: Exposes CRUD operations for the **RoutingHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoutingHistories
    * const routingHistories = await prisma.routingHistory.findMany()
    * ```
    */
  get routingHistory(): Prisma.RoutingHistoryDelegate<ExtArgs>;

  /**
   * `prisma.careerApplication`: Exposes CRUD operations for the **CareerApplication** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CareerApplications
    * const careerApplications = await prisma.careerApplication.findMany()
    * ```
    */
  get careerApplication(): Prisma.CareerApplicationDelegate<ExtArgs>;

  /**
   * `prisma.foirAssessment`: Exposes CRUD operations for the **FoirAssessment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FoirAssessments
    * const foirAssessments = await prisma.foirAssessment.findMany()
    * ```
    */
  get foirAssessment(): Prisma.FoirAssessmentDelegate<ExtArgs>;
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "connector" | "hierarchyMapping" | "connectorStatusHistory" | "connectorPerformance" | "commissionRule" | "commissionTransaction" | "payoutHistory" | "payoutSlab" | "salesManager" | "routingHistory" | "careerApplication" | "foirAssessment"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Connector: {
        payload: Prisma.$ConnectorPayload<ExtArgs>
        fields: Prisma.ConnectorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConnectorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConnectorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectorPayload>
          }
          findFirst: {
            args: Prisma.ConnectorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConnectorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectorPayload>
          }
          findMany: {
            args: Prisma.ConnectorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectorPayload>[]
          }
          create: {
            args: Prisma.ConnectorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectorPayload>
          }
          createMany: {
            args: Prisma.ConnectorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ConnectorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectorPayload>
          }
          update: {
            args: Prisma.ConnectorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectorPayload>
          }
          deleteMany: {
            args: Prisma.ConnectorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConnectorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ConnectorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectorPayload>
          }
          aggregate: {
            args: Prisma.ConnectorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConnector>
          }
          groupBy: {
            args: Prisma.ConnectorGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConnectorGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConnectorCountArgs<ExtArgs>
            result: $Utils.Optional<ConnectorCountAggregateOutputType> | number
          }
        }
      }
      HierarchyMapping: {
        payload: Prisma.$HierarchyMappingPayload<ExtArgs>
        fields: Prisma.HierarchyMappingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HierarchyMappingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HierarchyMappingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HierarchyMappingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HierarchyMappingPayload>
          }
          findFirst: {
            args: Prisma.HierarchyMappingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HierarchyMappingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HierarchyMappingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HierarchyMappingPayload>
          }
          findMany: {
            args: Prisma.HierarchyMappingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HierarchyMappingPayload>[]
          }
          create: {
            args: Prisma.HierarchyMappingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HierarchyMappingPayload>
          }
          createMany: {
            args: Prisma.HierarchyMappingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.HierarchyMappingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HierarchyMappingPayload>
          }
          update: {
            args: Prisma.HierarchyMappingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HierarchyMappingPayload>
          }
          deleteMany: {
            args: Prisma.HierarchyMappingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HierarchyMappingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.HierarchyMappingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HierarchyMappingPayload>
          }
          aggregate: {
            args: Prisma.HierarchyMappingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHierarchyMapping>
          }
          groupBy: {
            args: Prisma.HierarchyMappingGroupByArgs<ExtArgs>
            result: $Utils.Optional<HierarchyMappingGroupByOutputType>[]
          }
          count: {
            args: Prisma.HierarchyMappingCountArgs<ExtArgs>
            result: $Utils.Optional<HierarchyMappingCountAggregateOutputType> | number
          }
        }
      }
      ConnectorStatusHistory: {
        payload: Prisma.$ConnectorStatusHistoryPayload<ExtArgs>
        fields: Prisma.ConnectorStatusHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConnectorStatusHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectorStatusHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConnectorStatusHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectorStatusHistoryPayload>
          }
          findFirst: {
            args: Prisma.ConnectorStatusHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectorStatusHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConnectorStatusHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectorStatusHistoryPayload>
          }
          findMany: {
            args: Prisma.ConnectorStatusHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectorStatusHistoryPayload>[]
          }
          create: {
            args: Prisma.ConnectorStatusHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectorStatusHistoryPayload>
          }
          createMany: {
            args: Prisma.ConnectorStatusHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ConnectorStatusHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectorStatusHistoryPayload>
          }
          update: {
            args: Prisma.ConnectorStatusHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectorStatusHistoryPayload>
          }
          deleteMany: {
            args: Prisma.ConnectorStatusHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConnectorStatusHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ConnectorStatusHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectorStatusHistoryPayload>
          }
          aggregate: {
            args: Prisma.ConnectorStatusHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConnectorStatusHistory>
          }
          groupBy: {
            args: Prisma.ConnectorStatusHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConnectorStatusHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConnectorStatusHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<ConnectorStatusHistoryCountAggregateOutputType> | number
          }
        }
      }
      ConnectorPerformance: {
        payload: Prisma.$ConnectorPerformancePayload<ExtArgs>
        fields: Prisma.ConnectorPerformanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConnectorPerformanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectorPerformancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConnectorPerformanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectorPerformancePayload>
          }
          findFirst: {
            args: Prisma.ConnectorPerformanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectorPerformancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConnectorPerformanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectorPerformancePayload>
          }
          findMany: {
            args: Prisma.ConnectorPerformanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectorPerformancePayload>[]
          }
          create: {
            args: Prisma.ConnectorPerformanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectorPerformancePayload>
          }
          createMany: {
            args: Prisma.ConnectorPerformanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ConnectorPerformanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectorPerformancePayload>
          }
          update: {
            args: Prisma.ConnectorPerformanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectorPerformancePayload>
          }
          deleteMany: {
            args: Prisma.ConnectorPerformanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConnectorPerformanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ConnectorPerformanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectorPerformancePayload>
          }
          aggregate: {
            args: Prisma.ConnectorPerformanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConnectorPerformance>
          }
          groupBy: {
            args: Prisma.ConnectorPerformanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConnectorPerformanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConnectorPerformanceCountArgs<ExtArgs>
            result: $Utils.Optional<ConnectorPerformanceCountAggregateOutputType> | number
          }
        }
      }
      CommissionRule: {
        payload: Prisma.$CommissionRulePayload<ExtArgs>
        fields: Prisma.CommissionRuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommissionRuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionRulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommissionRuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionRulePayload>
          }
          findFirst: {
            args: Prisma.CommissionRuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionRulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommissionRuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionRulePayload>
          }
          findMany: {
            args: Prisma.CommissionRuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionRulePayload>[]
          }
          create: {
            args: Prisma.CommissionRuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionRulePayload>
          }
          createMany: {
            args: Prisma.CommissionRuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CommissionRuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionRulePayload>
          }
          update: {
            args: Prisma.CommissionRuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionRulePayload>
          }
          deleteMany: {
            args: Prisma.CommissionRuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommissionRuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CommissionRuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionRulePayload>
          }
          aggregate: {
            args: Prisma.CommissionRuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCommissionRule>
          }
          groupBy: {
            args: Prisma.CommissionRuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommissionRuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommissionRuleCountArgs<ExtArgs>
            result: $Utils.Optional<CommissionRuleCountAggregateOutputType> | number
          }
        }
      }
      CommissionTransaction: {
        payload: Prisma.$CommissionTransactionPayload<ExtArgs>
        fields: Prisma.CommissionTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommissionTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommissionTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionTransactionPayload>
          }
          findFirst: {
            args: Prisma.CommissionTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommissionTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionTransactionPayload>
          }
          findMany: {
            args: Prisma.CommissionTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionTransactionPayload>[]
          }
          create: {
            args: Prisma.CommissionTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionTransactionPayload>
          }
          createMany: {
            args: Prisma.CommissionTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CommissionTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionTransactionPayload>
          }
          update: {
            args: Prisma.CommissionTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionTransactionPayload>
          }
          deleteMany: {
            args: Prisma.CommissionTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommissionTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CommissionTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionTransactionPayload>
          }
          aggregate: {
            args: Prisma.CommissionTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCommissionTransaction>
          }
          groupBy: {
            args: Prisma.CommissionTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommissionTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommissionTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<CommissionTransactionCountAggregateOutputType> | number
          }
        }
      }
      PayoutHistory: {
        payload: Prisma.$PayoutHistoryPayload<ExtArgs>
        fields: Prisma.PayoutHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PayoutHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PayoutHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutHistoryPayload>
          }
          findFirst: {
            args: Prisma.PayoutHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PayoutHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutHistoryPayload>
          }
          findMany: {
            args: Prisma.PayoutHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutHistoryPayload>[]
          }
          create: {
            args: Prisma.PayoutHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutHistoryPayload>
          }
          createMany: {
            args: Prisma.PayoutHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PayoutHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutHistoryPayload>
          }
          update: {
            args: Prisma.PayoutHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutHistoryPayload>
          }
          deleteMany: {
            args: Prisma.PayoutHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PayoutHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PayoutHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutHistoryPayload>
          }
          aggregate: {
            args: Prisma.PayoutHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayoutHistory>
          }
          groupBy: {
            args: Prisma.PayoutHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<PayoutHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.PayoutHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<PayoutHistoryCountAggregateOutputType> | number
          }
        }
      }
      PayoutSlab: {
        payload: Prisma.$PayoutSlabPayload<ExtArgs>
        fields: Prisma.PayoutSlabFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PayoutSlabFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutSlabPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PayoutSlabFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutSlabPayload>
          }
          findFirst: {
            args: Prisma.PayoutSlabFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutSlabPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PayoutSlabFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutSlabPayload>
          }
          findMany: {
            args: Prisma.PayoutSlabFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutSlabPayload>[]
          }
          create: {
            args: Prisma.PayoutSlabCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutSlabPayload>
          }
          createMany: {
            args: Prisma.PayoutSlabCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PayoutSlabDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutSlabPayload>
          }
          update: {
            args: Prisma.PayoutSlabUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutSlabPayload>
          }
          deleteMany: {
            args: Prisma.PayoutSlabDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PayoutSlabUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PayoutSlabUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutSlabPayload>
          }
          aggregate: {
            args: Prisma.PayoutSlabAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayoutSlab>
          }
          groupBy: {
            args: Prisma.PayoutSlabGroupByArgs<ExtArgs>
            result: $Utils.Optional<PayoutSlabGroupByOutputType>[]
          }
          count: {
            args: Prisma.PayoutSlabCountArgs<ExtArgs>
            result: $Utils.Optional<PayoutSlabCountAggregateOutputType> | number
          }
        }
      }
      SalesManager: {
        payload: Prisma.$SalesManagerPayload<ExtArgs>
        fields: Prisma.SalesManagerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SalesManagerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesManagerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SalesManagerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesManagerPayload>
          }
          findFirst: {
            args: Prisma.SalesManagerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesManagerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SalesManagerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesManagerPayload>
          }
          findMany: {
            args: Prisma.SalesManagerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesManagerPayload>[]
          }
          create: {
            args: Prisma.SalesManagerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesManagerPayload>
          }
          createMany: {
            args: Prisma.SalesManagerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SalesManagerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesManagerPayload>
          }
          update: {
            args: Prisma.SalesManagerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesManagerPayload>
          }
          deleteMany: {
            args: Prisma.SalesManagerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SalesManagerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SalesManagerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesManagerPayload>
          }
          aggregate: {
            args: Prisma.SalesManagerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSalesManager>
          }
          groupBy: {
            args: Prisma.SalesManagerGroupByArgs<ExtArgs>
            result: $Utils.Optional<SalesManagerGroupByOutputType>[]
          }
          count: {
            args: Prisma.SalesManagerCountArgs<ExtArgs>
            result: $Utils.Optional<SalesManagerCountAggregateOutputType> | number
          }
        }
      }
      RoutingHistory: {
        payload: Prisma.$RoutingHistoryPayload<ExtArgs>
        fields: Prisma.RoutingHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoutingHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoutingHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingHistoryPayload>
          }
          findFirst: {
            args: Prisma.RoutingHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoutingHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingHistoryPayload>
          }
          findMany: {
            args: Prisma.RoutingHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingHistoryPayload>[]
          }
          create: {
            args: Prisma.RoutingHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingHistoryPayload>
          }
          createMany: {
            args: Prisma.RoutingHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RoutingHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingHistoryPayload>
          }
          update: {
            args: Prisma.RoutingHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingHistoryPayload>
          }
          deleteMany: {
            args: Prisma.RoutingHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoutingHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoutingHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoutingHistoryPayload>
          }
          aggregate: {
            args: Prisma.RoutingHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoutingHistory>
          }
          groupBy: {
            args: Prisma.RoutingHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoutingHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoutingHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<RoutingHistoryCountAggregateOutputType> | number
          }
        }
      }
      CareerApplication: {
        payload: Prisma.$CareerApplicationPayload<ExtArgs>
        fields: Prisma.CareerApplicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CareerApplicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerApplicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CareerApplicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerApplicationPayload>
          }
          findFirst: {
            args: Prisma.CareerApplicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerApplicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CareerApplicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerApplicationPayload>
          }
          findMany: {
            args: Prisma.CareerApplicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerApplicationPayload>[]
          }
          create: {
            args: Prisma.CareerApplicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerApplicationPayload>
          }
          createMany: {
            args: Prisma.CareerApplicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CareerApplicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerApplicationPayload>
          }
          update: {
            args: Prisma.CareerApplicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerApplicationPayload>
          }
          deleteMany: {
            args: Prisma.CareerApplicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CareerApplicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CareerApplicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerApplicationPayload>
          }
          aggregate: {
            args: Prisma.CareerApplicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCareerApplication>
          }
          groupBy: {
            args: Prisma.CareerApplicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<CareerApplicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.CareerApplicationCountArgs<ExtArgs>
            result: $Utils.Optional<CareerApplicationCountAggregateOutputType> | number
          }
        }
      }
      FoirAssessment: {
        payload: Prisma.$FoirAssessmentPayload<ExtArgs>
        fields: Prisma.FoirAssessmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FoirAssessmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoirAssessmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FoirAssessmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoirAssessmentPayload>
          }
          findFirst: {
            args: Prisma.FoirAssessmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoirAssessmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FoirAssessmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoirAssessmentPayload>
          }
          findMany: {
            args: Prisma.FoirAssessmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoirAssessmentPayload>[]
          }
          create: {
            args: Prisma.FoirAssessmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoirAssessmentPayload>
          }
          createMany: {
            args: Prisma.FoirAssessmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FoirAssessmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoirAssessmentPayload>
          }
          update: {
            args: Prisma.FoirAssessmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoirAssessmentPayload>
          }
          deleteMany: {
            args: Prisma.FoirAssessmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FoirAssessmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FoirAssessmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoirAssessmentPayload>
          }
          aggregate: {
            args: Prisma.FoirAssessmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFoirAssessment>
          }
          groupBy: {
            args: Prisma.FoirAssessmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<FoirAssessmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.FoirAssessmentCountArgs<ExtArgs>
            result: $Utils.Optional<FoirAssessmentCountAggregateOutputType> | number
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
   * Count Type ConnectorCountOutputType
   */

  export type ConnectorCountOutputType = {
    hierarchies: number
    managed: number
    statusHistory: number
    payoutSlabs: number
    commissions: number
  }

  export type ConnectorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hierarchies?: boolean | ConnectorCountOutputTypeCountHierarchiesArgs
    managed?: boolean | ConnectorCountOutputTypeCountManagedArgs
    statusHistory?: boolean | ConnectorCountOutputTypeCountStatusHistoryArgs
    payoutSlabs?: boolean | ConnectorCountOutputTypeCountPayoutSlabsArgs
    commissions?: boolean | ConnectorCountOutputTypeCountCommissionsArgs
  }

  // Custom InputTypes
  /**
   * ConnectorCountOutputType without action
   */
  export type ConnectorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectorCountOutputType
     */
    select?: ConnectorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConnectorCountOutputType without action
   */
  export type ConnectorCountOutputTypeCountHierarchiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HierarchyMappingWhereInput
  }

  /**
   * ConnectorCountOutputType without action
   */
  export type ConnectorCountOutputTypeCountManagedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HierarchyMappingWhereInput
  }

  /**
   * ConnectorCountOutputType without action
   */
  export type ConnectorCountOutputTypeCountStatusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConnectorStatusHistoryWhereInput
  }

  /**
   * ConnectorCountOutputType without action
   */
  export type ConnectorCountOutputTypeCountPayoutSlabsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PayoutSlabWhereInput
  }

  /**
   * ConnectorCountOutputType without action
   */
  export type ConnectorCountOutputTypeCountCommissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommissionTransactionWhereInput
  }


  /**
   * Count Type CommissionTransactionCountOutputType
   */

  export type CommissionTransactionCountOutputType = {
    payoutHistory: number
  }

  export type CommissionTransactionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payoutHistory?: boolean | CommissionTransactionCountOutputTypeCountPayoutHistoryArgs
  }

  // Custom InputTypes
  /**
   * CommissionTransactionCountOutputType without action
   */
  export type CommissionTransactionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommissionTransactionCountOutputType
     */
    select?: CommissionTransactionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CommissionTransactionCountOutputType without action
   */
  export type CommissionTransactionCountOutputTypeCountPayoutHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PayoutHistoryWhereInput
  }


  /**
   * Count Type SalesManagerCountOutputType
   */

  export type SalesManagerCountOutputType = {
    routingHistory: number
  }

  export type SalesManagerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    routingHistory?: boolean | SalesManagerCountOutputTypeCountRoutingHistoryArgs
  }

  // Custom InputTypes
  /**
   * SalesManagerCountOutputType without action
   */
  export type SalesManagerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesManagerCountOutputType
     */
    select?: SalesManagerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SalesManagerCountOutputType without action
   */
  export type SalesManagerCountOutputTypeCountRoutingHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoutingHistoryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Connector
   */

  export type AggregateConnector = {
    _count: ConnectorCountAggregateOutputType | null
    _min: ConnectorMinAggregateOutputType | null
    _max: ConnectorMaxAggregateOutputType | null
  }

  export type ConnectorMinAggregateOutputType = {
    id: string | null
    userId: string | null
    firstName: string | null
    lastName: string | null
    phone: string | null
    email: string | null
    region: string | null
    status: string | null
    platformRole: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
  }

  export type ConnectorMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    firstName: string | null
    lastName: string | null
    phone: string | null
    email: string | null
    region: string | null
    status: string | null
    platformRole: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
  }

  export type ConnectorCountAggregateOutputType = {
    id: number
    userId: number
    firstName: number
    lastName: number
    phone: number
    email: number
    region: number
    status: number
    platformRole: number
    createdAt: number
    updatedAt: number
    createdBy: number
    updatedBy: number
    _all: number
  }


  export type ConnectorMinAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    phone?: true
    email?: true
    region?: true
    status?: true
    platformRole?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
  }

  export type ConnectorMaxAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    phone?: true
    email?: true
    region?: true
    status?: true
    platformRole?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
  }

  export type ConnectorCountAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    phone?: true
    email?: true
    region?: true
    status?: true
    platformRole?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
    _all?: true
  }

  export type ConnectorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Connector to aggregate.
     */
    where?: ConnectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Connectors to fetch.
     */
    orderBy?: ConnectorOrderByWithRelationInput | ConnectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConnectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Connectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Connectors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Connectors
    **/
    _count?: true | ConnectorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConnectorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConnectorMaxAggregateInputType
  }

  export type GetConnectorAggregateType<T extends ConnectorAggregateArgs> = {
        [P in keyof T & keyof AggregateConnector]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConnector[P]>
      : GetScalarType<T[P], AggregateConnector[P]>
  }




  export type ConnectorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConnectorWhereInput
    orderBy?: ConnectorOrderByWithAggregationInput | ConnectorOrderByWithAggregationInput[]
    by: ConnectorScalarFieldEnum[] | ConnectorScalarFieldEnum
    having?: ConnectorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConnectorCountAggregateInputType | true
    _min?: ConnectorMinAggregateInputType
    _max?: ConnectorMaxAggregateInputType
  }

  export type ConnectorGroupByOutputType = {
    id: string
    userId: string
    firstName: string
    lastName: string
    phone: string | null
    email: string | null
    region: string | null
    status: string
    platformRole: string | null
    createdAt: Date
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
    _count: ConnectorCountAggregateOutputType | null
    _min: ConnectorMinAggregateOutputType | null
    _max: ConnectorMaxAggregateOutputType | null
  }

  type GetConnectorGroupByPayload<T extends ConnectorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConnectorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConnectorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConnectorGroupByOutputType[P]>
            : GetScalarType<T[P], ConnectorGroupByOutputType[P]>
        }
      >
    >


  export type ConnectorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    email?: boolean
    region?: boolean
    status?: boolean
    platformRole?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    hierarchies?: boolean | Connector$hierarchiesArgs<ExtArgs>
    managed?: boolean | Connector$managedArgs<ExtArgs>
    statusHistory?: boolean | Connector$statusHistoryArgs<ExtArgs>
    performance?: boolean | Connector$performanceArgs<ExtArgs>
    payoutSlabs?: boolean | Connector$payoutSlabsArgs<ExtArgs>
    commissions?: boolean | Connector$commissionsArgs<ExtArgs>
    _count?: boolean | ConnectorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["connector"]>


  export type ConnectorSelectScalar = {
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    email?: boolean
    region?: boolean
    status?: boolean
    platformRole?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
  }

  export type ConnectorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hierarchies?: boolean | Connector$hierarchiesArgs<ExtArgs>
    managed?: boolean | Connector$managedArgs<ExtArgs>
    statusHistory?: boolean | Connector$statusHistoryArgs<ExtArgs>
    performance?: boolean | Connector$performanceArgs<ExtArgs>
    payoutSlabs?: boolean | Connector$payoutSlabsArgs<ExtArgs>
    commissions?: boolean | Connector$commissionsArgs<ExtArgs>
    _count?: boolean | ConnectorCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ConnectorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Connector"
    objects: {
      hierarchies: Prisma.$HierarchyMappingPayload<ExtArgs>[]
      managed: Prisma.$HierarchyMappingPayload<ExtArgs>[]
      statusHistory: Prisma.$ConnectorStatusHistoryPayload<ExtArgs>[]
      performance: Prisma.$ConnectorPerformancePayload<ExtArgs> | null
      payoutSlabs: Prisma.$PayoutSlabPayload<ExtArgs>[]
      commissions: Prisma.$CommissionTransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      firstName: string
      lastName: string
      phone: string | null
      email: string | null
      region: string | null
      status: string
      platformRole: string | null
      createdAt: Date
      updatedAt: Date | null
      createdBy: string | null
      updatedBy: string | null
    }, ExtArgs["result"]["connector"]>
    composites: {}
  }

  type ConnectorGetPayload<S extends boolean | null | undefined | ConnectorDefaultArgs> = $Result.GetResult<Prisma.$ConnectorPayload, S>

  type ConnectorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ConnectorFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ConnectorCountAggregateInputType | true
    }

  export interface ConnectorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Connector'], meta: { name: 'Connector' } }
    /**
     * Find zero or one Connector that matches the filter.
     * @param {ConnectorFindUniqueArgs} args - Arguments to find a Connector
     * @example
     * // Get one Connector
     * const connector = await prisma.connector.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConnectorFindUniqueArgs>(args: SelectSubset<T, ConnectorFindUniqueArgs<ExtArgs>>): Prisma__ConnectorClient<$Result.GetResult<Prisma.$ConnectorPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Connector that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ConnectorFindUniqueOrThrowArgs} args - Arguments to find a Connector
     * @example
     * // Get one Connector
     * const connector = await prisma.connector.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConnectorFindUniqueOrThrowArgs>(args: SelectSubset<T, ConnectorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConnectorClient<$Result.GetResult<Prisma.$ConnectorPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Connector that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectorFindFirstArgs} args - Arguments to find a Connector
     * @example
     * // Get one Connector
     * const connector = await prisma.connector.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConnectorFindFirstArgs>(args?: SelectSubset<T, ConnectorFindFirstArgs<ExtArgs>>): Prisma__ConnectorClient<$Result.GetResult<Prisma.$ConnectorPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Connector that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectorFindFirstOrThrowArgs} args - Arguments to find a Connector
     * @example
     * // Get one Connector
     * const connector = await prisma.connector.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConnectorFindFirstOrThrowArgs>(args?: SelectSubset<T, ConnectorFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConnectorClient<$Result.GetResult<Prisma.$ConnectorPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Connectors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Connectors
     * const connectors = await prisma.connector.findMany()
     * 
     * // Get first 10 Connectors
     * const connectors = await prisma.connector.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const connectorWithIdOnly = await prisma.connector.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConnectorFindManyArgs>(args?: SelectSubset<T, ConnectorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectorPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Connector.
     * @param {ConnectorCreateArgs} args - Arguments to create a Connector.
     * @example
     * // Create one Connector
     * const Connector = await prisma.connector.create({
     *   data: {
     *     // ... data to create a Connector
     *   }
     * })
     * 
     */
    create<T extends ConnectorCreateArgs>(args: SelectSubset<T, ConnectorCreateArgs<ExtArgs>>): Prisma__ConnectorClient<$Result.GetResult<Prisma.$ConnectorPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Connectors.
     * @param {ConnectorCreateManyArgs} args - Arguments to create many Connectors.
     * @example
     * // Create many Connectors
     * const connector = await prisma.connector.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConnectorCreateManyArgs>(args?: SelectSubset<T, ConnectorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Connector.
     * @param {ConnectorDeleteArgs} args - Arguments to delete one Connector.
     * @example
     * // Delete one Connector
     * const Connector = await prisma.connector.delete({
     *   where: {
     *     // ... filter to delete one Connector
     *   }
     * })
     * 
     */
    delete<T extends ConnectorDeleteArgs>(args: SelectSubset<T, ConnectorDeleteArgs<ExtArgs>>): Prisma__ConnectorClient<$Result.GetResult<Prisma.$ConnectorPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Connector.
     * @param {ConnectorUpdateArgs} args - Arguments to update one Connector.
     * @example
     * // Update one Connector
     * const connector = await prisma.connector.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConnectorUpdateArgs>(args: SelectSubset<T, ConnectorUpdateArgs<ExtArgs>>): Prisma__ConnectorClient<$Result.GetResult<Prisma.$ConnectorPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Connectors.
     * @param {ConnectorDeleteManyArgs} args - Arguments to filter Connectors to delete.
     * @example
     * // Delete a few Connectors
     * const { count } = await prisma.connector.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConnectorDeleteManyArgs>(args?: SelectSubset<T, ConnectorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Connectors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Connectors
     * const connector = await prisma.connector.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConnectorUpdateManyArgs>(args: SelectSubset<T, ConnectorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Connector.
     * @param {ConnectorUpsertArgs} args - Arguments to update or create a Connector.
     * @example
     * // Update or create a Connector
     * const connector = await prisma.connector.upsert({
     *   create: {
     *     // ... data to create a Connector
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Connector we want to update
     *   }
     * })
     */
    upsert<T extends ConnectorUpsertArgs>(args: SelectSubset<T, ConnectorUpsertArgs<ExtArgs>>): Prisma__ConnectorClient<$Result.GetResult<Prisma.$ConnectorPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Connectors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectorCountArgs} args - Arguments to filter Connectors to count.
     * @example
     * // Count the number of Connectors
     * const count = await prisma.connector.count({
     *   where: {
     *     // ... the filter for the Connectors we want to count
     *   }
     * })
    **/
    count<T extends ConnectorCountArgs>(
      args?: Subset<T, ConnectorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConnectorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Connector.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ConnectorAggregateArgs>(args: Subset<T, ConnectorAggregateArgs>): Prisma.PrismaPromise<GetConnectorAggregateType<T>>

    /**
     * Group by Connector.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectorGroupByArgs} args - Group by arguments.
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
      T extends ConnectorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConnectorGroupByArgs['orderBy'] }
        : { orderBy?: ConnectorGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ConnectorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConnectorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Connector model
   */
  readonly fields: ConnectorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Connector.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConnectorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    hierarchies<T extends Connector$hierarchiesArgs<ExtArgs> = {}>(args?: Subset<T, Connector$hierarchiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HierarchyMappingPayload<ExtArgs>, T, "findMany"> | Null>
    managed<T extends Connector$managedArgs<ExtArgs> = {}>(args?: Subset<T, Connector$managedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HierarchyMappingPayload<ExtArgs>, T, "findMany"> | Null>
    statusHistory<T extends Connector$statusHistoryArgs<ExtArgs> = {}>(args?: Subset<T, Connector$statusHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectorStatusHistoryPayload<ExtArgs>, T, "findMany"> | Null>
    performance<T extends Connector$performanceArgs<ExtArgs> = {}>(args?: Subset<T, Connector$performanceArgs<ExtArgs>>): Prisma__ConnectorPerformanceClient<$Result.GetResult<Prisma.$ConnectorPerformancePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    payoutSlabs<T extends Connector$payoutSlabsArgs<ExtArgs> = {}>(args?: Subset<T, Connector$payoutSlabsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayoutSlabPayload<ExtArgs>, T, "findMany"> | Null>
    commissions<T extends Connector$commissionsArgs<ExtArgs> = {}>(args?: Subset<T, Connector$commissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommissionTransactionPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Connector model
   */ 
  interface ConnectorFieldRefs {
    readonly id: FieldRef<"Connector", 'String'>
    readonly userId: FieldRef<"Connector", 'String'>
    readonly firstName: FieldRef<"Connector", 'String'>
    readonly lastName: FieldRef<"Connector", 'String'>
    readonly phone: FieldRef<"Connector", 'String'>
    readonly email: FieldRef<"Connector", 'String'>
    readonly region: FieldRef<"Connector", 'String'>
    readonly status: FieldRef<"Connector", 'String'>
    readonly platformRole: FieldRef<"Connector", 'String'>
    readonly createdAt: FieldRef<"Connector", 'DateTime'>
    readonly updatedAt: FieldRef<"Connector", 'DateTime'>
    readonly createdBy: FieldRef<"Connector", 'String'>
    readonly updatedBy: FieldRef<"Connector", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Connector findUnique
   */
  export type ConnectorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connector
     */
    select?: ConnectorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorInclude<ExtArgs> | null
    /**
     * Filter, which Connector to fetch.
     */
    where: ConnectorWhereUniqueInput
  }

  /**
   * Connector findUniqueOrThrow
   */
  export type ConnectorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connector
     */
    select?: ConnectorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorInclude<ExtArgs> | null
    /**
     * Filter, which Connector to fetch.
     */
    where: ConnectorWhereUniqueInput
  }

  /**
   * Connector findFirst
   */
  export type ConnectorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connector
     */
    select?: ConnectorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorInclude<ExtArgs> | null
    /**
     * Filter, which Connector to fetch.
     */
    where?: ConnectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Connectors to fetch.
     */
    orderBy?: ConnectorOrderByWithRelationInput | ConnectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Connectors.
     */
    cursor?: ConnectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Connectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Connectors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Connectors.
     */
    distinct?: ConnectorScalarFieldEnum | ConnectorScalarFieldEnum[]
  }

  /**
   * Connector findFirstOrThrow
   */
  export type ConnectorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connector
     */
    select?: ConnectorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorInclude<ExtArgs> | null
    /**
     * Filter, which Connector to fetch.
     */
    where?: ConnectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Connectors to fetch.
     */
    orderBy?: ConnectorOrderByWithRelationInput | ConnectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Connectors.
     */
    cursor?: ConnectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Connectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Connectors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Connectors.
     */
    distinct?: ConnectorScalarFieldEnum | ConnectorScalarFieldEnum[]
  }

  /**
   * Connector findMany
   */
  export type ConnectorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connector
     */
    select?: ConnectorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorInclude<ExtArgs> | null
    /**
     * Filter, which Connectors to fetch.
     */
    where?: ConnectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Connectors to fetch.
     */
    orderBy?: ConnectorOrderByWithRelationInput | ConnectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Connectors.
     */
    cursor?: ConnectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Connectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Connectors.
     */
    skip?: number
    distinct?: ConnectorScalarFieldEnum | ConnectorScalarFieldEnum[]
  }

  /**
   * Connector create
   */
  export type ConnectorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connector
     */
    select?: ConnectorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorInclude<ExtArgs> | null
    /**
     * The data needed to create a Connector.
     */
    data: XOR<ConnectorCreateInput, ConnectorUncheckedCreateInput>
  }

  /**
   * Connector createMany
   */
  export type ConnectorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Connectors.
     */
    data: ConnectorCreateManyInput | ConnectorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Connector update
   */
  export type ConnectorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connector
     */
    select?: ConnectorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorInclude<ExtArgs> | null
    /**
     * The data needed to update a Connector.
     */
    data: XOR<ConnectorUpdateInput, ConnectorUncheckedUpdateInput>
    /**
     * Choose, which Connector to update.
     */
    where: ConnectorWhereUniqueInput
  }

  /**
   * Connector updateMany
   */
  export type ConnectorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Connectors.
     */
    data: XOR<ConnectorUpdateManyMutationInput, ConnectorUncheckedUpdateManyInput>
    /**
     * Filter which Connectors to update
     */
    where?: ConnectorWhereInput
  }

  /**
   * Connector upsert
   */
  export type ConnectorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connector
     */
    select?: ConnectorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorInclude<ExtArgs> | null
    /**
     * The filter to search for the Connector to update in case it exists.
     */
    where: ConnectorWhereUniqueInput
    /**
     * In case the Connector found by the `where` argument doesn't exist, create a new Connector with this data.
     */
    create: XOR<ConnectorCreateInput, ConnectorUncheckedCreateInput>
    /**
     * In case the Connector was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConnectorUpdateInput, ConnectorUncheckedUpdateInput>
  }

  /**
   * Connector delete
   */
  export type ConnectorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connector
     */
    select?: ConnectorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorInclude<ExtArgs> | null
    /**
     * Filter which Connector to delete.
     */
    where: ConnectorWhereUniqueInput
  }

  /**
   * Connector deleteMany
   */
  export type ConnectorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Connectors to delete
     */
    where?: ConnectorWhereInput
  }

  /**
   * Connector.hierarchies
   */
  export type Connector$hierarchiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HierarchyMapping
     */
    select?: HierarchyMappingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HierarchyMappingInclude<ExtArgs> | null
    where?: HierarchyMappingWhereInput
    orderBy?: HierarchyMappingOrderByWithRelationInput | HierarchyMappingOrderByWithRelationInput[]
    cursor?: HierarchyMappingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HierarchyMappingScalarFieldEnum | HierarchyMappingScalarFieldEnum[]
  }

  /**
   * Connector.managed
   */
  export type Connector$managedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HierarchyMapping
     */
    select?: HierarchyMappingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HierarchyMappingInclude<ExtArgs> | null
    where?: HierarchyMappingWhereInput
    orderBy?: HierarchyMappingOrderByWithRelationInput | HierarchyMappingOrderByWithRelationInput[]
    cursor?: HierarchyMappingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HierarchyMappingScalarFieldEnum | HierarchyMappingScalarFieldEnum[]
  }

  /**
   * Connector.statusHistory
   */
  export type Connector$statusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectorStatusHistory
     */
    select?: ConnectorStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorStatusHistoryInclude<ExtArgs> | null
    where?: ConnectorStatusHistoryWhereInput
    orderBy?: ConnectorStatusHistoryOrderByWithRelationInput | ConnectorStatusHistoryOrderByWithRelationInput[]
    cursor?: ConnectorStatusHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConnectorStatusHistoryScalarFieldEnum | ConnectorStatusHistoryScalarFieldEnum[]
  }

  /**
   * Connector.performance
   */
  export type Connector$performanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectorPerformance
     */
    select?: ConnectorPerformanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorPerformanceInclude<ExtArgs> | null
    where?: ConnectorPerformanceWhereInput
  }

  /**
   * Connector.payoutSlabs
   */
  export type Connector$payoutSlabsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutSlab
     */
    select?: PayoutSlabSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutSlabInclude<ExtArgs> | null
    where?: PayoutSlabWhereInput
    orderBy?: PayoutSlabOrderByWithRelationInput | PayoutSlabOrderByWithRelationInput[]
    cursor?: PayoutSlabWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PayoutSlabScalarFieldEnum | PayoutSlabScalarFieldEnum[]
  }

  /**
   * Connector.commissions
   */
  export type Connector$commissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommissionTransaction
     */
    select?: CommissionTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionTransactionInclude<ExtArgs> | null
    where?: CommissionTransactionWhereInput
    orderBy?: CommissionTransactionOrderByWithRelationInput | CommissionTransactionOrderByWithRelationInput[]
    cursor?: CommissionTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommissionTransactionScalarFieldEnum | CommissionTransactionScalarFieldEnum[]
  }

  /**
   * Connector without action
   */
  export type ConnectorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connector
     */
    select?: ConnectorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorInclude<ExtArgs> | null
  }


  /**
   * Model HierarchyMapping
   */

  export type AggregateHierarchyMapping = {
    _count: HierarchyMappingCountAggregateOutputType | null
    _min: HierarchyMappingMinAggregateOutputType | null
    _max: HierarchyMappingMaxAggregateOutputType | null
  }

  export type HierarchyMappingMinAggregateOutputType = {
    id: string | null
    connectorId: string | null
    managerId: string | null
    role: string | null
    assignedAt: Date | null
    assignedBy: string | null
  }

  export type HierarchyMappingMaxAggregateOutputType = {
    id: string | null
    connectorId: string | null
    managerId: string | null
    role: string | null
    assignedAt: Date | null
    assignedBy: string | null
  }

  export type HierarchyMappingCountAggregateOutputType = {
    id: number
    connectorId: number
    managerId: number
    role: number
    assignedAt: number
    assignedBy: number
    _all: number
  }


  export type HierarchyMappingMinAggregateInputType = {
    id?: true
    connectorId?: true
    managerId?: true
    role?: true
    assignedAt?: true
    assignedBy?: true
  }

  export type HierarchyMappingMaxAggregateInputType = {
    id?: true
    connectorId?: true
    managerId?: true
    role?: true
    assignedAt?: true
    assignedBy?: true
  }

  export type HierarchyMappingCountAggregateInputType = {
    id?: true
    connectorId?: true
    managerId?: true
    role?: true
    assignedAt?: true
    assignedBy?: true
    _all?: true
  }

  export type HierarchyMappingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HierarchyMapping to aggregate.
     */
    where?: HierarchyMappingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HierarchyMappings to fetch.
     */
    orderBy?: HierarchyMappingOrderByWithRelationInput | HierarchyMappingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HierarchyMappingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HierarchyMappings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HierarchyMappings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HierarchyMappings
    **/
    _count?: true | HierarchyMappingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HierarchyMappingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HierarchyMappingMaxAggregateInputType
  }

  export type GetHierarchyMappingAggregateType<T extends HierarchyMappingAggregateArgs> = {
        [P in keyof T & keyof AggregateHierarchyMapping]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHierarchyMapping[P]>
      : GetScalarType<T[P], AggregateHierarchyMapping[P]>
  }




  export type HierarchyMappingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HierarchyMappingWhereInput
    orderBy?: HierarchyMappingOrderByWithAggregationInput | HierarchyMappingOrderByWithAggregationInput[]
    by: HierarchyMappingScalarFieldEnum[] | HierarchyMappingScalarFieldEnum
    having?: HierarchyMappingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HierarchyMappingCountAggregateInputType | true
    _min?: HierarchyMappingMinAggregateInputType
    _max?: HierarchyMappingMaxAggregateInputType
  }

  export type HierarchyMappingGroupByOutputType = {
    id: string
    connectorId: string | null
    managerId: string | null
    role: string
    assignedAt: Date
    assignedBy: string | null
    _count: HierarchyMappingCountAggregateOutputType | null
    _min: HierarchyMappingMinAggregateOutputType | null
    _max: HierarchyMappingMaxAggregateOutputType | null
  }

  type GetHierarchyMappingGroupByPayload<T extends HierarchyMappingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HierarchyMappingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HierarchyMappingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HierarchyMappingGroupByOutputType[P]>
            : GetScalarType<T[P], HierarchyMappingGroupByOutputType[P]>
        }
      >
    >


  export type HierarchyMappingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    connectorId?: boolean
    managerId?: boolean
    role?: boolean
    assignedAt?: boolean
    assignedBy?: boolean
    connector?: boolean | HierarchyMapping$connectorArgs<ExtArgs>
    manager?: boolean | HierarchyMapping$managerArgs<ExtArgs>
  }, ExtArgs["result"]["hierarchyMapping"]>


  export type HierarchyMappingSelectScalar = {
    id?: boolean
    connectorId?: boolean
    managerId?: boolean
    role?: boolean
    assignedAt?: boolean
    assignedBy?: boolean
  }

  export type HierarchyMappingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connector?: boolean | HierarchyMapping$connectorArgs<ExtArgs>
    manager?: boolean | HierarchyMapping$managerArgs<ExtArgs>
  }

  export type $HierarchyMappingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HierarchyMapping"
    objects: {
      connector: Prisma.$ConnectorPayload<ExtArgs> | null
      manager: Prisma.$ConnectorPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      connectorId: string | null
      managerId: string | null
      role: string
      assignedAt: Date
      assignedBy: string | null
    }, ExtArgs["result"]["hierarchyMapping"]>
    composites: {}
  }

  type HierarchyMappingGetPayload<S extends boolean | null | undefined | HierarchyMappingDefaultArgs> = $Result.GetResult<Prisma.$HierarchyMappingPayload, S>

  type HierarchyMappingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<HierarchyMappingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: HierarchyMappingCountAggregateInputType | true
    }

  export interface HierarchyMappingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HierarchyMapping'], meta: { name: 'HierarchyMapping' } }
    /**
     * Find zero or one HierarchyMapping that matches the filter.
     * @param {HierarchyMappingFindUniqueArgs} args - Arguments to find a HierarchyMapping
     * @example
     * // Get one HierarchyMapping
     * const hierarchyMapping = await prisma.hierarchyMapping.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HierarchyMappingFindUniqueArgs>(args: SelectSubset<T, HierarchyMappingFindUniqueArgs<ExtArgs>>): Prisma__HierarchyMappingClient<$Result.GetResult<Prisma.$HierarchyMappingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one HierarchyMapping that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {HierarchyMappingFindUniqueOrThrowArgs} args - Arguments to find a HierarchyMapping
     * @example
     * // Get one HierarchyMapping
     * const hierarchyMapping = await prisma.hierarchyMapping.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HierarchyMappingFindUniqueOrThrowArgs>(args: SelectSubset<T, HierarchyMappingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HierarchyMappingClient<$Result.GetResult<Prisma.$HierarchyMappingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first HierarchyMapping that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HierarchyMappingFindFirstArgs} args - Arguments to find a HierarchyMapping
     * @example
     * // Get one HierarchyMapping
     * const hierarchyMapping = await prisma.hierarchyMapping.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HierarchyMappingFindFirstArgs>(args?: SelectSubset<T, HierarchyMappingFindFirstArgs<ExtArgs>>): Prisma__HierarchyMappingClient<$Result.GetResult<Prisma.$HierarchyMappingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first HierarchyMapping that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HierarchyMappingFindFirstOrThrowArgs} args - Arguments to find a HierarchyMapping
     * @example
     * // Get one HierarchyMapping
     * const hierarchyMapping = await prisma.hierarchyMapping.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HierarchyMappingFindFirstOrThrowArgs>(args?: SelectSubset<T, HierarchyMappingFindFirstOrThrowArgs<ExtArgs>>): Prisma__HierarchyMappingClient<$Result.GetResult<Prisma.$HierarchyMappingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more HierarchyMappings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HierarchyMappingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HierarchyMappings
     * const hierarchyMappings = await prisma.hierarchyMapping.findMany()
     * 
     * // Get first 10 HierarchyMappings
     * const hierarchyMappings = await prisma.hierarchyMapping.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hierarchyMappingWithIdOnly = await prisma.hierarchyMapping.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HierarchyMappingFindManyArgs>(args?: SelectSubset<T, HierarchyMappingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HierarchyMappingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a HierarchyMapping.
     * @param {HierarchyMappingCreateArgs} args - Arguments to create a HierarchyMapping.
     * @example
     * // Create one HierarchyMapping
     * const HierarchyMapping = await prisma.hierarchyMapping.create({
     *   data: {
     *     // ... data to create a HierarchyMapping
     *   }
     * })
     * 
     */
    create<T extends HierarchyMappingCreateArgs>(args: SelectSubset<T, HierarchyMappingCreateArgs<ExtArgs>>): Prisma__HierarchyMappingClient<$Result.GetResult<Prisma.$HierarchyMappingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many HierarchyMappings.
     * @param {HierarchyMappingCreateManyArgs} args - Arguments to create many HierarchyMappings.
     * @example
     * // Create many HierarchyMappings
     * const hierarchyMapping = await prisma.hierarchyMapping.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HierarchyMappingCreateManyArgs>(args?: SelectSubset<T, HierarchyMappingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a HierarchyMapping.
     * @param {HierarchyMappingDeleteArgs} args - Arguments to delete one HierarchyMapping.
     * @example
     * // Delete one HierarchyMapping
     * const HierarchyMapping = await prisma.hierarchyMapping.delete({
     *   where: {
     *     // ... filter to delete one HierarchyMapping
     *   }
     * })
     * 
     */
    delete<T extends HierarchyMappingDeleteArgs>(args: SelectSubset<T, HierarchyMappingDeleteArgs<ExtArgs>>): Prisma__HierarchyMappingClient<$Result.GetResult<Prisma.$HierarchyMappingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one HierarchyMapping.
     * @param {HierarchyMappingUpdateArgs} args - Arguments to update one HierarchyMapping.
     * @example
     * // Update one HierarchyMapping
     * const hierarchyMapping = await prisma.hierarchyMapping.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HierarchyMappingUpdateArgs>(args: SelectSubset<T, HierarchyMappingUpdateArgs<ExtArgs>>): Prisma__HierarchyMappingClient<$Result.GetResult<Prisma.$HierarchyMappingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more HierarchyMappings.
     * @param {HierarchyMappingDeleteManyArgs} args - Arguments to filter HierarchyMappings to delete.
     * @example
     * // Delete a few HierarchyMappings
     * const { count } = await prisma.hierarchyMapping.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HierarchyMappingDeleteManyArgs>(args?: SelectSubset<T, HierarchyMappingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HierarchyMappings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HierarchyMappingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HierarchyMappings
     * const hierarchyMapping = await prisma.hierarchyMapping.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HierarchyMappingUpdateManyArgs>(args: SelectSubset<T, HierarchyMappingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one HierarchyMapping.
     * @param {HierarchyMappingUpsertArgs} args - Arguments to update or create a HierarchyMapping.
     * @example
     * // Update or create a HierarchyMapping
     * const hierarchyMapping = await prisma.hierarchyMapping.upsert({
     *   create: {
     *     // ... data to create a HierarchyMapping
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HierarchyMapping we want to update
     *   }
     * })
     */
    upsert<T extends HierarchyMappingUpsertArgs>(args: SelectSubset<T, HierarchyMappingUpsertArgs<ExtArgs>>): Prisma__HierarchyMappingClient<$Result.GetResult<Prisma.$HierarchyMappingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of HierarchyMappings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HierarchyMappingCountArgs} args - Arguments to filter HierarchyMappings to count.
     * @example
     * // Count the number of HierarchyMappings
     * const count = await prisma.hierarchyMapping.count({
     *   where: {
     *     // ... the filter for the HierarchyMappings we want to count
     *   }
     * })
    **/
    count<T extends HierarchyMappingCountArgs>(
      args?: Subset<T, HierarchyMappingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HierarchyMappingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HierarchyMapping.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HierarchyMappingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends HierarchyMappingAggregateArgs>(args: Subset<T, HierarchyMappingAggregateArgs>): Prisma.PrismaPromise<GetHierarchyMappingAggregateType<T>>

    /**
     * Group by HierarchyMapping.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HierarchyMappingGroupByArgs} args - Group by arguments.
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
      T extends HierarchyMappingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HierarchyMappingGroupByArgs['orderBy'] }
        : { orderBy?: HierarchyMappingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, HierarchyMappingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHierarchyMappingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HierarchyMapping model
   */
  readonly fields: HierarchyMappingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HierarchyMapping.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HierarchyMappingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    connector<T extends HierarchyMapping$connectorArgs<ExtArgs> = {}>(args?: Subset<T, HierarchyMapping$connectorArgs<ExtArgs>>): Prisma__ConnectorClient<$Result.GetResult<Prisma.$ConnectorPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    manager<T extends HierarchyMapping$managerArgs<ExtArgs> = {}>(args?: Subset<T, HierarchyMapping$managerArgs<ExtArgs>>): Prisma__ConnectorClient<$Result.GetResult<Prisma.$ConnectorPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the HierarchyMapping model
   */ 
  interface HierarchyMappingFieldRefs {
    readonly id: FieldRef<"HierarchyMapping", 'String'>
    readonly connectorId: FieldRef<"HierarchyMapping", 'String'>
    readonly managerId: FieldRef<"HierarchyMapping", 'String'>
    readonly role: FieldRef<"HierarchyMapping", 'String'>
    readonly assignedAt: FieldRef<"HierarchyMapping", 'DateTime'>
    readonly assignedBy: FieldRef<"HierarchyMapping", 'String'>
  }
    

  // Custom InputTypes
  /**
   * HierarchyMapping findUnique
   */
  export type HierarchyMappingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HierarchyMapping
     */
    select?: HierarchyMappingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HierarchyMappingInclude<ExtArgs> | null
    /**
     * Filter, which HierarchyMapping to fetch.
     */
    where: HierarchyMappingWhereUniqueInput
  }

  /**
   * HierarchyMapping findUniqueOrThrow
   */
  export type HierarchyMappingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HierarchyMapping
     */
    select?: HierarchyMappingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HierarchyMappingInclude<ExtArgs> | null
    /**
     * Filter, which HierarchyMapping to fetch.
     */
    where: HierarchyMappingWhereUniqueInput
  }

  /**
   * HierarchyMapping findFirst
   */
  export type HierarchyMappingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HierarchyMapping
     */
    select?: HierarchyMappingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HierarchyMappingInclude<ExtArgs> | null
    /**
     * Filter, which HierarchyMapping to fetch.
     */
    where?: HierarchyMappingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HierarchyMappings to fetch.
     */
    orderBy?: HierarchyMappingOrderByWithRelationInput | HierarchyMappingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HierarchyMappings.
     */
    cursor?: HierarchyMappingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HierarchyMappings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HierarchyMappings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HierarchyMappings.
     */
    distinct?: HierarchyMappingScalarFieldEnum | HierarchyMappingScalarFieldEnum[]
  }

  /**
   * HierarchyMapping findFirstOrThrow
   */
  export type HierarchyMappingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HierarchyMapping
     */
    select?: HierarchyMappingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HierarchyMappingInclude<ExtArgs> | null
    /**
     * Filter, which HierarchyMapping to fetch.
     */
    where?: HierarchyMappingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HierarchyMappings to fetch.
     */
    orderBy?: HierarchyMappingOrderByWithRelationInput | HierarchyMappingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HierarchyMappings.
     */
    cursor?: HierarchyMappingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HierarchyMappings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HierarchyMappings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HierarchyMappings.
     */
    distinct?: HierarchyMappingScalarFieldEnum | HierarchyMappingScalarFieldEnum[]
  }

  /**
   * HierarchyMapping findMany
   */
  export type HierarchyMappingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HierarchyMapping
     */
    select?: HierarchyMappingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HierarchyMappingInclude<ExtArgs> | null
    /**
     * Filter, which HierarchyMappings to fetch.
     */
    where?: HierarchyMappingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HierarchyMappings to fetch.
     */
    orderBy?: HierarchyMappingOrderByWithRelationInput | HierarchyMappingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HierarchyMappings.
     */
    cursor?: HierarchyMappingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HierarchyMappings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HierarchyMappings.
     */
    skip?: number
    distinct?: HierarchyMappingScalarFieldEnum | HierarchyMappingScalarFieldEnum[]
  }

  /**
   * HierarchyMapping create
   */
  export type HierarchyMappingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HierarchyMapping
     */
    select?: HierarchyMappingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HierarchyMappingInclude<ExtArgs> | null
    /**
     * The data needed to create a HierarchyMapping.
     */
    data: XOR<HierarchyMappingCreateInput, HierarchyMappingUncheckedCreateInput>
  }

  /**
   * HierarchyMapping createMany
   */
  export type HierarchyMappingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HierarchyMappings.
     */
    data: HierarchyMappingCreateManyInput | HierarchyMappingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HierarchyMapping update
   */
  export type HierarchyMappingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HierarchyMapping
     */
    select?: HierarchyMappingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HierarchyMappingInclude<ExtArgs> | null
    /**
     * The data needed to update a HierarchyMapping.
     */
    data: XOR<HierarchyMappingUpdateInput, HierarchyMappingUncheckedUpdateInput>
    /**
     * Choose, which HierarchyMapping to update.
     */
    where: HierarchyMappingWhereUniqueInput
  }

  /**
   * HierarchyMapping updateMany
   */
  export type HierarchyMappingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HierarchyMappings.
     */
    data: XOR<HierarchyMappingUpdateManyMutationInput, HierarchyMappingUncheckedUpdateManyInput>
    /**
     * Filter which HierarchyMappings to update
     */
    where?: HierarchyMappingWhereInput
  }

  /**
   * HierarchyMapping upsert
   */
  export type HierarchyMappingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HierarchyMapping
     */
    select?: HierarchyMappingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HierarchyMappingInclude<ExtArgs> | null
    /**
     * The filter to search for the HierarchyMapping to update in case it exists.
     */
    where: HierarchyMappingWhereUniqueInput
    /**
     * In case the HierarchyMapping found by the `where` argument doesn't exist, create a new HierarchyMapping with this data.
     */
    create: XOR<HierarchyMappingCreateInput, HierarchyMappingUncheckedCreateInput>
    /**
     * In case the HierarchyMapping was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HierarchyMappingUpdateInput, HierarchyMappingUncheckedUpdateInput>
  }

  /**
   * HierarchyMapping delete
   */
  export type HierarchyMappingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HierarchyMapping
     */
    select?: HierarchyMappingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HierarchyMappingInclude<ExtArgs> | null
    /**
     * Filter which HierarchyMapping to delete.
     */
    where: HierarchyMappingWhereUniqueInput
  }

  /**
   * HierarchyMapping deleteMany
   */
  export type HierarchyMappingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HierarchyMappings to delete
     */
    where?: HierarchyMappingWhereInput
  }

  /**
   * HierarchyMapping.connector
   */
  export type HierarchyMapping$connectorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connector
     */
    select?: ConnectorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorInclude<ExtArgs> | null
    where?: ConnectorWhereInput
  }

  /**
   * HierarchyMapping.manager
   */
  export type HierarchyMapping$managerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connector
     */
    select?: ConnectorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorInclude<ExtArgs> | null
    where?: ConnectorWhereInput
  }

  /**
   * HierarchyMapping without action
   */
  export type HierarchyMappingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HierarchyMapping
     */
    select?: HierarchyMappingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HierarchyMappingInclude<ExtArgs> | null
  }


  /**
   * Model ConnectorStatusHistory
   */

  export type AggregateConnectorStatusHistory = {
    _count: ConnectorStatusHistoryCountAggregateOutputType | null
    _min: ConnectorStatusHistoryMinAggregateOutputType | null
    _max: ConnectorStatusHistoryMaxAggregateOutputType | null
  }

  export type ConnectorStatusHistoryMinAggregateOutputType = {
    id: string | null
    connectorId: string | null
    status: string | null
    changedAt: Date | null
    changedBy: string | null
    remarks: string | null
  }

  export type ConnectorStatusHistoryMaxAggregateOutputType = {
    id: string | null
    connectorId: string | null
    status: string | null
    changedAt: Date | null
    changedBy: string | null
    remarks: string | null
  }

  export type ConnectorStatusHistoryCountAggregateOutputType = {
    id: number
    connectorId: number
    status: number
    changedAt: number
    changedBy: number
    remarks: number
    _all: number
  }


  export type ConnectorStatusHistoryMinAggregateInputType = {
    id?: true
    connectorId?: true
    status?: true
    changedAt?: true
    changedBy?: true
    remarks?: true
  }

  export type ConnectorStatusHistoryMaxAggregateInputType = {
    id?: true
    connectorId?: true
    status?: true
    changedAt?: true
    changedBy?: true
    remarks?: true
  }

  export type ConnectorStatusHistoryCountAggregateInputType = {
    id?: true
    connectorId?: true
    status?: true
    changedAt?: true
    changedBy?: true
    remarks?: true
    _all?: true
  }

  export type ConnectorStatusHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConnectorStatusHistory to aggregate.
     */
    where?: ConnectorStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConnectorStatusHistories to fetch.
     */
    orderBy?: ConnectorStatusHistoryOrderByWithRelationInput | ConnectorStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConnectorStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConnectorStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConnectorStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ConnectorStatusHistories
    **/
    _count?: true | ConnectorStatusHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConnectorStatusHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConnectorStatusHistoryMaxAggregateInputType
  }

  export type GetConnectorStatusHistoryAggregateType<T extends ConnectorStatusHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateConnectorStatusHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConnectorStatusHistory[P]>
      : GetScalarType<T[P], AggregateConnectorStatusHistory[P]>
  }




  export type ConnectorStatusHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConnectorStatusHistoryWhereInput
    orderBy?: ConnectorStatusHistoryOrderByWithAggregationInput | ConnectorStatusHistoryOrderByWithAggregationInput[]
    by: ConnectorStatusHistoryScalarFieldEnum[] | ConnectorStatusHistoryScalarFieldEnum
    having?: ConnectorStatusHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConnectorStatusHistoryCountAggregateInputType | true
    _min?: ConnectorStatusHistoryMinAggregateInputType
    _max?: ConnectorStatusHistoryMaxAggregateInputType
  }

  export type ConnectorStatusHistoryGroupByOutputType = {
    id: string
    connectorId: string | null
    status: string
    changedAt: Date
    changedBy: string | null
    remarks: string | null
    _count: ConnectorStatusHistoryCountAggregateOutputType | null
    _min: ConnectorStatusHistoryMinAggregateOutputType | null
    _max: ConnectorStatusHistoryMaxAggregateOutputType | null
  }

  type GetConnectorStatusHistoryGroupByPayload<T extends ConnectorStatusHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConnectorStatusHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConnectorStatusHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConnectorStatusHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], ConnectorStatusHistoryGroupByOutputType[P]>
        }
      >
    >


  export type ConnectorStatusHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    connectorId?: boolean
    status?: boolean
    changedAt?: boolean
    changedBy?: boolean
    remarks?: boolean
    connector?: boolean | ConnectorStatusHistory$connectorArgs<ExtArgs>
  }, ExtArgs["result"]["connectorStatusHistory"]>


  export type ConnectorStatusHistorySelectScalar = {
    id?: boolean
    connectorId?: boolean
    status?: boolean
    changedAt?: boolean
    changedBy?: boolean
    remarks?: boolean
  }

  export type ConnectorStatusHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connector?: boolean | ConnectorStatusHistory$connectorArgs<ExtArgs>
  }

  export type $ConnectorStatusHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ConnectorStatusHistory"
    objects: {
      connector: Prisma.$ConnectorPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      connectorId: string | null
      status: string
      changedAt: Date
      changedBy: string | null
      remarks: string | null
    }, ExtArgs["result"]["connectorStatusHistory"]>
    composites: {}
  }

  type ConnectorStatusHistoryGetPayload<S extends boolean | null | undefined | ConnectorStatusHistoryDefaultArgs> = $Result.GetResult<Prisma.$ConnectorStatusHistoryPayload, S>

  type ConnectorStatusHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ConnectorStatusHistoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ConnectorStatusHistoryCountAggregateInputType | true
    }

  export interface ConnectorStatusHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ConnectorStatusHistory'], meta: { name: 'ConnectorStatusHistory' } }
    /**
     * Find zero or one ConnectorStatusHistory that matches the filter.
     * @param {ConnectorStatusHistoryFindUniqueArgs} args - Arguments to find a ConnectorStatusHistory
     * @example
     * // Get one ConnectorStatusHistory
     * const connectorStatusHistory = await prisma.connectorStatusHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConnectorStatusHistoryFindUniqueArgs>(args: SelectSubset<T, ConnectorStatusHistoryFindUniqueArgs<ExtArgs>>): Prisma__ConnectorStatusHistoryClient<$Result.GetResult<Prisma.$ConnectorStatusHistoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ConnectorStatusHistory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ConnectorStatusHistoryFindUniqueOrThrowArgs} args - Arguments to find a ConnectorStatusHistory
     * @example
     * // Get one ConnectorStatusHistory
     * const connectorStatusHistory = await prisma.connectorStatusHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConnectorStatusHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, ConnectorStatusHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConnectorStatusHistoryClient<$Result.GetResult<Prisma.$ConnectorStatusHistoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ConnectorStatusHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectorStatusHistoryFindFirstArgs} args - Arguments to find a ConnectorStatusHistory
     * @example
     * // Get one ConnectorStatusHistory
     * const connectorStatusHistory = await prisma.connectorStatusHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConnectorStatusHistoryFindFirstArgs>(args?: SelectSubset<T, ConnectorStatusHistoryFindFirstArgs<ExtArgs>>): Prisma__ConnectorStatusHistoryClient<$Result.GetResult<Prisma.$ConnectorStatusHistoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ConnectorStatusHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectorStatusHistoryFindFirstOrThrowArgs} args - Arguments to find a ConnectorStatusHistory
     * @example
     * // Get one ConnectorStatusHistory
     * const connectorStatusHistory = await prisma.connectorStatusHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConnectorStatusHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, ConnectorStatusHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConnectorStatusHistoryClient<$Result.GetResult<Prisma.$ConnectorStatusHistoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ConnectorStatusHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectorStatusHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ConnectorStatusHistories
     * const connectorStatusHistories = await prisma.connectorStatusHistory.findMany()
     * 
     * // Get first 10 ConnectorStatusHistories
     * const connectorStatusHistories = await prisma.connectorStatusHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const connectorStatusHistoryWithIdOnly = await prisma.connectorStatusHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConnectorStatusHistoryFindManyArgs>(args?: SelectSubset<T, ConnectorStatusHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectorStatusHistoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ConnectorStatusHistory.
     * @param {ConnectorStatusHistoryCreateArgs} args - Arguments to create a ConnectorStatusHistory.
     * @example
     * // Create one ConnectorStatusHistory
     * const ConnectorStatusHistory = await prisma.connectorStatusHistory.create({
     *   data: {
     *     // ... data to create a ConnectorStatusHistory
     *   }
     * })
     * 
     */
    create<T extends ConnectorStatusHistoryCreateArgs>(args: SelectSubset<T, ConnectorStatusHistoryCreateArgs<ExtArgs>>): Prisma__ConnectorStatusHistoryClient<$Result.GetResult<Prisma.$ConnectorStatusHistoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ConnectorStatusHistories.
     * @param {ConnectorStatusHistoryCreateManyArgs} args - Arguments to create many ConnectorStatusHistories.
     * @example
     * // Create many ConnectorStatusHistories
     * const connectorStatusHistory = await prisma.connectorStatusHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConnectorStatusHistoryCreateManyArgs>(args?: SelectSubset<T, ConnectorStatusHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ConnectorStatusHistory.
     * @param {ConnectorStatusHistoryDeleteArgs} args - Arguments to delete one ConnectorStatusHistory.
     * @example
     * // Delete one ConnectorStatusHistory
     * const ConnectorStatusHistory = await prisma.connectorStatusHistory.delete({
     *   where: {
     *     // ... filter to delete one ConnectorStatusHistory
     *   }
     * })
     * 
     */
    delete<T extends ConnectorStatusHistoryDeleteArgs>(args: SelectSubset<T, ConnectorStatusHistoryDeleteArgs<ExtArgs>>): Prisma__ConnectorStatusHistoryClient<$Result.GetResult<Prisma.$ConnectorStatusHistoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ConnectorStatusHistory.
     * @param {ConnectorStatusHistoryUpdateArgs} args - Arguments to update one ConnectorStatusHistory.
     * @example
     * // Update one ConnectorStatusHistory
     * const connectorStatusHistory = await prisma.connectorStatusHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConnectorStatusHistoryUpdateArgs>(args: SelectSubset<T, ConnectorStatusHistoryUpdateArgs<ExtArgs>>): Prisma__ConnectorStatusHistoryClient<$Result.GetResult<Prisma.$ConnectorStatusHistoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ConnectorStatusHistories.
     * @param {ConnectorStatusHistoryDeleteManyArgs} args - Arguments to filter ConnectorStatusHistories to delete.
     * @example
     * // Delete a few ConnectorStatusHistories
     * const { count } = await prisma.connectorStatusHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConnectorStatusHistoryDeleteManyArgs>(args?: SelectSubset<T, ConnectorStatusHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConnectorStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectorStatusHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ConnectorStatusHistories
     * const connectorStatusHistory = await prisma.connectorStatusHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConnectorStatusHistoryUpdateManyArgs>(args: SelectSubset<T, ConnectorStatusHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ConnectorStatusHistory.
     * @param {ConnectorStatusHistoryUpsertArgs} args - Arguments to update or create a ConnectorStatusHistory.
     * @example
     * // Update or create a ConnectorStatusHistory
     * const connectorStatusHistory = await prisma.connectorStatusHistory.upsert({
     *   create: {
     *     // ... data to create a ConnectorStatusHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ConnectorStatusHistory we want to update
     *   }
     * })
     */
    upsert<T extends ConnectorStatusHistoryUpsertArgs>(args: SelectSubset<T, ConnectorStatusHistoryUpsertArgs<ExtArgs>>): Prisma__ConnectorStatusHistoryClient<$Result.GetResult<Prisma.$ConnectorStatusHistoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ConnectorStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectorStatusHistoryCountArgs} args - Arguments to filter ConnectorStatusHistories to count.
     * @example
     * // Count the number of ConnectorStatusHistories
     * const count = await prisma.connectorStatusHistory.count({
     *   where: {
     *     // ... the filter for the ConnectorStatusHistories we want to count
     *   }
     * })
    **/
    count<T extends ConnectorStatusHistoryCountArgs>(
      args?: Subset<T, ConnectorStatusHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConnectorStatusHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ConnectorStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectorStatusHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ConnectorStatusHistoryAggregateArgs>(args: Subset<T, ConnectorStatusHistoryAggregateArgs>): Prisma.PrismaPromise<GetConnectorStatusHistoryAggregateType<T>>

    /**
     * Group by ConnectorStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectorStatusHistoryGroupByArgs} args - Group by arguments.
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
      T extends ConnectorStatusHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConnectorStatusHistoryGroupByArgs['orderBy'] }
        : { orderBy?: ConnectorStatusHistoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ConnectorStatusHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConnectorStatusHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ConnectorStatusHistory model
   */
  readonly fields: ConnectorStatusHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ConnectorStatusHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConnectorStatusHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    connector<T extends ConnectorStatusHistory$connectorArgs<ExtArgs> = {}>(args?: Subset<T, ConnectorStatusHistory$connectorArgs<ExtArgs>>): Prisma__ConnectorClient<$Result.GetResult<Prisma.$ConnectorPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the ConnectorStatusHistory model
   */ 
  interface ConnectorStatusHistoryFieldRefs {
    readonly id: FieldRef<"ConnectorStatusHistory", 'String'>
    readonly connectorId: FieldRef<"ConnectorStatusHistory", 'String'>
    readonly status: FieldRef<"ConnectorStatusHistory", 'String'>
    readonly changedAt: FieldRef<"ConnectorStatusHistory", 'DateTime'>
    readonly changedBy: FieldRef<"ConnectorStatusHistory", 'String'>
    readonly remarks: FieldRef<"ConnectorStatusHistory", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ConnectorStatusHistory findUnique
   */
  export type ConnectorStatusHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectorStatusHistory
     */
    select?: ConnectorStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ConnectorStatusHistory to fetch.
     */
    where: ConnectorStatusHistoryWhereUniqueInput
  }

  /**
   * ConnectorStatusHistory findUniqueOrThrow
   */
  export type ConnectorStatusHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectorStatusHistory
     */
    select?: ConnectorStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ConnectorStatusHistory to fetch.
     */
    where: ConnectorStatusHistoryWhereUniqueInput
  }

  /**
   * ConnectorStatusHistory findFirst
   */
  export type ConnectorStatusHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectorStatusHistory
     */
    select?: ConnectorStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ConnectorStatusHistory to fetch.
     */
    where?: ConnectorStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConnectorStatusHistories to fetch.
     */
    orderBy?: ConnectorStatusHistoryOrderByWithRelationInput | ConnectorStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConnectorStatusHistories.
     */
    cursor?: ConnectorStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConnectorStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConnectorStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConnectorStatusHistories.
     */
    distinct?: ConnectorStatusHistoryScalarFieldEnum | ConnectorStatusHistoryScalarFieldEnum[]
  }

  /**
   * ConnectorStatusHistory findFirstOrThrow
   */
  export type ConnectorStatusHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectorStatusHistory
     */
    select?: ConnectorStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ConnectorStatusHistory to fetch.
     */
    where?: ConnectorStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConnectorStatusHistories to fetch.
     */
    orderBy?: ConnectorStatusHistoryOrderByWithRelationInput | ConnectorStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConnectorStatusHistories.
     */
    cursor?: ConnectorStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConnectorStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConnectorStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConnectorStatusHistories.
     */
    distinct?: ConnectorStatusHistoryScalarFieldEnum | ConnectorStatusHistoryScalarFieldEnum[]
  }

  /**
   * ConnectorStatusHistory findMany
   */
  export type ConnectorStatusHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectorStatusHistory
     */
    select?: ConnectorStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ConnectorStatusHistories to fetch.
     */
    where?: ConnectorStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConnectorStatusHistories to fetch.
     */
    orderBy?: ConnectorStatusHistoryOrderByWithRelationInput | ConnectorStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ConnectorStatusHistories.
     */
    cursor?: ConnectorStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConnectorStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConnectorStatusHistories.
     */
    skip?: number
    distinct?: ConnectorStatusHistoryScalarFieldEnum | ConnectorStatusHistoryScalarFieldEnum[]
  }

  /**
   * ConnectorStatusHistory create
   */
  export type ConnectorStatusHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectorStatusHistory
     */
    select?: ConnectorStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a ConnectorStatusHistory.
     */
    data: XOR<ConnectorStatusHistoryCreateInput, ConnectorStatusHistoryUncheckedCreateInput>
  }

  /**
   * ConnectorStatusHistory createMany
   */
  export type ConnectorStatusHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ConnectorStatusHistories.
     */
    data: ConnectorStatusHistoryCreateManyInput | ConnectorStatusHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ConnectorStatusHistory update
   */
  export type ConnectorStatusHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectorStatusHistory
     */
    select?: ConnectorStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a ConnectorStatusHistory.
     */
    data: XOR<ConnectorStatusHistoryUpdateInput, ConnectorStatusHistoryUncheckedUpdateInput>
    /**
     * Choose, which ConnectorStatusHistory to update.
     */
    where: ConnectorStatusHistoryWhereUniqueInput
  }

  /**
   * ConnectorStatusHistory updateMany
   */
  export type ConnectorStatusHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ConnectorStatusHistories.
     */
    data: XOR<ConnectorStatusHistoryUpdateManyMutationInput, ConnectorStatusHistoryUncheckedUpdateManyInput>
    /**
     * Filter which ConnectorStatusHistories to update
     */
    where?: ConnectorStatusHistoryWhereInput
  }

  /**
   * ConnectorStatusHistory upsert
   */
  export type ConnectorStatusHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectorStatusHistory
     */
    select?: ConnectorStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorStatusHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the ConnectorStatusHistory to update in case it exists.
     */
    where: ConnectorStatusHistoryWhereUniqueInput
    /**
     * In case the ConnectorStatusHistory found by the `where` argument doesn't exist, create a new ConnectorStatusHistory with this data.
     */
    create: XOR<ConnectorStatusHistoryCreateInput, ConnectorStatusHistoryUncheckedCreateInput>
    /**
     * In case the ConnectorStatusHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConnectorStatusHistoryUpdateInput, ConnectorStatusHistoryUncheckedUpdateInput>
  }

  /**
   * ConnectorStatusHistory delete
   */
  export type ConnectorStatusHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectorStatusHistory
     */
    select?: ConnectorStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter which ConnectorStatusHistory to delete.
     */
    where: ConnectorStatusHistoryWhereUniqueInput
  }

  /**
   * ConnectorStatusHistory deleteMany
   */
  export type ConnectorStatusHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConnectorStatusHistories to delete
     */
    where?: ConnectorStatusHistoryWhereInput
  }

  /**
   * ConnectorStatusHistory.connector
   */
  export type ConnectorStatusHistory$connectorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connector
     */
    select?: ConnectorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorInclude<ExtArgs> | null
    where?: ConnectorWhereInput
  }

  /**
   * ConnectorStatusHistory without action
   */
  export type ConnectorStatusHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectorStatusHistory
     */
    select?: ConnectorStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorStatusHistoryInclude<ExtArgs> | null
  }


  /**
   * Model ConnectorPerformance
   */

  export type AggregateConnectorPerformance = {
    _count: ConnectorPerformanceCountAggregateOutputType | null
    _avg: ConnectorPerformanceAvgAggregateOutputType | null
    _sum: ConnectorPerformanceSumAggregateOutputType | null
    _min: ConnectorPerformanceMinAggregateOutputType | null
    _max: ConnectorPerformanceMaxAggregateOutputType | null
  }

  export type ConnectorPerformanceAvgAggregateOutputType = {
    totalLeads: number | null
    convertedLeads: number | null
    totalCommission: Decimal | null
  }

  export type ConnectorPerformanceSumAggregateOutputType = {
    totalLeads: number | null
    convertedLeads: number | null
    totalCommission: Decimal | null
  }

  export type ConnectorPerformanceMinAggregateOutputType = {
    id: string | null
    connectorId: string | null
    totalLeads: number | null
    convertedLeads: number | null
    totalCommission: Decimal | null
    lastCalculatedAt: Date | null
  }

  export type ConnectorPerformanceMaxAggregateOutputType = {
    id: string | null
    connectorId: string | null
    totalLeads: number | null
    convertedLeads: number | null
    totalCommission: Decimal | null
    lastCalculatedAt: Date | null
  }

  export type ConnectorPerformanceCountAggregateOutputType = {
    id: number
    connectorId: number
    totalLeads: number
    convertedLeads: number
    totalCommission: number
    lastCalculatedAt: number
    _all: number
  }


  export type ConnectorPerformanceAvgAggregateInputType = {
    totalLeads?: true
    convertedLeads?: true
    totalCommission?: true
  }

  export type ConnectorPerformanceSumAggregateInputType = {
    totalLeads?: true
    convertedLeads?: true
    totalCommission?: true
  }

  export type ConnectorPerformanceMinAggregateInputType = {
    id?: true
    connectorId?: true
    totalLeads?: true
    convertedLeads?: true
    totalCommission?: true
    lastCalculatedAt?: true
  }

  export type ConnectorPerformanceMaxAggregateInputType = {
    id?: true
    connectorId?: true
    totalLeads?: true
    convertedLeads?: true
    totalCommission?: true
    lastCalculatedAt?: true
  }

  export type ConnectorPerformanceCountAggregateInputType = {
    id?: true
    connectorId?: true
    totalLeads?: true
    convertedLeads?: true
    totalCommission?: true
    lastCalculatedAt?: true
    _all?: true
  }

  export type ConnectorPerformanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConnectorPerformance to aggregate.
     */
    where?: ConnectorPerformanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConnectorPerformances to fetch.
     */
    orderBy?: ConnectorPerformanceOrderByWithRelationInput | ConnectorPerformanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConnectorPerformanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConnectorPerformances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConnectorPerformances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ConnectorPerformances
    **/
    _count?: true | ConnectorPerformanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ConnectorPerformanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ConnectorPerformanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConnectorPerformanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConnectorPerformanceMaxAggregateInputType
  }

  export type GetConnectorPerformanceAggregateType<T extends ConnectorPerformanceAggregateArgs> = {
        [P in keyof T & keyof AggregateConnectorPerformance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConnectorPerformance[P]>
      : GetScalarType<T[P], AggregateConnectorPerformance[P]>
  }




  export type ConnectorPerformanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConnectorPerformanceWhereInput
    orderBy?: ConnectorPerformanceOrderByWithAggregationInput | ConnectorPerformanceOrderByWithAggregationInput[]
    by: ConnectorPerformanceScalarFieldEnum[] | ConnectorPerformanceScalarFieldEnum
    having?: ConnectorPerformanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConnectorPerformanceCountAggregateInputType | true
    _avg?: ConnectorPerformanceAvgAggregateInputType
    _sum?: ConnectorPerformanceSumAggregateInputType
    _min?: ConnectorPerformanceMinAggregateInputType
    _max?: ConnectorPerformanceMaxAggregateInputType
  }

  export type ConnectorPerformanceGroupByOutputType = {
    id: string
    connectorId: string | null
    totalLeads: number
    convertedLeads: number
    totalCommission: Decimal
    lastCalculatedAt: Date | null
    _count: ConnectorPerformanceCountAggregateOutputType | null
    _avg: ConnectorPerformanceAvgAggregateOutputType | null
    _sum: ConnectorPerformanceSumAggregateOutputType | null
    _min: ConnectorPerformanceMinAggregateOutputType | null
    _max: ConnectorPerformanceMaxAggregateOutputType | null
  }

  type GetConnectorPerformanceGroupByPayload<T extends ConnectorPerformanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConnectorPerformanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConnectorPerformanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConnectorPerformanceGroupByOutputType[P]>
            : GetScalarType<T[P], ConnectorPerformanceGroupByOutputType[P]>
        }
      >
    >


  export type ConnectorPerformanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    connectorId?: boolean
    totalLeads?: boolean
    convertedLeads?: boolean
    totalCommission?: boolean
    lastCalculatedAt?: boolean
    connector?: boolean | ConnectorPerformance$connectorArgs<ExtArgs>
  }, ExtArgs["result"]["connectorPerformance"]>


  export type ConnectorPerformanceSelectScalar = {
    id?: boolean
    connectorId?: boolean
    totalLeads?: boolean
    convertedLeads?: boolean
    totalCommission?: boolean
    lastCalculatedAt?: boolean
  }

  export type ConnectorPerformanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connector?: boolean | ConnectorPerformance$connectorArgs<ExtArgs>
  }

  export type $ConnectorPerformancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ConnectorPerformance"
    objects: {
      connector: Prisma.$ConnectorPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      connectorId: string | null
      totalLeads: number
      convertedLeads: number
      totalCommission: Prisma.Decimal
      lastCalculatedAt: Date | null
    }, ExtArgs["result"]["connectorPerformance"]>
    composites: {}
  }

  type ConnectorPerformanceGetPayload<S extends boolean | null | undefined | ConnectorPerformanceDefaultArgs> = $Result.GetResult<Prisma.$ConnectorPerformancePayload, S>

  type ConnectorPerformanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ConnectorPerformanceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ConnectorPerformanceCountAggregateInputType | true
    }

  export interface ConnectorPerformanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ConnectorPerformance'], meta: { name: 'ConnectorPerformance' } }
    /**
     * Find zero or one ConnectorPerformance that matches the filter.
     * @param {ConnectorPerformanceFindUniqueArgs} args - Arguments to find a ConnectorPerformance
     * @example
     * // Get one ConnectorPerformance
     * const connectorPerformance = await prisma.connectorPerformance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConnectorPerformanceFindUniqueArgs>(args: SelectSubset<T, ConnectorPerformanceFindUniqueArgs<ExtArgs>>): Prisma__ConnectorPerformanceClient<$Result.GetResult<Prisma.$ConnectorPerformancePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ConnectorPerformance that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ConnectorPerformanceFindUniqueOrThrowArgs} args - Arguments to find a ConnectorPerformance
     * @example
     * // Get one ConnectorPerformance
     * const connectorPerformance = await prisma.connectorPerformance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConnectorPerformanceFindUniqueOrThrowArgs>(args: SelectSubset<T, ConnectorPerformanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConnectorPerformanceClient<$Result.GetResult<Prisma.$ConnectorPerformancePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ConnectorPerformance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectorPerformanceFindFirstArgs} args - Arguments to find a ConnectorPerformance
     * @example
     * // Get one ConnectorPerformance
     * const connectorPerformance = await prisma.connectorPerformance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConnectorPerformanceFindFirstArgs>(args?: SelectSubset<T, ConnectorPerformanceFindFirstArgs<ExtArgs>>): Prisma__ConnectorPerformanceClient<$Result.GetResult<Prisma.$ConnectorPerformancePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ConnectorPerformance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectorPerformanceFindFirstOrThrowArgs} args - Arguments to find a ConnectorPerformance
     * @example
     * // Get one ConnectorPerformance
     * const connectorPerformance = await prisma.connectorPerformance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConnectorPerformanceFindFirstOrThrowArgs>(args?: SelectSubset<T, ConnectorPerformanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConnectorPerformanceClient<$Result.GetResult<Prisma.$ConnectorPerformancePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ConnectorPerformances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectorPerformanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ConnectorPerformances
     * const connectorPerformances = await prisma.connectorPerformance.findMany()
     * 
     * // Get first 10 ConnectorPerformances
     * const connectorPerformances = await prisma.connectorPerformance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const connectorPerformanceWithIdOnly = await prisma.connectorPerformance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConnectorPerformanceFindManyArgs>(args?: SelectSubset<T, ConnectorPerformanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectorPerformancePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ConnectorPerformance.
     * @param {ConnectorPerformanceCreateArgs} args - Arguments to create a ConnectorPerformance.
     * @example
     * // Create one ConnectorPerformance
     * const ConnectorPerformance = await prisma.connectorPerformance.create({
     *   data: {
     *     // ... data to create a ConnectorPerformance
     *   }
     * })
     * 
     */
    create<T extends ConnectorPerformanceCreateArgs>(args: SelectSubset<T, ConnectorPerformanceCreateArgs<ExtArgs>>): Prisma__ConnectorPerformanceClient<$Result.GetResult<Prisma.$ConnectorPerformancePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ConnectorPerformances.
     * @param {ConnectorPerformanceCreateManyArgs} args - Arguments to create many ConnectorPerformances.
     * @example
     * // Create many ConnectorPerformances
     * const connectorPerformance = await prisma.connectorPerformance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConnectorPerformanceCreateManyArgs>(args?: SelectSubset<T, ConnectorPerformanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ConnectorPerformance.
     * @param {ConnectorPerformanceDeleteArgs} args - Arguments to delete one ConnectorPerformance.
     * @example
     * // Delete one ConnectorPerformance
     * const ConnectorPerformance = await prisma.connectorPerformance.delete({
     *   where: {
     *     // ... filter to delete one ConnectorPerformance
     *   }
     * })
     * 
     */
    delete<T extends ConnectorPerformanceDeleteArgs>(args: SelectSubset<T, ConnectorPerformanceDeleteArgs<ExtArgs>>): Prisma__ConnectorPerformanceClient<$Result.GetResult<Prisma.$ConnectorPerformancePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ConnectorPerformance.
     * @param {ConnectorPerformanceUpdateArgs} args - Arguments to update one ConnectorPerformance.
     * @example
     * // Update one ConnectorPerformance
     * const connectorPerformance = await prisma.connectorPerformance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConnectorPerformanceUpdateArgs>(args: SelectSubset<T, ConnectorPerformanceUpdateArgs<ExtArgs>>): Prisma__ConnectorPerformanceClient<$Result.GetResult<Prisma.$ConnectorPerformancePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ConnectorPerformances.
     * @param {ConnectorPerformanceDeleteManyArgs} args - Arguments to filter ConnectorPerformances to delete.
     * @example
     * // Delete a few ConnectorPerformances
     * const { count } = await prisma.connectorPerformance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConnectorPerformanceDeleteManyArgs>(args?: SelectSubset<T, ConnectorPerformanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConnectorPerformances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectorPerformanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ConnectorPerformances
     * const connectorPerformance = await prisma.connectorPerformance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConnectorPerformanceUpdateManyArgs>(args: SelectSubset<T, ConnectorPerformanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ConnectorPerformance.
     * @param {ConnectorPerformanceUpsertArgs} args - Arguments to update or create a ConnectorPerformance.
     * @example
     * // Update or create a ConnectorPerformance
     * const connectorPerformance = await prisma.connectorPerformance.upsert({
     *   create: {
     *     // ... data to create a ConnectorPerformance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ConnectorPerformance we want to update
     *   }
     * })
     */
    upsert<T extends ConnectorPerformanceUpsertArgs>(args: SelectSubset<T, ConnectorPerformanceUpsertArgs<ExtArgs>>): Prisma__ConnectorPerformanceClient<$Result.GetResult<Prisma.$ConnectorPerformancePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ConnectorPerformances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectorPerformanceCountArgs} args - Arguments to filter ConnectorPerformances to count.
     * @example
     * // Count the number of ConnectorPerformances
     * const count = await prisma.connectorPerformance.count({
     *   where: {
     *     // ... the filter for the ConnectorPerformances we want to count
     *   }
     * })
    **/
    count<T extends ConnectorPerformanceCountArgs>(
      args?: Subset<T, ConnectorPerformanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConnectorPerformanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ConnectorPerformance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectorPerformanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ConnectorPerformanceAggregateArgs>(args: Subset<T, ConnectorPerformanceAggregateArgs>): Prisma.PrismaPromise<GetConnectorPerformanceAggregateType<T>>

    /**
     * Group by ConnectorPerformance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectorPerformanceGroupByArgs} args - Group by arguments.
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
      T extends ConnectorPerformanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConnectorPerformanceGroupByArgs['orderBy'] }
        : { orderBy?: ConnectorPerformanceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ConnectorPerformanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConnectorPerformanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ConnectorPerformance model
   */
  readonly fields: ConnectorPerformanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ConnectorPerformance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConnectorPerformanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    connector<T extends ConnectorPerformance$connectorArgs<ExtArgs> = {}>(args?: Subset<T, ConnectorPerformance$connectorArgs<ExtArgs>>): Prisma__ConnectorClient<$Result.GetResult<Prisma.$ConnectorPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the ConnectorPerformance model
   */ 
  interface ConnectorPerformanceFieldRefs {
    readonly id: FieldRef<"ConnectorPerformance", 'String'>
    readonly connectorId: FieldRef<"ConnectorPerformance", 'String'>
    readonly totalLeads: FieldRef<"ConnectorPerformance", 'Int'>
    readonly convertedLeads: FieldRef<"ConnectorPerformance", 'Int'>
    readonly totalCommission: FieldRef<"ConnectorPerformance", 'Decimal'>
    readonly lastCalculatedAt: FieldRef<"ConnectorPerformance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ConnectorPerformance findUnique
   */
  export type ConnectorPerformanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectorPerformance
     */
    select?: ConnectorPerformanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorPerformanceInclude<ExtArgs> | null
    /**
     * Filter, which ConnectorPerformance to fetch.
     */
    where: ConnectorPerformanceWhereUniqueInput
  }

  /**
   * ConnectorPerformance findUniqueOrThrow
   */
  export type ConnectorPerformanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectorPerformance
     */
    select?: ConnectorPerformanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorPerformanceInclude<ExtArgs> | null
    /**
     * Filter, which ConnectorPerformance to fetch.
     */
    where: ConnectorPerformanceWhereUniqueInput
  }

  /**
   * ConnectorPerformance findFirst
   */
  export type ConnectorPerformanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectorPerformance
     */
    select?: ConnectorPerformanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorPerformanceInclude<ExtArgs> | null
    /**
     * Filter, which ConnectorPerformance to fetch.
     */
    where?: ConnectorPerformanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConnectorPerformances to fetch.
     */
    orderBy?: ConnectorPerformanceOrderByWithRelationInput | ConnectorPerformanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConnectorPerformances.
     */
    cursor?: ConnectorPerformanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConnectorPerformances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConnectorPerformances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConnectorPerformances.
     */
    distinct?: ConnectorPerformanceScalarFieldEnum | ConnectorPerformanceScalarFieldEnum[]
  }

  /**
   * ConnectorPerformance findFirstOrThrow
   */
  export type ConnectorPerformanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectorPerformance
     */
    select?: ConnectorPerformanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorPerformanceInclude<ExtArgs> | null
    /**
     * Filter, which ConnectorPerformance to fetch.
     */
    where?: ConnectorPerformanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConnectorPerformances to fetch.
     */
    orderBy?: ConnectorPerformanceOrderByWithRelationInput | ConnectorPerformanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConnectorPerformances.
     */
    cursor?: ConnectorPerformanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConnectorPerformances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConnectorPerformances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConnectorPerformances.
     */
    distinct?: ConnectorPerformanceScalarFieldEnum | ConnectorPerformanceScalarFieldEnum[]
  }

  /**
   * ConnectorPerformance findMany
   */
  export type ConnectorPerformanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectorPerformance
     */
    select?: ConnectorPerformanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorPerformanceInclude<ExtArgs> | null
    /**
     * Filter, which ConnectorPerformances to fetch.
     */
    where?: ConnectorPerformanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConnectorPerformances to fetch.
     */
    orderBy?: ConnectorPerformanceOrderByWithRelationInput | ConnectorPerformanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ConnectorPerformances.
     */
    cursor?: ConnectorPerformanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConnectorPerformances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConnectorPerformances.
     */
    skip?: number
    distinct?: ConnectorPerformanceScalarFieldEnum | ConnectorPerformanceScalarFieldEnum[]
  }

  /**
   * ConnectorPerformance create
   */
  export type ConnectorPerformanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectorPerformance
     */
    select?: ConnectorPerformanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorPerformanceInclude<ExtArgs> | null
    /**
     * The data needed to create a ConnectorPerformance.
     */
    data: XOR<ConnectorPerformanceCreateInput, ConnectorPerformanceUncheckedCreateInput>
  }

  /**
   * ConnectorPerformance createMany
   */
  export type ConnectorPerformanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ConnectorPerformances.
     */
    data: ConnectorPerformanceCreateManyInput | ConnectorPerformanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ConnectorPerformance update
   */
  export type ConnectorPerformanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectorPerformance
     */
    select?: ConnectorPerformanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorPerformanceInclude<ExtArgs> | null
    /**
     * The data needed to update a ConnectorPerformance.
     */
    data: XOR<ConnectorPerformanceUpdateInput, ConnectorPerformanceUncheckedUpdateInput>
    /**
     * Choose, which ConnectorPerformance to update.
     */
    where: ConnectorPerformanceWhereUniqueInput
  }

  /**
   * ConnectorPerformance updateMany
   */
  export type ConnectorPerformanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ConnectorPerformances.
     */
    data: XOR<ConnectorPerformanceUpdateManyMutationInput, ConnectorPerformanceUncheckedUpdateManyInput>
    /**
     * Filter which ConnectorPerformances to update
     */
    where?: ConnectorPerformanceWhereInput
  }

  /**
   * ConnectorPerformance upsert
   */
  export type ConnectorPerformanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectorPerformance
     */
    select?: ConnectorPerformanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorPerformanceInclude<ExtArgs> | null
    /**
     * The filter to search for the ConnectorPerformance to update in case it exists.
     */
    where: ConnectorPerformanceWhereUniqueInput
    /**
     * In case the ConnectorPerformance found by the `where` argument doesn't exist, create a new ConnectorPerformance with this data.
     */
    create: XOR<ConnectorPerformanceCreateInput, ConnectorPerformanceUncheckedCreateInput>
    /**
     * In case the ConnectorPerformance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConnectorPerformanceUpdateInput, ConnectorPerformanceUncheckedUpdateInput>
  }

  /**
   * ConnectorPerformance delete
   */
  export type ConnectorPerformanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectorPerformance
     */
    select?: ConnectorPerformanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorPerformanceInclude<ExtArgs> | null
    /**
     * Filter which ConnectorPerformance to delete.
     */
    where: ConnectorPerformanceWhereUniqueInput
  }

  /**
   * ConnectorPerformance deleteMany
   */
  export type ConnectorPerformanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConnectorPerformances to delete
     */
    where?: ConnectorPerformanceWhereInput
  }

  /**
   * ConnectorPerformance.connector
   */
  export type ConnectorPerformance$connectorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connector
     */
    select?: ConnectorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorInclude<ExtArgs> | null
    where?: ConnectorWhereInput
  }

  /**
   * ConnectorPerformance without action
   */
  export type ConnectorPerformanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectorPerformance
     */
    select?: ConnectorPerformanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorPerformanceInclude<ExtArgs> | null
  }


  /**
   * Model CommissionRule
   */

  export type AggregateCommissionRule = {
    _count: CommissionRuleCountAggregateOutputType | null
    _avg: CommissionRuleAvgAggregateOutputType | null
    _sum: CommissionRuleSumAggregateOutputType | null
    _min: CommissionRuleMinAggregateOutputType | null
    _max: CommissionRuleMaxAggregateOutputType | null
  }

  export type CommissionRuleAvgAggregateOutputType = {
    connectorRate: Decimal | null
    tlOverrideRate: Decimal | null
    rmOverrideRate: Decimal | null
  }

  export type CommissionRuleSumAggregateOutputType = {
    connectorRate: Decimal | null
    tlOverrideRate: Decimal | null
    rmOverrideRate: Decimal | null
  }

  export type CommissionRuleMinAggregateOutputType = {
    id: string | null
    ruleName: string | null
    connectorRate: Decimal | null
    tlOverrideRate: Decimal | null
    rmOverrideRate: Decimal | null
    isActive: boolean | null
  }

  export type CommissionRuleMaxAggregateOutputType = {
    id: string | null
    ruleName: string | null
    connectorRate: Decimal | null
    tlOverrideRate: Decimal | null
    rmOverrideRate: Decimal | null
    isActive: boolean | null
  }

  export type CommissionRuleCountAggregateOutputType = {
    id: number
    ruleName: number
    connectorRate: number
    tlOverrideRate: number
    rmOverrideRate: number
    isActive: number
    _all: number
  }


  export type CommissionRuleAvgAggregateInputType = {
    connectorRate?: true
    tlOverrideRate?: true
    rmOverrideRate?: true
  }

  export type CommissionRuleSumAggregateInputType = {
    connectorRate?: true
    tlOverrideRate?: true
    rmOverrideRate?: true
  }

  export type CommissionRuleMinAggregateInputType = {
    id?: true
    ruleName?: true
    connectorRate?: true
    tlOverrideRate?: true
    rmOverrideRate?: true
    isActive?: true
  }

  export type CommissionRuleMaxAggregateInputType = {
    id?: true
    ruleName?: true
    connectorRate?: true
    tlOverrideRate?: true
    rmOverrideRate?: true
    isActive?: true
  }

  export type CommissionRuleCountAggregateInputType = {
    id?: true
    ruleName?: true
    connectorRate?: true
    tlOverrideRate?: true
    rmOverrideRate?: true
    isActive?: true
    _all?: true
  }

  export type CommissionRuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommissionRule to aggregate.
     */
    where?: CommissionRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommissionRules to fetch.
     */
    orderBy?: CommissionRuleOrderByWithRelationInput | CommissionRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommissionRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommissionRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommissionRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CommissionRules
    **/
    _count?: true | CommissionRuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommissionRuleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommissionRuleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommissionRuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommissionRuleMaxAggregateInputType
  }

  export type GetCommissionRuleAggregateType<T extends CommissionRuleAggregateArgs> = {
        [P in keyof T & keyof AggregateCommissionRule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCommissionRule[P]>
      : GetScalarType<T[P], AggregateCommissionRule[P]>
  }




  export type CommissionRuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommissionRuleWhereInput
    orderBy?: CommissionRuleOrderByWithAggregationInput | CommissionRuleOrderByWithAggregationInput[]
    by: CommissionRuleScalarFieldEnum[] | CommissionRuleScalarFieldEnum
    having?: CommissionRuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommissionRuleCountAggregateInputType | true
    _avg?: CommissionRuleAvgAggregateInputType
    _sum?: CommissionRuleSumAggregateInputType
    _min?: CommissionRuleMinAggregateInputType
    _max?: CommissionRuleMaxAggregateInputType
  }

  export type CommissionRuleGroupByOutputType = {
    id: string
    ruleName: string
    connectorRate: Decimal
    tlOverrideRate: Decimal
    rmOverrideRate: Decimal
    isActive: boolean
    _count: CommissionRuleCountAggregateOutputType | null
    _avg: CommissionRuleAvgAggregateOutputType | null
    _sum: CommissionRuleSumAggregateOutputType | null
    _min: CommissionRuleMinAggregateOutputType | null
    _max: CommissionRuleMaxAggregateOutputType | null
  }

  type GetCommissionRuleGroupByPayload<T extends CommissionRuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommissionRuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommissionRuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommissionRuleGroupByOutputType[P]>
            : GetScalarType<T[P], CommissionRuleGroupByOutputType[P]>
        }
      >
    >


  export type CommissionRuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ruleName?: boolean
    connectorRate?: boolean
    tlOverrideRate?: boolean
    rmOverrideRate?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["commissionRule"]>


  export type CommissionRuleSelectScalar = {
    id?: boolean
    ruleName?: boolean
    connectorRate?: boolean
    tlOverrideRate?: boolean
    rmOverrideRate?: boolean
    isActive?: boolean
  }


  export type $CommissionRulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CommissionRule"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ruleName: string
      connectorRate: Prisma.Decimal
      tlOverrideRate: Prisma.Decimal
      rmOverrideRate: Prisma.Decimal
      isActive: boolean
    }, ExtArgs["result"]["commissionRule"]>
    composites: {}
  }

  type CommissionRuleGetPayload<S extends boolean | null | undefined | CommissionRuleDefaultArgs> = $Result.GetResult<Prisma.$CommissionRulePayload, S>

  type CommissionRuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CommissionRuleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CommissionRuleCountAggregateInputType | true
    }

  export interface CommissionRuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CommissionRule'], meta: { name: 'CommissionRule' } }
    /**
     * Find zero or one CommissionRule that matches the filter.
     * @param {CommissionRuleFindUniqueArgs} args - Arguments to find a CommissionRule
     * @example
     * // Get one CommissionRule
     * const commissionRule = await prisma.commissionRule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommissionRuleFindUniqueArgs>(args: SelectSubset<T, CommissionRuleFindUniqueArgs<ExtArgs>>): Prisma__CommissionRuleClient<$Result.GetResult<Prisma.$CommissionRulePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CommissionRule that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CommissionRuleFindUniqueOrThrowArgs} args - Arguments to find a CommissionRule
     * @example
     * // Get one CommissionRule
     * const commissionRule = await prisma.commissionRule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommissionRuleFindUniqueOrThrowArgs>(args: SelectSubset<T, CommissionRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommissionRuleClient<$Result.GetResult<Prisma.$CommissionRulePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CommissionRule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionRuleFindFirstArgs} args - Arguments to find a CommissionRule
     * @example
     * // Get one CommissionRule
     * const commissionRule = await prisma.commissionRule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommissionRuleFindFirstArgs>(args?: SelectSubset<T, CommissionRuleFindFirstArgs<ExtArgs>>): Prisma__CommissionRuleClient<$Result.GetResult<Prisma.$CommissionRulePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CommissionRule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionRuleFindFirstOrThrowArgs} args - Arguments to find a CommissionRule
     * @example
     * // Get one CommissionRule
     * const commissionRule = await prisma.commissionRule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommissionRuleFindFirstOrThrowArgs>(args?: SelectSubset<T, CommissionRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommissionRuleClient<$Result.GetResult<Prisma.$CommissionRulePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CommissionRules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionRuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CommissionRules
     * const commissionRules = await prisma.commissionRule.findMany()
     * 
     * // Get first 10 CommissionRules
     * const commissionRules = await prisma.commissionRule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commissionRuleWithIdOnly = await prisma.commissionRule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommissionRuleFindManyArgs>(args?: SelectSubset<T, CommissionRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommissionRulePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CommissionRule.
     * @param {CommissionRuleCreateArgs} args - Arguments to create a CommissionRule.
     * @example
     * // Create one CommissionRule
     * const CommissionRule = await prisma.commissionRule.create({
     *   data: {
     *     // ... data to create a CommissionRule
     *   }
     * })
     * 
     */
    create<T extends CommissionRuleCreateArgs>(args: SelectSubset<T, CommissionRuleCreateArgs<ExtArgs>>): Prisma__CommissionRuleClient<$Result.GetResult<Prisma.$CommissionRulePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CommissionRules.
     * @param {CommissionRuleCreateManyArgs} args - Arguments to create many CommissionRules.
     * @example
     * // Create many CommissionRules
     * const commissionRule = await prisma.commissionRule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommissionRuleCreateManyArgs>(args?: SelectSubset<T, CommissionRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CommissionRule.
     * @param {CommissionRuleDeleteArgs} args - Arguments to delete one CommissionRule.
     * @example
     * // Delete one CommissionRule
     * const CommissionRule = await prisma.commissionRule.delete({
     *   where: {
     *     // ... filter to delete one CommissionRule
     *   }
     * })
     * 
     */
    delete<T extends CommissionRuleDeleteArgs>(args: SelectSubset<T, CommissionRuleDeleteArgs<ExtArgs>>): Prisma__CommissionRuleClient<$Result.GetResult<Prisma.$CommissionRulePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CommissionRule.
     * @param {CommissionRuleUpdateArgs} args - Arguments to update one CommissionRule.
     * @example
     * // Update one CommissionRule
     * const commissionRule = await prisma.commissionRule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommissionRuleUpdateArgs>(args: SelectSubset<T, CommissionRuleUpdateArgs<ExtArgs>>): Prisma__CommissionRuleClient<$Result.GetResult<Prisma.$CommissionRulePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CommissionRules.
     * @param {CommissionRuleDeleteManyArgs} args - Arguments to filter CommissionRules to delete.
     * @example
     * // Delete a few CommissionRules
     * const { count } = await prisma.commissionRule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommissionRuleDeleteManyArgs>(args?: SelectSubset<T, CommissionRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CommissionRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionRuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CommissionRules
     * const commissionRule = await prisma.commissionRule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommissionRuleUpdateManyArgs>(args: SelectSubset<T, CommissionRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CommissionRule.
     * @param {CommissionRuleUpsertArgs} args - Arguments to update or create a CommissionRule.
     * @example
     * // Update or create a CommissionRule
     * const commissionRule = await prisma.commissionRule.upsert({
     *   create: {
     *     // ... data to create a CommissionRule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CommissionRule we want to update
     *   }
     * })
     */
    upsert<T extends CommissionRuleUpsertArgs>(args: SelectSubset<T, CommissionRuleUpsertArgs<ExtArgs>>): Prisma__CommissionRuleClient<$Result.GetResult<Prisma.$CommissionRulePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CommissionRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionRuleCountArgs} args - Arguments to filter CommissionRules to count.
     * @example
     * // Count the number of CommissionRules
     * const count = await prisma.commissionRule.count({
     *   where: {
     *     // ... the filter for the CommissionRules we want to count
     *   }
     * })
    **/
    count<T extends CommissionRuleCountArgs>(
      args?: Subset<T, CommissionRuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommissionRuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CommissionRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionRuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CommissionRuleAggregateArgs>(args: Subset<T, CommissionRuleAggregateArgs>): Prisma.PrismaPromise<GetCommissionRuleAggregateType<T>>

    /**
     * Group by CommissionRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionRuleGroupByArgs} args - Group by arguments.
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
      T extends CommissionRuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommissionRuleGroupByArgs['orderBy'] }
        : { orderBy?: CommissionRuleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CommissionRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommissionRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CommissionRule model
   */
  readonly fields: CommissionRuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CommissionRule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommissionRuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the CommissionRule model
   */ 
  interface CommissionRuleFieldRefs {
    readonly id: FieldRef<"CommissionRule", 'String'>
    readonly ruleName: FieldRef<"CommissionRule", 'String'>
    readonly connectorRate: FieldRef<"CommissionRule", 'Decimal'>
    readonly tlOverrideRate: FieldRef<"CommissionRule", 'Decimal'>
    readonly rmOverrideRate: FieldRef<"CommissionRule", 'Decimal'>
    readonly isActive: FieldRef<"CommissionRule", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * CommissionRule findUnique
   */
  export type CommissionRuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommissionRule
     */
    select?: CommissionRuleSelect<ExtArgs> | null
    /**
     * Filter, which CommissionRule to fetch.
     */
    where: CommissionRuleWhereUniqueInput
  }

  /**
   * CommissionRule findUniqueOrThrow
   */
  export type CommissionRuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommissionRule
     */
    select?: CommissionRuleSelect<ExtArgs> | null
    /**
     * Filter, which CommissionRule to fetch.
     */
    where: CommissionRuleWhereUniqueInput
  }

  /**
   * CommissionRule findFirst
   */
  export type CommissionRuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommissionRule
     */
    select?: CommissionRuleSelect<ExtArgs> | null
    /**
     * Filter, which CommissionRule to fetch.
     */
    where?: CommissionRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommissionRules to fetch.
     */
    orderBy?: CommissionRuleOrderByWithRelationInput | CommissionRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommissionRules.
     */
    cursor?: CommissionRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommissionRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommissionRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommissionRules.
     */
    distinct?: CommissionRuleScalarFieldEnum | CommissionRuleScalarFieldEnum[]
  }

  /**
   * CommissionRule findFirstOrThrow
   */
  export type CommissionRuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommissionRule
     */
    select?: CommissionRuleSelect<ExtArgs> | null
    /**
     * Filter, which CommissionRule to fetch.
     */
    where?: CommissionRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommissionRules to fetch.
     */
    orderBy?: CommissionRuleOrderByWithRelationInput | CommissionRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommissionRules.
     */
    cursor?: CommissionRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommissionRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommissionRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommissionRules.
     */
    distinct?: CommissionRuleScalarFieldEnum | CommissionRuleScalarFieldEnum[]
  }

  /**
   * CommissionRule findMany
   */
  export type CommissionRuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommissionRule
     */
    select?: CommissionRuleSelect<ExtArgs> | null
    /**
     * Filter, which CommissionRules to fetch.
     */
    where?: CommissionRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommissionRules to fetch.
     */
    orderBy?: CommissionRuleOrderByWithRelationInput | CommissionRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CommissionRules.
     */
    cursor?: CommissionRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommissionRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommissionRules.
     */
    skip?: number
    distinct?: CommissionRuleScalarFieldEnum | CommissionRuleScalarFieldEnum[]
  }

  /**
   * CommissionRule create
   */
  export type CommissionRuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommissionRule
     */
    select?: CommissionRuleSelect<ExtArgs> | null
    /**
     * The data needed to create a CommissionRule.
     */
    data: XOR<CommissionRuleCreateInput, CommissionRuleUncheckedCreateInput>
  }

  /**
   * CommissionRule createMany
   */
  export type CommissionRuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CommissionRules.
     */
    data: CommissionRuleCreateManyInput | CommissionRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CommissionRule update
   */
  export type CommissionRuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommissionRule
     */
    select?: CommissionRuleSelect<ExtArgs> | null
    /**
     * The data needed to update a CommissionRule.
     */
    data: XOR<CommissionRuleUpdateInput, CommissionRuleUncheckedUpdateInput>
    /**
     * Choose, which CommissionRule to update.
     */
    where: CommissionRuleWhereUniqueInput
  }

  /**
   * CommissionRule updateMany
   */
  export type CommissionRuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CommissionRules.
     */
    data: XOR<CommissionRuleUpdateManyMutationInput, CommissionRuleUncheckedUpdateManyInput>
    /**
     * Filter which CommissionRules to update
     */
    where?: CommissionRuleWhereInput
  }

  /**
   * CommissionRule upsert
   */
  export type CommissionRuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommissionRule
     */
    select?: CommissionRuleSelect<ExtArgs> | null
    /**
     * The filter to search for the CommissionRule to update in case it exists.
     */
    where: CommissionRuleWhereUniqueInput
    /**
     * In case the CommissionRule found by the `where` argument doesn't exist, create a new CommissionRule with this data.
     */
    create: XOR<CommissionRuleCreateInput, CommissionRuleUncheckedCreateInput>
    /**
     * In case the CommissionRule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommissionRuleUpdateInput, CommissionRuleUncheckedUpdateInput>
  }

  /**
   * CommissionRule delete
   */
  export type CommissionRuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommissionRule
     */
    select?: CommissionRuleSelect<ExtArgs> | null
    /**
     * Filter which CommissionRule to delete.
     */
    where: CommissionRuleWhereUniqueInput
  }

  /**
   * CommissionRule deleteMany
   */
  export type CommissionRuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommissionRules to delete
     */
    where?: CommissionRuleWhereInput
  }

  /**
   * CommissionRule without action
   */
  export type CommissionRuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommissionRule
     */
    select?: CommissionRuleSelect<ExtArgs> | null
  }


  /**
   * Model CommissionTransaction
   */

  export type AggregateCommissionTransaction = {
    _count: CommissionTransactionCountAggregateOutputType | null
    _avg: CommissionTransactionAvgAggregateOutputType | null
    _sum: CommissionTransactionSumAggregateOutputType | null
    _min: CommissionTransactionMinAggregateOutputType | null
    _max: CommissionTransactionMaxAggregateOutputType | null
  }

  export type CommissionTransactionAvgAggregateOutputType = {
    loanAmount: Decimal | null
    connectorRate: Decimal | null
    connectorCommission: Decimal | null
    teamLeaderOverride: Decimal | null
    rmOverride: Decimal | null
    totalPayout: Decimal | null
    amountPaid: Decimal | null
  }

  export type CommissionTransactionSumAggregateOutputType = {
    loanAmount: Decimal | null
    connectorRate: Decimal | null
    connectorCommission: Decimal | null
    teamLeaderOverride: Decimal | null
    rmOverride: Decimal | null
    totalPayout: Decimal | null
    amountPaid: Decimal | null
  }

  export type CommissionTransactionMinAggregateOutputType = {
    id: string | null
    loanId: string | null
    connectorId: string | null
    loanAmount: Decimal | null
    connectorRate: Decimal | null
    connectorCommission: Decimal | null
    teamLeaderOverride: Decimal | null
    rmOverride: Decimal | null
    totalPayout: Decimal | null
    status: string | null
    amountPaid: Decimal | null
    paymentDate: Date | null
    createdAt: Date | null
  }

  export type CommissionTransactionMaxAggregateOutputType = {
    id: string | null
    loanId: string | null
    connectorId: string | null
    loanAmount: Decimal | null
    connectorRate: Decimal | null
    connectorCommission: Decimal | null
    teamLeaderOverride: Decimal | null
    rmOverride: Decimal | null
    totalPayout: Decimal | null
    status: string | null
    amountPaid: Decimal | null
    paymentDate: Date | null
    createdAt: Date | null
  }

  export type CommissionTransactionCountAggregateOutputType = {
    id: number
    loanId: number
    connectorId: number
    loanAmount: number
    connectorRate: number
    connectorCommission: number
    teamLeaderOverride: number
    rmOverride: number
    totalPayout: number
    status: number
    amountPaid: number
    paymentDate: number
    createdAt: number
    _all: number
  }


  export type CommissionTransactionAvgAggregateInputType = {
    loanAmount?: true
    connectorRate?: true
    connectorCommission?: true
    teamLeaderOverride?: true
    rmOverride?: true
    totalPayout?: true
    amountPaid?: true
  }

  export type CommissionTransactionSumAggregateInputType = {
    loanAmount?: true
    connectorRate?: true
    connectorCommission?: true
    teamLeaderOverride?: true
    rmOverride?: true
    totalPayout?: true
    amountPaid?: true
  }

  export type CommissionTransactionMinAggregateInputType = {
    id?: true
    loanId?: true
    connectorId?: true
    loanAmount?: true
    connectorRate?: true
    connectorCommission?: true
    teamLeaderOverride?: true
    rmOverride?: true
    totalPayout?: true
    status?: true
    amountPaid?: true
    paymentDate?: true
    createdAt?: true
  }

  export type CommissionTransactionMaxAggregateInputType = {
    id?: true
    loanId?: true
    connectorId?: true
    loanAmount?: true
    connectorRate?: true
    connectorCommission?: true
    teamLeaderOverride?: true
    rmOverride?: true
    totalPayout?: true
    status?: true
    amountPaid?: true
    paymentDate?: true
    createdAt?: true
  }

  export type CommissionTransactionCountAggregateInputType = {
    id?: true
    loanId?: true
    connectorId?: true
    loanAmount?: true
    connectorRate?: true
    connectorCommission?: true
    teamLeaderOverride?: true
    rmOverride?: true
    totalPayout?: true
    status?: true
    amountPaid?: true
    paymentDate?: true
    createdAt?: true
    _all?: true
  }

  export type CommissionTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommissionTransaction to aggregate.
     */
    where?: CommissionTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommissionTransactions to fetch.
     */
    orderBy?: CommissionTransactionOrderByWithRelationInput | CommissionTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommissionTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommissionTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommissionTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CommissionTransactions
    **/
    _count?: true | CommissionTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommissionTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommissionTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommissionTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommissionTransactionMaxAggregateInputType
  }

  export type GetCommissionTransactionAggregateType<T extends CommissionTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateCommissionTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCommissionTransaction[P]>
      : GetScalarType<T[P], AggregateCommissionTransaction[P]>
  }




  export type CommissionTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommissionTransactionWhereInput
    orderBy?: CommissionTransactionOrderByWithAggregationInput | CommissionTransactionOrderByWithAggregationInput[]
    by: CommissionTransactionScalarFieldEnum[] | CommissionTransactionScalarFieldEnum
    having?: CommissionTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommissionTransactionCountAggregateInputType | true
    _avg?: CommissionTransactionAvgAggregateInputType
    _sum?: CommissionTransactionSumAggregateInputType
    _min?: CommissionTransactionMinAggregateInputType
    _max?: CommissionTransactionMaxAggregateInputType
  }

  export type CommissionTransactionGroupByOutputType = {
    id: string
    loanId: string
    connectorId: string
    loanAmount: Decimal
    connectorRate: Decimal
    connectorCommission: Decimal
    teamLeaderOverride: Decimal | null
    rmOverride: Decimal | null
    totalPayout: Decimal
    status: string
    amountPaid: Decimal
    paymentDate: Date | null
    createdAt: Date
    _count: CommissionTransactionCountAggregateOutputType | null
    _avg: CommissionTransactionAvgAggregateOutputType | null
    _sum: CommissionTransactionSumAggregateOutputType | null
    _min: CommissionTransactionMinAggregateOutputType | null
    _max: CommissionTransactionMaxAggregateOutputType | null
  }

  type GetCommissionTransactionGroupByPayload<T extends CommissionTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommissionTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommissionTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommissionTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], CommissionTransactionGroupByOutputType[P]>
        }
      >
    >


  export type CommissionTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanId?: boolean
    connectorId?: boolean
    loanAmount?: boolean
    connectorRate?: boolean
    connectorCommission?: boolean
    teamLeaderOverride?: boolean
    rmOverride?: boolean
    totalPayout?: boolean
    status?: boolean
    amountPaid?: boolean
    paymentDate?: boolean
    createdAt?: boolean
    connector?: boolean | ConnectorDefaultArgs<ExtArgs>
    payoutHistory?: boolean | CommissionTransaction$payoutHistoryArgs<ExtArgs>
    _count?: boolean | CommissionTransactionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commissionTransaction"]>


  export type CommissionTransactionSelectScalar = {
    id?: boolean
    loanId?: boolean
    connectorId?: boolean
    loanAmount?: boolean
    connectorRate?: boolean
    connectorCommission?: boolean
    teamLeaderOverride?: boolean
    rmOverride?: boolean
    totalPayout?: boolean
    status?: boolean
    amountPaid?: boolean
    paymentDate?: boolean
    createdAt?: boolean
  }

  export type CommissionTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connector?: boolean | ConnectorDefaultArgs<ExtArgs>
    payoutHistory?: boolean | CommissionTransaction$payoutHistoryArgs<ExtArgs>
    _count?: boolean | CommissionTransactionCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CommissionTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CommissionTransaction"
    objects: {
      connector: Prisma.$ConnectorPayload<ExtArgs>
      payoutHistory: Prisma.$PayoutHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      loanId: string
      connectorId: string
      loanAmount: Prisma.Decimal
      connectorRate: Prisma.Decimal
      connectorCommission: Prisma.Decimal
      teamLeaderOverride: Prisma.Decimal | null
      rmOverride: Prisma.Decimal | null
      totalPayout: Prisma.Decimal
      status: string
      amountPaid: Prisma.Decimal
      paymentDate: Date | null
      createdAt: Date
    }, ExtArgs["result"]["commissionTransaction"]>
    composites: {}
  }

  type CommissionTransactionGetPayload<S extends boolean | null | undefined | CommissionTransactionDefaultArgs> = $Result.GetResult<Prisma.$CommissionTransactionPayload, S>

  type CommissionTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CommissionTransactionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CommissionTransactionCountAggregateInputType | true
    }

  export interface CommissionTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CommissionTransaction'], meta: { name: 'CommissionTransaction' } }
    /**
     * Find zero or one CommissionTransaction that matches the filter.
     * @param {CommissionTransactionFindUniqueArgs} args - Arguments to find a CommissionTransaction
     * @example
     * // Get one CommissionTransaction
     * const commissionTransaction = await prisma.commissionTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommissionTransactionFindUniqueArgs>(args: SelectSubset<T, CommissionTransactionFindUniqueArgs<ExtArgs>>): Prisma__CommissionTransactionClient<$Result.GetResult<Prisma.$CommissionTransactionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CommissionTransaction that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CommissionTransactionFindUniqueOrThrowArgs} args - Arguments to find a CommissionTransaction
     * @example
     * // Get one CommissionTransaction
     * const commissionTransaction = await prisma.commissionTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommissionTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, CommissionTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommissionTransactionClient<$Result.GetResult<Prisma.$CommissionTransactionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CommissionTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionTransactionFindFirstArgs} args - Arguments to find a CommissionTransaction
     * @example
     * // Get one CommissionTransaction
     * const commissionTransaction = await prisma.commissionTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommissionTransactionFindFirstArgs>(args?: SelectSubset<T, CommissionTransactionFindFirstArgs<ExtArgs>>): Prisma__CommissionTransactionClient<$Result.GetResult<Prisma.$CommissionTransactionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CommissionTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionTransactionFindFirstOrThrowArgs} args - Arguments to find a CommissionTransaction
     * @example
     * // Get one CommissionTransaction
     * const commissionTransaction = await prisma.commissionTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommissionTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, CommissionTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommissionTransactionClient<$Result.GetResult<Prisma.$CommissionTransactionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CommissionTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CommissionTransactions
     * const commissionTransactions = await prisma.commissionTransaction.findMany()
     * 
     * // Get first 10 CommissionTransactions
     * const commissionTransactions = await prisma.commissionTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commissionTransactionWithIdOnly = await prisma.commissionTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommissionTransactionFindManyArgs>(args?: SelectSubset<T, CommissionTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommissionTransactionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CommissionTransaction.
     * @param {CommissionTransactionCreateArgs} args - Arguments to create a CommissionTransaction.
     * @example
     * // Create one CommissionTransaction
     * const CommissionTransaction = await prisma.commissionTransaction.create({
     *   data: {
     *     // ... data to create a CommissionTransaction
     *   }
     * })
     * 
     */
    create<T extends CommissionTransactionCreateArgs>(args: SelectSubset<T, CommissionTransactionCreateArgs<ExtArgs>>): Prisma__CommissionTransactionClient<$Result.GetResult<Prisma.$CommissionTransactionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CommissionTransactions.
     * @param {CommissionTransactionCreateManyArgs} args - Arguments to create many CommissionTransactions.
     * @example
     * // Create many CommissionTransactions
     * const commissionTransaction = await prisma.commissionTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommissionTransactionCreateManyArgs>(args?: SelectSubset<T, CommissionTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CommissionTransaction.
     * @param {CommissionTransactionDeleteArgs} args - Arguments to delete one CommissionTransaction.
     * @example
     * // Delete one CommissionTransaction
     * const CommissionTransaction = await prisma.commissionTransaction.delete({
     *   where: {
     *     // ... filter to delete one CommissionTransaction
     *   }
     * })
     * 
     */
    delete<T extends CommissionTransactionDeleteArgs>(args: SelectSubset<T, CommissionTransactionDeleteArgs<ExtArgs>>): Prisma__CommissionTransactionClient<$Result.GetResult<Prisma.$CommissionTransactionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CommissionTransaction.
     * @param {CommissionTransactionUpdateArgs} args - Arguments to update one CommissionTransaction.
     * @example
     * // Update one CommissionTransaction
     * const commissionTransaction = await prisma.commissionTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommissionTransactionUpdateArgs>(args: SelectSubset<T, CommissionTransactionUpdateArgs<ExtArgs>>): Prisma__CommissionTransactionClient<$Result.GetResult<Prisma.$CommissionTransactionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CommissionTransactions.
     * @param {CommissionTransactionDeleteManyArgs} args - Arguments to filter CommissionTransactions to delete.
     * @example
     * // Delete a few CommissionTransactions
     * const { count } = await prisma.commissionTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommissionTransactionDeleteManyArgs>(args?: SelectSubset<T, CommissionTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CommissionTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CommissionTransactions
     * const commissionTransaction = await prisma.commissionTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommissionTransactionUpdateManyArgs>(args: SelectSubset<T, CommissionTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CommissionTransaction.
     * @param {CommissionTransactionUpsertArgs} args - Arguments to update or create a CommissionTransaction.
     * @example
     * // Update or create a CommissionTransaction
     * const commissionTransaction = await prisma.commissionTransaction.upsert({
     *   create: {
     *     // ... data to create a CommissionTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CommissionTransaction we want to update
     *   }
     * })
     */
    upsert<T extends CommissionTransactionUpsertArgs>(args: SelectSubset<T, CommissionTransactionUpsertArgs<ExtArgs>>): Prisma__CommissionTransactionClient<$Result.GetResult<Prisma.$CommissionTransactionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CommissionTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionTransactionCountArgs} args - Arguments to filter CommissionTransactions to count.
     * @example
     * // Count the number of CommissionTransactions
     * const count = await prisma.commissionTransaction.count({
     *   where: {
     *     // ... the filter for the CommissionTransactions we want to count
     *   }
     * })
    **/
    count<T extends CommissionTransactionCountArgs>(
      args?: Subset<T, CommissionTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommissionTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CommissionTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CommissionTransactionAggregateArgs>(args: Subset<T, CommissionTransactionAggregateArgs>): Prisma.PrismaPromise<GetCommissionTransactionAggregateType<T>>

    /**
     * Group by CommissionTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionTransactionGroupByArgs} args - Group by arguments.
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
      T extends CommissionTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommissionTransactionGroupByArgs['orderBy'] }
        : { orderBy?: CommissionTransactionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CommissionTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommissionTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CommissionTransaction model
   */
  readonly fields: CommissionTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CommissionTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommissionTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    connector<T extends ConnectorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConnectorDefaultArgs<ExtArgs>>): Prisma__ConnectorClient<$Result.GetResult<Prisma.$ConnectorPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    payoutHistory<T extends CommissionTransaction$payoutHistoryArgs<ExtArgs> = {}>(args?: Subset<T, CommissionTransaction$payoutHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayoutHistoryPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the CommissionTransaction model
   */ 
  interface CommissionTransactionFieldRefs {
    readonly id: FieldRef<"CommissionTransaction", 'String'>
    readonly loanId: FieldRef<"CommissionTransaction", 'String'>
    readonly connectorId: FieldRef<"CommissionTransaction", 'String'>
    readonly loanAmount: FieldRef<"CommissionTransaction", 'Decimal'>
    readonly connectorRate: FieldRef<"CommissionTransaction", 'Decimal'>
    readonly connectorCommission: FieldRef<"CommissionTransaction", 'Decimal'>
    readonly teamLeaderOverride: FieldRef<"CommissionTransaction", 'Decimal'>
    readonly rmOverride: FieldRef<"CommissionTransaction", 'Decimal'>
    readonly totalPayout: FieldRef<"CommissionTransaction", 'Decimal'>
    readonly status: FieldRef<"CommissionTransaction", 'String'>
    readonly amountPaid: FieldRef<"CommissionTransaction", 'Decimal'>
    readonly paymentDate: FieldRef<"CommissionTransaction", 'DateTime'>
    readonly createdAt: FieldRef<"CommissionTransaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CommissionTransaction findUnique
   */
  export type CommissionTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommissionTransaction
     */
    select?: CommissionTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionTransactionInclude<ExtArgs> | null
    /**
     * Filter, which CommissionTransaction to fetch.
     */
    where: CommissionTransactionWhereUniqueInput
  }

  /**
   * CommissionTransaction findUniqueOrThrow
   */
  export type CommissionTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommissionTransaction
     */
    select?: CommissionTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionTransactionInclude<ExtArgs> | null
    /**
     * Filter, which CommissionTransaction to fetch.
     */
    where: CommissionTransactionWhereUniqueInput
  }

  /**
   * CommissionTransaction findFirst
   */
  export type CommissionTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommissionTransaction
     */
    select?: CommissionTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionTransactionInclude<ExtArgs> | null
    /**
     * Filter, which CommissionTransaction to fetch.
     */
    where?: CommissionTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommissionTransactions to fetch.
     */
    orderBy?: CommissionTransactionOrderByWithRelationInput | CommissionTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommissionTransactions.
     */
    cursor?: CommissionTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommissionTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommissionTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommissionTransactions.
     */
    distinct?: CommissionTransactionScalarFieldEnum | CommissionTransactionScalarFieldEnum[]
  }

  /**
   * CommissionTransaction findFirstOrThrow
   */
  export type CommissionTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommissionTransaction
     */
    select?: CommissionTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionTransactionInclude<ExtArgs> | null
    /**
     * Filter, which CommissionTransaction to fetch.
     */
    where?: CommissionTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommissionTransactions to fetch.
     */
    orderBy?: CommissionTransactionOrderByWithRelationInput | CommissionTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommissionTransactions.
     */
    cursor?: CommissionTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommissionTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommissionTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommissionTransactions.
     */
    distinct?: CommissionTransactionScalarFieldEnum | CommissionTransactionScalarFieldEnum[]
  }

  /**
   * CommissionTransaction findMany
   */
  export type CommissionTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommissionTransaction
     */
    select?: CommissionTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionTransactionInclude<ExtArgs> | null
    /**
     * Filter, which CommissionTransactions to fetch.
     */
    where?: CommissionTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommissionTransactions to fetch.
     */
    orderBy?: CommissionTransactionOrderByWithRelationInput | CommissionTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CommissionTransactions.
     */
    cursor?: CommissionTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommissionTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommissionTransactions.
     */
    skip?: number
    distinct?: CommissionTransactionScalarFieldEnum | CommissionTransactionScalarFieldEnum[]
  }

  /**
   * CommissionTransaction create
   */
  export type CommissionTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommissionTransaction
     */
    select?: CommissionTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a CommissionTransaction.
     */
    data: XOR<CommissionTransactionCreateInput, CommissionTransactionUncheckedCreateInput>
  }

  /**
   * CommissionTransaction createMany
   */
  export type CommissionTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CommissionTransactions.
     */
    data: CommissionTransactionCreateManyInput | CommissionTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CommissionTransaction update
   */
  export type CommissionTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommissionTransaction
     */
    select?: CommissionTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a CommissionTransaction.
     */
    data: XOR<CommissionTransactionUpdateInput, CommissionTransactionUncheckedUpdateInput>
    /**
     * Choose, which CommissionTransaction to update.
     */
    where: CommissionTransactionWhereUniqueInput
  }

  /**
   * CommissionTransaction updateMany
   */
  export type CommissionTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CommissionTransactions.
     */
    data: XOR<CommissionTransactionUpdateManyMutationInput, CommissionTransactionUncheckedUpdateManyInput>
    /**
     * Filter which CommissionTransactions to update
     */
    where?: CommissionTransactionWhereInput
  }

  /**
   * CommissionTransaction upsert
   */
  export type CommissionTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommissionTransaction
     */
    select?: CommissionTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the CommissionTransaction to update in case it exists.
     */
    where: CommissionTransactionWhereUniqueInput
    /**
     * In case the CommissionTransaction found by the `where` argument doesn't exist, create a new CommissionTransaction with this data.
     */
    create: XOR<CommissionTransactionCreateInput, CommissionTransactionUncheckedCreateInput>
    /**
     * In case the CommissionTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommissionTransactionUpdateInput, CommissionTransactionUncheckedUpdateInput>
  }

  /**
   * CommissionTransaction delete
   */
  export type CommissionTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommissionTransaction
     */
    select?: CommissionTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionTransactionInclude<ExtArgs> | null
    /**
     * Filter which CommissionTransaction to delete.
     */
    where: CommissionTransactionWhereUniqueInput
  }

  /**
   * CommissionTransaction deleteMany
   */
  export type CommissionTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommissionTransactions to delete
     */
    where?: CommissionTransactionWhereInput
  }

  /**
   * CommissionTransaction.payoutHistory
   */
  export type CommissionTransaction$payoutHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutHistory
     */
    select?: PayoutHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutHistoryInclude<ExtArgs> | null
    where?: PayoutHistoryWhereInput
    orderBy?: PayoutHistoryOrderByWithRelationInput | PayoutHistoryOrderByWithRelationInput[]
    cursor?: PayoutHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PayoutHistoryScalarFieldEnum | PayoutHistoryScalarFieldEnum[]
  }

  /**
   * CommissionTransaction without action
   */
  export type CommissionTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommissionTransaction
     */
    select?: CommissionTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionTransactionInclude<ExtArgs> | null
  }


  /**
   * Model PayoutHistory
   */

  export type AggregatePayoutHistory = {
    _count: PayoutHistoryCountAggregateOutputType | null
    _avg: PayoutHistoryAvgAggregateOutputType | null
    _sum: PayoutHistorySumAggregateOutputType | null
    _min: PayoutHistoryMinAggregateOutputType | null
    _max: PayoutHistoryMaxAggregateOutputType | null
  }

  export type PayoutHistoryAvgAggregateOutputType = {
    paidAmount: Decimal | null
  }

  export type PayoutHistorySumAggregateOutputType = {
    paidAmount: Decimal | null
  }

  export type PayoutHistoryMinAggregateOutputType = {
    id: string | null
    transactionId: string | null
    paidAmount: Decimal | null
    paidAt: Date | null
    paidBy: string | null
  }

  export type PayoutHistoryMaxAggregateOutputType = {
    id: string | null
    transactionId: string | null
    paidAmount: Decimal | null
    paidAt: Date | null
    paidBy: string | null
  }

  export type PayoutHistoryCountAggregateOutputType = {
    id: number
    transactionId: number
    paidAmount: number
    paidAt: number
    paidBy: number
    _all: number
  }


  export type PayoutHistoryAvgAggregateInputType = {
    paidAmount?: true
  }

  export type PayoutHistorySumAggregateInputType = {
    paidAmount?: true
  }

  export type PayoutHistoryMinAggregateInputType = {
    id?: true
    transactionId?: true
    paidAmount?: true
    paidAt?: true
    paidBy?: true
  }

  export type PayoutHistoryMaxAggregateInputType = {
    id?: true
    transactionId?: true
    paidAmount?: true
    paidAt?: true
    paidBy?: true
  }

  export type PayoutHistoryCountAggregateInputType = {
    id?: true
    transactionId?: true
    paidAmount?: true
    paidAt?: true
    paidBy?: true
    _all?: true
  }

  export type PayoutHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PayoutHistory to aggregate.
     */
    where?: PayoutHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayoutHistories to fetch.
     */
    orderBy?: PayoutHistoryOrderByWithRelationInput | PayoutHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PayoutHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayoutHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayoutHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PayoutHistories
    **/
    _count?: true | PayoutHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PayoutHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PayoutHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PayoutHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PayoutHistoryMaxAggregateInputType
  }

  export type GetPayoutHistoryAggregateType<T extends PayoutHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregatePayoutHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayoutHistory[P]>
      : GetScalarType<T[P], AggregatePayoutHistory[P]>
  }




  export type PayoutHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PayoutHistoryWhereInput
    orderBy?: PayoutHistoryOrderByWithAggregationInput | PayoutHistoryOrderByWithAggregationInput[]
    by: PayoutHistoryScalarFieldEnum[] | PayoutHistoryScalarFieldEnum
    having?: PayoutHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PayoutHistoryCountAggregateInputType | true
    _avg?: PayoutHistoryAvgAggregateInputType
    _sum?: PayoutHistorySumAggregateInputType
    _min?: PayoutHistoryMinAggregateInputType
    _max?: PayoutHistoryMaxAggregateInputType
  }

  export type PayoutHistoryGroupByOutputType = {
    id: string
    transactionId: string | null
    paidAmount: Decimal
    paidAt: Date
    paidBy: string | null
    _count: PayoutHistoryCountAggregateOutputType | null
    _avg: PayoutHistoryAvgAggregateOutputType | null
    _sum: PayoutHistorySumAggregateOutputType | null
    _min: PayoutHistoryMinAggregateOutputType | null
    _max: PayoutHistoryMaxAggregateOutputType | null
  }

  type GetPayoutHistoryGroupByPayload<T extends PayoutHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PayoutHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PayoutHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PayoutHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], PayoutHistoryGroupByOutputType[P]>
        }
      >
    >


  export type PayoutHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transactionId?: boolean
    paidAmount?: boolean
    paidAt?: boolean
    paidBy?: boolean
    transaction?: boolean | PayoutHistory$transactionArgs<ExtArgs>
  }, ExtArgs["result"]["payoutHistory"]>


  export type PayoutHistorySelectScalar = {
    id?: boolean
    transactionId?: boolean
    paidAmount?: boolean
    paidAt?: boolean
    paidBy?: boolean
  }

  export type PayoutHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaction?: boolean | PayoutHistory$transactionArgs<ExtArgs>
  }

  export type $PayoutHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PayoutHistory"
    objects: {
      transaction: Prisma.$CommissionTransactionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      transactionId: string | null
      paidAmount: Prisma.Decimal
      paidAt: Date
      paidBy: string | null
    }, ExtArgs["result"]["payoutHistory"]>
    composites: {}
  }

  type PayoutHistoryGetPayload<S extends boolean | null | undefined | PayoutHistoryDefaultArgs> = $Result.GetResult<Prisma.$PayoutHistoryPayload, S>

  type PayoutHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PayoutHistoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PayoutHistoryCountAggregateInputType | true
    }

  export interface PayoutHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PayoutHistory'], meta: { name: 'PayoutHistory' } }
    /**
     * Find zero or one PayoutHistory that matches the filter.
     * @param {PayoutHistoryFindUniqueArgs} args - Arguments to find a PayoutHistory
     * @example
     * // Get one PayoutHistory
     * const payoutHistory = await prisma.payoutHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PayoutHistoryFindUniqueArgs>(args: SelectSubset<T, PayoutHistoryFindUniqueArgs<ExtArgs>>): Prisma__PayoutHistoryClient<$Result.GetResult<Prisma.$PayoutHistoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PayoutHistory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PayoutHistoryFindUniqueOrThrowArgs} args - Arguments to find a PayoutHistory
     * @example
     * // Get one PayoutHistory
     * const payoutHistory = await prisma.payoutHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PayoutHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, PayoutHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PayoutHistoryClient<$Result.GetResult<Prisma.$PayoutHistoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PayoutHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutHistoryFindFirstArgs} args - Arguments to find a PayoutHistory
     * @example
     * // Get one PayoutHistory
     * const payoutHistory = await prisma.payoutHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PayoutHistoryFindFirstArgs>(args?: SelectSubset<T, PayoutHistoryFindFirstArgs<ExtArgs>>): Prisma__PayoutHistoryClient<$Result.GetResult<Prisma.$PayoutHistoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PayoutHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutHistoryFindFirstOrThrowArgs} args - Arguments to find a PayoutHistory
     * @example
     * // Get one PayoutHistory
     * const payoutHistory = await prisma.payoutHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PayoutHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, PayoutHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__PayoutHistoryClient<$Result.GetResult<Prisma.$PayoutHistoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PayoutHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PayoutHistories
     * const payoutHistories = await prisma.payoutHistory.findMany()
     * 
     * // Get first 10 PayoutHistories
     * const payoutHistories = await prisma.payoutHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const payoutHistoryWithIdOnly = await prisma.payoutHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PayoutHistoryFindManyArgs>(args?: SelectSubset<T, PayoutHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayoutHistoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PayoutHistory.
     * @param {PayoutHistoryCreateArgs} args - Arguments to create a PayoutHistory.
     * @example
     * // Create one PayoutHistory
     * const PayoutHistory = await prisma.payoutHistory.create({
     *   data: {
     *     // ... data to create a PayoutHistory
     *   }
     * })
     * 
     */
    create<T extends PayoutHistoryCreateArgs>(args: SelectSubset<T, PayoutHistoryCreateArgs<ExtArgs>>): Prisma__PayoutHistoryClient<$Result.GetResult<Prisma.$PayoutHistoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PayoutHistories.
     * @param {PayoutHistoryCreateManyArgs} args - Arguments to create many PayoutHistories.
     * @example
     * // Create many PayoutHistories
     * const payoutHistory = await prisma.payoutHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PayoutHistoryCreateManyArgs>(args?: SelectSubset<T, PayoutHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PayoutHistory.
     * @param {PayoutHistoryDeleteArgs} args - Arguments to delete one PayoutHistory.
     * @example
     * // Delete one PayoutHistory
     * const PayoutHistory = await prisma.payoutHistory.delete({
     *   where: {
     *     // ... filter to delete one PayoutHistory
     *   }
     * })
     * 
     */
    delete<T extends PayoutHistoryDeleteArgs>(args: SelectSubset<T, PayoutHistoryDeleteArgs<ExtArgs>>): Prisma__PayoutHistoryClient<$Result.GetResult<Prisma.$PayoutHistoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PayoutHistory.
     * @param {PayoutHistoryUpdateArgs} args - Arguments to update one PayoutHistory.
     * @example
     * // Update one PayoutHistory
     * const payoutHistory = await prisma.payoutHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PayoutHistoryUpdateArgs>(args: SelectSubset<T, PayoutHistoryUpdateArgs<ExtArgs>>): Prisma__PayoutHistoryClient<$Result.GetResult<Prisma.$PayoutHistoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PayoutHistories.
     * @param {PayoutHistoryDeleteManyArgs} args - Arguments to filter PayoutHistories to delete.
     * @example
     * // Delete a few PayoutHistories
     * const { count } = await prisma.payoutHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PayoutHistoryDeleteManyArgs>(args?: SelectSubset<T, PayoutHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PayoutHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PayoutHistories
     * const payoutHistory = await prisma.payoutHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PayoutHistoryUpdateManyArgs>(args: SelectSubset<T, PayoutHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PayoutHistory.
     * @param {PayoutHistoryUpsertArgs} args - Arguments to update or create a PayoutHistory.
     * @example
     * // Update or create a PayoutHistory
     * const payoutHistory = await prisma.payoutHistory.upsert({
     *   create: {
     *     // ... data to create a PayoutHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PayoutHistory we want to update
     *   }
     * })
     */
    upsert<T extends PayoutHistoryUpsertArgs>(args: SelectSubset<T, PayoutHistoryUpsertArgs<ExtArgs>>): Prisma__PayoutHistoryClient<$Result.GetResult<Prisma.$PayoutHistoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PayoutHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutHistoryCountArgs} args - Arguments to filter PayoutHistories to count.
     * @example
     * // Count the number of PayoutHistories
     * const count = await prisma.payoutHistory.count({
     *   where: {
     *     // ... the filter for the PayoutHistories we want to count
     *   }
     * })
    **/
    count<T extends PayoutHistoryCountArgs>(
      args?: Subset<T, PayoutHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PayoutHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PayoutHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PayoutHistoryAggregateArgs>(args: Subset<T, PayoutHistoryAggregateArgs>): Prisma.PrismaPromise<GetPayoutHistoryAggregateType<T>>

    /**
     * Group by PayoutHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutHistoryGroupByArgs} args - Group by arguments.
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
      T extends PayoutHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PayoutHistoryGroupByArgs['orderBy'] }
        : { orderBy?: PayoutHistoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PayoutHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPayoutHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PayoutHistory model
   */
  readonly fields: PayoutHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PayoutHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PayoutHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    transaction<T extends PayoutHistory$transactionArgs<ExtArgs> = {}>(args?: Subset<T, PayoutHistory$transactionArgs<ExtArgs>>): Prisma__CommissionTransactionClient<$Result.GetResult<Prisma.$CommissionTransactionPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the PayoutHistory model
   */ 
  interface PayoutHistoryFieldRefs {
    readonly id: FieldRef<"PayoutHistory", 'String'>
    readonly transactionId: FieldRef<"PayoutHistory", 'String'>
    readonly paidAmount: FieldRef<"PayoutHistory", 'Decimal'>
    readonly paidAt: FieldRef<"PayoutHistory", 'DateTime'>
    readonly paidBy: FieldRef<"PayoutHistory", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PayoutHistory findUnique
   */
  export type PayoutHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutHistory
     */
    select?: PayoutHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PayoutHistory to fetch.
     */
    where: PayoutHistoryWhereUniqueInput
  }

  /**
   * PayoutHistory findUniqueOrThrow
   */
  export type PayoutHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutHistory
     */
    select?: PayoutHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PayoutHistory to fetch.
     */
    where: PayoutHistoryWhereUniqueInput
  }

  /**
   * PayoutHistory findFirst
   */
  export type PayoutHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutHistory
     */
    select?: PayoutHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PayoutHistory to fetch.
     */
    where?: PayoutHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayoutHistories to fetch.
     */
    orderBy?: PayoutHistoryOrderByWithRelationInput | PayoutHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PayoutHistories.
     */
    cursor?: PayoutHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayoutHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayoutHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PayoutHistories.
     */
    distinct?: PayoutHistoryScalarFieldEnum | PayoutHistoryScalarFieldEnum[]
  }

  /**
   * PayoutHistory findFirstOrThrow
   */
  export type PayoutHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutHistory
     */
    select?: PayoutHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PayoutHistory to fetch.
     */
    where?: PayoutHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayoutHistories to fetch.
     */
    orderBy?: PayoutHistoryOrderByWithRelationInput | PayoutHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PayoutHistories.
     */
    cursor?: PayoutHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayoutHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayoutHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PayoutHistories.
     */
    distinct?: PayoutHistoryScalarFieldEnum | PayoutHistoryScalarFieldEnum[]
  }

  /**
   * PayoutHistory findMany
   */
  export type PayoutHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutHistory
     */
    select?: PayoutHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PayoutHistories to fetch.
     */
    where?: PayoutHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayoutHistories to fetch.
     */
    orderBy?: PayoutHistoryOrderByWithRelationInput | PayoutHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PayoutHistories.
     */
    cursor?: PayoutHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayoutHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayoutHistories.
     */
    skip?: number
    distinct?: PayoutHistoryScalarFieldEnum | PayoutHistoryScalarFieldEnum[]
  }

  /**
   * PayoutHistory create
   */
  export type PayoutHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutHistory
     */
    select?: PayoutHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a PayoutHistory.
     */
    data: XOR<PayoutHistoryCreateInput, PayoutHistoryUncheckedCreateInput>
  }

  /**
   * PayoutHistory createMany
   */
  export type PayoutHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PayoutHistories.
     */
    data: PayoutHistoryCreateManyInput | PayoutHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PayoutHistory update
   */
  export type PayoutHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutHistory
     */
    select?: PayoutHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a PayoutHistory.
     */
    data: XOR<PayoutHistoryUpdateInput, PayoutHistoryUncheckedUpdateInput>
    /**
     * Choose, which PayoutHistory to update.
     */
    where: PayoutHistoryWhereUniqueInput
  }

  /**
   * PayoutHistory updateMany
   */
  export type PayoutHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PayoutHistories.
     */
    data: XOR<PayoutHistoryUpdateManyMutationInput, PayoutHistoryUncheckedUpdateManyInput>
    /**
     * Filter which PayoutHistories to update
     */
    where?: PayoutHistoryWhereInput
  }

  /**
   * PayoutHistory upsert
   */
  export type PayoutHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutHistory
     */
    select?: PayoutHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the PayoutHistory to update in case it exists.
     */
    where: PayoutHistoryWhereUniqueInput
    /**
     * In case the PayoutHistory found by the `where` argument doesn't exist, create a new PayoutHistory with this data.
     */
    create: XOR<PayoutHistoryCreateInput, PayoutHistoryUncheckedCreateInput>
    /**
     * In case the PayoutHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PayoutHistoryUpdateInput, PayoutHistoryUncheckedUpdateInput>
  }

  /**
   * PayoutHistory delete
   */
  export type PayoutHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutHistory
     */
    select?: PayoutHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutHistoryInclude<ExtArgs> | null
    /**
     * Filter which PayoutHistory to delete.
     */
    where: PayoutHistoryWhereUniqueInput
  }

  /**
   * PayoutHistory deleteMany
   */
  export type PayoutHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PayoutHistories to delete
     */
    where?: PayoutHistoryWhereInput
  }

  /**
   * PayoutHistory.transaction
   */
  export type PayoutHistory$transactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommissionTransaction
     */
    select?: CommissionTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionTransactionInclude<ExtArgs> | null
    where?: CommissionTransactionWhereInput
  }

  /**
   * PayoutHistory without action
   */
  export type PayoutHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutHistory
     */
    select?: PayoutHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutHistoryInclude<ExtArgs> | null
  }


  /**
   * Model PayoutSlab
   */

  export type AggregatePayoutSlab = {
    _count: PayoutSlabCountAggregateOutputType | null
    _avg: PayoutSlabAvgAggregateOutputType | null
    _sum: PayoutSlabSumAggregateOutputType | null
    _min: PayoutSlabMinAggregateOutputType | null
    _max: PayoutSlabMaxAggregateOutputType | null
  }

  export type PayoutSlabAvgAggregateOutputType = {
    payoutRate: Decimal | null
    minDisbursementAmount: Decimal | null
  }

  export type PayoutSlabSumAggregateOutputType = {
    payoutRate: Decimal | null
    minDisbursementAmount: Decimal | null
  }

  export type PayoutSlabMinAggregateOutputType = {
    id: string | null
    connectorId: string | null
    bankName: string | null
    productCategory: string | null
    payoutRate: Decimal | null
    minDisbursementAmount: Decimal | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PayoutSlabMaxAggregateOutputType = {
    id: string | null
    connectorId: string | null
    bankName: string | null
    productCategory: string | null
    payoutRate: Decimal | null
    minDisbursementAmount: Decimal | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PayoutSlabCountAggregateOutputType = {
    id: number
    connectorId: number
    bankName: number
    productCategory: number
    payoutRate: number
    minDisbursementAmount: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PayoutSlabAvgAggregateInputType = {
    payoutRate?: true
    minDisbursementAmount?: true
  }

  export type PayoutSlabSumAggregateInputType = {
    payoutRate?: true
    minDisbursementAmount?: true
  }

  export type PayoutSlabMinAggregateInputType = {
    id?: true
    connectorId?: true
    bankName?: true
    productCategory?: true
    payoutRate?: true
    minDisbursementAmount?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PayoutSlabMaxAggregateInputType = {
    id?: true
    connectorId?: true
    bankName?: true
    productCategory?: true
    payoutRate?: true
    minDisbursementAmount?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PayoutSlabCountAggregateInputType = {
    id?: true
    connectorId?: true
    bankName?: true
    productCategory?: true
    payoutRate?: true
    minDisbursementAmount?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PayoutSlabAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PayoutSlab to aggregate.
     */
    where?: PayoutSlabWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayoutSlabs to fetch.
     */
    orderBy?: PayoutSlabOrderByWithRelationInput | PayoutSlabOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PayoutSlabWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayoutSlabs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayoutSlabs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PayoutSlabs
    **/
    _count?: true | PayoutSlabCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PayoutSlabAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PayoutSlabSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PayoutSlabMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PayoutSlabMaxAggregateInputType
  }

  export type GetPayoutSlabAggregateType<T extends PayoutSlabAggregateArgs> = {
        [P in keyof T & keyof AggregatePayoutSlab]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayoutSlab[P]>
      : GetScalarType<T[P], AggregatePayoutSlab[P]>
  }




  export type PayoutSlabGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PayoutSlabWhereInput
    orderBy?: PayoutSlabOrderByWithAggregationInput | PayoutSlabOrderByWithAggregationInput[]
    by: PayoutSlabScalarFieldEnum[] | PayoutSlabScalarFieldEnum
    having?: PayoutSlabScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PayoutSlabCountAggregateInputType | true
    _avg?: PayoutSlabAvgAggregateInputType
    _sum?: PayoutSlabSumAggregateInputType
    _min?: PayoutSlabMinAggregateInputType
    _max?: PayoutSlabMaxAggregateInputType
  }

  export type PayoutSlabGroupByOutputType = {
    id: string
    connectorId: string | null
    bankName: string
    productCategory: string
    payoutRate: Decimal
    minDisbursementAmount: Decimal | null
    status: string
    createdAt: Date
    updatedAt: Date | null
    _count: PayoutSlabCountAggregateOutputType | null
    _avg: PayoutSlabAvgAggregateOutputType | null
    _sum: PayoutSlabSumAggregateOutputType | null
    _min: PayoutSlabMinAggregateOutputType | null
    _max: PayoutSlabMaxAggregateOutputType | null
  }

  type GetPayoutSlabGroupByPayload<T extends PayoutSlabGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PayoutSlabGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PayoutSlabGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PayoutSlabGroupByOutputType[P]>
            : GetScalarType<T[P], PayoutSlabGroupByOutputType[P]>
        }
      >
    >


  export type PayoutSlabSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    connectorId?: boolean
    bankName?: boolean
    productCategory?: boolean
    payoutRate?: boolean
    minDisbursementAmount?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    connector?: boolean | PayoutSlab$connectorArgs<ExtArgs>
  }, ExtArgs["result"]["payoutSlab"]>


  export type PayoutSlabSelectScalar = {
    id?: boolean
    connectorId?: boolean
    bankName?: boolean
    productCategory?: boolean
    payoutRate?: boolean
    minDisbursementAmount?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PayoutSlabInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connector?: boolean | PayoutSlab$connectorArgs<ExtArgs>
  }

  export type $PayoutSlabPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PayoutSlab"
    objects: {
      connector: Prisma.$ConnectorPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      connectorId: string | null
      bankName: string
      productCategory: string
      payoutRate: Prisma.Decimal
      minDisbursementAmount: Prisma.Decimal | null
      status: string
      createdAt: Date
      updatedAt: Date | null
    }, ExtArgs["result"]["payoutSlab"]>
    composites: {}
  }

  type PayoutSlabGetPayload<S extends boolean | null | undefined | PayoutSlabDefaultArgs> = $Result.GetResult<Prisma.$PayoutSlabPayload, S>

  type PayoutSlabCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PayoutSlabFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PayoutSlabCountAggregateInputType | true
    }

  export interface PayoutSlabDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PayoutSlab'], meta: { name: 'PayoutSlab' } }
    /**
     * Find zero or one PayoutSlab that matches the filter.
     * @param {PayoutSlabFindUniqueArgs} args - Arguments to find a PayoutSlab
     * @example
     * // Get one PayoutSlab
     * const payoutSlab = await prisma.payoutSlab.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PayoutSlabFindUniqueArgs>(args: SelectSubset<T, PayoutSlabFindUniqueArgs<ExtArgs>>): Prisma__PayoutSlabClient<$Result.GetResult<Prisma.$PayoutSlabPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PayoutSlab that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PayoutSlabFindUniqueOrThrowArgs} args - Arguments to find a PayoutSlab
     * @example
     * // Get one PayoutSlab
     * const payoutSlab = await prisma.payoutSlab.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PayoutSlabFindUniqueOrThrowArgs>(args: SelectSubset<T, PayoutSlabFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PayoutSlabClient<$Result.GetResult<Prisma.$PayoutSlabPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PayoutSlab that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutSlabFindFirstArgs} args - Arguments to find a PayoutSlab
     * @example
     * // Get one PayoutSlab
     * const payoutSlab = await prisma.payoutSlab.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PayoutSlabFindFirstArgs>(args?: SelectSubset<T, PayoutSlabFindFirstArgs<ExtArgs>>): Prisma__PayoutSlabClient<$Result.GetResult<Prisma.$PayoutSlabPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PayoutSlab that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutSlabFindFirstOrThrowArgs} args - Arguments to find a PayoutSlab
     * @example
     * // Get one PayoutSlab
     * const payoutSlab = await prisma.payoutSlab.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PayoutSlabFindFirstOrThrowArgs>(args?: SelectSubset<T, PayoutSlabFindFirstOrThrowArgs<ExtArgs>>): Prisma__PayoutSlabClient<$Result.GetResult<Prisma.$PayoutSlabPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PayoutSlabs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutSlabFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PayoutSlabs
     * const payoutSlabs = await prisma.payoutSlab.findMany()
     * 
     * // Get first 10 PayoutSlabs
     * const payoutSlabs = await prisma.payoutSlab.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const payoutSlabWithIdOnly = await prisma.payoutSlab.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PayoutSlabFindManyArgs>(args?: SelectSubset<T, PayoutSlabFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayoutSlabPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PayoutSlab.
     * @param {PayoutSlabCreateArgs} args - Arguments to create a PayoutSlab.
     * @example
     * // Create one PayoutSlab
     * const PayoutSlab = await prisma.payoutSlab.create({
     *   data: {
     *     // ... data to create a PayoutSlab
     *   }
     * })
     * 
     */
    create<T extends PayoutSlabCreateArgs>(args: SelectSubset<T, PayoutSlabCreateArgs<ExtArgs>>): Prisma__PayoutSlabClient<$Result.GetResult<Prisma.$PayoutSlabPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PayoutSlabs.
     * @param {PayoutSlabCreateManyArgs} args - Arguments to create many PayoutSlabs.
     * @example
     * // Create many PayoutSlabs
     * const payoutSlab = await prisma.payoutSlab.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PayoutSlabCreateManyArgs>(args?: SelectSubset<T, PayoutSlabCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PayoutSlab.
     * @param {PayoutSlabDeleteArgs} args - Arguments to delete one PayoutSlab.
     * @example
     * // Delete one PayoutSlab
     * const PayoutSlab = await prisma.payoutSlab.delete({
     *   where: {
     *     // ... filter to delete one PayoutSlab
     *   }
     * })
     * 
     */
    delete<T extends PayoutSlabDeleteArgs>(args: SelectSubset<T, PayoutSlabDeleteArgs<ExtArgs>>): Prisma__PayoutSlabClient<$Result.GetResult<Prisma.$PayoutSlabPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PayoutSlab.
     * @param {PayoutSlabUpdateArgs} args - Arguments to update one PayoutSlab.
     * @example
     * // Update one PayoutSlab
     * const payoutSlab = await prisma.payoutSlab.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PayoutSlabUpdateArgs>(args: SelectSubset<T, PayoutSlabUpdateArgs<ExtArgs>>): Prisma__PayoutSlabClient<$Result.GetResult<Prisma.$PayoutSlabPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PayoutSlabs.
     * @param {PayoutSlabDeleteManyArgs} args - Arguments to filter PayoutSlabs to delete.
     * @example
     * // Delete a few PayoutSlabs
     * const { count } = await prisma.payoutSlab.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PayoutSlabDeleteManyArgs>(args?: SelectSubset<T, PayoutSlabDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PayoutSlabs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutSlabUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PayoutSlabs
     * const payoutSlab = await prisma.payoutSlab.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PayoutSlabUpdateManyArgs>(args: SelectSubset<T, PayoutSlabUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PayoutSlab.
     * @param {PayoutSlabUpsertArgs} args - Arguments to update or create a PayoutSlab.
     * @example
     * // Update or create a PayoutSlab
     * const payoutSlab = await prisma.payoutSlab.upsert({
     *   create: {
     *     // ... data to create a PayoutSlab
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PayoutSlab we want to update
     *   }
     * })
     */
    upsert<T extends PayoutSlabUpsertArgs>(args: SelectSubset<T, PayoutSlabUpsertArgs<ExtArgs>>): Prisma__PayoutSlabClient<$Result.GetResult<Prisma.$PayoutSlabPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PayoutSlabs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutSlabCountArgs} args - Arguments to filter PayoutSlabs to count.
     * @example
     * // Count the number of PayoutSlabs
     * const count = await prisma.payoutSlab.count({
     *   where: {
     *     // ... the filter for the PayoutSlabs we want to count
     *   }
     * })
    **/
    count<T extends PayoutSlabCountArgs>(
      args?: Subset<T, PayoutSlabCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PayoutSlabCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PayoutSlab.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutSlabAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PayoutSlabAggregateArgs>(args: Subset<T, PayoutSlabAggregateArgs>): Prisma.PrismaPromise<GetPayoutSlabAggregateType<T>>

    /**
     * Group by PayoutSlab.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutSlabGroupByArgs} args - Group by arguments.
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
      T extends PayoutSlabGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PayoutSlabGroupByArgs['orderBy'] }
        : { orderBy?: PayoutSlabGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PayoutSlabGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPayoutSlabGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PayoutSlab model
   */
  readonly fields: PayoutSlabFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PayoutSlab.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PayoutSlabClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    connector<T extends PayoutSlab$connectorArgs<ExtArgs> = {}>(args?: Subset<T, PayoutSlab$connectorArgs<ExtArgs>>): Prisma__ConnectorClient<$Result.GetResult<Prisma.$ConnectorPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the PayoutSlab model
   */ 
  interface PayoutSlabFieldRefs {
    readonly id: FieldRef<"PayoutSlab", 'String'>
    readonly connectorId: FieldRef<"PayoutSlab", 'String'>
    readonly bankName: FieldRef<"PayoutSlab", 'String'>
    readonly productCategory: FieldRef<"PayoutSlab", 'String'>
    readonly payoutRate: FieldRef<"PayoutSlab", 'Decimal'>
    readonly minDisbursementAmount: FieldRef<"PayoutSlab", 'Decimal'>
    readonly status: FieldRef<"PayoutSlab", 'String'>
    readonly createdAt: FieldRef<"PayoutSlab", 'DateTime'>
    readonly updatedAt: FieldRef<"PayoutSlab", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PayoutSlab findUnique
   */
  export type PayoutSlabFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutSlab
     */
    select?: PayoutSlabSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutSlabInclude<ExtArgs> | null
    /**
     * Filter, which PayoutSlab to fetch.
     */
    where: PayoutSlabWhereUniqueInput
  }

  /**
   * PayoutSlab findUniqueOrThrow
   */
  export type PayoutSlabFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutSlab
     */
    select?: PayoutSlabSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutSlabInclude<ExtArgs> | null
    /**
     * Filter, which PayoutSlab to fetch.
     */
    where: PayoutSlabWhereUniqueInput
  }

  /**
   * PayoutSlab findFirst
   */
  export type PayoutSlabFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutSlab
     */
    select?: PayoutSlabSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutSlabInclude<ExtArgs> | null
    /**
     * Filter, which PayoutSlab to fetch.
     */
    where?: PayoutSlabWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayoutSlabs to fetch.
     */
    orderBy?: PayoutSlabOrderByWithRelationInput | PayoutSlabOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PayoutSlabs.
     */
    cursor?: PayoutSlabWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayoutSlabs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayoutSlabs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PayoutSlabs.
     */
    distinct?: PayoutSlabScalarFieldEnum | PayoutSlabScalarFieldEnum[]
  }

  /**
   * PayoutSlab findFirstOrThrow
   */
  export type PayoutSlabFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutSlab
     */
    select?: PayoutSlabSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutSlabInclude<ExtArgs> | null
    /**
     * Filter, which PayoutSlab to fetch.
     */
    where?: PayoutSlabWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayoutSlabs to fetch.
     */
    orderBy?: PayoutSlabOrderByWithRelationInput | PayoutSlabOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PayoutSlabs.
     */
    cursor?: PayoutSlabWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayoutSlabs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayoutSlabs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PayoutSlabs.
     */
    distinct?: PayoutSlabScalarFieldEnum | PayoutSlabScalarFieldEnum[]
  }

  /**
   * PayoutSlab findMany
   */
  export type PayoutSlabFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutSlab
     */
    select?: PayoutSlabSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutSlabInclude<ExtArgs> | null
    /**
     * Filter, which PayoutSlabs to fetch.
     */
    where?: PayoutSlabWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayoutSlabs to fetch.
     */
    orderBy?: PayoutSlabOrderByWithRelationInput | PayoutSlabOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PayoutSlabs.
     */
    cursor?: PayoutSlabWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayoutSlabs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayoutSlabs.
     */
    skip?: number
    distinct?: PayoutSlabScalarFieldEnum | PayoutSlabScalarFieldEnum[]
  }

  /**
   * PayoutSlab create
   */
  export type PayoutSlabCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutSlab
     */
    select?: PayoutSlabSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutSlabInclude<ExtArgs> | null
    /**
     * The data needed to create a PayoutSlab.
     */
    data: XOR<PayoutSlabCreateInput, PayoutSlabUncheckedCreateInput>
  }

  /**
   * PayoutSlab createMany
   */
  export type PayoutSlabCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PayoutSlabs.
     */
    data: PayoutSlabCreateManyInput | PayoutSlabCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PayoutSlab update
   */
  export type PayoutSlabUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutSlab
     */
    select?: PayoutSlabSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutSlabInclude<ExtArgs> | null
    /**
     * The data needed to update a PayoutSlab.
     */
    data: XOR<PayoutSlabUpdateInput, PayoutSlabUncheckedUpdateInput>
    /**
     * Choose, which PayoutSlab to update.
     */
    where: PayoutSlabWhereUniqueInput
  }

  /**
   * PayoutSlab updateMany
   */
  export type PayoutSlabUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PayoutSlabs.
     */
    data: XOR<PayoutSlabUpdateManyMutationInput, PayoutSlabUncheckedUpdateManyInput>
    /**
     * Filter which PayoutSlabs to update
     */
    where?: PayoutSlabWhereInput
  }

  /**
   * PayoutSlab upsert
   */
  export type PayoutSlabUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutSlab
     */
    select?: PayoutSlabSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutSlabInclude<ExtArgs> | null
    /**
     * The filter to search for the PayoutSlab to update in case it exists.
     */
    where: PayoutSlabWhereUniqueInput
    /**
     * In case the PayoutSlab found by the `where` argument doesn't exist, create a new PayoutSlab with this data.
     */
    create: XOR<PayoutSlabCreateInput, PayoutSlabUncheckedCreateInput>
    /**
     * In case the PayoutSlab was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PayoutSlabUpdateInput, PayoutSlabUncheckedUpdateInput>
  }

  /**
   * PayoutSlab delete
   */
  export type PayoutSlabDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutSlab
     */
    select?: PayoutSlabSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutSlabInclude<ExtArgs> | null
    /**
     * Filter which PayoutSlab to delete.
     */
    where: PayoutSlabWhereUniqueInput
  }

  /**
   * PayoutSlab deleteMany
   */
  export type PayoutSlabDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PayoutSlabs to delete
     */
    where?: PayoutSlabWhereInput
  }

  /**
   * PayoutSlab.connector
   */
  export type PayoutSlab$connectorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connector
     */
    select?: ConnectorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectorInclude<ExtArgs> | null
    where?: ConnectorWhereInput
  }

  /**
   * PayoutSlab without action
   */
  export type PayoutSlabDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutSlab
     */
    select?: PayoutSlabSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutSlabInclude<ExtArgs> | null
  }


  /**
   * Model SalesManager
   */

  export type AggregateSalesManager = {
    _count: SalesManagerCountAggregateOutputType | null
    _avg: SalesManagerAvgAggregateOutputType | null
    _sum: SalesManagerSumAggregateOutputType | null
    _min: SalesManagerMinAggregateOutputType | null
    _max: SalesManagerMaxAggregateOutputType | null
  }

  export type SalesManagerAvgAggregateOutputType = {
    approvalRate: Decimal | null
    tatScore: Decimal | null
    currentCapacity: number | null
    maxCapacity: number | null
    experienceScore: Decimal | null
  }

  export type SalesManagerSumAggregateOutputType = {
    approvalRate: Decimal | null
    tatScore: Decimal | null
    currentCapacity: number | null
    maxCapacity: number | null
    experienceScore: Decimal | null
  }

  export type SalesManagerMinAggregateOutputType = {
    id: string | null
    userId: string | null
    branchId: string | null
    approvalRate: Decimal | null
    tatScore: Decimal | null
    currentCapacity: number | null
    maxCapacity: number | null
    experienceScore: Decimal | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SalesManagerMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    branchId: string | null
    approvalRate: Decimal | null
    tatScore: Decimal | null
    currentCapacity: number | null
    maxCapacity: number | null
    experienceScore: Decimal | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SalesManagerCountAggregateOutputType = {
    id: number
    userId: number
    branchId: number
    approvalRate: number
    tatScore: number
    currentCapacity: number
    maxCapacity: number
    experienceScore: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SalesManagerAvgAggregateInputType = {
    approvalRate?: true
    tatScore?: true
    currentCapacity?: true
    maxCapacity?: true
    experienceScore?: true
  }

  export type SalesManagerSumAggregateInputType = {
    approvalRate?: true
    tatScore?: true
    currentCapacity?: true
    maxCapacity?: true
    experienceScore?: true
  }

  export type SalesManagerMinAggregateInputType = {
    id?: true
    userId?: true
    branchId?: true
    approvalRate?: true
    tatScore?: true
    currentCapacity?: true
    maxCapacity?: true
    experienceScore?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SalesManagerMaxAggregateInputType = {
    id?: true
    userId?: true
    branchId?: true
    approvalRate?: true
    tatScore?: true
    currentCapacity?: true
    maxCapacity?: true
    experienceScore?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SalesManagerCountAggregateInputType = {
    id?: true
    userId?: true
    branchId?: true
    approvalRate?: true
    tatScore?: true
    currentCapacity?: true
    maxCapacity?: true
    experienceScore?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SalesManagerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SalesManager to aggregate.
     */
    where?: SalesManagerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SalesManagers to fetch.
     */
    orderBy?: SalesManagerOrderByWithRelationInput | SalesManagerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SalesManagerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SalesManagers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SalesManagers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SalesManagers
    **/
    _count?: true | SalesManagerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SalesManagerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SalesManagerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SalesManagerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SalesManagerMaxAggregateInputType
  }

  export type GetSalesManagerAggregateType<T extends SalesManagerAggregateArgs> = {
        [P in keyof T & keyof AggregateSalesManager]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSalesManager[P]>
      : GetScalarType<T[P], AggregateSalesManager[P]>
  }




  export type SalesManagerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SalesManagerWhereInput
    orderBy?: SalesManagerOrderByWithAggregationInput | SalesManagerOrderByWithAggregationInput[]
    by: SalesManagerScalarFieldEnum[] | SalesManagerScalarFieldEnum
    having?: SalesManagerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SalesManagerCountAggregateInputType | true
    _avg?: SalesManagerAvgAggregateInputType
    _sum?: SalesManagerSumAggregateInputType
    _min?: SalesManagerMinAggregateInputType
    _max?: SalesManagerMaxAggregateInputType
  }

  export type SalesManagerGroupByOutputType = {
    id: string
    userId: string
    branchId: string | null
    approvalRate: Decimal
    tatScore: Decimal
    currentCapacity: number
    maxCapacity: number
    experienceScore: Decimal
    isActive: boolean
    createdAt: Date
    updatedAt: Date | null
    _count: SalesManagerCountAggregateOutputType | null
    _avg: SalesManagerAvgAggregateOutputType | null
    _sum: SalesManagerSumAggregateOutputType | null
    _min: SalesManagerMinAggregateOutputType | null
    _max: SalesManagerMaxAggregateOutputType | null
  }

  type GetSalesManagerGroupByPayload<T extends SalesManagerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SalesManagerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SalesManagerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SalesManagerGroupByOutputType[P]>
            : GetScalarType<T[P], SalesManagerGroupByOutputType[P]>
        }
      >
    >


  export type SalesManagerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    branchId?: boolean
    approvalRate?: boolean
    tatScore?: boolean
    currentCapacity?: boolean
    maxCapacity?: boolean
    experienceScore?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    routingHistory?: boolean | SalesManager$routingHistoryArgs<ExtArgs>
    _count?: boolean | SalesManagerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["salesManager"]>


  export type SalesManagerSelectScalar = {
    id?: boolean
    userId?: boolean
    branchId?: boolean
    approvalRate?: boolean
    tatScore?: boolean
    currentCapacity?: boolean
    maxCapacity?: boolean
    experienceScore?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SalesManagerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    routingHistory?: boolean | SalesManager$routingHistoryArgs<ExtArgs>
    _count?: boolean | SalesManagerCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SalesManagerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SalesManager"
    objects: {
      routingHistory: Prisma.$RoutingHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      branchId: string | null
      approvalRate: Prisma.Decimal
      tatScore: Prisma.Decimal
      currentCapacity: number
      maxCapacity: number
      experienceScore: Prisma.Decimal
      isActive: boolean
      createdAt: Date
      updatedAt: Date | null
    }, ExtArgs["result"]["salesManager"]>
    composites: {}
  }

  type SalesManagerGetPayload<S extends boolean | null | undefined | SalesManagerDefaultArgs> = $Result.GetResult<Prisma.$SalesManagerPayload, S>

  type SalesManagerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SalesManagerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SalesManagerCountAggregateInputType | true
    }

  export interface SalesManagerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SalesManager'], meta: { name: 'SalesManager' } }
    /**
     * Find zero or one SalesManager that matches the filter.
     * @param {SalesManagerFindUniqueArgs} args - Arguments to find a SalesManager
     * @example
     * // Get one SalesManager
     * const salesManager = await prisma.salesManager.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SalesManagerFindUniqueArgs>(args: SelectSubset<T, SalesManagerFindUniqueArgs<ExtArgs>>): Prisma__SalesManagerClient<$Result.GetResult<Prisma.$SalesManagerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SalesManager that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SalesManagerFindUniqueOrThrowArgs} args - Arguments to find a SalesManager
     * @example
     * // Get one SalesManager
     * const salesManager = await prisma.salesManager.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SalesManagerFindUniqueOrThrowArgs>(args: SelectSubset<T, SalesManagerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SalesManagerClient<$Result.GetResult<Prisma.$SalesManagerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SalesManager that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesManagerFindFirstArgs} args - Arguments to find a SalesManager
     * @example
     * // Get one SalesManager
     * const salesManager = await prisma.salesManager.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SalesManagerFindFirstArgs>(args?: SelectSubset<T, SalesManagerFindFirstArgs<ExtArgs>>): Prisma__SalesManagerClient<$Result.GetResult<Prisma.$SalesManagerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SalesManager that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesManagerFindFirstOrThrowArgs} args - Arguments to find a SalesManager
     * @example
     * // Get one SalesManager
     * const salesManager = await prisma.salesManager.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SalesManagerFindFirstOrThrowArgs>(args?: SelectSubset<T, SalesManagerFindFirstOrThrowArgs<ExtArgs>>): Prisma__SalesManagerClient<$Result.GetResult<Prisma.$SalesManagerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SalesManagers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesManagerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SalesManagers
     * const salesManagers = await prisma.salesManager.findMany()
     * 
     * // Get first 10 SalesManagers
     * const salesManagers = await prisma.salesManager.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const salesManagerWithIdOnly = await prisma.salesManager.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SalesManagerFindManyArgs>(args?: SelectSubset<T, SalesManagerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalesManagerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SalesManager.
     * @param {SalesManagerCreateArgs} args - Arguments to create a SalesManager.
     * @example
     * // Create one SalesManager
     * const SalesManager = await prisma.salesManager.create({
     *   data: {
     *     // ... data to create a SalesManager
     *   }
     * })
     * 
     */
    create<T extends SalesManagerCreateArgs>(args: SelectSubset<T, SalesManagerCreateArgs<ExtArgs>>): Prisma__SalesManagerClient<$Result.GetResult<Prisma.$SalesManagerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SalesManagers.
     * @param {SalesManagerCreateManyArgs} args - Arguments to create many SalesManagers.
     * @example
     * // Create many SalesManagers
     * const salesManager = await prisma.salesManager.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SalesManagerCreateManyArgs>(args?: SelectSubset<T, SalesManagerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SalesManager.
     * @param {SalesManagerDeleteArgs} args - Arguments to delete one SalesManager.
     * @example
     * // Delete one SalesManager
     * const SalesManager = await prisma.salesManager.delete({
     *   where: {
     *     // ... filter to delete one SalesManager
     *   }
     * })
     * 
     */
    delete<T extends SalesManagerDeleteArgs>(args: SelectSubset<T, SalesManagerDeleteArgs<ExtArgs>>): Prisma__SalesManagerClient<$Result.GetResult<Prisma.$SalesManagerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SalesManager.
     * @param {SalesManagerUpdateArgs} args - Arguments to update one SalesManager.
     * @example
     * // Update one SalesManager
     * const salesManager = await prisma.salesManager.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SalesManagerUpdateArgs>(args: SelectSubset<T, SalesManagerUpdateArgs<ExtArgs>>): Prisma__SalesManagerClient<$Result.GetResult<Prisma.$SalesManagerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SalesManagers.
     * @param {SalesManagerDeleteManyArgs} args - Arguments to filter SalesManagers to delete.
     * @example
     * // Delete a few SalesManagers
     * const { count } = await prisma.salesManager.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SalesManagerDeleteManyArgs>(args?: SelectSubset<T, SalesManagerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SalesManagers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesManagerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SalesManagers
     * const salesManager = await prisma.salesManager.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SalesManagerUpdateManyArgs>(args: SelectSubset<T, SalesManagerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SalesManager.
     * @param {SalesManagerUpsertArgs} args - Arguments to update or create a SalesManager.
     * @example
     * // Update or create a SalesManager
     * const salesManager = await prisma.salesManager.upsert({
     *   create: {
     *     // ... data to create a SalesManager
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SalesManager we want to update
     *   }
     * })
     */
    upsert<T extends SalesManagerUpsertArgs>(args: SelectSubset<T, SalesManagerUpsertArgs<ExtArgs>>): Prisma__SalesManagerClient<$Result.GetResult<Prisma.$SalesManagerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SalesManagers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesManagerCountArgs} args - Arguments to filter SalesManagers to count.
     * @example
     * // Count the number of SalesManagers
     * const count = await prisma.salesManager.count({
     *   where: {
     *     // ... the filter for the SalesManagers we want to count
     *   }
     * })
    **/
    count<T extends SalesManagerCountArgs>(
      args?: Subset<T, SalesManagerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SalesManagerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SalesManager.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesManagerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SalesManagerAggregateArgs>(args: Subset<T, SalesManagerAggregateArgs>): Prisma.PrismaPromise<GetSalesManagerAggregateType<T>>

    /**
     * Group by SalesManager.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesManagerGroupByArgs} args - Group by arguments.
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
      T extends SalesManagerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SalesManagerGroupByArgs['orderBy'] }
        : { orderBy?: SalesManagerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SalesManagerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSalesManagerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SalesManager model
   */
  readonly fields: SalesManagerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SalesManager.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SalesManagerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    routingHistory<T extends SalesManager$routingHistoryArgs<ExtArgs> = {}>(args?: Subset<T, SalesManager$routingHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutingHistoryPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the SalesManager model
   */ 
  interface SalesManagerFieldRefs {
    readonly id: FieldRef<"SalesManager", 'String'>
    readonly userId: FieldRef<"SalesManager", 'String'>
    readonly branchId: FieldRef<"SalesManager", 'String'>
    readonly approvalRate: FieldRef<"SalesManager", 'Decimal'>
    readonly tatScore: FieldRef<"SalesManager", 'Decimal'>
    readonly currentCapacity: FieldRef<"SalesManager", 'Int'>
    readonly maxCapacity: FieldRef<"SalesManager", 'Int'>
    readonly experienceScore: FieldRef<"SalesManager", 'Decimal'>
    readonly isActive: FieldRef<"SalesManager", 'Boolean'>
    readonly createdAt: FieldRef<"SalesManager", 'DateTime'>
    readonly updatedAt: FieldRef<"SalesManager", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SalesManager findUnique
   */
  export type SalesManagerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesManager
     */
    select?: SalesManagerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesManagerInclude<ExtArgs> | null
    /**
     * Filter, which SalesManager to fetch.
     */
    where: SalesManagerWhereUniqueInput
  }

  /**
   * SalesManager findUniqueOrThrow
   */
  export type SalesManagerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesManager
     */
    select?: SalesManagerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesManagerInclude<ExtArgs> | null
    /**
     * Filter, which SalesManager to fetch.
     */
    where: SalesManagerWhereUniqueInput
  }

  /**
   * SalesManager findFirst
   */
  export type SalesManagerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesManager
     */
    select?: SalesManagerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesManagerInclude<ExtArgs> | null
    /**
     * Filter, which SalesManager to fetch.
     */
    where?: SalesManagerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SalesManagers to fetch.
     */
    orderBy?: SalesManagerOrderByWithRelationInput | SalesManagerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SalesManagers.
     */
    cursor?: SalesManagerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SalesManagers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SalesManagers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SalesManagers.
     */
    distinct?: SalesManagerScalarFieldEnum | SalesManagerScalarFieldEnum[]
  }

  /**
   * SalesManager findFirstOrThrow
   */
  export type SalesManagerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesManager
     */
    select?: SalesManagerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesManagerInclude<ExtArgs> | null
    /**
     * Filter, which SalesManager to fetch.
     */
    where?: SalesManagerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SalesManagers to fetch.
     */
    orderBy?: SalesManagerOrderByWithRelationInput | SalesManagerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SalesManagers.
     */
    cursor?: SalesManagerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SalesManagers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SalesManagers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SalesManagers.
     */
    distinct?: SalesManagerScalarFieldEnum | SalesManagerScalarFieldEnum[]
  }

  /**
   * SalesManager findMany
   */
  export type SalesManagerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesManager
     */
    select?: SalesManagerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesManagerInclude<ExtArgs> | null
    /**
     * Filter, which SalesManagers to fetch.
     */
    where?: SalesManagerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SalesManagers to fetch.
     */
    orderBy?: SalesManagerOrderByWithRelationInput | SalesManagerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SalesManagers.
     */
    cursor?: SalesManagerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SalesManagers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SalesManagers.
     */
    skip?: number
    distinct?: SalesManagerScalarFieldEnum | SalesManagerScalarFieldEnum[]
  }

  /**
   * SalesManager create
   */
  export type SalesManagerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesManager
     */
    select?: SalesManagerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesManagerInclude<ExtArgs> | null
    /**
     * The data needed to create a SalesManager.
     */
    data: XOR<SalesManagerCreateInput, SalesManagerUncheckedCreateInput>
  }

  /**
   * SalesManager createMany
   */
  export type SalesManagerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SalesManagers.
     */
    data: SalesManagerCreateManyInput | SalesManagerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SalesManager update
   */
  export type SalesManagerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesManager
     */
    select?: SalesManagerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesManagerInclude<ExtArgs> | null
    /**
     * The data needed to update a SalesManager.
     */
    data: XOR<SalesManagerUpdateInput, SalesManagerUncheckedUpdateInput>
    /**
     * Choose, which SalesManager to update.
     */
    where: SalesManagerWhereUniqueInput
  }

  /**
   * SalesManager updateMany
   */
  export type SalesManagerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SalesManagers.
     */
    data: XOR<SalesManagerUpdateManyMutationInput, SalesManagerUncheckedUpdateManyInput>
    /**
     * Filter which SalesManagers to update
     */
    where?: SalesManagerWhereInput
  }

  /**
   * SalesManager upsert
   */
  export type SalesManagerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesManager
     */
    select?: SalesManagerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesManagerInclude<ExtArgs> | null
    /**
     * The filter to search for the SalesManager to update in case it exists.
     */
    where: SalesManagerWhereUniqueInput
    /**
     * In case the SalesManager found by the `where` argument doesn't exist, create a new SalesManager with this data.
     */
    create: XOR<SalesManagerCreateInput, SalesManagerUncheckedCreateInput>
    /**
     * In case the SalesManager was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SalesManagerUpdateInput, SalesManagerUncheckedUpdateInput>
  }

  /**
   * SalesManager delete
   */
  export type SalesManagerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesManager
     */
    select?: SalesManagerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesManagerInclude<ExtArgs> | null
    /**
     * Filter which SalesManager to delete.
     */
    where: SalesManagerWhereUniqueInput
  }

  /**
   * SalesManager deleteMany
   */
  export type SalesManagerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SalesManagers to delete
     */
    where?: SalesManagerWhereInput
  }

  /**
   * SalesManager.routingHistory
   */
  export type SalesManager$routingHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingHistory
     */
    select?: RoutingHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingHistoryInclude<ExtArgs> | null
    where?: RoutingHistoryWhereInput
    orderBy?: RoutingHistoryOrderByWithRelationInput | RoutingHistoryOrderByWithRelationInput[]
    cursor?: RoutingHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoutingHistoryScalarFieldEnum | RoutingHistoryScalarFieldEnum[]
  }

  /**
   * SalesManager without action
   */
  export type SalesManagerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesManager
     */
    select?: SalesManagerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesManagerInclude<ExtArgs> | null
  }


  /**
   * Model RoutingHistory
   */

  export type AggregateRoutingHistory = {
    _count: RoutingHistoryCountAggregateOutputType | null
    _avg: RoutingHistoryAvgAggregateOutputType | null
    _sum: RoutingHistorySumAggregateOutputType | null
    _min: RoutingHistoryMinAggregateOutputType | null
    _max: RoutingHistoryMaxAggregateOutputType | null
  }

  export type RoutingHistoryAvgAggregateOutputType = {
    routingScore: Decimal | null
  }

  export type RoutingHistorySumAggregateOutputType = {
    routingScore: Decimal | null
  }

  export type RoutingHistoryMinAggregateOutputType = {
    id: string | null
    loanId: string | null
    assignedSmId: string | null
    routingScore: Decimal | null
    assignedAt: Date | null
  }

  export type RoutingHistoryMaxAggregateOutputType = {
    id: string | null
    loanId: string | null
    assignedSmId: string | null
    routingScore: Decimal | null
    assignedAt: Date | null
  }

  export type RoutingHistoryCountAggregateOutputType = {
    id: number
    loanId: number
    assignedSmId: number
    routingScore: number
    assignedAt: number
    _all: number
  }


  export type RoutingHistoryAvgAggregateInputType = {
    routingScore?: true
  }

  export type RoutingHistorySumAggregateInputType = {
    routingScore?: true
  }

  export type RoutingHistoryMinAggregateInputType = {
    id?: true
    loanId?: true
    assignedSmId?: true
    routingScore?: true
    assignedAt?: true
  }

  export type RoutingHistoryMaxAggregateInputType = {
    id?: true
    loanId?: true
    assignedSmId?: true
    routingScore?: true
    assignedAt?: true
  }

  export type RoutingHistoryCountAggregateInputType = {
    id?: true
    loanId?: true
    assignedSmId?: true
    routingScore?: true
    assignedAt?: true
    _all?: true
  }

  export type RoutingHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoutingHistory to aggregate.
     */
    where?: RoutingHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoutingHistories to fetch.
     */
    orderBy?: RoutingHistoryOrderByWithRelationInput | RoutingHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoutingHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoutingHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoutingHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoutingHistories
    **/
    _count?: true | RoutingHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoutingHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoutingHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoutingHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoutingHistoryMaxAggregateInputType
  }

  export type GetRoutingHistoryAggregateType<T extends RoutingHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateRoutingHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoutingHistory[P]>
      : GetScalarType<T[P], AggregateRoutingHistory[P]>
  }




  export type RoutingHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoutingHistoryWhereInput
    orderBy?: RoutingHistoryOrderByWithAggregationInput | RoutingHistoryOrderByWithAggregationInput[]
    by: RoutingHistoryScalarFieldEnum[] | RoutingHistoryScalarFieldEnum
    having?: RoutingHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoutingHistoryCountAggregateInputType | true
    _avg?: RoutingHistoryAvgAggregateInputType
    _sum?: RoutingHistorySumAggregateInputType
    _min?: RoutingHistoryMinAggregateInputType
    _max?: RoutingHistoryMaxAggregateInputType
  }

  export type RoutingHistoryGroupByOutputType = {
    id: string
    loanId: string
    assignedSmId: string | null
    routingScore: Decimal | null
    assignedAt: Date
    _count: RoutingHistoryCountAggregateOutputType | null
    _avg: RoutingHistoryAvgAggregateOutputType | null
    _sum: RoutingHistorySumAggregateOutputType | null
    _min: RoutingHistoryMinAggregateOutputType | null
    _max: RoutingHistoryMaxAggregateOutputType | null
  }

  type GetRoutingHistoryGroupByPayload<T extends RoutingHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoutingHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoutingHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoutingHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], RoutingHistoryGroupByOutputType[P]>
        }
      >
    >


  export type RoutingHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanId?: boolean
    assignedSmId?: boolean
    routingScore?: boolean
    assignedAt?: boolean
    manager?: boolean | RoutingHistory$managerArgs<ExtArgs>
  }, ExtArgs["result"]["routingHistory"]>


  export type RoutingHistorySelectScalar = {
    id?: boolean
    loanId?: boolean
    assignedSmId?: boolean
    routingScore?: boolean
    assignedAt?: boolean
  }

  export type RoutingHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    manager?: boolean | RoutingHistory$managerArgs<ExtArgs>
  }

  export type $RoutingHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoutingHistory"
    objects: {
      manager: Prisma.$SalesManagerPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      loanId: string
      assignedSmId: string | null
      routingScore: Prisma.Decimal | null
      assignedAt: Date
    }, ExtArgs["result"]["routingHistory"]>
    composites: {}
  }

  type RoutingHistoryGetPayload<S extends boolean | null | undefined | RoutingHistoryDefaultArgs> = $Result.GetResult<Prisma.$RoutingHistoryPayload, S>

  type RoutingHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RoutingHistoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RoutingHistoryCountAggregateInputType | true
    }

  export interface RoutingHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoutingHistory'], meta: { name: 'RoutingHistory' } }
    /**
     * Find zero or one RoutingHistory that matches the filter.
     * @param {RoutingHistoryFindUniqueArgs} args - Arguments to find a RoutingHistory
     * @example
     * // Get one RoutingHistory
     * const routingHistory = await prisma.routingHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoutingHistoryFindUniqueArgs>(args: SelectSubset<T, RoutingHistoryFindUniqueArgs<ExtArgs>>): Prisma__RoutingHistoryClient<$Result.GetResult<Prisma.$RoutingHistoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RoutingHistory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RoutingHistoryFindUniqueOrThrowArgs} args - Arguments to find a RoutingHistory
     * @example
     * // Get one RoutingHistory
     * const routingHistory = await prisma.routingHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoutingHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, RoutingHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoutingHistoryClient<$Result.GetResult<Prisma.$RoutingHistoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RoutingHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutingHistoryFindFirstArgs} args - Arguments to find a RoutingHistory
     * @example
     * // Get one RoutingHistory
     * const routingHistory = await prisma.routingHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoutingHistoryFindFirstArgs>(args?: SelectSubset<T, RoutingHistoryFindFirstArgs<ExtArgs>>): Prisma__RoutingHistoryClient<$Result.GetResult<Prisma.$RoutingHistoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RoutingHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutingHistoryFindFirstOrThrowArgs} args - Arguments to find a RoutingHistory
     * @example
     * // Get one RoutingHistory
     * const routingHistory = await prisma.routingHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoutingHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, RoutingHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoutingHistoryClient<$Result.GetResult<Prisma.$RoutingHistoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RoutingHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutingHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoutingHistories
     * const routingHistories = await prisma.routingHistory.findMany()
     * 
     * // Get first 10 RoutingHistories
     * const routingHistories = await prisma.routingHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const routingHistoryWithIdOnly = await prisma.routingHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoutingHistoryFindManyArgs>(args?: SelectSubset<T, RoutingHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoutingHistoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RoutingHistory.
     * @param {RoutingHistoryCreateArgs} args - Arguments to create a RoutingHistory.
     * @example
     * // Create one RoutingHistory
     * const RoutingHistory = await prisma.routingHistory.create({
     *   data: {
     *     // ... data to create a RoutingHistory
     *   }
     * })
     * 
     */
    create<T extends RoutingHistoryCreateArgs>(args: SelectSubset<T, RoutingHistoryCreateArgs<ExtArgs>>): Prisma__RoutingHistoryClient<$Result.GetResult<Prisma.$RoutingHistoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RoutingHistories.
     * @param {RoutingHistoryCreateManyArgs} args - Arguments to create many RoutingHistories.
     * @example
     * // Create many RoutingHistories
     * const routingHistory = await prisma.routingHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoutingHistoryCreateManyArgs>(args?: SelectSubset<T, RoutingHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a RoutingHistory.
     * @param {RoutingHistoryDeleteArgs} args - Arguments to delete one RoutingHistory.
     * @example
     * // Delete one RoutingHistory
     * const RoutingHistory = await prisma.routingHistory.delete({
     *   where: {
     *     // ... filter to delete one RoutingHistory
     *   }
     * })
     * 
     */
    delete<T extends RoutingHistoryDeleteArgs>(args: SelectSubset<T, RoutingHistoryDeleteArgs<ExtArgs>>): Prisma__RoutingHistoryClient<$Result.GetResult<Prisma.$RoutingHistoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RoutingHistory.
     * @param {RoutingHistoryUpdateArgs} args - Arguments to update one RoutingHistory.
     * @example
     * // Update one RoutingHistory
     * const routingHistory = await prisma.routingHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoutingHistoryUpdateArgs>(args: SelectSubset<T, RoutingHistoryUpdateArgs<ExtArgs>>): Prisma__RoutingHistoryClient<$Result.GetResult<Prisma.$RoutingHistoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RoutingHistories.
     * @param {RoutingHistoryDeleteManyArgs} args - Arguments to filter RoutingHistories to delete.
     * @example
     * // Delete a few RoutingHistories
     * const { count } = await prisma.routingHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoutingHistoryDeleteManyArgs>(args?: SelectSubset<T, RoutingHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoutingHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutingHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoutingHistories
     * const routingHistory = await prisma.routingHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoutingHistoryUpdateManyArgs>(args: SelectSubset<T, RoutingHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RoutingHistory.
     * @param {RoutingHistoryUpsertArgs} args - Arguments to update or create a RoutingHistory.
     * @example
     * // Update or create a RoutingHistory
     * const routingHistory = await prisma.routingHistory.upsert({
     *   create: {
     *     // ... data to create a RoutingHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoutingHistory we want to update
     *   }
     * })
     */
    upsert<T extends RoutingHistoryUpsertArgs>(args: SelectSubset<T, RoutingHistoryUpsertArgs<ExtArgs>>): Prisma__RoutingHistoryClient<$Result.GetResult<Prisma.$RoutingHistoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RoutingHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutingHistoryCountArgs} args - Arguments to filter RoutingHistories to count.
     * @example
     * // Count the number of RoutingHistories
     * const count = await prisma.routingHistory.count({
     *   where: {
     *     // ... the filter for the RoutingHistories we want to count
     *   }
     * })
    **/
    count<T extends RoutingHistoryCountArgs>(
      args?: Subset<T, RoutingHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoutingHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoutingHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutingHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoutingHistoryAggregateArgs>(args: Subset<T, RoutingHistoryAggregateArgs>): Prisma.PrismaPromise<GetRoutingHistoryAggregateType<T>>

    /**
     * Group by RoutingHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoutingHistoryGroupByArgs} args - Group by arguments.
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
      T extends RoutingHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoutingHistoryGroupByArgs['orderBy'] }
        : { orderBy?: RoutingHistoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RoutingHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoutingHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoutingHistory model
   */
  readonly fields: RoutingHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoutingHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoutingHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    manager<T extends RoutingHistory$managerArgs<ExtArgs> = {}>(args?: Subset<T, RoutingHistory$managerArgs<ExtArgs>>): Prisma__SalesManagerClient<$Result.GetResult<Prisma.$SalesManagerPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the RoutingHistory model
   */ 
  interface RoutingHistoryFieldRefs {
    readonly id: FieldRef<"RoutingHistory", 'String'>
    readonly loanId: FieldRef<"RoutingHistory", 'String'>
    readonly assignedSmId: FieldRef<"RoutingHistory", 'String'>
    readonly routingScore: FieldRef<"RoutingHistory", 'Decimal'>
    readonly assignedAt: FieldRef<"RoutingHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RoutingHistory findUnique
   */
  export type RoutingHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingHistory
     */
    select?: RoutingHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingHistoryInclude<ExtArgs> | null
    /**
     * Filter, which RoutingHistory to fetch.
     */
    where: RoutingHistoryWhereUniqueInput
  }

  /**
   * RoutingHistory findUniqueOrThrow
   */
  export type RoutingHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingHistory
     */
    select?: RoutingHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingHistoryInclude<ExtArgs> | null
    /**
     * Filter, which RoutingHistory to fetch.
     */
    where: RoutingHistoryWhereUniqueInput
  }

  /**
   * RoutingHistory findFirst
   */
  export type RoutingHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingHistory
     */
    select?: RoutingHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingHistoryInclude<ExtArgs> | null
    /**
     * Filter, which RoutingHistory to fetch.
     */
    where?: RoutingHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoutingHistories to fetch.
     */
    orderBy?: RoutingHistoryOrderByWithRelationInput | RoutingHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoutingHistories.
     */
    cursor?: RoutingHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoutingHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoutingHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoutingHistories.
     */
    distinct?: RoutingHistoryScalarFieldEnum | RoutingHistoryScalarFieldEnum[]
  }

  /**
   * RoutingHistory findFirstOrThrow
   */
  export type RoutingHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingHistory
     */
    select?: RoutingHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingHistoryInclude<ExtArgs> | null
    /**
     * Filter, which RoutingHistory to fetch.
     */
    where?: RoutingHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoutingHistories to fetch.
     */
    orderBy?: RoutingHistoryOrderByWithRelationInput | RoutingHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoutingHistories.
     */
    cursor?: RoutingHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoutingHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoutingHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoutingHistories.
     */
    distinct?: RoutingHistoryScalarFieldEnum | RoutingHistoryScalarFieldEnum[]
  }

  /**
   * RoutingHistory findMany
   */
  export type RoutingHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingHistory
     */
    select?: RoutingHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingHistoryInclude<ExtArgs> | null
    /**
     * Filter, which RoutingHistories to fetch.
     */
    where?: RoutingHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoutingHistories to fetch.
     */
    orderBy?: RoutingHistoryOrderByWithRelationInput | RoutingHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoutingHistories.
     */
    cursor?: RoutingHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoutingHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoutingHistories.
     */
    skip?: number
    distinct?: RoutingHistoryScalarFieldEnum | RoutingHistoryScalarFieldEnum[]
  }

  /**
   * RoutingHistory create
   */
  export type RoutingHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingHistory
     */
    select?: RoutingHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a RoutingHistory.
     */
    data: XOR<RoutingHistoryCreateInput, RoutingHistoryUncheckedCreateInput>
  }

  /**
   * RoutingHistory createMany
   */
  export type RoutingHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoutingHistories.
     */
    data: RoutingHistoryCreateManyInput | RoutingHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoutingHistory update
   */
  export type RoutingHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingHistory
     */
    select?: RoutingHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a RoutingHistory.
     */
    data: XOR<RoutingHistoryUpdateInput, RoutingHistoryUncheckedUpdateInput>
    /**
     * Choose, which RoutingHistory to update.
     */
    where: RoutingHistoryWhereUniqueInput
  }

  /**
   * RoutingHistory updateMany
   */
  export type RoutingHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoutingHistories.
     */
    data: XOR<RoutingHistoryUpdateManyMutationInput, RoutingHistoryUncheckedUpdateManyInput>
    /**
     * Filter which RoutingHistories to update
     */
    where?: RoutingHistoryWhereInput
  }

  /**
   * RoutingHistory upsert
   */
  export type RoutingHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingHistory
     */
    select?: RoutingHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the RoutingHistory to update in case it exists.
     */
    where: RoutingHistoryWhereUniqueInput
    /**
     * In case the RoutingHistory found by the `where` argument doesn't exist, create a new RoutingHistory with this data.
     */
    create: XOR<RoutingHistoryCreateInput, RoutingHistoryUncheckedCreateInput>
    /**
     * In case the RoutingHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoutingHistoryUpdateInput, RoutingHistoryUncheckedUpdateInput>
  }

  /**
   * RoutingHistory delete
   */
  export type RoutingHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingHistory
     */
    select?: RoutingHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingHistoryInclude<ExtArgs> | null
    /**
     * Filter which RoutingHistory to delete.
     */
    where: RoutingHistoryWhereUniqueInput
  }

  /**
   * RoutingHistory deleteMany
   */
  export type RoutingHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoutingHistories to delete
     */
    where?: RoutingHistoryWhereInput
  }

  /**
   * RoutingHistory.manager
   */
  export type RoutingHistory$managerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesManager
     */
    select?: SalesManagerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesManagerInclude<ExtArgs> | null
    where?: SalesManagerWhereInput
  }

  /**
   * RoutingHistory without action
   */
  export type RoutingHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoutingHistory
     */
    select?: RoutingHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoutingHistoryInclude<ExtArgs> | null
  }


  /**
   * Model CareerApplication
   */

  export type AggregateCareerApplication = {
    _count: CareerApplicationCountAggregateOutputType | null
    _min: CareerApplicationMinAggregateOutputType | null
    _max: CareerApplicationMaxAggregateOutputType | null
  }

  export type CareerApplicationMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    mobile: string | null
    role: string | null
    experience: string | null
    coverNote: string | null
    status: string | null
    createdAt: Date | null
  }

  export type CareerApplicationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    mobile: string | null
    role: string | null
    experience: string | null
    coverNote: string | null
    status: string | null
    createdAt: Date | null
  }

  export type CareerApplicationCountAggregateOutputType = {
    id: number
    name: number
    email: number
    mobile: number
    role: number
    experience: number
    coverNote: number
    status: number
    createdAt: number
    _all: number
  }


  export type CareerApplicationMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    mobile?: true
    role?: true
    experience?: true
    coverNote?: true
    status?: true
    createdAt?: true
  }

  export type CareerApplicationMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    mobile?: true
    role?: true
    experience?: true
    coverNote?: true
    status?: true
    createdAt?: true
  }

  export type CareerApplicationCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    mobile?: true
    role?: true
    experience?: true
    coverNote?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type CareerApplicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CareerApplication to aggregate.
     */
    where?: CareerApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerApplications to fetch.
     */
    orderBy?: CareerApplicationOrderByWithRelationInput | CareerApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CareerApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CareerApplications
    **/
    _count?: true | CareerApplicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CareerApplicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CareerApplicationMaxAggregateInputType
  }

  export type GetCareerApplicationAggregateType<T extends CareerApplicationAggregateArgs> = {
        [P in keyof T & keyof AggregateCareerApplication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCareerApplication[P]>
      : GetScalarType<T[P], AggregateCareerApplication[P]>
  }




  export type CareerApplicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CareerApplicationWhereInput
    orderBy?: CareerApplicationOrderByWithAggregationInput | CareerApplicationOrderByWithAggregationInput[]
    by: CareerApplicationScalarFieldEnum[] | CareerApplicationScalarFieldEnum
    having?: CareerApplicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CareerApplicationCountAggregateInputType | true
    _min?: CareerApplicationMinAggregateInputType
    _max?: CareerApplicationMaxAggregateInputType
  }

  export type CareerApplicationGroupByOutputType = {
    id: string
    name: string
    email: string
    mobile: string
    role: string
    experience: string | null
    coverNote: string | null
    status: string
    createdAt: Date
    _count: CareerApplicationCountAggregateOutputType | null
    _min: CareerApplicationMinAggregateOutputType | null
    _max: CareerApplicationMaxAggregateOutputType | null
  }

  type GetCareerApplicationGroupByPayload<T extends CareerApplicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CareerApplicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CareerApplicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CareerApplicationGroupByOutputType[P]>
            : GetScalarType<T[P], CareerApplicationGroupByOutputType[P]>
        }
      >
    >


  export type CareerApplicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    mobile?: boolean
    role?: boolean
    experience?: boolean
    coverNote?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["careerApplication"]>


  export type CareerApplicationSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    mobile?: boolean
    role?: boolean
    experience?: boolean
    coverNote?: boolean
    status?: boolean
    createdAt?: boolean
  }


  export type $CareerApplicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CareerApplication"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      mobile: string
      role: string
      experience: string | null
      coverNote: string | null
      status: string
      createdAt: Date
    }, ExtArgs["result"]["careerApplication"]>
    composites: {}
  }

  type CareerApplicationGetPayload<S extends boolean | null | undefined | CareerApplicationDefaultArgs> = $Result.GetResult<Prisma.$CareerApplicationPayload, S>

  type CareerApplicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CareerApplicationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CareerApplicationCountAggregateInputType | true
    }

  export interface CareerApplicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CareerApplication'], meta: { name: 'CareerApplication' } }
    /**
     * Find zero or one CareerApplication that matches the filter.
     * @param {CareerApplicationFindUniqueArgs} args - Arguments to find a CareerApplication
     * @example
     * // Get one CareerApplication
     * const careerApplication = await prisma.careerApplication.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CareerApplicationFindUniqueArgs>(args: SelectSubset<T, CareerApplicationFindUniqueArgs<ExtArgs>>): Prisma__CareerApplicationClient<$Result.GetResult<Prisma.$CareerApplicationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CareerApplication that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CareerApplicationFindUniqueOrThrowArgs} args - Arguments to find a CareerApplication
     * @example
     * // Get one CareerApplication
     * const careerApplication = await prisma.careerApplication.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CareerApplicationFindUniqueOrThrowArgs>(args: SelectSubset<T, CareerApplicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CareerApplicationClient<$Result.GetResult<Prisma.$CareerApplicationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CareerApplication that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerApplicationFindFirstArgs} args - Arguments to find a CareerApplication
     * @example
     * // Get one CareerApplication
     * const careerApplication = await prisma.careerApplication.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CareerApplicationFindFirstArgs>(args?: SelectSubset<T, CareerApplicationFindFirstArgs<ExtArgs>>): Prisma__CareerApplicationClient<$Result.GetResult<Prisma.$CareerApplicationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CareerApplication that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerApplicationFindFirstOrThrowArgs} args - Arguments to find a CareerApplication
     * @example
     * // Get one CareerApplication
     * const careerApplication = await prisma.careerApplication.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CareerApplicationFindFirstOrThrowArgs>(args?: SelectSubset<T, CareerApplicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__CareerApplicationClient<$Result.GetResult<Prisma.$CareerApplicationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CareerApplications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerApplicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CareerApplications
     * const careerApplications = await prisma.careerApplication.findMany()
     * 
     * // Get first 10 CareerApplications
     * const careerApplications = await prisma.careerApplication.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const careerApplicationWithIdOnly = await prisma.careerApplication.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CareerApplicationFindManyArgs>(args?: SelectSubset<T, CareerApplicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareerApplicationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CareerApplication.
     * @param {CareerApplicationCreateArgs} args - Arguments to create a CareerApplication.
     * @example
     * // Create one CareerApplication
     * const CareerApplication = await prisma.careerApplication.create({
     *   data: {
     *     // ... data to create a CareerApplication
     *   }
     * })
     * 
     */
    create<T extends CareerApplicationCreateArgs>(args: SelectSubset<T, CareerApplicationCreateArgs<ExtArgs>>): Prisma__CareerApplicationClient<$Result.GetResult<Prisma.$CareerApplicationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CareerApplications.
     * @param {CareerApplicationCreateManyArgs} args - Arguments to create many CareerApplications.
     * @example
     * // Create many CareerApplications
     * const careerApplication = await prisma.careerApplication.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CareerApplicationCreateManyArgs>(args?: SelectSubset<T, CareerApplicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CareerApplication.
     * @param {CareerApplicationDeleteArgs} args - Arguments to delete one CareerApplication.
     * @example
     * // Delete one CareerApplication
     * const CareerApplication = await prisma.careerApplication.delete({
     *   where: {
     *     // ... filter to delete one CareerApplication
     *   }
     * })
     * 
     */
    delete<T extends CareerApplicationDeleteArgs>(args: SelectSubset<T, CareerApplicationDeleteArgs<ExtArgs>>): Prisma__CareerApplicationClient<$Result.GetResult<Prisma.$CareerApplicationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CareerApplication.
     * @param {CareerApplicationUpdateArgs} args - Arguments to update one CareerApplication.
     * @example
     * // Update one CareerApplication
     * const careerApplication = await prisma.careerApplication.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CareerApplicationUpdateArgs>(args: SelectSubset<T, CareerApplicationUpdateArgs<ExtArgs>>): Prisma__CareerApplicationClient<$Result.GetResult<Prisma.$CareerApplicationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CareerApplications.
     * @param {CareerApplicationDeleteManyArgs} args - Arguments to filter CareerApplications to delete.
     * @example
     * // Delete a few CareerApplications
     * const { count } = await prisma.careerApplication.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CareerApplicationDeleteManyArgs>(args?: SelectSubset<T, CareerApplicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CareerApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerApplicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CareerApplications
     * const careerApplication = await prisma.careerApplication.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CareerApplicationUpdateManyArgs>(args: SelectSubset<T, CareerApplicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CareerApplication.
     * @param {CareerApplicationUpsertArgs} args - Arguments to update or create a CareerApplication.
     * @example
     * // Update or create a CareerApplication
     * const careerApplication = await prisma.careerApplication.upsert({
     *   create: {
     *     // ... data to create a CareerApplication
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CareerApplication we want to update
     *   }
     * })
     */
    upsert<T extends CareerApplicationUpsertArgs>(args: SelectSubset<T, CareerApplicationUpsertArgs<ExtArgs>>): Prisma__CareerApplicationClient<$Result.GetResult<Prisma.$CareerApplicationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CareerApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerApplicationCountArgs} args - Arguments to filter CareerApplications to count.
     * @example
     * // Count the number of CareerApplications
     * const count = await prisma.careerApplication.count({
     *   where: {
     *     // ... the filter for the CareerApplications we want to count
     *   }
     * })
    **/
    count<T extends CareerApplicationCountArgs>(
      args?: Subset<T, CareerApplicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CareerApplicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CareerApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerApplicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CareerApplicationAggregateArgs>(args: Subset<T, CareerApplicationAggregateArgs>): Prisma.PrismaPromise<GetCareerApplicationAggregateType<T>>

    /**
     * Group by CareerApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerApplicationGroupByArgs} args - Group by arguments.
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
      T extends CareerApplicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CareerApplicationGroupByArgs['orderBy'] }
        : { orderBy?: CareerApplicationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CareerApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCareerApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CareerApplication model
   */
  readonly fields: CareerApplicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CareerApplication.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CareerApplicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the CareerApplication model
   */ 
  interface CareerApplicationFieldRefs {
    readonly id: FieldRef<"CareerApplication", 'String'>
    readonly name: FieldRef<"CareerApplication", 'String'>
    readonly email: FieldRef<"CareerApplication", 'String'>
    readonly mobile: FieldRef<"CareerApplication", 'String'>
    readonly role: FieldRef<"CareerApplication", 'String'>
    readonly experience: FieldRef<"CareerApplication", 'String'>
    readonly coverNote: FieldRef<"CareerApplication", 'String'>
    readonly status: FieldRef<"CareerApplication", 'String'>
    readonly createdAt: FieldRef<"CareerApplication", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CareerApplication findUnique
   */
  export type CareerApplicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerApplication
     */
    select?: CareerApplicationSelect<ExtArgs> | null
    /**
     * Filter, which CareerApplication to fetch.
     */
    where: CareerApplicationWhereUniqueInput
  }

  /**
   * CareerApplication findUniqueOrThrow
   */
  export type CareerApplicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerApplication
     */
    select?: CareerApplicationSelect<ExtArgs> | null
    /**
     * Filter, which CareerApplication to fetch.
     */
    where: CareerApplicationWhereUniqueInput
  }

  /**
   * CareerApplication findFirst
   */
  export type CareerApplicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerApplication
     */
    select?: CareerApplicationSelect<ExtArgs> | null
    /**
     * Filter, which CareerApplication to fetch.
     */
    where?: CareerApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerApplications to fetch.
     */
    orderBy?: CareerApplicationOrderByWithRelationInput | CareerApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CareerApplications.
     */
    cursor?: CareerApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CareerApplications.
     */
    distinct?: CareerApplicationScalarFieldEnum | CareerApplicationScalarFieldEnum[]
  }

  /**
   * CareerApplication findFirstOrThrow
   */
  export type CareerApplicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerApplication
     */
    select?: CareerApplicationSelect<ExtArgs> | null
    /**
     * Filter, which CareerApplication to fetch.
     */
    where?: CareerApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerApplications to fetch.
     */
    orderBy?: CareerApplicationOrderByWithRelationInput | CareerApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CareerApplications.
     */
    cursor?: CareerApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CareerApplications.
     */
    distinct?: CareerApplicationScalarFieldEnum | CareerApplicationScalarFieldEnum[]
  }

  /**
   * CareerApplication findMany
   */
  export type CareerApplicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerApplication
     */
    select?: CareerApplicationSelect<ExtArgs> | null
    /**
     * Filter, which CareerApplications to fetch.
     */
    where?: CareerApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerApplications to fetch.
     */
    orderBy?: CareerApplicationOrderByWithRelationInput | CareerApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CareerApplications.
     */
    cursor?: CareerApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerApplications.
     */
    skip?: number
    distinct?: CareerApplicationScalarFieldEnum | CareerApplicationScalarFieldEnum[]
  }

  /**
   * CareerApplication create
   */
  export type CareerApplicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerApplication
     */
    select?: CareerApplicationSelect<ExtArgs> | null
    /**
     * The data needed to create a CareerApplication.
     */
    data: XOR<CareerApplicationCreateInput, CareerApplicationUncheckedCreateInput>
  }

  /**
   * CareerApplication createMany
   */
  export type CareerApplicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CareerApplications.
     */
    data: CareerApplicationCreateManyInput | CareerApplicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CareerApplication update
   */
  export type CareerApplicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerApplication
     */
    select?: CareerApplicationSelect<ExtArgs> | null
    /**
     * The data needed to update a CareerApplication.
     */
    data: XOR<CareerApplicationUpdateInput, CareerApplicationUncheckedUpdateInput>
    /**
     * Choose, which CareerApplication to update.
     */
    where: CareerApplicationWhereUniqueInput
  }

  /**
   * CareerApplication updateMany
   */
  export type CareerApplicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CareerApplications.
     */
    data: XOR<CareerApplicationUpdateManyMutationInput, CareerApplicationUncheckedUpdateManyInput>
    /**
     * Filter which CareerApplications to update
     */
    where?: CareerApplicationWhereInput
  }

  /**
   * CareerApplication upsert
   */
  export type CareerApplicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerApplication
     */
    select?: CareerApplicationSelect<ExtArgs> | null
    /**
     * The filter to search for the CareerApplication to update in case it exists.
     */
    where: CareerApplicationWhereUniqueInput
    /**
     * In case the CareerApplication found by the `where` argument doesn't exist, create a new CareerApplication with this data.
     */
    create: XOR<CareerApplicationCreateInput, CareerApplicationUncheckedCreateInput>
    /**
     * In case the CareerApplication was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CareerApplicationUpdateInput, CareerApplicationUncheckedUpdateInput>
  }

  /**
   * CareerApplication delete
   */
  export type CareerApplicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerApplication
     */
    select?: CareerApplicationSelect<ExtArgs> | null
    /**
     * Filter which CareerApplication to delete.
     */
    where: CareerApplicationWhereUniqueInput
  }

  /**
   * CareerApplication deleteMany
   */
  export type CareerApplicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CareerApplications to delete
     */
    where?: CareerApplicationWhereInput
  }

  /**
   * CareerApplication without action
   */
  export type CareerApplicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerApplication
     */
    select?: CareerApplicationSelect<ExtArgs> | null
  }


  /**
   * Model FoirAssessment
   */

  export type AggregateFoirAssessment = {
    _count: FoirAssessmentCountAggregateOutputType | null
    _avg: FoirAssessmentAvgAggregateOutputType | null
    _sum: FoirAssessmentSumAggregateOutputType | null
    _min: FoirAssessmentMinAggregateOutputType | null
    _max: FoirAssessmentMaxAggregateOutputType | null
  }

  export type FoirAssessmentAvgAggregateOutputType = {
    grossMonthlyIncome: Decimal | null
    existingMonthlyObligations: Decimal | null
    requestedLoanAmount: Decimal | null
    requestedTenureMonths: number | null
    annualInterestRate: Decimal | null
    calculatedFoirPercentage: Decimal | null
    maxEligibleEmi: Decimal | null
    maxEligibleLoanAmount: Decimal | null
    postLoanFoirPercentage: Decimal | null
    foirLimitApplied: Decimal | null
  }

  export type FoirAssessmentSumAggregateOutputType = {
    grossMonthlyIncome: Decimal | null
    existingMonthlyObligations: Decimal | null
    requestedLoanAmount: Decimal | null
    requestedTenureMonths: number | null
    annualInterestRate: Decimal | null
    calculatedFoirPercentage: Decimal | null
    maxEligibleEmi: Decimal | null
    maxEligibleLoanAmount: Decimal | null
    postLoanFoirPercentage: Decimal | null
    foirLimitApplied: Decimal | null
  }

  export type FoirAssessmentMinAggregateOutputType = {
    id: string | null
    userId: string | null
    loanType: string | null
    grossMonthlyIncome: Decimal | null
    existingMonthlyObligations: Decimal | null
    requestedLoanAmount: Decimal | null
    requestedTenureMonths: number | null
    annualInterestRate: Decimal | null
    calculatedFoirPercentage: Decimal | null
    maxEligibleEmi: Decimal | null
    maxEligibleLoanAmount: Decimal | null
    postLoanFoirPercentage: Decimal | null
    eligibilityStatus: string | null
    foirLimitApplied: Decimal | null
    incomeSource: string | null
    assessmentNotes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FoirAssessmentMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    loanType: string | null
    grossMonthlyIncome: Decimal | null
    existingMonthlyObligations: Decimal | null
    requestedLoanAmount: Decimal | null
    requestedTenureMonths: number | null
    annualInterestRate: Decimal | null
    calculatedFoirPercentage: Decimal | null
    maxEligibleEmi: Decimal | null
    maxEligibleLoanAmount: Decimal | null
    postLoanFoirPercentage: Decimal | null
    eligibilityStatus: string | null
    foirLimitApplied: Decimal | null
    incomeSource: string | null
    assessmentNotes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FoirAssessmentCountAggregateOutputType = {
    id: number
    userId: number
    loanType: number
    grossMonthlyIncome: number
    existingMonthlyObligations: number
    requestedLoanAmount: number
    requestedTenureMonths: number
    annualInterestRate: number
    calculatedFoirPercentage: number
    maxEligibleEmi: number
    maxEligibleLoanAmount: number
    postLoanFoirPercentage: number
    eligibilityStatus: number
    foirLimitApplied: number
    incomeSource: number
    assessmentNotes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FoirAssessmentAvgAggregateInputType = {
    grossMonthlyIncome?: true
    existingMonthlyObligations?: true
    requestedLoanAmount?: true
    requestedTenureMonths?: true
    annualInterestRate?: true
    calculatedFoirPercentage?: true
    maxEligibleEmi?: true
    maxEligibleLoanAmount?: true
    postLoanFoirPercentage?: true
    foirLimitApplied?: true
  }

  export type FoirAssessmentSumAggregateInputType = {
    grossMonthlyIncome?: true
    existingMonthlyObligations?: true
    requestedLoanAmount?: true
    requestedTenureMonths?: true
    annualInterestRate?: true
    calculatedFoirPercentage?: true
    maxEligibleEmi?: true
    maxEligibleLoanAmount?: true
    postLoanFoirPercentage?: true
    foirLimitApplied?: true
  }

  export type FoirAssessmentMinAggregateInputType = {
    id?: true
    userId?: true
    loanType?: true
    grossMonthlyIncome?: true
    existingMonthlyObligations?: true
    requestedLoanAmount?: true
    requestedTenureMonths?: true
    annualInterestRate?: true
    calculatedFoirPercentage?: true
    maxEligibleEmi?: true
    maxEligibleLoanAmount?: true
    postLoanFoirPercentage?: true
    eligibilityStatus?: true
    foirLimitApplied?: true
    incomeSource?: true
    assessmentNotes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FoirAssessmentMaxAggregateInputType = {
    id?: true
    userId?: true
    loanType?: true
    grossMonthlyIncome?: true
    existingMonthlyObligations?: true
    requestedLoanAmount?: true
    requestedTenureMonths?: true
    annualInterestRate?: true
    calculatedFoirPercentage?: true
    maxEligibleEmi?: true
    maxEligibleLoanAmount?: true
    postLoanFoirPercentage?: true
    eligibilityStatus?: true
    foirLimitApplied?: true
    incomeSource?: true
    assessmentNotes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FoirAssessmentCountAggregateInputType = {
    id?: true
    userId?: true
    loanType?: true
    grossMonthlyIncome?: true
    existingMonthlyObligations?: true
    requestedLoanAmount?: true
    requestedTenureMonths?: true
    annualInterestRate?: true
    calculatedFoirPercentage?: true
    maxEligibleEmi?: true
    maxEligibleLoanAmount?: true
    postLoanFoirPercentage?: true
    eligibilityStatus?: true
    foirLimitApplied?: true
    incomeSource?: true
    assessmentNotes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FoirAssessmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FoirAssessment to aggregate.
     */
    where?: FoirAssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoirAssessments to fetch.
     */
    orderBy?: FoirAssessmentOrderByWithRelationInput | FoirAssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FoirAssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoirAssessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoirAssessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FoirAssessments
    **/
    _count?: true | FoirAssessmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FoirAssessmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FoirAssessmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FoirAssessmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FoirAssessmentMaxAggregateInputType
  }

  export type GetFoirAssessmentAggregateType<T extends FoirAssessmentAggregateArgs> = {
        [P in keyof T & keyof AggregateFoirAssessment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFoirAssessment[P]>
      : GetScalarType<T[P], AggregateFoirAssessment[P]>
  }




  export type FoirAssessmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FoirAssessmentWhereInput
    orderBy?: FoirAssessmentOrderByWithAggregationInput | FoirAssessmentOrderByWithAggregationInput[]
    by: FoirAssessmentScalarFieldEnum[] | FoirAssessmentScalarFieldEnum
    having?: FoirAssessmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FoirAssessmentCountAggregateInputType | true
    _avg?: FoirAssessmentAvgAggregateInputType
    _sum?: FoirAssessmentSumAggregateInputType
    _min?: FoirAssessmentMinAggregateInputType
    _max?: FoirAssessmentMaxAggregateInputType
  }

  export type FoirAssessmentGroupByOutputType = {
    id: string
    userId: string
    loanType: string
    grossMonthlyIncome: Decimal
    existingMonthlyObligations: Decimal
    requestedLoanAmount: Decimal
    requestedTenureMonths: number
    annualInterestRate: Decimal
    calculatedFoirPercentage: Decimal
    maxEligibleEmi: Decimal
    maxEligibleLoanAmount: Decimal
    postLoanFoirPercentage: Decimal
    eligibilityStatus: string
    foirLimitApplied: Decimal
    incomeSource: string
    assessmentNotes: string | null
    createdAt: Date
    updatedAt: Date
    _count: FoirAssessmentCountAggregateOutputType | null
    _avg: FoirAssessmentAvgAggregateOutputType | null
    _sum: FoirAssessmentSumAggregateOutputType | null
    _min: FoirAssessmentMinAggregateOutputType | null
    _max: FoirAssessmentMaxAggregateOutputType | null
  }

  type GetFoirAssessmentGroupByPayload<T extends FoirAssessmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FoirAssessmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FoirAssessmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FoirAssessmentGroupByOutputType[P]>
            : GetScalarType<T[P], FoirAssessmentGroupByOutputType[P]>
        }
      >
    >


  export type FoirAssessmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    loanType?: boolean
    grossMonthlyIncome?: boolean
    existingMonthlyObligations?: boolean
    requestedLoanAmount?: boolean
    requestedTenureMonths?: boolean
    annualInterestRate?: boolean
    calculatedFoirPercentage?: boolean
    maxEligibleEmi?: boolean
    maxEligibleLoanAmount?: boolean
    postLoanFoirPercentage?: boolean
    eligibilityStatus?: boolean
    foirLimitApplied?: boolean
    incomeSource?: boolean
    assessmentNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["foirAssessment"]>


  export type FoirAssessmentSelectScalar = {
    id?: boolean
    userId?: boolean
    loanType?: boolean
    grossMonthlyIncome?: boolean
    existingMonthlyObligations?: boolean
    requestedLoanAmount?: boolean
    requestedTenureMonths?: boolean
    annualInterestRate?: boolean
    calculatedFoirPercentage?: boolean
    maxEligibleEmi?: boolean
    maxEligibleLoanAmount?: boolean
    postLoanFoirPercentage?: boolean
    eligibilityStatus?: boolean
    foirLimitApplied?: boolean
    incomeSource?: boolean
    assessmentNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $FoirAssessmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FoirAssessment"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      loanType: string
      grossMonthlyIncome: Prisma.Decimal
      existingMonthlyObligations: Prisma.Decimal
      requestedLoanAmount: Prisma.Decimal
      requestedTenureMonths: number
      annualInterestRate: Prisma.Decimal
      calculatedFoirPercentage: Prisma.Decimal
      maxEligibleEmi: Prisma.Decimal
      maxEligibleLoanAmount: Prisma.Decimal
      postLoanFoirPercentage: Prisma.Decimal
      eligibilityStatus: string
      foirLimitApplied: Prisma.Decimal
      incomeSource: string
      assessmentNotes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["foirAssessment"]>
    composites: {}
  }

  type FoirAssessmentGetPayload<S extends boolean | null | undefined | FoirAssessmentDefaultArgs> = $Result.GetResult<Prisma.$FoirAssessmentPayload, S>

  type FoirAssessmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FoirAssessmentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FoirAssessmentCountAggregateInputType | true
    }

  export interface FoirAssessmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FoirAssessment'], meta: { name: 'FoirAssessment' } }
    /**
     * Find zero or one FoirAssessment that matches the filter.
     * @param {FoirAssessmentFindUniqueArgs} args - Arguments to find a FoirAssessment
     * @example
     * // Get one FoirAssessment
     * const foirAssessment = await prisma.foirAssessment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FoirAssessmentFindUniqueArgs>(args: SelectSubset<T, FoirAssessmentFindUniqueArgs<ExtArgs>>): Prisma__FoirAssessmentClient<$Result.GetResult<Prisma.$FoirAssessmentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one FoirAssessment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FoirAssessmentFindUniqueOrThrowArgs} args - Arguments to find a FoirAssessment
     * @example
     * // Get one FoirAssessment
     * const foirAssessment = await prisma.foirAssessment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FoirAssessmentFindUniqueOrThrowArgs>(args: SelectSubset<T, FoirAssessmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FoirAssessmentClient<$Result.GetResult<Prisma.$FoirAssessmentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first FoirAssessment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoirAssessmentFindFirstArgs} args - Arguments to find a FoirAssessment
     * @example
     * // Get one FoirAssessment
     * const foirAssessment = await prisma.foirAssessment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FoirAssessmentFindFirstArgs>(args?: SelectSubset<T, FoirAssessmentFindFirstArgs<ExtArgs>>): Prisma__FoirAssessmentClient<$Result.GetResult<Prisma.$FoirAssessmentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first FoirAssessment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoirAssessmentFindFirstOrThrowArgs} args - Arguments to find a FoirAssessment
     * @example
     * // Get one FoirAssessment
     * const foirAssessment = await prisma.foirAssessment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FoirAssessmentFindFirstOrThrowArgs>(args?: SelectSubset<T, FoirAssessmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__FoirAssessmentClient<$Result.GetResult<Prisma.$FoirAssessmentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more FoirAssessments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoirAssessmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FoirAssessments
     * const foirAssessments = await prisma.foirAssessment.findMany()
     * 
     * // Get first 10 FoirAssessments
     * const foirAssessments = await prisma.foirAssessment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const foirAssessmentWithIdOnly = await prisma.foirAssessment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FoirAssessmentFindManyArgs>(args?: SelectSubset<T, FoirAssessmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoirAssessmentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a FoirAssessment.
     * @param {FoirAssessmentCreateArgs} args - Arguments to create a FoirAssessment.
     * @example
     * // Create one FoirAssessment
     * const FoirAssessment = await prisma.foirAssessment.create({
     *   data: {
     *     // ... data to create a FoirAssessment
     *   }
     * })
     * 
     */
    create<T extends FoirAssessmentCreateArgs>(args: SelectSubset<T, FoirAssessmentCreateArgs<ExtArgs>>): Prisma__FoirAssessmentClient<$Result.GetResult<Prisma.$FoirAssessmentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many FoirAssessments.
     * @param {FoirAssessmentCreateManyArgs} args - Arguments to create many FoirAssessments.
     * @example
     * // Create many FoirAssessments
     * const foirAssessment = await prisma.foirAssessment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FoirAssessmentCreateManyArgs>(args?: SelectSubset<T, FoirAssessmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a FoirAssessment.
     * @param {FoirAssessmentDeleteArgs} args - Arguments to delete one FoirAssessment.
     * @example
     * // Delete one FoirAssessment
     * const FoirAssessment = await prisma.foirAssessment.delete({
     *   where: {
     *     // ... filter to delete one FoirAssessment
     *   }
     * })
     * 
     */
    delete<T extends FoirAssessmentDeleteArgs>(args: SelectSubset<T, FoirAssessmentDeleteArgs<ExtArgs>>): Prisma__FoirAssessmentClient<$Result.GetResult<Prisma.$FoirAssessmentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one FoirAssessment.
     * @param {FoirAssessmentUpdateArgs} args - Arguments to update one FoirAssessment.
     * @example
     * // Update one FoirAssessment
     * const foirAssessment = await prisma.foirAssessment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FoirAssessmentUpdateArgs>(args: SelectSubset<T, FoirAssessmentUpdateArgs<ExtArgs>>): Prisma__FoirAssessmentClient<$Result.GetResult<Prisma.$FoirAssessmentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more FoirAssessments.
     * @param {FoirAssessmentDeleteManyArgs} args - Arguments to filter FoirAssessments to delete.
     * @example
     * // Delete a few FoirAssessments
     * const { count } = await prisma.foirAssessment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FoirAssessmentDeleteManyArgs>(args?: SelectSubset<T, FoirAssessmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FoirAssessments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoirAssessmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FoirAssessments
     * const foirAssessment = await prisma.foirAssessment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FoirAssessmentUpdateManyArgs>(args: SelectSubset<T, FoirAssessmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FoirAssessment.
     * @param {FoirAssessmentUpsertArgs} args - Arguments to update or create a FoirAssessment.
     * @example
     * // Update or create a FoirAssessment
     * const foirAssessment = await prisma.foirAssessment.upsert({
     *   create: {
     *     // ... data to create a FoirAssessment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FoirAssessment we want to update
     *   }
     * })
     */
    upsert<T extends FoirAssessmentUpsertArgs>(args: SelectSubset<T, FoirAssessmentUpsertArgs<ExtArgs>>): Prisma__FoirAssessmentClient<$Result.GetResult<Prisma.$FoirAssessmentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of FoirAssessments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoirAssessmentCountArgs} args - Arguments to filter FoirAssessments to count.
     * @example
     * // Count the number of FoirAssessments
     * const count = await prisma.foirAssessment.count({
     *   where: {
     *     // ... the filter for the FoirAssessments we want to count
     *   }
     * })
    **/
    count<T extends FoirAssessmentCountArgs>(
      args?: Subset<T, FoirAssessmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FoirAssessmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FoirAssessment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoirAssessmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FoirAssessmentAggregateArgs>(args: Subset<T, FoirAssessmentAggregateArgs>): Prisma.PrismaPromise<GetFoirAssessmentAggregateType<T>>

    /**
     * Group by FoirAssessment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoirAssessmentGroupByArgs} args - Group by arguments.
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
      T extends FoirAssessmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FoirAssessmentGroupByArgs['orderBy'] }
        : { orderBy?: FoirAssessmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FoirAssessmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFoirAssessmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FoirAssessment model
   */
  readonly fields: FoirAssessmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FoirAssessment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FoirAssessmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the FoirAssessment model
   */ 
  interface FoirAssessmentFieldRefs {
    readonly id: FieldRef<"FoirAssessment", 'String'>
    readonly userId: FieldRef<"FoirAssessment", 'String'>
    readonly loanType: FieldRef<"FoirAssessment", 'String'>
    readonly grossMonthlyIncome: FieldRef<"FoirAssessment", 'Decimal'>
    readonly existingMonthlyObligations: FieldRef<"FoirAssessment", 'Decimal'>
    readonly requestedLoanAmount: FieldRef<"FoirAssessment", 'Decimal'>
    readonly requestedTenureMonths: FieldRef<"FoirAssessment", 'Int'>
    readonly annualInterestRate: FieldRef<"FoirAssessment", 'Decimal'>
    readonly calculatedFoirPercentage: FieldRef<"FoirAssessment", 'Decimal'>
    readonly maxEligibleEmi: FieldRef<"FoirAssessment", 'Decimal'>
    readonly maxEligibleLoanAmount: FieldRef<"FoirAssessment", 'Decimal'>
    readonly postLoanFoirPercentage: FieldRef<"FoirAssessment", 'Decimal'>
    readonly eligibilityStatus: FieldRef<"FoirAssessment", 'String'>
    readonly foirLimitApplied: FieldRef<"FoirAssessment", 'Decimal'>
    readonly incomeSource: FieldRef<"FoirAssessment", 'String'>
    readonly assessmentNotes: FieldRef<"FoirAssessment", 'String'>
    readonly createdAt: FieldRef<"FoirAssessment", 'DateTime'>
    readonly updatedAt: FieldRef<"FoirAssessment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FoirAssessment findUnique
   */
  export type FoirAssessmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoirAssessment
     */
    select?: FoirAssessmentSelect<ExtArgs> | null
    /**
     * Filter, which FoirAssessment to fetch.
     */
    where: FoirAssessmentWhereUniqueInput
  }

  /**
   * FoirAssessment findUniqueOrThrow
   */
  export type FoirAssessmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoirAssessment
     */
    select?: FoirAssessmentSelect<ExtArgs> | null
    /**
     * Filter, which FoirAssessment to fetch.
     */
    where: FoirAssessmentWhereUniqueInput
  }

  /**
   * FoirAssessment findFirst
   */
  export type FoirAssessmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoirAssessment
     */
    select?: FoirAssessmentSelect<ExtArgs> | null
    /**
     * Filter, which FoirAssessment to fetch.
     */
    where?: FoirAssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoirAssessments to fetch.
     */
    orderBy?: FoirAssessmentOrderByWithRelationInput | FoirAssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FoirAssessments.
     */
    cursor?: FoirAssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoirAssessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoirAssessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FoirAssessments.
     */
    distinct?: FoirAssessmentScalarFieldEnum | FoirAssessmentScalarFieldEnum[]
  }

  /**
   * FoirAssessment findFirstOrThrow
   */
  export type FoirAssessmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoirAssessment
     */
    select?: FoirAssessmentSelect<ExtArgs> | null
    /**
     * Filter, which FoirAssessment to fetch.
     */
    where?: FoirAssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoirAssessments to fetch.
     */
    orderBy?: FoirAssessmentOrderByWithRelationInput | FoirAssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FoirAssessments.
     */
    cursor?: FoirAssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoirAssessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoirAssessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FoirAssessments.
     */
    distinct?: FoirAssessmentScalarFieldEnum | FoirAssessmentScalarFieldEnum[]
  }

  /**
   * FoirAssessment findMany
   */
  export type FoirAssessmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoirAssessment
     */
    select?: FoirAssessmentSelect<ExtArgs> | null
    /**
     * Filter, which FoirAssessments to fetch.
     */
    where?: FoirAssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoirAssessments to fetch.
     */
    orderBy?: FoirAssessmentOrderByWithRelationInput | FoirAssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FoirAssessments.
     */
    cursor?: FoirAssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoirAssessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoirAssessments.
     */
    skip?: number
    distinct?: FoirAssessmentScalarFieldEnum | FoirAssessmentScalarFieldEnum[]
  }

  /**
   * FoirAssessment create
   */
  export type FoirAssessmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoirAssessment
     */
    select?: FoirAssessmentSelect<ExtArgs> | null
    /**
     * The data needed to create a FoirAssessment.
     */
    data: XOR<FoirAssessmentCreateInput, FoirAssessmentUncheckedCreateInput>
  }

  /**
   * FoirAssessment createMany
   */
  export type FoirAssessmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FoirAssessments.
     */
    data: FoirAssessmentCreateManyInput | FoirAssessmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FoirAssessment update
   */
  export type FoirAssessmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoirAssessment
     */
    select?: FoirAssessmentSelect<ExtArgs> | null
    /**
     * The data needed to update a FoirAssessment.
     */
    data: XOR<FoirAssessmentUpdateInput, FoirAssessmentUncheckedUpdateInput>
    /**
     * Choose, which FoirAssessment to update.
     */
    where: FoirAssessmentWhereUniqueInput
  }

  /**
   * FoirAssessment updateMany
   */
  export type FoirAssessmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FoirAssessments.
     */
    data: XOR<FoirAssessmentUpdateManyMutationInput, FoirAssessmentUncheckedUpdateManyInput>
    /**
     * Filter which FoirAssessments to update
     */
    where?: FoirAssessmentWhereInput
  }

  /**
   * FoirAssessment upsert
   */
  export type FoirAssessmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoirAssessment
     */
    select?: FoirAssessmentSelect<ExtArgs> | null
    /**
     * The filter to search for the FoirAssessment to update in case it exists.
     */
    where: FoirAssessmentWhereUniqueInput
    /**
     * In case the FoirAssessment found by the `where` argument doesn't exist, create a new FoirAssessment with this data.
     */
    create: XOR<FoirAssessmentCreateInput, FoirAssessmentUncheckedCreateInput>
    /**
     * In case the FoirAssessment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FoirAssessmentUpdateInput, FoirAssessmentUncheckedUpdateInput>
  }

  /**
   * FoirAssessment delete
   */
  export type FoirAssessmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoirAssessment
     */
    select?: FoirAssessmentSelect<ExtArgs> | null
    /**
     * Filter which FoirAssessment to delete.
     */
    where: FoirAssessmentWhereUniqueInput
  }

  /**
   * FoirAssessment deleteMany
   */
  export type FoirAssessmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FoirAssessments to delete
     */
    where?: FoirAssessmentWhereInput
  }

  /**
   * FoirAssessment without action
   */
  export type FoirAssessmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoirAssessment
     */
    select?: FoirAssessmentSelect<ExtArgs> | null
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


  export const ConnectorScalarFieldEnum: {
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

  export type ConnectorScalarFieldEnum = (typeof ConnectorScalarFieldEnum)[keyof typeof ConnectorScalarFieldEnum]


  export const HierarchyMappingScalarFieldEnum: {
    id: 'id',
    connectorId: 'connectorId',
    managerId: 'managerId',
    role: 'role',
    assignedAt: 'assignedAt',
    assignedBy: 'assignedBy'
  };

  export type HierarchyMappingScalarFieldEnum = (typeof HierarchyMappingScalarFieldEnum)[keyof typeof HierarchyMappingScalarFieldEnum]


  export const ConnectorStatusHistoryScalarFieldEnum: {
    id: 'id',
    connectorId: 'connectorId',
    status: 'status',
    changedAt: 'changedAt',
    changedBy: 'changedBy',
    remarks: 'remarks'
  };

  export type ConnectorStatusHistoryScalarFieldEnum = (typeof ConnectorStatusHistoryScalarFieldEnum)[keyof typeof ConnectorStatusHistoryScalarFieldEnum]


  export const ConnectorPerformanceScalarFieldEnum: {
    id: 'id',
    connectorId: 'connectorId',
    totalLeads: 'totalLeads',
    convertedLeads: 'convertedLeads',
    totalCommission: 'totalCommission',
    lastCalculatedAt: 'lastCalculatedAt'
  };

  export type ConnectorPerformanceScalarFieldEnum = (typeof ConnectorPerformanceScalarFieldEnum)[keyof typeof ConnectorPerformanceScalarFieldEnum]


  export const CommissionRuleScalarFieldEnum: {
    id: 'id',
    ruleName: 'ruleName',
    connectorRate: 'connectorRate',
    tlOverrideRate: 'tlOverrideRate',
    rmOverrideRate: 'rmOverrideRate',
    isActive: 'isActive'
  };

  export type CommissionRuleScalarFieldEnum = (typeof CommissionRuleScalarFieldEnum)[keyof typeof CommissionRuleScalarFieldEnum]


  export const CommissionTransactionScalarFieldEnum: {
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

  export type CommissionTransactionScalarFieldEnum = (typeof CommissionTransactionScalarFieldEnum)[keyof typeof CommissionTransactionScalarFieldEnum]


  export const PayoutHistoryScalarFieldEnum: {
    id: 'id',
    transactionId: 'transactionId',
    paidAmount: 'paidAmount',
    paidAt: 'paidAt',
    paidBy: 'paidBy'
  };

  export type PayoutHistoryScalarFieldEnum = (typeof PayoutHistoryScalarFieldEnum)[keyof typeof PayoutHistoryScalarFieldEnum]


  export const PayoutSlabScalarFieldEnum: {
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

  export type PayoutSlabScalarFieldEnum = (typeof PayoutSlabScalarFieldEnum)[keyof typeof PayoutSlabScalarFieldEnum]


  export const SalesManagerScalarFieldEnum: {
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

  export type SalesManagerScalarFieldEnum = (typeof SalesManagerScalarFieldEnum)[keyof typeof SalesManagerScalarFieldEnum]


  export const RoutingHistoryScalarFieldEnum: {
    id: 'id',
    loanId: 'loanId',
    assignedSmId: 'assignedSmId',
    routingScore: 'routingScore',
    assignedAt: 'assignedAt'
  };

  export type RoutingHistoryScalarFieldEnum = (typeof RoutingHistoryScalarFieldEnum)[keyof typeof RoutingHistoryScalarFieldEnum]


  export const CareerApplicationScalarFieldEnum: {
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

  export type CareerApplicationScalarFieldEnum = (typeof CareerApplicationScalarFieldEnum)[keyof typeof CareerApplicationScalarFieldEnum]


  export const FoirAssessmentScalarFieldEnum: {
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

  export type FoirAssessmentScalarFieldEnum = (typeof FoirAssessmentScalarFieldEnum)[keyof typeof FoirAssessmentScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type ConnectorWhereInput = {
    AND?: ConnectorWhereInput | ConnectorWhereInput[]
    OR?: ConnectorWhereInput[]
    NOT?: ConnectorWhereInput | ConnectorWhereInput[]
    id?: StringFilter<"Connector"> | string
    userId?: StringFilter<"Connector"> | string
    firstName?: StringFilter<"Connector"> | string
    lastName?: StringFilter<"Connector"> | string
    phone?: StringNullableFilter<"Connector"> | string | null
    email?: StringNullableFilter<"Connector"> | string | null
    region?: StringNullableFilter<"Connector"> | string | null
    status?: StringFilter<"Connector"> | string
    platformRole?: StringNullableFilter<"Connector"> | string | null
    createdAt?: DateTimeFilter<"Connector"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Connector"> | Date | string | null
    createdBy?: StringNullableFilter<"Connector"> | string | null
    updatedBy?: StringNullableFilter<"Connector"> | string | null
    hierarchies?: HierarchyMappingListRelationFilter
    managed?: HierarchyMappingListRelationFilter
    statusHistory?: ConnectorStatusHistoryListRelationFilter
    performance?: XOR<ConnectorPerformanceNullableRelationFilter, ConnectorPerformanceWhereInput> | null
    payoutSlabs?: PayoutSlabListRelationFilter
    commissions?: CommissionTransactionListRelationFilter
  }

  export type ConnectorOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    region?: SortOrderInput | SortOrder
    status?: SortOrder
    platformRole?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    hierarchies?: HierarchyMappingOrderByRelationAggregateInput
    managed?: HierarchyMappingOrderByRelationAggregateInput
    statusHistory?: ConnectorStatusHistoryOrderByRelationAggregateInput
    performance?: ConnectorPerformanceOrderByWithRelationInput
    payoutSlabs?: PayoutSlabOrderByRelationAggregateInput
    commissions?: CommissionTransactionOrderByRelationAggregateInput
  }

  export type ConnectorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    phone?: string
    AND?: ConnectorWhereInput | ConnectorWhereInput[]
    OR?: ConnectorWhereInput[]
    NOT?: ConnectorWhereInput | ConnectorWhereInput[]
    firstName?: StringFilter<"Connector"> | string
    lastName?: StringFilter<"Connector"> | string
    email?: StringNullableFilter<"Connector"> | string | null
    region?: StringNullableFilter<"Connector"> | string | null
    status?: StringFilter<"Connector"> | string
    platformRole?: StringNullableFilter<"Connector"> | string | null
    createdAt?: DateTimeFilter<"Connector"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Connector"> | Date | string | null
    createdBy?: StringNullableFilter<"Connector"> | string | null
    updatedBy?: StringNullableFilter<"Connector"> | string | null
    hierarchies?: HierarchyMappingListRelationFilter
    managed?: HierarchyMappingListRelationFilter
    statusHistory?: ConnectorStatusHistoryListRelationFilter
    performance?: XOR<ConnectorPerformanceNullableRelationFilter, ConnectorPerformanceWhereInput> | null
    payoutSlabs?: PayoutSlabListRelationFilter
    commissions?: CommissionTransactionListRelationFilter
  }, "id" | "userId" | "phone">

  export type ConnectorOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    region?: SortOrderInput | SortOrder
    status?: SortOrder
    platformRole?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    _count?: ConnectorCountOrderByAggregateInput
    _max?: ConnectorMaxOrderByAggregateInput
    _min?: ConnectorMinOrderByAggregateInput
  }

  export type ConnectorScalarWhereWithAggregatesInput = {
    AND?: ConnectorScalarWhereWithAggregatesInput | ConnectorScalarWhereWithAggregatesInput[]
    OR?: ConnectorScalarWhereWithAggregatesInput[]
    NOT?: ConnectorScalarWhereWithAggregatesInput | ConnectorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Connector"> | string
    userId?: StringWithAggregatesFilter<"Connector"> | string
    firstName?: StringWithAggregatesFilter<"Connector"> | string
    lastName?: StringWithAggregatesFilter<"Connector"> | string
    phone?: StringNullableWithAggregatesFilter<"Connector"> | string | null
    email?: StringNullableWithAggregatesFilter<"Connector"> | string | null
    region?: StringNullableWithAggregatesFilter<"Connector"> | string | null
    status?: StringWithAggregatesFilter<"Connector"> | string
    platformRole?: StringNullableWithAggregatesFilter<"Connector"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Connector"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Connector"> | Date | string | null
    createdBy?: StringNullableWithAggregatesFilter<"Connector"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"Connector"> | string | null
  }

  export type HierarchyMappingWhereInput = {
    AND?: HierarchyMappingWhereInput | HierarchyMappingWhereInput[]
    OR?: HierarchyMappingWhereInput[]
    NOT?: HierarchyMappingWhereInput | HierarchyMappingWhereInput[]
    id?: StringFilter<"HierarchyMapping"> | string
    connectorId?: StringNullableFilter<"HierarchyMapping"> | string | null
    managerId?: StringNullableFilter<"HierarchyMapping"> | string | null
    role?: StringFilter<"HierarchyMapping"> | string
    assignedAt?: DateTimeFilter<"HierarchyMapping"> | Date | string
    assignedBy?: StringNullableFilter<"HierarchyMapping"> | string | null
    connector?: XOR<ConnectorNullableRelationFilter, ConnectorWhereInput> | null
    manager?: XOR<ConnectorNullableRelationFilter, ConnectorWhereInput> | null
  }

  export type HierarchyMappingOrderByWithRelationInput = {
    id?: SortOrder
    connectorId?: SortOrderInput | SortOrder
    managerId?: SortOrderInput | SortOrder
    role?: SortOrder
    assignedAt?: SortOrder
    assignedBy?: SortOrderInput | SortOrder
    connector?: ConnectorOrderByWithRelationInput
    manager?: ConnectorOrderByWithRelationInput
  }

  export type HierarchyMappingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HierarchyMappingWhereInput | HierarchyMappingWhereInput[]
    OR?: HierarchyMappingWhereInput[]
    NOT?: HierarchyMappingWhereInput | HierarchyMappingWhereInput[]
    connectorId?: StringNullableFilter<"HierarchyMapping"> | string | null
    managerId?: StringNullableFilter<"HierarchyMapping"> | string | null
    role?: StringFilter<"HierarchyMapping"> | string
    assignedAt?: DateTimeFilter<"HierarchyMapping"> | Date | string
    assignedBy?: StringNullableFilter<"HierarchyMapping"> | string | null
    connector?: XOR<ConnectorNullableRelationFilter, ConnectorWhereInput> | null
    manager?: XOR<ConnectorNullableRelationFilter, ConnectorWhereInput> | null
  }, "id">

  export type HierarchyMappingOrderByWithAggregationInput = {
    id?: SortOrder
    connectorId?: SortOrderInput | SortOrder
    managerId?: SortOrderInput | SortOrder
    role?: SortOrder
    assignedAt?: SortOrder
    assignedBy?: SortOrderInput | SortOrder
    _count?: HierarchyMappingCountOrderByAggregateInput
    _max?: HierarchyMappingMaxOrderByAggregateInput
    _min?: HierarchyMappingMinOrderByAggregateInput
  }

  export type HierarchyMappingScalarWhereWithAggregatesInput = {
    AND?: HierarchyMappingScalarWhereWithAggregatesInput | HierarchyMappingScalarWhereWithAggregatesInput[]
    OR?: HierarchyMappingScalarWhereWithAggregatesInput[]
    NOT?: HierarchyMappingScalarWhereWithAggregatesInput | HierarchyMappingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HierarchyMapping"> | string
    connectorId?: StringNullableWithAggregatesFilter<"HierarchyMapping"> | string | null
    managerId?: StringNullableWithAggregatesFilter<"HierarchyMapping"> | string | null
    role?: StringWithAggregatesFilter<"HierarchyMapping"> | string
    assignedAt?: DateTimeWithAggregatesFilter<"HierarchyMapping"> | Date | string
    assignedBy?: StringNullableWithAggregatesFilter<"HierarchyMapping"> | string | null
  }

  export type ConnectorStatusHistoryWhereInput = {
    AND?: ConnectorStatusHistoryWhereInput | ConnectorStatusHistoryWhereInput[]
    OR?: ConnectorStatusHistoryWhereInput[]
    NOT?: ConnectorStatusHistoryWhereInput | ConnectorStatusHistoryWhereInput[]
    id?: StringFilter<"ConnectorStatusHistory"> | string
    connectorId?: StringNullableFilter<"ConnectorStatusHistory"> | string | null
    status?: StringFilter<"ConnectorStatusHistory"> | string
    changedAt?: DateTimeFilter<"ConnectorStatusHistory"> | Date | string
    changedBy?: StringNullableFilter<"ConnectorStatusHistory"> | string | null
    remarks?: StringNullableFilter<"ConnectorStatusHistory"> | string | null
    connector?: XOR<ConnectorNullableRelationFilter, ConnectorWhereInput> | null
  }

  export type ConnectorStatusHistoryOrderByWithRelationInput = {
    id?: SortOrder
    connectorId?: SortOrderInput | SortOrder
    status?: SortOrder
    changedAt?: SortOrder
    changedBy?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    connector?: ConnectorOrderByWithRelationInput
  }

  export type ConnectorStatusHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConnectorStatusHistoryWhereInput | ConnectorStatusHistoryWhereInput[]
    OR?: ConnectorStatusHistoryWhereInput[]
    NOT?: ConnectorStatusHistoryWhereInput | ConnectorStatusHistoryWhereInput[]
    connectorId?: StringNullableFilter<"ConnectorStatusHistory"> | string | null
    status?: StringFilter<"ConnectorStatusHistory"> | string
    changedAt?: DateTimeFilter<"ConnectorStatusHistory"> | Date | string
    changedBy?: StringNullableFilter<"ConnectorStatusHistory"> | string | null
    remarks?: StringNullableFilter<"ConnectorStatusHistory"> | string | null
    connector?: XOR<ConnectorNullableRelationFilter, ConnectorWhereInput> | null
  }, "id">

  export type ConnectorStatusHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    connectorId?: SortOrderInput | SortOrder
    status?: SortOrder
    changedAt?: SortOrder
    changedBy?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    _count?: ConnectorStatusHistoryCountOrderByAggregateInput
    _max?: ConnectorStatusHistoryMaxOrderByAggregateInput
    _min?: ConnectorStatusHistoryMinOrderByAggregateInput
  }

  export type ConnectorStatusHistoryScalarWhereWithAggregatesInput = {
    AND?: ConnectorStatusHistoryScalarWhereWithAggregatesInput | ConnectorStatusHistoryScalarWhereWithAggregatesInput[]
    OR?: ConnectorStatusHistoryScalarWhereWithAggregatesInput[]
    NOT?: ConnectorStatusHistoryScalarWhereWithAggregatesInput | ConnectorStatusHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ConnectorStatusHistory"> | string
    connectorId?: StringNullableWithAggregatesFilter<"ConnectorStatusHistory"> | string | null
    status?: StringWithAggregatesFilter<"ConnectorStatusHistory"> | string
    changedAt?: DateTimeWithAggregatesFilter<"ConnectorStatusHistory"> | Date | string
    changedBy?: StringNullableWithAggregatesFilter<"ConnectorStatusHistory"> | string | null
    remarks?: StringNullableWithAggregatesFilter<"ConnectorStatusHistory"> | string | null
  }

  export type ConnectorPerformanceWhereInput = {
    AND?: ConnectorPerformanceWhereInput | ConnectorPerformanceWhereInput[]
    OR?: ConnectorPerformanceWhereInput[]
    NOT?: ConnectorPerformanceWhereInput | ConnectorPerformanceWhereInput[]
    id?: StringFilter<"ConnectorPerformance"> | string
    connectorId?: StringNullableFilter<"ConnectorPerformance"> | string | null
    totalLeads?: IntFilter<"ConnectorPerformance"> | number
    convertedLeads?: IntFilter<"ConnectorPerformance"> | number
    totalCommission?: DecimalFilter<"ConnectorPerformance"> | Decimal | DecimalJsLike | number | string
    lastCalculatedAt?: DateTimeNullableFilter<"ConnectorPerformance"> | Date | string | null
    connector?: XOR<ConnectorNullableRelationFilter, ConnectorWhereInput> | null
  }

  export type ConnectorPerformanceOrderByWithRelationInput = {
    id?: SortOrder
    connectorId?: SortOrderInput | SortOrder
    totalLeads?: SortOrder
    convertedLeads?: SortOrder
    totalCommission?: SortOrder
    lastCalculatedAt?: SortOrderInput | SortOrder
    connector?: ConnectorOrderByWithRelationInput
  }

  export type ConnectorPerformanceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    connectorId?: string
    AND?: ConnectorPerformanceWhereInput | ConnectorPerformanceWhereInput[]
    OR?: ConnectorPerformanceWhereInput[]
    NOT?: ConnectorPerformanceWhereInput | ConnectorPerformanceWhereInput[]
    totalLeads?: IntFilter<"ConnectorPerformance"> | number
    convertedLeads?: IntFilter<"ConnectorPerformance"> | number
    totalCommission?: DecimalFilter<"ConnectorPerformance"> | Decimal | DecimalJsLike | number | string
    lastCalculatedAt?: DateTimeNullableFilter<"ConnectorPerformance"> | Date | string | null
    connector?: XOR<ConnectorNullableRelationFilter, ConnectorWhereInput> | null
  }, "id" | "connectorId">

  export type ConnectorPerformanceOrderByWithAggregationInput = {
    id?: SortOrder
    connectorId?: SortOrderInput | SortOrder
    totalLeads?: SortOrder
    convertedLeads?: SortOrder
    totalCommission?: SortOrder
    lastCalculatedAt?: SortOrderInput | SortOrder
    _count?: ConnectorPerformanceCountOrderByAggregateInput
    _avg?: ConnectorPerformanceAvgOrderByAggregateInput
    _max?: ConnectorPerformanceMaxOrderByAggregateInput
    _min?: ConnectorPerformanceMinOrderByAggregateInput
    _sum?: ConnectorPerformanceSumOrderByAggregateInput
  }

  export type ConnectorPerformanceScalarWhereWithAggregatesInput = {
    AND?: ConnectorPerformanceScalarWhereWithAggregatesInput | ConnectorPerformanceScalarWhereWithAggregatesInput[]
    OR?: ConnectorPerformanceScalarWhereWithAggregatesInput[]
    NOT?: ConnectorPerformanceScalarWhereWithAggregatesInput | ConnectorPerformanceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ConnectorPerformance"> | string
    connectorId?: StringNullableWithAggregatesFilter<"ConnectorPerformance"> | string | null
    totalLeads?: IntWithAggregatesFilter<"ConnectorPerformance"> | number
    convertedLeads?: IntWithAggregatesFilter<"ConnectorPerformance"> | number
    totalCommission?: DecimalWithAggregatesFilter<"ConnectorPerformance"> | Decimal | DecimalJsLike | number | string
    lastCalculatedAt?: DateTimeNullableWithAggregatesFilter<"ConnectorPerformance"> | Date | string | null
  }

  export type CommissionRuleWhereInput = {
    AND?: CommissionRuleWhereInput | CommissionRuleWhereInput[]
    OR?: CommissionRuleWhereInput[]
    NOT?: CommissionRuleWhereInput | CommissionRuleWhereInput[]
    id?: StringFilter<"CommissionRule"> | string
    ruleName?: StringFilter<"CommissionRule"> | string
    connectorRate?: DecimalFilter<"CommissionRule"> | Decimal | DecimalJsLike | number | string
    tlOverrideRate?: DecimalFilter<"CommissionRule"> | Decimal | DecimalJsLike | number | string
    rmOverrideRate?: DecimalFilter<"CommissionRule"> | Decimal | DecimalJsLike | number | string
    isActive?: BoolFilter<"CommissionRule"> | boolean
  }

  export type CommissionRuleOrderByWithRelationInput = {
    id?: SortOrder
    ruleName?: SortOrder
    connectorRate?: SortOrder
    tlOverrideRate?: SortOrder
    rmOverrideRate?: SortOrder
    isActive?: SortOrder
  }

  export type CommissionRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    ruleName?: string
    AND?: CommissionRuleWhereInput | CommissionRuleWhereInput[]
    OR?: CommissionRuleWhereInput[]
    NOT?: CommissionRuleWhereInput | CommissionRuleWhereInput[]
    connectorRate?: DecimalFilter<"CommissionRule"> | Decimal | DecimalJsLike | number | string
    tlOverrideRate?: DecimalFilter<"CommissionRule"> | Decimal | DecimalJsLike | number | string
    rmOverrideRate?: DecimalFilter<"CommissionRule"> | Decimal | DecimalJsLike | number | string
    isActive?: BoolFilter<"CommissionRule"> | boolean
  }, "id" | "ruleName">

  export type CommissionRuleOrderByWithAggregationInput = {
    id?: SortOrder
    ruleName?: SortOrder
    connectorRate?: SortOrder
    tlOverrideRate?: SortOrder
    rmOverrideRate?: SortOrder
    isActive?: SortOrder
    _count?: CommissionRuleCountOrderByAggregateInput
    _avg?: CommissionRuleAvgOrderByAggregateInput
    _max?: CommissionRuleMaxOrderByAggregateInput
    _min?: CommissionRuleMinOrderByAggregateInput
    _sum?: CommissionRuleSumOrderByAggregateInput
  }

  export type CommissionRuleScalarWhereWithAggregatesInput = {
    AND?: CommissionRuleScalarWhereWithAggregatesInput | CommissionRuleScalarWhereWithAggregatesInput[]
    OR?: CommissionRuleScalarWhereWithAggregatesInput[]
    NOT?: CommissionRuleScalarWhereWithAggregatesInput | CommissionRuleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CommissionRule"> | string
    ruleName?: StringWithAggregatesFilter<"CommissionRule"> | string
    connectorRate?: DecimalWithAggregatesFilter<"CommissionRule"> | Decimal | DecimalJsLike | number | string
    tlOverrideRate?: DecimalWithAggregatesFilter<"CommissionRule"> | Decimal | DecimalJsLike | number | string
    rmOverrideRate?: DecimalWithAggregatesFilter<"CommissionRule"> | Decimal | DecimalJsLike | number | string
    isActive?: BoolWithAggregatesFilter<"CommissionRule"> | boolean
  }

  export type CommissionTransactionWhereInput = {
    AND?: CommissionTransactionWhereInput | CommissionTransactionWhereInput[]
    OR?: CommissionTransactionWhereInput[]
    NOT?: CommissionTransactionWhereInput | CommissionTransactionWhereInput[]
    id?: StringFilter<"CommissionTransaction"> | string
    loanId?: StringFilter<"CommissionTransaction"> | string
    connectorId?: StringFilter<"CommissionTransaction"> | string
    loanAmount?: DecimalFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string
    connectorRate?: DecimalFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string
    connectorCommission?: DecimalFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string
    teamLeaderOverride?: DecimalNullableFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string | null
    rmOverride?: DecimalNullableFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string | null
    totalPayout?: DecimalFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"CommissionTransaction"> | string
    amountPaid?: DecimalFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string
    paymentDate?: DateTimeNullableFilter<"CommissionTransaction"> | Date | string | null
    createdAt?: DateTimeFilter<"CommissionTransaction"> | Date | string
    connector?: XOR<ConnectorRelationFilter, ConnectorWhereInput>
    payoutHistory?: PayoutHistoryListRelationFilter
  }

  export type CommissionTransactionOrderByWithRelationInput = {
    id?: SortOrder
    loanId?: SortOrder
    connectorId?: SortOrder
    loanAmount?: SortOrder
    connectorRate?: SortOrder
    connectorCommission?: SortOrder
    teamLeaderOverride?: SortOrderInput | SortOrder
    rmOverride?: SortOrderInput | SortOrder
    totalPayout?: SortOrder
    status?: SortOrder
    amountPaid?: SortOrder
    paymentDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    connector?: ConnectorOrderByWithRelationInput
    payoutHistory?: PayoutHistoryOrderByRelationAggregateInput
  }

  export type CommissionTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CommissionTransactionWhereInput | CommissionTransactionWhereInput[]
    OR?: CommissionTransactionWhereInput[]
    NOT?: CommissionTransactionWhereInput | CommissionTransactionWhereInput[]
    loanId?: StringFilter<"CommissionTransaction"> | string
    connectorId?: StringFilter<"CommissionTransaction"> | string
    loanAmount?: DecimalFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string
    connectorRate?: DecimalFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string
    connectorCommission?: DecimalFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string
    teamLeaderOverride?: DecimalNullableFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string | null
    rmOverride?: DecimalNullableFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string | null
    totalPayout?: DecimalFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"CommissionTransaction"> | string
    amountPaid?: DecimalFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string
    paymentDate?: DateTimeNullableFilter<"CommissionTransaction"> | Date | string | null
    createdAt?: DateTimeFilter<"CommissionTransaction"> | Date | string
    connector?: XOR<ConnectorRelationFilter, ConnectorWhereInput>
    payoutHistory?: PayoutHistoryListRelationFilter
  }, "id">

  export type CommissionTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    loanId?: SortOrder
    connectorId?: SortOrder
    loanAmount?: SortOrder
    connectorRate?: SortOrder
    connectorCommission?: SortOrder
    teamLeaderOverride?: SortOrderInput | SortOrder
    rmOverride?: SortOrderInput | SortOrder
    totalPayout?: SortOrder
    status?: SortOrder
    amountPaid?: SortOrder
    paymentDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CommissionTransactionCountOrderByAggregateInput
    _avg?: CommissionTransactionAvgOrderByAggregateInput
    _max?: CommissionTransactionMaxOrderByAggregateInput
    _min?: CommissionTransactionMinOrderByAggregateInput
    _sum?: CommissionTransactionSumOrderByAggregateInput
  }

  export type CommissionTransactionScalarWhereWithAggregatesInput = {
    AND?: CommissionTransactionScalarWhereWithAggregatesInput | CommissionTransactionScalarWhereWithAggregatesInput[]
    OR?: CommissionTransactionScalarWhereWithAggregatesInput[]
    NOT?: CommissionTransactionScalarWhereWithAggregatesInput | CommissionTransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CommissionTransaction"> | string
    loanId?: StringWithAggregatesFilter<"CommissionTransaction"> | string
    connectorId?: StringWithAggregatesFilter<"CommissionTransaction"> | string
    loanAmount?: DecimalWithAggregatesFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string
    connectorRate?: DecimalWithAggregatesFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string
    connectorCommission?: DecimalWithAggregatesFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string
    teamLeaderOverride?: DecimalNullableWithAggregatesFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string | null
    rmOverride?: DecimalNullableWithAggregatesFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string | null
    totalPayout?: DecimalWithAggregatesFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string
    status?: StringWithAggregatesFilter<"CommissionTransaction"> | string
    amountPaid?: DecimalWithAggregatesFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string
    paymentDate?: DateTimeNullableWithAggregatesFilter<"CommissionTransaction"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CommissionTransaction"> | Date | string
  }

  export type PayoutHistoryWhereInput = {
    AND?: PayoutHistoryWhereInput | PayoutHistoryWhereInput[]
    OR?: PayoutHistoryWhereInput[]
    NOT?: PayoutHistoryWhereInput | PayoutHistoryWhereInput[]
    id?: StringFilter<"PayoutHistory"> | string
    transactionId?: StringNullableFilter<"PayoutHistory"> | string | null
    paidAmount?: DecimalFilter<"PayoutHistory"> | Decimal | DecimalJsLike | number | string
    paidAt?: DateTimeFilter<"PayoutHistory"> | Date | string
    paidBy?: StringNullableFilter<"PayoutHistory"> | string | null
    transaction?: XOR<CommissionTransactionNullableRelationFilter, CommissionTransactionWhereInput> | null
  }

  export type PayoutHistoryOrderByWithRelationInput = {
    id?: SortOrder
    transactionId?: SortOrderInput | SortOrder
    paidAmount?: SortOrder
    paidAt?: SortOrder
    paidBy?: SortOrderInput | SortOrder
    transaction?: CommissionTransactionOrderByWithRelationInput
  }

  export type PayoutHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PayoutHistoryWhereInput | PayoutHistoryWhereInput[]
    OR?: PayoutHistoryWhereInput[]
    NOT?: PayoutHistoryWhereInput | PayoutHistoryWhereInput[]
    transactionId?: StringNullableFilter<"PayoutHistory"> | string | null
    paidAmount?: DecimalFilter<"PayoutHistory"> | Decimal | DecimalJsLike | number | string
    paidAt?: DateTimeFilter<"PayoutHistory"> | Date | string
    paidBy?: StringNullableFilter<"PayoutHistory"> | string | null
    transaction?: XOR<CommissionTransactionNullableRelationFilter, CommissionTransactionWhereInput> | null
  }, "id">

  export type PayoutHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    transactionId?: SortOrderInput | SortOrder
    paidAmount?: SortOrder
    paidAt?: SortOrder
    paidBy?: SortOrderInput | SortOrder
    _count?: PayoutHistoryCountOrderByAggregateInput
    _avg?: PayoutHistoryAvgOrderByAggregateInput
    _max?: PayoutHistoryMaxOrderByAggregateInput
    _min?: PayoutHistoryMinOrderByAggregateInput
    _sum?: PayoutHistorySumOrderByAggregateInput
  }

  export type PayoutHistoryScalarWhereWithAggregatesInput = {
    AND?: PayoutHistoryScalarWhereWithAggregatesInput | PayoutHistoryScalarWhereWithAggregatesInput[]
    OR?: PayoutHistoryScalarWhereWithAggregatesInput[]
    NOT?: PayoutHistoryScalarWhereWithAggregatesInput | PayoutHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PayoutHistory"> | string
    transactionId?: StringNullableWithAggregatesFilter<"PayoutHistory"> | string | null
    paidAmount?: DecimalWithAggregatesFilter<"PayoutHistory"> | Decimal | DecimalJsLike | number | string
    paidAt?: DateTimeWithAggregatesFilter<"PayoutHistory"> | Date | string
    paidBy?: StringNullableWithAggregatesFilter<"PayoutHistory"> | string | null
  }

  export type PayoutSlabWhereInput = {
    AND?: PayoutSlabWhereInput | PayoutSlabWhereInput[]
    OR?: PayoutSlabWhereInput[]
    NOT?: PayoutSlabWhereInput | PayoutSlabWhereInput[]
    id?: StringFilter<"PayoutSlab"> | string
    connectorId?: StringNullableFilter<"PayoutSlab"> | string | null
    bankName?: StringFilter<"PayoutSlab"> | string
    productCategory?: StringFilter<"PayoutSlab"> | string
    payoutRate?: DecimalFilter<"PayoutSlab"> | Decimal | DecimalJsLike | number | string
    minDisbursementAmount?: DecimalNullableFilter<"PayoutSlab"> | Decimal | DecimalJsLike | number | string | null
    status?: StringFilter<"PayoutSlab"> | string
    createdAt?: DateTimeFilter<"PayoutSlab"> | Date | string
    updatedAt?: DateTimeNullableFilter<"PayoutSlab"> | Date | string | null
    connector?: XOR<ConnectorNullableRelationFilter, ConnectorWhereInput> | null
  }

  export type PayoutSlabOrderByWithRelationInput = {
    id?: SortOrder
    connectorId?: SortOrderInput | SortOrder
    bankName?: SortOrder
    productCategory?: SortOrder
    payoutRate?: SortOrder
    minDisbursementAmount?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    connector?: ConnectorOrderByWithRelationInput
  }

  export type PayoutSlabWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PayoutSlabWhereInput | PayoutSlabWhereInput[]
    OR?: PayoutSlabWhereInput[]
    NOT?: PayoutSlabWhereInput | PayoutSlabWhereInput[]
    connectorId?: StringNullableFilter<"PayoutSlab"> | string | null
    bankName?: StringFilter<"PayoutSlab"> | string
    productCategory?: StringFilter<"PayoutSlab"> | string
    payoutRate?: DecimalFilter<"PayoutSlab"> | Decimal | DecimalJsLike | number | string
    minDisbursementAmount?: DecimalNullableFilter<"PayoutSlab"> | Decimal | DecimalJsLike | number | string | null
    status?: StringFilter<"PayoutSlab"> | string
    createdAt?: DateTimeFilter<"PayoutSlab"> | Date | string
    updatedAt?: DateTimeNullableFilter<"PayoutSlab"> | Date | string | null
    connector?: XOR<ConnectorNullableRelationFilter, ConnectorWhereInput> | null
  }, "id">

  export type PayoutSlabOrderByWithAggregationInput = {
    id?: SortOrder
    connectorId?: SortOrderInput | SortOrder
    bankName?: SortOrder
    productCategory?: SortOrder
    payoutRate?: SortOrder
    minDisbursementAmount?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: PayoutSlabCountOrderByAggregateInput
    _avg?: PayoutSlabAvgOrderByAggregateInput
    _max?: PayoutSlabMaxOrderByAggregateInput
    _min?: PayoutSlabMinOrderByAggregateInput
    _sum?: PayoutSlabSumOrderByAggregateInput
  }

  export type PayoutSlabScalarWhereWithAggregatesInput = {
    AND?: PayoutSlabScalarWhereWithAggregatesInput | PayoutSlabScalarWhereWithAggregatesInput[]
    OR?: PayoutSlabScalarWhereWithAggregatesInput[]
    NOT?: PayoutSlabScalarWhereWithAggregatesInput | PayoutSlabScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PayoutSlab"> | string
    connectorId?: StringNullableWithAggregatesFilter<"PayoutSlab"> | string | null
    bankName?: StringWithAggregatesFilter<"PayoutSlab"> | string
    productCategory?: StringWithAggregatesFilter<"PayoutSlab"> | string
    payoutRate?: DecimalWithAggregatesFilter<"PayoutSlab"> | Decimal | DecimalJsLike | number | string
    minDisbursementAmount?: DecimalNullableWithAggregatesFilter<"PayoutSlab"> | Decimal | DecimalJsLike | number | string | null
    status?: StringWithAggregatesFilter<"PayoutSlab"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PayoutSlab"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"PayoutSlab"> | Date | string | null
  }

  export type SalesManagerWhereInput = {
    AND?: SalesManagerWhereInput | SalesManagerWhereInput[]
    OR?: SalesManagerWhereInput[]
    NOT?: SalesManagerWhereInput | SalesManagerWhereInput[]
    id?: StringFilter<"SalesManager"> | string
    userId?: StringFilter<"SalesManager"> | string
    branchId?: StringNullableFilter<"SalesManager"> | string | null
    approvalRate?: DecimalFilter<"SalesManager"> | Decimal | DecimalJsLike | number | string
    tatScore?: DecimalFilter<"SalesManager"> | Decimal | DecimalJsLike | number | string
    currentCapacity?: IntFilter<"SalesManager"> | number
    maxCapacity?: IntFilter<"SalesManager"> | number
    experienceScore?: DecimalFilter<"SalesManager"> | Decimal | DecimalJsLike | number | string
    isActive?: BoolFilter<"SalesManager"> | boolean
    createdAt?: DateTimeFilter<"SalesManager"> | Date | string
    updatedAt?: DateTimeNullableFilter<"SalesManager"> | Date | string | null
    routingHistory?: RoutingHistoryListRelationFilter
  }

  export type SalesManagerOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    branchId?: SortOrderInput | SortOrder
    approvalRate?: SortOrder
    tatScore?: SortOrder
    currentCapacity?: SortOrder
    maxCapacity?: SortOrder
    experienceScore?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    routingHistory?: RoutingHistoryOrderByRelationAggregateInput
  }

  export type SalesManagerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: SalesManagerWhereInput | SalesManagerWhereInput[]
    OR?: SalesManagerWhereInput[]
    NOT?: SalesManagerWhereInput | SalesManagerWhereInput[]
    branchId?: StringNullableFilter<"SalesManager"> | string | null
    approvalRate?: DecimalFilter<"SalesManager"> | Decimal | DecimalJsLike | number | string
    tatScore?: DecimalFilter<"SalesManager"> | Decimal | DecimalJsLike | number | string
    currentCapacity?: IntFilter<"SalesManager"> | number
    maxCapacity?: IntFilter<"SalesManager"> | number
    experienceScore?: DecimalFilter<"SalesManager"> | Decimal | DecimalJsLike | number | string
    isActive?: BoolFilter<"SalesManager"> | boolean
    createdAt?: DateTimeFilter<"SalesManager"> | Date | string
    updatedAt?: DateTimeNullableFilter<"SalesManager"> | Date | string | null
    routingHistory?: RoutingHistoryListRelationFilter
  }, "id" | "userId">

  export type SalesManagerOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    branchId?: SortOrderInput | SortOrder
    approvalRate?: SortOrder
    tatScore?: SortOrder
    currentCapacity?: SortOrder
    maxCapacity?: SortOrder
    experienceScore?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: SalesManagerCountOrderByAggregateInput
    _avg?: SalesManagerAvgOrderByAggregateInput
    _max?: SalesManagerMaxOrderByAggregateInput
    _min?: SalesManagerMinOrderByAggregateInput
    _sum?: SalesManagerSumOrderByAggregateInput
  }

  export type SalesManagerScalarWhereWithAggregatesInput = {
    AND?: SalesManagerScalarWhereWithAggregatesInput | SalesManagerScalarWhereWithAggregatesInput[]
    OR?: SalesManagerScalarWhereWithAggregatesInput[]
    NOT?: SalesManagerScalarWhereWithAggregatesInput | SalesManagerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SalesManager"> | string
    userId?: StringWithAggregatesFilter<"SalesManager"> | string
    branchId?: StringNullableWithAggregatesFilter<"SalesManager"> | string | null
    approvalRate?: DecimalWithAggregatesFilter<"SalesManager"> | Decimal | DecimalJsLike | number | string
    tatScore?: DecimalWithAggregatesFilter<"SalesManager"> | Decimal | DecimalJsLike | number | string
    currentCapacity?: IntWithAggregatesFilter<"SalesManager"> | number
    maxCapacity?: IntWithAggregatesFilter<"SalesManager"> | number
    experienceScore?: DecimalWithAggregatesFilter<"SalesManager"> | Decimal | DecimalJsLike | number | string
    isActive?: BoolWithAggregatesFilter<"SalesManager"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"SalesManager"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"SalesManager"> | Date | string | null
  }

  export type RoutingHistoryWhereInput = {
    AND?: RoutingHistoryWhereInput | RoutingHistoryWhereInput[]
    OR?: RoutingHistoryWhereInput[]
    NOT?: RoutingHistoryWhereInput | RoutingHistoryWhereInput[]
    id?: StringFilter<"RoutingHistory"> | string
    loanId?: StringFilter<"RoutingHistory"> | string
    assignedSmId?: StringNullableFilter<"RoutingHistory"> | string | null
    routingScore?: DecimalNullableFilter<"RoutingHistory"> | Decimal | DecimalJsLike | number | string | null
    assignedAt?: DateTimeFilter<"RoutingHistory"> | Date | string
    manager?: XOR<SalesManagerNullableRelationFilter, SalesManagerWhereInput> | null
  }

  export type RoutingHistoryOrderByWithRelationInput = {
    id?: SortOrder
    loanId?: SortOrder
    assignedSmId?: SortOrderInput | SortOrder
    routingScore?: SortOrderInput | SortOrder
    assignedAt?: SortOrder
    manager?: SalesManagerOrderByWithRelationInput
  }

  export type RoutingHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RoutingHistoryWhereInput | RoutingHistoryWhereInput[]
    OR?: RoutingHistoryWhereInput[]
    NOT?: RoutingHistoryWhereInput | RoutingHistoryWhereInput[]
    loanId?: StringFilter<"RoutingHistory"> | string
    assignedSmId?: StringNullableFilter<"RoutingHistory"> | string | null
    routingScore?: DecimalNullableFilter<"RoutingHistory"> | Decimal | DecimalJsLike | number | string | null
    assignedAt?: DateTimeFilter<"RoutingHistory"> | Date | string
    manager?: XOR<SalesManagerNullableRelationFilter, SalesManagerWhereInput> | null
  }, "id">

  export type RoutingHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    loanId?: SortOrder
    assignedSmId?: SortOrderInput | SortOrder
    routingScore?: SortOrderInput | SortOrder
    assignedAt?: SortOrder
    _count?: RoutingHistoryCountOrderByAggregateInput
    _avg?: RoutingHistoryAvgOrderByAggregateInput
    _max?: RoutingHistoryMaxOrderByAggregateInput
    _min?: RoutingHistoryMinOrderByAggregateInput
    _sum?: RoutingHistorySumOrderByAggregateInput
  }

  export type RoutingHistoryScalarWhereWithAggregatesInput = {
    AND?: RoutingHistoryScalarWhereWithAggregatesInput | RoutingHistoryScalarWhereWithAggregatesInput[]
    OR?: RoutingHistoryScalarWhereWithAggregatesInput[]
    NOT?: RoutingHistoryScalarWhereWithAggregatesInput | RoutingHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RoutingHistory"> | string
    loanId?: StringWithAggregatesFilter<"RoutingHistory"> | string
    assignedSmId?: StringNullableWithAggregatesFilter<"RoutingHistory"> | string | null
    routingScore?: DecimalNullableWithAggregatesFilter<"RoutingHistory"> | Decimal | DecimalJsLike | number | string | null
    assignedAt?: DateTimeWithAggregatesFilter<"RoutingHistory"> | Date | string
  }

  export type CareerApplicationWhereInput = {
    AND?: CareerApplicationWhereInput | CareerApplicationWhereInput[]
    OR?: CareerApplicationWhereInput[]
    NOT?: CareerApplicationWhereInput | CareerApplicationWhereInput[]
    id?: StringFilter<"CareerApplication"> | string
    name?: StringFilter<"CareerApplication"> | string
    email?: StringFilter<"CareerApplication"> | string
    mobile?: StringFilter<"CareerApplication"> | string
    role?: StringFilter<"CareerApplication"> | string
    experience?: StringNullableFilter<"CareerApplication"> | string | null
    coverNote?: StringNullableFilter<"CareerApplication"> | string | null
    status?: StringFilter<"CareerApplication"> | string
    createdAt?: DateTimeFilter<"CareerApplication"> | Date | string
  }

  export type CareerApplicationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    mobile?: SortOrder
    role?: SortOrder
    experience?: SortOrderInput | SortOrder
    coverNote?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type CareerApplicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CareerApplicationWhereInput | CareerApplicationWhereInput[]
    OR?: CareerApplicationWhereInput[]
    NOT?: CareerApplicationWhereInput | CareerApplicationWhereInput[]
    name?: StringFilter<"CareerApplication"> | string
    email?: StringFilter<"CareerApplication"> | string
    mobile?: StringFilter<"CareerApplication"> | string
    role?: StringFilter<"CareerApplication"> | string
    experience?: StringNullableFilter<"CareerApplication"> | string | null
    coverNote?: StringNullableFilter<"CareerApplication"> | string | null
    status?: StringFilter<"CareerApplication"> | string
    createdAt?: DateTimeFilter<"CareerApplication"> | Date | string
  }, "id">

  export type CareerApplicationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    mobile?: SortOrder
    role?: SortOrder
    experience?: SortOrderInput | SortOrder
    coverNote?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: CareerApplicationCountOrderByAggregateInput
    _max?: CareerApplicationMaxOrderByAggregateInput
    _min?: CareerApplicationMinOrderByAggregateInput
  }

  export type CareerApplicationScalarWhereWithAggregatesInput = {
    AND?: CareerApplicationScalarWhereWithAggregatesInput | CareerApplicationScalarWhereWithAggregatesInput[]
    OR?: CareerApplicationScalarWhereWithAggregatesInput[]
    NOT?: CareerApplicationScalarWhereWithAggregatesInput | CareerApplicationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CareerApplication"> | string
    name?: StringWithAggregatesFilter<"CareerApplication"> | string
    email?: StringWithAggregatesFilter<"CareerApplication"> | string
    mobile?: StringWithAggregatesFilter<"CareerApplication"> | string
    role?: StringWithAggregatesFilter<"CareerApplication"> | string
    experience?: StringNullableWithAggregatesFilter<"CareerApplication"> | string | null
    coverNote?: StringNullableWithAggregatesFilter<"CareerApplication"> | string | null
    status?: StringWithAggregatesFilter<"CareerApplication"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CareerApplication"> | Date | string
  }

  export type FoirAssessmentWhereInput = {
    AND?: FoirAssessmentWhereInput | FoirAssessmentWhereInput[]
    OR?: FoirAssessmentWhereInput[]
    NOT?: FoirAssessmentWhereInput | FoirAssessmentWhereInput[]
    id?: StringFilter<"FoirAssessment"> | string
    userId?: StringFilter<"FoirAssessment"> | string
    loanType?: StringFilter<"FoirAssessment"> | string
    grossMonthlyIncome?: DecimalFilter<"FoirAssessment"> | Decimal | DecimalJsLike | number | string
    existingMonthlyObligations?: DecimalFilter<"FoirAssessment"> | Decimal | DecimalJsLike | number | string
    requestedLoanAmount?: DecimalFilter<"FoirAssessment"> | Decimal | DecimalJsLike | number | string
    requestedTenureMonths?: IntFilter<"FoirAssessment"> | number
    annualInterestRate?: DecimalFilter<"FoirAssessment"> | Decimal | DecimalJsLike | number | string
    calculatedFoirPercentage?: DecimalFilter<"FoirAssessment"> | Decimal | DecimalJsLike | number | string
    maxEligibleEmi?: DecimalFilter<"FoirAssessment"> | Decimal | DecimalJsLike | number | string
    maxEligibleLoanAmount?: DecimalFilter<"FoirAssessment"> | Decimal | DecimalJsLike | number | string
    postLoanFoirPercentage?: DecimalFilter<"FoirAssessment"> | Decimal | DecimalJsLike | number | string
    eligibilityStatus?: StringFilter<"FoirAssessment"> | string
    foirLimitApplied?: DecimalFilter<"FoirAssessment"> | Decimal | DecimalJsLike | number | string
    incomeSource?: StringFilter<"FoirAssessment"> | string
    assessmentNotes?: StringNullableFilter<"FoirAssessment"> | string | null
    createdAt?: DateTimeFilter<"FoirAssessment"> | Date | string
    updatedAt?: DateTimeFilter<"FoirAssessment"> | Date | string
  }

  export type FoirAssessmentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    loanType?: SortOrder
    grossMonthlyIncome?: SortOrder
    existingMonthlyObligations?: SortOrder
    requestedLoanAmount?: SortOrder
    requestedTenureMonths?: SortOrder
    annualInterestRate?: SortOrder
    calculatedFoirPercentage?: SortOrder
    maxEligibleEmi?: SortOrder
    maxEligibleLoanAmount?: SortOrder
    postLoanFoirPercentage?: SortOrder
    eligibilityStatus?: SortOrder
    foirLimitApplied?: SortOrder
    incomeSource?: SortOrder
    assessmentNotes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FoirAssessmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FoirAssessmentWhereInput | FoirAssessmentWhereInput[]
    OR?: FoirAssessmentWhereInput[]
    NOT?: FoirAssessmentWhereInput | FoirAssessmentWhereInput[]
    userId?: StringFilter<"FoirAssessment"> | string
    loanType?: StringFilter<"FoirAssessment"> | string
    grossMonthlyIncome?: DecimalFilter<"FoirAssessment"> | Decimal | DecimalJsLike | number | string
    existingMonthlyObligations?: DecimalFilter<"FoirAssessment"> | Decimal | DecimalJsLike | number | string
    requestedLoanAmount?: DecimalFilter<"FoirAssessment"> | Decimal | DecimalJsLike | number | string
    requestedTenureMonths?: IntFilter<"FoirAssessment"> | number
    annualInterestRate?: DecimalFilter<"FoirAssessment"> | Decimal | DecimalJsLike | number | string
    calculatedFoirPercentage?: DecimalFilter<"FoirAssessment"> | Decimal | DecimalJsLike | number | string
    maxEligibleEmi?: DecimalFilter<"FoirAssessment"> | Decimal | DecimalJsLike | number | string
    maxEligibleLoanAmount?: DecimalFilter<"FoirAssessment"> | Decimal | DecimalJsLike | number | string
    postLoanFoirPercentage?: DecimalFilter<"FoirAssessment"> | Decimal | DecimalJsLike | number | string
    eligibilityStatus?: StringFilter<"FoirAssessment"> | string
    foirLimitApplied?: DecimalFilter<"FoirAssessment"> | Decimal | DecimalJsLike | number | string
    incomeSource?: StringFilter<"FoirAssessment"> | string
    assessmentNotes?: StringNullableFilter<"FoirAssessment"> | string | null
    createdAt?: DateTimeFilter<"FoirAssessment"> | Date | string
    updatedAt?: DateTimeFilter<"FoirAssessment"> | Date | string
  }, "id">

  export type FoirAssessmentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    loanType?: SortOrder
    grossMonthlyIncome?: SortOrder
    existingMonthlyObligations?: SortOrder
    requestedLoanAmount?: SortOrder
    requestedTenureMonths?: SortOrder
    annualInterestRate?: SortOrder
    calculatedFoirPercentage?: SortOrder
    maxEligibleEmi?: SortOrder
    maxEligibleLoanAmount?: SortOrder
    postLoanFoirPercentage?: SortOrder
    eligibilityStatus?: SortOrder
    foirLimitApplied?: SortOrder
    incomeSource?: SortOrder
    assessmentNotes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FoirAssessmentCountOrderByAggregateInput
    _avg?: FoirAssessmentAvgOrderByAggregateInput
    _max?: FoirAssessmentMaxOrderByAggregateInput
    _min?: FoirAssessmentMinOrderByAggregateInput
    _sum?: FoirAssessmentSumOrderByAggregateInput
  }

  export type FoirAssessmentScalarWhereWithAggregatesInput = {
    AND?: FoirAssessmentScalarWhereWithAggregatesInput | FoirAssessmentScalarWhereWithAggregatesInput[]
    OR?: FoirAssessmentScalarWhereWithAggregatesInput[]
    NOT?: FoirAssessmentScalarWhereWithAggregatesInput | FoirAssessmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FoirAssessment"> | string
    userId?: StringWithAggregatesFilter<"FoirAssessment"> | string
    loanType?: StringWithAggregatesFilter<"FoirAssessment"> | string
    grossMonthlyIncome?: DecimalWithAggregatesFilter<"FoirAssessment"> | Decimal | DecimalJsLike | number | string
    existingMonthlyObligations?: DecimalWithAggregatesFilter<"FoirAssessment"> | Decimal | DecimalJsLike | number | string
    requestedLoanAmount?: DecimalWithAggregatesFilter<"FoirAssessment"> | Decimal | DecimalJsLike | number | string
    requestedTenureMonths?: IntWithAggregatesFilter<"FoirAssessment"> | number
    annualInterestRate?: DecimalWithAggregatesFilter<"FoirAssessment"> | Decimal | DecimalJsLike | number | string
    calculatedFoirPercentage?: DecimalWithAggregatesFilter<"FoirAssessment"> | Decimal | DecimalJsLike | number | string
    maxEligibleEmi?: DecimalWithAggregatesFilter<"FoirAssessment"> | Decimal | DecimalJsLike | number | string
    maxEligibleLoanAmount?: DecimalWithAggregatesFilter<"FoirAssessment"> | Decimal | DecimalJsLike | number | string
    postLoanFoirPercentage?: DecimalWithAggregatesFilter<"FoirAssessment"> | Decimal | DecimalJsLike | number | string
    eligibilityStatus?: StringWithAggregatesFilter<"FoirAssessment"> | string
    foirLimitApplied?: DecimalWithAggregatesFilter<"FoirAssessment"> | Decimal | DecimalJsLike | number | string
    incomeSource?: StringWithAggregatesFilter<"FoirAssessment"> | string
    assessmentNotes?: StringNullableWithAggregatesFilter<"FoirAssessment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"FoirAssessment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FoirAssessment"> | Date | string
  }

  export type ConnectorCreateInput = {
    id: string
    userId: string
    firstName: string
    lastName: string
    phone?: string | null
    email?: string | null
    region?: string | null
    status: string
    platformRole?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    hierarchies?: HierarchyMappingCreateNestedManyWithoutConnectorInput
    managed?: HierarchyMappingCreateNestedManyWithoutManagerInput
    statusHistory?: ConnectorStatusHistoryCreateNestedManyWithoutConnectorInput
    performance?: ConnectorPerformanceCreateNestedOneWithoutConnectorInput
    payoutSlabs?: PayoutSlabCreateNestedManyWithoutConnectorInput
    commissions?: CommissionTransactionCreateNestedManyWithoutConnectorInput
  }

  export type ConnectorUncheckedCreateInput = {
    id: string
    userId: string
    firstName: string
    lastName: string
    phone?: string | null
    email?: string | null
    region?: string | null
    status: string
    platformRole?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    hierarchies?: HierarchyMappingUncheckedCreateNestedManyWithoutConnectorInput
    managed?: HierarchyMappingUncheckedCreateNestedManyWithoutManagerInput
    statusHistory?: ConnectorStatusHistoryUncheckedCreateNestedManyWithoutConnectorInput
    performance?: ConnectorPerformanceUncheckedCreateNestedOneWithoutConnectorInput
    payoutSlabs?: PayoutSlabUncheckedCreateNestedManyWithoutConnectorInput
    commissions?: CommissionTransactionUncheckedCreateNestedManyWithoutConnectorInput
  }

  export type ConnectorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    platformRole?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    hierarchies?: HierarchyMappingUpdateManyWithoutConnectorNestedInput
    managed?: HierarchyMappingUpdateManyWithoutManagerNestedInput
    statusHistory?: ConnectorStatusHistoryUpdateManyWithoutConnectorNestedInput
    performance?: ConnectorPerformanceUpdateOneWithoutConnectorNestedInput
    payoutSlabs?: PayoutSlabUpdateManyWithoutConnectorNestedInput
    commissions?: CommissionTransactionUpdateManyWithoutConnectorNestedInput
  }

  export type ConnectorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    platformRole?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    hierarchies?: HierarchyMappingUncheckedUpdateManyWithoutConnectorNestedInput
    managed?: HierarchyMappingUncheckedUpdateManyWithoutManagerNestedInput
    statusHistory?: ConnectorStatusHistoryUncheckedUpdateManyWithoutConnectorNestedInput
    performance?: ConnectorPerformanceUncheckedUpdateOneWithoutConnectorNestedInput
    payoutSlabs?: PayoutSlabUncheckedUpdateManyWithoutConnectorNestedInput
    commissions?: CommissionTransactionUncheckedUpdateManyWithoutConnectorNestedInput
  }

  export type ConnectorCreateManyInput = {
    id: string
    userId: string
    firstName: string
    lastName: string
    phone?: string | null
    email?: string | null
    region?: string | null
    status: string
    platformRole?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
  }

  export type ConnectorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    platformRole?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConnectorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    platformRole?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type HierarchyMappingCreateInput = {
    id: string
    role: string
    assignedAt: Date | string
    assignedBy?: string | null
    connector?: ConnectorCreateNestedOneWithoutHierarchiesInput
    manager?: ConnectorCreateNestedOneWithoutManagedInput
  }

  export type HierarchyMappingUncheckedCreateInput = {
    id: string
    connectorId?: string | null
    managerId?: string | null
    role: string
    assignedAt: Date | string
    assignedBy?: string | null
  }

  export type HierarchyMappingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedBy?: NullableStringFieldUpdateOperationsInput | string | null
    connector?: ConnectorUpdateOneWithoutHierarchiesNestedInput
    manager?: ConnectorUpdateOneWithoutManagedNestedInput
  }

  export type HierarchyMappingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectorId?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type HierarchyMappingCreateManyInput = {
    id: string
    connectorId?: string | null
    managerId?: string | null
    role: string
    assignedAt: Date | string
    assignedBy?: string | null
  }

  export type HierarchyMappingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type HierarchyMappingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectorId?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConnectorStatusHistoryCreateInput = {
    id: string
    status: string
    changedAt: Date | string
    changedBy?: string | null
    remarks?: string | null
    connector?: ConnectorCreateNestedOneWithoutStatusHistoryInput
  }

  export type ConnectorStatusHistoryUncheckedCreateInput = {
    id: string
    connectorId?: string | null
    status: string
    changedAt: Date | string
    changedBy?: string | null
    remarks?: string | null
  }

  export type ConnectorStatusHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    connector?: ConnectorUpdateOneWithoutStatusHistoryNestedInput
  }

  export type ConnectorStatusHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectorId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConnectorStatusHistoryCreateManyInput = {
    id: string
    connectorId?: string | null
    status: string
    changedAt: Date | string
    changedBy?: string | null
    remarks?: string | null
  }

  export type ConnectorStatusHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConnectorStatusHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectorId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConnectorPerformanceCreateInput = {
    id: string
    totalLeads?: number
    convertedLeads?: number
    totalCommission?: Decimal | DecimalJsLike | number | string
    lastCalculatedAt?: Date | string | null
    connector?: ConnectorCreateNestedOneWithoutPerformanceInput
  }

  export type ConnectorPerformanceUncheckedCreateInput = {
    id: string
    connectorId?: string | null
    totalLeads?: number
    convertedLeads?: number
    totalCommission?: Decimal | DecimalJsLike | number | string
    lastCalculatedAt?: Date | string | null
  }

  export type ConnectorPerformanceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalLeads?: IntFieldUpdateOperationsInput | number
    convertedLeads?: IntFieldUpdateOperationsInput | number
    totalCommission?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastCalculatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    connector?: ConnectorUpdateOneWithoutPerformanceNestedInput
  }

  export type ConnectorPerformanceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectorId?: NullableStringFieldUpdateOperationsInput | string | null
    totalLeads?: IntFieldUpdateOperationsInput | number
    convertedLeads?: IntFieldUpdateOperationsInput | number
    totalCommission?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastCalculatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ConnectorPerformanceCreateManyInput = {
    id: string
    connectorId?: string | null
    totalLeads?: number
    convertedLeads?: number
    totalCommission?: Decimal | DecimalJsLike | number | string
    lastCalculatedAt?: Date | string | null
  }

  export type ConnectorPerformanceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalLeads?: IntFieldUpdateOperationsInput | number
    convertedLeads?: IntFieldUpdateOperationsInput | number
    totalCommission?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastCalculatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ConnectorPerformanceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectorId?: NullableStringFieldUpdateOperationsInput | string | null
    totalLeads?: IntFieldUpdateOperationsInput | number
    convertedLeads?: IntFieldUpdateOperationsInput | number
    totalCommission?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastCalculatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CommissionRuleCreateInput = {
    id: string
    ruleName: string
    connectorRate: Decimal | DecimalJsLike | number | string
    tlOverrideRate?: Decimal | DecimalJsLike | number | string
    rmOverrideRate?: Decimal | DecimalJsLike | number | string
    isActive?: boolean
  }

  export type CommissionRuleUncheckedCreateInput = {
    id: string
    ruleName: string
    connectorRate: Decimal | DecimalJsLike | number | string
    tlOverrideRate?: Decimal | DecimalJsLike | number | string
    rmOverrideRate?: Decimal | DecimalJsLike | number | string
    isActive?: boolean
  }

  export type CommissionRuleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ruleName?: StringFieldUpdateOperationsInput | string
    connectorRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tlOverrideRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rmOverrideRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CommissionRuleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ruleName?: StringFieldUpdateOperationsInput | string
    connectorRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tlOverrideRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rmOverrideRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CommissionRuleCreateManyInput = {
    id: string
    ruleName: string
    connectorRate: Decimal | DecimalJsLike | number | string
    tlOverrideRate?: Decimal | DecimalJsLike | number | string
    rmOverrideRate?: Decimal | DecimalJsLike | number | string
    isActive?: boolean
  }

  export type CommissionRuleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ruleName?: StringFieldUpdateOperationsInput | string
    connectorRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tlOverrideRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rmOverrideRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CommissionRuleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ruleName?: StringFieldUpdateOperationsInput | string
    connectorRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tlOverrideRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rmOverrideRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CommissionTransactionCreateInput = {
    id: string
    loanId: string
    loanAmount: Decimal | DecimalJsLike | number | string
    connectorRate: Decimal | DecimalJsLike | number | string
    connectorCommission: Decimal | DecimalJsLike | number | string
    teamLeaderOverride?: Decimal | DecimalJsLike | number | string | null
    rmOverride?: Decimal | DecimalJsLike | number | string | null
    totalPayout: Decimal | DecimalJsLike | number | string
    status: string
    amountPaid?: Decimal | DecimalJsLike | number | string
    paymentDate?: Date | string | null
    createdAt: Date | string
    connector: ConnectorCreateNestedOneWithoutCommissionsInput
    payoutHistory?: PayoutHistoryCreateNestedManyWithoutTransactionInput
  }

  export type CommissionTransactionUncheckedCreateInput = {
    id: string
    loanId: string
    connectorId: string
    loanAmount: Decimal | DecimalJsLike | number | string
    connectorRate: Decimal | DecimalJsLike | number | string
    connectorCommission: Decimal | DecimalJsLike | number | string
    teamLeaderOverride?: Decimal | DecimalJsLike | number | string | null
    rmOverride?: Decimal | DecimalJsLike | number | string | null
    totalPayout: Decimal | DecimalJsLike | number | string
    status: string
    amountPaid?: Decimal | DecimalJsLike | number | string
    paymentDate?: Date | string | null
    createdAt: Date | string
    payoutHistory?: PayoutHistoryUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type CommissionTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    loanAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    connectorRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    connectorCommission?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    teamLeaderOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    rmOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalPayout?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connector?: ConnectorUpdateOneRequiredWithoutCommissionsNestedInput
    payoutHistory?: PayoutHistoryUpdateManyWithoutTransactionNestedInput
  }

  export type CommissionTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    connectorId?: StringFieldUpdateOperationsInput | string
    loanAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    connectorRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    connectorCommission?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    teamLeaderOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    rmOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalPayout?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payoutHistory?: PayoutHistoryUncheckedUpdateManyWithoutTransactionNestedInput
  }

  export type CommissionTransactionCreateManyInput = {
    id: string
    loanId: string
    connectorId: string
    loanAmount: Decimal | DecimalJsLike | number | string
    connectorRate: Decimal | DecimalJsLike | number | string
    connectorCommission: Decimal | DecimalJsLike | number | string
    teamLeaderOverride?: Decimal | DecimalJsLike | number | string | null
    rmOverride?: Decimal | DecimalJsLike | number | string | null
    totalPayout: Decimal | DecimalJsLike | number | string
    status: string
    amountPaid?: Decimal | DecimalJsLike | number | string
    paymentDate?: Date | string | null
    createdAt: Date | string
  }

  export type CommissionTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    loanAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    connectorRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    connectorCommission?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    teamLeaderOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    rmOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalPayout?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommissionTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    connectorId?: StringFieldUpdateOperationsInput | string
    loanAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    connectorRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    connectorCommission?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    teamLeaderOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    rmOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalPayout?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutHistoryCreateInput = {
    id: string
    paidAmount: Decimal | DecimalJsLike | number | string
    paidAt: Date | string
    paidBy?: string | null
    transaction?: CommissionTransactionCreateNestedOneWithoutPayoutHistoryInput
  }

  export type PayoutHistoryUncheckedCreateInput = {
    id: string
    transactionId?: string | null
    paidAmount: Decimal | DecimalJsLike | number | string
    paidAt: Date | string
    paidBy?: string | null
  }

  export type PayoutHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    paidAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidBy?: NullableStringFieldUpdateOperationsInput | string | null
    transaction?: CommissionTransactionUpdateOneWithoutPayoutHistoryNestedInput
  }

  export type PayoutHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    paidAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PayoutHistoryCreateManyInput = {
    id: string
    transactionId?: string | null
    paidAmount: Decimal | DecimalJsLike | number | string
    paidAt: Date | string
    paidBy?: string | null
  }

  export type PayoutHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    paidAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PayoutHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    paidAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PayoutSlabCreateInput = {
    id: string
    bankName: string
    productCategory: string
    payoutRate: Decimal | DecimalJsLike | number | string
    minDisbursementAmount?: Decimal | DecimalJsLike | number | string | null
    status: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    connector?: ConnectorCreateNestedOneWithoutPayoutSlabsInput
  }

  export type PayoutSlabUncheckedCreateInput = {
    id: string
    connectorId?: string | null
    bankName: string
    productCategory: string
    payoutRate: Decimal | DecimalJsLike | number | string
    minDisbursementAmount?: Decimal | DecimalJsLike | number | string | null
    status: string
    createdAt: Date | string
    updatedAt?: Date | string | null
  }

  export type PayoutSlabUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bankName?: StringFieldUpdateOperationsInput | string
    productCategory?: StringFieldUpdateOperationsInput | string
    payoutRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    minDisbursementAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    connector?: ConnectorUpdateOneWithoutPayoutSlabsNestedInput
  }

  export type PayoutSlabUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectorId?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: StringFieldUpdateOperationsInput | string
    productCategory?: StringFieldUpdateOperationsInput | string
    payoutRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    minDisbursementAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PayoutSlabCreateManyInput = {
    id: string
    connectorId?: string | null
    bankName: string
    productCategory: string
    payoutRate: Decimal | DecimalJsLike | number | string
    minDisbursementAmount?: Decimal | DecimalJsLike | number | string | null
    status: string
    createdAt: Date | string
    updatedAt?: Date | string | null
  }

  export type PayoutSlabUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    bankName?: StringFieldUpdateOperationsInput | string
    productCategory?: StringFieldUpdateOperationsInput | string
    payoutRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    minDisbursementAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PayoutSlabUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectorId?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: StringFieldUpdateOperationsInput | string
    productCategory?: StringFieldUpdateOperationsInput | string
    payoutRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    minDisbursementAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SalesManagerCreateInput = {
    id: string
    userId: string
    branchId?: string | null
    approvalRate?: Decimal | DecimalJsLike | number | string
    tatScore?: Decimal | DecimalJsLike | number | string
    currentCapacity?: number
    maxCapacity?: number
    experienceScore?: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    createdAt: Date | string
    updatedAt?: Date | string | null
    routingHistory?: RoutingHistoryCreateNestedManyWithoutManagerInput
  }

  export type SalesManagerUncheckedCreateInput = {
    id: string
    userId: string
    branchId?: string | null
    approvalRate?: Decimal | DecimalJsLike | number | string
    tatScore?: Decimal | DecimalJsLike | number | string
    currentCapacity?: number
    maxCapacity?: number
    experienceScore?: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    createdAt: Date | string
    updatedAt?: Date | string | null
    routingHistory?: RoutingHistoryUncheckedCreateNestedManyWithoutManagerInput
  }

  export type SalesManagerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    branchId?: NullableStringFieldUpdateOperationsInput | string | null
    approvalRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tatScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currentCapacity?: IntFieldUpdateOperationsInput | number
    maxCapacity?: IntFieldUpdateOperationsInput | number
    experienceScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    routingHistory?: RoutingHistoryUpdateManyWithoutManagerNestedInput
  }

  export type SalesManagerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    branchId?: NullableStringFieldUpdateOperationsInput | string | null
    approvalRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tatScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currentCapacity?: IntFieldUpdateOperationsInput | number
    maxCapacity?: IntFieldUpdateOperationsInput | number
    experienceScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    routingHistory?: RoutingHistoryUncheckedUpdateManyWithoutManagerNestedInput
  }

  export type SalesManagerCreateManyInput = {
    id: string
    userId: string
    branchId?: string | null
    approvalRate?: Decimal | DecimalJsLike | number | string
    tatScore?: Decimal | DecimalJsLike | number | string
    currentCapacity?: number
    maxCapacity?: number
    experienceScore?: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    createdAt: Date | string
    updatedAt?: Date | string | null
  }

  export type SalesManagerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    branchId?: NullableStringFieldUpdateOperationsInput | string | null
    approvalRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tatScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currentCapacity?: IntFieldUpdateOperationsInput | number
    maxCapacity?: IntFieldUpdateOperationsInput | number
    experienceScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SalesManagerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    branchId?: NullableStringFieldUpdateOperationsInput | string | null
    approvalRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tatScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currentCapacity?: IntFieldUpdateOperationsInput | number
    maxCapacity?: IntFieldUpdateOperationsInput | number
    experienceScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RoutingHistoryCreateInput = {
    id: string
    loanId: string
    routingScore?: Decimal | DecimalJsLike | number | string | null
    assignedAt: Date | string
    manager?: SalesManagerCreateNestedOneWithoutRoutingHistoryInput
  }

  export type RoutingHistoryUncheckedCreateInput = {
    id: string
    loanId: string
    assignedSmId?: string | null
    routingScore?: Decimal | DecimalJsLike | number | string | null
    assignedAt: Date | string
  }

  export type RoutingHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    routingScore?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manager?: SalesManagerUpdateOneWithoutRoutingHistoryNestedInput
  }

  export type RoutingHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    assignedSmId?: NullableStringFieldUpdateOperationsInput | string | null
    routingScore?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoutingHistoryCreateManyInput = {
    id: string
    loanId: string
    assignedSmId?: string | null
    routingScore?: Decimal | DecimalJsLike | number | string | null
    assignedAt: Date | string
  }

  export type RoutingHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    routingScore?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoutingHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    assignedSmId?: NullableStringFieldUpdateOperationsInput | string | null
    routingScore?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerApplicationCreateInput = {
    id: string
    name: string
    email: string
    mobile: string
    role: string
    experience?: string | null
    coverNote?: string | null
    status?: string
    createdAt: Date | string
  }

  export type CareerApplicationUncheckedCreateInput = {
    id: string
    name: string
    email: string
    mobile: string
    role: string
    experience?: string | null
    coverNote?: string | null
    status?: string
    createdAt: Date | string
  }

  export type CareerApplicationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    coverNote?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerApplicationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    coverNote?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerApplicationCreateManyInput = {
    id: string
    name: string
    email: string
    mobile: string
    role: string
    experience?: string | null
    coverNote?: string | null
    status?: string
    createdAt: Date | string
  }

  export type CareerApplicationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    coverNote?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerApplicationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    mobile?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    coverNote?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoirAssessmentCreateInput = {
    id: string
    userId: string
    loanType: string
    grossMonthlyIncome: Decimal | DecimalJsLike | number | string
    existingMonthlyObligations: Decimal | DecimalJsLike | number | string
    requestedLoanAmount: Decimal | DecimalJsLike | number | string
    requestedTenureMonths: number
    annualInterestRate: Decimal | DecimalJsLike | number | string
    calculatedFoirPercentage: Decimal | DecimalJsLike | number | string
    maxEligibleEmi: Decimal | DecimalJsLike | number | string
    maxEligibleLoanAmount: Decimal | DecimalJsLike | number | string
    postLoanFoirPercentage: Decimal | DecimalJsLike | number | string
    eligibilityStatus: string
    foirLimitApplied: Decimal | DecimalJsLike | number | string
    incomeSource: string
    assessmentNotes?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type FoirAssessmentUncheckedCreateInput = {
    id: string
    userId: string
    loanType: string
    grossMonthlyIncome: Decimal | DecimalJsLike | number | string
    existingMonthlyObligations: Decimal | DecimalJsLike | number | string
    requestedLoanAmount: Decimal | DecimalJsLike | number | string
    requestedTenureMonths: number
    annualInterestRate: Decimal | DecimalJsLike | number | string
    calculatedFoirPercentage: Decimal | DecimalJsLike | number | string
    maxEligibleEmi: Decimal | DecimalJsLike | number | string
    maxEligibleLoanAmount: Decimal | DecimalJsLike | number | string
    postLoanFoirPercentage: Decimal | DecimalJsLike | number | string
    eligibilityStatus: string
    foirLimitApplied: Decimal | DecimalJsLike | number | string
    incomeSource: string
    assessmentNotes?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type FoirAssessmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    loanType?: StringFieldUpdateOperationsInput | string
    grossMonthlyIncome?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    existingMonthlyObligations?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    requestedLoanAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    requestedTenureMonths?: IntFieldUpdateOperationsInput | number
    annualInterestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    calculatedFoirPercentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxEligibleEmi?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxEligibleLoanAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    postLoanFoirPercentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    eligibilityStatus?: StringFieldUpdateOperationsInput | string
    foirLimitApplied?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    incomeSource?: StringFieldUpdateOperationsInput | string
    assessmentNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoirAssessmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    loanType?: StringFieldUpdateOperationsInput | string
    grossMonthlyIncome?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    existingMonthlyObligations?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    requestedLoanAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    requestedTenureMonths?: IntFieldUpdateOperationsInput | number
    annualInterestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    calculatedFoirPercentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxEligibleEmi?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxEligibleLoanAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    postLoanFoirPercentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    eligibilityStatus?: StringFieldUpdateOperationsInput | string
    foirLimitApplied?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    incomeSource?: StringFieldUpdateOperationsInput | string
    assessmentNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoirAssessmentCreateManyInput = {
    id: string
    userId: string
    loanType: string
    grossMonthlyIncome: Decimal | DecimalJsLike | number | string
    existingMonthlyObligations: Decimal | DecimalJsLike | number | string
    requestedLoanAmount: Decimal | DecimalJsLike | number | string
    requestedTenureMonths: number
    annualInterestRate: Decimal | DecimalJsLike | number | string
    calculatedFoirPercentage: Decimal | DecimalJsLike | number | string
    maxEligibleEmi: Decimal | DecimalJsLike | number | string
    maxEligibleLoanAmount: Decimal | DecimalJsLike | number | string
    postLoanFoirPercentage: Decimal | DecimalJsLike | number | string
    eligibilityStatus: string
    foirLimitApplied: Decimal | DecimalJsLike | number | string
    incomeSource: string
    assessmentNotes?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type FoirAssessmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    loanType?: StringFieldUpdateOperationsInput | string
    grossMonthlyIncome?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    existingMonthlyObligations?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    requestedLoanAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    requestedTenureMonths?: IntFieldUpdateOperationsInput | number
    annualInterestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    calculatedFoirPercentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxEligibleEmi?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxEligibleLoanAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    postLoanFoirPercentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    eligibilityStatus?: StringFieldUpdateOperationsInput | string
    foirLimitApplied?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    incomeSource?: StringFieldUpdateOperationsInput | string
    assessmentNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoirAssessmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    loanType?: StringFieldUpdateOperationsInput | string
    grossMonthlyIncome?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    existingMonthlyObligations?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    requestedLoanAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    requestedTenureMonths?: IntFieldUpdateOperationsInput | number
    annualInterestRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    calculatedFoirPercentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxEligibleEmi?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    maxEligibleLoanAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    postLoanFoirPercentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    eligibilityStatus?: StringFieldUpdateOperationsInput | string
    foirLimitApplied?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    incomeSource?: StringFieldUpdateOperationsInput | string
    assessmentNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type HierarchyMappingListRelationFilter = {
    every?: HierarchyMappingWhereInput
    some?: HierarchyMappingWhereInput
    none?: HierarchyMappingWhereInput
  }

  export type ConnectorStatusHistoryListRelationFilter = {
    every?: ConnectorStatusHistoryWhereInput
    some?: ConnectorStatusHistoryWhereInput
    none?: ConnectorStatusHistoryWhereInput
  }

  export type ConnectorPerformanceNullableRelationFilter = {
    is?: ConnectorPerformanceWhereInput | null
    isNot?: ConnectorPerformanceWhereInput | null
  }

  export type PayoutSlabListRelationFilter = {
    every?: PayoutSlabWhereInput
    some?: PayoutSlabWhereInput
    none?: PayoutSlabWhereInput
  }

  export type CommissionTransactionListRelationFilter = {
    every?: CommissionTransactionWhereInput
    some?: CommissionTransactionWhereInput
    none?: CommissionTransactionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type HierarchyMappingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConnectorStatusHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PayoutSlabOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommissionTransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConnectorCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    region?: SortOrder
    status?: SortOrder
    platformRole?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type ConnectorMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    region?: SortOrder
    status?: SortOrder
    platformRole?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type ConnectorMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    region?: SortOrder
    status?: SortOrder
    platformRole?: SortOrder
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

  export type ConnectorNullableRelationFilter = {
    is?: ConnectorWhereInput | null
    isNot?: ConnectorWhereInput | null
  }

  export type HierarchyMappingCountOrderByAggregateInput = {
    id?: SortOrder
    connectorId?: SortOrder
    managerId?: SortOrder
    role?: SortOrder
    assignedAt?: SortOrder
    assignedBy?: SortOrder
  }

  export type HierarchyMappingMaxOrderByAggregateInput = {
    id?: SortOrder
    connectorId?: SortOrder
    managerId?: SortOrder
    role?: SortOrder
    assignedAt?: SortOrder
    assignedBy?: SortOrder
  }

  export type HierarchyMappingMinOrderByAggregateInput = {
    id?: SortOrder
    connectorId?: SortOrder
    managerId?: SortOrder
    role?: SortOrder
    assignedAt?: SortOrder
    assignedBy?: SortOrder
  }

  export type ConnectorStatusHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    connectorId?: SortOrder
    status?: SortOrder
    changedAt?: SortOrder
    changedBy?: SortOrder
    remarks?: SortOrder
  }

  export type ConnectorStatusHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    connectorId?: SortOrder
    status?: SortOrder
    changedAt?: SortOrder
    changedBy?: SortOrder
    remarks?: SortOrder
  }

  export type ConnectorStatusHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    connectorId?: SortOrder
    status?: SortOrder
    changedAt?: SortOrder
    changedBy?: SortOrder
    remarks?: SortOrder
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

  export type ConnectorPerformanceCountOrderByAggregateInput = {
    id?: SortOrder
    connectorId?: SortOrder
    totalLeads?: SortOrder
    convertedLeads?: SortOrder
    totalCommission?: SortOrder
    lastCalculatedAt?: SortOrder
  }

  export type ConnectorPerformanceAvgOrderByAggregateInput = {
    totalLeads?: SortOrder
    convertedLeads?: SortOrder
    totalCommission?: SortOrder
  }

  export type ConnectorPerformanceMaxOrderByAggregateInput = {
    id?: SortOrder
    connectorId?: SortOrder
    totalLeads?: SortOrder
    convertedLeads?: SortOrder
    totalCommission?: SortOrder
    lastCalculatedAt?: SortOrder
  }

  export type ConnectorPerformanceMinOrderByAggregateInput = {
    id?: SortOrder
    connectorId?: SortOrder
    totalLeads?: SortOrder
    convertedLeads?: SortOrder
    totalCommission?: SortOrder
    lastCalculatedAt?: SortOrder
  }

  export type ConnectorPerformanceSumOrderByAggregateInput = {
    totalLeads?: SortOrder
    convertedLeads?: SortOrder
    totalCommission?: SortOrder
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CommissionRuleCountOrderByAggregateInput = {
    id?: SortOrder
    ruleName?: SortOrder
    connectorRate?: SortOrder
    tlOverrideRate?: SortOrder
    rmOverrideRate?: SortOrder
    isActive?: SortOrder
  }

  export type CommissionRuleAvgOrderByAggregateInput = {
    connectorRate?: SortOrder
    tlOverrideRate?: SortOrder
    rmOverrideRate?: SortOrder
  }

  export type CommissionRuleMaxOrderByAggregateInput = {
    id?: SortOrder
    ruleName?: SortOrder
    connectorRate?: SortOrder
    tlOverrideRate?: SortOrder
    rmOverrideRate?: SortOrder
    isActive?: SortOrder
  }

  export type CommissionRuleMinOrderByAggregateInput = {
    id?: SortOrder
    ruleName?: SortOrder
    connectorRate?: SortOrder
    tlOverrideRate?: SortOrder
    rmOverrideRate?: SortOrder
    isActive?: SortOrder
  }

  export type CommissionRuleSumOrderByAggregateInput = {
    connectorRate?: SortOrder
    tlOverrideRate?: SortOrder
    rmOverrideRate?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type ConnectorRelationFilter = {
    is?: ConnectorWhereInput
    isNot?: ConnectorWhereInput
  }

  export type PayoutHistoryListRelationFilter = {
    every?: PayoutHistoryWhereInput
    some?: PayoutHistoryWhereInput
    none?: PayoutHistoryWhereInput
  }

  export type PayoutHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommissionTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    loanId?: SortOrder
    connectorId?: SortOrder
    loanAmount?: SortOrder
    connectorRate?: SortOrder
    connectorCommission?: SortOrder
    teamLeaderOverride?: SortOrder
    rmOverride?: SortOrder
    totalPayout?: SortOrder
    status?: SortOrder
    amountPaid?: SortOrder
    paymentDate?: SortOrder
    createdAt?: SortOrder
  }

  export type CommissionTransactionAvgOrderByAggregateInput = {
    loanAmount?: SortOrder
    connectorRate?: SortOrder
    connectorCommission?: SortOrder
    teamLeaderOverride?: SortOrder
    rmOverride?: SortOrder
    totalPayout?: SortOrder
    amountPaid?: SortOrder
  }

  export type CommissionTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    loanId?: SortOrder
    connectorId?: SortOrder
    loanAmount?: SortOrder
    connectorRate?: SortOrder
    connectorCommission?: SortOrder
    teamLeaderOverride?: SortOrder
    rmOverride?: SortOrder
    totalPayout?: SortOrder
    status?: SortOrder
    amountPaid?: SortOrder
    paymentDate?: SortOrder
    createdAt?: SortOrder
  }

  export type CommissionTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    loanId?: SortOrder
    connectorId?: SortOrder
    loanAmount?: SortOrder
    connectorRate?: SortOrder
    connectorCommission?: SortOrder
    teamLeaderOverride?: SortOrder
    rmOverride?: SortOrder
    totalPayout?: SortOrder
    status?: SortOrder
    amountPaid?: SortOrder
    paymentDate?: SortOrder
    createdAt?: SortOrder
  }

  export type CommissionTransactionSumOrderByAggregateInput = {
    loanAmount?: SortOrder
    connectorRate?: SortOrder
    connectorCommission?: SortOrder
    teamLeaderOverride?: SortOrder
    rmOverride?: SortOrder
    totalPayout?: SortOrder
    amountPaid?: SortOrder
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

  export type CommissionTransactionNullableRelationFilter = {
    is?: CommissionTransactionWhereInput | null
    isNot?: CommissionTransactionWhereInput | null
  }

  export type PayoutHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    transactionId?: SortOrder
    paidAmount?: SortOrder
    paidAt?: SortOrder
    paidBy?: SortOrder
  }

  export type PayoutHistoryAvgOrderByAggregateInput = {
    paidAmount?: SortOrder
  }

  export type PayoutHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    transactionId?: SortOrder
    paidAmount?: SortOrder
    paidAt?: SortOrder
    paidBy?: SortOrder
  }

  export type PayoutHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    transactionId?: SortOrder
    paidAmount?: SortOrder
    paidAt?: SortOrder
    paidBy?: SortOrder
  }

  export type PayoutHistorySumOrderByAggregateInput = {
    paidAmount?: SortOrder
  }

  export type PayoutSlabCountOrderByAggregateInput = {
    id?: SortOrder
    connectorId?: SortOrder
    bankName?: SortOrder
    productCategory?: SortOrder
    payoutRate?: SortOrder
    minDisbursementAmount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PayoutSlabAvgOrderByAggregateInput = {
    payoutRate?: SortOrder
    minDisbursementAmount?: SortOrder
  }

  export type PayoutSlabMaxOrderByAggregateInput = {
    id?: SortOrder
    connectorId?: SortOrder
    bankName?: SortOrder
    productCategory?: SortOrder
    payoutRate?: SortOrder
    minDisbursementAmount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PayoutSlabMinOrderByAggregateInput = {
    id?: SortOrder
    connectorId?: SortOrder
    bankName?: SortOrder
    productCategory?: SortOrder
    payoutRate?: SortOrder
    minDisbursementAmount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PayoutSlabSumOrderByAggregateInput = {
    payoutRate?: SortOrder
    minDisbursementAmount?: SortOrder
  }

  export type RoutingHistoryListRelationFilter = {
    every?: RoutingHistoryWhereInput
    some?: RoutingHistoryWhereInput
    none?: RoutingHistoryWhereInput
  }

  export type RoutingHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SalesManagerCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    branchId?: SortOrder
    approvalRate?: SortOrder
    tatScore?: SortOrder
    currentCapacity?: SortOrder
    maxCapacity?: SortOrder
    experienceScore?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SalesManagerAvgOrderByAggregateInput = {
    approvalRate?: SortOrder
    tatScore?: SortOrder
    currentCapacity?: SortOrder
    maxCapacity?: SortOrder
    experienceScore?: SortOrder
  }

  export type SalesManagerMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    branchId?: SortOrder
    approvalRate?: SortOrder
    tatScore?: SortOrder
    currentCapacity?: SortOrder
    maxCapacity?: SortOrder
    experienceScore?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SalesManagerMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    branchId?: SortOrder
    approvalRate?: SortOrder
    tatScore?: SortOrder
    currentCapacity?: SortOrder
    maxCapacity?: SortOrder
    experienceScore?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SalesManagerSumOrderByAggregateInput = {
    approvalRate?: SortOrder
    tatScore?: SortOrder
    currentCapacity?: SortOrder
    maxCapacity?: SortOrder
    experienceScore?: SortOrder
  }

  export type SalesManagerNullableRelationFilter = {
    is?: SalesManagerWhereInput | null
    isNot?: SalesManagerWhereInput | null
  }

  export type RoutingHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    loanId?: SortOrder
    assignedSmId?: SortOrder
    routingScore?: SortOrder
    assignedAt?: SortOrder
  }

  export type RoutingHistoryAvgOrderByAggregateInput = {
    routingScore?: SortOrder
  }

  export type RoutingHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    loanId?: SortOrder
    assignedSmId?: SortOrder
    routingScore?: SortOrder
    assignedAt?: SortOrder
  }

  export type RoutingHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    loanId?: SortOrder
    assignedSmId?: SortOrder
    routingScore?: SortOrder
    assignedAt?: SortOrder
  }

  export type RoutingHistorySumOrderByAggregateInput = {
    routingScore?: SortOrder
  }

  export type CareerApplicationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    mobile?: SortOrder
    role?: SortOrder
    experience?: SortOrder
    coverNote?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type CareerApplicationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    mobile?: SortOrder
    role?: SortOrder
    experience?: SortOrder
    coverNote?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type CareerApplicationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    mobile?: SortOrder
    role?: SortOrder
    experience?: SortOrder
    coverNote?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type FoirAssessmentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    loanType?: SortOrder
    grossMonthlyIncome?: SortOrder
    existingMonthlyObligations?: SortOrder
    requestedLoanAmount?: SortOrder
    requestedTenureMonths?: SortOrder
    annualInterestRate?: SortOrder
    calculatedFoirPercentage?: SortOrder
    maxEligibleEmi?: SortOrder
    maxEligibleLoanAmount?: SortOrder
    postLoanFoirPercentage?: SortOrder
    eligibilityStatus?: SortOrder
    foirLimitApplied?: SortOrder
    incomeSource?: SortOrder
    assessmentNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FoirAssessmentAvgOrderByAggregateInput = {
    grossMonthlyIncome?: SortOrder
    existingMonthlyObligations?: SortOrder
    requestedLoanAmount?: SortOrder
    requestedTenureMonths?: SortOrder
    annualInterestRate?: SortOrder
    calculatedFoirPercentage?: SortOrder
    maxEligibleEmi?: SortOrder
    maxEligibleLoanAmount?: SortOrder
    postLoanFoirPercentage?: SortOrder
    foirLimitApplied?: SortOrder
  }

  export type FoirAssessmentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    loanType?: SortOrder
    grossMonthlyIncome?: SortOrder
    existingMonthlyObligations?: SortOrder
    requestedLoanAmount?: SortOrder
    requestedTenureMonths?: SortOrder
    annualInterestRate?: SortOrder
    calculatedFoirPercentage?: SortOrder
    maxEligibleEmi?: SortOrder
    maxEligibleLoanAmount?: SortOrder
    postLoanFoirPercentage?: SortOrder
    eligibilityStatus?: SortOrder
    foirLimitApplied?: SortOrder
    incomeSource?: SortOrder
    assessmentNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FoirAssessmentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    loanType?: SortOrder
    grossMonthlyIncome?: SortOrder
    existingMonthlyObligations?: SortOrder
    requestedLoanAmount?: SortOrder
    requestedTenureMonths?: SortOrder
    annualInterestRate?: SortOrder
    calculatedFoirPercentage?: SortOrder
    maxEligibleEmi?: SortOrder
    maxEligibleLoanAmount?: SortOrder
    postLoanFoirPercentage?: SortOrder
    eligibilityStatus?: SortOrder
    foirLimitApplied?: SortOrder
    incomeSource?: SortOrder
    assessmentNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FoirAssessmentSumOrderByAggregateInput = {
    grossMonthlyIncome?: SortOrder
    existingMonthlyObligations?: SortOrder
    requestedLoanAmount?: SortOrder
    requestedTenureMonths?: SortOrder
    annualInterestRate?: SortOrder
    calculatedFoirPercentage?: SortOrder
    maxEligibleEmi?: SortOrder
    maxEligibleLoanAmount?: SortOrder
    postLoanFoirPercentage?: SortOrder
    foirLimitApplied?: SortOrder
  }

  export type HierarchyMappingCreateNestedManyWithoutConnectorInput = {
    create?: XOR<HierarchyMappingCreateWithoutConnectorInput, HierarchyMappingUncheckedCreateWithoutConnectorInput> | HierarchyMappingCreateWithoutConnectorInput[] | HierarchyMappingUncheckedCreateWithoutConnectorInput[]
    connectOrCreate?: HierarchyMappingCreateOrConnectWithoutConnectorInput | HierarchyMappingCreateOrConnectWithoutConnectorInput[]
    createMany?: HierarchyMappingCreateManyConnectorInputEnvelope
    connect?: HierarchyMappingWhereUniqueInput | HierarchyMappingWhereUniqueInput[]
  }

  export type HierarchyMappingCreateNestedManyWithoutManagerInput = {
    create?: XOR<HierarchyMappingCreateWithoutManagerInput, HierarchyMappingUncheckedCreateWithoutManagerInput> | HierarchyMappingCreateWithoutManagerInput[] | HierarchyMappingUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: HierarchyMappingCreateOrConnectWithoutManagerInput | HierarchyMappingCreateOrConnectWithoutManagerInput[]
    createMany?: HierarchyMappingCreateManyManagerInputEnvelope
    connect?: HierarchyMappingWhereUniqueInput | HierarchyMappingWhereUniqueInput[]
  }

  export type ConnectorStatusHistoryCreateNestedManyWithoutConnectorInput = {
    create?: XOR<ConnectorStatusHistoryCreateWithoutConnectorInput, ConnectorStatusHistoryUncheckedCreateWithoutConnectorInput> | ConnectorStatusHistoryCreateWithoutConnectorInput[] | ConnectorStatusHistoryUncheckedCreateWithoutConnectorInput[]
    connectOrCreate?: ConnectorStatusHistoryCreateOrConnectWithoutConnectorInput | ConnectorStatusHistoryCreateOrConnectWithoutConnectorInput[]
    createMany?: ConnectorStatusHistoryCreateManyConnectorInputEnvelope
    connect?: ConnectorStatusHistoryWhereUniqueInput | ConnectorStatusHistoryWhereUniqueInput[]
  }

  export type ConnectorPerformanceCreateNestedOneWithoutConnectorInput = {
    create?: XOR<ConnectorPerformanceCreateWithoutConnectorInput, ConnectorPerformanceUncheckedCreateWithoutConnectorInput>
    connectOrCreate?: ConnectorPerformanceCreateOrConnectWithoutConnectorInput
    connect?: ConnectorPerformanceWhereUniqueInput
  }

  export type PayoutSlabCreateNestedManyWithoutConnectorInput = {
    create?: XOR<PayoutSlabCreateWithoutConnectorInput, PayoutSlabUncheckedCreateWithoutConnectorInput> | PayoutSlabCreateWithoutConnectorInput[] | PayoutSlabUncheckedCreateWithoutConnectorInput[]
    connectOrCreate?: PayoutSlabCreateOrConnectWithoutConnectorInput | PayoutSlabCreateOrConnectWithoutConnectorInput[]
    createMany?: PayoutSlabCreateManyConnectorInputEnvelope
    connect?: PayoutSlabWhereUniqueInput | PayoutSlabWhereUniqueInput[]
  }

  export type CommissionTransactionCreateNestedManyWithoutConnectorInput = {
    create?: XOR<CommissionTransactionCreateWithoutConnectorInput, CommissionTransactionUncheckedCreateWithoutConnectorInput> | CommissionTransactionCreateWithoutConnectorInput[] | CommissionTransactionUncheckedCreateWithoutConnectorInput[]
    connectOrCreate?: CommissionTransactionCreateOrConnectWithoutConnectorInput | CommissionTransactionCreateOrConnectWithoutConnectorInput[]
    createMany?: CommissionTransactionCreateManyConnectorInputEnvelope
    connect?: CommissionTransactionWhereUniqueInput | CommissionTransactionWhereUniqueInput[]
  }

  export type HierarchyMappingUncheckedCreateNestedManyWithoutConnectorInput = {
    create?: XOR<HierarchyMappingCreateWithoutConnectorInput, HierarchyMappingUncheckedCreateWithoutConnectorInput> | HierarchyMappingCreateWithoutConnectorInput[] | HierarchyMappingUncheckedCreateWithoutConnectorInput[]
    connectOrCreate?: HierarchyMappingCreateOrConnectWithoutConnectorInput | HierarchyMappingCreateOrConnectWithoutConnectorInput[]
    createMany?: HierarchyMappingCreateManyConnectorInputEnvelope
    connect?: HierarchyMappingWhereUniqueInput | HierarchyMappingWhereUniqueInput[]
  }

  export type HierarchyMappingUncheckedCreateNestedManyWithoutManagerInput = {
    create?: XOR<HierarchyMappingCreateWithoutManagerInput, HierarchyMappingUncheckedCreateWithoutManagerInput> | HierarchyMappingCreateWithoutManagerInput[] | HierarchyMappingUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: HierarchyMappingCreateOrConnectWithoutManagerInput | HierarchyMappingCreateOrConnectWithoutManagerInput[]
    createMany?: HierarchyMappingCreateManyManagerInputEnvelope
    connect?: HierarchyMappingWhereUniqueInput | HierarchyMappingWhereUniqueInput[]
  }

  export type ConnectorStatusHistoryUncheckedCreateNestedManyWithoutConnectorInput = {
    create?: XOR<ConnectorStatusHistoryCreateWithoutConnectorInput, ConnectorStatusHistoryUncheckedCreateWithoutConnectorInput> | ConnectorStatusHistoryCreateWithoutConnectorInput[] | ConnectorStatusHistoryUncheckedCreateWithoutConnectorInput[]
    connectOrCreate?: ConnectorStatusHistoryCreateOrConnectWithoutConnectorInput | ConnectorStatusHistoryCreateOrConnectWithoutConnectorInput[]
    createMany?: ConnectorStatusHistoryCreateManyConnectorInputEnvelope
    connect?: ConnectorStatusHistoryWhereUniqueInput | ConnectorStatusHistoryWhereUniqueInput[]
  }

  export type ConnectorPerformanceUncheckedCreateNestedOneWithoutConnectorInput = {
    create?: XOR<ConnectorPerformanceCreateWithoutConnectorInput, ConnectorPerformanceUncheckedCreateWithoutConnectorInput>
    connectOrCreate?: ConnectorPerformanceCreateOrConnectWithoutConnectorInput
    connect?: ConnectorPerformanceWhereUniqueInput
  }

  export type PayoutSlabUncheckedCreateNestedManyWithoutConnectorInput = {
    create?: XOR<PayoutSlabCreateWithoutConnectorInput, PayoutSlabUncheckedCreateWithoutConnectorInput> | PayoutSlabCreateWithoutConnectorInput[] | PayoutSlabUncheckedCreateWithoutConnectorInput[]
    connectOrCreate?: PayoutSlabCreateOrConnectWithoutConnectorInput | PayoutSlabCreateOrConnectWithoutConnectorInput[]
    createMany?: PayoutSlabCreateManyConnectorInputEnvelope
    connect?: PayoutSlabWhereUniqueInput | PayoutSlabWhereUniqueInput[]
  }

  export type CommissionTransactionUncheckedCreateNestedManyWithoutConnectorInput = {
    create?: XOR<CommissionTransactionCreateWithoutConnectorInput, CommissionTransactionUncheckedCreateWithoutConnectorInput> | CommissionTransactionCreateWithoutConnectorInput[] | CommissionTransactionUncheckedCreateWithoutConnectorInput[]
    connectOrCreate?: CommissionTransactionCreateOrConnectWithoutConnectorInput | CommissionTransactionCreateOrConnectWithoutConnectorInput[]
    createMany?: CommissionTransactionCreateManyConnectorInputEnvelope
    connect?: CommissionTransactionWhereUniqueInput | CommissionTransactionWhereUniqueInput[]
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

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type HierarchyMappingUpdateManyWithoutConnectorNestedInput = {
    create?: XOR<HierarchyMappingCreateWithoutConnectorInput, HierarchyMappingUncheckedCreateWithoutConnectorInput> | HierarchyMappingCreateWithoutConnectorInput[] | HierarchyMappingUncheckedCreateWithoutConnectorInput[]
    connectOrCreate?: HierarchyMappingCreateOrConnectWithoutConnectorInput | HierarchyMappingCreateOrConnectWithoutConnectorInput[]
    upsert?: HierarchyMappingUpsertWithWhereUniqueWithoutConnectorInput | HierarchyMappingUpsertWithWhereUniqueWithoutConnectorInput[]
    createMany?: HierarchyMappingCreateManyConnectorInputEnvelope
    set?: HierarchyMappingWhereUniqueInput | HierarchyMappingWhereUniqueInput[]
    disconnect?: HierarchyMappingWhereUniqueInput | HierarchyMappingWhereUniqueInput[]
    delete?: HierarchyMappingWhereUniqueInput | HierarchyMappingWhereUniqueInput[]
    connect?: HierarchyMappingWhereUniqueInput | HierarchyMappingWhereUniqueInput[]
    update?: HierarchyMappingUpdateWithWhereUniqueWithoutConnectorInput | HierarchyMappingUpdateWithWhereUniqueWithoutConnectorInput[]
    updateMany?: HierarchyMappingUpdateManyWithWhereWithoutConnectorInput | HierarchyMappingUpdateManyWithWhereWithoutConnectorInput[]
    deleteMany?: HierarchyMappingScalarWhereInput | HierarchyMappingScalarWhereInput[]
  }

  export type HierarchyMappingUpdateManyWithoutManagerNestedInput = {
    create?: XOR<HierarchyMappingCreateWithoutManagerInput, HierarchyMappingUncheckedCreateWithoutManagerInput> | HierarchyMappingCreateWithoutManagerInput[] | HierarchyMappingUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: HierarchyMappingCreateOrConnectWithoutManagerInput | HierarchyMappingCreateOrConnectWithoutManagerInput[]
    upsert?: HierarchyMappingUpsertWithWhereUniqueWithoutManagerInput | HierarchyMappingUpsertWithWhereUniqueWithoutManagerInput[]
    createMany?: HierarchyMappingCreateManyManagerInputEnvelope
    set?: HierarchyMappingWhereUniqueInput | HierarchyMappingWhereUniqueInput[]
    disconnect?: HierarchyMappingWhereUniqueInput | HierarchyMappingWhereUniqueInput[]
    delete?: HierarchyMappingWhereUniqueInput | HierarchyMappingWhereUniqueInput[]
    connect?: HierarchyMappingWhereUniqueInput | HierarchyMappingWhereUniqueInput[]
    update?: HierarchyMappingUpdateWithWhereUniqueWithoutManagerInput | HierarchyMappingUpdateWithWhereUniqueWithoutManagerInput[]
    updateMany?: HierarchyMappingUpdateManyWithWhereWithoutManagerInput | HierarchyMappingUpdateManyWithWhereWithoutManagerInput[]
    deleteMany?: HierarchyMappingScalarWhereInput | HierarchyMappingScalarWhereInput[]
  }

  export type ConnectorStatusHistoryUpdateManyWithoutConnectorNestedInput = {
    create?: XOR<ConnectorStatusHistoryCreateWithoutConnectorInput, ConnectorStatusHistoryUncheckedCreateWithoutConnectorInput> | ConnectorStatusHistoryCreateWithoutConnectorInput[] | ConnectorStatusHistoryUncheckedCreateWithoutConnectorInput[]
    connectOrCreate?: ConnectorStatusHistoryCreateOrConnectWithoutConnectorInput | ConnectorStatusHistoryCreateOrConnectWithoutConnectorInput[]
    upsert?: ConnectorStatusHistoryUpsertWithWhereUniqueWithoutConnectorInput | ConnectorStatusHistoryUpsertWithWhereUniqueWithoutConnectorInput[]
    createMany?: ConnectorStatusHistoryCreateManyConnectorInputEnvelope
    set?: ConnectorStatusHistoryWhereUniqueInput | ConnectorStatusHistoryWhereUniqueInput[]
    disconnect?: ConnectorStatusHistoryWhereUniqueInput | ConnectorStatusHistoryWhereUniqueInput[]
    delete?: ConnectorStatusHistoryWhereUniqueInput | ConnectorStatusHistoryWhereUniqueInput[]
    connect?: ConnectorStatusHistoryWhereUniqueInput | ConnectorStatusHistoryWhereUniqueInput[]
    update?: ConnectorStatusHistoryUpdateWithWhereUniqueWithoutConnectorInput | ConnectorStatusHistoryUpdateWithWhereUniqueWithoutConnectorInput[]
    updateMany?: ConnectorStatusHistoryUpdateManyWithWhereWithoutConnectorInput | ConnectorStatusHistoryUpdateManyWithWhereWithoutConnectorInput[]
    deleteMany?: ConnectorStatusHistoryScalarWhereInput | ConnectorStatusHistoryScalarWhereInput[]
  }

  export type ConnectorPerformanceUpdateOneWithoutConnectorNestedInput = {
    create?: XOR<ConnectorPerformanceCreateWithoutConnectorInput, ConnectorPerformanceUncheckedCreateWithoutConnectorInput>
    connectOrCreate?: ConnectorPerformanceCreateOrConnectWithoutConnectorInput
    upsert?: ConnectorPerformanceUpsertWithoutConnectorInput
    disconnect?: ConnectorPerformanceWhereInput | boolean
    delete?: ConnectorPerformanceWhereInput | boolean
    connect?: ConnectorPerformanceWhereUniqueInput
    update?: XOR<XOR<ConnectorPerformanceUpdateToOneWithWhereWithoutConnectorInput, ConnectorPerformanceUpdateWithoutConnectorInput>, ConnectorPerformanceUncheckedUpdateWithoutConnectorInput>
  }

  export type PayoutSlabUpdateManyWithoutConnectorNestedInput = {
    create?: XOR<PayoutSlabCreateWithoutConnectorInput, PayoutSlabUncheckedCreateWithoutConnectorInput> | PayoutSlabCreateWithoutConnectorInput[] | PayoutSlabUncheckedCreateWithoutConnectorInput[]
    connectOrCreate?: PayoutSlabCreateOrConnectWithoutConnectorInput | PayoutSlabCreateOrConnectWithoutConnectorInput[]
    upsert?: PayoutSlabUpsertWithWhereUniqueWithoutConnectorInput | PayoutSlabUpsertWithWhereUniqueWithoutConnectorInput[]
    createMany?: PayoutSlabCreateManyConnectorInputEnvelope
    set?: PayoutSlabWhereUniqueInput | PayoutSlabWhereUniqueInput[]
    disconnect?: PayoutSlabWhereUniqueInput | PayoutSlabWhereUniqueInput[]
    delete?: PayoutSlabWhereUniqueInput | PayoutSlabWhereUniqueInput[]
    connect?: PayoutSlabWhereUniqueInput | PayoutSlabWhereUniqueInput[]
    update?: PayoutSlabUpdateWithWhereUniqueWithoutConnectorInput | PayoutSlabUpdateWithWhereUniqueWithoutConnectorInput[]
    updateMany?: PayoutSlabUpdateManyWithWhereWithoutConnectorInput | PayoutSlabUpdateManyWithWhereWithoutConnectorInput[]
    deleteMany?: PayoutSlabScalarWhereInput | PayoutSlabScalarWhereInput[]
  }

  export type CommissionTransactionUpdateManyWithoutConnectorNestedInput = {
    create?: XOR<CommissionTransactionCreateWithoutConnectorInput, CommissionTransactionUncheckedCreateWithoutConnectorInput> | CommissionTransactionCreateWithoutConnectorInput[] | CommissionTransactionUncheckedCreateWithoutConnectorInput[]
    connectOrCreate?: CommissionTransactionCreateOrConnectWithoutConnectorInput | CommissionTransactionCreateOrConnectWithoutConnectorInput[]
    upsert?: CommissionTransactionUpsertWithWhereUniqueWithoutConnectorInput | CommissionTransactionUpsertWithWhereUniqueWithoutConnectorInput[]
    createMany?: CommissionTransactionCreateManyConnectorInputEnvelope
    set?: CommissionTransactionWhereUniqueInput | CommissionTransactionWhereUniqueInput[]
    disconnect?: CommissionTransactionWhereUniqueInput | CommissionTransactionWhereUniqueInput[]
    delete?: CommissionTransactionWhereUniqueInput | CommissionTransactionWhereUniqueInput[]
    connect?: CommissionTransactionWhereUniqueInput | CommissionTransactionWhereUniqueInput[]
    update?: CommissionTransactionUpdateWithWhereUniqueWithoutConnectorInput | CommissionTransactionUpdateWithWhereUniqueWithoutConnectorInput[]
    updateMany?: CommissionTransactionUpdateManyWithWhereWithoutConnectorInput | CommissionTransactionUpdateManyWithWhereWithoutConnectorInput[]
    deleteMany?: CommissionTransactionScalarWhereInput | CommissionTransactionScalarWhereInput[]
  }

  export type HierarchyMappingUncheckedUpdateManyWithoutConnectorNestedInput = {
    create?: XOR<HierarchyMappingCreateWithoutConnectorInput, HierarchyMappingUncheckedCreateWithoutConnectorInput> | HierarchyMappingCreateWithoutConnectorInput[] | HierarchyMappingUncheckedCreateWithoutConnectorInput[]
    connectOrCreate?: HierarchyMappingCreateOrConnectWithoutConnectorInput | HierarchyMappingCreateOrConnectWithoutConnectorInput[]
    upsert?: HierarchyMappingUpsertWithWhereUniqueWithoutConnectorInput | HierarchyMappingUpsertWithWhereUniqueWithoutConnectorInput[]
    createMany?: HierarchyMappingCreateManyConnectorInputEnvelope
    set?: HierarchyMappingWhereUniqueInput | HierarchyMappingWhereUniqueInput[]
    disconnect?: HierarchyMappingWhereUniqueInput | HierarchyMappingWhereUniqueInput[]
    delete?: HierarchyMappingWhereUniqueInput | HierarchyMappingWhereUniqueInput[]
    connect?: HierarchyMappingWhereUniqueInput | HierarchyMappingWhereUniqueInput[]
    update?: HierarchyMappingUpdateWithWhereUniqueWithoutConnectorInput | HierarchyMappingUpdateWithWhereUniqueWithoutConnectorInput[]
    updateMany?: HierarchyMappingUpdateManyWithWhereWithoutConnectorInput | HierarchyMappingUpdateManyWithWhereWithoutConnectorInput[]
    deleteMany?: HierarchyMappingScalarWhereInput | HierarchyMappingScalarWhereInput[]
  }

  export type HierarchyMappingUncheckedUpdateManyWithoutManagerNestedInput = {
    create?: XOR<HierarchyMappingCreateWithoutManagerInput, HierarchyMappingUncheckedCreateWithoutManagerInput> | HierarchyMappingCreateWithoutManagerInput[] | HierarchyMappingUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: HierarchyMappingCreateOrConnectWithoutManagerInput | HierarchyMappingCreateOrConnectWithoutManagerInput[]
    upsert?: HierarchyMappingUpsertWithWhereUniqueWithoutManagerInput | HierarchyMappingUpsertWithWhereUniqueWithoutManagerInput[]
    createMany?: HierarchyMappingCreateManyManagerInputEnvelope
    set?: HierarchyMappingWhereUniqueInput | HierarchyMappingWhereUniqueInput[]
    disconnect?: HierarchyMappingWhereUniqueInput | HierarchyMappingWhereUniqueInput[]
    delete?: HierarchyMappingWhereUniqueInput | HierarchyMappingWhereUniqueInput[]
    connect?: HierarchyMappingWhereUniqueInput | HierarchyMappingWhereUniqueInput[]
    update?: HierarchyMappingUpdateWithWhereUniqueWithoutManagerInput | HierarchyMappingUpdateWithWhereUniqueWithoutManagerInput[]
    updateMany?: HierarchyMappingUpdateManyWithWhereWithoutManagerInput | HierarchyMappingUpdateManyWithWhereWithoutManagerInput[]
    deleteMany?: HierarchyMappingScalarWhereInput | HierarchyMappingScalarWhereInput[]
  }

  export type ConnectorStatusHistoryUncheckedUpdateManyWithoutConnectorNestedInput = {
    create?: XOR<ConnectorStatusHistoryCreateWithoutConnectorInput, ConnectorStatusHistoryUncheckedCreateWithoutConnectorInput> | ConnectorStatusHistoryCreateWithoutConnectorInput[] | ConnectorStatusHistoryUncheckedCreateWithoutConnectorInput[]
    connectOrCreate?: ConnectorStatusHistoryCreateOrConnectWithoutConnectorInput | ConnectorStatusHistoryCreateOrConnectWithoutConnectorInput[]
    upsert?: ConnectorStatusHistoryUpsertWithWhereUniqueWithoutConnectorInput | ConnectorStatusHistoryUpsertWithWhereUniqueWithoutConnectorInput[]
    createMany?: ConnectorStatusHistoryCreateManyConnectorInputEnvelope
    set?: ConnectorStatusHistoryWhereUniqueInput | ConnectorStatusHistoryWhereUniqueInput[]
    disconnect?: ConnectorStatusHistoryWhereUniqueInput | ConnectorStatusHistoryWhereUniqueInput[]
    delete?: ConnectorStatusHistoryWhereUniqueInput | ConnectorStatusHistoryWhereUniqueInput[]
    connect?: ConnectorStatusHistoryWhereUniqueInput | ConnectorStatusHistoryWhereUniqueInput[]
    update?: ConnectorStatusHistoryUpdateWithWhereUniqueWithoutConnectorInput | ConnectorStatusHistoryUpdateWithWhereUniqueWithoutConnectorInput[]
    updateMany?: ConnectorStatusHistoryUpdateManyWithWhereWithoutConnectorInput | ConnectorStatusHistoryUpdateManyWithWhereWithoutConnectorInput[]
    deleteMany?: ConnectorStatusHistoryScalarWhereInput | ConnectorStatusHistoryScalarWhereInput[]
  }

  export type ConnectorPerformanceUncheckedUpdateOneWithoutConnectorNestedInput = {
    create?: XOR<ConnectorPerformanceCreateWithoutConnectorInput, ConnectorPerformanceUncheckedCreateWithoutConnectorInput>
    connectOrCreate?: ConnectorPerformanceCreateOrConnectWithoutConnectorInput
    upsert?: ConnectorPerformanceUpsertWithoutConnectorInput
    disconnect?: ConnectorPerformanceWhereInput | boolean
    delete?: ConnectorPerformanceWhereInput | boolean
    connect?: ConnectorPerformanceWhereUniqueInput
    update?: XOR<XOR<ConnectorPerformanceUpdateToOneWithWhereWithoutConnectorInput, ConnectorPerformanceUpdateWithoutConnectorInput>, ConnectorPerformanceUncheckedUpdateWithoutConnectorInput>
  }

  export type PayoutSlabUncheckedUpdateManyWithoutConnectorNestedInput = {
    create?: XOR<PayoutSlabCreateWithoutConnectorInput, PayoutSlabUncheckedCreateWithoutConnectorInput> | PayoutSlabCreateWithoutConnectorInput[] | PayoutSlabUncheckedCreateWithoutConnectorInput[]
    connectOrCreate?: PayoutSlabCreateOrConnectWithoutConnectorInput | PayoutSlabCreateOrConnectWithoutConnectorInput[]
    upsert?: PayoutSlabUpsertWithWhereUniqueWithoutConnectorInput | PayoutSlabUpsertWithWhereUniqueWithoutConnectorInput[]
    createMany?: PayoutSlabCreateManyConnectorInputEnvelope
    set?: PayoutSlabWhereUniqueInput | PayoutSlabWhereUniqueInput[]
    disconnect?: PayoutSlabWhereUniqueInput | PayoutSlabWhereUniqueInput[]
    delete?: PayoutSlabWhereUniqueInput | PayoutSlabWhereUniqueInput[]
    connect?: PayoutSlabWhereUniqueInput | PayoutSlabWhereUniqueInput[]
    update?: PayoutSlabUpdateWithWhereUniqueWithoutConnectorInput | PayoutSlabUpdateWithWhereUniqueWithoutConnectorInput[]
    updateMany?: PayoutSlabUpdateManyWithWhereWithoutConnectorInput | PayoutSlabUpdateManyWithWhereWithoutConnectorInput[]
    deleteMany?: PayoutSlabScalarWhereInput | PayoutSlabScalarWhereInput[]
  }

  export type CommissionTransactionUncheckedUpdateManyWithoutConnectorNestedInput = {
    create?: XOR<CommissionTransactionCreateWithoutConnectorInput, CommissionTransactionUncheckedCreateWithoutConnectorInput> | CommissionTransactionCreateWithoutConnectorInput[] | CommissionTransactionUncheckedCreateWithoutConnectorInput[]
    connectOrCreate?: CommissionTransactionCreateOrConnectWithoutConnectorInput | CommissionTransactionCreateOrConnectWithoutConnectorInput[]
    upsert?: CommissionTransactionUpsertWithWhereUniqueWithoutConnectorInput | CommissionTransactionUpsertWithWhereUniqueWithoutConnectorInput[]
    createMany?: CommissionTransactionCreateManyConnectorInputEnvelope
    set?: CommissionTransactionWhereUniqueInput | CommissionTransactionWhereUniqueInput[]
    disconnect?: CommissionTransactionWhereUniqueInput | CommissionTransactionWhereUniqueInput[]
    delete?: CommissionTransactionWhereUniqueInput | CommissionTransactionWhereUniqueInput[]
    connect?: CommissionTransactionWhereUniqueInput | CommissionTransactionWhereUniqueInput[]
    update?: CommissionTransactionUpdateWithWhereUniqueWithoutConnectorInput | CommissionTransactionUpdateWithWhereUniqueWithoutConnectorInput[]
    updateMany?: CommissionTransactionUpdateManyWithWhereWithoutConnectorInput | CommissionTransactionUpdateManyWithWhereWithoutConnectorInput[]
    deleteMany?: CommissionTransactionScalarWhereInput | CommissionTransactionScalarWhereInput[]
  }

  export type ConnectorCreateNestedOneWithoutHierarchiesInput = {
    create?: XOR<ConnectorCreateWithoutHierarchiesInput, ConnectorUncheckedCreateWithoutHierarchiesInput>
    connectOrCreate?: ConnectorCreateOrConnectWithoutHierarchiesInput
    connect?: ConnectorWhereUniqueInput
  }

  export type ConnectorCreateNestedOneWithoutManagedInput = {
    create?: XOR<ConnectorCreateWithoutManagedInput, ConnectorUncheckedCreateWithoutManagedInput>
    connectOrCreate?: ConnectorCreateOrConnectWithoutManagedInput
    connect?: ConnectorWhereUniqueInput
  }

  export type ConnectorUpdateOneWithoutHierarchiesNestedInput = {
    create?: XOR<ConnectorCreateWithoutHierarchiesInput, ConnectorUncheckedCreateWithoutHierarchiesInput>
    connectOrCreate?: ConnectorCreateOrConnectWithoutHierarchiesInput
    upsert?: ConnectorUpsertWithoutHierarchiesInput
    disconnect?: ConnectorWhereInput | boolean
    delete?: ConnectorWhereInput | boolean
    connect?: ConnectorWhereUniqueInput
    update?: XOR<XOR<ConnectorUpdateToOneWithWhereWithoutHierarchiesInput, ConnectorUpdateWithoutHierarchiesInput>, ConnectorUncheckedUpdateWithoutHierarchiesInput>
  }

  export type ConnectorUpdateOneWithoutManagedNestedInput = {
    create?: XOR<ConnectorCreateWithoutManagedInput, ConnectorUncheckedCreateWithoutManagedInput>
    connectOrCreate?: ConnectorCreateOrConnectWithoutManagedInput
    upsert?: ConnectorUpsertWithoutManagedInput
    disconnect?: ConnectorWhereInput | boolean
    delete?: ConnectorWhereInput | boolean
    connect?: ConnectorWhereUniqueInput
    update?: XOR<XOR<ConnectorUpdateToOneWithWhereWithoutManagedInput, ConnectorUpdateWithoutManagedInput>, ConnectorUncheckedUpdateWithoutManagedInput>
  }

  export type ConnectorCreateNestedOneWithoutStatusHistoryInput = {
    create?: XOR<ConnectorCreateWithoutStatusHistoryInput, ConnectorUncheckedCreateWithoutStatusHistoryInput>
    connectOrCreate?: ConnectorCreateOrConnectWithoutStatusHistoryInput
    connect?: ConnectorWhereUniqueInput
  }

  export type ConnectorUpdateOneWithoutStatusHistoryNestedInput = {
    create?: XOR<ConnectorCreateWithoutStatusHistoryInput, ConnectorUncheckedCreateWithoutStatusHistoryInput>
    connectOrCreate?: ConnectorCreateOrConnectWithoutStatusHistoryInput
    upsert?: ConnectorUpsertWithoutStatusHistoryInput
    disconnect?: ConnectorWhereInput | boolean
    delete?: ConnectorWhereInput | boolean
    connect?: ConnectorWhereUniqueInput
    update?: XOR<XOR<ConnectorUpdateToOneWithWhereWithoutStatusHistoryInput, ConnectorUpdateWithoutStatusHistoryInput>, ConnectorUncheckedUpdateWithoutStatusHistoryInput>
  }

  export type ConnectorCreateNestedOneWithoutPerformanceInput = {
    create?: XOR<ConnectorCreateWithoutPerformanceInput, ConnectorUncheckedCreateWithoutPerformanceInput>
    connectOrCreate?: ConnectorCreateOrConnectWithoutPerformanceInput
    connect?: ConnectorWhereUniqueInput
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

  export type ConnectorUpdateOneWithoutPerformanceNestedInput = {
    create?: XOR<ConnectorCreateWithoutPerformanceInput, ConnectorUncheckedCreateWithoutPerformanceInput>
    connectOrCreate?: ConnectorCreateOrConnectWithoutPerformanceInput
    upsert?: ConnectorUpsertWithoutPerformanceInput
    disconnect?: ConnectorWhereInput | boolean
    delete?: ConnectorWhereInput | boolean
    connect?: ConnectorWhereUniqueInput
    update?: XOR<XOR<ConnectorUpdateToOneWithWhereWithoutPerformanceInput, ConnectorUpdateWithoutPerformanceInput>, ConnectorUncheckedUpdateWithoutPerformanceInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ConnectorCreateNestedOneWithoutCommissionsInput = {
    create?: XOR<ConnectorCreateWithoutCommissionsInput, ConnectorUncheckedCreateWithoutCommissionsInput>
    connectOrCreate?: ConnectorCreateOrConnectWithoutCommissionsInput
    connect?: ConnectorWhereUniqueInput
  }

  export type PayoutHistoryCreateNestedManyWithoutTransactionInput = {
    create?: XOR<PayoutHistoryCreateWithoutTransactionInput, PayoutHistoryUncheckedCreateWithoutTransactionInput> | PayoutHistoryCreateWithoutTransactionInput[] | PayoutHistoryUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: PayoutHistoryCreateOrConnectWithoutTransactionInput | PayoutHistoryCreateOrConnectWithoutTransactionInput[]
    createMany?: PayoutHistoryCreateManyTransactionInputEnvelope
    connect?: PayoutHistoryWhereUniqueInput | PayoutHistoryWhereUniqueInput[]
  }

  export type PayoutHistoryUncheckedCreateNestedManyWithoutTransactionInput = {
    create?: XOR<PayoutHistoryCreateWithoutTransactionInput, PayoutHistoryUncheckedCreateWithoutTransactionInput> | PayoutHistoryCreateWithoutTransactionInput[] | PayoutHistoryUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: PayoutHistoryCreateOrConnectWithoutTransactionInput | PayoutHistoryCreateOrConnectWithoutTransactionInput[]
    createMany?: PayoutHistoryCreateManyTransactionInputEnvelope
    connect?: PayoutHistoryWhereUniqueInput | PayoutHistoryWhereUniqueInput[]
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type ConnectorUpdateOneRequiredWithoutCommissionsNestedInput = {
    create?: XOR<ConnectorCreateWithoutCommissionsInput, ConnectorUncheckedCreateWithoutCommissionsInput>
    connectOrCreate?: ConnectorCreateOrConnectWithoutCommissionsInput
    upsert?: ConnectorUpsertWithoutCommissionsInput
    connect?: ConnectorWhereUniqueInput
    update?: XOR<XOR<ConnectorUpdateToOneWithWhereWithoutCommissionsInput, ConnectorUpdateWithoutCommissionsInput>, ConnectorUncheckedUpdateWithoutCommissionsInput>
  }

  export type PayoutHistoryUpdateManyWithoutTransactionNestedInput = {
    create?: XOR<PayoutHistoryCreateWithoutTransactionInput, PayoutHistoryUncheckedCreateWithoutTransactionInput> | PayoutHistoryCreateWithoutTransactionInput[] | PayoutHistoryUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: PayoutHistoryCreateOrConnectWithoutTransactionInput | PayoutHistoryCreateOrConnectWithoutTransactionInput[]
    upsert?: PayoutHistoryUpsertWithWhereUniqueWithoutTransactionInput | PayoutHistoryUpsertWithWhereUniqueWithoutTransactionInput[]
    createMany?: PayoutHistoryCreateManyTransactionInputEnvelope
    set?: PayoutHistoryWhereUniqueInput | PayoutHistoryWhereUniqueInput[]
    disconnect?: PayoutHistoryWhereUniqueInput | PayoutHistoryWhereUniqueInput[]
    delete?: PayoutHistoryWhereUniqueInput | PayoutHistoryWhereUniqueInput[]
    connect?: PayoutHistoryWhereUniqueInput | PayoutHistoryWhereUniqueInput[]
    update?: PayoutHistoryUpdateWithWhereUniqueWithoutTransactionInput | PayoutHistoryUpdateWithWhereUniqueWithoutTransactionInput[]
    updateMany?: PayoutHistoryUpdateManyWithWhereWithoutTransactionInput | PayoutHistoryUpdateManyWithWhereWithoutTransactionInput[]
    deleteMany?: PayoutHistoryScalarWhereInput | PayoutHistoryScalarWhereInput[]
  }

  export type PayoutHistoryUncheckedUpdateManyWithoutTransactionNestedInput = {
    create?: XOR<PayoutHistoryCreateWithoutTransactionInput, PayoutHistoryUncheckedCreateWithoutTransactionInput> | PayoutHistoryCreateWithoutTransactionInput[] | PayoutHistoryUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: PayoutHistoryCreateOrConnectWithoutTransactionInput | PayoutHistoryCreateOrConnectWithoutTransactionInput[]
    upsert?: PayoutHistoryUpsertWithWhereUniqueWithoutTransactionInput | PayoutHistoryUpsertWithWhereUniqueWithoutTransactionInput[]
    createMany?: PayoutHistoryCreateManyTransactionInputEnvelope
    set?: PayoutHistoryWhereUniqueInput | PayoutHistoryWhereUniqueInput[]
    disconnect?: PayoutHistoryWhereUniqueInput | PayoutHistoryWhereUniqueInput[]
    delete?: PayoutHistoryWhereUniqueInput | PayoutHistoryWhereUniqueInput[]
    connect?: PayoutHistoryWhereUniqueInput | PayoutHistoryWhereUniqueInput[]
    update?: PayoutHistoryUpdateWithWhereUniqueWithoutTransactionInput | PayoutHistoryUpdateWithWhereUniqueWithoutTransactionInput[]
    updateMany?: PayoutHistoryUpdateManyWithWhereWithoutTransactionInput | PayoutHistoryUpdateManyWithWhereWithoutTransactionInput[]
    deleteMany?: PayoutHistoryScalarWhereInput | PayoutHistoryScalarWhereInput[]
  }

  export type CommissionTransactionCreateNestedOneWithoutPayoutHistoryInput = {
    create?: XOR<CommissionTransactionCreateWithoutPayoutHistoryInput, CommissionTransactionUncheckedCreateWithoutPayoutHistoryInput>
    connectOrCreate?: CommissionTransactionCreateOrConnectWithoutPayoutHistoryInput
    connect?: CommissionTransactionWhereUniqueInput
  }

  export type CommissionTransactionUpdateOneWithoutPayoutHistoryNestedInput = {
    create?: XOR<CommissionTransactionCreateWithoutPayoutHistoryInput, CommissionTransactionUncheckedCreateWithoutPayoutHistoryInput>
    connectOrCreate?: CommissionTransactionCreateOrConnectWithoutPayoutHistoryInput
    upsert?: CommissionTransactionUpsertWithoutPayoutHistoryInput
    disconnect?: CommissionTransactionWhereInput | boolean
    delete?: CommissionTransactionWhereInput | boolean
    connect?: CommissionTransactionWhereUniqueInput
    update?: XOR<XOR<CommissionTransactionUpdateToOneWithWhereWithoutPayoutHistoryInput, CommissionTransactionUpdateWithoutPayoutHistoryInput>, CommissionTransactionUncheckedUpdateWithoutPayoutHistoryInput>
  }

  export type ConnectorCreateNestedOneWithoutPayoutSlabsInput = {
    create?: XOR<ConnectorCreateWithoutPayoutSlabsInput, ConnectorUncheckedCreateWithoutPayoutSlabsInput>
    connectOrCreate?: ConnectorCreateOrConnectWithoutPayoutSlabsInput
    connect?: ConnectorWhereUniqueInput
  }

  export type ConnectorUpdateOneWithoutPayoutSlabsNestedInput = {
    create?: XOR<ConnectorCreateWithoutPayoutSlabsInput, ConnectorUncheckedCreateWithoutPayoutSlabsInput>
    connectOrCreate?: ConnectorCreateOrConnectWithoutPayoutSlabsInput
    upsert?: ConnectorUpsertWithoutPayoutSlabsInput
    disconnect?: ConnectorWhereInput | boolean
    delete?: ConnectorWhereInput | boolean
    connect?: ConnectorWhereUniqueInput
    update?: XOR<XOR<ConnectorUpdateToOneWithWhereWithoutPayoutSlabsInput, ConnectorUpdateWithoutPayoutSlabsInput>, ConnectorUncheckedUpdateWithoutPayoutSlabsInput>
  }

  export type RoutingHistoryCreateNestedManyWithoutManagerInput = {
    create?: XOR<RoutingHistoryCreateWithoutManagerInput, RoutingHistoryUncheckedCreateWithoutManagerInput> | RoutingHistoryCreateWithoutManagerInput[] | RoutingHistoryUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: RoutingHistoryCreateOrConnectWithoutManagerInput | RoutingHistoryCreateOrConnectWithoutManagerInput[]
    createMany?: RoutingHistoryCreateManyManagerInputEnvelope
    connect?: RoutingHistoryWhereUniqueInput | RoutingHistoryWhereUniqueInput[]
  }

  export type RoutingHistoryUncheckedCreateNestedManyWithoutManagerInput = {
    create?: XOR<RoutingHistoryCreateWithoutManagerInput, RoutingHistoryUncheckedCreateWithoutManagerInput> | RoutingHistoryCreateWithoutManagerInput[] | RoutingHistoryUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: RoutingHistoryCreateOrConnectWithoutManagerInput | RoutingHistoryCreateOrConnectWithoutManagerInput[]
    createMany?: RoutingHistoryCreateManyManagerInputEnvelope
    connect?: RoutingHistoryWhereUniqueInput | RoutingHistoryWhereUniqueInput[]
  }

  export type RoutingHistoryUpdateManyWithoutManagerNestedInput = {
    create?: XOR<RoutingHistoryCreateWithoutManagerInput, RoutingHistoryUncheckedCreateWithoutManagerInput> | RoutingHistoryCreateWithoutManagerInput[] | RoutingHistoryUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: RoutingHistoryCreateOrConnectWithoutManagerInput | RoutingHistoryCreateOrConnectWithoutManagerInput[]
    upsert?: RoutingHistoryUpsertWithWhereUniqueWithoutManagerInput | RoutingHistoryUpsertWithWhereUniqueWithoutManagerInput[]
    createMany?: RoutingHistoryCreateManyManagerInputEnvelope
    set?: RoutingHistoryWhereUniqueInput | RoutingHistoryWhereUniqueInput[]
    disconnect?: RoutingHistoryWhereUniqueInput | RoutingHistoryWhereUniqueInput[]
    delete?: RoutingHistoryWhereUniqueInput | RoutingHistoryWhereUniqueInput[]
    connect?: RoutingHistoryWhereUniqueInput | RoutingHistoryWhereUniqueInput[]
    update?: RoutingHistoryUpdateWithWhereUniqueWithoutManagerInput | RoutingHistoryUpdateWithWhereUniqueWithoutManagerInput[]
    updateMany?: RoutingHistoryUpdateManyWithWhereWithoutManagerInput | RoutingHistoryUpdateManyWithWhereWithoutManagerInput[]
    deleteMany?: RoutingHistoryScalarWhereInput | RoutingHistoryScalarWhereInput[]
  }

  export type RoutingHistoryUncheckedUpdateManyWithoutManagerNestedInput = {
    create?: XOR<RoutingHistoryCreateWithoutManagerInput, RoutingHistoryUncheckedCreateWithoutManagerInput> | RoutingHistoryCreateWithoutManagerInput[] | RoutingHistoryUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: RoutingHistoryCreateOrConnectWithoutManagerInput | RoutingHistoryCreateOrConnectWithoutManagerInput[]
    upsert?: RoutingHistoryUpsertWithWhereUniqueWithoutManagerInput | RoutingHistoryUpsertWithWhereUniqueWithoutManagerInput[]
    createMany?: RoutingHistoryCreateManyManagerInputEnvelope
    set?: RoutingHistoryWhereUniqueInput | RoutingHistoryWhereUniqueInput[]
    disconnect?: RoutingHistoryWhereUniqueInput | RoutingHistoryWhereUniqueInput[]
    delete?: RoutingHistoryWhereUniqueInput | RoutingHistoryWhereUniqueInput[]
    connect?: RoutingHistoryWhereUniqueInput | RoutingHistoryWhereUniqueInput[]
    update?: RoutingHistoryUpdateWithWhereUniqueWithoutManagerInput | RoutingHistoryUpdateWithWhereUniqueWithoutManagerInput[]
    updateMany?: RoutingHistoryUpdateManyWithWhereWithoutManagerInput | RoutingHistoryUpdateManyWithWhereWithoutManagerInput[]
    deleteMany?: RoutingHistoryScalarWhereInput | RoutingHistoryScalarWhereInput[]
  }

  export type SalesManagerCreateNestedOneWithoutRoutingHistoryInput = {
    create?: XOR<SalesManagerCreateWithoutRoutingHistoryInput, SalesManagerUncheckedCreateWithoutRoutingHistoryInput>
    connectOrCreate?: SalesManagerCreateOrConnectWithoutRoutingHistoryInput
    connect?: SalesManagerWhereUniqueInput
  }

  export type SalesManagerUpdateOneWithoutRoutingHistoryNestedInput = {
    create?: XOR<SalesManagerCreateWithoutRoutingHistoryInput, SalesManagerUncheckedCreateWithoutRoutingHistoryInput>
    connectOrCreate?: SalesManagerCreateOrConnectWithoutRoutingHistoryInput
    upsert?: SalesManagerUpsertWithoutRoutingHistoryInput
    disconnect?: SalesManagerWhereInput | boolean
    delete?: SalesManagerWhereInput | boolean
    connect?: SalesManagerWhereUniqueInput
    update?: XOR<XOR<SalesManagerUpdateToOneWithWhereWithoutRoutingHistoryInput, SalesManagerUpdateWithoutRoutingHistoryInput>, SalesManagerUncheckedUpdateWithoutRoutingHistoryInput>
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

  export type HierarchyMappingCreateWithoutConnectorInput = {
    id: string
    role: string
    assignedAt: Date | string
    assignedBy?: string | null
    manager?: ConnectorCreateNestedOneWithoutManagedInput
  }

  export type HierarchyMappingUncheckedCreateWithoutConnectorInput = {
    id: string
    managerId?: string | null
    role: string
    assignedAt: Date | string
    assignedBy?: string | null
  }

  export type HierarchyMappingCreateOrConnectWithoutConnectorInput = {
    where: HierarchyMappingWhereUniqueInput
    create: XOR<HierarchyMappingCreateWithoutConnectorInput, HierarchyMappingUncheckedCreateWithoutConnectorInput>
  }

  export type HierarchyMappingCreateManyConnectorInputEnvelope = {
    data: HierarchyMappingCreateManyConnectorInput | HierarchyMappingCreateManyConnectorInput[]
    skipDuplicates?: boolean
  }

  export type HierarchyMappingCreateWithoutManagerInput = {
    id: string
    role: string
    assignedAt: Date | string
    assignedBy?: string | null
    connector?: ConnectorCreateNestedOneWithoutHierarchiesInput
  }

  export type HierarchyMappingUncheckedCreateWithoutManagerInput = {
    id: string
    connectorId?: string | null
    role: string
    assignedAt: Date | string
    assignedBy?: string | null
  }

  export type HierarchyMappingCreateOrConnectWithoutManagerInput = {
    where: HierarchyMappingWhereUniqueInput
    create: XOR<HierarchyMappingCreateWithoutManagerInput, HierarchyMappingUncheckedCreateWithoutManagerInput>
  }

  export type HierarchyMappingCreateManyManagerInputEnvelope = {
    data: HierarchyMappingCreateManyManagerInput | HierarchyMappingCreateManyManagerInput[]
    skipDuplicates?: boolean
  }

  export type ConnectorStatusHistoryCreateWithoutConnectorInput = {
    id: string
    status: string
    changedAt: Date | string
    changedBy?: string | null
    remarks?: string | null
  }

  export type ConnectorStatusHistoryUncheckedCreateWithoutConnectorInput = {
    id: string
    status: string
    changedAt: Date | string
    changedBy?: string | null
    remarks?: string | null
  }

  export type ConnectorStatusHistoryCreateOrConnectWithoutConnectorInput = {
    where: ConnectorStatusHistoryWhereUniqueInput
    create: XOR<ConnectorStatusHistoryCreateWithoutConnectorInput, ConnectorStatusHistoryUncheckedCreateWithoutConnectorInput>
  }

  export type ConnectorStatusHistoryCreateManyConnectorInputEnvelope = {
    data: ConnectorStatusHistoryCreateManyConnectorInput | ConnectorStatusHistoryCreateManyConnectorInput[]
    skipDuplicates?: boolean
  }

  export type ConnectorPerformanceCreateWithoutConnectorInput = {
    id: string
    totalLeads?: number
    convertedLeads?: number
    totalCommission?: Decimal | DecimalJsLike | number | string
    lastCalculatedAt?: Date | string | null
  }

  export type ConnectorPerformanceUncheckedCreateWithoutConnectorInput = {
    id: string
    totalLeads?: number
    convertedLeads?: number
    totalCommission?: Decimal | DecimalJsLike | number | string
    lastCalculatedAt?: Date | string | null
  }

  export type ConnectorPerformanceCreateOrConnectWithoutConnectorInput = {
    where: ConnectorPerformanceWhereUniqueInput
    create: XOR<ConnectorPerformanceCreateWithoutConnectorInput, ConnectorPerformanceUncheckedCreateWithoutConnectorInput>
  }

  export type PayoutSlabCreateWithoutConnectorInput = {
    id: string
    bankName: string
    productCategory: string
    payoutRate: Decimal | DecimalJsLike | number | string
    minDisbursementAmount?: Decimal | DecimalJsLike | number | string | null
    status: string
    createdAt: Date | string
    updatedAt?: Date | string | null
  }

  export type PayoutSlabUncheckedCreateWithoutConnectorInput = {
    id: string
    bankName: string
    productCategory: string
    payoutRate: Decimal | DecimalJsLike | number | string
    minDisbursementAmount?: Decimal | DecimalJsLike | number | string | null
    status: string
    createdAt: Date | string
    updatedAt?: Date | string | null
  }

  export type PayoutSlabCreateOrConnectWithoutConnectorInput = {
    where: PayoutSlabWhereUniqueInput
    create: XOR<PayoutSlabCreateWithoutConnectorInput, PayoutSlabUncheckedCreateWithoutConnectorInput>
  }

  export type PayoutSlabCreateManyConnectorInputEnvelope = {
    data: PayoutSlabCreateManyConnectorInput | PayoutSlabCreateManyConnectorInput[]
    skipDuplicates?: boolean
  }

  export type CommissionTransactionCreateWithoutConnectorInput = {
    id: string
    loanId: string
    loanAmount: Decimal | DecimalJsLike | number | string
    connectorRate: Decimal | DecimalJsLike | number | string
    connectorCommission: Decimal | DecimalJsLike | number | string
    teamLeaderOverride?: Decimal | DecimalJsLike | number | string | null
    rmOverride?: Decimal | DecimalJsLike | number | string | null
    totalPayout: Decimal | DecimalJsLike | number | string
    status: string
    amountPaid?: Decimal | DecimalJsLike | number | string
    paymentDate?: Date | string | null
    createdAt: Date | string
    payoutHistory?: PayoutHistoryCreateNestedManyWithoutTransactionInput
  }

  export type CommissionTransactionUncheckedCreateWithoutConnectorInput = {
    id: string
    loanId: string
    loanAmount: Decimal | DecimalJsLike | number | string
    connectorRate: Decimal | DecimalJsLike | number | string
    connectorCommission: Decimal | DecimalJsLike | number | string
    teamLeaderOverride?: Decimal | DecimalJsLike | number | string | null
    rmOverride?: Decimal | DecimalJsLike | number | string | null
    totalPayout: Decimal | DecimalJsLike | number | string
    status: string
    amountPaid?: Decimal | DecimalJsLike | number | string
    paymentDate?: Date | string | null
    createdAt: Date | string
    payoutHistory?: PayoutHistoryUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type CommissionTransactionCreateOrConnectWithoutConnectorInput = {
    where: CommissionTransactionWhereUniqueInput
    create: XOR<CommissionTransactionCreateWithoutConnectorInput, CommissionTransactionUncheckedCreateWithoutConnectorInput>
  }

  export type CommissionTransactionCreateManyConnectorInputEnvelope = {
    data: CommissionTransactionCreateManyConnectorInput | CommissionTransactionCreateManyConnectorInput[]
    skipDuplicates?: boolean
  }

  export type HierarchyMappingUpsertWithWhereUniqueWithoutConnectorInput = {
    where: HierarchyMappingWhereUniqueInput
    update: XOR<HierarchyMappingUpdateWithoutConnectorInput, HierarchyMappingUncheckedUpdateWithoutConnectorInput>
    create: XOR<HierarchyMappingCreateWithoutConnectorInput, HierarchyMappingUncheckedCreateWithoutConnectorInput>
  }

  export type HierarchyMappingUpdateWithWhereUniqueWithoutConnectorInput = {
    where: HierarchyMappingWhereUniqueInput
    data: XOR<HierarchyMappingUpdateWithoutConnectorInput, HierarchyMappingUncheckedUpdateWithoutConnectorInput>
  }

  export type HierarchyMappingUpdateManyWithWhereWithoutConnectorInput = {
    where: HierarchyMappingScalarWhereInput
    data: XOR<HierarchyMappingUpdateManyMutationInput, HierarchyMappingUncheckedUpdateManyWithoutConnectorInput>
  }

  export type HierarchyMappingScalarWhereInput = {
    AND?: HierarchyMappingScalarWhereInput | HierarchyMappingScalarWhereInput[]
    OR?: HierarchyMappingScalarWhereInput[]
    NOT?: HierarchyMappingScalarWhereInput | HierarchyMappingScalarWhereInput[]
    id?: StringFilter<"HierarchyMapping"> | string
    connectorId?: StringNullableFilter<"HierarchyMapping"> | string | null
    managerId?: StringNullableFilter<"HierarchyMapping"> | string | null
    role?: StringFilter<"HierarchyMapping"> | string
    assignedAt?: DateTimeFilter<"HierarchyMapping"> | Date | string
    assignedBy?: StringNullableFilter<"HierarchyMapping"> | string | null
  }

  export type HierarchyMappingUpsertWithWhereUniqueWithoutManagerInput = {
    where: HierarchyMappingWhereUniqueInput
    update: XOR<HierarchyMappingUpdateWithoutManagerInput, HierarchyMappingUncheckedUpdateWithoutManagerInput>
    create: XOR<HierarchyMappingCreateWithoutManagerInput, HierarchyMappingUncheckedCreateWithoutManagerInput>
  }

  export type HierarchyMappingUpdateWithWhereUniqueWithoutManagerInput = {
    where: HierarchyMappingWhereUniqueInput
    data: XOR<HierarchyMappingUpdateWithoutManagerInput, HierarchyMappingUncheckedUpdateWithoutManagerInput>
  }

  export type HierarchyMappingUpdateManyWithWhereWithoutManagerInput = {
    where: HierarchyMappingScalarWhereInput
    data: XOR<HierarchyMappingUpdateManyMutationInput, HierarchyMappingUncheckedUpdateManyWithoutManagerInput>
  }

  export type ConnectorStatusHistoryUpsertWithWhereUniqueWithoutConnectorInput = {
    where: ConnectorStatusHistoryWhereUniqueInput
    update: XOR<ConnectorStatusHistoryUpdateWithoutConnectorInput, ConnectorStatusHistoryUncheckedUpdateWithoutConnectorInput>
    create: XOR<ConnectorStatusHistoryCreateWithoutConnectorInput, ConnectorStatusHistoryUncheckedCreateWithoutConnectorInput>
  }

  export type ConnectorStatusHistoryUpdateWithWhereUniqueWithoutConnectorInput = {
    where: ConnectorStatusHistoryWhereUniqueInput
    data: XOR<ConnectorStatusHistoryUpdateWithoutConnectorInput, ConnectorStatusHistoryUncheckedUpdateWithoutConnectorInput>
  }

  export type ConnectorStatusHistoryUpdateManyWithWhereWithoutConnectorInput = {
    where: ConnectorStatusHistoryScalarWhereInput
    data: XOR<ConnectorStatusHistoryUpdateManyMutationInput, ConnectorStatusHistoryUncheckedUpdateManyWithoutConnectorInput>
  }

  export type ConnectorStatusHistoryScalarWhereInput = {
    AND?: ConnectorStatusHistoryScalarWhereInput | ConnectorStatusHistoryScalarWhereInput[]
    OR?: ConnectorStatusHistoryScalarWhereInput[]
    NOT?: ConnectorStatusHistoryScalarWhereInput | ConnectorStatusHistoryScalarWhereInput[]
    id?: StringFilter<"ConnectorStatusHistory"> | string
    connectorId?: StringNullableFilter<"ConnectorStatusHistory"> | string | null
    status?: StringFilter<"ConnectorStatusHistory"> | string
    changedAt?: DateTimeFilter<"ConnectorStatusHistory"> | Date | string
    changedBy?: StringNullableFilter<"ConnectorStatusHistory"> | string | null
    remarks?: StringNullableFilter<"ConnectorStatusHistory"> | string | null
  }

  export type ConnectorPerformanceUpsertWithoutConnectorInput = {
    update: XOR<ConnectorPerformanceUpdateWithoutConnectorInput, ConnectorPerformanceUncheckedUpdateWithoutConnectorInput>
    create: XOR<ConnectorPerformanceCreateWithoutConnectorInput, ConnectorPerformanceUncheckedCreateWithoutConnectorInput>
    where?: ConnectorPerformanceWhereInput
  }

  export type ConnectorPerformanceUpdateToOneWithWhereWithoutConnectorInput = {
    where?: ConnectorPerformanceWhereInput
    data: XOR<ConnectorPerformanceUpdateWithoutConnectorInput, ConnectorPerformanceUncheckedUpdateWithoutConnectorInput>
  }

  export type ConnectorPerformanceUpdateWithoutConnectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalLeads?: IntFieldUpdateOperationsInput | number
    convertedLeads?: IntFieldUpdateOperationsInput | number
    totalCommission?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastCalculatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ConnectorPerformanceUncheckedUpdateWithoutConnectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalLeads?: IntFieldUpdateOperationsInput | number
    convertedLeads?: IntFieldUpdateOperationsInput | number
    totalCommission?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastCalculatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PayoutSlabUpsertWithWhereUniqueWithoutConnectorInput = {
    where: PayoutSlabWhereUniqueInput
    update: XOR<PayoutSlabUpdateWithoutConnectorInput, PayoutSlabUncheckedUpdateWithoutConnectorInput>
    create: XOR<PayoutSlabCreateWithoutConnectorInput, PayoutSlabUncheckedCreateWithoutConnectorInput>
  }

  export type PayoutSlabUpdateWithWhereUniqueWithoutConnectorInput = {
    where: PayoutSlabWhereUniqueInput
    data: XOR<PayoutSlabUpdateWithoutConnectorInput, PayoutSlabUncheckedUpdateWithoutConnectorInput>
  }

  export type PayoutSlabUpdateManyWithWhereWithoutConnectorInput = {
    where: PayoutSlabScalarWhereInput
    data: XOR<PayoutSlabUpdateManyMutationInput, PayoutSlabUncheckedUpdateManyWithoutConnectorInput>
  }

  export type PayoutSlabScalarWhereInput = {
    AND?: PayoutSlabScalarWhereInput | PayoutSlabScalarWhereInput[]
    OR?: PayoutSlabScalarWhereInput[]
    NOT?: PayoutSlabScalarWhereInput | PayoutSlabScalarWhereInput[]
    id?: StringFilter<"PayoutSlab"> | string
    connectorId?: StringNullableFilter<"PayoutSlab"> | string | null
    bankName?: StringFilter<"PayoutSlab"> | string
    productCategory?: StringFilter<"PayoutSlab"> | string
    payoutRate?: DecimalFilter<"PayoutSlab"> | Decimal | DecimalJsLike | number | string
    minDisbursementAmount?: DecimalNullableFilter<"PayoutSlab"> | Decimal | DecimalJsLike | number | string | null
    status?: StringFilter<"PayoutSlab"> | string
    createdAt?: DateTimeFilter<"PayoutSlab"> | Date | string
    updatedAt?: DateTimeNullableFilter<"PayoutSlab"> | Date | string | null
  }

  export type CommissionTransactionUpsertWithWhereUniqueWithoutConnectorInput = {
    where: CommissionTransactionWhereUniqueInput
    update: XOR<CommissionTransactionUpdateWithoutConnectorInput, CommissionTransactionUncheckedUpdateWithoutConnectorInput>
    create: XOR<CommissionTransactionCreateWithoutConnectorInput, CommissionTransactionUncheckedCreateWithoutConnectorInput>
  }

  export type CommissionTransactionUpdateWithWhereUniqueWithoutConnectorInput = {
    where: CommissionTransactionWhereUniqueInput
    data: XOR<CommissionTransactionUpdateWithoutConnectorInput, CommissionTransactionUncheckedUpdateWithoutConnectorInput>
  }

  export type CommissionTransactionUpdateManyWithWhereWithoutConnectorInput = {
    where: CommissionTransactionScalarWhereInput
    data: XOR<CommissionTransactionUpdateManyMutationInput, CommissionTransactionUncheckedUpdateManyWithoutConnectorInput>
  }

  export type CommissionTransactionScalarWhereInput = {
    AND?: CommissionTransactionScalarWhereInput | CommissionTransactionScalarWhereInput[]
    OR?: CommissionTransactionScalarWhereInput[]
    NOT?: CommissionTransactionScalarWhereInput | CommissionTransactionScalarWhereInput[]
    id?: StringFilter<"CommissionTransaction"> | string
    loanId?: StringFilter<"CommissionTransaction"> | string
    connectorId?: StringFilter<"CommissionTransaction"> | string
    loanAmount?: DecimalFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string
    connectorRate?: DecimalFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string
    connectorCommission?: DecimalFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string
    teamLeaderOverride?: DecimalNullableFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string | null
    rmOverride?: DecimalNullableFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string | null
    totalPayout?: DecimalFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"CommissionTransaction"> | string
    amountPaid?: DecimalFilter<"CommissionTransaction"> | Decimal | DecimalJsLike | number | string
    paymentDate?: DateTimeNullableFilter<"CommissionTransaction"> | Date | string | null
    createdAt?: DateTimeFilter<"CommissionTransaction"> | Date | string
  }

  export type ConnectorCreateWithoutHierarchiesInput = {
    id: string
    userId: string
    firstName: string
    lastName: string
    phone?: string | null
    email?: string | null
    region?: string | null
    status: string
    platformRole?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    managed?: HierarchyMappingCreateNestedManyWithoutManagerInput
    statusHistory?: ConnectorStatusHistoryCreateNestedManyWithoutConnectorInput
    performance?: ConnectorPerformanceCreateNestedOneWithoutConnectorInput
    payoutSlabs?: PayoutSlabCreateNestedManyWithoutConnectorInput
    commissions?: CommissionTransactionCreateNestedManyWithoutConnectorInput
  }

  export type ConnectorUncheckedCreateWithoutHierarchiesInput = {
    id: string
    userId: string
    firstName: string
    lastName: string
    phone?: string | null
    email?: string | null
    region?: string | null
    status: string
    platformRole?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    managed?: HierarchyMappingUncheckedCreateNestedManyWithoutManagerInput
    statusHistory?: ConnectorStatusHistoryUncheckedCreateNestedManyWithoutConnectorInput
    performance?: ConnectorPerformanceUncheckedCreateNestedOneWithoutConnectorInput
    payoutSlabs?: PayoutSlabUncheckedCreateNestedManyWithoutConnectorInput
    commissions?: CommissionTransactionUncheckedCreateNestedManyWithoutConnectorInput
  }

  export type ConnectorCreateOrConnectWithoutHierarchiesInput = {
    where: ConnectorWhereUniqueInput
    create: XOR<ConnectorCreateWithoutHierarchiesInput, ConnectorUncheckedCreateWithoutHierarchiesInput>
  }

  export type ConnectorCreateWithoutManagedInput = {
    id: string
    userId: string
    firstName: string
    lastName: string
    phone?: string | null
    email?: string | null
    region?: string | null
    status: string
    platformRole?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    hierarchies?: HierarchyMappingCreateNestedManyWithoutConnectorInput
    statusHistory?: ConnectorStatusHistoryCreateNestedManyWithoutConnectorInput
    performance?: ConnectorPerformanceCreateNestedOneWithoutConnectorInput
    payoutSlabs?: PayoutSlabCreateNestedManyWithoutConnectorInput
    commissions?: CommissionTransactionCreateNestedManyWithoutConnectorInput
  }

  export type ConnectorUncheckedCreateWithoutManagedInput = {
    id: string
    userId: string
    firstName: string
    lastName: string
    phone?: string | null
    email?: string | null
    region?: string | null
    status: string
    platformRole?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    hierarchies?: HierarchyMappingUncheckedCreateNestedManyWithoutConnectorInput
    statusHistory?: ConnectorStatusHistoryUncheckedCreateNestedManyWithoutConnectorInput
    performance?: ConnectorPerformanceUncheckedCreateNestedOneWithoutConnectorInput
    payoutSlabs?: PayoutSlabUncheckedCreateNestedManyWithoutConnectorInput
    commissions?: CommissionTransactionUncheckedCreateNestedManyWithoutConnectorInput
  }

  export type ConnectorCreateOrConnectWithoutManagedInput = {
    where: ConnectorWhereUniqueInput
    create: XOR<ConnectorCreateWithoutManagedInput, ConnectorUncheckedCreateWithoutManagedInput>
  }

  export type ConnectorUpsertWithoutHierarchiesInput = {
    update: XOR<ConnectorUpdateWithoutHierarchiesInput, ConnectorUncheckedUpdateWithoutHierarchiesInput>
    create: XOR<ConnectorCreateWithoutHierarchiesInput, ConnectorUncheckedCreateWithoutHierarchiesInput>
    where?: ConnectorWhereInput
  }

  export type ConnectorUpdateToOneWithWhereWithoutHierarchiesInput = {
    where?: ConnectorWhereInput
    data: XOR<ConnectorUpdateWithoutHierarchiesInput, ConnectorUncheckedUpdateWithoutHierarchiesInput>
  }

  export type ConnectorUpdateWithoutHierarchiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    platformRole?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    managed?: HierarchyMappingUpdateManyWithoutManagerNestedInput
    statusHistory?: ConnectorStatusHistoryUpdateManyWithoutConnectorNestedInput
    performance?: ConnectorPerformanceUpdateOneWithoutConnectorNestedInput
    payoutSlabs?: PayoutSlabUpdateManyWithoutConnectorNestedInput
    commissions?: CommissionTransactionUpdateManyWithoutConnectorNestedInput
  }

  export type ConnectorUncheckedUpdateWithoutHierarchiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    platformRole?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    managed?: HierarchyMappingUncheckedUpdateManyWithoutManagerNestedInput
    statusHistory?: ConnectorStatusHistoryUncheckedUpdateManyWithoutConnectorNestedInput
    performance?: ConnectorPerformanceUncheckedUpdateOneWithoutConnectorNestedInput
    payoutSlabs?: PayoutSlabUncheckedUpdateManyWithoutConnectorNestedInput
    commissions?: CommissionTransactionUncheckedUpdateManyWithoutConnectorNestedInput
  }

  export type ConnectorUpsertWithoutManagedInput = {
    update: XOR<ConnectorUpdateWithoutManagedInput, ConnectorUncheckedUpdateWithoutManagedInput>
    create: XOR<ConnectorCreateWithoutManagedInput, ConnectorUncheckedCreateWithoutManagedInput>
    where?: ConnectorWhereInput
  }

  export type ConnectorUpdateToOneWithWhereWithoutManagedInput = {
    where?: ConnectorWhereInput
    data: XOR<ConnectorUpdateWithoutManagedInput, ConnectorUncheckedUpdateWithoutManagedInput>
  }

  export type ConnectorUpdateWithoutManagedInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    platformRole?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    hierarchies?: HierarchyMappingUpdateManyWithoutConnectorNestedInput
    statusHistory?: ConnectorStatusHistoryUpdateManyWithoutConnectorNestedInput
    performance?: ConnectorPerformanceUpdateOneWithoutConnectorNestedInput
    payoutSlabs?: PayoutSlabUpdateManyWithoutConnectorNestedInput
    commissions?: CommissionTransactionUpdateManyWithoutConnectorNestedInput
  }

  export type ConnectorUncheckedUpdateWithoutManagedInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    platformRole?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    hierarchies?: HierarchyMappingUncheckedUpdateManyWithoutConnectorNestedInput
    statusHistory?: ConnectorStatusHistoryUncheckedUpdateManyWithoutConnectorNestedInput
    performance?: ConnectorPerformanceUncheckedUpdateOneWithoutConnectorNestedInput
    payoutSlabs?: PayoutSlabUncheckedUpdateManyWithoutConnectorNestedInput
    commissions?: CommissionTransactionUncheckedUpdateManyWithoutConnectorNestedInput
  }

  export type ConnectorCreateWithoutStatusHistoryInput = {
    id: string
    userId: string
    firstName: string
    lastName: string
    phone?: string | null
    email?: string | null
    region?: string | null
    status: string
    platformRole?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    hierarchies?: HierarchyMappingCreateNestedManyWithoutConnectorInput
    managed?: HierarchyMappingCreateNestedManyWithoutManagerInput
    performance?: ConnectorPerformanceCreateNestedOneWithoutConnectorInput
    payoutSlabs?: PayoutSlabCreateNestedManyWithoutConnectorInput
    commissions?: CommissionTransactionCreateNestedManyWithoutConnectorInput
  }

  export type ConnectorUncheckedCreateWithoutStatusHistoryInput = {
    id: string
    userId: string
    firstName: string
    lastName: string
    phone?: string | null
    email?: string | null
    region?: string | null
    status: string
    platformRole?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    hierarchies?: HierarchyMappingUncheckedCreateNestedManyWithoutConnectorInput
    managed?: HierarchyMappingUncheckedCreateNestedManyWithoutManagerInput
    performance?: ConnectorPerformanceUncheckedCreateNestedOneWithoutConnectorInput
    payoutSlabs?: PayoutSlabUncheckedCreateNestedManyWithoutConnectorInput
    commissions?: CommissionTransactionUncheckedCreateNestedManyWithoutConnectorInput
  }

  export type ConnectorCreateOrConnectWithoutStatusHistoryInput = {
    where: ConnectorWhereUniqueInput
    create: XOR<ConnectorCreateWithoutStatusHistoryInput, ConnectorUncheckedCreateWithoutStatusHistoryInput>
  }

  export type ConnectorUpsertWithoutStatusHistoryInput = {
    update: XOR<ConnectorUpdateWithoutStatusHistoryInput, ConnectorUncheckedUpdateWithoutStatusHistoryInput>
    create: XOR<ConnectorCreateWithoutStatusHistoryInput, ConnectorUncheckedCreateWithoutStatusHistoryInput>
    where?: ConnectorWhereInput
  }

  export type ConnectorUpdateToOneWithWhereWithoutStatusHistoryInput = {
    where?: ConnectorWhereInput
    data: XOR<ConnectorUpdateWithoutStatusHistoryInput, ConnectorUncheckedUpdateWithoutStatusHistoryInput>
  }

  export type ConnectorUpdateWithoutStatusHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    platformRole?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    hierarchies?: HierarchyMappingUpdateManyWithoutConnectorNestedInput
    managed?: HierarchyMappingUpdateManyWithoutManagerNestedInput
    performance?: ConnectorPerformanceUpdateOneWithoutConnectorNestedInput
    payoutSlabs?: PayoutSlabUpdateManyWithoutConnectorNestedInput
    commissions?: CommissionTransactionUpdateManyWithoutConnectorNestedInput
  }

  export type ConnectorUncheckedUpdateWithoutStatusHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    platformRole?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    hierarchies?: HierarchyMappingUncheckedUpdateManyWithoutConnectorNestedInput
    managed?: HierarchyMappingUncheckedUpdateManyWithoutManagerNestedInput
    performance?: ConnectorPerformanceUncheckedUpdateOneWithoutConnectorNestedInput
    payoutSlabs?: PayoutSlabUncheckedUpdateManyWithoutConnectorNestedInput
    commissions?: CommissionTransactionUncheckedUpdateManyWithoutConnectorNestedInput
  }

  export type ConnectorCreateWithoutPerformanceInput = {
    id: string
    userId: string
    firstName: string
    lastName: string
    phone?: string | null
    email?: string | null
    region?: string | null
    status: string
    platformRole?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    hierarchies?: HierarchyMappingCreateNestedManyWithoutConnectorInput
    managed?: HierarchyMappingCreateNestedManyWithoutManagerInput
    statusHistory?: ConnectorStatusHistoryCreateNestedManyWithoutConnectorInput
    payoutSlabs?: PayoutSlabCreateNestedManyWithoutConnectorInput
    commissions?: CommissionTransactionCreateNestedManyWithoutConnectorInput
  }

  export type ConnectorUncheckedCreateWithoutPerformanceInput = {
    id: string
    userId: string
    firstName: string
    lastName: string
    phone?: string | null
    email?: string | null
    region?: string | null
    status: string
    platformRole?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    hierarchies?: HierarchyMappingUncheckedCreateNestedManyWithoutConnectorInput
    managed?: HierarchyMappingUncheckedCreateNestedManyWithoutManagerInput
    statusHistory?: ConnectorStatusHistoryUncheckedCreateNestedManyWithoutConnectorInput
    payoutSlabs?: PayoutSlabUncheckedCreateNestedManyWithoutConnectorInput
    commissions?: CommissionTransactionUncheckedCreateNestedManyWithoutConnectorInput
  }

  export type ConnectorCreateOrConnectWithoutPerformanceInput = {
    where: ConnectorWhereUniqueInput
    create: XOR<ConnectorCreateWithoutPerformanceInput, ConnectorUncheckedCreateWithoutPerformanceInput>
  }

  export type ConnectorUpsertWithoutPerformanceInput = {
    update: XOR<ConnectorUpdateWithoutPerformanceInput, ConnectorUncheckedUpdateWithoutPerformanceInput>
    create: XOR<ConnectorCreateWithoutPerformanceInput, ConnectorUncheckedCreateWithoutPerformanceInput>
    where?: ConnectorWhereInput
  }

  export type ConnectorUpdateToOneWithWhereWithoutPerformanceInput = {
    where?: ConnectorWhereInput
    data: XOR<ConnectorUpdateWithoutPerformanceInput, ConnectorUncheckedUpdateWithoutPerformanceInput>
  }

  export type ConnectorUpdateWithoutPerformanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    platformRole?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    hierarchies?: HierarchyMappingUpdateManyWithoutConnectorNestedInput
    managed?: HierarchyMappingUpdateManyWithoutManagerNestedInput
    statusHistory?: ConnectorStatusHistoryUpdateManyWithoutConnectorNestedInput
    payoutSlabs?: PayoutSlabUpdateManyWithoutConnectorNestedInput
    commissions?: CommissionTransactionUpdateManyWithoutConnectorNestedInput
  }

  export type ConnectorUncheckedUpdateWithoutPerformanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    platformRole?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    hierarchies?: HierarchyMappingUncheckedUpdateManyWithoutConnectorNestedInput
    managed?: HierarchyMappingUncheckedUpdateManyWithoutManagerNestedInput
    statusHistory?: ConnectorStatusHistoryUncheckedUpdateManyWithoutConnectorNestedInput
    payoutSlabs?: PayoutSlabUncheckedUpdateManyWithoutConnectorNestedInput
    commissions?: CommissionTransactionUncheckedUpdateManyWithoutConnectorNestedInput
  }

  export type ConnectorCreateWithoutCommissionsInput = {
    id: string
    userId: string
    firstName: string
    lastName: string
    phone?: string | null
    email?: string | null
    region?: string | null
    status: string
    platformRole?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    hierarchies?: HierarchyMappingCreateNestedManyWithoutConnectorInput
    managed?: HierarchyMappingCreateNestedManyWithoutManagerInput
    statusHistory?: ConnectorStatusHistoryCreateNestedManyWithoutConnectorInput
    performance?: ConnectorPerformanceCreateNestedOneWithoutConnectorInput
    payoutSlabs?: PayoutSlabCreateNestedManyWithoutConnectorInput
  }

  export type ConnectorUncheckedCreateWithoutCommissionsInput = {
    id: string
    userId: string
    firstName: string
    lastName: string
    phone?: string | null
    email?: string | null
    region?: string | null
    status: string
    platformRole?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    hierarchies?: HierarchyMappingUncheckedCreateNestedManyWithoutConnectorInput
    managed?: HierarchyMappingUncheckedCreateNestedManyWithoutManagerInput
    statusHistory?: ConnectorStatusHistoryUncheckedCreateNestedManyWithoutConnectorInput
    performance?: ConnectorPerformanceUncheckedCreateNestedOneWithoutConnectorInput
    payoutSlabs?: PayoutSlabUncheckedCreateNestedManyWithoutConnectorInput
  }

  export type ConnectorCreateOrConnectWithoutCommissionsInput = {
    where: ConnectorWhereUniqueInput
    create: XOR<ConnectorCreateWithoutCommissionsInput, ConnectorUncheckedCreateWithoutCommissionsInput>
  }

  export type PayoutHistoryCreateWithoutTransactionInput = {
    id: string
    paidAmount: Decimal | DecimalJsLike | number | string
    paidAt: Date | string
    paidBy?: string | null
  }

  export type PayoutHistoryUncheckedCreateWithoutTransactionInput = {
    id: string
    paidAmount: Decimal | DecimalJsLike | number | string
    paidAt: Date | string
    paidBy?: string | null
  }

  export type PayoutHistoryCreateOrConnectWithoutTransactionInput = {
    where: PayoutHistoryWhereUniqueInput
    create: XOR<PayoutHistoryCreateWithoutTransactionInput, PayoutHistoryUncheckedCreateWithoutTransactionInput>
  }

  export type PayoutHistoryCreateManyTransactionInputEnvelope = {
    data: PayoutHistoryCreateManyTransactionInput | PayoutHistoryCreateManyTransactionInput[]
    skipDuplicates?: boolean
  }

  export type ConnectorUpsertWithoutCommissionsInput = {
    update: XOR<ConnectorUpdateWithoutCommissionsInput, ConnectorUncheckedUpdateWithoutCommissionsInput>
    create: XOR<ConnectorCreateWithoutCommissionsInput, ConnectorUncheckedCreateWithoutCommissionsInput>
    where?: ConnectorWhereInput
  }

  export type ConnectorUpdateToOneWithWhereWithoutCommissionsInput = {
    where?: ConnectorWhereInput
    data: XOR<ConnectorUpdateWithoutCommissionsInput, ConnectorUncheckedUpdateWithoutCommissionsInput>
  }

  export type ConnectorUpdateWithoutCommissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    platformRole?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    hierarchies?: HierarchyMappingUpdateManyWithoutConnectorNestedInput
    managed?: HierarchyMappingUpdateManyWithoutManagerNestedInput
    statusHistory?: ConnectorStatusHistoryUpdateManyWithoutConnectorNestedInput
    performance?: ConnectorPerformanceUpdateOneWithoutConnectorNestedInput
    payoutSlabs?: PayoutSlabUpdateManyWithoutConnectorNestedInput
  }

  export type ConnectorUncheckedUpdateWithoutCommissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    platformRole?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    hierarchies?: HierarchyMappingUncheckedUpdateManyWithoutConnectorNestedInput
    managed?: HierarchyMappingUncheckedUpdateManyWithoutManagerNestedInput
    statusHistory?: ConnectorStatusHistoryUncheckedUpdateManyWithoutConnectorNestedInput
    performance?: ConnectorPerformanceUncheckedUpdateOneWithoutConnectorNestedInput
    payoutSlabs?: PayoutSlabUncheckedUpdateManyWithoutConnectorNestedInput
  }

  export type PayoutHistoryUpsertWithWhereUniqueWithoutTransactionInput = {
    where: PayoutHistoryWhereUniqueInput
    update: XOR<PayoutHistoryUpdateWithoutTransactionInput, PayoutHistoryUncheckedUpdateWithoutTransactionInput>
    create: XOR<PayoutHistoryCreateWithoutTransactionInput, PayoutHistoryUncheckedCreateWithoutTransactionInput>
  }

  export type PayoutHistoryUpdateWithWhereUniqueWithoutTransactionInput = {
    where: PayoutHistoryWhereUniqueInput
    data: XOR<PayoutHistoryUpdateWithoutTransactionInput, PayoutHistoryUncheckedUpdateWithoutTransactionInput>
  }

  export type PayoutHistoryUpdateManyWithWhereWithoutTransactionInput = {
    where: PayoutHistoryScalarWhereInput
    data: XOR<PayoutHistoryUpdateManyMutationInput, PayoutHistoryUncheckedUpdateManyWithoutTransactionInput>
  }

  export type PayoutHistoryScalarWhereInput = {
    AND?: PayoutHistoryScalarWhereInput | PayoutHistoryScalarWhereInput[]
    OR?: PayoutHistoryScalarWhereInput[]
    NOT?: PayoutHistoryScalarWhereInput | PayoutHistoryScalarWhereInput[]
    id?: StringFilter<"PayoutHistory"> | string
    transactionId?: StringNullableFilter<"PayoutHistory"> | string | null
    paidAmount?: DecimalFilter<"PayoutHistory"> | Decimal | DecimalJsLike | number | string
    paidAt?: DateTimeFilter<"PayoutHistory"> | Date | string
    paidBy?: StringNullableFilter<"PayoutHistory"> | string | null
  }

  export type CommissionTransactionCreateWithoutPayoutHistoryInput = {
    id: string
    loanId: string
    loanAmount: Decimal | DecimalJsLike | number | string
    connectorRate: Decimal | DecimalJsLike | number | string
    connectorCommission: Decimal | DecimalJsLike | number | string
    teamLeaderOverride?: Decimal | DecimalJsLike | number | string | null
    rmOverride?: Decimal | DecimalJsLike | number | string | null
    totalPayout: Decimal | DecimalJsLike | number | string
    status: string
    amountPaid?: Decimal | DecimalJsLike | number | string
    paymentDate?: Date | string | null
    createdAt: Date | string
    connector: ConnectorCreateNestedOneWithoutCommissionsInput
  }

  export type CommissionTransactionUncheckedCreateWithoutPayoutHistoryInput = {
    id: string
    loanId: string
    connectorId: string
    loanAmount: Decimal | DecimalJsLike | number | string
    connectorRate: Decimal | DecimalJsLike | number | string
    connectorCommission: Decimal | DecimalJsLike | number | string
    teamLeaderOverride?: Decimal | DecimalJsLike | number | string | null
    rmOverride?: Decimal | DecimalJsLike | number | string | null
    totalPayout: Decimal | DecimalJsLike | number | string
    status: string
    amountPaid?: Decimal | DecimalJsLike | number | string
    paymentDate?: Date | string | null
    createdAt: Date | string
  }

  export type CommissionTransactionCreateOrConnectWithoutPayoutHistoryInput = {
    where: CommissionTransactionWhereUniqueInput
    create: XOR<CommissionTransactionCreateWithoutPayoutHistoryInput, CommissionTransactionUncheckedCreateWithoutPayoutHistoryInput>
  }

  export type CommissionTransactionUpsertWithoutPayoutHistoryInput = {
    update: XOR<CommissionTransactionUpdateWithoutPayoutHistoryInput, CommissionTransactionUncheckedUpdateWithoutPayoutHistoryInput>
    create: XOR<CommissionTransactionCreateWithoutPayoutHistoryInput, CommissionTransactionUncheckedCreateWithoutPayoutHistoryInput>
    where?: CommissionTransactionWhereInput
  }

  export type CommissionTransactionUpdateToOneWithWhereWithoutPayoutHistoryInput = {
    where?: CommissionTransactionWhereInput
    data: XOR<CommissionTransactionUpdateWithoutPayoutHistoryInput, CommissionTransactionUncheckedUpdateWithoutPayoutHistoryInput>
  }

  export type CommissionTransactionUpdateWithoutPayoutHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    loanAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    connectorRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    connectorCommission?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    teamLeaderOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    rmOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalPayout?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connector?: ConnectorUpdateOneRequiredWithoutCommissionsNestedInput
  }

  export type CommissionTransactionUncheckedUpdateWithoutPayoutHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    connectorId?: StringFieldUpdateOperationsInput | string
    loanAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    connectorRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    connectorCommission?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    teamLeaderOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    rmOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalPayout?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConnectorCreateWithoutPayoutSlabsInput = {
    id: string
    userId: string
    firstName: string
    lastName: string
    phone?: string | null
    email?: string | null
    region?: string | null
    status: string
    platformRole?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    hierarchies?: HierarchyMappingCreateNestedManyWithoutConnectorInput
    managed?: HierarchyMappingCreateNestedManyWithoutManagerInput
    statusHistory?: ConnectorStatusHistoryCreateNestedManyWithoutConnectorInput
    performance?: ConnectorPerformanceCreateNestedOneWithoutConnectorInput
    commissions?: CommissionTransactionCreateNestedManyWithoutConnectorInput
  }

  export type ConnectorUncheckedCreateWithoutPayoutSlabsInput = {
    id: string
    userId: string
    firstName: string
    lastName: string
    phone?: string | null
    email?: string | null
    region?: string | null
    status: string
    platformRole?: string | null
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    hierarchies?: HierarchyMappingUncheckedCreateNestedManyWithoutConnectorInput
    managed?: HierarchyMappingUncheckedCreateNestedManyWithoutManagerInput
    statusHistory?: ConnectorStatusHistoryUncheckedCreateNestedManyWithoutConnectorInput
    performance?: ConnectorPerformanceUncheckedCreateNestedOneWithoutConnectorInput
    commissions?: CommissionTransactionUncheckedCreateNestedManyWithoutConnectorInput
  }

  export type ConnectorCreateOrConnectWithoutPayoutSlabsInput = {
    where: ConnectorWhereUniqueInput
    create: XOR<ConnectorCreateWithoutPayoutSlabsInput, ConnectorUncheckedCreateWithoutPayoutSlabsInput>
  }

  export type ConnectorUpsertWithoutPayoutSlabsInput = {
    update: XOR<ConnectorUpdateWithoutPayoutSlabsInput, ConnectorUncheckedUpdateWithoutPayoutSlabsInput>
    create: XOR<ConnectorCreateWithoutPayoutSlabsInput, ConnectorUncheckedCreateWithoutPayoutSlabsInput>
    where?: ConnectorWhereInput
  }

  export type ConnectorUpdateToOneWithWhereWithoutPayoutSlabsInput = {
    where?: ConnectorWhereInput
    data: XOR<ConnectorUpdateWithoutPayoutSlabsInput, ConnectorUncheckedUpdateWithoutPayoutSlabsInput>
  }

  export type ConnectorUpdateWithoutPayoutSlabsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    platformRole?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    hierarchies?: HierarchyMappingUpdateManyWithoutConnectorNestedInput
    managed?: HierarchyMappingUpdateManyWithoutManagerNestedInput
    statusHistory?: ConnectorStatusHistoryUpdateManyWithoutConnectorNestedInput
    performance?: ConnectorPerformanceUpdateOneWithoutConnectorNestedInput
    commissions?: CommissionTransactionUpdateManyWithoutConnectorNestedInput
  }

  export type ConnectorUncheckedUpdateWithoutPayoutSlabsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    platformRole?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    hierarchies?: HierarchyMappingUncheckedUpdateManyWithoutConnectorNestedInput
    managed?: HierarchyMappingUncheckedUpdateManyWithoutManagerNestedInput
    statusHistory?: ConnectorStatusHistoryUncheckedUpdateManyWithoutConnectorNestedInput
    performance?: ConnectorPerformanceUncheckedUpdateOneWithoutConnectorNestedInput
    commissions?: CommissionTransactionUncheckedUpdateManyWithoutConnectorNestedInput
  }

  export type RoutingHistoryCreateWithoutManagerInput = {
    id: string
    loanId: string
    routingScore?: Decimal | DecimalJsLike | number | string | null
    assignedAt: Date | string
  }

  export type RoutingHistoryUncheckedCreateWithoutManagerInput = {
    id: string
    loanId: string
    routingScore?: Decimal | DecimalJsLike | number | string | null
    assignedAt: Date | string
  }

  export type RoutingHistoryCreateOrConnectWithoutManagerInput = {
    where: RoutingHistoryWhereUniqueInput
    create: XOR<RoutingHistoryCreateWithoutManagerInput, RoutingHistoryUncheckedCreateWithoutManagerInput>
  }

  export type RoutingHistoryCreateManyManagerInputEnvelope = {
    data: RoutingHistoryCreateManyManagerInput | RoutingHistoryCreateManyManagerInput[]
    skipDuplicates?: boolean
  }

  export type RoutingHistoryUpsertWithWhereUniqueWithoutManagerInput = {
    where: RoutingHistoryWhereUniqueInput
    update: XOR<RoutingHistoryUpdateWithoutManagerInput, RoutingHistoryUncheckedUpdateWithoutManagerInput>
    create: XOR<RoutingHistoryCreateWithoutManagerInput, RoutingHistoryUncheckedCreateWithoutManagerInput>
  }

  export type RoutingHistoryUpdateWithWhereUniqueWithoutManagerInput = {
    where: RoutingHistoryWhereUniqueInput
    data: XOR<RoutingHistoryUpdateWithoutManagerInput, RoutingHistoryUncheckedUpdateWithoutManagerInput>
  }

  export type RoutingHistoryUpdateManyWithWhereWithoutManagerInput = {
    where: RoutingHistoryScalarWhereInput
    data: XOR<RoutingHistoryUpdateManyMutationInput, RoutingHistoryUncheckedUpdateManyWithoutManagerInput>
  }

  export type RoutingHistoryScalarWhereInput = {
    AND?: RoutingHistoryScalarWhereInput | RoutingHistoryScalarWhereInput[]
    OR?: RoutingHistoryScalarWhereInput[]
    NOT?: RoutingHistoryScalarWhereInput | RoutingHistoryScalarWhereInput[]
    id?: StringFilter<"RoutingHistory"> | string
    loanId?: StringFilter<"RoutingHistory"> | string
    assignedSmId?: StringNullableFilter<"RoutingHistory"> | string | null
    routingScore?: DecimalNullableFilter<"RoutingHistory"> | Decimal | DecimalJsLike | number | string | null
    assignedAt?: DateTimeFilter<"RoutingHistory"> | Date | string
  }

  export type SalesManagerCreateWithoutRoutingHistoryInput = {
    id: string
    userId: string
    branchId?: string | null
    approvalRate?: Decimal | DecimalJsLike | number | string
    tatScore?: Decimal | DecimalJsLike | number | string
    currentCapacity?: number
    maxCapacity?: number
    experienceScore?: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    createdAt: Date | string
    updatedAt?: Date | string | null
  }

  export type SalesManagerUncheckedCreateWithoutRoutingHistoryInput = {
    id: string
    userId: string
    branchId?: string | null
    approvalRate?: Decimal | DecimalJsLike | number | string
    tatScore?: Decimal | DecimalJsLike | number | string
    currentCapacity?: number
    maxCapacity?: number
    experienceScore?: Decimal | DecimalJsLike | number | string
    isActive?: boolean
    createdAt: Date | string
    updatedAt?: Date | string | null
  }

  export type SalesManagerCreateOrConnectWithoutRoutingHistoryInput = {
    where: SalesManagerWhereUniqueInput
    create: XOR<SalesManagerCreateWithoutRoutingHistoryInput, SalesManagerUncheckedCreateWithoutRoutingHistoryInput>
  }

  export type SalesManagerUpsertWithoutRoutingHistoryInput = {
    update: XOR<SalesManagerUpdateWithoutRoutingHistoryInput, SalesManagerUncheckedUpdateWithoutRoutingHistoryInput>
    create: XOR<SalesManagerCreateWithoutRoutingHistoryInput, SalesManagerUncheckedCreateWithoutRoutingHistoryInput>
    where?: SalesManagerWhereInput
  }

  export type SalesManagerUpdateToOneWithWhereWithoutRoutingHistoryInput = {
    where?: SalesManagerWhereInput
    data: XOR<SalesManagerUpdateWithoutRoutingHistoryInput, SalesManagerUncheckedUpdateWithoutRoutingHistoryInput>
  }

  export type SalesManagerUpdateWithoutRoutingHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    branchId?: NullableStringFieldUpdateOperationsInput | string | null
    approvalRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tatScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currentCapacity?: IntFieldUpdateOperationsInput | number
    maxCapacity?: IntFieldUpdateOperationsInput | number
    experienceScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SalesManagerUncheckedUpdateWithoutRoutingHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    branchId?: NullableStringFieldUpdateOperationsInput | string | null
    approvalRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tatScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currentCapacity?: IntFieldUpdateOperationsInput | number
    maxCapacity?: IntFieldUpdateOperationsInput | number
    experienceScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type HierarchyMappingCreateManyConnectorInput = {
    id: string
    managerId?: string | null
    role: string
    assignedAt: Date | string
    assignedBy?: string | null
  }

  export type HierarchyMappingCreateManyManagerInput = {
    id: string
    connectorId?: string | null
    role: string
    assignedAt: Date | string
    assignedBy?: string | null
  }

  export type ConnectorStatusHistoryCreateManyConnectorInput = {
    id: string
    status: string
    changedAt: Date | string
    changedBy?: string | null
    remarks?: string | null
  }

  export type PayoutSlabCreateManyConnectorInput = {
    id: string
    bankName: string
    productCategory: string
    payoutRate: Decimal | DecimalJsLike | number | string
    minDisbursementAmount?: Decimal | DecimalJsLike | number | string | null
    status: string
    createdAt: Date | string
    updatedAt?: Date | string | null
  }

  export type CommissionTransactionCreateManyConnectorInput = {
    id: string
    loanId: string
    loanAmount: Decimal | DecimalJsLike | number | string
    connectorRate: Decimal | DecimalJsLike | number | string
    connectorCommission: Decimal | DecimalJsLike | number | string
    teamLeaderOverride?: Decimal | DecimalJsLike | number | string | null
    rmOverride?: Decimal | DecimalJsLike | number | string | null
    totalPayout: Decimal | DecimalJsLike | number | string
    status: string
    amountPaid?: Decimal | DecimalJsLike | number | string
    paymentDate?: Date | string | null
    createdAt: Date | string
  }

  export type HierarchyMappingUpdateWithoutConnectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedBy?: NullableStringFieldUpdateOperationsInput | string | null
    manager?: ConnectorUpdateOneWithoutManagedNestedInput
  }

  export type HierarchyMappingUncheckedUpdateWithoutConnectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type HierarchyMappingUncheckedUpdateManyWithoutConnectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type HierarchyMappingUpdateWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedBy?: NullableStringFieldUpdateOperationsInput | string | null
    connector?: ConnectorUpdateOneWithoutHierarchiesNestedInput
  }

  export type HierarchyMappingUncheckedUpdateWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectorId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type HierarchyMappingUncheckedUpdateManyWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectorId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConnectorStatusHistoryUpdateWithoutConnectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConnectorStatusHistoryUncheckedUpdateWithoutConnectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConnectorStatusHistoryUncheckedUpdateManyWithoutConnectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PayoutSlabUpdateWithoutConnectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    bankName?: StringFieldUpdateOperationsInput | string
    productCategory?: StringFieldUpdateOperationsInput | string
    payoutRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    minDisbursementAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PayoutSlabUncheckedUpdateWithoutConnectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    bankName?: StringFieldUpdateOperationsInput | string
    productCategory?: StringFieldUpdateOperationsInput | string
    payoutRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    minDisbursementAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PayoutSlabUncheckedUpdateManyWithoutConnectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    bankName?: StringFieldUpdateOperationsInput | string
    productCategory?: StringFieldUpdateOperationsInput | string
    payoutRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    minDisbursementAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CommissionTransactionUpdateWithoutConnectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    loanAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    connectorRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    connectorCommission?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    teamLeaderOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    rmOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalPayout?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payoutHistory?: PayoutHistoryUpdateManyWithoutTransactionNestedInput
  }

  export type CommissionTransactionUncheckedUpdateWithoutConnectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    loanAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    connectorRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    connectorCommission?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    teamLeaderOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    rmOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalPayout?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payoutHistory?: PayoutHistoryUncheckedUpdateManyWithoutTransactionNestedInput
  }

  export type CommissionTransactionUncheckedUpdateManyWithoutConnectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    loanAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    connectorRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    connectorCommission?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    teamLeaderOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    rmOverride?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalPayout?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutHistoryCreateManyTransactionInput = {
    id: string
    paidAmount: Decimal | DecimalJsLike | number | string
    paidAt: Date | string
    paidBy?: string | null
  }

  export type PayoutHistoryUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    paidAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PayoutHistoryUncheckedUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    paidAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PayoutHistoryUncheckedUpdateManyWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    paidAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RoutingHistoryCreateManyManagerInput = {
    id: string
    loanId: string
    routingScore?: Decimal | DecimalJsLike | number | string | null
    assignedAt: Date | string
  }

  export type RoutingHistoryUpdateWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    routingScore?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoutingHistoryUncheckedUpdateWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    routingScore?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoutingHistoryUncheckedUpdateManyWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    routingScore?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ConnectorCountOutputTypeDefaultArgs instead
     */
    export type ConnectorCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ConnectorCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CommissionTransactionCountOutputTypeDefaultArgs instead
     */
    export type CommissionTransactionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CommissionTransactionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SalesManagerCountOutputTypeDefaultArgs instead
     */
    export type SalesManagerCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SalesManagerCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ConnectorDefaultArgs instead
     */
    export type ConnectorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ConnectorDefaultArgs<ExtArgs>
    /**
     * @deprecated Use HierarchyMappingDefaultArgs instead
     */
    export type HierarchyMappingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = HierarchyMappingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ConnectorStatusHistoryDefaultArgs instead
     */
    export type ConnectorStatusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ConnectorStatusHistoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ConnectorPerformanceDefaultArgs instead
     */
    export type ConnectorPerformanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ConnectorPerformanceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CommissionRuleDefaultArgs instead
     */
    export type CommissionRuleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CommissionRuleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CommissionTransactionDefaultArgs instead
     */
    export type CommissionTransactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CommissionTransactionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PayoutHistoryDefaultArgs instead
     */
    export type PayoutHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PayoutHistoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PayoutSlabDefaultArgs instead
     */
    export type PayoutSlabArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PayoutSlabDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SalesManagerDefaultArgs instead
     */
    export type SalesManagerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SalesManagerDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RoutingHistoryDefaultArgs instead
     */
    export type RoutingHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoutingHistoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CareerApplicationDefaultArgs instead
     */
    export type CareerApplicationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CareerApplicationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FoirAssessmentDefaultArgs instead
     */
    export type FoirAssessmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FoirAssessmentDefaultArgs<ExtArgs>

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