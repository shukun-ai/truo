export type IDString = string;
export type OperatorId = IDString | null;
export type DateTimeIsoString = string;

export type UnknownSourceModel = {
  _id: IDString;
  createdAt?: DateTimeIsoString;
  updatedAt?: DateTimeIsoString;
  [name: string]: unknown;
};
