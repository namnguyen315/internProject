/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {fetcher} from "./Fetcher";
import {
  IDataBonus,
  IDataCost,
  IDataDeductionDay,
  IDataOnsite,
  IDataOverTime,
  IDataProject,
  IDataProjectList,
  IDataSalary,
  IDataSalaryToTalOfUser,
} from "@app/types";

const path = {
  getListSalaryTotalUser: "/total-salary",
  getMyListTotalSalary: "/total-salary/me",
  getListTotalSalary: "/total-salary/total-cost",
  getMyListOnsiteSalary: "/onsite-salary/me",
  getListOnsiteSalary: "/onsite-salary",
  deleteOnsiteSalary: "/onsite-salary/",
  getMyListOTSalary: "/overtime-salary/me",
  getListOTSalary: "/overtime-salary",
  deleteOTSalary: "/overtime-salary/",
  getMyProjectSalary: "/project-salary",
  getMyBonusSalary: "/bonus-salary",
  getMyDeductionDaySalary: "/deduction-day-off",
  getMyDeductionHourSalary: "/deduction-hour-late",
  getListProject: "/project",
  createOTSalary: "/overtime-salary",
  createOnsiteSalary: "/onsite-salary",
  createTotalSalary: "/total-salary",
  getUserOfProject: "/salary",
  updateOnsiteSalary: "/onsite-salary/accept",
  updateOTSalary: "/overtime-salary/accept",
  createBonusSalary: "/bonus-salary",
  deleteBonusSalary: "/bonus-salary/",
  deleteProjectSalary: "/project-salary",
  createDeductionDaySalary: "/deduction-day-off",
  createDeductionHourSalary: "/deduction-hour-late",
  acceptToTalSalary: "/total-salary/accept",
  lockToTalSalary: "/total-salary/lock",
  unLockToTalSalary: "/total-salary/unlock",
  createSalaryAllEmployee: "/total-salary/create-all-user",
  updateTotalSalary: "/total-salary/",
  updateOSSalary: "/total-salary/",
  getListProjectOfMember: "/project/participate",
  taxCalculator: "/total-salary/tax-calculator",
};

interface IBodyOTSalary {
  user: number | string;
  project: number;
  hour: number;
  date: string;
}

interface IBodyOnsiteSalary {
  user: number | string;
  onsitePlace: string;
  date: string;
}

function updateOSSalary(
  id: number,
  dailyOnsiteRate: number
): Promise<IDataOnsite[]> {
  return fetcher({
    url: path.updateOSSalary + `${id}/daily-onsite-rate`,
    method: "patch",
    data: {dailyOnsiteRate},
  });
}

function createSalaryAllEmployee(
  year: number,
  month: number
): Promise<IDataOnsite[]> {
  return fetcher({
    url: path.createSalaryAllEmployee,
    method: "post",
    data: {month, year},
  });
}

function lockToTalSalary(ids: number[]): Promise<IDataSalaryToTalOfUser[]> {
  return fetcher({
    url: path.lockToTalSalary,
    method: "post",
    data: {ids},
  });
}

function unLockToTalSalary(ids: number[]): Promise<IDataSalaryToTalOfUser[]> {
  return fetcher({
    url: path.unLockToTalSalary,
    method: "post",
    data: {ids},
  });
}

function acceptToTalSalary(ids: number[]): Promise<IDataSalaryToTalOfUser[]> {
  return fetcher({
    url: path.acceptToTalSalary,
    method: "post",
    data: {ids},
  });
}

function getListSalaryTotalUser(
  year: number,
  month: number,
  state?: number,
  search?: string,
  pageSize?: number
): Promise<IDataSalaryToTalOfUser[]> {
  return fetcher({
    url: path.getListSalaryTotalUser,
    method: "get",
    params: {
      pageSize,
      filter: {date_month: month, date_year: year, state: state},
      searchFields: ["fullName", "email"],
      search,
    },
  });
}

