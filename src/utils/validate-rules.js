/**
 * 验证用户密码
 * @returns {*}
 */
export const validatePassword = () => {
  return (rule, value, callback) => {
    if (value && value.length >= 6) {
      callback()
    } else {
      callback(new Error('密码不能少于6位'))
    }
  }
}
