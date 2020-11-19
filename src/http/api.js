import { get, post } from "./http";

// 登录 获取token
export const login = params => post("admin/admin/portal/login", params);

// 异常监控列表
export const getAbnormalMonitoring = params =>
  get("energy/api/security/warn/findAll", params);

// 能源供给板块
// 获取能量累计值
export const getAllEnergyNum = params =>
  get("energy/api/supply/accumulative", params);

// 获取能源种类数据 冷热热水
export const getSingleEnergyNum = params =>
  get("energy/api/supply/current/getEnergyCategory", params);

// 获取能源种类数据 电
export const getElectricNum = params =>
  get("energy/api/supply/current/getKindElectricity", params);

// 能源消费板块
// 获取能量累计值
export const getConsumerAllEnergyNum = params =>
  get("energy/api/consumer/accumulative", params);

// 获取能源种类数据 冷热水电
export const getConsumerEnergyNum = params =>
  get("energy/api/consumer/building/getEnergyType", params);

// 能源分析板块
// 获取节省金额
export const getSavings = params =>
  get("energy/api/optimization/total/price", params);

// 节能趋势
export const getEnergySavingTrend = params =>
  get("energy/api/consumer/date/allType/saveEnergy", params);

// 耗能对比
export const getEnergyComparison = params =>
  get("energy/api/consumer/date/allType/total", params);
