import ActionDownloadFile from '../ActionDownloadFile'
import { useMemo } from 'react'
import { isEmpty, isNil } from 'lodash-unified'

export default function KeHoachActionDownloadFile({ keHoach }) {
  const userCanDownloadFile = useMemo(() => {
    return !(
      isNil(keHoach) ||
      isEmpty(keHoach.KT_KDCL_CTDT_KeHoach_TDG_DataFile?.data) ||
      isEmpty(keHoach.KT_KDCL_CTDT_KeHoach_TDG_TenFile)
    )
  }, [keHoach])

  if (!keHoach) return

  return (
    <ActionDownloadFile
      DataFile={keHoach.KT_KDCL_CTDT_KeHoach_TDG_DataFile?.data}
      TenFile={keHoach.KT_KDCL_CTDT_KeHoach_TDG_TenFile}
      IsCanDownload={userCanDownloadFile}
    />
  )
}
