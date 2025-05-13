/**
 * 本地存储工具函数
 * 提供对localStorage的封装，简化存取操作
 */

// 存储数据到本地
export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error('保存到localStorage失败:', error);
  }
};

// 从本地获取数据
export const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return defaultValue;
    }
    return JSON.parse(serializedData) as T;
  } catch (error) {
    console.error('从localStorage获取数据失败:', error);
    return defaultValue;
  }
};

// 从本地删除数据
export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('从localStorage删除数据失败:', error);
  }
}; 