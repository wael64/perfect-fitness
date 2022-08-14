function getCategoriesString(categoryObj: PostType['category'][number]['ref']) {
  const { __v, _id, ...categoriesObj } = categoryObj
  const categoriesArr = []
  for (const key in categoriesObj) {
    if (categoriesObj[key]) [categoriesArr.push(key)]
  }
  return categoriesArr.join(', ')
}
export default getCategoriesString
