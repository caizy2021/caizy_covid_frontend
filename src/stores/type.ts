export interface ShowAddSwitch {
  all: boolean;
  suspect: boolean;
  nowSevere: boolean;
  noInfect: boolean;
  localinfeciton: boolean;
  confirm: boolean;
  dead: boolean;
  heal: boolean;
  nowConfirm: boolean;
  importedCase: boolean;
  localConfirm: boolean;
}

export interface Today {
  confirm: number;
  isUpdated: boolean;
}

export interface Total {
  showRate: boolean;
  heal: number;
  showHeal: boolean;
  wzz: number;
  provinceLocalConfirm: number;
  nowConfirm: number;
  confirm: number;
  dead: number;
}

export interface Today {
  confirm: number;
  confirmCuts: number;
  isUpdated: boolean;
  tip: string;
  wzz_add: number;
}

export interface Total {
  showHeal: boolean;
  wzz: number;
  provinceLocalConfirm: number;
  nowConfirm: number;
  confirm: number;
  dead: number;
  showRate: boolean;
  heal: number;
}

export interface Today {
  confirm: number;
  confirmCuts: number;
  isUpdated: boolean;
}

export interface Total {
  nowConfirm: number;
  confirm: number;
  dead: number;
  showRate: boolean;
  heal: number;
  showHeal: boolean;
  wzz: number;
  provinceLocalConfirm: number;
}

export interface Children {
  name: string;
  today: Today;
  total: Total;
}

export interface Children {
  today: Today;
  total: Total;
  children: Children[];
  name: string;
}

export interface AreaTree {
  name: string;
  today: Today;
  total: Total;
  children: Children[];
}

export interface ChinaTotal {
  confirm: number;
  nowConfirm: number;
  localConfirm: number;
  dead: number;
  importedCase: number;
  noInfect: number;
  showlocalinfeciton: number;
  noInfectH5: number;
  localConfirmH5: number;
  local_acc_confirm: number;
  suspect: number;
  nowSevere: number;
  showLocalConfirm: number;
  heal: number;
}

export interface ChinaAdd {
  confirm: number;
  heal: number;
  dead: number;
  importedCase: number;
  localConfirmH5: number;
  nowConfirm: number;
  suspect: number;
  nowSevere: number;
  noInfect: number;
  localConfirm: number;
  noInfectH5: number;
}

export interface Diseaseh5Shelf {
  showAddSwitch: ShowAddSwitch;
  areaTree: AreaTree[];
  lastUpdateTime: string;
  chinaTotal: ChinaTotal;
  chinaAdd: ChinaAdd;
  isShowAdd: boolean;
}

export interface StatisGradeCityDetail {
  province: string;
  nowConfirm: number;
  confirm: number;
  grade: string;
  date: string;
  city: string;
  confirmAdd: number;
  dead: number;
  heal: number;
  sdate: string;
  syear: number;
}

export interface RootObject {
  diseaseh5Shelf: Diseaseh5Shelf;
  statisGradeCityDetail: StatisGradeCityDetail[];
}