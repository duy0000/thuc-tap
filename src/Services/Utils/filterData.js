export const filterData = (array, filters) => {
  return array?.filter((item) => {
    for (const key in filters) {
      const filterValue = filters[key]
      const itemValue = item[key]

      if (
        filterValue &&
        String(itemValue)
          .toLowerCase()
          .indexOf(String(filterValue).toLowerCase()) === -1
      ) {
        return false
      }
    }
    return true
  })
}

export const isDuplicateValueObjectInArray = (
  newObject,
  array = [],
  keyObject,
) => {
  return array.some((item) => item[keyObject] === newObject[keyObject])
}

export const filterDataWithSingleGroupKey = (
  array,
  filters,
  searchFields = [],
) => {
  const { searchTerm, ...otherFilters } = filters

  return array?.filter((item) => {
    // Kiểm tra các bộ lọc khác (nếu có)
    for (const key in otherFilters) {
      const filterValue = otherFilters[key]
      const itemValue = item[key]

      if (
        filterValue &&
        String(itemValue)
          .toLowerCase()
          .indexOf(String(filterValue).toLowerCase()) === -1
      ) {
        return false
      }
    }

    // Kiểm tra điều kiện cho searchTerm trên các searchFields
    if (searchTerm && searchFields.length > 0) {
      const searchTermLower = String(searchTerm).toLowerCase()
      const matchesSearchTerm = searchFields.some(
        (field) => String(item[field])?.toLowerCase().includes(searchTermLower),
        console.log(`filter 2 - ${field}: `, {
          searchTermLower: String(searchTermLower),
          itemValue: String(item[field]),
        }),
      )

      if (!matchesSearchTerm) {
        return false
      }
    }

    return true
  })
}

export function filterDataWithMultipleGroupKey(
  array,
  filters,
  searchFieldsGroups,
) {
  const isFiltersEmpty = Object.values(filters).every((value) => !value)
  if (isFiltersEmpty) {
    return array
  }

  return array?.filter((item) => {
    // Duyệt qua từng nhóm trong searchFieldsGroups
    let groupMatched = false
    for (const group of searchFieldsGroups) {
      // Duyệt qua các field trong từng nhóm
      for (const field of group) {
        const filterValue = filters[field]

        const itemValue = item[field]

        if (
          filterValue &&
          String(itemValue)
            .toLowerCase()
            .indexOf(String(filterValue).toLowerCase()) !== -1
        ) {
          groupMatched = true
          return true // Tìm thấy field khớp, không cần kiểm tra tiếp trong nhóm này
        }
      }
    }
    // Nếu không có field nào trong nhóm khớp, loại bỏ item này
    if (!groupMatched) {
      return false
    }

    // Nếu tất cả các nhóm đều khớp, tiếp tục kiểm tra các field ngoài nhóm
    for (const key in filters) {
      if (searchFieldsGroups.some((group) => group.includes(key))) {
        continue
      }

      const filterValue = filters[key]
      const itemValue = item[key]

      if (
        filterValue &&
        String(itemValue)
          .toLowerCase()
          .indexOf(String(filterValue).toLowerCase()) === -1
      ) {
        return false
      }
    }

    return true // Giữ lại item nếu tất cả các điều kiện đều khớp
  })
}
