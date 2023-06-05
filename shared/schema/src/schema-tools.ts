export interface SchemaInterface {
  [modelName: string]: {
    code: number;
    tableName: string;
    fields: {
      list: string[];
      public?: string[];
      admin?: string[];
    };
    joins?: {
      oneToOne?: { [field: string]: string };
      oneToMany?: { [field: string]: string };
    };
  };
}

export interface PagesInterface {
  [modelName: string]: {
    item: string;
    joins?: Array<any>;
    full?: Array<any>;
  };
}

export const indexesFromSchema = (schema: SchemaInterface) => {
  return Object.keys(schema).reduce((indexes, parentName) => {
    if (!schema[parentName].joins?.oneToMany) return indexes;
    Object.values(schema[parentName].joins.oneToMany).forEach(childName => {
      indexes[childName + '_BY_' + parentName] = {};
    });
    return indexes;
  }, {});
};
