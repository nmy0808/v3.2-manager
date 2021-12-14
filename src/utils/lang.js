import i18n from '@/i18n'

/**
 * 生成菜单标题
 * @param key
 * @returns {*}
 */
export const generateTitle = (key) => {
  return i18n.global.t('msg.route.' + key)
}
