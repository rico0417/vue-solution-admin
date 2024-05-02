/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 */
export function getFlatMenuList(menuList: any[]): any[] {
  const newMenuList: any[] = JSON.parse(JSON.stringify(menuList));
  return newMenuList.flatMap((item) => [item, ...(item.children ? getFlatMenuList(item.children) : [])]);
}
