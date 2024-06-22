import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

interface IDependent {
  id: number;
  name: string;
}

export interface IEmployee {
  id: number;
  name: string;
  dependents: IDependent[];
}

export interface IEmployeeCheck extends IEmployee {
  costPerPaycheck: number;
}

const { persistAtom } = recoilPersist();

export const employeesState = atom<IEmployee[]>({
  key: "employeesState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
