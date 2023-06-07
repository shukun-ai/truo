/**
 * @remark
 *
 * This file is override the http-query, because we can not validate query in JSON Schema and generate correct types.
 */

/**
 * Describe HTTP Request Incoming Payload
 */
export interface HttpQuerySchema {
  filter?: QueryFilter;
  select?: {
    /**
     * The style is like MongoDB.
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^(\w)+$".
     */
    [k: string]: boolean;
  };
  sort?: {
    /**
     * The style is like MongoDB.
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^(\w)+$".
     */
    [k: string]: 'asc' | 'desc';
  };
  limit?: number;
  skip?: number;
  count?: boolean;
}

export type QueryFilterBasicValue = string | number | boolean;

export type QueryFilter =
  | {
      [k: string]: QueryFilterExpression;
    }
  | {
      $and: QueryFilter[];
    }
  | {
      $or: QueryFilter[];
    };

export type QueryFilterExpression =
  | QueryFilterBasicValue
  | {
      $eq?: QueryFilterBasicValue | null;
    }
  | {
      $ne?: QueryFilterBasicValue | null;
    }
  | {
      $gt?: QueryFilterBasicValue;
    }
  | {
      $gte?: QueryFilterBasicValue;
    }
  | {
      $lt?: QueryFilterBasicValue;
    }
  | {
      $lte?: QueryFilterBasicValue;
    }
  | {
      $in?: QueryFilterBasicValue[];
    }
  | {
      $nin?: QueryFilterBasicValue[];
    }
  | {
      $and?: QueryFilter[];
    }
  | {
      $or?: QueryFilter[];
    }
  | {
      $foreign?: QueryFilter;
    }
  | {
      $like?: string;
    };
