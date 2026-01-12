/**
 * LocalStorage 数据存储服务
 *
 * 用于 MVP 阶段的数据持久化
 * 后续可迁移到数据库
 */

import {
  PositionInput,
  PositionFailureProfile,
  CandidateInput,
  FailurePredictionReport,
} from '@/types/judger';

// Storage Keys
const STORAGE_KEYS = {
  POSITIONS: 'judger_positions',
  FAILURE_PROFILES: 'judger_failure_profiles',
  CANDIDATES: 'judger_candidates',
  FAILURE_REPORTS: 'judger_failure_reports',
};

// ==================== 岗位相关 ====================

/**
 * 保存岗位
 */
export const savePosition = (position: PositionInput): void => {
  try {
    const positions = getAllPositions();
    const existingIndex = positions.findIndex((p) => p.id === position.id);

    if (existingIndex >= 0) {
      positions[existingIndex] = position;
    } else {
      positions.push(position);
    }

    localStorage.setItem(STORAGE_KEYS.POSITIONS, JSON.stringify(positions));
  } catch (error) {
    console.error('保存岗位失败:', error);
    throw new Error('保存岗位失败');
  }
};

/**
 * 获取所有岗位
 */
export const getAllPositions = (): PositionInput[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.POSITIONS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('读取岗位失败:', error);
    return [];
  }
};

/**
 * 根据ID获取岗位
 */
export const getPositionById = (id: string): PositionInput | null => {
  const positions = getAllPositions();
  return positions.find((p) => p.id === id) || null;
};

/**
 * 删除岗位
 */
export const deletePosition = (id: string): void => {
  try {
    const positions = getAllPositions();
    const filtered = positions.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.POSITIONS, JSON.stringify(filtered));

    // 同时删除关联的失败画像
    deleteFailureProfile(id);
  } catch (error) {
    console.error('删除岗位失败:', error);
    throw new Error('删除岗位失败');
  }
};

// ==================== 失败画像相关 ====================

/**
 * 保存失败画像
 */
export const saveFailureProfile = (profile: PositionFailureProfile): void => {
  try {
    const profiles = getAllFailureProfiles();
    const existingIndex = profiles.findIndex((p) => p.positionId === profile.positionId);

    if (existingIndex >= 0) {
      profiles[existingIndex] = profile;
    } else {
      profiles.push(profile);
    }

    localStorage.setItem(STORAGE_KEYS.FAILURE_PROFILES, JSON.stringify(profiles));
  } catch (error) {
    console.error('保存失败画像失败:', error);
    throw new Error('保存失败画像失败');
  }
};

/**
 * 获取所有失败画像
 */
export const getAllFailureProfiles = (): PositionFailureProfile[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.FAILURE_PROFILES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('读取失败画像失败:', error);
    return [];
  }
};

/**
 * 根据岗位ID获取失败画像
 */
export const getFailureProfileByPositionId = (
  positionId: string
): PositionFailureProfile | null => {
  const profiles = getAllFailureProfiles();
  return profiles.find((p) => p.positionId === positionId) || null;
};

/**
 * 删除失败画像
 */
export const deleteFailureProfile = (positionId: string): void => {
  try {
    const profiles = getAllFailureProfiles();
    const filtered = profiles.filter((p) => p.positionId !== positionId);
    localStorage.setItem(STORAGE_KEYS.FAILURE_PROFILES, JSON.stringify(filtered));
  } catch (error) {
    console.error('删除失败画像失败:', error);
    throw new Error('删除失败画像失败');
  }
};

// ==================== 候选人相关 ====================

/**
 * 保存候选人
 */
export const saveCandidate = (candidate: CandidateInput): void => {
  try {
    const candidates = getAllCandidates();
    const existingIndex = candidates.findIndex((c) => c.id === candidate.id);

    if (existingIndex >= 0) {
      candidates[existingIndex] = candidate;
    } else {
      candidates.push(candidate);
    }

    localStorage.setItem(STORAGE_KEYS.CANDIDATES, JSON.stringify(candidates));
  } catch (error) {
    console.error('保存候选人失败:', error);
    throw new Error('保存候选人失败');
  }
};

