/**
 * 将指定的K/V插入到缓存中  - 异步
 * @param {Object} key
 * @param {Object} value
 */
const setItem = function (key, value) {
  if (!key) {
    return;
  }

  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }

  uni.setStorage({
    key: key,
    data: value,
    success: ()=>{
    },
    fail: () => {
    }
  });
};

/**
 * 将指定的K/V插入到缓存中  - 同步
 * @param {Object} key
 * @param {Object} value
 */
const setItemSync = function (key, value) {
  if (!key || !value) {
    return;
  }

  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }

  try {
    uni.setStorageSync(key, value);
  } catch (e) {
    // TODO handle the exception
  }
};

/**
 * 获取指定缓存信息 -异步
 * @param {Object} key
 */
const getItem = function (key) {
  if (!key) {
    return null;
  }

  return new Promise((resolve, reject)=>{
    uni.getStorage({
      key: key,
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};

/**
 * 获取指定缓存信息 - 同步
 * @param {Object} key
 */
const getItemSync = function (key) {
  if (!key) {
    return null;
  }

  try {
    const value = uni.getStorageSync(key);
    return value;
  } catch (e) {
    return null;
  }
};

/**
 * 删除指定缓存信息 -异步
 * @param {Object} key
 */
const removeItem = function (key) {
  if (!key) {
    return;
  }

  uni.removeStorage({
    key: key,
    success: () => {

    },
    fail: () => {

    }
  });
};

/**
 * 删除指定缓存信息 - 同步
 * @param {Object} key
 */
const removeItemSync = function (key) {
  if (!key) {
    return;
  }
  try {
    uni.removeStorageSync(key);
  } catch (e) {
  }
};

/**
 * 清空缓存信息 -异步
 */
const clear = function () {
  uni.clearStorage();
};

/**
 * 清空缓存信息 -同步
 */
const clearSync = function () {
  try {
    uni.clearStorageSync();
  } catch (e) {
    // error
  }
};


/**
 * 获取存储信息-异步
 */
const getStorageInfo = function () {
  return new Promise((resolve, reject)=>{
    uni.getStorageInfo({
      success: (res) => {
        // console.log(res.keys);当前 storage 中所有的 key
        // console.log(res.currentSize);当前占用的空间大小, 单位：kb
        // console.log(res.limitSize);限制的空间大小, 单位：kb
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};

/**
 * 获取存储信息-同步
 */
const getStorageInfoSync = function () {
  try {
    const res = uni.getStorageInfoSync();
    /* console.log(res.keys);
     console.log(res.currentSize);
     console.log(res.limitSize); */
    return res;
  } catch (e) {
    // error
    return null;
  }
};


export default {
  setItem,
  setItemSync,
  getItem,
  getItemSync,
  removeItem,
  removeItemSync,
  clear,
  clearSync,
  getStorageInfo,
  getStorageInfoSync
};