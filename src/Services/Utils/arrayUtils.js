// Nhóm đối tượng theo dạng cấu trúc cây
export const groupArrayByFields = (arrCurrent = [], listFieldsCombine = []) => {
  if (arrCurrent.length > 0 && listFieldsCombine.length > 0) {
    return arrCurrent.reduce((acc, item) => {
      let currentGroup = acc
      const keyValues = listFieldsCombine.map((field) => item[field])
      const lastIndex = listFieldsCombine.length - 1

      keyValues.forEach((value, index) => {
        const existingGroup = currentGroup.find((group) => group.key === value)
        if (!existingGroup) {
          const newGroup = { key: value, value: index === lastIndex ? [] : [] }
          currentGroup.push(newGroup)
          currentGroup = newGroup.value
        } else {
          currentGroup = existingGroup.value
        }
      })

      currentGroup.push(item)
      return acc
    }, [])
  }
}

export const ensureArray = (value) => {
  return Array.isArray(value) ? value : [value]
}
