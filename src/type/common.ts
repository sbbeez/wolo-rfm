export interface ICommonModelKey {
  key: string;
}

export interface ICommonModel {
  name: string;
  description: string;
}

export interface IMetadata {
  created_by?: string;
  created?: Date;
  deleted?: Date;
  deleted_by?: string;
  last_modified?: Date;
  last_modified_by?: string;
}