/**
 * 获取所有候选人
 */
export const getAllCandidates = (): CandidateInput[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CANDIDATES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('读取候选人失败:', error);
    return [];
  }
};

/**
 * 根据ID获取候选人
 */
export const getCandidateById = (id: string): CandidateInput | null => {
  const candidates = getAllCandidates();
  return candidates.find((c) => c.id === id) || null;
};

/**
 * 删除候选人
 */
export const deleteCandidate = (id: string): void => {
  try {
    const candidates = getAllCandidates();
    const filtered = candidates.filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.CANDIDATES, JSON.stringify(filtered));

    // 同时删除关联的失败报告
    deleteFailureReport(id);
  } catch (error) {
    console.error('删除候选人失败:', error);
    throw new Error('删除候选人失败');
  }
};

// ==================== 失败预判报告相关 ====================

/**
 * 保存失败预判报告
 */
export const saveFailureReport = (report: FailurePredictionReport): void => {
  try {
    const reports = getAllFailureReports();
    const existingIndex = reports.findIndex((r) => r.candidateId === report.candidateId);

    if (existingIndex >= 0) {
      reports[existingIndex] = report;
    } else {
      reports.push(report);
    }

    localStorage.setItem(STORAGE_KEYS.FAILURE_REPORTS, JSON.stringify(reports));
  } catch (error) {
    console.error('保存失败报告失败:', error);
    throw new Error('保存失败报告失败');
  }
};

/**
 * 获取所有失败预判报告
 */
export const getAllFailureReports = (): FailurePredictionReport[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.FAILURE_REPORTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('读取失败报告失败:', error);
    return [];
  }
};

/**
 * 根据候选人ID获取失败预判报告
 */
export const getFailureReportByCandidateId = (
  candidateId: string
): FailurePredictionReport | null => {
  const reports = getAllFailureReports();
  return reports.find((r) => r.candidateId === candidateId) || null;
};

/**
 * 删除失败预判报告
 */
export const deleteFailureReport = (candidateId: string): void => {
  try {
    const reports = getAllFailureReports();
    const filtered = reports.filter((r) => r.candidateId !== candidateId);
    localStorage.setItem(STORAGE_KEYS.FAILURE_REPORTS, JSON.stringify(filtered));
  } catch (error) {
    console.error('删除失败报告失败:', error);
    throw new Error('删除失败报告失败');
  }
};

// ==================== 工具函数 ====================

/**
 * 清空所有数据（用于测试或重置）
 */
export const clearAllData = (): void => {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('清空数据失败:', error);
    throw new Error('清空数据失败');
  }
};

/**
 * 获取存储使用情况
 */
export const getStorageInfo = () => {
  return {
    positions: getAllPositions().length,
    failureProfiles: getAllFailureProfiles().length,
    candidates: getAllCandidates().length,
    failureReports: getAllFailureReports().length,
  };
};

/**
 * 导出所有数据（用于备份）
 */
export const exportAllData = () => {
  return {
    positions: getAllPositions(),
    failureProfiles: getAllFailureProfiles(),
    candidates: getAllCandidates(),
    failureReports: getAllFailureReports(),
    exportedAt: new Date().toISOString(),
  };
};

/**
 * 导入数据（用于恢复）
 */
export const importAllData = (data: ReturnType<typeof exportAllData>): void => {
  try {
    if (data.positions) {
      localStorage.setItem(STORAGE_KEYS.POSITIONS, JSON.stringify(data.positions));
    }
    if (data.failureProfiles) {
      localStorage.setItem(STORAGE_KEYS.FAILURE_PROFILES, JSON.stringify(data.failureProfiles));
    }
    if (data.candidates) {
      localStorage.setItem(STORAGE_KEYS.CANDIDATES, JSON.stringify(data.candidates));
    }
    if (data.failureReports) {
      localStorage.setItem(STORAGE_KEYS.FAILURE_REPORTS, JSON.stringify(data.failureReports));
    }
  } catch (error) {
    console.error('导入数据失败:', error);
    throw new Error('导入数据失败');
  }
};
