export interface IDependent {
  id: number;
  name: string;
}

export interface IEmployee {
  id: number;
  name: string;
  dependents: IDependent[];
}
