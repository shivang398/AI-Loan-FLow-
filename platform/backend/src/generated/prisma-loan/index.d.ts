
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
 * Model LoanApplication
 * 
 */
export type LoanApplication = $Result.DefaultSelection<Prisma.$LoanApplicationPayload>
/**
 * Model ApplicationStatusHistory
 * 
 */
export type ApplicationStatusHistory = $Result.DefaultSelection<Prisma.$ApplicationStatusHistoryPayload>
/**
 * Model EligibilityRule
 * 
 */
export type EligibilityRule = $Result.DefaultSelection<Prisma.$EligibilityRulePayload>
/**
 * Model EligibilitySubmission
 * 
 */
export type EligibilitySubmission = $Result.DefaultSelection<Prisma.$EligibilitySubmissionPayload>
/**
 * Model BankPolicy
 * 
 */
export type BankPolicy = $Result.DefaultSelection<Prisma.$BankPolicyPayload>
/**
 * Model PolicyRule
 * 
 */
export type PolicyRule = $Result.DefaultSelection<Prisma.$PolicyRulePayload>
/**
 * Model PolicyDocument
 * 
 */
export type PolicyDocument = $Result.DefaultSelection<Prisma.$PolicyDocumentPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model CibilCheck
 * 
 */
export type CibilCheck = $Result.DefaultSelection<Prisma.$CibilCheckPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more LoanApplications
 * const loanApplications = await prisma.loanApplication.findMany()
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
   * // Fetch zero or more LoanApplications
   * const loanApplications = await prisma.loanApplication.findMany()
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
   * `prisma.loanApplication`: Exposes CRUD operations for the **LoanApplication** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LoanApplications
    * const loanApplications = await prisma.loanApplication.findMany()
    * ```
    */
  get loanApplication(): Prisma.LoanApplicationDelegate<ExtArgs>;

  /**
   * `prisma.applicationStatusHistory`: Exposes CRUD operations for the **ApplicationStatusHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApplicationStatusHistories
    * const applicationStatusHistories = await prisma.applicationStatusHistory.findMany()
    * ```
    */
  get applicationStatusHistory(): Prisma.ApplicationStatusHistoryDelegate<ExtArgs>;

  /**
   * `prisma.eligibilityRule`: Exposes CRUD operations for the **EligibilityRule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EligibilityRules
    * const eligibilityRules = await prisma.eligibilityRule.findMany()
    * ```
    */
  get eligibilityRule(): Prisma.EligibilityRuleDelegate<ExtArgs>;

  /**
   * `prisma.eligibilitySubmission`: Exposes CRUD operations for the **EligibilitySubmission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EligibilitySubmissions
    * const eligibilitySubmissions = await prisma.eligibilitySubmission.findMany()
    * ```
    */
  get eligibilitySubmission(): Prisma.EligibilitySubmissionDelegate<ExtArgs>;

  /**
   * `prisma.bankPolicy`: Exposes CRUD operations for the **BankPolicy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BankPolicies
    * const bankPolicies = await prisma.bankPolicy.findMany()
    * ```
    */
  get bankPolicy(): Prisma.BankPolicyDelegate<ExtArgs>;

  /**
   * `prisma.policyRule`: Exposes CRUD operations for the **PolicyRule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PolicyRules
    * const policyRules = await prisma.policyRule.findMany()
    * ```
    */
  get policyRule(): Prisma.PolicyRuleDelegate<ExtArgs>;

  /**
   * `prisma.policyDocument`: Exposes CRUD operations for the **PolicyDocument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PolicyDocuments
    * const policyDocuments = await prisma.policyDocument.findMany()
    * ```
    */
  get policyDocument(): Prisma.PolicyDocumentDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;

  /**
   * `prisma.cibilCheck`: Exposes CRUD operations for the **CibilCheck** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CibilChecks
    * const cibilChecks = await prisma.cibilCheck.findMany()
    * ```
    */
  get cibilCheck(): Prisma.CibilCheckDelegate<ExtArgs>;
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
    LoanApplication: 'LoanApplication',
    ApplicationStatusHistory: 'ApplicationStatusHistory',
    EligibilityRule: 'EligibilityRule',
    EligibilitySubmission: 'EligibilitySubmission',
    BankPolicy: 'BankPolicy',
    PolicyRule: 'PolicyRule',
    PolicyDocument: 'PolicyDocument',
    AuditLog: 'AuditLog',
    CibilCheck: 'CibilCheck'
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
      modelProps: "loanApplication" | "applicationStatusHistory" | "eligibilityRule" | "eligibilitySubmission" | "bankPolicy" | "policyRule" | "policyDocument" | "auditLog" | "cibilCheck"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      LoanApplication: {
        payload: Prisma.$LoanApplicationPayload<ExtArgs>
        fields: Prisma.LoanApplicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LoanApplicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanApplicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LoanApplicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanApplicationPayload>
          }
          findFirst: {
            args: Prisma.LoanApplicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanApplicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LoanApplicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanApplicationPayload>
          }
          findMany: {
            args: Prisma.LoanApplicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanApplicationPayload>[]
          }
          create: {
            args: Prisma.LoanApplicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanApplicationPayload>
          }
          createMany: {
            args: Prisma.LoanApplicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.LoanApplicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanApplicationPayload>
          }
          update: {
            args: Prisma.LoanApplicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanApplicationPayload>
          }
          deleteMany: {
            args: Prisma.LoanApplicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LoanApplicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LoanApplicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanApplicationPayload>
          }
          aggregate: {
            args: Prisma.LoanApplicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLoanApplication>
          }
          groupBy: {
            args: Prisma.LoanApplicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<LoanApplicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.LoanApplicationCountArgs<ExtArgs>
            result: $Utils.Optional<LoanApplicationCountAggregateOutputType> | number
          }
        }
      }
      ApplicationStatusHistory: {
        payload: Prisma.$ApplicationStatusHistoryPayload<ExtArgs>
        fields: Prisma.ApplicationStatusHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApplicationStatusHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationStatusHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApplicationStatusHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationStatusHistoryPayload>
          }
          findFirst: {
            args: Prisma.ApplicationStatusHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationStatusHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApplicationStatusHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationStatusHistoryPayload>
          }
          findMany: {
            args: Prisma.ApplicationStatusHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationStatusHistoryPayload>[]
          }
          create: {
            args: Prisma.ApplicationStatusHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationStatusHistoryPayload>
          }
          createMany: {
            args: Prisma.ApplicationStatusHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ApplicationStatusHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationStatusHistoryPayload>
          }
          update: {
            args: Prisma.ApplicationStatusHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationStatusHistoryPayload>
          }
          deleteMany: {
            args: Prisma.ApplicationStatusHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApplicationStatusHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ApplicationStatusHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationStatusHistoryPayload>
          }
          aggregate: {
            args: Prisma.ApplicationStatusHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApplicationStatusHistory>
          }
          groupBy: {
            args: Prisma.ApplicationStatusHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApplicationStatusHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApplicationStatusHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<ApplicationStatusHistoryCountAggregateOutputType> | number
          }
        }
      }
      EligibilityRule: {
        payload: Prisma.$EligibilityRulePayload<ExtArgs>
        fields: Prisma.EligibilityRuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EligibilityRuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilityRulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EligibilityRuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilityRulePayload>
          }
          findFirst: {
            args: Prisma.EligibilityRuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilityRulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EligibilityRuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilityRulePayload>
          }
          findMany: {
            args: Prisma.EligibilityRuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilityRulePayload>[]
          }
          create: {
            args: Prisma.EligibilityRuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilityRulePayload>
          }
          createMany: {
            args: Prisma.EligibilityRuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EligibilityRuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilityRulePayload>
          }
          update: {
            args: Prisma.EligibilityRuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilityRulePayload>
          }
          deleteMany: {
            args: Prisma.EligibilityRuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EligibilityRuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EligibilityRuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilityRulePayload>
          }
          aggregate: {
            args: Prisma.EligibilityRuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEligibilityRule>
          }
          groupBy: {
            args: Prisma.EligibilityRuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<EligibilityRuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.EligibilityRuleCountArgs<ExtArgs>
            result: $Utils.Optional<EligibilityRuleCountAggregateOutputType> | number
          }
        }
      }
      EligibilitySubmission: {
        payload: Prisma.$EligibilitySubmissionPayload<ExtArgs>
        fields: Prisma.EligibilitySubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EligibilitySubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilitySubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EligibilitySubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilitySubmissionPayload>
          }
          findFirst: {
            args: Prisma.EligibilitySubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilitySubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EligibilitySubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilitySubmissionPayload>
          }
          findMany: {
            args: Prisma.EligibilitySubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilitySubmissionPayload>[]
          }
          create: {
            args: Prisma.EligibilitySubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilitySubmissionPayload>
          }
          createMany: {
            args: Prisma.EligibilitySubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EligibilitySubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilitySubmissionPayload>
          }
          update: {
            args: Prisma.EligibilitySubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilitySubmissionPayload>
          }
          deleteMany: {
            args: Prisma.EligibilitySubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EligibilitySubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EligibilitySubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilitySubmissionPayload>
          }
          aggregate: {
            args: Prisma.EligibilitySubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEligibilitySubmission>
          }
          groupBy: {
            args: Prisma.EligibilitySubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<EligibilitySubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.EligibilitySubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<EligibilitySubmissionCountAggregateOutputType> | number
          }
        }
      }
      BankPolicy: {
        payload: Prisma.$BankPolicyPayload<ExtArgs>
        fields: Prisma.BankPolicyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BankPolicyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPolicyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BankPolicyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPolicyPayload>
          }
          findFirst: {
            args: Prisma.BankPolicyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPolicyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BankPolicyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPolicyPayload>
          }
          findMany: {
            args: Prisma.BankPolicyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPolicyPayload>[]
          }
          create: {
            args: Prisma.BankPolicyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPolicyPayload>
          }
          createMany: {
            args: Prisma.BankPolicyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BankPolicyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPolicyPayload>
          }
          update: {
            args: Prisma.BankPolicyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPolicyPayload>
          }
          deleteMany: {
            args: Prisma.BankPolicyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BankPolicyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BankPolicyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPolicyPayload>
          }
          aggregate: {
            args: Prisma.BankPolicyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBankPolicy>
          }
          groupBy: {
            args: Prisma.BankPolicyGroupByArgs<ExtArgs>
            result: $Utils.Optional<BankPolicyGroupByOutputType>[]
          }
          count: {
            args: Prisma.BankPolicyCountArgs<ExtArgs>
            result: $Utils.Optional<BankPolicyCountAggregateOutputType> | number
          }
        }
      }
      PolicyRule: {
        payload: Prisma.$PolicyRulePayload<ExtArgs>
        fields: Prisma.PolicyRuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PolicyRuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyRulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PolicyRuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyRulePayload>
          }
          findFirst: {
            args: Prisma.PolicyRuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyRulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PolicyRuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyRulePayload>
          }
          findMany: {
            args: Prisma.PolicyRuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyRulePayload>[]
          }
          create: {
            args: Prisma.PolicyRuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyRulePayload>
          }
          createMany: {
            args: Prisma.PolicyRuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PolicyRuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyRulePayload>
          }
          update: {
            args: Prisma.PolicyRuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyRulePayload>
          }
          deleteMany: {
            args: Prisma.PolicyRuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PolicyRuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PolicyRuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyRulePayload>
          }
          aggregate: {
            args: Prisma.PolicyRuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePolicyRule>
          }
          groupBy: {
            args: Prisma.PolicyRuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<PolicyRuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.PolicyRuleCountArgs<ExtArgs>
            result: $Utils.Optional<PolicyRuleCountAggregateOutputType> | number
          }
        }
      }
      PolicyDocument: {
        payload: Prisma.$PolicyDocumentPayload<ExtArgs>
        fields: Prisma.PolicyDocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PolicyDocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyDocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PolicyDocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyDocumentPayload>
          }
          findFirst: {
            args: Prisma.PolicyDocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyDocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PolicyDocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyDocumentPayload>
          }
          findMany: {
            args: Prisma.PolicyDocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyDocumentPayload>[]
          }
          create: {
            args: Prisma.PolicyDocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyDocumentPayload>
          }
          createMany: {
            args: Prisma.PolicyDocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PolicyDocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyDocumentPayload>
          }
          update: {
            args: Prisma.PolicyDocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyDocumentPayload>
          }
          deleteMany: {
            args: Prisma.PolicyDocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PolicyDocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PolicyDocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyDocumentPayload>
          }
          aggregate: {
            args: Prisma.PolicyDocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePolicyDocument>
          }
          groupBy: {
            args: Prisma.PolicyDocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PolicyDocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PolicyDocumentCountArgs<ExtArgs>
            result: $Utils.Optional<PolicyDocumentCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      CibilCheck: {
        payload: Prisma.$CibilCheckPayload<ExtArgs>
        fields: Prisma.CibilCheckFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CibilCheckFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CibilCheckPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CibilCheckFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CibilCheckPayload>
          }
          findFirst: {
            args: Prisma.CibilCheckFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CibilCheckPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CibilCheckFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CibilCheckPayload>
          }
          findMany: {
            args: Prisma.CibilCheckFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CibilCheckPayload>[]
          }
          create: {
            args: Prisma.CibilCheckCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CibilCheckPayload>
          }
          createMany: {
            args: Prisma.CibilCheckCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CibilCheckDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CibilCheckPayload>
          }
          update: {
            args: Prisma.CibilCheckUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CibilCheckPayload>
          }
          deleteMany: {
            args: Prisma.CibilCheckDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CibilCheckUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CibilCheckUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CibilCheckPayload>
          }
          aggregate: {
            args: Prisma.CibilCheckAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCibilCheck>
          }
          groupBy: {
            args: Prisma.CibilCheckGroupByArgs<ExtArgs>
            result: $Utils.Optional<CibilCheckGroupByOutputType>[]
          }
          count: {
            args: Prisma.CibilCheckCountArgs<ExtArgs>
            result: $Utils.Optional<CibilCheckCountAggregateOutputType> | number
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
   * Count Type LoanApplicationCountOutputType
   */

  export type LoanApplicationCountOutputType = {
    statusHistory: number
  }

  export type LoanApplicationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    statusHistory?: boolean | LoanApplicationCountOutputTypeCountStatusHistoryArgs
  }

  // Custom InputTypes
  /**
   * LoanApplicationCountOutputType without action
   */
  export type LoanApplicationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanApplicationCountOutputType
     */
    select?: LoanApplicationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LoanApplicationCountOutputType without action
   */
  export type LoanApplicationCountOutputTypeCountStatusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationStatusHistoryWhereInput
  }


  /**
   * Count Type BankPolicyCountOutputType
   */

  export type BankPolicyCountOutputType = {
    rules: number
  }

  export type BankPolicyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rules?: boolean | BankPolicyCountOutputTypeCountRulesArgs
  }

  // Custom InputTypes
  /**
   * BankPolicyCountOutputType without action
   */
  export type BankPolicyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankPolicyCountOutputType
     */
    select?: BankPolicyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BankPolicyCountOutputType without action
   */
  export type BankPolicyCountOutputTypeCountRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PolicyRuleWhereInput
  }


  /**
   * Models
   */

  /**
   * Model LoanApplication
   */

  export type AggregateLoanApplication = {
    _count: LoanApplicationCountAggregateOutputType | null
    _avg: LoanApplicationAvgAggregateOutputType | null
    _sum: LoanApplicationSumAggregateOutputType | null
    _min: LoanApplicationMinAggregateOutputType | null
    _max: LoanApplicationMaxAggregateOutputType | null
  }

  export type LoanApplicationAvgAggregateOutputType = {
    amount: Decimal | null
    tenureMonths: number | null
  }

  export type LoanApplicationSumAggregateOutputType = {
    amount: Decimal | null
    tenureMonths: number | null
  }

  export type LoanApplicationMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    connectorId: string | null
    amount: Decimal | null
    tenureMonths: number | null
    purpose: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
  }

  export type LoanApplicationMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    connectorId: string | null
    amount: Decimal | null
    tenureMonths: number | null
    purpose: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
  }

  export type LoanApplicationCountAggregateOutputType = {
    id: number
    customerId: number
    connectorId: number
    amount: number
    tenureMonths: number
    purpose: number
    status: number
    createdAt: number
    updatedAt: number
    createdBy: number
    updatedBy: number
    _all: number
  }


  export type LoanApplicationAvgAggregateInputType = {
    amount?: true
    tenureMonths?: true
  }

  export type LoanApplicationSumAggregateInputType = {
    amount?: true
    tenureMonths?: true
  }

  export type LoanApplicationMinAggregateInputType = {
    id?: true
    customerId?: true
    connectorId?: true
    amount?: true
    tenureMonths?: true
    purpose?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
  }

  export type LoanApplicationMaxAggregateInputType = {
    id?: true
    customerId?: true
    connectorId?: true
    amount?: true
    tenureMonths?: true
    purpose?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
  }

  export type LoanApplicationCountAggregateInputType = {
    id?: true
    customerId?: true
    connectorId?: true
    amount?: true
    tenureMonths?: true
    purpose?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
    _all?: true
  }

  export type LoanApplicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoanApplication to aggregate.
     */
    where?: LoanApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoanApplications to fetch.
     */
    orderBy?: LoanApplicationOrderByWithRelationInput | LoanApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LoanApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoanApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoanApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LoanApplications
    **/
    _count?: true | LoanApplicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LoanApplicationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LoanApplicationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoanApplicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoanApplicationMaxAggregateInputType
  }

  export type GetLoanApplicationAggregateType<T extends LoanApplicationAggregateArgs> = {
        [P in keyof T & keyof AggregateLoanApplication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLoanApplication[P]>
      : GetScalarType<T[P], AggregateLoanApplication[P]>
  }




  export type LoanApplicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanApplicationWhereInput
    orderBy?: LoanApplicationOrderByWithAggregationInput | LoanApplicationOrderByWithAggregationInput[]
    by: LoanApplicationScalarFieldEnum[] | LoanApplicationScalarFieldEnum
    having?: LoanApplicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoanApplicationCountAggregateInputType | true
    _avg?: LoanApplicationAvgAggregateInputType
    _sum?: LoanApplicationSumAggregateInputType
    _min?: LoanApplicationMinAggregateInputType
    _max?: LoanApplicationMaxAggregateInputType
  }

  export type LoanApplicationGroupByOutputType = {
    id: string
    customerId: string
    connectorId: string | null
    amount: Decimal
    tenureMonths: number
    purpose: string | null
    status: string
    createdAt: Date
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
    _count: LoanApplicationCountAggregateOutputType | null
    _avg: LoanApplicationAvgAggregateOutputType | null
    _sum: LoanApplicationSumAggregateOutputType | null
    _min: LoanApplicationMinAggregateOutputType | null
    _max: LoanApplicationMaxAggregateOutputType | null
  }

  type GetLoanApplicationGroupByPayload<T extends LoanApplicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LoanApplicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoanApplicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoanApplicationGroupByOutputType[P]>
            : GetScalarType<T[P], LoanApplicationGroupByOutputType[P]>
        }
      >
    >


  export type LoanApplicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    connectorId?: boolean
    amount?: boolean
    tenureMonths?: boolean
    purpose?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    statusHistory?: boolean | LoanApplication$statusHistoryArgs<ExtArgs>
    _count?: boolean | LoanApplicationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loanApplication"]>


  export type LoanApplicationSelectScalar = {
    id?: boolean
    customerId?: boolean
    connectorId?: boolean
    amount?: boolean
    tenureMonths?: boolean
    purpose?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
  }

  export type LoanApplicationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    statusHistory?: boolean | LoanApplication$statusHistoryArgs<ExtArgs>
    _count?: boolean | LoanApplicationCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $LoanApplicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LoanApplication"
    objects: {
      statusHistory: Prisma.$ApplicationStatusHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string
      connectorId: string | null
      amount: Prisma.Decimal
      tenureMonths: number
      purpose: string | null
      status: string
      createdAt: Date
      updatedAt: Date | null
      createdBy: string | null
      updatedBy: string | null
    }, ExtArgs["result"]["loanApplication"]>
    composites: {}
  }

  type LoanApplicationGetPayload<S extends boolean | null | undefined | LoanApplicationDefaultArgs> = $Result.GetResult<Prisma.$LoanApplicationPayload, S>

  type LoanApplicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LoanApplicationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LoanApplicationCountAggregateInputType | true
    }

  export interface LoanApplicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LoanApplication'], meta: { name: 'LoanApplication' } }
    /**
     * Find zero or one LoanApplication that matches the filter.
     * @param {LoanApplicationFindUniqueArgs} args - Arguments to find a LoanApplication
     * @example
     * // Get one LoanApplication
     * const loanApplication = await prisma.loanApplication.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoanApplicationFindUniqueArgs>(args: SelectSubset<T, LoanApplicationFindUniqueArgs<ExtArgs>>): Prisma__LoanApplicationClient<$Result.GetResult<Prisma.$LoanApplicationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one LoanApplication that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LoanApplicationFindUniqueOrThrowArgs} args - Arguments to find a LoanApplication
     * @example
     * // Get one LoanApplication
     * const loanApplication = await prisma.loanApplication.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoanApplicationFindUniqueOrThrowArgs>(args: SelectSubset<T, LoanApplicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LoanApplicationClient<$Result.GetResult<Prisma.$LoanApplicationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first LoanApplication that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanApplicationFindFirstArgs} args - Arguments to find a LoanApplication
     * @example
     * // Get one LoanApplication
     * const loanApplication = await prisma.loanApplication.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoanApplicationFindFirstArgs>(args?: SelectSubset<T, LoanApplicationFindFirstArgs<ExtArgs>>): Prisma__LoanApplicationClient<$Result.GetResult<Prisma.$LoanApplicationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first LoanApplication that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanApplicationFindFirstOrThrowArgs} args - Arguments to find a LoanApplication
     * @example
     * // Get one LoanApplication
     * const loanApplication = await prisma.loanApplication.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoanApplicationFindFirstOrThrowArgs>(args?: SelectSubset<T, LoanApplicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__LoanApplicationClient<$Result.GetResult<Prisma.$LoanApplicationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more LoanApplications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanApplicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LoanApplications
     * const loanApplications = await prisma.loanApplication.findMany()
     * 
     * // Get first 10 LoanApplications
     * const loanApplications = await prisma.loanApplication.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loanApplicationWithIdOnly = await prisma.loanApplication.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LoanApplicationFindManyArgs>(args?: SelectSubset<T, LoanApplicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanApplicationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a LoanApplication.
     * @param {LoanApplicationCreateArgs} args - Arguments to create a LoanApplication.
     * @example
     * // Create one LoanApplication
     * const LoanApplication = await prisma.loanApplication.create({
     *   data: {
     *     // ... data to create a LoanApplication
     *   }
     * })
     * 
     */
    create<T extends LoanApplicationCreateArgs>(args: SelectSubset<T, LoanApplicationCreateArgs<ExtArgs>>): Prisma__LoanApplicationClient<$Result.GetResult<Prisma.$LoanApplicationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many LoanApplications.
     * @param {LoanApplicationCreateManyArgs} args - Arguments to create many LoanApplications.
     * @example
     * // Create many LoanApplications
     * const loanApplication = await prisma.loanApplication.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LoanApplicationCreateManyArgs>(args?: SelectSubset<T, LoanApplicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a LoanApplication.
     * @param {LoanApplicationDeleteArgs} args - Arguments to delete one LoanApplication.
     * @example
     * // Delete one LoanApplication
     * const LoanApplication = await prisma.loanApplication.delete({
     *   where: {
     *     // ... filter to delete one LoanApplication
     *   }
     * })
     * 
     */
    delete<T extends LoanApplicationDeleteArgs>(args: SelectSubset<T, LoanApplicationDeleteArgs<ExtArgs>>): Prisma__LoanApplicationClient<$Result.GetResult<Prisma.$LoanApplicationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one LoanApplication.
     * @param {LoanApplicationUpdateArgs} args - Arguments to update one LoanApplication.
     * @example
     * // Update one LoanApplication
     * const loanApplication = await prisma.loanApplication.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LoanApplicationUpdateArgs>(args: SelectSubset<T, LoanApplicationUpdateArgs<ExtArgs>>): Prisma__LoanApplicationClient<$Result.GetResult<Prisma.$LoanApplicationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more LoanApplications.
     * @param {LoanApplicationDeleteManyArgs} args - Arguments to filter LoanApplications to delete.
     * @example
     * // Delete a few LoanApplications
     * const { count } = await prisma.loanApplication.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LoanApplicationDeleteManyArgs>(args?: SelectSubset<T, LoanApplicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoanApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanApplicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LoanApplications
     * const loanApplication = await prisma.loanApplication.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LoanApplicationUpdateManyArgs>(args: SelectSubset<T, LoanApplicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LoanApplication.
     * @param {LoanApplicationUpsertArgs} args - Arguments to update or create a LoanApplication.
     * @example
     * // Update or create a LoanApplication
     * const loanApplication = await prisma.loanApplication.upsert({
     *   create: {
     *     // ... data to create a LoanApplication
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LoanApplication we want to update
     *   }
     * })
     */
    upsert<T extends LoanApplicationUpsertArgs>(args: SelectSubset<T, LoanApplicationUpsertArgs<ExtArgs>>): Prisma__LoanApplicationClient<$Result.GetResult<Prisma.$LoanApplicationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of LoanApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanApplicationCountArgs} args - Arguments to filter LoanApplications to count.
     * @example
     * // Count the number of LoanApplications
     * const count = await prisma.loanApplication.count({
     *   where: {
     *     // ... the filter for the LoanApplications we want to count
     *   }
     * })
    **/
    count<T extends LoanApplicationCountArgs>(
      args?: Subset<T, LoanApplicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoanApplicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LoanApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanApplicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LoanApplicationAggregateArgs>(args: Subset<T, LoanApplicationAggregateArgs>): Prisma.PrismaPromise<GetLoanApplicationAggregateType<T>>

    /**
     * Group by LoanApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanApplicationGroupByArgs} args - Group by arguments.
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
      T extends LoanApplicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoanApplicationGroupByArgs['orderBy'] }
        : { orderBy?: LoanApplicationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LoanApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoanApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LoanApplication model
   */
  readonly fields: LoanApplicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LoanApplication.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LoanApplicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    statusHistory<T extends LoanApplication$statusHistoryArgs<ExtArgs> = {}>(args?: Subset<T, LoanApplication$statusHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationStatusHistoryPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the LoanApplication model
   */ 
  interface LoanApplicationFieldRefs {
    readonly id: FieldRef<"LoanApplication", 'String'>
    readonly customerId: FieldRef<"LoanApplication", 'String'>
    readonly connectorId: FieldRef<"LoanApplication", 'String'>
    readonly amount: FieldRef<"LoanApplication", 'Decimal'>
    readonly tenureMonths: FieldRef<"LoanApplication", 'Int'>
    readonly purpose: FieldRef<"LoanApplication", 'String'>
    readonly status: FieldRef<"LoanApplication", 'String'>
    readonly createdAt: FieldRef<"LoanApplication", 'DateTime'>
    readonly updatedAt: FieldRef<"LoanApplication", 'DateTime'>
    readonly createdBy: FieldRef<"LoanApplication", 'String'>
    readonly updatedBy: FieldRef<"LoanApplication", 'String'>
  }
    

  // Custom InputTypes
  /**
   * LoanApplication findUnique
   */
  export type LoanApplicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanApplication
     */
    select?: LoanApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanApplicationInclude<ExtArgs> | null
    /**
     * Filter, which LoanApplication to fetch.
     */
    where: LoanApplicationWhereUniqueInput
  }

  /**
   * LoanApplication findUniqueOrThrow
   */
  export type LoanApplicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanApplication
     */
    select?: LoanApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanApplicationInclude<ExtArgs> | null
    /**
     * Filter, which LoanApplication to fetch.
     */
    where: LoanApplicationWhereUniqueInput
  }

  /**
   * LoanApplication findFirst
   */
  export type LoanApplicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanApplication
     */
    select?: LoanApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanApplicationInclude<ExtArgs> | null
    /**
     * Filter, which LoanApplication to fetch.
     */
    where?: LoanApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoanApplications to fetch.
     */
    orderBy?: LoanApplicationOrderByWithRelationInput | LoanApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoanApplications.
     */
    cursor?: LoanApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoanApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoanApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoanApplications.
     */
    distinct?: LoanApplicationScalarFieldEnum | LoanApplicationScalarFieldEnum[]
  }

  /**
   * LoanApplication findFirstOrThrow
   */
  export type LoanApplicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanApplication
     */
    select?: LoanApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanApplicationInclude<ExtArgs> | null
    /**
     * Filter, which LoanApplication to fetch.
     */
    where?: LoanApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoanApplications to fetch.
     */
    orderBy?: LoanApplicationOrderByWithRelationInput | LoanApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoanApplications.
     */
    cursor?: LoanApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoanApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoanApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoanApplications.
     */
    distinct?: LoanApplicationScalarFieldEnum | LoanApplicationScalarFieldEnum[]
  }

  /**
   * LoanApplication findMany
   */
  export type LoanApplicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanApplication
     */
    select?: LoanApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanApplicationInclude<ExtArgs> | null
    /**
     * Filter, which LoanApplications to fetch.
     */
    where?: LoanApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoanApplications to fetch.
     */
    orderBy?: LoanApplicationOrderByWithRelationInput | LoanApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LoanApplications.
     */
    cursor?: LoanApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoanApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoanApplications.
     */
    skip?: number
    distinct?: LoanApplicationScalarFieldEnum | LoanApplicationScalarFieldEnum[]
  }

  /**
   * LoanApplication create
   */
  export type LoanApplicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanApplication
     */
    select?: LoanApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanApplicationInclude<ExtArgs> | null
    /**
     * The data needed to create a LoanApplication.
     */
    data: XOR<LoanApplicationCreateInput, LoanApplicationUncheckedCreateInput>
  }

  /**
   * LoanApplication createMany
   */
  export type LoanApplicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LoanApplications.
     */
    data: LoanApplicationCreateManyInput | LoanApplicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LoanApplication update
   */
  export type LoanApplicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanApplication
     */
    select?: LoanApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanApplicationInclude<ExtArgs> | null
    /**
     * The data needed to update a LoanApplication.
     */
    data: XOR<LoanApplicationUpdateInput, LoanApplicationUncheckedUpdateInput>
    /**
     * Choose, which LoanApplication to update.
     */
    where: LoanApplicationWhereUniqueInput
  }

  /**
   * LoanApplication updateMany
   */
  export type LoanApplicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LoanApplications.
     */
    data: XOR<LoanApplicationUpdateManyMutationInput, LoanApplicationUncheckedUpdateManyInput>
    /**
     * Filter which LoanApplications to update
     */
    where?: LoanApplicationWhereInput
  }

  /**
   * LoanApplication upsert
   */
  export type LoanApplicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanApplication
     */
    select?: LoanApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanApplicationInclude<ExtArgs> | null
    /**
     * The filter to search for the LoanApplication to update in case it exists.
     */
    where: LoanApplicationWhereUniqueInput
    /**
     * In case the LoanApplication found by the `where` argument doesn't exist, create a new LoanApplication with this data.
     */
    create: XOR<LoanApplicationCreateInput, LoanApplicationUncheckedCreateInput>
    /**
     * In case the LoanApplication was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LoanApplicationUpdateInput, LoanApplicationUncheckedUpdateInput>
  }

  /**
   * LoanApplication delete
   */
  export type LoanApplicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanApplication
     */
    select?: LoanApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanApplicationInclude<ExtArgs> | null
    /**
     * Filter which LoanApplication to delete.
     */
    where: LoanApplicationWhereUniqueInput
  }

  /**
   * LoanApplication deleteMany
   */
  export type LoanApplicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoanApplications to delete
     */
    where?: LoanApplicationWhereInput
  }

  /**
   * LoanApplication.statusHistory
   */
  export type LoanApplication$statusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicationStatusHistory
     */
    select?: ApplicationStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationStatusHistoryInclude<ExtArgs> | null
    where?: ApplicationStatusHistoryWhereInput
    orderBy?: ApplicationStatusHistoryOrderByWithRelationInput | ApplicationStatusHistoryOrderByWithRelationInput[]
    cursor?: ApplicationStatusHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApplicationStatusHistoryScalarFieldEnum | ApplicationStatusHistoryScalarFieldEnum[]
  }

  /**
   * LoanApplication without action
   */
  export type LoanApplicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanApplication
     */
    select?: LoanApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanApplicationInclude<ExtArgs> | null
  }


  /**
   * Model ApplicationStatusHistory
   */

  export type AggregateApplicationStatusHistory = {
    _count: ApplicationStatusHistoryCountAggregateOutputType | null
    _min: ApplicationStatusHistoryMinAggregateOutputType | null
    _max: ApplicationStatusHistoryMaxAggregateOutputType | null
  }

  export type ApplicationStatusHistoryMinAggregateOutputType = {
    id: string | null
    loanId: string | null
    status: string | null
    remarks: string | null
    changedAt: Date | null
    changedBy: string | null
  }

  export type ApplicationStatusHistoryMaxAggregateOutputType = {
    id: string | null
    loanId: string | null
    status: string | null
    remarks: string | null
    changedAt: Date | null
    changedBy: string | null
  }

  export type ApplicationStatusHistoryCountAggregateOutputType = {
    id: number
    loanId: number
    status: number
    remarks: number
    changedAt: number
    changedBy: number
    _all: number
  }


  export type ApplicationStatusHistoryMinAggregateInputType = {
    id?: true
    loanId?: true
    status?: true
    remarks?: true
    changedAt?: true
    changedBy?: true
  }

  export type ApplicationStatusHistoryMaxAggregateInputType = {
    id?: true
    loanId?: true
    status?: true
    remarks?: true
    changedAt?: true
    changedBy?: true
  }

  export type ApplicationStatusHistoryCountAggregateInputType = {
    id?: true
    loanId?: true
    status?: true
    remarks?: true
    changedAt?: true
    changedBy?: true
    _all?: true
  }

  export type ApplicationStatusHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApplicationStatusHistory to aggregate.
     */
    where?: ApplicationStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApplicationStatusHistories to fetch.
     */
    orderBy?: ApplicationStatusHistoryOrderByWithRelationInput | ApplicationStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApplicationStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApplicationStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApplicationStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApplicationStatusHistories
    **/
    _count?: true | ApplicationStatusHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApplicationStatusHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApplicationStatusHistoryMaxAggregateInputType
  }

  export type GetApplicationStatusHistoryAggregateType<T extends ApplicationStatusHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateApplicationStatusHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApplicationStatusHistory[P]>
      : GetScalarType<T[P], AggregateApplicationStatusHistory[P]>
  }




  export type ApplicationStatusHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationStatusHistoryWhereInput
    orderBy?: ApplicationStatusHistoryOrderByWithAggregationInput | ApplicationStatusHistoryOrderByWithAggregationInput[]
    by: ApplicationStatusHistoryScalarFieldEnum[] | ApplicationStatusHistoryScalarFieldEnum
    having?: ApplicationStatusHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApplicationStatusHistoryCountAggregateInputType | true
    _min?: ApplicationStatusHistoryMinAggregateInputType
    _max?: ApplicationStatusHistoryMaxAggregateInputType
  }

  export type ApplicationStatusHistoryGroupByOutputType = {
    id: string
    loanId: string | null
    status: string
    remarks: string | null
    changedAt: Date
    changedBy: string | null
    _count: ApplicationStatusHistoryCountAggregateOutputType | null
    _min: ApplicationStatusHistoryMinAggregateOutputType | null
    _max: ApplicationStatusHistoryMaxAggregateOutputType | null
  }

  type GetApplicationStatusHistoryGroupByPayload<T extends ApplicationStatusHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApplicationStatusHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApplicationStatusHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApplicationStatusHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], ApplicationStatusHistoryGroupByOutputType[P]>
        }
      >
    >


  export type ApplicationStatusHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanId?: boolean
    status?: boolean
    remarks?: boolean
    changedAt?: boolean
    changedBy?: boolean
    loan?: boolean | ApplicationStatusHistory$loanArgs<ExtArgs>
  }, ExtArgs["result"]["applicationStatusHistory"]>


  export type ApplicationStatusHistorySelectScalar = {
    id?: boolean
    loanId?: boolean
    status?: boolean
    remarks?: boolean
    changedAt?: boolean
    changedBy?: boolean
  }

  export type ApplicationStatusHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loan?: boolean | ApplicationStatusHistory$loanArgs<ExtArgs>
  }

  export type $ApplicationStatusHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApplicationStatusHistory"
    objects: {
      loan: Prisma.$LoanApplicationPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      loanId: string | null
      status: string
      remarks: string | null
      changedAt: Date
      changedBy: string | null
    }, ExtArgs["result"]["applicationStatusHistory"]>
    composites: {}
  }

  type ApplicationStatusHistoryGetPayload<S extends boolean | null | undefined | ApplicationStatusHistoryDefaultArgs> = $Result.GetResult<Prisma.$ApplicationStatusHistoryPayload, S>

  type ApplicationStatusHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ApplicationStatusHistoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ApplicationStatusHistoryCountAggregateInputType | true
    }

  export interface ApplicationStatusHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApplicationStatusHistory'], meta: { name: 'ApplicationStatusHistory' } }
    /**
     * Find zero or one ApplicationStatusHistory that matches the filter.
     * @param {ApplicationStatusHistoryFindUniqueArgs} args - Arguments to find a ApplicationStatusHistory
     * @example
     * // Get one ApplicationStatusHistory
     * const applicationStatusHistory = await prisma.applicationStatusHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApplicationStatusHistoryFindUniqueArgs>(args: SelectSubset<T, ApplicationStatusHistoryFindUniqueArgs<ExtArgs>>): Prisma__ApplicationStatusHistoryClient<$Result.GetResult<Prisma.$ApplicationStatusHistoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ApplicationStatusHistory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ApplicationStatusHistoryFindUniqueOrThrowArgs} args - Arguments to find a ApplicationStatusHistory
     * @example
     * // Get one ApplicationStatusHistory
     * const applicationStatusHistory = await prisma.applicationStatusHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApplicationStatusHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, ApplicationStatusHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApplicationStatusHistoryClient<$Result.GetResult<Prisma.$ApplicationStatusHistoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ApplicationStatusHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationStatusHistoryFindFirstArgs} args - Arguments to find a ApplicationStatusHistory
     * @example
     * // Get one ApplicationStatusHistory
     * const applicationStatusHistory = await prisma.applicationStatusHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApplicationStatusHistoryFindFirstArgs>(args?: SelectSubset<T, ApplicationStatusHistoryFindFirstArgs<ExtArgs>>): Prisma__ApplicationStatusHistoryClient<$Result.GetResult<Prisma.$ApplicationStatusHistoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ApplicationStatusHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationStatusHistoryFindFirstOrThrowArgs} args - Arguments to find a ApplicationStatusHistory
     * @example
     * // Get one ApplicationStatusHistory
     * const applicationStatusHistory = await prisma.applicationStatusHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApplicationStatusHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, ApplicationStatusHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApplicationStatusHistoryClient<$Result.GetResult<Prisma.$ApplicationStatusHistoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ApplicationStatusHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationStatusHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApplicationStatusHistories
     * const applicationStatusHistories = await prisma.applicationStatusHistory.findMany()
     * 
     * // Get first 10 ApplicationStatusHistories
     * const applicationStatusHistories = await prisma.applicationStatusHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const applicationStatusHistoryWithIdOnly = await prisma.applicationStatusHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApplicationStatusHistoryFindManyArgs>(args?: SelectSubset<T, ApplicationStatusHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationStatusHistoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ApplicationStatusHistory.
     * @param {ApplicationStatusHistoryCreateArgs} args - Arguments to create a ApplicationStatusHistory.
     * @example
     * // Create one ApplicationStatusHistory
     * const ApplicationStatusHistory = await prisma.applicationStatusHistory.create({
     *   data: {
     *     // ... data to create a ApplicationStatusHistory
     *   }
     * })
     * 
     */
    create<T extends ApplicationStatusHistoryCreateArgs>(args: SelectSubset<T, ApplicationStatusHistoryCreateArgs<ExtArgs>>): Prisma__ApplicationStatusHistoryClient<$Result.GetResult<Prisma.$ApplicationStatusHistoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ApplicationStatusHistories.
     * @param {ApplicationStatusHistoryCreateManyArgs} args - Arguments to create many ApplicationStatusHistories.
     * @example
     * // Create many ApplicationStatusHistories
     * const applicationStatusHistory = await prisma.applicationStatusHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApplicationStatusHistoryCreateManyArgs>(args?: SelectSubset<T, ApplicationStatusHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ApplicationStatusHistory.
     * @param {ApplicationStatusHistoryDeleteArgs} args - Arguments to delete one ApplicationStatusHistory.
     * @example
     * // Delete one ApplicationStatusHistory
     * const ApplicationStatusHistory = await prisma.applicationStatusHistory.delete({
     *   where: {
     *     // ... filter to delete one ApplicationStatusHistory
     *   }
     * })
     * 
     */
    delete<T extends ApplicationStatusHistoryDeleteArgs>(args: SelectSubset<T, ApplicationStatusHistoryDeleteArgs<ExtArgs>>): Prisma__ApplicationStatusHistoryClient<$Result.GetResult<Prisma.$ApplicationStatusHistoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ApplicationStatusHistory.
     * @param {ApplicationStatusHistoryUpdateArgs} args - Arguments to update one ApplicationStatusHistory.
     * @example
     * // Update one ApplicationStatusHistory
     * const applicationStatusHistory = await prisma.applicationStatusHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApplicationStatusHistoryUpdateArgs>(args: SelectSubset<T, ApplicationStatusHistoryUpdateArgs<ExtArgs>>): Prisma__ApplicationStatusHistoryClient<$Result.GetResult<Prisma.$ApplicationStatusHistoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ApplicationStatusHistories.
     * @param {ApplicationStatusHistoryDeleteManyArgs} args - Arguments to filter ApplicationStatusHistories to delete.
     * @example
     * // Delete a few ApplicationStatusHistories
     * const { count } = await prisma.applicationStatusHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApplicationStatusHistoryDeleteManyArgs>(args?: SelectSubset<T, ApplicationStatusHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApplicationStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationStatusHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApplicationStatusHistories
     * const applicationStatusHistory = await prisma.applicationStatusHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApplicationStatusHistoryUpdateManyArgs>(args: SelectSubset<T, ApplicationStatusHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ApplicationStatusHistory.
     * @param {ApplicationStatusHistoryUpsertArgs} args - Arguments to update or create a ApplicationStatusHistory.
     * @example
     * // Update or create a ApplicationStatusHistory
     * const applicationStatusHistory = await prisma.applicationStatusHistory.upsert({
     *   create: {
     *     // ... data to create a ApplicationStatusHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApplicationStatusHistory we want to update
     *   }
     * })
     */
    upsert<T extends ApplicationStatusHistoryUpsertArgs>(args: SelectSubset<T, ApplicationStatusHistoryUpsertArgs<ExtArgs>>): Prisma__ApplicationStatusHistoryClient<$Result.GetResult<Prisma.$ApplicationStatusHistoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ApplicationStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationStatusHistoryCountArgs} args - Arguments to filter ApplicationStatusHistories to count.
     * @example
     * // Count the number of ApplicationStatusHistories
     * const count = await prisma.applicationStatusHistory.count({
     *   where: {
     *     // ... the filter for the ApplicationStatusHistories we want to count
     *   }
     * })
    **/
    count<T extends ApplicationStatusHistoryCountArgs>(
      args?: Subset<T, ApplicationStatusHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApplicationStatusHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApplicationStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationStatusHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ApplicationStatusHistoryAggregateArgs>(args: Subset<T, ApplicationStatusHistoryAggregateArgs>): Prisma.PrismaPromise<GetApplicationStatusHistoryAggregateType<T>>

    /**
     * Group by ApplicationStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationStatusHistoryGroupByArgs} args - Group by arguments.
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
      T extends ApplicationStatusHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApplicationStatusHistoryGroupByArgs['orderBy'] }
        : { orderBy?: ApplicationStatusHistoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ApplicationStatusHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApplicationStatusHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApplicationStatusHistory model
   */
  readonly fields: ApplicationStatusHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApplicationStatusHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApplicationStatusHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    loan<T extends ApplicationStatusHistory$loanArgs<ExtArgs> = {}>(args?: Subset<T, ApplicationStatusHistory$loanArgs<ExtArgs>>): Prisma__LoanApplicationClient<$Result.GetResult<Prisma.$LoanApplicationPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the ApplicationStatusHistory model
   */ 
  interface ApplicationStatusHistoryFieldRefs {
    readonly id: FieldRef<"ApplicationStatusHistory", 'String'>
    readonly loanId: FieldRef<"ApplicationStatusHistory", 'String'>
    readonly status: FieldRef<"ApplicationStatusHistory", 'String'>
    readonly remarks: FieldRef<"ApplicationStatusHistory", 'String'>
    readonly changedAt: FieldRef<"ApplicationStatusHistory", 'DateTime'>
    readonly changedBy: FieldRef<"ApplicationStatusHistory", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ApplicationStatusHistory findUnique
   */
  export type ApplicationStatusHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicationStatusHistory
     */
    select?: ApplicationStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ApplicationStatusHistory to fetch.
     */
    where: ApplicationStatusHistoryWhereUniqueInput
  }

  /**
   * ApplicationStatusHistory findUniqueOrThrow
   */
  export type ApplicationStatusHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicationStatusHistory
     */
    select?: ApplicationStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ApplicationStatusHistory to fetch.
     */
    where: ApplicationStatusHistoryWhereUniqueInput
  }

  /**
   * ApplicationStatusHistory findFirst
   */
  export type ApplicationStatusHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicationStatusHistory
     */
    select?: ApplicationStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ApplicationStatusHistory to fetch.
     */
    where?: ApplicationStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApplicationStatusHistories to fetch.
     */
    orderBy?: ApplicationStatusHistoryOrderByWithRelationInput | ApplicationStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApplicationStatusHistories.
     */
    cursor?: ApplicationStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApplicationStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApplicationStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApplicationStatusHistories.
     */
    distinct?: ApplicationStatusHistoryScalarFieldEnum | ApplicationStatusHistoryScalarFieldEnum[]
  }

  /**
   * ApplicationStatusHistory findFirstOrThrow
   */
  export type ApplicationStatusHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicationStatusHistory
     */
    select?: ApplicationStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ApplicationStatusHistory to fetch.
     */
    where?: ApplicationStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApplicationStatusHistories to fetch.
     */
    orderBy?: ApplicationStatusHistoryOrderByWithRelationInput | ApplicationStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApplicationStatusHistories.
     */
    cursor?: ApplicationStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApplicationStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApplicationStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApplicationStatusHistories.
     */
    distinct?: ApplicationStatusHistoryScalarFieldEnum | ApplicationStatusHistoryScalarFieldEnum[]
  }

  /**
   * ApplicationStatusHistory findMany
   */
  export type ApplicationStatusHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicationStatusHistory
     */
    select?: ApplicationStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ApplicationStatusHistories to fetch.
     */
    where?: ApplicationStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApplicationStatusHistories to fetch.
     */
    orderBy?: ApplicationStatusHistoryOrderByWithRelationInput | ApplicationStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApplicationStatusHistories.
     */
    cursor?: ApplicationStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApplicationStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApplicationStatusHistories.
     */
    skip?: number
    distinct?: ApplicationStatusHistoryScalarFieldEnum | ApplicationStatusHistoryScalarFieldEnum[]
  }

  /**
   * ApplicationStatusHistory create
   */
  export type ApplicationStatusHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicationStatusHistory
     */
    select?: ApplicationStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a ApplicationStatusHistory.
     */
    data: XOR<ApplicationStatusHistoryCreateInput, ApplicationStatusHistoryUncheckedCreateInput>
  }

  /**
   * ApplicationStatusHistory createMany
   */
  export type ApplicationStatusHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApplicationStatusHistories.
     */
    data: ApplicationStatusHistoryCreateManyInput | ApplicationStatusHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApplicationStatusHistory update
   */
  export type ApplicationStatusHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicationStatusHistory
     */
    select?: ApplicationStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a ApplicationStatusHistory.
     */
    data: XOR<ApplicationStatusHistoryUpdateInput, ApplicationStatusHistoryUncheckedUpdateInput>
    /**
     * Choose, which ApplicationStatusHistory to update.
     */
    where: ApplicationStatusHistoryWhereUniqueInput
  }

  /**
   * ApplicationStatusHistory updateMany
   */
  export type ApplicationStatusHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApplicationStatusHistories.
     */
    data: XOR<ApplicationStatusHistoryUpdateManyMutationInput, ApplicationStatusHistoryUncheckedUpdateManyInput>
    /**
     * Filter which ApplicationStatusHistories to update
     */
    where?: ApplicationStatusHistoryWhereInput
  }

  /**
   * ApplicationStatusHistory upsert
   */
  export type ApplicationStatusHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicationStatusHistory
     */
    select?: ApplicationStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationStatusHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the ApplicationStatusHistory to update in case it exists.
     */
    where: ApplicationStatusHistoryWhereUniqueInput
    /**
     * In case the ApplicationStatusHistory found by the `where` argument doesn't exist, create a new ApplicationStatusHistory with this data.
     */
    create: XOR<ApplicationStatusHistoryCreateInput, ApplicationStatusHistoryUncheckedCreateInput>
    /**
     * In case the ApplicationStatusHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApplicationStatusHistoryUpdateInput, ApplicationStatusHistoryUncheckedUpdateInput>
  }

  /**
   * ApplicationStatusHistory delete
   */
  export type ApplicationStatusHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicationStatusHistory
     */
    select?: ApplicationStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter which ApplicationStatusHistory to delete.
     */
    where: ApplicationStatusHistoryWhereUniqueInput
  }

  /**
   * ApplicationStatusHistory deleteMany
   */
  export type ApplicationStatusHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApplicationStatusHistories to delete
     */
    where?: ApplicationStatusHistoryWhereInput
  }

  /**
   * ApplicationStatusHistory.loan
   */
  export type ApplicationStatusHistory$loanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanApplication
     */
    select?: LoanApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanApplicationInclude<ExtArgs> | null
    where?: LoanApplicationWhereInput
  }

  /**
   * ApplicationStatusHistory without action
   */
  export type ApplicationStatusHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicationStatusHistory
     */
    select?: ApplicationStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationStatusHistoryInclude<ExtArgs> | null
  }


  /**
   * Model EligibilityRule
   */

  export type AggregateEligibilityRule = {
    _count: EligibilityRuleCountAggregateOutputType | null
    _avg: EligibilityRuleAvgAggregateOutputType | null
    _sum: EligibilityRuleSumAggregateOutputType | null
    _min: EligibilityRuleMinAggregateOutputType | null
    _max: EligibilityRuleMaxAggregateOutputType | null
  }

  export type EligibilityRuleAvgAggregateOutputType = {
    minValue: Decimal | null
    maxValue: Decimal | null
  }

  export type EligibilityRuleSumAggregateOutputType = {
    minValue: Decimal | null
    maxValue: Decimal | null
  }

  export type EligibilityRuleMinAggregateOutputType = {
    id: string | null
    ruleType: string | null
    minValue: Decimal | null
    maxValue: Decimal | null
    isActive: boolean | null
    updatedAt: Date | null
    updatedBy: string | null
  }

  export type EligibilityRuleMaxAggregateOutputType = {
    id: string | null
    ruleType: string | null
    minValue: Decimal | null
    maxValue: Decimal | null
    isActive: boolean | null
    updatedAt: Date | null
    updatedBy: string | null
  }

  export type EligibilityRuleCountAggregateOutputType = {
    id: number
    ruleType: number
    minValue: number
    maxValue: number
    isActive: number
    updatedAt: number
    updatedBy: number
    _all: number
  }


  export type EligibilityRuleAvgAggregateInputType = {
    minValue?: true
    maxValue?: true
  }

  export type EligibilityRuleSumAggregateInputType = {
    minValue?: true
    maxValue?: true
  }

  export type EligibilityRuleMinAggregateInputType = {
    id?: true
    ruleType?: true
    minValue?: true
    maxValue?: true
    isActive?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type EligibilityRuleMaxAggregateInputType = {
    id?: true
    ruleType?: true
    minValue?: true
    maxValue?: true
    isActive?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type EligibilityRuleCountAggregateInputType = {
    id?: true
    ruleType?: true
    minValue?: true
    maxValue?: true
    isActive?: true
    updatedAt?: true
    updatedBy?: true
    _all?: true
  }

  export type EligibilityRuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EligibilityRule to aggregate.
     */
    where?: EligibilityRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EligibilityRules to fetch.
     */
    orderBy?: EligibilityRuleOrderByWithRelationInput | EligibilityRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EligibilityRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EligibilityRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EligibilityRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EligibilityRules
    **/
    _count?: true | EligibilityRuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EligibilityRuleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EligibilityRuleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EligibilityRuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EligibilityRuleMaxAggregateInputType
  }

  export type GetEligibilityRuleAggregateType<T extends EligibilityRuleAggregateArgs> = {
        [P in keyof T & keyof AggregateEligibilityRule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEligibilityRule[P]>
      : GetScalarType<T[P], AggregateEligibilityRule[P]>
  }




  export type EligibilityRuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EligibilityRuleWhereInput
    orderBy?: EligibilityRuleOrderByWithAggregationInput | EligibilityRuleOrderByWithAggregationInput[]
    by: EligibilityRuleScalarFieldEnum[] | EligibilityRuleScalarFieldEnum
    having?: EligibilityRuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EligibilityRuleCountAggregateInputType | true
    _avg?: EligibilityRuleAvgAggregateInputType
    _sum?: EligibilityRuleSumAggregateInputType
    _min?: EligibilityRuleMinAggregateInputType
    _max?: EligibilityRuleMaxAggregateInputType
  }

  export type EligibilityRuleGroupByOutputType = {
    id: string
    ruleType: string
    minValue: Decimal | null
    maxValue: Decimal | null
    isActive: boolean
    updatedAt: Date
    updatedBy: string | null
    _count: EligibilityRuleCountAggregateOutputType | null
    _avg: EligibilityRuleAvgAggregateOutputType | null
    _sum: EligibilityRuleSumAggregateOutputType | null
    _min: EligibilityRuleMinAggregateOutputType | null
    _max: EligibilityRuleMaxAggregateOutputType | null
  }

  type GetEligibilityRuleGroupByPayload<T extends EligibilityRuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EligibilityRuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EligibilityRuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EligibilityRuleGroupByOutputType[P]>
            : GetScalarType<T[P], EligibilityRuleGroupByOutputType[P]>
        }
      >
    >


  export type EligibilityRuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ruleType?: boolean
    minValue?: boolean
    maxValue?: boolean
    isActive?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
  }, ExtArgs["result"]["eligibilityRule"]>


  export type EligibilityRuleSelectScalar = {
    id?: boolean
    ruleType?: boolean
    minValue?: boolean
    maxValue?: boolean
    isActive?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
  }


  export type $EligibilityRulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EligibilityRule"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ruleType: string
      minValue: Prisma.Decimal | null
      maxValue: Prisma.Decimal | null
      isActive: boolean
      updatedAt: Date
      updatedBy: string | null
    }, ExtArgs["result"]["eligibilityRule"]>
    composites: {}
  }

  type EligibilityRuleGetPayload<S extends boolean | null | undefined | EligibilityRuleDefaultArgs> = $Result.GetResult<Prisma.$EligibilityRulePayload, S>

  type EligibilityRuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EligibilityRuleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EligibilityRuleCountAggregateInputType | true
    }

  export interface EligibilityRuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EligibilityRule'], meta: { name: 'EligibilityRule' } }
    /**
     * Find zero or one EligibilityRule that matches the filter.
     * @param {EligibilityRuleFindUniqueArgs} args - Arguments to find a EligibilityRule
     * @example
     * // Get one EligibilityRule
     * const eligibilityRule = await prisma.eligibilityRule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EligibilityRuleFindUniqueArgs>(args: SelectSubset<T, EligibilityRuleFindUniqueArgs<ExtArgs>>): Prisma__EligibilityRuleClient<$Result.GetResult<Prisma.$EligibilityRulePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one EligibilityRule that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EligibilityRuleFindUniqueOrThrowArgs} args - Arguments to find a EligibilityRule
     * @example
     * // Get one EligibilityRule
     * const eligibilityRule = await prisma.eligibilityRule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EligibilityRuleFindUniqueOrThrowArgs>(args: SelectSubset<T, EligibilityRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EligibilityRuleClient<$Result.GetResult<Prisma.$EligibilityRulePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first EligibilityRule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilityRuleFindFirstArgs} args - Arguments to find a EligibilityRule
     * @example
     * // Get one EligibilityRule
     * const eligibilityRule = await prisma.eligibilityRule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EligibilityRuleFindFirstArgs>(args?: SelectSubset<T, EligibilityRuleFindFirstArgs<ExtArgs>>): Prisma__EligibilityRuleClient<$Result.GetResult<Prisma.$EligibilityRulePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first EligibilityRule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilityRuleFindFirstOrThrowArgs} args - Arguments to find a EligibilityRule
     * @example
     * // Get one EligibilityRule
     * const eligibilityRule = await prisma.eligibilityRule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EligibilityRuleFindFirstOrThrowArgs>(args?: SelectSubset<T, EligibilityRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__EligibilityRuleClient<$Result.GetResult<Prisma.$EligibilityRulePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more EligibilityRules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilityRuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EligibilityRules
     * const eligibilityRules = await prisma.eligibilityRule.findMany()
     * 
     * // Get first 10 EligibilityRules
     * const eligibilityRules = await prisma.eligibilityRule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eligibilityRuleWithIdOnly = await prisma.eligibilityRule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EligibilityRuleFindManyArgs>(args?: SelectSubset<T, EligibilityRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EligibilityRulePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a EligibilityRule.
     * @param {EligibilityRuleCreateArgs} args - Arguments to create a EligibilityRule.
     * @example
     * // Create one EligibilityRule
     * const EligibilityRule = await prisma.eligibilityRule.create({
     *   data: {
     *     // ... data to create a EligibilityRule
     *   }
     * })
     * 
     */
    create<T extends EligibilityRuleCreateArgs>(args: SelectSubset<T, EligibilityRuleCreateArgs<ExtArgs>>): Prisma__EligibilityRuleClient<$Result.GetResult<Prisma.$EligibilityRulePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many EligibilityRules.
     * @param {EligibilityRuleCreateManyArgs} args - Arguments to create many EligibilityRules.
     * @example
     * // Create many EligibilityRules
     * const eligibilityRule = await prisma.eligibilityRule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EligibilityRuleCreateManyArgs>(args?: SelectSubset<T, EligibilityRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a EligibilityRule.
     * @param {EligibilityRuleDeleteArgs} args - Arguments to delete one EligibilityRule.
     * @example
     * // Delete one EligibilityRule
     * const EligibilityRule = await prisma.eligibilityRule.delete({
     *   where: {
     *     // ... filter to delete one EligibilityRule
     *   }
     * })
     * 
     */
    delete<T extends EligibilityRuleDeleteArgs>(args: SelectSubset<T, EligibilityRuleDeleteArgs<ExtArgs>>): Prisma__EligibilityRuleClient<$Result.GetResult<Prisma.$EligibilityRulePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one EligibilityRule.
     * @param {EligibilityRuleUpdateArgs} args - Arguments to update one EligibilityRule.
     * @example
     * // Update one EligibilityRule
     * const eligibilityRule = await prisma.eligibilityRule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EligibilityRuleUpdateArgs>(args: SelectSubset<T, EligibilityRuleUpdateArgs<ExtArgs>>): Prisma__EligibilityRuleClient<$Result.GetResult<Prisma.$EligibilityRulePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more EligibilityRules.
     * @param {EligibilityRuleDeleteManyArgs} args - Arguments to filter EligibilityRules to delete.
     * @example
     * // Delete a few EligibilityRules
     * const { count } = await prisma.eligibilityRule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EligibilityRuleDeleteManyArgs>(args?: SelectSubset<T, EligibilityRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EligibilityRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilityRuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EligibilityRules
     * const eligibilityRule = await prisma.eligibilityRule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EligibilityRuleUpdateManyArgs>(args: SelectSubset<T, EligibilityRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EligibilityRule.
     * @param {EligibilityRuleUpsertArgs} args - Arguments to update or create a EligibilityRule.
     * @example
     * // Update or create a EligibilityRule
     * const eligibilityRule = await prisma.eligibilityRule.upsert({
     *   create: {
     *     // ... data to create a EligibilityRule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EligibilityRule we want to update
     *   }
     * })
     */
    upsert<T extends EligibilityRuleUpsertArgs>(args: SelectSubset<T, EligibilityRuleUpsertArgs<ExtArgs>>): Prisma__EligibilityRuleClient<$Result.GetResult<Prisma.$EligibilityRulePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of EligibilityRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilityRuleCountArgs} args - Arguments to filter EligibilityRules to count.
     * @example
     * // Count the number of EligibilityRules
     * const count = await prisma.eligibilityRule.count({
     *   where: {
     *     // ... the filter for the EligibilityRules we want to count
     *   }
     * })
    **/
    count<T extends EligibilityRuleCountArgs>(
      args?: Subset<T, EligibilityRuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EligibilityRuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EligibilityRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilityRuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EligibilityRuleAggregateArgs>(args: Subset<T, EligibilityRuleAggregateArgs>): Prisma.PrismaPromise<GetEligibilityRuleAggregateType<T>>

    /**
     * Group by EligibilityRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilityRuleGroupByArgs} args - Group by arguments.
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
      T extends EligibilityRuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EligibilityRuleGroupByArgs['orderBy'] }
        : { orderBy?: EligibilityRuleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EligibilityRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEligibilityRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EligibilityRule model
   */
  readonly fields: EligibilityRuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EligibilityRule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EligibilityRuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the EligibilityRule model
   */ 
  interface EligibilityRuleFieldRefs {
    readonly id: FieldRef<"EligibilityRule", 'String'>
    readonly ruleType: FieldRef<"EligibilityRule", 'String'>
    readonly minValue: FieldRef<"EligibilityRule", 'Decimal'>
    readonly maxValue: FieldRef<"EligibilityRule", 'Decimal'>
    readonly isActive: FieldRef<"EligibilityRule", 'Boolean'>
    readonly updatedAt: FieldRef<"EligibilityRule", 'DateTime'>
    readonly updatedBy: FieldRef<"EligibilityRule", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EligibilityRule findUnique
   */
  export type EligibilityRuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilityRule
     */
    select?: EligibilityRuleSelect<ExtArgs> | null
    /**
     * Filter, which EligibilityRule to fetch.
     */
    where: EligibilityRuleWhereUniqueInput
  }

  /**
   * EligibilityRule findUniqueOrThrow
   */
  export type EligibilityRuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilityRule
     */
    select?: EligibilityRuleSelect<ExtArgs> | null
    /**
     * Filter, which EligibilityRule to fetch.
     */
    where: EligibilityRuleWhereUniqueInput
  }

  /**
   * EligibilityRule findFirst
   */
  export type EligibilityRuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilityRule
     */
    select?: EligibilityRuleSelect<ExtArgs> | null
    /**
     * Filter, which EligibilityRule to fetch.
     */
    where?: EligibilityRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EligibilityRules to fetch.
     */
    orderBy?: EligibilityRuleOrderByWithRelationInput | EligibilityRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EligibilityRules.
     */
    cursor?: EligibilityRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EligibilityRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EligibilityRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EligibilityRules.
     */
    distinct?: EligibilityRuleScalarFieldEnum | EligibilityRuleScalarFieldEnum[]
  }

  /**
   * EligibilityRule findFirstOrThrow
   */
  export type EligibilityRuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilityRule
     */
    select?: EligibilityRuleSelect<ExtArgs> | null
    /**
     * Filter, which EligibilityRule to fetch.
     */
    where?: EligibilityRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EligibilityRules to fetch.
     */
    orderBy?: EligibilityRuleOrderByWithRelationInput | EligibilityRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EligibilityRules.
     */
    cursor?: EligibilityRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EligibilityRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EligibilityRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EligibilityRules.
     */
    distinct?: EligibilityRuleScalarFieldEnum | EligibilityRuleScalarFieldEnum[]
  }

  /**
   * EligibilityRule findMany
   */
  export type EligibilityRuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilityRule
     */
    select?: EligibilityRuleSelect<ExtArgs> | null
    /**
     * Filter, which EligibilityRules to fetch.
     */
    where?: EligibilityRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EligibilityRules to fetch.
     */
    orderBy?: EligibilityRuleOrderByWithRelationInput | EligibilityRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EligibilityRules.
     */
    cursor?: EligibilityRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EligibilityRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EligibilityRules.
     */
    skip?: number
    distinct?: EligibilityRuleScalarFieldEnum | EligibilityRuleScalarFieldEnum[]
  }

  /**
   * EligibilityRule create
   */
  export type EligibilityRuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilityRule
     */
    select?: EligibilityRuleSelect<ExtArgs> | null
    /**
     * The data needed to create a EligibilityRule.
     */
    data: XOR<EligibilityRuleCreateInput, EligibilityRuleUncheckedCreateInput>
  }

  /**
   * EligibilityRule createMany
   */
  export type EligibilityRuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EligibilityRules.
     */
    data: EligibilityRuleCreateManyInput | EligibilityRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EligibilityRule update
   */
  export type EligibilityRuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilityRule
     */
    select?: EligibilityRuleSelect<ExtArgs> | null
    /**
     * The data needed to update a EligibilityRule.
     */
    data: XOR<EligibilityRuleUpdateInput, EligibilityRuleUncheckedUpdateInput>
    /**
     * Choose, which EligibilityRule to update.
     */
    where: EligibilityRuleWhereUniqueInput
  }

  /**
   * EligibilityRule updateMany
   */
  export type EligibilityRuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EligibilityRules.
     */
    data: XOR<EligibilityRuleUpdateManyMutationInput, EligibilityRuleUncheckedUpdateManyInput>
    /**
     * Filter which EligibilityRules to update
     */
    where?: EligibilityRuleWhereInput
  }

  /**
   * EligibilityRule upsert
   */
  export type EligibilityRuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilityRule
     */
    select?: EligibilityRuleSelect<ExtArgs> | null
    /**
     * The filter to search for the EligibilityRule to update in case it exists.
     */
    where: EligibilityRuleWhereUniqueInput
    /**
     * In case the EligibilityRule found by the `where` argument doesn't exist, create a new EligibilityRule with this data.
     */
    create: XOR<EligibilityRuleCreateInput, EligibilityRuleUncheckedCreateInput>
    /**
     * In case the EligibilityRule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EligibilityRuleUpdateInput, EligibilityRuleUncheckedUpdateInput>
  }

  /**
   * EligibilityRule delete
   */
  export type EligibilityRuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilityRule
     */
    select?: EligibilityRuleSelect<ExtArgs> | null
    /**
     * Filter which EligibilityRule to delete.
     */
    where: EligibilityRuleWhereUniqueInput
  }

  /**
   * EligibilityRule deleteMany
   */
  export type EligibilityRuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EligibilityRules to delete
     */
    where?: EligibilityRuleWhereInput
  }

  /**
   * EligibilityRule without action
   */
  export type EligibilityRuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilityRule
     */
    select?: EligibilityRuleSelect<ExtArgs> | null
  }


  /**
   * Model EligibilitySubmission
   */

  export type AggregateEligibilitySubmission = {
    _count: EligibilitySubmissionCountAggregateOutputType | null
    _avg: EligibilitySubmissionAvgAggregateOutputType | null
    _sum: EligibilitySubmissionSumAggregateOutputType | null
    _min: EligibilitySubmissionMinAggregateOutputType | null
    _max: EligibilitySubmissionMaxAggregateOutputType | null
  }

  export type EligibilitySubmissionAvgAggregateOutputType = {
    loanAmount: Decimal | null
    monthlyIncome: Decimal | null
    maxLoanAmount: Decimal | null
    interestRate: Decimal | null
  }

  export type EligibilitySubmissionSumAggregateOutputType = {
    loanAmount: Decimal | null
    monthlyIncome: Decimal | null
    maxLoanAmount: Decimal | null
    interestRate: Decimal | null
  }

  export type EligibilitySubmissionMinAggregateOutputType = {
    id: string | null
    fullName: string | null
    mobileNumber: string | null
    loanAmount: Decimal | null
    loanPurpose: string | null
    monthlyIncome: Decimal | null
    employmentType: string | null
    city: string | null
    panNumber: string | null
    isEligible: boolean | null
    maxLoanAmount: Decimal | null
    interestRate: Decimal | null
    remarks: string | null
    assignedConnectorId: string | null
    status: string | null
    submittedAt: Date | null
    updatedAt: Date | null
  }

  export type EligibilitySubmissionMaxAggregateOutputType = {
    id: string | null
    fullName: string | null
    mobileNumber: string | null
    loanAmount: Decimal | null
    loanPurpose: string | null
    monthlyIncome: Decimal | null
    employmentType: string | null
    city: string | null
    panNumber: string | null
    isEligible: boolean | null
    maxLoanAmount: Decimal | null
    interestRate: Decimal | null
    remarks: string | null
    assignedConnectorId: string | null
    status: string | null
    submittedAt: Date | null
    updatedAt: Date | null
  }

  export type EligibilitySubmissionCountAggregateOutputType = {
    id: number
    fullName: number
    mobileNumber: number
    loanAmount: number
    loanPurpose: number
    monthlyIncome: number
    employmentType: number
    city: number
    panNumber: number
    isEligible: number
    maxLoanAmount: number
    interestRate: number
    remarks: number
    assignedConnectorId: number
    status: number
    submittedAt: number
    updatedAt: number
    _all: number
  }


  export type EligibilitySubmissionAvgAggregateInputType = {
    loanAmount?: true
    monthlyIncome?: true
    maxLoanAmount?: true
    interestRate?: true
  }

  export type EligibilitySubmissionSumAggregateInputType = {
    loanAmount?: true
    monthlyIncome?: true
    maxLoanAmount?: true
    interestRate?: true
  }

  export type EligibilitySubmissionMinAggregateInputType = {
    id?: true
    fullName?: true
    mobileNumber?: true
    loanAmount?: true
    loanPurpose?: true
    monthlyIncome?: true
    employmentType?: true
    city?: true
    panNumber?: true
    isEligible?: true
    maxLoanAmount?: true
    interestRate?: true
    remarks?: true
    assignedConnectorId?: true
    status?: true
    submittedAt?: true
    updatedAt?: true
  }

  export type EligibilitySubmissionMaxAggregateInputType = {
    id?: true
    fullName?: true
    mobileNumber?: true
    loanAmount?: true
    loanPurpose?: true
    monthlyIncome?: true
    employmentType?: true
    city?: true
    panNumber?: true
    isEligible?: true
    maxLoanAmount?: true
    interestRate?: true
    remarks?: true
    assignedConnectorId?: true
    status?: true
    submittedAt?: true
    updatedAt?: true
  }

  export type EligibilitySubmissionCountAggregateInputType = {
    id?: true
    fullName?: true
    mobileNumber?: true
    loanAmount?: true
    loanPurpose?: true
    monthlyIncome?: true
    employmentType?: true
    city?: true
    panNumber?: true
    isEligible?: true
    maxLoanAmount?: true
    interestRate?: true
    remarks?: true
    assignedConnectorId?: true
    status?: true
    submittedAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EligibilitySubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EligibilitySubmission to aggregate.
     */
    where?: EligibilitySubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EligibilitySubmissions to fetch.
     */
    orderBy?: EligibilitySubmissionOrderByWithRelationInput | EligibilitySubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EligibilitySubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EligibilitySubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EligibilitySubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EligibilitySubmissions
    **/
    _count?: true | EligibilitySubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EligibilitySubmissionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EligibilitySubmissionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EligibilitySubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EligibilitySubmissionMaxAggregateInputType
  }

  export type GetEligibilitySubmissionAggregateType<T extends EligibilitySubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateEligibilitySubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEligibilitySubmission[P]>
      : GetScalarType<T[P], AggregateEligibilitySubmission[P]>
  }




  export type EligibilitySubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EligibilitySubmissionWhereInput
    orderBy?: EligibilitySubmissionOrderByWithAggregationInput | EligibilitySubmissionOrderByWithAggregationInput[]
    by: EligibilitySubmissionScalarFieldEnum[] | EligibilitySubmissionScalarFieldEnum
    having?: EligibilitySubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EligibilitySubmissionCountAggregateInputType | true
    _avg?: EligibilitySubmissionAvgAggregateInputType
    _sum?: EligibilitySubmissionSumAggregateInputType
    _min?: EligibilitySubmissionMinAggregateInputType
    _max?: EligibilitySubmissionMaxAggregateInputType
  }

  export type EligibilitySubmissionGroupByOutputType = {
    id: string
    fullName: string
    mobileNumber: string
    loanAmount: Decimal | null
    loanPurpose: string | null
    monthlyIncome: Decimal | null
    employmentType: string | null
    city: string | null
    panNumber: string | null
    isEligible: boolean | null
    maxLoanAmount: Decimal | null
    interestRate: Decimal | null
    remarks: string | null
    assignedConnectorId: string | null
    status: string
    submittedAt: Date
    updatedAt: Date
    _count: EligibilitySubmissionCountAggregateOutputType | null
    _avg: EligibilitySubmissionAvgAggregateOutputType | null
    _sum: EligibilitySubmissionSumAggregateOutputType | null
    _min: EligibilitySubmissionMinAggregateOutputType | null
    _max: EligibilitySubmissionMaxAggregateOutputType | null
  }

  type GetEligibilitySubmissionGroupByPayload<T extends EligibilitySubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EligibilitySubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EligibilitySubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EligibilitySubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], EligibilitySubmissionGroupByOutputType[P]>
        }
      >
    >


  export type EligibilitySubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    mobileNumber?: boolean
    loanAmount?: boolean
    loanPurpose?: boolean
    monthlyIncome?: boolean
    employmentType?: boolean
    city?: boolean
    panNumber?: boolean
    isEligible?: boolean
    maxLoanAmount?: boolean
    interestRate?: boolean
    remarks?: boolean
    assignedConnectorId?: boolean
    status?: boolean
    submittedAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["eligibilitySubmission"]>


  export type EligibilitySubmissionSelectScalar = {
    id?: boolean
    fullName?: boolean
    mobileNumber?: boolean
    loanAmount?: boolean
    loanPurpose?: boolean
    monthlyIncome?: boolean
    employmentType?: boolean
    city?: boolean
    panNumber?: boolean
    isEligible?: boolean
    maxLoanAmount?: boolean
    interestRate?: boolean
    remarks?: boolean
    assignedConnectorId?: boolean
    status?: boolean
    submittedAt?: boolean
    updatedAt?: boolean
  }


  export type $EligibilitySubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EligibilitySubmission"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fullName: string
      mobileNumber: string
      loanAmount: Prisma.Decimal | null
      loanPurpose: string | null
      monthlyIncome: Prisma.Decimal | null
      employmentType: string | null
      city: string | null
      panNumber: string | null
      isEligible: boolean | null
      maxLoanAmount: Prisma.Decimal | null
      interestRate: Prisma.Decimal | null
      remarks: string | null
      assignedConnectorId: string | null
      status: string
      submittedAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["eligibilitySubmission"]>
    composites: {}
  }

  type EligibilitySubmissionGetPayload<S extends boolean | null | undefined | EligibilitySubmissionDefaultArgs> = $Result.GetResult<Prisma.$EligibilitySubmissionPayload, S>

  type EligibilitySubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EligibilitySubmissionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EligibilitySubmissionCountAggregateInputType | true
    }

  export interface EligibilitySubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EligibilitySubmission'], meta: { name: 'EligibilitySubmission' } }
    /**
     * Find zero or one EligibilitySubmission that matches the filter.
     * @param {EligibilitySubmissionFindUniqueArgs} args - Arguments to find a EligibilitySubmission
     * @example
     * // Get one EligibilitySubmission
     * const eligibilitySubmission = await prisma.eligibilitySubmission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EligibilitySubmissionFindUniqueArgs>(args: SelectSubset<T, EligibilitySubmissionFindUniqueArgs<ExtArgs>>): Prisma__EligibilitySubmissionClient<$Result.GetResult<Prisma.$EligibilitySubmissionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one EligibilitySubmission that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EligibilitySubmissionFindUniqueOrThrowArgs} args - Arguments to find a EligibilitySubmission
     * @example
     * // Get one EligibilitySubmission
     * const eligibilitySubmission = await prisma.eligibilitySubmission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EligibilitySubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, EligibilitySubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EligibilitySubmissionClient<$Result.GetResult<Prisma.$EligibilitySubmissionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first EligibilitySubmission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilitySubmissionFindFirstArgs} args - Arguments to find a EligibilitySubmission
     * @example
     * // Get one EligibilitySubmission
     * const eligibilitySubmission = await prisma.eligibilitySubmission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EligibilitySubmissionFindFirstArgs>(args?: SelectSubset<T, EligibilitySubmissionFindFirstArgs<ExtArgs>>): Prisma__EligibilitySubmissionClient<$Result.GetResult<Prisma.$EligibilitySubmissionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first EligibilitySubmission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilitySubmissionFindFirstOrThrowArgs} args - Arguments to find a EligibilitySubmission
     * @example
     * // Get one EligibilitySubmission
     * const eligibilitySubmission = await prisma.eligibilitySubmission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EligibilitySubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, EligibilitySubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__EligibilitySubmissionClient<$Result.GetResult<Prisma.$EligibilitySubmissionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more EligibilitySubmissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilitySubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EligibilitySubmissions
     * const eligibilitySubmissions = await prisma.eligibilitySubmission.findMany()
     * 
     * // Get first 10 EligibilitySubmissions
     * const eligibilitySubmissions = await prisma.eligibilitySubmission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eligibilitySubmissionWithIdOnly = await prisma.eligibilitySubmission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EligibilitySubmissionFindManyArgs>(args?: SelectSubset<T, EligibilitySubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EligibilitySubmissionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a EligibilitySubmission.
     * @param {EligibilitySubmissionCreateArgs} args - Arguments to create a EligibilitySubmission.
     * @example
     * // Create one EligibilitySubmission
     * const EligibilitySubmission = await prisma.eligibilitySubmission.create({
     *   data: {
     *     // ... data to create a EligibilitySubmission
     *   }
     * })
     * 
     */
    create<T extends EligibilitySubmissionCreateArgs>(args: SelectSubset<T, EligibilitySubmissionCreateArgs<ExtArgs>>): Prisma__EligibilitySubmissionClient<$Result.GetResult<Prisma.$EligibilitySubmissionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many EligibilitySubmissions.
     * @param {EligibilitySubmissionCreateManyArgs} args - Arguments to create many EligibilitySubmissions.
     * @example
     * // Create many EligibilitySubmissions
     * const eligibilitySubmission = await prisma.eligibilitySubmission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EligibilitySubmissionCreateManyArgs>(args?: SelectSubset<T, EligibilitySubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a EligibilitySubmission.
     * @param {EligibilitySubmissionDeleteArgs} args - Arguments to delete one EligibilitySubmission.
     * @example
     * // Delete one EligibilitySubmission
     * const EligibilitySubmission = await prisma.eligibilitySubmission.delete({
     *   where: {
     *     // ... filter to delete one EligibilitySubmission
     *   }
     * })
     * 
     */
    delete<T extends EligibilitySubmissionDeleteArgs>(args: SelectSubset<T, EligibilitySubmissionDeleteArgs<ExtArgs>>): Prisma__EligibilitySubmissionClient<$Result.GetResult<Prisma.$EligibilitySubmissionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one EligibilitySubmission.
     * @param {EligibilitySubmissionUpdateArgs} args - Arguments to update one EligibilitySubmission.
     * @example
     * // Update one EligibilitySubmission
     * const eligibilitySubmission = await prisma.eligibilitySubmission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EligibilitySubmissionUpdateArgs>(args: SelectSubset<T, EligibilitySubmissionUpdateArgs<ExtArgs>>): Prisma__EligibilitySubmissionClient<$Result.GetResult<Prisma.$EligibilitySubmissionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more EligibilitySubmissions.
     * @param {EligibilitySubmissionDeleteManyArgs} args - Arguments to filter EligibilitySubmissions to delete.
     * @example
     * // Delete a few EligibilitySubmissions
     * const { count } = await prisma.eligibilitySubmission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EligibilitySubmissionDeleteManyArgs>(args?: SelectSubset<T, EligibilitySubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EligibilitySubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilitySubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EligibilitySubmissions
     * const eligibilitySubmission = await prisma.eligibilitySubmission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EligibilitySubmissionUpdateManyArgs>(args: SelectSubset<T, EligibilitySubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EligibilitySubmission.
     * @param {EligibilitySubmissionUpsertArgs} args - Arguments to update or create a EligibilitySubmission.
     * @example
     * // Update or create a EligibilitySubmission
     * const eligibilitySubmission = await prisma.eligibilitySubmission.upsert({
     *   create: {
     *     // ... data to create a EligibilitySubmission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EligibilitySubmission we want to update
     *   }
     * })
     */
    upsert<T extends EligibilitySubmissionUpsertArgs>(args: SelectSubset<T, EligibilitySubmissionUpsertArgs<ExtArgs>>): Prisma__EligibilitySubmissionClient<$Result.GetResult<Prisma.$EligibilitySubmissionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of EligibilitySubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilitySubmissionCountArgs} args - Arguments to filter EligibilitySubmissions to count.
     * @example
     * // Count the number of EligibilitySubmissions
     * const count = await prisma.eligibilitySubmission.count({
     *   where: {
     *     // ... the filter for the EligibilitySubmissions we want to count
     *   }
     * })
    **/
    count<T extends EligibilitySubmissionCountArgs>(
      args?: Subset<T, EligibilitySubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EligibilitySubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EligibilitySubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilitySubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EligibilitySubmissionAggregateArgs>(args: Subset<T, EligibilitySubmissionAggregateArgs>): Prisma.PrismaPromise<GetEligibilitySubmissionAggregateType<T>>

    /**
     * Group by EligibilitySubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilitySubmissionGroupByArgs} args - Group by arguments.
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
      T extends EligibilitySubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EligibilitySubmissionGroupByArgs['orderBy'] }
        : { orderBy?: EligibilitySubmissionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EligibilitySubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEligibilitySubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EligibilitySubmission model
   */
  readonly fields: EligibilitySubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EligibilitySubmission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EligibilitySubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the EligibilitySubmission model
   */ 
  interface EligibilitySubmissionFieldRefs {
    readonly id: FieldRef<"EligibilitySubmission", 'String'>
    readonly fullName: FieldRef<"EligibilitySubmission", 'String'>
    readonly mobileNumber: FieldRef<"EligibilitySubmission", 'String'>
    readonly loanAmount: FieldRef<"EligibilitySubmission", 'Decimal'>
    readonly loanPurpose: FieldRef<"EligibilitySubmission", 'String'>
    readonly monthlyIncome: FieldRef<"EligibilitySubmission", 'Decimal'>
    readonly employmentType: FieldRef<"EligibilitySubmission", 'String'>
    readonly city: FieldRef<"EligibilitySubmission", 'String'>
    readonly panNumber: FieldRef<"EligibilitySubmission", 'String'>
    readonly isEligible: FieldRef<"EligibilitySubmission", 'Boolean'>
    readonly maxLoanAmount: FieldRef<"EligibilitySubmission", 'Decimal'>
    readonly interestRate: FieldRef<"EligibilitySubmission", 'Decimal'>
    readonly remarks: FieldRef<"EligibilitySubmission", 'String'>
    readonly assignedConnectorId: FieldRef<"EligibilitySubmission", 'String'>
    readonly status: FieldRef<"EligibilitySubmission", 'String'>
    readonly submittedAt: FieldRef<"EligibilitySubmission", 'DateTime'>
    readonly updatedAt: FieldRef<"EligibilitySubmission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EligibilitySubmission findUnique
   */
  export type EligibilitySubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilitySubmission
     */
    select?: EligibilitySubmissionSelect<ExtArgs> | null
    /**
     * Filter, which EligibilitySubmission to fetch.
     */
    where: EligibilitySubmissionWhereUniqueInput
  }

  /**
   * EligibilitySubmission findUniqueOrThrow
   */
  export type EligibilitySubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilitySubmission
     */
    select?: EligibilitySubmissionSelect<ExtArgs> | null
    /**
     * Filter, which EligibilitySubmission to fetch.
     */
    where: EligibilitySubmissionWhereUniqueInput
  }

  /**
   * EligibilitySubmission findFirst
   */
  export type EligibilitySubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilitySubmission
     */
    select?: EligibilitySubmissionSelect<ExtArgs> | null
    /**
     * Filter, which EligibilitySubmission to fetch.
     */
    where?: EligibilitySubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EligibilitySubmissions to fetch.
     */
    orderBy?: EligibilitySubmissionOrderByWithRelationInput | EligibilitySubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EligibilitySubmissions.
     */
    cursor?: EligibilitySubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EligibilitySubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EligibilitySubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EligibilitySubmissions.
     */
    distinct?: EligibilitySubmissionScalarFieldEnum | EligibilitySubmissionScalarFieldEnum[]
  }

  /**
   * EligibilitySubmission findFirstOrThrow
   */
  export type EligibilitySubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilitySubmission
     */
    select?: EligibilitySubmissionSelect<ExtArgs> | null
    /**
     * Filter, which EligibilitySubmission to fetch.
     */
    where?: EligibilitySubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EligibilitySubmissions to fetch.
     */
    orderBy?: EligibilitySubmissionOrderByWithRelationInput | EligibilitySubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EligibilitySubmissions.
     */
    cursor?: EligibilitySubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EligibilitySubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EligibilitySubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EligibilitySubmissions.
     */
    distinct?: EligibilitySubmissionScalarFieldEnum | EligibilitySubmissionScalarFieldEnum[]
  }

  /**
   * EligibilitySubmission findMany
   */
  export type EligibilitySubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilitySubmission
     */
    select?: EligibilitySubmissionSelect<ExtArgs> | null
    /**
     * Filter, which EligibilitySubmissions to fetch.
     */
    where?: EligibilitySubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EligibilitySubmissions to fetch.
     */
    orderBy?: EligibilitySubmissionOrderByWithRelationInput | EligibilitySubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EligibilitySubmissions.
     */
    cursor?: EligibilitySubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EligibilitySubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EligibilitySubmissions.
     */
    skip?: number
    distinct?: EligibilitySubmissionScalarFieldEnum | EligibilitySubmissionScalarFieldEnum[]
  }

  /**
   * EligibilitySubmission create
   */
  export type EligibilitySubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilitySubmission
     */
    select?: EligibilitySubmissionSelect<ExtArgs> | null
    /**
     * The data needed to create a EligibilitySubmission.
     */
    data: XOR<EligibilitySubmissionCreateInput, EligibilitySubmissionUncheckedCreateInput>
  }

  /**
   * EligibilitySubmission createMany
   */
  export type EligibilitySubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EligibilitySubmissions.
     */
    data: EligibilitySubmissionCreateManyInput | EligibilitySubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EligibilitySubmission update
   */
  export type EligibilitySubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilitySubmission
     */
    select?: EligibilitySubmissionSelect<ExtArgs> | null
    /**
     * The data needed to update a EligibilitySubmission.
     */
    data: XOR<EligibilitySubmissionUpdateInput, EligibilitySubmissionUncheckedUpdateInput>
    /**
     * Choose, which EligibilitySubmission to update.
     */
    where: EligibilitySubmissionWhereUniqueInput
  }

  /**
   * EligibilitySubmission updateMany
   */
  export type EligibilitySubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EligibilitySubmissions.
     */
    data: XOR<EligibilitySubmissionUpdateManyMutationInput, EligibilitySubmissionUncheckedUpdateManyInput>
    /**
     * Filter which EligibilitySubmissions to update
     */
    where?: EligibilitySubmissionWhereInput
  }

  /**
   * EligibilitySubmission upsert
   */
  export type EligibilitySubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilitySubmission
     */
    select?: EligibilitySubmissionSelect<ExtArgs> | null
    /**
     * The filter to search for the EligibilitySubmission to update in case it exists.
     */
    where: EligibilitySubmissionWhereUniqueInput
    /**
     * In case the EligibilitySubmission found by the `where` argument doesn't exist, create a new EligibilitySubmission with this data.
     */
    create: XOR<EligibilitySubmissionCreateInput, EligibilitySubmissionUncheckedCreateInput>
    /**
     * In case the EligibilitySubmission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EligibilitySubmissionUpdateInput, EligibilitySubmissionUncheckedUpdateInput>
  }

  /**
   * EligibilitySubmission delete
   */
  export type EligibilitySubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilitySubmission
     */
    select?: EligibilitySubmissionSelect<ExtArgs> | null
    /**
     * Filter which EligibilitySubmission to delete.
     */
    where: EligibilitySubmissionWhereUniqueInput
  }

  /**
   * EligibilitySubmission deleteMany
   */
  export type EligibilitySubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EligibilitySubmissions to delete
     */
    where?: EligibilitySubmissionWhereInput
  }

  /**
   * EligibilitySubmission without action
   */
  export type EligibilitySubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilitySubmission
     */
    select?: EligibilitySubmissionSelect<ExtArgs> | null
  }


  /**
   * Model BankPolicy
   */

  export type AggregateBankPolicy = {
    _count: BankPolicyCountAggregateOutputType | null
    _min: BankPolicyMinAggregateOutputType | null
    _max: BankPolicyMaxAggregateOutputType | null
  }

  export type BankPolicyMinAggregateOutputType = {
    id: string | null
    bankName: string | null
    policyVersion: string | null
    effectiveFrom: Date | null
    effectiveTo: Date | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
  }

  export type BankPolicyMaxAggregateOutputType = {
    id: string | null
    bankName: string | null
    policyVersion: string | null
    effectiveFrom: Date | null
    effectiveTo: Date | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
  }

  export type BankPolicyCountAggregateOutputType = {
    id: number
    bankName: number
    policyVersion: number
    effectiveFrom: number
    effectiveTo: number
    status: number
    createdAt: number
    updatedAt: number
    createdBy: number
    updatedBy: number
    _all: number
  }


  export type BankPolicyMinAggregateInputType = {
    id?: true
    bankName?: true
    policyVersion?: true
    effectiveFrom?: true
    effectiveTo?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
  }

  export type BankPolicyMaxAggregateInputType = {
    id?: true
    bankName?: true
    policyVersion?: true
    effectiveFrom?: true
    effectiveTo?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
  }

  export type BankPolicyCountAggregateInputType = {
    id?: true
    bankName?: true
    policyVersion?: true
    effectiveFrom?: true
    effectiveTo?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
    _all?: true
  }

  export type BankPolicyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BankPolicy to aggregate.
     */
    where?: BankPolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankPolicies to fetch.
     */
    orderBy?: BankPolicyOrderByWithRelationInput | BankPolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BankPolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankPolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankPolicies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BankPolicies
    **/
    _count?: true | BankPolicyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BankPolicyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BankPolicyMaxAggregateInputType
  }

  export type GetBankPolicyAggregateType<T extends BankPolicyAggregateArgs> = {
        [P in keyof T & keyof AggregateBankPolicy]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBankPolicy[P]>
      : GetScalarType<T[P], AggregateBankPolicy[P]>
  }




  export type BankPolicyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BankPolicyWhereInput
    orderBy?: BankPolicyOrderByWithAggregationInput | BankPolicyOrderByWithAggregationInput[]
    by: BankPolicyScalarFieldEnum[] | BankPolicyScalarFieldEnum
    having?: BankPolicyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BankPolicyCountAggregateInputType | true
    _min?: BankPolicyMinAggregateInputType
    _max?: BankPolicyMaxAggregateInputType
  }

  export type BankPolicyGroupByOutputType = {
    id: string
    bankName: string
    policyVersion: string
    effectiveFrom: Date
    effectiveTo: Date | null
    status: string
    createdAt: Date
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
    _count: BankPolicyCountAggregateOutputType | null
    _min: BankPolicyMinAggregateOutputType | null
    _max: BankPolicyMaxAggregateOutputType | null
  }

  type GetBankPolicyGroupByPayload<T extends BankPolicyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BankPolicyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BankPolicyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BankPolicyGroupByOutputType[P]>
            : GetScalarType<T[P], BankPolicyGroupByOutputType[P]>
        }
      >
    >


  export type BankPolicySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bankName?: boolean
    policyVersion?: boolean
    effectiveFrom?: boolean
    effectiveTo?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    rules?: boolean | BankPolicy$rulesArgs<ExtArgs>
    _count?: boolean | BankPolicyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bankPolicy"]>


  export type BankPolicySelectScalar = {
    id?: boolean
    bankName?: boolean
    policyVersion?: boolean
    effectiveFrom?: boolean
    effectiveTo?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
  }

  export type BankPolicyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rules?: boolean | BankPolicy$rulesArgs<ExtArgs>
    _count?: boolean | BankPolicyCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $BankPolicyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BankPolicy"
    objects: {
      rules: Prisma.$PolicyRulePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bankName: string
      policyVersion: string
      effectiveFrom: Date
      effectiveTo: Date | null
      status: string
      createdAt: Date
      updatedAt: Date | null
      createdBy: string | null
      updatedBy: string | null
    }, ExtArgs["result"]["bankPolicy"]>
    composites: {}
  }

  type BankPolicyGetPayload<S extends boolean | null | undefined | BankPolicyDefaultArgs> = $Result.GetResult<Prisma.$BankPolicyPayload, S>

  type BankPolicyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BankPolicyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BankPolicyCountAggregateInputType | true
    }

  export interface BankPolicyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BankPolicy'], meta: { name: 'BankPolicy' } }
    /**
     * Find zero or one BankPolicy that matches the filter.
     * @param {BankPolicyFindUniqueArgs} args - Arguments to find a BankPolicy
     * @example
     * // Get one BankPolicy
     * const bankPolicy = await prisma.bankPolicy.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BankPolicyFindUniqueArgs>(args: SelectSubset<T, BankPolicyFindUniqueArgs<ExtArgs>>): Prisma__BankPolicyClient<$Result.GetResult<Prisma.$BankPolicyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BankPolicy that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BankPolicyFindUniqueOrThrowArgs} args - Arguments to find a BankPolicy
     * @example
     * // Get one BankPolicy
     * const bankPolicy = await prisma.bankPolicy.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BankPolicyFindUniqueOrThrowArgs>(args: SelectSubset<T, BankPolicyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BankPolicyClient<$Result.GetResult<Prisma.$BankPolicyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BankPolicy that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankPolicyFindFirstArgs} args - Arguments to find a BankPolicy
     * @example
     * // Get one BankPolicy
     * const bankPolicy = await prisma.bankPolicy.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BankPolicyFindFirstArgs>(args?: SelectSubset<T, BankPolicyFindFirstArgs<ExtArgs>>): Prisma__BankPolicyClient<$Result.GetResult<Prisma.$BankPolicyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BankPolicy that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankPolicyFindFirstOrThrowArgs} args - Arguments to find a BankPolicy
     * @example
     * // Get one BankPolicy
     * const bankPolicy = await prisma.bankPolicy.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BankPolicyFindFirstOrThrowArgs>(args?: SelectSubset<T, BankPolicyFindFirstOrThrowArgs<ExtArgs>>): Prisma__BankPolicyClient<$Result.GetResult<Prisma.$BankPolicyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BankPolicies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankPolicyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BankPolicies
     * const bankPolicies = await prisma.bankPolicy.findMany()
     * 
     * // Get first 10 BankPolicies
     * const bankPolicies = await prisma.bankPolicy.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bankPolicyWithIdOnly = await prisma.bankPolicy.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BankPolicyFindManyArgs>(args?: SelectSubset<T, BankPolicyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BankPolicyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BankPolicy.
     * @param {BankPolicyCreateArgs} args - Arguments to create a BankPolicy.
     * @example
     * // Create one BankPolicy
     * const BankPolicy = await prisma.bankPolicy.create({
     *   data: {
     *     // ... data to create a BankPolicy
     *   }
     * })
     * 
     */
    create<T extends BankPolicyCreateArgs>(args: SelectSubset<T, BankPolicyCreateArgs<ExtArgs>>): Prisma__BankPolicyClient<$Result.GetResult<Prisma.$BankPolicyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BankPolicies.
     * @param {BankPolicyCreateManyArgs} args - Arguments to create many BankPolicies.
     * @example
     * // Create many BankPolicies
     * const bankPolicy = await prisma.bankPolicy.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BankPolicyCreateManyArgs>(args?: SelectSubset<T, BankPolicyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a BankPolicy.
     * @param {BankPolicyDeleteArgs} args - Arguments to delete one BankPolicy.
     * @example
     * // Delete one BankPolicy
     * const BankPolicy = await prisma.bankPolicy.delete({
     *   where: {
     *     // ... filter to delete one BankPolicy
     *   }
     * })
     * 
     */
    delete<T extends BankPolicyDeleteArgs>(args: SelectSubset<T, BankPolicyDeleteArgs<ExtArgs>>): Prisma__BankPolicyClient<$Result.GetResult<Prisma.$BankPolicyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BankPolicy.
     * @param {BankPolicyUpdateArgs} args - Arguments to update one BankPolicy.
     * @example
     * // Update one BankPolicy
     * const bankPolicy = await prisma.bankPolicy.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BankPolicyUpdateArgs>(args: SelectSubset<T, BankPolicyUpdateArgs<ExtArgs>>): Prisma__BankPolicyClient<$Result.GetResult<Prisma.$BankPolicyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BankPolicies.
     * @param {BankPolicyDeleteManyArgs} args - Arguments to filter BankPolicies to delete.
     * @example
     * // Delete a few BankPolicies
     * const { count } = await prisma.bankPolicy.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BankPolicyDeleteManyArgs>(args?: SelectSubset<T, BankPolicyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BankPolicies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankPolicyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BankPolicies
     * const bankPolicy = await prisma.bankPolicy.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BankPolicyUpdateManyArgs>(args: SelectSubset<T, BankPolicyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BankPolicy.
     * @param {BankPolicyUpsertArgs} args - Arguments to update or create a BankPolicy.
     * @example
     * // Update or create a BankPolicy
     * const bankPolicy = await prisma.bankPolicy.upsert({
     *   create: {
     *     // ... data to create a BankPolicy
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BankPolicy we want to update
     *   }
     * })
     */
    upsert<T extends BankPolicyUpsertArgs>(args: SelectSubset<T, BankPolicyUpsertArgs<ExtArgs>>): Prisma__BankPolicyClient<$Result.GetResult<Prisma.$BankPolicyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BankPolicies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankPolicyCountArgs} args - Arguments to filter BankPolicies to count.
     * @example
     * // Count the number of BankPolicies
     * const count = await prisma.bankPolicy.count({
     *   where: {
     *     // ... the filter for the BankPolicies we want to count
     *   }
     * })
    **/
    count<T extends BankPolicyCountArgs>(
      args?: Subset<T, BankPolicyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BankPolicyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BankPolicy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankPolicyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BankPolicyAggregateArgs>(args: Subset<T, BankPolicyAggregateArgs>): Prisma.PrismaPromise<GetBankPolicyAggregateType<T>>

    /**
     * Group by BankPolicy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankPolicyGroupByArgs} args - Group by arguments.
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
      T extends BankPolicyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BankPolicyGroupByArgs['orderBy'] }
        : { orderBy?: BankPolicyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BankPolicyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBankPolicyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BankPolicy model
   */
  readonly fields: BankPolicyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BankPolicy.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BankPolicyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rules<T extends BankPolicy$rulesArgs<ExtArgs> = {}>(args?: Subset<T, BankPolicy$rulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PolicyRulePayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the BankPolicy model
   */ 
  interface BankPolicyFieldRefs {
    readonly id: FieldRef<"BankPolicy", 'String'>
    readonly bankName: FieldRef<"BankPolicy", 'String'>
    readonly policyVersion: FieldRef<"BankPolicy", 'String'>
    readonly effectiveFrom: FieldRef<"BankPolicy", 'DateTime'>
    readonly effectiveTo: FieldRef<"BankPolicy", 'DateTime'>
    readonly status: FieldRef<"BankPolicy", 'String'>
    readonly createdAt: FieldRef<"BankPolicy", 'DateTime'>
    readonly updatedAt: FieldRef<"BankPolicy", 'DateTime'>
    readonly createdBy: FieldRef<"BankPolicy", 'String'>
    readonly updatedBy: FieldRef<"BankPolicy", 'String'>
  }
    

  // Custom InputTypes
  /**
   * BankPolicy findUnique
   */
  export type BankPolicyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankPolicy
     */
    select?: BankPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankPolicyInclude<ExtArgs> | null
    /**
     * Filter, which BankPolicy to fetch.
     */
    where: BankPolicyWhereUniqueInput
  }

  /**
   * BankPolicy findUniqueOrThrow
   */
  export type BankPolicyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankPolicy
     */
    select?: BankPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankPolicyInclude<ExtArgs> | null
    /**
     * Filter, which BankPolicy to fetch.
     */
    where: BankPolicyWhereUniqueInput
  }

  /**
   * BankPolicy findFirst
   */
  export type BankPolicyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankPolicy
     */
    select?: BankPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankPolicyInclude<ExtArgs> | null
    /**
     * Filter, which BankPolicy to fetch.
     */
    where?: BankPolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankPolicies to fetch.
     */
    orderBy?: BankPolicyOrderByWithRelationInput | BankPolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BankPolicies.
     */
    cursor?: BankPolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankPolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankPolicies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BankPolicies.
     */
    distinct?: BankPolicyScalarFieldEnum | BankPolicyScalarFieldEnum[]
  }

  /**
   * BankPolicy findFirstOrThrow
   */
  export type BankPolicyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankPolicy
     */
    select?: BankPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankPolicyInclude<ExtArgs> | null
    /**
     * Filter, which BankPolicy to fetch.
     */
    where?: BankPolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankPolicies to fetch.
     */
    orderBy?: BankPolicyOrderByWithRelationInput | BankPolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BankPolicies.
     */
    cursor?: BankPolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankPolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankPolicies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BankPolicies.
     */
    distinct?: BankPolicyScalarFieldEnum | BankPolicyScalarFieldEnum[]
  }

  /**
   * BankPolicy findMany
   */
  export type BankPolicyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankPolicy
     */
    select?: BankPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankPolicyInclude<ExtArgs> | null
    /**
     * Filter, which BankPolicies to fetch.
     */
    where?: BankPolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankPolicies to fetch.
     */
    orderBy?: BankPolicyOrderByWithRelationInput | BankPolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BankPolicies.
     */
    cursor?: BankPolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankPolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankPolicies.
     */
    skip?: number
    distinct?: BankPolicyScalarFieldEnum | BankPolicyScalarFieldEnum[]
  }

  /**
   * BankPolicy create
   */
  export type BankPolicyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankPolicy
     */
    select?: BankPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankPolicyInclude<ExtArgs> | null
    /**
     * The data needed to create a BankPolicy.
     */
    data: XOR<BankPolicyCreateInput, BankPolicyUncheckedCreateInput>
  }

  /**
   * BankPolicy createMany
   */
  export type BankPolicyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BankPolicies.
     */
    data: BankPolicyCreateManyInput | BankPolicyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BankPolicy update
   */
  export type BankPolicyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankPolicy
     */
    select?: BankPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankPolicyInclude<ExtArgs> | null
    /**
     * The data needed to update a BankPolicy.
     */
    data: XOR<BankPolicyUpdateInput, BankPolicyUncheckedUpdateInput>
    /**
     * Choose, which BankPolicy to update.
     */
    where: BankPolicyWhereUniqueInput
  }

  /**
   * BankPolicy updateMany
   */
  export type BankPolicyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BankPolicies.
     */
    data: XOR<BankPolicyUpdateManyMutationInput, BankPolicyUncheckedUpdateManyInput>
    /**
     * Filter which BankPolicies to update
     */
    where?: BankPolicyWhereInput
  }

  /**
   * BankPolicy upsert
   */
  export type BankPolicyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankPolicy
     */
    select?: BankPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankPolicyInclude<ExtArgs> | null
    /**
     * The filter to search for the BankPolicy to update in case it exists.
     */
    where: BankPolicyWhereUniqueInput
    /**
     * In case the BankPolicy found by the `where` argument doesn't exist, create a new BankPolicy with this data.
     */
    create: XOR<BankPolicyCreateInput, BankPolicyUncheckedCreateInput>
    /**
     * In case the BankPolicy was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BankPolicyUpdateInput, BankPolicyUncheckedUpdateInput>
  }

  /**
   * BankPolicy delete
   */
  export type BankPolicyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankPolicy
     */
    select?: BankPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankPolicyInclude<ExtArgs> | null
    /**
     * Filter which BankPolicy to delete.
     */
    where: BankPolicyWhereUniqueInput
  }

  /**
   * BankPolicy deleteMany
   */
  export type BankPolicyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BankPolicies to delete
     */
    where?: BankPolicyWhereInput
  }

  /**
   * BankPolicy.rules
   */
  export type BankPolicy$rulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyRule
     */
    select?: PolicyRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyRuleInclude<ExtArgs> | null
    where?: PolicyRuleWhereInput
    orderBy?: PolicyRuleOrderByWithRelationInput | PolicyRuleOrderByWithRelationInput[]
    cursor?: PolicyRuleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PolicyRuleScalarFieldEnum | PolicyRuleScalarFieldEnum[]
  }

  /**
   * BankPolicy without action
   */
  export type BankPolicyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankPolicy
     */
    select?: BankPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankPolicyInclude<ExtArgs> | null
  }


  /**
   * Model PolicyRule
   */

  export type AggregatePolicyRule = {
    _count: PolicyRuleCountAggregateOutputType | null
    _min: PolicyRuleMinAggregateOutputType | null
    _max: PolicyRuleMaxAggregateOutputType | null
  }

  export type PolicyRuleMinAggregateOutputType = {
    id: string | null
    policyId: string | null
    ruleCategory: string | null
    ruleKey: string | null
  }

  export type PolicyRuleMaxAggregateOutputType = {
    id: string | null
    policyId: string | null
    ruleCategory: string | null
    ruleKey: string | null
  }

  export type PolicyRuleCountAggregateOutputType = {
    id: number
    policyId: number
    ruleCategory: number
    ruleKey: number
    ruleValue: number
    _all: number
  }


  export type PolicyRuleMinAggregateInputType = {
    id?: true
    policyId?: true
    ruleCategory?: true
    ruleKey?: true
  }

  export type PolicyRuleMaxAggregateInputType = {
    id?: true
    policyId?: true
    ruleCategory?: true
    ruleKey?: true
  }

  export type PolicyRuleCountAggregateInputType = {
    id?: true
    policyId?: true
    ruleCategory?: true
    ruleKey?: true
    ruleValue?: true
    _all?: true
  }

  export type PolicyRuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PolicyRule to aggregate.
     */
    where?: PolicyRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PolicyRules to fetch.
     */
    orderBy?: PolicyRuleOrderByWithRelationInput | PolicyRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PolicyRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PolicyRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PolicyRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PolicyRules
    **/
    _count?: true | PolicyRuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PolicyRuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PolicyRuleMaxAggregateInputType
  }

  export type GetPolicyRuleAggregateType<T extends PolicyRuleAggregateArgs> = {
        [P in keyof T & keyof AggregatePolicyRule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePolicyRule[P]>
      : GetScalarType<T[P], AggregatePolicyRule[P]>
  }




  export type PolicyRuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PolicyRuleWhereInput
    orderBy?: PolicyRuleOrderByWithAggregationInput | PolicyRuleOrderByWithAggregationInput[]
    by: PolicyRuleScalarFieldEnum[] | PolicyRuleScalarFieldEnum
    having?: PolicyRuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PolicyRuleCountAggregateInputType | true
    _min?: PolicyRuleMinAggregateInputType
    _max?: PolicyRuleMaxAggregateInputType
  }

  export type PolicyRuleGroupByOutputType = {
    id: string
    policyId: string | null
    ruleCategory: string
    ruleKey: string
    ruleValue: JsonValue
    _count: PolicyRuleCountAggregateOutputType | null
    _min: PolicyRuleMinAggregateOutputType | null
    _max: PolicyRuleMaxAggregateOutputType | null
  }

  type GetPolicyRuleGroupByPayload<T extends PolicyRuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PolicyRuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PolicyRuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PolicyRuleGroupByOutputType[P]>
            : GetScalarType<T[P], PolicyRuleGroupByOutputType[P]>
        }
      >
    >


  export type PolicyRuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    policyId?: boolean
    ruleCategory?: boolean
    ruleKey?: boolean
    ruleValue?: boolean
    policy?: boolean | PolicyRule$policyArgs<ExtArgs>
  }, ExtArgs["result"]["policyRule"]>


  export type PolicyRuleSelectScalar = {
    id?: boolean
    policyId?: boolean
    ruleCategory?: boolean
    ruleKey?: boolean
    ruleValue?: boolean
  }

  export type PolicyRuleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    policy?: boolean | PolicyRule$policyArgs<ExtArgs>
  }

  export type $PolicyRulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PolicyRule"
    objects: {
      policy: Prisma.$BankPolicyPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      policyId: string | null
      ruleCategory: string
      ruleKey: string
      ruleValue: Prisma.JsonValue
    }, ExtArgs["result"]["policyRule"]>
    composites: {}
  }

  type PolicyRuleGetPayload<S extends boolean | null | undefined | PolicyRuleDefaultArgs> = $Result.GetResult<Prisma.$PolicyRulePayload, S>

  type PolicyRuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PolicyRuleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PolicyRuleCountAggregateInputType | true
    }

  export interface PolicyRuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PolicyRule'], meta: { name: 'PolicyRule' } }
    /**
     * Find zero or one PolicyRule that matches the filter.
     * @param {PolicyRuleFindUniqueArgs} args - Arguments to find a PolicyRule
     * @example
     * // Get one PolicyRule
     * const policyRule = await prisma.policyRule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PolicyRuleFindUniqueArgs>(args: SelectSubset<T, PolicyRuleFindUniqueArgs<ExtArgs>>): Prisma__PolicyRuleClient<$Result.GetResult<Prisma.$PolicyRulePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PolicyRule that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PolicyRuleFindUniqueOrThrowArgs} args - Arguments to find a PolicyRule
     * @example
     * // Get one PolicyRule
     * const policyRule = await prisma.policyRule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PolicyRuleFindUniqueOrThrowArgs>(args: SelectSubset<T, PolicyRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PolicyRuleClient<$Result.GetResult<Prisma.$PolicyRulePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PolicyRule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyRuleFindFirstArgs} args - Arguments to find a PolicyRule
     * @example
     * // Get one PolicyRule
     * const policyRule = await prisma.policyRule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PolicyRuleFindFirstArgs>(args?: SelectSubset<T, PolicyRuleFindFirstArgs<ExtArgs>>): Prisma__PolicyRuleClient<$Result.GetResult<Prisma.$PolicyRulePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PolicyRule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyRuleFindFirstOrThrowArgs} args - Arguments to find a PolicyRule
     * @example
     * // Get one PolicyRule
     * const policyRule = await prisma.policyRule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PolicyRuleFindFirstOrThrowArgs>(args?: SelectSubset<T, PolicyRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__PolicyRuleClient<$Result.GetResult<Prisma.$PolicyRulePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PolicyRules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyRuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PolicyRules
     * const policyRules = await prisma.policyRule.findMany()
     * 
     * // Get first 10 PolicyRules
     * const policyRules = await prisma.policyRule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const policyRuleWithIdOnly = await prisma.policyRule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PolicyRuleFindManyArgs>(args?: SelectSubset<T, PolicyRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PolicyRulePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PolicyRule.
     * @param {PolicyRuleCreateArgs} args - Arguments to create a PolicyRule.
     * @example
     * // Create one PolicyRule
     * const PolicyRule = await prisma.policyRule.create({
     *   data: {
     *     // ... data to create a PolicyRule
     *   }
     * })
     * 
     */
    create<T extends PolicyRuleCreateArgs>(args: SelectSubset<T, PolicyRuleCreateArgs<ExtArgs>>): Prisma__PolicyRuleClient<$Result.GetResult<Prisma.$PolicyRulePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PolicyRules.
     * @param {PolicyRuleCreateManyArgs} args - Arguments to create many PolicyRules.
     * @example
     * // Create many PolicyRules
     * const policyRule = await prisma.policyRule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PolicyRuleCreateManyArgs>(args?: SelectSubset<T, PolicyRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PolicyRule.
     * @param {PolicyRuleDeleteArgs} args - Arguments to delete one PolicyRule.
     * @example
     * // Delete one PolicyRule
     * const PolicyRule = await prisma.policyRule.delete({
     *   where: {
     *     // ... filter to delete one PolicyRule
     *   }
     * })
     * 
     */
    delete<T extends PolicyRuleDeleteArgs>(args: SelectSubset<T, PolicyRuleDeleteArgs<ExtArgs>>): Prisma__PolicyRuleClient<$Result.GetResult<Prisma.$PolicyRulePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PolicyRule.
     * @param {PolicyRuleUpdateArgs} args - Arguments to update one PolicyRule.
     * @example
     * // Update one PolicyRule
     * const policyRule = await prisma.policyRule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PolicyRuleUpdateArgs>(args: SelectSubset<T, PolicyRuleUpdateArgs<ExtArgs>>): Prisma__PolicyRuleClient<$Result.GetResult<Prisma.$PolicyRulePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PolicyRules.
     * @param {PolicyRuleDeleteManyArgs} args - Arguments to filter PolicyRules to delete.
     * @example
     * // Delete a few PolicyRules
     * const { count } = await prisma.policyRule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PolicyRuleDeleteManyArgs>(args?: SelectSubset<T, PolicyRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PolicyRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyRuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PolicyRules
     * const policyRule = await prisma.policyRule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PolicyRuleUpdateManyArgs>(args: SelectSubset<T, PolicyRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PolicyRule.
     * @param {PolicyRuleUpsertArgs} args - Arguments to update or create a PolicyRule.
     * @example
     * // Update or create a PolicyRule
     * const policyRule = await prisma.policyRule.upsert({
     *   create: {
     *     // ... data to create a PolicyRule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PolicyRule we want to update
     *   }
     * })
     */
    upsert<T extends PolicyRuleUpsertArgs>(args: SelectSubset<T, PolicyRuleUpsertArgs<ExtArgs>>): Prisma__PolicyRuleClient<$Result.GetResult<Prisma.$PolicyRulePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PolicyRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyRuleCountArgs} args - Arguments to filter PolicyRules to count.
     * @example
     * // Count the number of PolicyRules
     * const count = await prisma.policyRule.count({
     *   where: {
     *     // ... the filter for the PolicyRules we want to count
     *   }
     * })
    **/
    count<T extends PolicyRuleCountArgs>(
      args?: Subset<T, PolicyRuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PolicyRuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PolicyRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyRuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PolicyRuleAggregateArgs>(args: Subset<T, PolicyRuleAggregateArgs>): Prisma.PrismaPromise<GetPolicyRuleAggregateType<T>>

    /**
     * Group by PolicyRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyRuleGroupByArgs} args - Group by arguments.
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
      T extends PolicyRuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PolicyRuleGroupByArgs['orderBy'] }
        : { orderBy?: PolicyRuleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PolicyRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPolicyRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PolicyRule model
   */
  readonly fields: PolicyRuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PolicyRule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PolicyRuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    policy<T extends PolicyRule$policyArgs<ExtArgs> = {}>(args?: Subset<T, PolicyRule$policyArgs<ExtArgs>>): Prisma__BankPolicyClient<$Result.GetResult<Prisma.$BankPolicyPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the PolicyRule model
   */ 
  interface PolicyRuleFieldRefs {
    readonly id: FieldRef<"PolicyRule", 'String'>
    readonly policyId: FieldRef<"PolicyRule", 'String'>
    readonly ruleCategory: FieldRef<"PolicyRule", 'String'>
    readonly ruleKey: FieldRef<"PolicyRule", 'String'>
    readonly ruleValue: FieldRef<"PolicyRule", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * PolicyRule findUnique
   */
  export type PolicyRuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyRule
     */
    select?: PolicyRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyRuleInclude<ExtArgs> | null
    /**
     * Filter, which PolicyRule to fetch.
     */
    where: PolicyRuleWhereUniqueInput
  }

  /**
   * PolicyRule findUniqueOrThrow
   */
  export type PolicyRuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyRule
     */
    select?: PolicyRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyRuleInclude<ExtArgs> | null
    /**
     * Filter, which PolicyRule to fetch.
     */
    where: PolicyRuleWhereUniqueInput
  }

  /**
   * PolicyRule findFirst
   */
  export type PolicyRuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyRule
     */
    select?: PolicyRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyRuleInclude<ExtArgs> | null
    /**
     * Filter, which PolicyRule to fetch.
     */
    where?: PolicyRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PolicyRules to fetch.
     */
    orderBy?: PolicyRuleOrderByWithRelationInput | PolicyRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PolicyRules.
     */
    cursor?: PolicyRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PolicyRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PolicyRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PolicyRules.
     */
    distinct?: PolicyRuleScalarFieldEnum | PolicyRuleScalarFieldEnum[]
  }

  /**
   * PolicyRule findFirstOrThrow
   */
  export type PolicyRuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyRule
     */
    select?: PolicyRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyRuleInclude<ExtArgs> | null
    /**
     * Filter, which PolicyRule to fetch.
     */
    where?: PolicyRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PolicyRules to fetch.
     */
    orderBy?: PolicyRuleOrderByWithRelationInput | PolicyRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PolicyRules.
     */
    cursor?: PolicyRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PolicyRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PolicyRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PolicyRules.
     */
    distinct?: PolicyRuleScalarFieldEnum | PolicyRuleScalarFieldEnum[]
  }

  /**
   * PolicyRule findMany
   */
  export type PolicyRuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyRule
     */
    select?: PolicyRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyRuleInclude<ExtArgs> | null
    /**
     * Filter, which PolicyRules to fetch.
     */
    where?: PolicyRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PolicyRules to fetch.
     */
    orderBy?: PolicyRuleOrderByWithRelationInput | PolicyRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PolicyRules.
     */
    cursor?: PolicyRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PolicyRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PolicyRules.
     */
    skip?: number
    distinct?: PolicyRuleScalarFieldEnum | PolicyRuleScalarFieldEnum[]
  }

  /**
   * PolicyRule create
   */
  export type PolicyRuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyRule
     */
    select?: PolicyRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyRuleInclude<ExtArgs> | null
    /**
     * The data needed to create a PolicyRule.
     */
    data: XOR<PolicyRuleCreateInput, PolicyRuleUncheckedCreateInput>
  }

  /**
   * PolicyRule createMany
   */
  export type PolicyRuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PolicyRules.
     */
    data: PolicyRuleCreateManyInput | PolicyRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PolicyRule update
   */
  export type PolicyRuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyRule
     */
    select?: PolicyRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyRuleInclude<ExtArgs> | null
    /**
     * The data needed to update a PolicyRule.
     */
    data: XOR<PolicyRuleUpdateInput, PolicyRuleUncheckedUpdateInput>
    /**
     * Choose, which PolicyRule to update.
     */
    where: PolicyRuleWhereUniqueInput
  }

  /**
   * PolicyRule updateMany
   */
  export type PolicyRuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PolicyRules.
     */
    data: XOR<PolicyRuleUpdateManyMutationInput, PolicyRuleUncheckedUpdateManyInput>
    /**
     * Filter which PolicyRules to update
     */
    where?: PolicyRuleWhereInput
  }

  /**
   * PolicyRule upsert
   */
  export type PolicyRuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyRule
     */
    select?: PolicyRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyRuleInclude<ExtArgs> | null
    /**
     * The filter to search for the PolicyRule to update in case it exists.
     */
    where: PolicyRuleWhereUniqueInput
    /**
     * In case the PolicyRule found by the `where` argument doesn't exist, create a new PolicyRule with this data.
     */
    create: XOR<PolicyRuleCreateInput, PolicyRuleUncheckedCreateInput>
    /**
     * In case the PolicyRule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PolicyRuleUpdateInput, PolicyRuleUncheckedUpdateInput>
  }

  /**
   * PolicyRule delete
   */
  export type PolicyRuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyRule
     */
    select?: PolicyRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyRuleInclude<ExtArgs> | null
    /**
     * Filter which PolicyRule to delete.
     */
    where: PolicyRuleWhereUniqueInput
  }

  /**
   * PolicyRule deleteMany
   */
  export type PolicyRuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PolicyRules to delete
     */
    where?: PolicyRuleWhereInput
  }

  /**
   * PolicyRule.policy
   */
  export type PolicyRule$policyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankPolicy
     */
    select?: BankPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankPolicyInclude<ExtArgs> | null
    where?: BankPolicyWhereInput
  }

  /**
   * PolicyRule without action
   */
  export type PolicyRuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyRule
     */
    select?: PolicyRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyRuleInclude<ExtArgs> | null
  }


  /**
   * Model PolicyDocument
   */

  export type AggregatePolicyDocument = {
    _count: PolicyDocumentCountAggregateOutputType | null
    _avg: PolicyDocumentAvgAggregateOutputType | null
    _sum: PolicyDocumentSumAggregateOutputType | null
    _min: PolicyDocumentMinAggregateOutputType | null
    _max: PolicyDocumentMaxAggregateOutputType | null
  }

  export type PolicyDocumentAvgAggregateOutputType = {
    fileSizeBytes: number | null
  }

  export type PolicyDocumentSumAggregateOutputType = {
    fileSizeBytes: bigint | null
  }

  export type PolicyDocumentMinAggregateOutputType = {
    id: string | null
    title: string | null
    category: string | null
    fileName: string | null
    mimeType: string | null
    fileData: Buffer | null
    fileSizeBytes: bigint | null
    uploadedByEmail: string | null
    isActive: boolean | null
    uploadedAt: Date | null
  }

  export type PolicyDocumentMaxAggregateOutputType = {
    id: string | null
    title: string | null
    category: string | null
    fileName: string | null
    mimeType: string | null
    fileData: Buffer | null
    fileSizeBytes: bigint | null
    uploadedByEmail: string | null
    isActive: boolean | null
    uploadedAt: Date | null
  }

  export type PolicyDocumentCountAggregateOutputType = {
    id: number
    title: number
    category: number
    fileName: number
    mimeType: number
    fileData: number
    fileSizeBytes: number
    uploadedByEmail: number
    isActive: number
    uploadedAt: number
    _all: number
  }


  export type PolicyDocumentAvgAggregateInputType = {
    fileSizeBytes?: true
  }

  export type PolicyDocumentSumAggregateInputType = {
    fileSizeBytes?: true
  }

  export type PolicyDocumentMinAggregateInputType = {
    id?: true
    title?: true
    category?: true
    fileName?: true
    mimeType?: true
    fileData?: true
    fileSizeBytes?: true
    uploadedByEmail?: true
    isActive?: true
    uploadedAt?: true
  }

  export type PolicyDocumentMaxAggregateInputType = {
    id?: true
    title?: true
    category?: true
    fileName?: true
    mimeType?: true
    fileData?: true
    fileSizeBytes?: true
    uploadedByEmail?: true
    isActive?: true
    uploadedAt?: true
  }

  export type PolicyDocumentCountAggregateInputType = {
    id?: true
    title?: true
    category?: true
    fileName?: true
    mimeType?: true
    fileData?: true
    fileSizeBytes?: true
    uploadedByEmail?: true
    isActive?: true
    uploadedAt?: true
    _all?: true
  }

  export type PolicyDocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PolicyDocument to aggregate.
     */
    where?: PolicyDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PolicyDocuments to fetch.
     */
    orderBy?: PolicyDocumentOrderByWithRelationInput | PolicyDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PolicyDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PolicyDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PolicyDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PolicyDocuments
    **/
    _count?: true | PolicyDocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PolicyDocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PolicyDocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PolicyDocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PolicyDocumentMaxAggregateInputType
  }

  export type GetPolicyDocumentAggregateType<T extends PolicyDocumentAggregateArgs> = {
        [P in keyof T & keyof AggregatePolicyDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePolicyDocument[P]>
      : GetScalarType<T[P], AggregatePolicyDocument[P]>
  }




  export type PolicyDocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PolicyDocumentWhereInput
    orderBy?: PolicyDocumentOrderByWithAggregationInput | PolicyDocumentOrderByWithAggregationInput[]
    by: PolicyDocumentScalarFieldEnum[] | PolicyDocumentScalarFieldEnum
    having?: PolicyDocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PolicyDocumentCountAggregateInputType | true
    _avg?: PolicyDocumentAvgAggregateInputType
    _sum?: PolicyDocumentSumAggregateInputType
    _min?: PolicyDocumentMinAggregateInputType
    _max?: PolicyDocumentMaxAggregateInputType
  }

  export type PolicyDocumentGroupByOutputType = {
    id: string
    title: string
    category: string
    fileName: string
    mimeType: string
    fileData: Buffer
    fileSizeBytes: bigint | null
    uploadedByEmail: string | null
    isActive: boolean
    uploadedAt: Date
    _count: PolicyDocumentCountAggregateOutputType | null
    _avg: PolicyDocumentAvgAggregateOutputType | null
    _sum: PolicyDocumentSumAggregateOutputType | null
    _min: PolicyDocumentMinAggregateOutputType | null
    _max: PolicyDocumentMaxAggregateOutputType | null
  }

  type GetPolicyDocumentGroupByPayload<T extends PolicyDocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PolicyDocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PolicyDocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PolicyDocumentGroupByOutputType[P]>
            : GetScalarType<T[P], PolicyDocumentGroupByOutputType[P]>
        }
      >
    >


  export type PolicyDocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    category?: boolean
    fileName?: boolean
    mimeType?: boolean
    fileData?: boolean
    fileSizeBytes?: boolean
    uploadedByEmail?: boolean
    isActive?: boolean
    uploadedAt?: boolean
  }, ExtArgs["result"]["policyDocument"]>


  export type PolicyDocumentSelectScalar = {
    id?: boolean
    title?: boolean
    category?: boolean
    fileName?: boolean
    mimeType?: boolean
    fileData?: boolean
    fileSizeBytes?: boolean
    uploadedByEmail?: boolean
    isActive?: boolean
    uploadedAt?: boolean
  }


  export type $PolicyDocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PolicyDocument"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      category: string
      fileName: string
      mimeType: string
      fileData: Buffer
      fileSizeBytes: bigint | null
      uploadedByEmail: string | null
      isActive: boolean
      uploadedAt: Date
    }, ExtArgs["result"]["policyDocument"]>
    composites: {}
  }

  type PolicyDocumentGetPayload<S extends boolean | null | undefined | PolicyDocumentDefaultArgs> = $Result.GetResult<Prisma.$PolicyDocumentPayload, S>

  type PolicyDocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PolicyDocumentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PolicyDocumentCountAggregateInputType | true
    }

  export interface PolicyDocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PolicyDocument'], meta: { name: 'PolicyDocument' } }
    /**
     * Find zero or one PolicyDocument that matches the filter.
     * @param {PolicyDocumentFindUniqueArgs} args - Arguments to find a PolicyDocument
     * @example
     * // Get one PolicyDocument
     * const policyDocument = await prisma.policyDocument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PolicyDocumentFindUniqueArgs>(args: SelectSubset<T, PolicyDocumentFindUniqueArgs<ExtArgs>>): Prisma__PolicyDocumentClient<$Result.GetResult<Prisma.$PolicyDocumentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PolicyDocument that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PolicyDocumentFindUniqueOrThrowArgs} args - Arguments to find a PolicyDocument
     * @example
     * // Get one PolicyDocument
     * const policyDocument = await prisma.policyDocument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PolicyDocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, PolicyDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PolicyDocumentClient<$Result.GetResult<Prisma.$PolicyDocumentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PolicyDocument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyDocumentFindFirstArgs} args - Arguments to find a PolicyDocument
     * @example
     * // Get one PolicyDocument
     * const policyDocument = await prisma.policyDocument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PolicyDocumentFindFirstArgs>(args?: SelectSubset<T, PolicyDocumentFindFirstArgs<ExtArgs>>): Prisma__PolicyDocumentClient<$Result.GetResult<Prisma.$PolicyDocumentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PolicyDocument that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyDocumentFindFirstOrThrowArgs} args - Arguments to find a PolicyDocument
     * @example
     * // Get one PolicyDocument
     * const policyDocument = await prisma.policyDocument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PolicyDocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, PolicyDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PolicyDocumentClient<$Result.GetResult<Prisma.$PolicyDocumentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PolicyDocuments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyDocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PolicyDocuments
     * const policyDocuments = await prisma.policyDocument.findMany()
     * 
     * // Get first 10 PolicyDocuments
     * const policyDocuments = await prisma.policyDocument.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const policyDocumentWithIdOnly = await prisma.policyDocument.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PolicyDocumentFindManyArgs>(args?: SelectSubset<T, PolicyDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PolicyDocumentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PolicyDocument.
     * @param {PolicyDocumentCreateArgs} args - Arguments to create a PolicyDocument.
     * @example
     * // Create one PolicyDocument
     * const PolicyDocument = await prisma.policyDocument.create({
     *   data: {
     *     // ... data to create a PolicyDocument
     *   }
     * })
     * 
     */
    create<T extends PolicyDocumentCreateArgs>(args: SelectSubset<T, PolicyDocumentCreateArgs<ExtArgs>>): Prisma__PolicyDocumentClient<$Result.GetResult<Prisma.$PolicyDocumentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PolicyDocuments.
     * @param {PolicyDocumentCreateManyArgs} args - Arguments to create many PolicyDocuments.
     * @example
     * // Create many PolicyDocuments
     * const policyDocument = await prisma.policyDocument.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PolicyDocumentCreateManyArgs>(args?: SelectSubset<T, PolicyDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PolicyDocument.
     * @param {PolicyDocumentDeleteArgs} args - Arguments to delete one PolicyDocument.
     * @example
     * // Delete one PolicyDocument
     * const PolicyDocument = await prisma.policyDocument.delete({
     *   where: {
     *     // ... filter to delete one PolicyDocument
     *   }
     * })
     * 
     */
    delete<T extends PolicyDocumentDeleteArgs>(args: SelectSubset<T, PolicyDocumentDeleteArgs<ExtArgs>>): Prisma__PolicyDocumentClient<$Result.GetResult<Prisma.$PolicyDocumentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PolicyDocument.
     * @param {PolicyDocumentUpdateArgs} args - Arguments to update one PolicyDocument.
     * @example
     * // Update one PolicyDocument
     * const policyDocument = await prisma.policyDocument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PolicyDocumentUpdateArgs>(args: SelectSubset<T, PolicyDocumentUpdateArgs<ExtArgs>>): Prisma__PolicyDocumentClient<$Result.GetResult<Prisma.$PolicyDocumentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PolicyDocuments.
     * @param {PolicyDocumentDeleteManyArgs} args - Arguments to filter PolicyDocuments to delete.
     * @example
     * // Delete a few PolicyDocuments
     * const { count } = await prisma.policyDocument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PolicyDocumentDeleteManyArgs>(args?: SelectSubset<T, PolicyDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PolicyDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyDocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PolicyDocuments
     * const policyDocument = await prisma.policyDocument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PolicyDocumentUpdateManyArgs>(args: SelectSubset<T, PolicyDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PolicyDocument.
     * @param {PolicyDocumentUpsertArgs} args - Arguments to update or create a PolicyDocument.
     * @example
     * // Update or create a PolicyDocument
     * const policyDocument = await prisma.policyDocument.upsert({
     *   create: {
     *     // ... data to create a PolicyDocument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PolicyDocument we want to update
     *   }
     * })
     */
    upsert<T extends PolicyDocumentUpsertArgs>(args: SelectSubset<T, PolicyDocumentUpsertArgs<ExtArgs>>): Prisma__PolicyDocumentClient<$Result.GetResult<Prisma.$PolicyDocumentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PolicyDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyDocumentCountArgs} args - Arguments to filter PolicyDocuments to count.
     * @example
     * // Count the number of PolicyDocuments
     * const count = await prisma.policyDocument.count({
     *   where: {
     *     // ... the filter for the PolicyDocuments we want to count
     *   }
     * })
    **/
    count<T extends PolicyDocumentCountArgs>(
      args?: Subset<T, PolicyDocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PolicyDocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PolicyDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyDocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PolicyDocumentAggregateArgs>(args: Subset<T, PolicyDocumentAggregateArgs>): Prisma.PrismaPromise<GetPolicyDocumentAggregateType<T>>

    /**
     * Group by PolicyDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyDocumentGroupByArgs} args - Group by arguments.
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
      T extends PolicyDocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PolicyDocumentGroupByArgs['orderBy'] }
        : { orderBy?: PolicyDocumentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PolicyDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPolicyDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PolicyDocument model
   */
  readonly fields: PolicyDocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PolicyDocument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PolicyDocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the PolicyDocument model
   */ 
  interface PolicyDocumentFieldRefs {
    readonly id: FieldRef<"PolicyDocument", 'String'>
    readonly title: FieldRef<"PolicyDocument", 'String'>
    readonly category: FieldRef<"PolicyDocument", 'String'>
    readonly fileName: FieldRef<"PolicyDocument", 'String'>
    readonly mimeType: FieldRef<"PolicyDocument", 'String'>
    readonly fileData: FieldRef<"PolicyDocument", 'Bytes'>
    readonly fileSizeBytes: FieldRef<"PolicyDocument", 'BigInt'>
    readonly uploadedByEmail: FieldRef<"PolicyDocument", 'String'>
    readonly isActive: FieldRef<"PolicyDocument", 'Boolean'>
    readonly uploadedAt: FieldRef<"PolicyDocument", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PolicyDocument findUnique
   */
  export type PolicyDocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyDocument
     */
    select?: PolicyDocumentSelect<ExtArgs> | null
    /**
     * Filter, which PolicyDocument to fetch.
     */
    where: PolicyDocumentWhereUniqueInput
  }

  /**
   * PolicyDocument findUniqueOrThrow
   */
  export type PolicyDocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyDocument
     */
    select?: PolicyDocumentSelect<ExtArgs> | null
    /**
     * Filter, which PolicyDocument to fetch.
     */
    where: PolicyDocumentWhereUniqueInput
  }

  /**
   * PolicyDocument findFirst
   */
  export type PolicyDocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyDocument
     */
    select?: PolicyDocumentSelect<ExtArgs> | null
    /**
     * Filter, which PolicyDocument to fetch.
     */
    where?: PolicyDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PolicyDocuments to fetch.
     */
    orderBy?: PolicyDocumentOrderByWithRelationInput | PolicyDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PolicyDocuments.
     */
    cursor?: PolicyDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PolicyDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PolicyDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PolicyDocuments.
     */
    distinct?: PolicyDocumentScalarFieldEnum | PolicyDocumentScalarFieldEnum[]
  }

  /**
   * PolicyDocument findFirstOrThrow
   */
  export type PolicyDocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyDocument
     */
    select?: PolicyDocumentSelect<ExtArgs> | null
    /**
     * Filter, which PolicyDocument to fetch.
     */
    where?: PolicyDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PolicyDocuments to fetch.
     */
    orderBy?: PolicyDocumentOrderByWithRelationInput | PolicyDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PolicyDocuments.
     */
    cursor?: PolicyDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PolicyDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PolicyDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PolicyDocuments.
     */
    distinct?: PolicyDocumentScalarFieldEnum | PolicyDocumentScalarFieldEnum[]
  }

  /**
   * PolicyDocument findMany
   */
  export type PolicyDocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyDocument
     */
    select?: PolicyDocumentSelect<ExtArgs> | null
    /**
     * Filter, which PolicyDocuments to fetch.
     */
    where?: PolicyDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PolicyDocuments to fetch.
     */
    orderBy?: PolicyDocumentOrderByWithRelationInput | PolicyDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PolicyDocuments.
     */
    cursor?: PolicyDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PolicyDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PolicyDocuments.
     */
    skip?: number
    distinct?: PolicyDocumentScalarFieldEnum | PolicyDocumentScalarFieldEnum[]
  }

  /**
   * PolicyDocument create
   */
  export type PolicyDocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyDocument
     */
    select?: PolicyDocumentSelect<ExtArgs> | null
    /**
     * The data needed to create a PolicyDocument.
     */
    data: XOR<PolicyDocumentCreateInput, PolicyDocumentUncheckedCreateInput>
  }

  /**
   * PolicyDocument createMany
   */
  export type PolicyDocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PolicyDocuments.
     */
    data: PolicyDocumentCreateManyInput | PolicyDocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PolicyDocument update
   */
  export type PolicyDocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyDocument
     */
    select?: PolicyDocumentSelect<ExtArgs> | null
    /**
     * The data needed to update a PolicyDocument.
     */
    data: XOR<PolicyDocumentUpdateInput, PolicyDocumentUncheckedUpdateInput>
    /**
     * Choose, which PolicyDocument to update.
     */
    where: PolicyDocumentWhereUniqueInput
  }

  /**
   * PolicyDocument updateMany
   */
  export type PolicyDocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PolicyDocuments.
     */
    data: XOR<PolicyDocumentUpdateManyMutationInput, PolicyDocumentUncheckedUpdateManyInput>
    /**
     * Filter which PolicyDocuments to update
     */
    where?: PolicyDocumentWhereInput
  }

  /**
   * PolicyDocument upsert
   */
  export type PolicyDocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyDocument
     */
    select?: PolicyDocumentSelect<ExtArgs> | null
    /**
     * The filter to search for the PolicyDocument to update in case it exists.
     */
    where: PolicyDocumentWhereUniqueInput
    /**
     * In case the PolicyDocument found by the `where` argument doesn't exist, create a new PolicyDocument with this data.
     */
    create: XOR<PolicyDocumentCreateInput, PolicyDocumentUncheckedCreateInput>
    /**
     * In case the PolicyDocument was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PolicyDocumentUpdateInput, PolicyDocumentUncheckedUpdateInput>
  }

  /**
   * PolicyDocument delete
   */
  export type PolicyDocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyDocument
     */
    select?: PolicyDocumentSelect<ExtArgs> | null
    /**
     * Filter which PolicyDocument to delete.
     */
    where: PolicyDocumentWhereUniqueInput
  }

  /**
   * PolicyDocument deleteMany
   */
  export type PolicyDocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PolicyDocuments to delete
     */
    where?: PolicyDocumentWhereInput
  }

  /**
   * PolicyDocument without action
   */
  export type PolicyDocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyDocument
     */
    select?: PolicyDocumentSelect<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    action: string | null
    actorEmail: string | null
    entityType: string | null
    entityId: string | null
    details: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    action: string | null
    actorEmail: string | null
    entityType: string | null
    entityId: string | null
    details: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    action: number
    actorEmail: number
    entityType: number
    entityId: number
    details: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    action?: true
    actorEmail?: true
    entityType?: true
    entityId?: true
    details?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    action?: true
    actorEmail?: true
    entityType?: true
    entityId?: true
    details?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    action?: true
    actorEmail?: true
    entityType?: true
    entityId?: true
    details?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    action: string
    actorEmail: string | null
    entityType: string | null
    entityId: string | null
    details: string | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    actorEmail?: boolean
    entityType?: boolean
    entityId?: boolean
    details?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>


  export type AuditLogSelectScalar = {
    id?: boolean
    action?: boolean
    actorEmail?: boolean
    entityType?: boolean
    entityId?: boolean
    details?: boolean
    createdAt?: boolean
  }


  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      action: string
      actorEmail: string | null
      entityType: string | null
      entityId: string | null
      details: string | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
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
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AuditLog model
   */ 
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly actorEmail: FieldRef<"AuditLog", 'String'>
    readonly entityType: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly details: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
  }


  /**
   * Model CibilCheck
   */

  export type AggregateCibilCheck = {
    _count: CibilCheckCountAggregateOutputType | null
    _avg: CibilCheckAvgAggregateOutputType | null
    _sum: CibilCheckSumAggregateOutputType | null
    _min: CibilCheckMinAggregateOutputType | null
    _max: CibilCheckMaxAggregateOutputType | null
  }

  export type CibilCheckAvgAggregateOutputType = {
    cibilScore: number | null
  }

  export type CibilCheckSumAggregateOutputType = {
    cibilScore: number | null
  }

  export type CibilCheckMinAggregateOutputType = {
    id: string | null
    requestedBy: string | null
    fullName: string | null
    mobileNumber: string | null
    panNumber: string | null
    cibilScore: number | null
    scoreBand: string | null
    demoMode: boolean | null
    createdAt: Date | null
  }

  export type CibilCheckMaxAggregateOutputType = {
    id: string | null
    requestedBy: string | null
    fullName: string | null
    mobileNumber: string | null
    panNumber: string | null
    cibilScore: number | null
    scoreBand: string | null
    demoMode: boolean | null
    createdAt: Date | null
  }

  export type CibilCheckCountAggregateOutputType = {
    id: number
    requestedBy: number
    fullName: number
    mobileNumber: number
    panNumber: number
    cibilScore: number
    scoreBand: number
    demoMode: number
    createdAt: number
    _all: number
  }


  export type CibilCheckAvgAggregateInputType = {
    cibilScore?: true
  }

  export type CibilCheckSumAggregateInputType = {
    cibilScore?: true
  }

  export type CibilCheckMinAggregateInputType = {
    id?: true
    requestedBy?: true
    fullName?: true
    mobileNumber?: true
    panNumber?: true
    cibilScore?: true
    scoreBand?: true
    demoMode?: true
    createdAt?: true
  }

  export type CibilCheckMaxAggregateInputType = {
    id?: true
    requestedBy?: true
    fullName?: true
    mobileNumber?: true
    panNumber?: true
    cibilScore?: true
    scoreBand?: true
    demoMode?: true
    createdAt?: true
  }

  export type CibilCheckCountAggregateInputType = {
    id?: true
    requestedBy?: true
    fullName?: true
    mobileNumber?: true
    panNumber?: true
    cibilScore?: true
    scoreBand?: true
    demoMode?: true
    createdAt?: true
    _all?: true
  }

  export type CibilCheckAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CibilCheck to aggregate.
     */
    where?: CibilCheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CibilChecks to fetch.
     */
    orderBy?: CibilCheckOrderByWithRelationInput | CibilCheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CibilCheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CibilChecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CibilChecks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CibilChecks
    **/
    _count?: true | CibilCheckCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CibilCheckAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CibilCheckSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CibilCheckMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CibilCheckMaxAggregateInputType
  }

  export type GetCibilCheckAggregateType<T extends CibilCheckAggregateArgs> = {
        [P in keyof T & keyof AggregateCibilCheck]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCibilCheck[P]>
      : GetScalarType<T[P], AggregateCibilCheck[P]>
  }




  export type CibilCheckGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CibilCheckWhereInput
    orderBy?: CibilCheckOrderByWithAggregationInput | CibilCheckOrderByWithAggregationInput[]
    by: CibilCheckScalarFieldEnum[] | CibilCheckScalarFieldEnum
    having?: CibilCheckScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CibilCheckCountAggregateInputType | true
    _avg?: CibilCheckAvgAggregateInputType
    _sum?: CibilCheckSumAggregateInputType
    _min?: CibilCheckMinAggregateInputType
    _max?: CibilCheckMaxAggregateInputType
  }

  export type CibilCheckGroupByOutputType = {
    id: string
    requestedBy: string
    fullName: string
    mobileNumber: string
    panNumber: string | null
    cibilScore: number
    scoreBand: string
    demoMode: boolean
    createdAt: Date
    _count: CibilCheckCountAggregateOutputType | null
    _avg: CibilCheckAvgAggregateOutputType | null
    _sum: CibilCheckSumAggregateOutputType | null
    _min: CibilCheckMinAggregateOutputType | null
    _max: CibilCheckMaxAggregateOutputType | null
  }

  type GetCibilCheckGroupByPayload<T extends CibilCheckGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CibilCheckGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CibilCheckGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CibilCheckGroupByOutputType[P]>
            : GetScalarType<T[P], CibilCheckGroupByOutputType[P]>
        }
      >
    >


  export type CibilCheckSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestedBy?: boolean
    fullName?: boolean
    mobileNumber?: boolean
    panNumber?: boolean
    cibilScore?: boolean
    scoreBand?: boolean
    demoMode?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["cibilCheck"]>


  export type CibilCheckSelectScalar = {
    id?: boolean
    requestedBy?: boolean
    fullName?: boolean
    mobileNumber?: boolean
    panNumber?: boolean
    cibilScore?: boolean
    scoreBand?: boolean
    demoMode?: boolean
    createdAt?: boolean
  }


  export type $CibilCheckPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CibilCheck"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      requestedBy: string
      fullName: string
      mobileNumber: string
      panNumber: string | null
      cibilScore: number
      scoreBand: string
      demoMode: boolean
      createdAt: Date
    }, ExtArgs["result"]["cibilCheck"]>
    composites: {}
  }

  type CibilCheckGetPayload<S extends boolean | null | undefined | CibilCheckDefaultArgs> = $Result.GetResult<Prisma.$CibilCheckPayload, S>

  type CibilCheckCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CibilCheckFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CibilCheckCountAggregateInputType | true
    }

  export interface CibilCheckDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CibilCheck'], meta: { name: 'CibilCheck' } }
    /**
     * Find zero or one CibilCheck that matches the filter.
     * @param {CibilCheckFindUniqueArgs} args - Arguments to find a CibilCheck
     * @example
     * // Get one CibilCheck
     * const cibilCheck = await prisma.cibilCheck.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CibilCheckFindUniqueArgs>(args: SelectSubset<T, CibilCheckFindUniqueArgs<ExtArgs>>): Prisma__CibilCheckClient<$Result.GetResult<Prisma.$CibilCheckPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CibilCheck that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CibilCheckFindUniqueOrThrowArgs} args - Arguments to find a CibilCheck
     * @example
     * // Get one CibilCheck
     * const cibilCheck = await prisma.cibilCheck.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CibilCheckFindUniqueOrThrowArgs>(args: SelectSubset<T, CibilCheckFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CibilCheckClient<$Result.GetResult<Prisma.$CibilCheckPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CibilCheck that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CibilCheckFindFirstArgs} args - Arguments to find a CibilCheck
     * @example
     * // Get one CibilCheck
     * const cibilCheck = await prisma.cibilCheck.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CibilCheckFindFirstArgs>(args?: SelectSubset<T, CibilCheckFindFirstArgs<ExtArgs>>): Prisma__CibilCheckClient<$Result.GetResult<Prisma.$CibilCheckPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CibilCheck that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CibilCheckFindFirstOrThrowArgs} args - Arguments to find a CibilCheck
     * @example
     * // Get one CibilCheck
     * const cibilCheck = await prisma.cibilCheck.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CibilCheckFindFirstOrThrowArgs>(args?: SelectSubset<T, CibilCheckFindFirstOrThrowArgs<ExtArgs>>): Prisma__CibilCheckClient<$Result.GetResult<Prisma.$CibilCheckPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CibilChecks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CibilCheckFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CibilChecks
     * const cibilChecks = await prisma.cibilCheck.findMany()
     * 
     * // Get first 10 CibilChecks
     * const cibilChecks = await prisma.cibilCheck.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cibilCheckWithIdOnly = await prisma.cibilCheck.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CibilCheckFindManyArgs>(args?: SelectSubset<T, CibilCheckFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CibilCheckPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CibilCheck.
     * @param {CibilCheckCreateArgs} args - Arguments to create a CibilCheck.
     * @example
     * // Create one CibilCheck
     * const CibilCheck = await prisma.cibilCheck.create({
     *   data: {
     *     // ... data to create a CibilCheck
     *   }
     * })
     * 
     */
    create<T extends CibilCheckCreateArgs>(args: SelectSubset<T, CibilCheckCreateArgs<ExtArgs>>): Prisma__CibilCheckClient<$Result.GetResult<Prisma.$CibilCheckPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CibilChecks.
     * @param {CibilCheckCreateManyArgs} args - Arguments to create many CibilChecks.
     * @example
     * // Create many CibilChecks
     * const cibilCheck = await prisma.cibilCheck.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CibilCheckCreateManyArgs>(args?: SelectSubset<T, CibilCheckCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CibilCheck.
     * @param {CibilCheckDeleteArgs} args - Arguments to delete one CibilCheck.
     * @example
     * // Delete one CibilCheck
     * const CibilCheck = await prisma.cibilCheck.delete({
     *   where: {
     *     // ... filter to delete one CibilCheck
     *   }
     * })
     * 
     */
    delete<T extends CibilCheckDeleteArgs>(args: SelectSubset<T, CibilCheckDeleteArgs<ExtArgs>>): Prisma__CibilCheckClient<$Result.GetResult<Prisma.$CibilCheckPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CibilCheck.
     * @param {CibilCheckUpdateArgs} args - Arguments to update one CibilCheck.
     * @example
     * // Update one CibilCheck
     * const cibilCheck = await prisma.cibilCheck.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CibilCheckUpdateArgs>(args: SelectSubset<T, CibilCheckUpdateArgs<ExtArgs>>): Prisma__CibilCheckClient<$Result.GetResult<Prisma.$CibilCheckPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CibilChecks.
     * @param {CibilCheckDeleteManyArgs} args - Arguments to filter CibilChecks to delete.
     * @example
     * // Delete a few CibilChecks
     * const { count } = await prisma.cibilCheck.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CibilCheckDeleteManyArgs>(args?: SelectSubset<T, CibilCheckDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CibilChecks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CibilCheckUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CibilChecks
     * const cibilCheck = await prisma.cibilCheck.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CibilCheckUpdateManyArgs>(args: SelectSubset<T, CibilCheckUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CibilCheck.
     * @param {CibilCheckUpsertArgs} args - Arguments to update or create a CibilCheck.
     * @example
     * // Update or create a CibilCheck
     * const cibilCheck = await prisma.cibilCheck.upsert({
     *   create: {
     *     // ... data to create a CibilCheck
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CibilCheck we want to update
     *   }
     * })
     */
    upsert<T extends CibilCheckUpsertArgs>(args: SelectSubset<T, CibilCheckUpsertArgs<ExtArgs>>): Prisma__CibilCheckClient<$Result.GetResult<Prisma.$CibilCheckPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CibilChecks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CibilCheckCountArgs} args - Arguments to filter CibilChecks to count.
     * @example
     * // Count the number of CibilChecks
     * const count = await prisma.cibilCheck.count({
     *   where: {
     *     // ... the filter for the CibilChecks we want to count
     *   }
     * })
    **/
    count<T extends CibilCheckCountArgs>(
      args?: Subset<T, CibilCheckCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CibilCheckCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CibilCheck.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CibilCheckAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CibilCheckAggregateArgs>(args: Subset<T, CibilCheckAggregateArgs>): Prisma.PrismaPromise<GetCibilCheckAggregateType<T>>

    /**
     * Group by CibilCheck.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CibilCheckGroupByArgs} args - Group by arguments.
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
      T extends CibilCheckGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CibilCheckGroupByArgs['orderBy'] }
        : { orderBy?: CibilCheckGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CibilCheckGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCibilCheckGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CibilCheck model
   */
  readonly fields: CibilCheckFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CibilCheck.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CibilCheckClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the CibilCheck model
   */ 
  interface CibilCheckFieldRefs {
    readonly id: FieldRef<"CibilCheck", 'String'>
    readonly requestedBy: FieldRef<"CibilCheck", 'String'>
    readonly fullName: FieldRef<"CibilCheck", 'String'>
    readonly mobileNumber: FieldRef<"CibilCheck", 'String'>
    readonly panNumber: FieldRef<"CibilCheck", 'String'>
    readonly cibilScore: FieldRef<"CibilCheck", 'Int'>
    readonly scoreBand: FieldRef<"CibilCheck", 'String'>
    readonly demoMode: FieldRef<"CibilCheck", 'Boolean'>
    readonly createdAt: FieldRef<"CibilCheck", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CibilCheck findUnique
   */
  export type CibilCheckFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CibilCheck
     */
    select?: CibilCheckSelect<ExtArgs> | null
    /**
     * Filter, which CibilCheck to fetch.
     */
    where: CibilCheckWhereUniqueInput
  }

  /**
   * CibilCheck findUniqueOrThrow
   */
  export type CibilCheckFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CibilCheck
     */
    select?: CibilCheckSelect<ExtArgs> | null
    /**
     * Filter, which CibilCheck to fetch.
     */
    where: CibilCheckWhereUniqueInput
  }

  /**
   * CibilCheck findFirst
   */
  export type CibilCheckFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CibilCheck
     */
    select?: CibilCheckSelect<ExtArgs> | null
    /**
     * Filter, which CibilCheck to fetch.
     */
    where?: CibilCheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CibilChecks to fetch.
     */
    orderBy?: CibilCheckOrderByWithRelationInput | CibilCheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CibilChecks.
     */
    cursor?: CibilCheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CibilChecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CibilChecks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CibilChecks.
     */
    distinct?: CibilCheckScalarFieldEnum | CibilCheckScalarFieldEnum[]
  }

  /**
   * CibilCheck findFirstOrThrow
   */
  export type CibilCheckFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CibilCheck
     */
    select?: CibilCheckSelect<ExtArgs> | null
    /**
     * Filter, which CibilCheck to fetch.
     */
    where?: CibilCheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CibilChecks to fetch.
     */
    orderBy?: CibilCheckOrderByWithRelationInput | CibilCheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CibilChecks.
     */
    cursor?: CibilCheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CibilChecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CibilChecks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CibilChecks.
     */
    distinct?: CibilCheckScalarFieldEnum | CibilCheckScalarFieldEnum[]
  }

  /**
   * CibilCheck findMany
   */
  export type CibilCheckFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CibilCheck
     */
    select?: CibilCheckSelect<ExtArgs> | null
    /**
     * Filter, which CibilChecks to fetch.
     */
    where?: CibilCheckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CibilChecks to fetch.
     */
    orderBy?: CibilCheckOrderByWithRelationInput | CibilCheckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CibilChecks.
     */
    cursor?: CibilCheckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CibilChecks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CibilChecks.
     */
    skip?: number
    distinct?: CibilCheckScalarFieldEnum | CibilCheckScalarFieldEnum[]
  }

  /**
   * CibilCheck create
   */
  export type CibilCheckCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CibilCheck
     */
    select?: CibilCheckSelect<ExtArgs> | null
    /**
     * The data needed to create a CibilCheck.
     */
    data: XOR<CibilCheckCreateInput, CibilCheckUncheckedCreateInput>
  }

  /**
   * CibilCheck createMany
   */
  export type CibilCheckCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CibilChecks.
     */
    data: CibilCheckCreateManyInput | CibilCheckCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CibilCheck update
   */
  export type CibilCheckUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CibilCheck
     */
    select?: CibilCheckSelect<ExtArgs> | null
    /**
     * The data needed to update a CibilCheck.
     */
    data: XOR<CibilCheckUpdateInput, CibilCheckUncheckedUpdateInput>
    /**
     * Choose, which CibilCheck to update.
     */
    where: CibilCheckWhereUniqueInput
  }

  /**
   * CibilCheck updateMany
   */
  export type CibilCheckUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CibilChecks.
     */
    data: XOR<CibilCheckUpdateManyMutationInput, CibilCheckUncheckedUpdateManyInput>
    /**
     * Filter which CibilChecks to update
     */
    where?: CibilCheckWhereInput
  }

  /**
   * CibilCheck upsert
   */
  export type CibilCheckUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CibilCheck
     */
    select?: CibilCheckSelect<ExtArgs> | null
    /**
     * The filter to search for the CibilCheck to update in case it exists.
     */
    where: CibilCheckWhereUniqueInput
    /**
     * In case the CibilCheck found by the `where` argument doesn't exist, create a new CibilCheck with this data.
     */
    create: XOR<CibilCheckCreateInput, CibilCheckUncheckedCreateInput>
    /**
     * In case the CibilCheck was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CibilCheckUpdateInput, CibilCheckUncheckedUpdateInput>
  }

  /**
   * CibilCheck delete
   */
  export type CibilCheckDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CibilCheck
     */
    select?: CibilCheckSelect<ExtArgs> | null
    /**
     * Filter which CibilCheck to delete.
     */
    where: CibilCheckWhereUniqueInput
  }

  /**
   * CibilCheck deleteMany
   */
  export type CibilCheckDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CibilChecks to delete
     */
    where?: CibilCheckWhereInput
  }

  /**
   * CibilCheck without action
   */
  export type CibilCheckDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CibilCheck
     */
    select?: CibilCheckSelect<ExtArgs> | null
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


  export const LoanApplicationScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    connectorId: 'connectorId',
    amount: 'amount',
    tenureMonths: 'tenureMonths',
    purpose: 'purpose',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy'
  };

  export type LoanApplicationScalarFieldEnum = (typeof LoanApplicationScalarFieldEnum)[keyof typeof LoanApplicationScalarFieldEnum]


  export const ApplicationStatusHistoryScalarFieldEnum: {
    id: 'id',
    loanId: 'loanId',
    status: 'status',
    remarks: 'remarks',
    changedAt: 'changedAt',
    changedBy: 'changedBy'
  };

  export type ApplicationStatusHistoryScalarFieldEnum = (typeof ApplicationStatusHistoryScalarFieldEnum)[keyof typeof ApplicationStatusHistoryScalarFieldEnum]


  export const EligibilityRuleScalarFieldEnum: {
    id: 'id',
    ruleType: 'ruleType',
    minValue: 'minValue',
    maxValue: 'maxValue',
    isActive: 'isActive',
    updatedAt: 'updatedAt',
    updatedBy: 'updatedBy'
  };

  export type EligibilityRuleScalarFieldEnum = (typeof EligibilityRuleScalarFieldEnum)[keyof typeof EligibilityRuleScalarFieldEnum]


  export const EligibilitySubmissionScalarFieldEnum: {
    id: 'id',
    fullName: 'fullName',
    mobileNumber: 'mobileNumber',
    loanAmount: 'loanAmount',
    loanPurpose: 'loanPurpose',
    monthlyIncome: 'monthlyIncome',
    employmentType: 'employmentType',
    city: 'city',
    panNumber: 'panNumber',
    isEligible: 'isEligible',
    maxLoanAmount: 'maxLoanAmount',
    interestRate: 'interestRate',
    remarks: 'remarks',
    assignedConnectorId: 'assignedConnectorId',
    status: 'status',
    submittedAt: 'submittedAt',
    updatedAt: 'updatedAt'
  };

  export type EligibilitySubmissionScalarFieldEnum = (typeof EligibilitySubmissionScalarFieldEnum)[keyof typeof EligibilitySubmissionScalarFieldEnum]


  export const BankPolicyScalarFieldEnum: {
    id: 'id',
    bankName: 'bankName',
    policyVersion: 'policyVersion',
    effectiveFrom: 'effectiveFrom',
    effectiveTo: 'effectiveTo',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy'
  };

  export type BankPolicyScalarFieldEnum = (typeof BankPolicyScalarFieldEnum)[keyof typeof BankPolicyScalarFieldEnum]


  export const PolicyRuleScalarFieldEnum: {
    id: 'id',
    policyId: 'policyId',
    ruleCategory: 'ruleCategory',
    ruleKey: 'ruleKey',
    ruleValue: 'ruleValue'
  };

  export type PolicyRuleScalarFieldEnum = (typeof PolicyRuleScalarFieldEnum)[keyof typeof PolicyRuleScalarFieldEnum]


  export const PolicyDocumentScalarFieldEnum: {
    id: 'id',
    title: 'title',
    category: 'category',
    fileName: 'fileName',
    mimeType: 'mimeType',
    fileData: 'fileData',
    fileSizeBytes: 'fileSizeBytes',
    uploadedByEmail: 'uploadedByEmail',
    isActive: 'isActive',
    uploadedAt: 'uploadedAt'
  };

  export type PolicyDocumentScalarFieldEnum = (typeof PolicyDocumentScalarFieldEnum)[keyof typeof PolicyDocumentScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    action: 'action',
    actorEmail: 'actorEmail',
    entityType: 'entityType',
    entityId: 'entityId',
    details: 'details',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const CibilCheckScalarFieldEnum: {
    id: 'id',
    requestedBy: 'requestedBy',
    fullName: 'fullName',
    mobileNumber: 'mobileNumber',
    panNumber: 'panNumber',
    cibilScore: 'cibilScore',
    scoreBand: 'scoreBand',
    demoMode: 'demoMode',
    createdAt: 'createdAt'
  };

  export type CibilCheckScalarFieldEnum = (typeof CibilCheckScalarFieldEnum)[keyof typeof CibilCheckScalarFieldEnum]


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
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Bytes'
   */
  export type BytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type LoanApplicationWhereInput = {
    AND?: LoanApplicationWhereInput | LoanApplicationWhereInput[]
    OR?: LoanApplicationWhereInput[]
    NOT?: LoanApplicationWhereInput | LoanApplicationWhereInput[]
    id?: StringFilter<"LoanApplication"> | string
    customerId?: StringFilter<"LoanApplication"> | string
    connectorId?: StringNullableFilter<"LoanApplication"> | string | null
    amount?: DecimalFilter<"LoanApplication"> | Decimal | DecimalJsLike | number | string
    tenureMonths?: IntFilter<"LoanApplication"> | number
    purpose?: StringNullableFilter<"LoanApplication"> | string | null
    status?: StringFilter<"LoanApplication"> | string
    createdAt?: DateTimeFilter<"LoanApplication"> | Date | string
    updatedAt?: DateTimeNullableFilter<"LoanApplication"> | Date | string | null
    createdBy?: StringNullableFilter<"LoanApplication"> | string | null
    updatedBy?: StringNullableFilter<"LoanApplication"> | string | null
    statusHistory?: ApplicationStatusHistoryListRelationFilter
  }

  export type LoanApplicationOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    connectorId?: SortOrderInput | SortOrder
    amount?: SortOrder
    tenureMonths?: SortOrder
    purpose?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    statusHistory?: ApplicationStatusHistoryOrderByRelationAggregateInput
  }

  export type LoanApplicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LoanApplicationWhereInput | LoanApplicationWhereInput[]
    OR?: LoanApplicationWhereInput[]
    NOT?: LoanApplicationWhereInput | LoanApplicationWhereInput[]
    customerId?: StringFilter<"LoanApplication"> | string
    connectorId?: StringNullableFilter<"LoanApplication"> | string | null
    amount?: DecimalFilter<"LoanApplication"> | Decimal | DecimalJsLike | number | string
    tenureMonths?: IntFilter<"LoanApplication"> | number
    purpose?: StringNullableFilter<"LoanApplication"> | string | null
    status?: StringFilter<"LoanApplication"> | string
    createdAt?: DateTimeFilter<"LoanApplication"> | Date | string
    updatedAt?: DateTimeNullableFilter<"LoanApplication"> | Date | string | null
    createdBy?: StringNullableFilter<"LoanApplication"> | string | null
    updatedBy?: StringNullableFilter<"LoanApplication"> | string | null
    statusHistory?: ApplicationStatusHistoryListRelationFilter
  }, "id">

  export type LoanApplicationOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    connectorId?: SortOrderInput | SortOrder
    amount?: SortOrder
    tenureMonths?: SortOrder
    purpose?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    _count?: LoanApplicationCountOrderByAggregateInput
    _avg?: LoanApplicationAvgOrderByAggregateInput
    _max?: LoanApplicationMaxOrderByAggregateInput
    _min?: LoanApplicationMinOrderByAggregateInput
    _sum?: LoanApplicationSumOrderByAggregateInput
  }

  export type LoanApplicationScalarWhereWithAggregatesInput = {
    AND?: LoanApplicationScalarWhereWithAggregatesInput | LoanApplicationScalarWhereWithAggregatesInput[]
    OR?: LoanApplicationScalarWhereWithAggregatesInput[]
    NOT?: LoanApplicationScalarWhereWithAggregatesInput | LoanApplicationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LoanApplication"> | string
    customerId?: StringWithAggregatesFilter<"LoanApplication"> | string
    connectorId?: StringNullableWithAggregatesFilter<"LoanApplication"> | string | null
    amount?: DecimalWithAggregatesFilter<"LoanApplication"> | Decimal | DecimalJsLike | number | string
    tenureMonths?: IntWithAggregatesFilter<"LoanApplication"> | number
    purpose?: StringNullableWithAggregatesFilter<"LoanApplication"> | string | null
    status?: StringWithAggregatesFilter<"LoanApplication"> | string
    createdAt?: DateTimeWithAggregatesFilter<"LoanApplication"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"LoanApplication"> | Date | string | null
    createdBy?: StringNullableWithAggregatesFilter<"LoanApplication"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"LoanApplication"> | string | null
  }

  export type ApplicationStatusHistoryWhereInput = {
    AND?: ApplicationStatusHistoryWhereInput | ApplicationStatusHistoryWhereInput[]
    OR?: ApplicationStatusHistoryWhereInput[]
    NOT?: ApplicationStatusHistoryWhereInput | ApplicationStatusHistoryWhereInput[]
    id?: StringFilter<"ApplicationStatusHistory"> | string
    loanId?: StringNullableFilter<"ApplicationStatusHistory"> | string | null
    status?: StringFilter<"ApplicationStatusHistory"> | string
    remarks?: StringNullableFilter<"ApplicationStatusHistory"> | string | null
    changedAt?: DateTimeFilter<"ApplicationStatusHistory"> | Date | string
    changedBy?: StringNullableFilter<"ApplicationStatusHistory"> | string | null
    loan?: XOR<LoanApplicationNullableRelationFilter, LoanApplicationWhereInput> | null
  }

  export type ApplicationStatusHistoryOrderByWithRelationInput = {
    id?: SortOrder
    loanId?: SortOrderInput | SortOrder
    status?: SortOrder
    remarks?: SortOrderInput | SortOrder
    changedAt?: SortOrder
    changedBy?: SortOrderInput | SortOrder
    loan?: LoanApplicationOrderByWithRelationInput
  }

  export type ApplicationStatusHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ApplicationStatusHistoryWhereInput | ApplicationStatusHistoryWhereInput[]
    OR?: ApplicationStatusHistoryWhereInput[]
    NOT?: ApplicationStatusHistoryWhereInput | ApplicationStatusHistoryWhereInput[]
    loanId?: StringNullableFilter<"ApplicationStatusHistory"> | string | null
    status?: StringFilter<"ApplicationStatusHistory"> | string
    remarks?: StringNullableFilter<"ApplicationStatusHistory"> | string | null
    changedAt?: DateTimeFilter<"ApplicationStatusHistory"> | Date | string
    changedBy?: StringNullableFilter<"ApplicationStatusHistory"> | string | null
    loan?: XOR<LoanApplicationNullableRelationFilter, LoanApplicationWhereInput> | null
  }, "id">

  export type ApplicationStatusHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    loanId?: SortOrderInput | SortOrder
    status?: SortOrder
    remarks?: SortOrderInput | SortOrder
    changedAt?: SortOrder
    changedBy?: SortOrderInput | SortOrder
    _count?: ApplicationStatusHistoryCountOrderByAggregateInput
    _max?: ApplicationStatusHistoryMaxOrderByAggregateInput
    _min?: ApplicationStatusHistoryMinOrderByAggregateInput
  }

  export type ApplicationStatusHistoryScalarWhereWithAggregatesInput = {
    AND?: ApplicationStatusHistoryScalarWhereWithAggregatesInput | ApplicationStatusHistoryScalarWhereWithAggregatesInput[]
    OR?: ApplicationStatusHistoryScalarWhereWithAggregatesInput[]
    NOT?: ApplicationStatusHistoryScalarWhereWithAggregatesInput | ApplicationStatusHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApplicationStatusHistory"> | string
    loanId?: StringNullableWithAggregatesFilter<"ApplicationStatusHistory"> | string | null
    status?: StringWithAggregatesFilter<"ApplicationStatusHistory"> | string
    remarks?: StringNullableWithAggregatesFilter<"ApplicationStatusHistory"> | string | null
    changedAt?: DateTimeWithAggregatesFilter<"ApplicationStatusHistory"> | Date | string
    changedBy?: StringNullableWithAggregatesFilter<"ApplicationStatusHistory"> | string | null
  }

  export type EligibilityRuleWhereInput = {
    AND?: EligibilityRuleWhereInput | EligibilityRuleWhereInput[]
    OR?: EligibilityRuleWhereInput[]
    NOT?: EligibilityRuleWhereInput | EligibilityRuleWhereInput[]
    id?: StringFilter<"EligibilityRule"> | string
    ruleType?: StringFilter<"EligibilityRule"> | string
    minValue?: DecimalNullableFilter<"EligibilityRule"> | Decimal | DecimalJsLike | number | string | null
    maxValue?: DecimalNullableFilter<"EligibilityRule"> | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolFilter<"EligibilityRule"> | boolean
    updatedAt?: DateTimeFilter<"EligibilityRule"> | Date | string
    updatedBy?: StringNullableFilter<"EligibilityRule"> | string | null
  }

  export type EligibilityRuleOrderByWithRelationInput = {
    id?: SortOrder
    ruleType?: SortOrder
    minValue?: SortOrderInput | SortOrder
    maxValue?: SortOrderInput | SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
  }

  export type EligibilityRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    ruleType?: string
    AND?: EligibilityRuleWhereInput | EligibilityRuleWhereInput[]
    OR?: EligibilityRuleWhereInput[]
    NOT?: EligibilityRuleWhereInput | EligibilityRuleWhereInput[]
    minValue?: DecimalNullableFilter<"EligibilityRule"> | Decimal | DecimalJsLike | number | string | null
    maxValue?: DecimalNullableFilter<"EligibilityRule"> | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolFilter<"EligibilityRule"> | boolean
    updatedAt?: DateTimeFilter<"EligibilityRule"> | Date | string
    updatedBy?: StringNullableFilter<"EligibilityRule"> | string | null
  }, "id" | "ruleType">

  export type EligibilityRuleOrderByWithAggregationInput = {
    id?: SortOrder
    ruleType?: SortOrder
    minValue?: SortOrderInput | SortOrder
    maxValue?: SortOrderInput | SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    _count?: EligibilityRuleCountOrderByAggregateInput
    _avg?: EligibilityRuleAvgOrderByAggregateInput
    _max?: EligibilityRuleMaxOrderByAggregateInput
    _min?: EligibilityRuleMinOrderByAggregateInput
    _sum?: EligibilityRuleSumOrderByAggregateInput
  }

  export type EligibilityRuleScalarWhereWithAggregatesInput = {
    AND?: EligibilityRuleScalarWhereWithAggregatesInput | EligibilityRuleScalarWhereWithAggregatesInput[]
    OR?: EligibilityRuleScalarWhereWithAggregatesInput[]
    NOT?: EligibilityRuleScalarWhereWithAggregatesInput | EligibilityRuleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EligibilityRule"> | string
    ruleType?: StringWithAggregatesFilter<"EligibilityRule"> | string
    minValue?: DecimalNullableWithAggregatesFilter<"EligibilityRule"> | Decimal | DecimalJsLike | number | string | null
    maxValue?: DecimalNullableWithAggregatesFilter<"EligibilityRule"> | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolWithAggregatesFilter<"EligibilityRule"> | boolean
    updatedAt?: DateTimeWithAggregatesFilter<"EligibilityRule"> | Date | string
    updatedBy?: StringNullableWithAggregatesFilter<"EligibilityRule"> | string | null
  }

  export type EligibilitySubmissionWhereInput = {
    AND?: EligibilitySubmissionWhereInput | EligibilitySubmissionWhereInput[]
    OR?: EligibilitySubmissionWhereInput[]
    NOT?: EligibilitySubmissionWhereInput | EligibilitySubmissionWhereInput[]
    id?: StringFilter<"EligibilitySubmission"> | string
    fullName?: StringFilter<"EligibilitySubmission"> | string
    mobileNumber?: StringFilter<"EligibilitySubmission"> | string
    loanAmount?: DecimalNullableFilter<"EligibilitySubmission"> | Decimal | DecimalJsLike | number | string | null
    loanPurpose?: StringNullableFilter<"EligibilitySubmission"> | string | null
    monthlyIncome?: DecimalNullableFilter<"EligibilitySubmission"> | Decimal | DecimalJsLike | number | string | null
    employmentType?: StringNullableFilter<"EligibilitySubmission"> | string | null
    city?: StringNullableFilter<"EligibilitySubmission"> | string | null
    panNumber?: StringNullableFilter<"EligibilitySubmission"> | string | null
    isEligible?: BoolNullableFilter<"EligibilitySubmission"> | boolean | null
    maxLoanAmount?: DecimalNullableFilter<"EligibilitySubmission"> | Decimal | DecimalJsLike | number | string | null
    interestRate?: DecimalNullableFilter<"EligibilitySubmission"> | Decimal | DecimalJsLike | number | string | null
    remarks?: StringNullableFilter<"EligibilitySubmission"> | string | null
    assignedConnectorId?: StringNullableFilter<"EligibilitySubmission"> | string | null
    status?: StringFilter<"EligibilitySubmission"> | string
    submittedAt?: DateTimeFilter<"EligibilitySubmission"> | Date | string
    updatedAt?: DateTimeFilter<"EligibilitySubmission"> | Date | string
  }

  export type EligibilitySubmissionOrderByWithRelationInput = {
    id?: SortOrder
    fullName?: SortOrder
    mobileNumber?: SortOrder
    loanAmount?: SortOrderInput | SortOrder
    loanPurpose?: SortOrderInput | SortOrder
    monthlyIncome?: SortOrderInput | SortOrder
    employmentType?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    panNumber?: SortOrderInput | SortOrder
    isEligible?: SortOrderInput | SortOrder
    maxLoanAmount?: SortOrderInput | SortOrder
    interestRate?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    assignedConnectorId?: SortOrderInput | SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EligibilitySubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EligibilitySubmissionWhereInput | EligibilitySubmissionWhereInput[]
    OR?: EligibilitySubmissionWhereInput[]
    NOT?: EligibilitySubmissionWhereInput | EligibilitySubmissionWhereInput[]
    fullName?: StringFilter<"EligibilitySubmission"> | string
    mobileNumber?: StringFilter<"EligibilitySubmission"> | string
    loanAmount?: DecimalNullableFilter<"EligibilitySubmission"> | Decimal | DecimalJsLike | number | string | null
    loanPurpose?: StringNullableFilter<"EligibilitySubmission"> | string | null
    monthlyIncome?: DecimalNullableFilter<"EligibilitySubmission"> | Decimal | DecimalJsLike | number | string | null
    employmentType?: StringNullableFilter<"EligibilitySubmission"> | string | null
    city?: StringNullableFilter<"EligibilitySubmission"> | string | null
    panNumber?: StringNullableFilter<"EligibilitySubmission"> | string | null
    isEligible?: BoolNullableFilter<"EligibilitySubmission"> | boolean | null
    maxLoanAmount?: DecimalNullableFilter<"EligibilitySubmission"> | Decimal | DecimalJsLike | number | string | null
    interestRate?: DecimalNullableFilter<"EligibilitySubmission"> | Decimal | DecimalJsLike | number | string | null
    remarks?: StringNullableFilter<"EligibilitySubmission"> | string | null
    assignedConnectorId?: StringNullableFilter<"EligibilitySubmission"> | string | null
    status?: StringFilter<"EligibilitySubmission"> | string
    submittedAt?: DateTimeFilter<"EligibilitySubmission"> | Date | string
    updatedAt?: DateTimeFilter<"EligibilitySubmission"> | Date | string
  }, "id">

  export type EligibilitySubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    fullName?: SortOrder
    mobileNumber?: SortOrder
    loanAmount?: SortOrderInput | SortOrder
    loanPurpose?: SortOrderInput | SortOrder
    monthlyIncome?: SortOrderInput | SortOrder
    employmentType?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    panNumber?: SortOrderInput | SortOrder
    isEligible?: SortOrderInput | SortOrder
    maxLoanAmount?: SortOrderInput | SortOrder
    interestRate?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    assignedConnectorId?: SortOrderInput | SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EligibilitySubmissionCountOrderByAggregateInput
    _avg?: EligibilitySubmissionAvgOrderByAggregateInput
    _max?: EligibilitySubmissionMaxOrderByAggregateInput
    _min?: EligibilitySubmissionMinOrderByAggregateInput
    _sum?: EligibilitySubmissionSumOrderByAggregateInput
  }

  export type EligibilitySubmissionScalarWhereWithAggregatesInput = {
    AND?: EligibilitySubmissionScalarWhereWithAggregatesInput | EligibilitySubmissionScalarWhereWithAggregatesInput[]
    OR?: EligibilitySubmissionScalarWhereWithAggregatesInput[]
    NOT?: EligibilitySubmissionScalarWhereWithAggregatesInput | EligibilitySubmissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EligibilitySubmission"> | string
    fullName?: StringWithAggregatesFilter<"EligibilitySubmission"> | string
    mobileNumber?: StringWithAggregatesFilter<"EligibilitySubmission"> | string
    loanAmount?: DecimalNullableWithAggregatesFilter<"EligibilitySubmission"> | Decimal | DecimalJsLike | number | string | null
    loanPurpose?: StringNullableWithAggregatesFilter<"EligibilitySubmission"> | string | null
    monthlyIncome?: DecimalNullableWithAggregatesFilter<"EligibilitySubmission"> | Decimal | DecimalJsLike | number | string | null
    employmentType?: StringNullableWithAggregatesFilter<"EligibilitySubmission"> | string | null
    city?: StringNullableWithAggregatesFilter<"EligibilitySubmission"> | string | null
    panNumber?: StringNullableWithAggregatesFilter<"EligibilitySubmission"> | string | null
    isEligible?: BoolNullableWithAggregatesFilter<"EligibilitySubmission"> | boolean | null
    maxLoanAmount?: DecimalNullableWithAggregatesFilter<"EligibilitySubmission"> | Decimal | DecimalJsLike | number | string | null
    interestRate?: DecimalNullableWithAggregatesFilter<"EligibilitySubmission"> | Decimal | DecimalJsLike | number | string | null
    remarks?: StringNullableWithAggregatesFilter<"EligibilitySubmission"> | string | null
    assignedConnectorId?: StringNullableWithAggregatesFilter<"EligibilitySubmission"> | string | null
    status?: StringWithAggregatesFilter<"EligibilitySubmission"> | string
    submittedAt?: DateTimeWithAggregatesFilter<"EligibilitySubmission"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EligibilitySubmission"> | Date | string
  }

  export type BankPolicyWhereInput = {
    AND?: BankPolicyWhereInput | BankPolicyWhereInput[]
    OR?: BankPolicyWhereInput[]
    NOT?: BankPolicyWhereInput | BankPolicyWhereInput[]
    id?: StringFilter<"BankPolicy"> | string
    bankName?: StringFilter<"BankPolicy"> | string
    policyVersion?: StringFilter<"BankPolicy"> | string
    effectiveFrom?: DateTimeFilter<"BankPolicy"> | Date | string
    effectiveTo?: DateTimeNullableFilter<"BankPolicy"> | Date | string | null
    status?: StringFilter<"BankPolicy"> | string
    createdAt?: DateTimeFilter<"BankPolicy"> | Date | string
    updatedAt?: DateTimeNullableFilter<"BankPolicy"> | Date | string | null
    createdBy?: StringNullableFilter<"BankPolicy"> | string | null
    updatedBy?: StringNullableFilter<"BankPolicy"> | string | null
    rules?: PolicyRuleListRelationFilter
  }

  export type BankPolicyOrderByWithRelationInput = {
    id?: SortOrder
    bankName?: SortOrder
    policyVersion?: SortOrder
    effectiveFrom?: SortOrder
    effectiveTo?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    rules?: PolicyRuleOrderByRelationAggregateInput
  }

  export type BankPolicyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    bankName_policyVersion?: BankPolicyBankNamePolicyVersionCompoundUniqueInput
    AND?: BankPolicyWhereInput | BankPolicyWhereInput[]
    OR?: BankPolicyWhereInput[]
    NOT?: BankPolicyWhereInput | BankPolicyWhereInput[]
    bankName?: StringFilter<"BankPolicy"> | string
    policyVersion?: StringFilter<"BankPolicy"> | string
    effectiveFrom?: DateTimeFilter<"BankPolicy"> | Date | string
    effectiveTo?: DateTimeNullableFilter<"BankPolicy"> | Date | string | null
    status?: StringFilter<"BankPolicy"> | string
    createdAt?: DateTimeFilter<"BankPolicy"> | Date | string
    updatedAt?: DateTimeNullableFilter<"BankPolicy"> | Date | string | null
    createdBy?: StringNullableFilter<"BankPolicy"> | string | null
    updatedBy?: StringNullableFilter<"BankPolicy"> | string | null
    rules?: PolicyRuleListRelationFilter
  }, "id" | "bankName_policyVersion">

  export type BankPolicyOrderByWithAggregationInput = {
    id?: SortOrder
    bankName?: SortOrder
    policyVersion?: SortOrder
    effectiveFrom?: SortOrder
    effectiveTo?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    _count?: BankPolicyCountOrderByAggregateInput
    _max?: BankPolicyMaxOrderByAggregateInput
    _min?: BankPolicyMinOrderByAggregateInput
  }

  export type BankPolicyScalarWhereWithAggregatesInput = {
    AND?: BankPolicyScalarWhereWithAggregatesInput | BankPolicyScalarWhereWithAggregatesInput[]
    OR?: BankPolicyScalarWhereWithAggregatesInput[]
    NOT?: BankPolicyScalarWhereWithAggregatesInput | BankPolicyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BankPolicy"> | string
    bankName?: StringWithAggregatesFilter<"BankPolicy"> | string
    policyVersion?: StringWithAggregatesFilter<"BankPolicy"> | string
    effectiveFrom?: DateTimeWithAggregatesFilter<"BankPolicy"> | Date | string
    effectiveTo?: DateTimeNullableWithAggregatesFilter<"BankPolicy"> | Date | string | null
    status?: StringWithAggregatesFilter<"BankPolicy"> | string
    createdAt?: DateTimeWithAggregatesFilter<"BankPolicy"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"BankPolicy"> | Date | string | null
    createdBy?: StringNullableWithAggregatesFilter<"BankPolicy"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"BankPolicy"> | string | null
  }

  export type PolicyRuleWhereInput = {
    AND?: PolicyRuleWhereInput | PolicyRuleWhereInput[]
    OR?: PolicyRuleWhereInput[]
    NOT?: PolicyRuleWhereInput | PolicyRuleWhereInput[]
    id?: StringFilter<"PolicyRule"> | string
    policyId?: StringNullableFilter<"PolicyRule"> | string | null
    ruleCategory?: StringFilter<"PolicyRule"> | string
    ruleKey?: StringFilter<"PolicyRule"> | string
    ruleValue?: JsonFilter<"PolicyRule">
    policy?: XOR<BankPolicyNullableRelationFilter, BankPolicyWhereInput> | null
  }

  export type PolicyRuleOrderByWithRelationInput = {
    id?: SortOrder
    policyId?: SortOrderInput | SortOrder
    ruleCategory?: SortOrder
    ruleKey?: SortOrder
    ruleValue?: SortOrder
    policy?: BankPolicyOrderByWithRelationInput
  }

  export type PolicyRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PolicyRuleWhereInput | PolicyRuleWhereInput[]
    OR?: PolicyRuleWhereInput[]
    NOT?: PolicyRuleWhereInput | PolicyRuleWhereInput[]
    policyId?: StringNullableFilter<"PolicyRule"> | string | null
    ruleCategory?: StringFilter<"PolicyRule"> | string
    ruleKey?: StringFilter<"PolicyRule"> | string
    ruleValue?: JsonFilter<"PolicyRule">
    policy?: XOR<BankPolicyNullableRelationFilter, BankPolicyWhereInput> | null
  }, "id">

  export type PolicyRuleOrderByWithAggregationInput = {
    id?: SortOrder
    policyId?: SortOrderInput | SortOrder
    ruleCategory?: SortOrder
    ruleKey?: SortOrder
    ruleValue?: SortOrder
    _count?: PolicyRuleCountOrderByAggregateInput
    _max?: PolicyRuleMaxOrderByAggregateInput
    _min?: PolicyRuleMinOrderByAggregateInput
  }

  export type PolicyRuleScalarWhereWithAggregatesInput = {
    AND?: PolicyRuleScalarWhereWithAggregatesInput | PolicyRuleScalarWhereWithAggregatesInput[]
    OR?: PolicyRuleScalarWhereWithAggregatesInput[]
    NOT?: PolicyRuleScalarWhereWithAggregatesInput | PolicyRuleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PolicyRule"> | string
    policyId?: StringNullableWithAggregatesFilter<"PolicyRule"> | string | null
    ruleCategory?: StringWithAggregatesFilter<"PolicyRule"> | string
    ruleKey?: StringWithAggregatesFilter<"PolicyRule"> | string
    ruleValue?: JsonWithAggregatesFilter<"PolicyRule">
  }

  export type PolicyDocumentWhereInput = {
    AND?: PolicyDocumentWhereInput | PolicyDocumentWhereInput[]
    OR?: PolicyDocumentWhereInput[]
    NOT?: PolicyDocumentWhereInput | PolicyDocumentWhereInput[]
    id?: StringFilter<"PolicyDocument"> | string
    title?: StringFilter<"PolicyDocument"> | string
    category?: StringFilter<"PolicyDocument"> | string
    fileName?: StringFilter<"PolicyDocument"> | string
    mimeType?: StringFilter<"PolicyDocument"> | string
    fileData?: BytesFilter<"PolicyDocument"> | Buffer
    fileSizeBytes?: BigIntNullableFilter<"PolicyDocument"> | bigint | number | null
    uploadedByEmail?: StringNullableFilter<"PolicyDocument"> | string | null
    isActive?: BoolFilter<"PolicyDocument"> | boolean
    uploadedAt?: DateTimeFilter<"PolicyDocument"> | Date | string
  }

  export type PolicyDocumentOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    category?: SortOrder
    fileName?: SortOrder
    mimeType?: SortOrder
    fileData?: SortOrder
    fileSizeBytes?: SortOrderInput | SortOrder
    uploadedByEmail?: SortOrderInput | SortOrder
    isActive?: SortOrder
    uploadedAt?: SortOrder
  }

  export type PolicyDocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PolicyDocumentWhereInput | PolicyDocumentWhereInput[]
    OR?: PolicyDocumentWhereInput[]
    NOT?: PolicyDocumentWhereInput | PolicyDocumentWhereInput[]
    title?: StringFilter<"PolicyDocument"> | string
    category?: StringFilter<"PolicyDocument"> | string
    fileName?: StringFilter<"PolicyDocument"> | string
    mimeType?: StringFilter<"PolicyDocument"> | string
    fileData?: BytesFilter<"PolicyDocument"> | Buffer
    fileSizeBytes?: BigIntNullableFilter<"PolicyDocument"> | bigint | number | null
    uploadedByEmail?: StringNullableFilter<"PolicyDocument"> | string | null
    isActive?: BoolFilter<"PolicyDocument"> | boolean
    uploadedAt?: DateTimeFilter<"PolicyDocument"> | Date | string
  }, "id">

  export type PolicyDocumentOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    category?: SortOrder
    fileName?: SortOrder
    mimeType?: SortOrder
    fileData?: SortOrder
    fileSizeBytes?: SortOrderInput | SortOrder
    uploadedByEmail?: SortOrderInput | SortOrder
    isActive?: SortOrder
    uploadedAt?: SortOrder
    _count?: PolicyDocumentCountOrderByAggregateInput
    _avg?: PolicyDocumentAvgOrderByAggregateInput
    _max?: PolicyDocumentMaxOrderByAggregateInput
    _min?: PolicyDocumentMinOrderByAggregateInput
    _sum?: PolicyDocumentSumOrderByAggregateInput
  }

  export type PolicyDocumentScalarWhereWithAggregatesInput = {
    AND?: PolicyDocumentScalarWhereWithAggregatesInput | PolicyDocumentScalarWhereWithAggregatesInput[]
    OR?: PolicyDocumentScalarWhereWithAggregatesInput[]
    NOT?: PolicyDocumentScalarWhereWithAggregatesInput | PolicyDocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PolicyDocument"> | string
    title?: StringWithAggregatesFilter<"PolicyDocument"> | string
    category?: StringWithAggregatesFilter<"PolicyDocument"> | string
    fileName?: StringWithAggregatesFilter<"PolicyDocument"> | string
    mimeType?: StringWithAggregatesFilter<"PolicyDocument"> | string
    fileData?: BytesWithAggregatesFilter<"PolicyDocument"> | Buffer
    fileSizeBytes?: BigIntNullableWithAggregatesFilter<"PolicyDocument"> | bigint | number | null
    uploadedByEmail?: StringNullableWithAggregatesFilter<"PolicyDocument"> | string | null
    isActive?: BoolWithAggregatesFilter<"PolicyDocument"> | boolean
    uploadedAt?: DateTimeWithAggregatesFilter<"PolicyDocument"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    actorEmail?: StringNullableFilter<"AuditLog"> | string | null
    entityType?: StringNullableFilter<"AuditLog"> | string | null
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    details?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    action?: SortOrder
    actorEmail?: SortOrderInput | SortOrder
    entityType?: SortOrderInput | SortOrder
    entityId?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    action?: StringFilter<"AuditLog"> | string
    actorEmail?: StringNullableFilter<"AuditLog"> | string | null
    entityType?: StringNullableFilter<"AuditLog"> | string | null
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    details?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    action?: SortOrder
    actorEmail?: SortOrderInput | SortOrder
    entityType?: SortOrderInput | SortOrder
    entityId?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    actorEmail?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    entityType?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    entityId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    details?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type CibilCheckWhereInput = {
    AND?: CibilCheckWhereInput | CibilCheckWhereInput[]
    OR?: CibilCheckWhereInput[]
    NOT?: CibilCheckWhereInput | CibilCheckWhereInput[]
    id?: StringFilter<"CibilCheck"> | string
    requestedBy?: StringFilter<"CibilCheck"> | string
    fullName?: StringFilter<"CibilCheck"> | string
    mobileNumber?: StringFilter<"CibilCheck"> | string
    panNumber?: StringNullableFilter<"CibilCheck"> | string | null
    cibilScore?: IntFilter<"CibilCheck"> | number
    scoreBand?: StringFilter<"CibilCheck"> | string
    demoMode?: BoolFilter<"CibilCheck"> | boolean
    createdAt?: DateTimeFilter<"CibilCheck"> | Date | string
  }

  export type CibilCheckOrderByWithRelationInput = {
    id?: SortOrder
    requestedBy?: SortOrder
    fullName?: SortOrder
    mobileNumber?: SortOrder
    panNumber?: SortOrderInput | SortOrder
    cibilScore?: SortOrder
    scoreBand?: SortOrder
    demoMode?: SortOrder
    createdAt?: SortOrder
  }

  export type CibilCheckWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CibilCheckWhereInput | CibilCheckWhereInput[]
    OR?: CibilCheckWhereInput[]
    NOT?: CibilCheckWhereInput | CibilCheckWhereInput[]
    requestedBy?: StringFilter<"CibilCheck"> | string
    fullName?: StringFilter<"CibilCheck"> | string
    mobileNumber?: StringFilter<"CibilCheck"> | string
    panNumber?: StringNullableFilter<"CibilCheck"> | string | null
    cibilScore?: IntFilter<"CibilCheck"> | number
    scoreBand?: StringFilter<"CibilCheck"> | string
    demoMode?: BoolFilter<"CibilCheck"> | boolean
    createdAt?: DateTimeFilter<"CibilCheck"> | Date | string
  }, "id">

  export type CibilCheckOrderByWithAggregationInput = {
    id?: SortOrder
    requestedBy?: SortOrder
    fullName?: SortOrder
    mobileNumber?: SortOrder
    panNumber?: SortOrderInput | SortOrder
    cibilScore?: SortOrder
    scoreBand?: SortOrder
    demoMode?: SortOrder
    createdAt?: SortOrder
    _count?: CibilCheckCountOrderByAggregateInput
    _avg?: CibilCheckAvgOrderByAggregateInput
    _max?: CibilCheckMaxOrderByAggregateInput
    _min?: CibilCheckMinOrderByAggregateInput
    _sum?: CibilCheckSumOrderByAggregateInput
  }

  export type CibilCheckScalarWhereWithAggregatesInput = {
    AND?: CibilCheckScalarWhereWithAggregatesInput | CibilCheckScalarWhereWithAggregatesInput[]
    OR?: CibilCheckScalarWhereWithAggregatesInput[]
    NOT?: CibilCheckScalarWhereWithAggregatesInput | CibilCheckScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CibilCheck"> | string
    requestedBy?: StringWithAggregatesFilter<"CibilCheck"> | string
    fullName?: StringWithAggregatesFilter<"CibilCheck"> | string
    mobileNumber?: StringWithAggregatesFilter<"CibilCheck"> | string
    panNumber?: StringNullableWithAggregatesFilter<"CibilCheck"> | string | null
    cibilScore?: IntWithAggregatesFilter<"CibilCheck"> | number
    scoreBand?: StringWithAggregatesFilter<"CibilCheck"> | string
    demoMode?: BoolWithAggregatesFilter<"CibilCheck"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"CibilCheck"> | Date | string
  }

  export type LoanApplicationCreateInput = {
    id: string
    customerId: string
    connectorId?: string | null
    amount: Decimal | DecimalJsLike | number | string
    tenureMonths: number
    purpose?: string | null
    status: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    statusHistory?: ApplicationStatusHistoryCreateNestedManyWithoutLoanInput
  }

  export type LoanApplicationUncheckedCreateInput = {
    id: string
    customerId: string
    connectorId?: string | null
    amount: Decimal | DecimalJsLike | number | string
    tenureMonths: number
    purpose?: string | null
    status: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    statusHistory?: ApplicationStatusHistoryUncheckedCreateNestedManyWithoutLoanInput
  }

  export type LoanApplicationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    connectorId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tenureMonths?: IntFieldUpdateOperationsInput | number
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    statusHistory?: ApplicationStatusHistoryUpdateManyWithoutLoanNestedInput
  }

  export type LoanApplicationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    connectorId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tenureMonths?: IntFieldUpdateOperationsInput | number
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    statusHistory?: ApplicationStatusHistoryUncheckedUpdateManyWithoutLoanNestedInput
  }

  export type LoanApplicationCreateManyInput = {
    id: string
    customerId: string
    connectorId?: string | null
    amount: Decimal | DecimalJsLike | number | string
    tenureMonths: number
    purpose?: string | null
    status: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
  }

  export type LoanApplicationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    connectorId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tenureMonths?: IntFieldUpdateOperationsInput | number
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LoanApplicationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    connectorId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tenureMonths?: IntFieldUpdateOperationsInput | number
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ApplicationStatusHistoryCreateInput = {
    id: string
    status: string
    remarks?: string | null
    changedAt: Date | string
    changedBy?: string | null
    loan?: LoanApplicationCreateNestedOneWithoutStatusHistoryInput
  }

  export type ApplicationStatusHistoryUncheckedCreateInput = {
    id: string
    loanId?: string | null
    status: string
    remarks?: string | null
    changedAt: Date | string
    changedBy?: string | null
  }

  export type ApplicationStatusHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
    loan?: LoanApplicationUpdateOneWithoutStatusHistoryNestedInput
  }

  export type ApplicationStatusHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ApplicationStatusHistoryCreateManyInput = {
    id: string
    loanId?: string | null
    status: string
    remarks?: string | null
    changedAt: Date | string
    changedBy?: string | null
  }

  export type ApplicationStatusHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ApplicationStatusHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EligibilityRuleCreateInput = {
    id: string
    ruleType: string
    minValue?: Decimal | DecimalJsLike | number | string | null
    maxValue?: Decimal | DecimalJsLike | number | string | null
    isActive?: boolean
    updatedAt: Date | string
    updatedBy?: string | null
  }

  export type EligibilityRuleUncheckedCreateInput = {
    id: string
    ruleType: string
    minValue?: Decimal | DecimalJsLike | number | string | null
    maxValue?: Decimal | DecimalJsLike | number | string | null
    isActive?: boolean
    updatedAt: Date | string
    updatedBy?: string | null
  }

  export type EligibilityRuleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ruleType?: StringFieldUpdateOperationsInput | string
    minValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    maxValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EligibilityRuleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ruleType?: StringFieldUpdateOperationsInput | string
    minValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    maxValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EligibilityRuleCreateManyInput = {
    id: string
    ruleType: string
    minValue?: Decimal | DecimalJsLike | number | string | null
    maxValue?: Decimal | DecimalJsLike | number | string | null
    isActive?: boolean
    updatedAt: Date | string
    updatedBy?: string | null
  }

  export type EligibilityRuleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ruleType?: StringFieldUpdateOperationsInput | string
    minValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    maxValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EligibilityRuleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ruleType?: StringFieldUpdateOperationsInput | string
    minValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    maxValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EligibilitySubmissionCreateInput = {
    id?: string
    fullName: string
    mobileNumber: string
    loanAmount?: Decimal | DecimalJsLike | number | string | null
    loanPurpose?: string | null
    monthlyIncome?: Decimal | DecimalJsLike | number | string | null
    employmentType?: string | null
    city?: string | null
    panNumber?: string | null
    isEligible?: boolean | null
    maxLoanAmount?: Decimal | DecimalJsLike | number | string | null
    interestRate?: Decimal | DecimalJsLike | number | string | null
    remarks?: string | null
    assignedConnectorId?: string | null
    status?: string
    submittedAt?: Date | string
    updatedAt?: Date | string
  }

  export type EligibilitySubmissionUncheckedCreateInput = {
    id?: string
    fullName: string
    mobileNumber: string
    loanAmount?: Decimal | DecimalJsLike | number | string | null
    loanPurpose?: string | null
    monthlyIncome?: Decimal | DecimalJsLike | number | string | null
    employmentType?: string | null
    city?: string | null
    panNumber?: string | null
    isEligible?: boolean | null
    maxLoanAmount?: Decimal | DecimalJsLike | number | string | null
    interestRate?: Decimal | DecimalJsLike | number | string | null
    remarks?: string | null
    assignedConnectorId?: string | null
    status?: string
    submittedAt?: Date | string
    updatedAt?: Date | string
  }

  export type EligibilitySubmissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    mobileNumber?: StringFieldUpdateOperationsInput | string
    loanAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    loanPurpose?: NullableStringFieldUpdateOperationsInput | string | null
    monthlyIncome?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    employmentType?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    panNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isEligible?: NullableBoolFieldUpdateOperationsInput | boolean | null
    maxLoanAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    interestRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    assignedConnectorId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EligibilitySubmissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    mobileNumber?: StringFieldUpdateOperationsInput | string
    loanAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    loanPurpose?: NullableStringFieldUpdateOperationsInput | string | null
    monthlyIncome?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    employmentType?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    panNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isEligible?: NullableBoolFieldUpdateOperationsInput | boolean | null
    maxLoanAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    interestRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    assignedConnectorId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EligibilitySubmissionCreateManyInput = {
    id?: string
    fullName: string
    mobileNumber: string
    loanAmount?: Decimal | DecimalJsLike | number | string | null
    loanPurpose?: string | null
    monthlyIncome?: Decimal | DecimalJsLike | number | string | null
    employmentType?: string | null
    city?: string | null
    panNumber?: string | null
    isEligible?: boolean | null
    maxLoanAmount?: Decimal | DecimalJsLike | number | string | null
    interestRate?: Decimal | DecimalJsLike | number | string | null
    remarks?: string | null
    assignedConnectorId?: string | null
    status?: string
    submittedAt?: Date | string
    updatedAt?: Date | string
  }

  export type EligibilitySubmissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    mobileNumber?: StringFieldUpdateOperationsInput | string
    loanAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    loanPurpose?: NullableStringFieldUpdateOperationsInput | string | null
    monthlyIncome?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    employmentType?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    panNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isEligible?: NullableBoolFieldUpdateOperationsInput | boolean | null
    maxLoanAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    interestRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    assignedConnectorId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EligibilitySubmissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    mobileNumber?: StringFieldUpdateOperationsInput | string
    loanAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    loanPurpose?: NullableStringFieldUpdateOperationsInput | string | null
    monthlyIncome?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    employmentType?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    panNumber?: NullableStringFieldUpdateOperationsInput | string | null
    isEligible?: NullableBoolFieldUpdateOperationsInput | boolean | null
    maxLoanAmount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    interestRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    assignedConnectorId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BankPolicyCreateInput = {
    id: string
    bankName: string
    policyVersion: string
    effectiveFrom: Date | string
    effectiveTo?: Date | string | null
    status: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    rules?: PolicyRuleCreateNestedManyWithoutPolicyInput
  }

  export type BankPolicyUncheckedCreateInput = {
    id: string
    bankName: string
    policyVersion: string
    effectiveFrom: Date | string
    effectiveTo?: Date | string | null
    status: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
    rules?: PolicyRuleUncheckedCreateNestedManyWithoutPolicyInput
  }

  export type BankPolicyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bankName?: StringFieldUpdateOperationsInput | string
    policyVersion?: StringFieldUpdateOperationsInput | string
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    rules?: PolicyRuleUpdateManyWithoutPolicyNestedInput
  }

  export type BankPolicyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bankName?: StringFieldUpdateOperationsInput | string
    policyVersion?: StringFieldUpdateOperationsInput | string
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    rules?: PolicyRuleUncheckedUpdateManyWithoutPolicyNestedInput
  }

  export type BankPolicyCreateManyInput = {
    id: string
    bankName: string
    policyVersion: string
    effectiveFrom: Date | string
    effectiveTo?: Date | string | null
    status: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
  }

  export type BankPolicyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    bankName?: StringFieldUpdateOperationsInput | string
    policyVersion?: StringFieldUpdateOperationsInput | string
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BankPolicyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bankName?: StringFieldUpdateOperationsInput | string
    policyVersion?: StringFieldUpdateOperationsInput | string
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PolicyRuleCreateInput = {
    id: string
    ruleCategory: string
    ruleKey: string
    ruleValue: JsonNullValueInput | InputJsonValue
    policy?: BankPolicyCreateNestedOneWithoutRulesInput
  }

  export type PolicyRuleUncheckedCreateInput = {
    id: string
    policyId?: string | null
    ruleCategory: string
    ruleKey: string
    ruleValue: JsonNullValueInput | InputJsonValue
  }

  export type PolicyRuleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ruleCategory?: StringFieldUpdateOperationsInput | string
    ruleKey?: StringFieldUpdateOperationsInput | string
    ruleValue?: JsonNullValueInput | InputJsonValue
    policy?: BankPolicyUpdateOneWithoutRulesNestedInput
  }

  export type PolicyRuleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    policyId?: NullableStringFieldUpdateOperationsInput | string | null
    ruleCategory?: StringFieldUpdateOperationsInput | string
    ruleKey?: StringFieldUpdateOperationsInput | string
    ruleValue?: JsonNullValueInput | InputJsonValue
  }

  export type PolicyRuleCreateManyInput = {
    id: string
    policyId?: string | null
    ruleCategory: string
    ruleKey: string
    ruleValue: JsonNullValueInput | InputJsonValue
  }

  export type PolicyRuleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ruleCategory?: StringFieldUpdateOperationsInput | string
    ruleKey?: StringFieldUpdateOperationsInput | string
    ruleValue?: JsonNullValueInput | InputJsonValue
  }

  export type PolicyRuleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    policyId?: NullableStringFieldUpdateOperationsInput | string | null
    ruleCategory?: StringFieldUpdateOperationsInput | string
    ruleKey?: StringFieldUpdateOperationsInput | string
    ruleValue?: JsonNullValueInput | InputJsonValue
  }

  export type PolicyDocumentCreateInput = {
    id?: string
    title: string
    category: string
    fileName: string
    mimeType?: string
    fileData: Buffer
    fileSizeBytes?: bigint | number | null
    uploadedByEmail?: string | null
    isActive?: boolean
    uploadedAt?: Date | string
  }

  export type PolicyDocumentUncheckedCreateInput = {
    id?: string
    title: string
    category: string
    fileName: string
    mimeType?: string
    fileData: Buffer
    fileSizeBytes?: bigint | number | null
    uploadedByEmail?: string | null
    isActive?: boolean
    uploadedAt?: Date | string
  }

  export type PolicyDocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileData?: BytesFieldUpdateOperationsInput | Buffer
    fileSizeBytes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    uploadedByEmail?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolicyDocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileData?: BytesFieldUpdateOperationsInput | Buffer
    fileSizeBytes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    uploadedByEmail?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolicyDocumentCreateManyInput = {
    id?: string
    title: string
    category: string
    fileName: string
    mimeType?: string
    fileData: Buffer
    fileSizeBytes?: bigint | number | null
    uploadedByEmail?: string | null
    isActive?: boolean
    uploadedAt?: Date | string
  }

  export type PolicyDocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileData?: BytesFieldUpdateOperationsInput | Buffer
    fileSizeBytes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    uploadedByEmail?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolicyDocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileData?: BytesFieldUpdateOperationsInput | Buffer
    fileSizeBytes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    uploadedByEmail?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    actorEmail?: string | null
    entityType?: string | null
    entityId?: string | null
    details?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    action: string
    actorEmail?: string | null
    entityType?: string | null
    entityId?: string | null
    details?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    entityType?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    entityType?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    action: string
    actorEmail?: string | null
    entityType?: string | null
    entityId?: string | null
    details?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    entityType?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    entityType?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CibilCheckCreateInput = {
    id: string
    requestedBy: string
    fullName: string
    mobileNumber: string
    panNumber?: string | null
    cibilScore: number
    scoreBand: string
    demoMode?: boolean
    createdAt?: Date | string
  }

  export type CibilCheckUncheckedCreateInput = {
    id: string
    requestedBy: string
    fullName: string
    mobileNumber: string
    panNumber?: string | null
    cibilScore: number
    scoreBand: string
    demoMode?: boolean
    createdAt?: Date | string
  }

  export type CibilCheckUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestedBy?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    mobileNumber?: StringFieldUpdateOperationsInput | string
    panNumber?: NullableStringFieldUpdateOperationsInput | string | null
    cibilScore?: IntFieldUpdateOperationsInput | number
    scoreBand?: StringFieldUpdateOperationsInput | string
    demoMode?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CibilCheckUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestedBy?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    mobileNumber?: StringFieldUpdateOperationsInput | string
    panNumber?: NullableStringFieldUpdateOperationsInput | string | null
    cibilScore?: IntFieldUpdateOperationsInput | number
    scoreBand?: StringFieldUpdateOperationsInput | string
    demoMode?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CibilCheckCreateManyInput = {
    id: string
    requestedBy: string
    fullName: string
    mobileNumber: string
    panNumber?: string | null
    cibilScore: number
    scoreBand: string
    demoMode?: boolean
    createdAt?: Date | string
  }

  export type CibilCheckUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestedBy?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    mobileNumber?: StringFieldUpdateOperationsInput | string
    panNumber?: NullableStringFieldUpdateOperationsInput | string | null
    cibilScore?: IntFieldUpdateOperationsInput | number
    scoreBand?: StringFieldUpdateOperationsInput | string
    demoMode?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CibilCheckUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestedBy?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    mobileNumber?: StringFieldUpdateOperationsInput | string
    panNumber?: NullableStringFieldUpdateOperationsInput | string | null
    cibilScore?: IntFieldUpdateOperationsInput | number
    scoreBand?: StringFieldUpdateOperationsInput | string
    demoMode?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type ApplicationStatusHistoryListRelationFilter = {
    every?: ApplicationStatusHistoryWhereInput
    some?: ApplicationStatusHistoryWhereInput
    none?: ApplicationStatusHistoryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ApplicationStatusHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LoanApplicationCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    connectorId?: SortOrder
    amount?: SortOrder
    tenureMonths?: SortOrder
    purpose?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type LoanApplicationAvgOrderByAggregateInput = {
    amount?: SortOrder
    tenureMonths?: SortOrder
  }

  export type LoanApplicationMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    connectorId?: SortOrder
    amount?: SortOrder
    tenureMonths?: SortOrder
    purpose?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type LoanApplicationMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    connectorId?: SortOrder
    amount?: SortOrder
    tenureMonths?: SortOrder
    purpose?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type LoanApplicationSumOrderByAggregateInput = {
    amount?: SortOrder
    tenureMonths?: SortOrder
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

  export type LoanApplicationNullableRelationFilter = {
    is?: LoanApplicationWhereInput | null
    isNot?: LoanApplicationWhereInput | null
  }

  export type ApplicationStatusHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    loanId?: SortOrder
    status?: SortOrder
    remarks?: SortOrder
    changedAt?: SortOrder
    changedBy?: SortOrder
  }

  export type ApplicationStatusHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    loanId?: SortOrder
    status?: SortOrder
    remarks?: SortOrder
    changedAt?: SortOrder
    changedBy?: SortOrder
  }

  export type ApplicationStatusHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    loanId?: SortOrder
    status?: SortOrder
    remarks?: SortOrder
    changedAt?: SortOrder
    changedBy?: SortOrder
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EligibilityRuleCountOrderByAggregateInput = {
    id?: SortOrder
    ruleType?: SortOrder
    minValue?: SortOrder
    maxValue?: SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type EligibilityRuleAvgOrderByAggregateInput = {
    minValue?: SortOrder
    maxValue?: SortOrder
  }

  export type EligibilityRuleMaxOrderByAggregateInput = {
    id?: SortOrder
    ruleType?: SortOrder
    minValue?: SortOrder
    maxValue?: SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type EligibilityRuleMinOrderByAggregateInput = {
    id?: SortOrder
    ruleType?: SortOrder
    minValue?: SortOrder
    maxValue?: SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type EligibilityRuleSumOrderByAggregateInput = {
    minValue?: SortOrder
    maxValue?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type EligibilitySubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    mobileNumber?: SortOrder
    loanAmount?: SortOrder
    loanPurpose?: SortOrder
    monthlyIncome?: SortOrder
    employmentType?: SortOrder
    city?: SortOrder
    panNumber?: SortOrder
    isEligible?: SortOrder
    maxLoanAmount?: SortOrder
    interestRate?: SortOrder
    remarks?: SortOrder
    assignedConnectorId?: SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EligibilitySubmissionAvgOrderByAggregateInput = {
    loanAmount?: SortOrder
    monthlyIncome?: SortOrder
    maxLoanAmount?: SortOrder
    interestRate?: SortOrder
  }

  export type EligibilitySubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    mobileNumber?: SortOrder
    loanAmount?: SortOrder
    loanPurpose?: SortOrder
    monthlyIncome?: SortOrder
    employmentType?: SortOrder
    city?: SortOrder
    panNumber?: SortOrder
    isEligible?: SortOrder
    maxLoanAmount?: SortOrder
    interestRate?: SortOrder
    remarks?: SortOrder
    assignedConnectorId?: SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EligibilitySubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    mobileNumber?: SortOrder
    loanAmount?: SortOrder
    loanPurpose?: SortOrder
    monthlyIncome?: SortOrder
    employmentType?: SortOrder
    city?: SortOrder
    panNumber?: SortOrder
    isEligible?: SortOrder
    maxLoanAmount?: SortOrder
    interestRate?: SortOrder
    remarks?: SortOrder
    assignedConnectorId?: SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EligibilitySubmissionSumOrderByAggregateInput = {
    loanAmount?: SortOrder
    monthlyIncome?: SortOrder
    maxLoanAmount?: SortOrder
    interestRate?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type PolicyRuleListRelationFilter = {
    every?: PolicyRuleWhereInput
    some?: PolicyRuleWhereInput
    none?: PolicyRuleWhereInput
  }

  export type PolicyRuleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BankPolicyBankNamePolicyVersionCompoundUniqueInput = {
    bankName: string
    policyVersion: string
  }

  export type BankPolicyCountOrderByAggregateInput = {
    id?: SortOrder
    bankName?: SortOrder
    policyVersion?: SortOrder
    effectiveFrom?: SortOrder
    effectiveTo?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type BankPolicyMaxOrderByAggregateInput = {
    id?: SortOrder
    bankName?: SortOrder
    policyVersion?: SortOrder
    effectiveFrom?: SortOrder
    effectiveTo?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type BankPolicyMinOrderByAggregateInput = {
    id?: SortOrder
    bankName?: SortOrder
    policyVersion?: SortOrder
    effectiveFrom?: SortOrder
    effectiveTo?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
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

  export type BankPolicyNullableRelationFilter = {
    is?: BankPolicyWhereInput | null
    isNot?: BankPolicyWhereInput | null
  }

  export type PolicyRuleCountOrderByAggregateInput = {
    id?: SortOrder
    policyId?: SortOrder
    ruleCategory?: SortOrder
    ruleKey?: SortOrder
    ruleValue?: SortOrder
  }

  export type PolicyRuleMaxOrderByAggregateInput = {
    id?: SortOrder
    policyId?: SortOrder
    ruleCategory?: SortOrder
    ruleKey?: SortOrder
  }

  export type PolicyRuleMinOrderByAggregateInput = {
    id?: SortOrder
    policyId?: SortOrder
    ruleCategory?: SortOrder
    ruleKey?: SortOrder
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

  export type BytesFilter<$PrismaModel = never> = {
    equals?: Buffer | BytesFieldRefInput<$PrismaModel>
    in?: Buffer[]
    notIn?: Buffer[]
    not?: NestedBytesFilter<$PrismaModel> | Buffer
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

  export type PolicyDocumentCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    category?: SortOrder
    fileName?: SortOrder
    mimeType?: SortOrder
    fileData?: SortOrder
    fileSizeBytes?: SortOrder
    uploadedByEmail?: SortOrder
    isActive?: SortOrder
    uploadedAt?: SortOrder
  }

  export type PolicyDocumentAvgOrderByAggregateInput = {
    fileSizeBytes?: SortOrder
  }

  export type PolicyDocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    category?: SortOrder
    fileName?: SortOrder
    mimeType?: SortOrder
    fileData?: SortOrder
    fileSizeBytes?: SortOrder
    uploadedByEmail?: SortOrder
    isActive?: SortOrder
    uploadedAt?: SortOrder
  }

  export type PolicyDocumentMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    category?: SortOrder
    fileName?: SortOrder
    mimeType?: SortOrder
    fileData?: SortOrder
    fileSizeBytes?: SortOrder
    uploadedByEmail?: SortOrder
    isActive?: SortOrder
    uploadedAt?: SortOrder
  }

  export type PolicyDocumentSumOrderByAggregateInput = {
    fileSizeBytes?: SortOrder
  }

  export type BytesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Buffer | BytesFieldRefInput<$PrismaModel>
    in?: Buffer[]
    notIn?: Buffer[]
    not?: NestedBytesWithAggregatesFilter<$PrismaModel> | Buffer
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBytesFilter<$PrismaModel>
    _max?: NestedBytesFilter<$PrismaModel>
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

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    actorEmail?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    actorEmail?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    actorEmail?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type CibilCheckCountOrderByAggregateInput = {
    id?: SortOrder
    requestedBy?: SortOrder
    fullName?: SortOrder
    mobileNumber?: SortOrder
    panNumber?: SortOrder
    cibilScore?: SortOrder
    scoreBand?: SortOrder
    demoMode?: SortOrder
    createdAt?: SortOrder
  }

  export type CibilCheckAvgOrderByAggregateInput = {
    cibilScore?: SortOrder
  }

  export type CibilCheckMaxOrderByAggregateInput = {
    id?: SortOrder
    requestedBy?: SortOrder
    fullName?: SortOrder
    mobileNumber?: SortOrder
    panNumber?: SortOrder
    cibilScore?: SortOrder
    scoreBand?: SortOrder
    demoMode?: SortOrder
    createdAt?: SortOrder
  }

  export type CibilCheckMinOrderByAggregateInput = {
    id?: SortOrder
    requestedBy?: SortOrder
    fullName?: SortOrder
    mobileNumber?: SortOrder
    panNumber?: SortOrder
    cibilScore?: SortOrder
    scoreBand?: SortOrder
    demoMode?: SortOrder
    createdAt?: SortOrder
  }

  export type CibilCheckSumOrderByAggregateInput = {
    cibilScore?: SortOrder
  }

  export type ApplicationStatusHistoryCreateNestedManyWithoutLoanInput = {
    create?: XOR<ApplicationStatusHistoryCreateWithoutLoanInput, ApplicationStatusHistoryUncheckedCreateWithoutLoanInput> | ApplicationStatusHistoryCreateWithoutLoanInput[] | ApplicationStatusHistoryUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: ApplicationStatusHistoryCreateOrConnectWithoutLoanInput | ApplicationStatusHistoryCreateOrConnectWithoutLoanInput[]
    createMany?: ApplicationStatusHistoryCreateManyLoanInputEnvelope
    connect?: ApplicationStatusHistoryWhereUniqueInput | ApplicationStatusHistoryWhereUniqueInput[]
  }

  export type ApplicationStatusHistoryUncheckedCreateNestedManyWithoutLoanInput = {
    create?: XOR<ApplicationStatusHistoryCreateWithoutLoanInput, ApplicationStatusHistoryUncheckedCreateWithoutLoanInput> | ApplicationStatusHistoryCreateWithoutLoanInput[] | ApplicationStatusHistoryUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: ApplicationStatusHistoryCreateOrConnectWithoutLoanInput | ApplicationStatusHistoryCreateOrConnectWithoutLoanInput[]
    createMany?: ApplicationStatusHistoryCreateManyLoanInputEnvelope
    connect?: ApplicationStatusHistoryWhereUniqueInput | ApplicationStatusHistoryWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ApplicationStatusHistoryUpdateManyWithoutLoanNestedInput = {
    create?: XOR<ApplicationStatusHistoryCreateWithoutLoanInput, ApplicationStatusHistoryUncheckedCreateWithoutLoanInput> | ApplicationStatusHistoryCreateWithoutLoanInput[] | ApplicationStatusHistoryUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: ApplicationStatusHistoryCreateOrConnectWithoutLoanInput | ApplicationStatusHistoryCreateOrConnectWithoutLoanInput[]
    upsert?: ApplicationStatusHistoryUpsertWithWhereUniqueWithoutLoanInput | ApplicationStatusHistoryUpsertWithWhereUniqueWithoutLoanInput[]
    createMany?: ApplicationStatusHistoryCreateManyLoanInputEnvelope
    set?: ApplicationStatusHistoryWhereUniqueInput | ApplicationStatusHistoryWhereUniqueInput[]
    disconnect?: ApplicationStatusHistoryWhereUniqueInput | ApplicationStatusHistoryWhereUniqueInput[]
    delete?: ApplicationStatusHistoryWhereUniqueInput | ApplicationStatusHistoryWhereUniqueInput[]
    connect?: ApplicationStatusHistoryWhereUniqueInput | ApplicationStatusHistoryWhereUniqueInput[]
    update?: ApplicationStatusHistoryUpdateWithWhereUniqueWithoutLoanInput | ApplicationStatusHistoryUpdateWithWhereUniqueWithoutLoanInput[]
    updateMany?: ApplicationStatusHistoryUpdateManyWithWhereWithoutLoanInput | ApplicationStatusHistoryUpdateManyWithWhereWithoutLoanInput[]
    deleteMany?: ApplicationStatusHistoryScalarWhereInput | ApplicationStatusHistoryScalarWhereInput[]
  }

  export type ApplicationStatusHistoryUncheckedUpdateManyWithoutLoanNestedInput = {
    create?: XOR<ApplicationStatusHistoryCreateWithoutLoanInput, ApplicationStatusHistoryUncheckedCreateWithoutLoanInput> | ApplicationStatusHistoryCreateWithoutLoanInput[] | ApplicationStatusHistoryUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: ApplicationStatusHistoryCreateOrConnectWithoutLoanInput | ApplicationStatusHistoryCreateOrConnectWithoutLoanInput[]
    upsert?: ApplicationStatusHistoryUpsertWithWhereUniqueWithoutLoanInput | ApplicationStatusHistoryUpsertWithWhereUniqueWithoutLoanInput[]
    createMany?: ApplicationStatusHistoryCreateManyLoanInputEnvelope
    set?: ApplicationStatusHistoryWhereUniqueInput | ApplicationStatusHistoryWhereUniqueInput[]
    disconnect?: ApplicationStatusHistoryWhereUniqueInput | ApplicationStatusHistoryWhereUniqueInput[]
    delete?: ApplicationStatusHistoryWhereUniqueInput | ApplicationStatusHistoryWhereUniqueInput[]
    connect?: ApplicationStatusHistoryWhereUniqueInput | ApplicationStatusHistoryWhereUniqueInput[]
    update?: ApplicationStatusHistoryUpdateWithWhereUniqueWithoutLoanInput | ApplicationStatusHistoryUpdateWithWhereUniqueWithoutLoanInput[]
    updateMany?: ApplicationStatusHistoryUpdateManyWithWhereWithoutLoanInput | ApplicationStatusHistoryUpdateManyWithWhereWithoutLoanInput[]
    deleteMany?: ApplicationStatusHistoryScalarWhereInput | ApplicationStatusHistoryScalarWhereInput[]
  }

  export type LoanApplicationCreateNestedOneWithoutStatusHistoryInput = {
    create?: XOR<LoanApplicationCreateWithoutStatusHistoryInput, LoanApplicationUncheckedCreateWithoutStatusHistoryInput>
    connectOrCreate?: LoanApplicationCreateOrConnectWithoutStatusHistoryInput
    connect?: LoanApplicationWhereUniqueInput
  }

  export type LoanApplicationUpdateOneWithoutStatusHistoryNestedInput = {
    create?: XOR<LoanApplicationCreateWithoutStatusHistoryInput, LoanApplicationUncheckedCreateWithoutStatusHistoryInput>
    connectOrCreate?: LoanApplicationCreateOrConnectWithoutStatusHistoryInput
    upsert?: LoanApplicationUpsertWithoutStatusHistoryInput
    disconnect?: LoanApplicationWhereInput | boolean
    delete?: LoanApplicationWhereInput | boolean
    connect?: LoanApplicationWhereUniqueInput
    update?: XOR<XOR<LoanApplicationUpdateToOneWithWhereWithoutStatusHistoryInput, LoanApplicationUpdateWithoutStatusHistoryInput>, LoanApplicationUncheckedUpdateWithoutStatusHistoryInput>
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type PolicyRuleCreateNestedManyWithoutPolicyInput = {
    create?: XOR<PolicyRuleCreateWithoutPolicyInput, PolicyRuleUncheckedCreateWithoutPolicyInput> | PolicyRuleCreateWithoutPolicyInput[] | PolicyRuleUncheckedCreateWithoutPolicyInput[]
    connectOrCreate?: PolicyRuleCreateOrConnectWithoutPolicyInput | PolicyRuleCreateOrConnectWithoutPolicyInput[]
    createMany?: PolicyRuleCreateManyPolicyInputEnvelope
    connect?: PolicyRuleWhereUniqueInput | PolicyRuleWhereUniqueInput[]
  }

  export type PolicyRuleUncheckedCreateNestedManyWithoutPolicyInput = {
    create?: XOR<PolicyRuleCreateWithoutPolicyInput, PolicyRuleUncheckedCreateWithoutPolicyInput> | PolicyRuleCreateWithoutPolicyInput[] | PolicyRuleUncheckedCreateWithoutPolicyInput[]
    connectOrCreate?: PolicyRuleCreateOrConnectWithoutPolicyInput | PolicyRuleCreateOrConnectWithoutPolicyInput[]
    createMany?: PolicyRuleCreateManyPolicyInputEnvelope
    connect?: PolicyRuleWhereUniqueInput | PolicyRuleWhereUniqueInput[]
  }

  export type PolicyRuleUpdateManyWithoutPolicyNestedInput = {
    create?: XOR<PolicyRuleCreateWithoutPolicyInput, PolicyRuleUncheckedCreateWithoutPolicyInput> | PolicyRuleCreateWithoutPolicyInput[] | PolicyRuleUncheckedCreateWithoutPolicyInput[]
    connectOrCreate?: PolicyRuleCreateOrConnectWithoutPolicyInput | PolicyRuleCreateOrConnectWithoutPolicyInput[]
    upsert?: PolicyRuleUpsertWithWhereUniqueWithoutPolicyInput | PolicyRuleUpsertWithWhereUniqueWithoutPolicyInput[]
    createMany?: PolicyRuleCreateManyPolicyInputEnvelope
    set?: PolicyRuleWhereUniqueInput | PolicyRuleWhereUniqueInput[]
    disconnect?: PolicyRuleWhereUniqueInput | PolicyRuleWhereUniqueInput[]
    delete?: PolicyRuleWhereUniqueInput | PolicyRuleWhereUniqueInput[]
    connect?: PolicyRuleWhereUniqueInput | PolicyRuleWhereUniqueInput[]
    update?: PolicyRuleUpdateWithWhereUniqueWithoutPolicyInput | PolicyRuleUpdateWithWhereUniqueWithoutPolicyInput[]
    updateMany?: PolicyRuleUpdateManyWithWhereWithoutPolicyInput | PolicyRuleUpdateManyWithWhereWithoutPolicyInput[]
    deleteMany?: PolicyRuleScalarWhereInput | PolicyRuleScalarWhereInput[]
  }

  export type PolicyRuleUncheckedUpdateManyWithoutPolicyNestedInput = {
    create?: XOR<PolicyRuleCreateWithoutPolicyInput, PolicyRuleUncheckedCreateWithoutPolicyInput> | PolicyRuleCreateWithoutPolicyInput[] | PolicyRuleUncheckedCreateWithoutPolicyInput[]
    connectOrCreate?: PolicyRuleCreateOrConnectWithoutPolicyInput | PolicyRuleCreateOrConnectWithoutPolicyInput[]
    upsert?: PolicyRuleUpsertWithWhereUniqueWithoutPolicyInput | PolicyRuleUpsertWithWhereUniqueWithoutPolicyInput[]
    createMany?: PolicyRuleCreateManyPolicyInputEnvelope
    set?: PolicyRuleWhereUniqueInput | PolicyRuleWhereUniqueInput[]
    disconnect?: PolicyRuleWhereUniqueInput | PolicyRuleWhereUniqueInput[]
    delete?: PolicyRuleWhereUniqueInput | PolicyRuleWhereUniqueInput[]
    connect?: PolicyRuleWhereUniqueInput | PolicyRuleWhereUniqueInput[]
    update?: PolicyRuleUpdateWithWhereUniqueWithoutPolicyInput | PolicyRuleUpdateWithWhereUniqueWithoutPolicyInput[]
    updateMany?: PolicyRuleUpdateManyWithWhereWithoutPolicyInput | PolicyRuleUpdateManyWithWhereWithoutPolicyInput[]
    deleteMany?: PolicyRuleScalarWhereInput | PolicyRuleScalarWhereInput[]
  }

  export type BankPolicyCreateNestedOneWithoutRulesInput = {
    create?: XOR<BankPolicyCreateWithoutRulesInput, BankPolicyUncheckedCreateWithoutRulesInput>
    connectOrCreate?: BankPolicyCreateOrConnectWithoutRulesInput
    connect?: BankPolicyWhereUniqueInput
  }

  export type BankPolicyUpdateOneWithoutRulesNestedInput = {
    create?: XOR<BankPolicyCreateWithoutRulesInput, BankPolicyUncheckedCreateWithoutRulesInput>
    connectOrCreate?: BankPolicyCreateOrConnectWithoutRulesInput
    upsert?: BankPolicyUpsertWithoutRulesInput
    disconnect?: BankPolicyWhereInput | boolean
    delete?: BankPolicyWhereInput | boolean
    connect?: BankPolicyWhereUniqueInput
    update?: XOR<XOR<BankPolicyUpdateToOneWithWhereWithoutRulesInput, BankPolicyUpdateWithoutRulesInput>, BankPolicyUncheckedUpdateWithoutRulesInput>
  }

  export type BytesFieldUpdateOperationsInput = {
    set?: Buffer
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
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

  export type NestedBytesFilter<$PrismaModel = never> = {
    equals?: Buffer | BytesFieldRefInput<$PrismaModel>
    in?: Buffer[]
    notIn?: Buffer[]
    not?: NestedBytesFilter<$PrismaModel> | Buffer
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

  export type NestedBytesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Buffer | BytesFieldRefInput<$PrismaModel>
    in?: Buffer[]
    notIn?: Buffer[]
    not?: NestedBytesWithAggregatesFilter<$PrismaModel> | Buffer
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBytesFilter<$PrismaModel>
    _max?: NestedBytesFilter<$PrismaModel>
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

  export type ApplicationStatusHistoryCreateWithoutLoanInput = {
    id: string
    status: string
    remarks?: string | null
    changedAt: Date | string
    changedBy?: string | null
  }

  export type ApplicationStatusHistoryUncheckedCreateWithoutLoanInput = {
    id: string
    status: string
    remarks?: string | null
    changedAt: Date | string
    changedBy?: string | null
  }

  export type ApplicationStatusHistoryCreateOrConnectWithoutLoanInput = {
    where: ApplicationStatusHistoryWhereUniqueInput
    create: XOR<ApplicationStatusHistoryCreateWithoutLoanInput, ApplicationStatusHistoryUncheckedCreateWithoutLoanInput>
  }

  export type ApplicationStatusHistoryCreateManyLoanInputEnvelope = {
    data: ApplicationStatusHistoryCreateManyLoanInput | ApplicationStatusHistoryCreateManyLoanInput[]
    skipDuplicates?: boolean
  }

  export type ApplicationStatusHistoryUpsertWithWhereUniqueWithoutLoanInput = {
    where: ApplicationStatusHistoryWhereUniqueInput
    update: XOR<ApplicationStatusHistoryUpdateWithoutLoanInput, ApplicationStatusHistoryUncheckedUpdateWithoutLoanInput>
    create: XOR<ApplicationStatusHistoryCreateWithoutLoanInput, ApplicationStatusHistoryUncheckedCreateWithoutLoanInput>
  }

  export type ApplicationStatusHistoryUpdateWithWhereUniqueWithoutLoanInput = {
    where: ApplicationStatusHistoryWhereUniqueInput
    data: XOR<ApplicationStatusHistoryUpdateWithoutLoanInput, ApplicationStatusHistoryUncheckedUpdateWithoutLoanInput>
  }

  export type ApplicationStatusHistoryUpdateManyWithWhereWithoutLoanInput = {
    where: ApplicationStatusHistoryScalarWhereInput
    data: XOR<ApplicationStatusHistoryUpdateManyMutationInput, ApplicationStatusHistoryUncheckedUpdateManyWithoutLoanInput>
  }

  export type ApplicationStatusHistoryScalarWhereInput = {
    AND?: ApplicationStatusHistoryScalarWhereInput | ApplicationStatusHistoryScalarWhereInput[]
    OR?: ApplicationStatusHistoryScalarWhereInput[]
    NOT?: ApplicationStatusHistoryScalarWhereInput | ApplicationStatusHistoryScalarWhereInput[]
    id?: StringFilter<"ApplicationStatusHistory"> | string
    loanId?: StringNullableFilter<"ApplicationStatusHistory"> | string | null
    status?: StringFilter<"ApplicationStatusHistory"> | string
    remarks?: StringNullableFilter<"ApplicationStatusHistory"> | string | null
    changedAt?: DateTimeFilter<"ApplicationStatusHistory"> | Date | string
    changedBy?: StringNullableFilter<"ApplicationStatusHistory"> | string | null
  }

  export type LoanApplicationCreateWithoutStatusHistoryInput = {
    id: string
    customerId: string
    connectorId?: string | null
    amount: Decimal | DecimalJsLike | number | string
    tenureMonths: number
    purpose?: string | null
    status: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
  }

  export type LoanApplicationUncheckedCreateWithoutStatusHistoryInput = {
    id: string
    customerId: string
    connectorId?: string | null
    amount: Decimal | DecimalJsLike | number | string
    tenureMonths: number
    purpose?: string | null
    status: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
  }

  export type LoanApplicationCreateOrConnectWithoutStatusHistoryInput = {
    where: LoanApplicationWhereUniqueInput
    create: XOR<LoanApplicationCreateWithoutStatusHistoryInput, LoanApplicationUncheckedCreateWithoutStatusHistoryInput>
  }

  export type LoanApplicationUpsertWithoutStatusHistoryInput = {
    update: XOR<LoanApplicationUpdateWithoutStatusHistoryInput, LoanApplicationUncheckedUpdateWithoutStatusHistoryInput>
    create: XOR<LoanApplicationCreateWithoutStatusHistoryInput, LoanApplicationUncheckedCreateWithoutStatusHistoryInput>
    where?: LoanApplicationWhereInput
  }

  export type LoanApplicationUpdateToOneWithWhereWithoutStatusHistoryInput = {
    where?: LoanApplicationWhereInput
    data: XOR<LoanApplicationUpdateWithoutStatusHistoryInput, LoanApplicationUncheckedUpdateWithoutStatusHistoryInput>
  }

  export type LoanApplicationUpdateWithoutStatusHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    connectorId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tenureMonths?: IntFieldUpdateOperationsInput | number
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LoanApplicationUncheckedUpdateWithoutStatusHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    connectorId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tenureMonths?: IntFieldUpdateOperationsInput | number
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PolicyRuleCreateWithoutPolicyInput = {
    id: string
    ruleCategory: string
    ruleKey: string
    ruleValue: JsonNullValueInput | InputJsonValue
  }

  export type PolicyRuleUncheckedCreateWithoutPolicyInput = {
    id: string
    ruleCategory: string
    ruleKey: string
    ruleValue: JsonNullValueInput | InputJsonValue
  }

  export type PolicyRuleCreateOrConnectWithoutPolicyInput = {
    where: PolicyRuleWhereUniqueInput
    create: XOR<PolicyRuleCreateWithoutPolicyInput, PolicyRuleUncheckedCreateWithoutPolicyInput>
  }

  export type PolicyRuleCreateManyPolicyInputEnvelope = {
    data: PolicyRuleCreateManyPolicyInput | PolicyRuleCreateManyPolicyInput[]
    skipDuplicates?: boolean
  }

  export type PolicyRuleUpsertWithWhereUniqueWithoutPolicyInput = {
    where: PolicyRuleWhereUniqueInput
    update: XOR<PolicyRuleUpdateWithoutPolicyInput, PolicyRuleUncheckedUpdateWithoutPolicyInput>
    create: XOR<PolicyRuleCreateWithoutPolicyInput, PolicyRuleUncheckedCreateWithoutPolicyInput>
  }

  export type PolicyRuleUpdateWithWhereUniqueWithoutPolicyInput = {
    where: PolicyRuleWhereUniqueInput
    data: XOR<PolicyRuleUpdateWithoutPolicyInput, PolicyRuleUncheckedUpdateWithoutPolicyInput>
  }

  export type PolicyRuleUpdateManyWithWhereWithoutPolicyInput = {
    where: PolicyRuleScalarWhereInput
    data: XOR<PolicyRuleUpdateManyMutationInput, PolicyRuleUncheckedUpdateManyWithoutPolicyInput>
  }

  export type PolicyRuleScalarWhereInput = {
    AND?: PolicyRuleScalarWhereInput | PolicyRuleScalarWhereInput[]
    OR?: PolicyRuleScalarWhereInput[]
    NOT?: PolicyRuleScalarWhereInput | PolicyRuleScalarWhereInput[]
    id?: StringFilter<"PolicyRule"> | string
    policyId?: StringNullableFilter<"PolicyRule"> | string | null
    ruleCategory?: StringFilter<"PolicyRule"> | string
    ruleKey?: StringFilter<"PolicyRule"> | string
    ruleValue?: JsonFilter<"PolicyRule">
  }

  export type BankPolicyCreateWithoutRulesInput = {
    id: string
    bankName: string
    policyVersion: string
    effectiveFrom: Date | string
    effectiveTo?: Date | string | null
    status: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
  }

  export type BankPolicyUncheckedCreateWithoutRulesInput = {
    id: string
    bankName: string
    policyVersion: string
    effectiveFrom: Date | string
    effectiveTo?: Date | string | null
    status: string
    createdAt: Date | string
    updatedAt?: Date | string | null
    createdBy?: string | null
    updatedBy?: string | null
  }

  export type BankPolicyCreateOrConnectWithoutRulesInput = {
    where: BankPolicyWhereUniqueInput
    create: XOR<BankPolicyCreateWithoutRulesInput, BankPolicyUncheckedCreateWithoutRulesInput>
  }

  export type BankPolicyUpsertWithoutRulesInput = {
    update: XOR<BankPolicyUpdateWithoutRulesInput, BankPolicyUncheckedUpdateWithoutRulesInput>
    create: XOR<BankPolicyCreateWithoutRulesInput, BankPolicyUncheckedCreateWithoutRulesInput>
    where?: BankPolicyWhereInput
  }

  export type BankPolicyUpdateToOneWithWhereWithoutRulesInput = {
    where?: BankPolicyWhereInput
    data: XOR<BankPolicyUpdateWithoutRulesInput, BankPolicyUncheckedUpdateWithoutRulesInput>
  }

  export type BankPolicyUpdateWithoutRulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    bankName?: StringFieldUpdateOperationsInput | string
    policyVersion?: StringFieldUpdateOperationsInput | string
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BankPolicyUncheckedUpdateWithoutRulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    bankName?: StringFieldUpdateOperationsInput | string
    policyVersion?: StringFieldUpdateOperationsInput | string
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ApplicationStatusHistoryCreateManyLoanInput = {
    id: string
    status: string
    remarks?: string | null
    changedAt: Date | string
    changedBy?: string | null
  }

  export type ApplicationStatusHistoryUpdateWithoutLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ApplicationStatusHistoryUncheckedUpdateWithoutLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ApplicationStatusHistoryUncheckedUpdateManyWithoutLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PolicyRuleCreateManyPolicyInput = {
    id: string
    ruleCategory: string
    ruleKey: string
    ruleValue: JsonNullValueInput | InputJsonValue
  }

  export type PolicyRuleUpdateWithoutPolicyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ruleCategory?: StringFieldUpdateOperationsInput | string
    ruleKey?: StringFieldUpdateOperationsInput | string
    ruleValue?: JsonNullValueInput | InputJsonValue
  }

  export type PolicyRuleUncheckedUpdateWithoutPolicyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ruleCategory?: StringFieldUpdateOperationsInput | string
    ruleKey?: StringFieldUpdateOperationsInput | string
    ruleValue?: JsonNullValueInput | InputJsonValue
  }

  export type PolicyRuleUncheckedUpdateManyWithoutPolicyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ruleCategory?: StringFieldUpdateOperationsInput | string
    ruleKey?: StringFieldUpdateOperationsInput | string
    ruleValue?: JsonNullValueInput | InputJsonValue
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use LoanApplicationCountOutputTypeDefaultArgs instead
     */
    export type LoanApplicationCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LoanApplicationCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BankPolicyCountOutputTypeDefaultArgs instead
     */
    export type BankPolicyCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BankPolicyCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LoanApplicationDefaultArgs instead
     */
    export type LoanApplicationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LoanApplicationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ApplicationStatusHistoryDefaultArgs instead
     */
    export type ApplicationStatusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ApplicationStatusHistoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EligibilityRuleDefaultArgs instead
     */
    export type EligibilityRuleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EligibilityRuleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EligibilitySubmissionDefaultArgs instead
     */
    export type EligibilitySubmissionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EligibilitySubmissionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BankPolicyDefaultArgs instead
     */
    export type BankPolicyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BankPolicyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PolicyRuleDefaultArgs instead
     */
    export type PolicyRuleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PolicyRuleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PolicyDocumentDefaultArgs instead
     */
    export type PolicyDocumentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PolicyDocumentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditLogDefaultArgs instead
     */
    export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CibilCheckDefaultArgs instead
     */
    export type CibilCheckArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CibilCheckDefaultArgs<ExtArgs>

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