function getMyListTotalSalary(
  year: number,
  month?: number
): Promise<IDataSalary[]> {
  return fetcher({
    url: path.getMyListTotalSalary,
    method: "get",
    params: {filter: {date_year: year, date_month: month}},
  });
}

function getTotalSalaryById(
  id: number,
  year: number,
  month?: number
): Promise<IDataSalary> {
  return fetcher({
    url: path.getListSalaryTotalUser + "/" + id + "/detail",
    method: "get",
    params: {filter: {date_year: year, date_month: month}},
  });
}

function taxCalculator(
  totalSalary: number,
  user: number
): Promise<{
  deductionFamilyCircumstances: number;
  deductionOwn: number;
  taxableSalary: number;
  taxSalary: number;
  tax: number;
}> {
  return fetcher({
    url: path.taxCalculator,
    method: "post",
    data: {totalSalary, user},
  });
}

function createTotalSalary(id: number, date: string): Promise<IDataSalary[]> {
  return fetcher({
    url: path.createTotalSalary,
    method: "post",
    data: {user: id, date},
  });
}

function updateTotalSalary(
  data: {
    date?: string;
    onsiteSalary?: number;
    bonusSalary?: number;
    manageSalary?: number;
    overtimeSalary?: number;
    projectSalary?: number;
    deductionSalary?: number;
  },
  id: number
): Promise<IDataSalary[]> {
  return fetcher({
    url: path.updateTotalSalary + id,
    method: "patch",
    data,
  });
}

function getListTotalSalary(year: number): Promise<IDataCost> {
  return fetcher({
    url: path.getListTotalSalary,
    method: "post",
    data: {year},
  });
}

function createOnsiteSalary(data: IBodyOnsiteSalary[]): Promise<IDataOnsite[]> {
  return fetcher({
    url: path.createOnsiteSalary,
    method: "post",
    data,
  });
}

function getMyListOnsiteSalary(
  year: number,
  month: number,
  userId?: number,
  projectId?: number
): Promise<IDataOnsite[]> {
  return fetcher({
    url: userId ? path.getListOnsiteSalary : path.getMyListOnsiteSalary,
    method: "get",
    params: {filter: {date_month: month, date_year: year, userId, projectId}},
  });
}

function updateOnsiteSalary(data: {ids: number[]}): Promise<any> {
  return fetcher({
    url: path.updateOnsiteSalary,
    method: "post",
    data,
  });
}

function deleteOnsiteSalary(id: number): Promise<any> {
  return fetcher({
    url: path.deleteOnsiteSalary + id,
    method: "delete",
  });
}

function createOTSalary(data: IBodyOTSalary[]): Promise<IDataOnsite[]> {
  return fetcher({
    url: path.createOTSalary,
    method: "post",
    data,
  });
}

function getMyListOTSalary(
  year: number,
  month: number,
  userId?: number,
  projectId?: number
): Promise<IDataOverTime[]> {
  return fetcher({
    url: userId ? path.getListOTSalary : path.getMyListOTSalary,
    method: "get",
    params: {filter: {date_month: month, date_year: year, userId, projectId}},
  });
}

function updateOTSalary(data: {ids: number[]}): Promise<any> {
  return fetcher({
    url: path.updateOTSalary,
    method: "post",
    data,
  });
}

function deleteOTSalary(id: number): Promise<any> {
  return fetcher({
    url: path.deleteOTSalary + id,
    method: "delete",
  });
}

function getMyProjectSalary(
  year: number,
  month: number,
  userId: number
): Promise<IDataProject[]> {
  return fetcher({
    url: path.getMyProjectSalary,
    method: "get",
    params: {filter: {date_month: month, date_year: year, userId}},
  });
}

function deleteProjectSalary(id: number): Promise<IDataBonus[]> {
  return fetcher({
    url: path.deleteProjectSalary + "/" + id,
    method: "delete",
    params: {id},
  });
}

function createBonusSalary(data: {
  user: number;
  reason: string;
  date: string;
  salary: number;
}): Promise<IDataOverTime[]> {
  return fetcher({
    url: path.createBonusSalary,
    method: "post",
    data,
  });
}

