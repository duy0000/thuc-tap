import { keys, values, isArray } from 'lodash-unified'
import { TreeItem } from '@mui/x-tree-view'

export const sidebarTree = (data, capDo) => {
  return keys(data).map((item, i) => (
    <TreeItem
      key={i}
      itemId={capDo + '_' + (data[item].ID ?? item)}
      label={item}
    >
      {isArray(data[item].children)
        ? data[item].children.map((e, i) =>
            e.ChuyenNganh.map((cn, j) => (
              <TreeItem
                key={j}
                itemId={'Index ' + j + '_' + cn.TenNganh}
                label={cn.TenNganh}
              />
            )),
          )
        : values(data[item]).length
          ? sidebarTree(data[item], capDo + 1)
          : null}
    </TreeItem>
  ))
}