function deleteBonusSalary(id: number): Promise<IDataBonus[]> {
  return fetcher({
    url: path.deleteBonusSalary + id,
    method: "delete",
    params: {id},
  });
}

function getMyBonusSalary(
  year: number,
  month: number,
  userId: number
): Promise<IDataBonus[]> {
  return fetcher({
    url: path.getMyBonusSalary,
    method: "get",
    params: {filter: {date_month: month, date_year: year, userId}},
  });
}

function getMyDeductionDaySalary(
  year: number,
  month: number,
  userId?: number
): Promise<IDataDeductionDay[]> {
  return fetcher({
    url: path.getMyDeductionDaySalary,
    method: "get",
    params: {filter: {date_month: month, date_year: year, userId}},
  });
}

function createDeductionHourSalary(data: {
  user: number;
  hourLateWork: number;
  date: string;
}): Promise<IDataDeductionDay[]> {
  return fetcher({
    url: path.createDeductionHourSalary,
    method: "post",
    data,
  });
}

function deleteDeductionHourSalary(id: number): Promise<IDataDeductionDay[]> {
  return fetcher({
    url: path.createDeductionHourSalary + "/" + id,
    method: "delete",
    params: {id},
  });
}

function createDeductionDaySalary(data: {
  user: number;
  dayOffWork: number;
  date: string;
}): Promise<IDataDeductionDay[]> {
  return fetcher({
    url: path.createDeductionDaySalary,
    method: "post",
    data,
  });
}

function deleteDeductionDaySalary(id: number): Promise<IDataDeductionDay[]> {
  return fetcher({
    url: path.createDeductionDaySalary + "/" + id,
    method: "delete",
    params: {id},
  });
}

function getMyDeductionHourSalary(
  year: number,
  month: number,
  userId?: number
): Promise<IDataDeductionDay[]> {
  return fetcher({
    url: path.getMyDeductionHourSalary,
    method: "get",
    params: {filter: {date_month: month, date_year: year, userId}},
  });
}

function createSalaryProject(data: {
  user: number;
  project: number;
  salary: number;
  totalSalaryId: number;
  date: string;
}): Promise<any> {
  return fetcher({
    url: path.getMyProjectSalary,
    method: "post",
    data: [data],
  });
}

function getListProject(
  name?: string,
  projectId?: number,
  userId?: number
): Promise<IDataProjectList[]> {
  return fetcher({
    url: path.getListProject,
    method: "get",
    params: {filter: {name, projectId: projectId, userId: userId}},
  });
}

function getListProjectOfMe(): Promise<IDataProjectList[]> {
  return fetcher({
    url: `/project/participate`,
    method: "get",
  });
}

function getUserOfProject(projectId: number, month: number, year: number) {
  return fetcher({
    url: path.getUserOfProject,
    method: "get",
    params: {projectId, month, year},
  });
}

export default {
  createTotalSalary,
  createSalaryProject,
  getUserOfProject,
  getTotalSalaryById,
  taxCalculator,
  createOnsiteSalary,
  getListProjectOfMe,
  createOTSalary,
  getListTotalSalary,
  getListProject,
  getMyDeductionDaySalary,
  getMyDeductionHourSalary,
  getMyBonusSalary,
  getMyProjectSalary,
  deleteOTSalary,
  getMyListOTSalary,
  deleteOnsiteSalary,
  getMyListOnsiteSalary,
  getMyListTotalSalary,
  updateOnsiteSalary,
  updateOTSalary,
  getListSalaryTotalUser,
  createBonusSalary,
  deleteBonusSalary,
  deleteProjectSalary,
  createDeductionDaySalary,
  deleteDeductionDaySalary,
  createDeductionHourSalary,
  deleteDeductionHourSalary,
  acceptToTalSalary,
  lockToTalSalary,
  unLockToTalSalary,
  createSalaryAllEmployee,
  updateTotalSalary,
  updateOSSalary,
};
