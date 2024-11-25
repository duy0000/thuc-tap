import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import Icon from '@/Components/Base/Icon/Icon'
import { BiChevronDown, BiPlus } from 'react-icons/bi'
import { Brush } from '@/Components/Base/Icons/Brush'
import { Select } from '@/Components/Base'
import { transformCls } from '@/Services/Utils/reactUtils'
import { isNil } from 'lodash-unified'
import { DrawerCreateTieuChuan } from './DrawerCreateTieuChuan'
import { DrawerUpdateTieuChuan } from './DrawerUpdateTieuChuan'
import { DrawerUpdateBoTieuChuan } from './DrawerUpdateBoTieuChuan'
import { Trash } from '@/Components/Base/Icons/Trash'
import { DrawerCreateTieuChi } from './DrawerCreateTieuChi'
import Swal from 'sweetalert2'
import {
  deleteTieuChuan,
  loadAllTieuChuan,
} from '@/Apis/KDCL/BoTieuChuan/apiTieuChuan'
import {
  deleteTieuChi,
  loadAllTieuChi,
} from '@/Apis/KDCL/BoTieuChuan/apiTieuChi'
import { DrawerUpdateTieuChi } from './DrawerUpdateTieuChi'
import { useBoTieuChuanStore } from '@/Services/Store/index.js'
import Button from '@/Components/Base/Button/Button'

export default function TCKiemDinhCTDT(props) {
  const { tab, index } = props

  const { listBoTieuChuan, refetch: refetchListBoTieuChuan } =
    useBoTieuChuanStore()
  // Bo tieu chuan
  const [boTieuChuanSelectedID, setBoTieuChuanSelectedID] = useState(null)
  const [boTieuChuanSelected, setBoTieuChuanSelected] = useState(null)
  const drawerBTCUpdateRef = useRef()
  const columnsJSON_DATA_SORTED = useMemo(
    () =>
      boTieuChuanSelected?.KT_KDCL_BoTieuChuan_JSON_DATA?.reduce((acc, col) => {
        acc[col.KT_KDCL_BoTieuChuan_TenCot] = col.KT_KDCL_BoTieuChuan_ThuTu
        return acc
      }, {}),
    [boTieuChuanSelected],
  )
  const loadBoTieuChuanById = async () => {
    if (!isNil(boTieuChuanSelectedID)) {
      await refetchListBoTieuChuan()
      setBoTieuChuanSelected(
        listBoTieuChuan.find(
          (e) => e.KT_KDCL_BoTieuChuan_ID === boTieuChuanSelectedID,
        ),
      )
    }
  }

  // Tieu chuan
  const [tieuChuanUpdating, setTieuChuanUpdating] = useState()
  const [allTieuChuan, setAllTieuChuan] = useState([])
  const drawerTieuChuanUpdate = useRef()
  const drawerCreateTCRef = useRef()
  const getListTieuChuan = async () => {
    try {
      const res = await loadAllTieuChuan()
      setAllTieuChuan(res.data.body)
    } catch (e) {
      console.log(e)
    }
  }
  const onDeleteTieuChuan = async (tieuChuan) => {
    const action = await Swal.fire({
      title: 'Bạn chắc chắn muốn gửi yêu cầu xóa tiêu chuẩn này?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Gửi',
      denyButtonText: `Hủy`,
    })

    if (action.isConfirmed) {
      await deleteTieuChuan(tieuChuan.KT_KDCL_TieuChuan_ID)
      getListTieuChuan()
    } else if (action.isDenied) {
      Swal.fire('Đã hủy gửi yêu cầu yêu cầu xóa tiêu chuẩn', '', 'info')
    }
  }
  const tieuChuanByBoTieuChuan = useMemo(() => {
    return allTieuChuan.filter(
      (e) => e.KT_KDCL_TieuChuan_IDBoTieuChuan === boTieuChuanSelectedID,
    )
  }, [allTieuChuan, boTieuChuanSelectedID])

  // Tieu chi
  const drawerCreateTieuChi = useRef()
  const [allTieuChi, setAllTieuChi] = useState([])
  const [tieuChuanSelected, setTieuChuanSelected] = useState()
  const [tieuChiUpdating, setTieuChiUpdating] = useState()
  const drawerUpdateTieuChi = useRef()
  const onDeleteTieuChi = async (tieuChi) => {
    const action = await Swal.fire({
      title: 'Bạn chắc chắn muốn gửi yêu cầu xóa tiêu chí này?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Gửi',
      denyButtonText: `Hủy`,
    })

    if (action.isConfirmed) {
      await deleteTieuChi(tieuChi.KT_KDCL_TieuChi_ID)
      getListTieuChi()
    } else if (action.isDenied) {
      Swal.fire('Đã hủy gửi yêu cầu yêu cầu xóa tiêu chí', '', 'info')
    }
  }

  const getListTieuChi = async () => {
    try {
      const res = await loadAllTieuChi()

      setAllTieuChi(
        res.data.body.map((e) => ({
          ...e,
          KT_KDCL_TieuChi_JSON_DATA: e.KT_KDCL_TieuChi_JSON_DATA
            ? JSON.parse(e.KT_KDCL_TieuChi_JSON_DATA)
            : [],
          KT_KDCL_TieuChi_MocChuan_JSON_DATA:
            e.KT_KDCL_TieuChi_MocChuan_JSON_DATA
              ? JSON.parse(e.KT_KDCL_TieuChi_MocChuan_JSON_DATA)
              : [],
        })),
      )
    } catch (e) {
      console.log(e)
    }
  }
  const tieuChiDataColsSorted = useMemo(() => {
    if (!columnsJSON_DATA_SORTED || !allTieuChi.length) return

    return allTieuChi?.map((e) => ({
      ...e,
      KT_KDCL_TieuChi_JSON_DATA: (e.KT_KDCL_TieuChi_JSON_DATA || []).sort(
        (a, b) =>
          columnsJSON_DATA_SORTED[a.KT_KDCL_BoTieuChuan_TenCot] -
          columnsJSON_DATA_SORTED[b.KT_KDCL_BoTieuChuan_TenCot],
      ),
    }))
  }, [columnsJSON_DATA_SORTED, allTieuChi])
  const tieuChiGroupedByTieuChuanID = useMemo(() => {
    if (!tieuChiDataColsSorted) return {}

    return tieuChiDataColsSorted?.reduce((acc, item) => {
      const tieuChuanID = item.KT_KDCL_TieuChi_IDTieuChuan
      if (!acc[tieuChuanID]) {
        acc[tieuChuanID] = []
      }
      acc[tieuChuanID].push(item)
      return acc
    }, {})
  }, [tieuChiDataColsSorted])
  const renderMissingTd = (tieuChi) => {
    // create arr by length
    const arr = []
    for (
      let i = 0;
      i <
      Number(boTieuChuanSelected?.KT_KDCL_BoTieuChuan_JSON_DATA?.length) -
        Number(tieuChi?.KT_KDCL_TieuChi_JSON_DATA?.length);
      i++
    ) {
      arr.push(<td></td>)
    }
    return arr
  }

  // Table resize columns
  const [colDrag, setColDrag] = useState(-1)
  const onMouseUp = () => {
    setColDrag(-1)
  }
  const onMouseMove = useCallback(
    (event) => {
      if (colDrag !== -1) {
        const el = document.querySelector(`.col_drag_${colDrag}`)
        const rect = el.getBoundingClientRect()
        const newWidth = event.clientX - rect.left
        el.style.width = (newWidth > 50 ? newWidth : 50) + 'px' // Minimum width set to 50
      }
    },
    [colDrag],
  )
  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    return () => {
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [onMouseMove])

  useEffect(() => {
    if (isNil(boTieuChuanSelectedID)) return
    setBoTieuChuanSelected(
      listBoTieuChuan.find(
        (e) => e.KT_KDCL_BoTieuChuan_ID === boTieuChuanSelectedID,
      ),
    )
  }, [boTieuChuanSelectedID])

  useEffect(() => {
    getListTieuChuan()
    getListTieuChi()
  }, [])

  return (
    <div hidden={index !== tab}>
      <div className="flex justify-between z-[2] relative">
        <div className="flex items-center gap-2">
          <span>Bộ tiêu chuẩn</span>
          <Select
            modelValue={boTieuChuanSelectedID}
            data={listBoTieuChuan}
            valueKey="KT_KDCL_BoTieuChuan_ID"
            labelKey="KT_KDCL_BoTieuChuan_Ten"
            clearable={false}
            defaultFirstOption
            onChange={setBoTieuChuanSelectedID}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => drawerBTCUpdateRef.current?.open()}>
            <Icon size="14">
              <Brush />
            </Icon>
            Chỉnh sửa bộ tiêu chuẩn
          </Button>
          <Button onClick={() => drawerCreateTCRef.current?.open()}>
            <Icon size="14">
              <BiPlus />
            </Icon>
            Thêm tiêu chuẩn
          </Button>
        </div>
      </div>
      <div className="flex gap-[30px] mt-3 z-[1]">
        <table className="uneti-u-table">
          <colgroup>
            <col />
            {boTieuChuanSelected?.KT_KDCL_BoTieuChuan_JSON_DATA?.map((e, i) => (
              <col key={i} className={`col_drag_${i}`} />
            ))}
            <col />
          </colgroup>
          <thead>
            <tr>
              <th className={transformCls(['th whitespace-nowrap relative'])}>
                Mã tiêu chuẩn/tiêu chí
              </th>
              {boTieuChuanSelected?.KT_KDCL_BoTieuChuan_JSON_DATA?.map(
                (th, thi) => (
                  <th
                    key={thi}
                    className={transformCls(['th whitespace-nowrap relative'])}
                  >
                    {th.KT_KDCL_BoTieuChuan_TenCot}
                    {thi <
                      boTieuChuanSelected?.KT_KDCL_BoTieuChuan_JSON_DATA
                        .length -
                        1 && (
                      <div
                        onMouseDown={() => {
                          setColDrag(thi)
                        }}
                        className="absolute select-none bg-uenti-primary right-0 translate-x-[56%] top-0 bottom-0 w-[3px] border border-solid border-gray-100 z-[1] cursor-col-resize"
                      />
                    )}
                  </th>
                ),
              )}
              <th
                className={transformCls([
                  'th whitespace-nowrap relative w-[150px]',
                ])}
              >
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody>
            {tieuChuanByBoTieuChuan.map((tieuChuan, i) => (
              <Fragment key={i}>
                <tr key={i + 'ctdt'} className="tr">
                  <td className="td w-[160px] relative">
                    <div className="flex items-center">
                      <Icon>
                        <BiChevronDown />
                      </Icon>
                      <div className="font-medium">
                        <div
                          className="default-css"
                          dangerouslySetInnerHTML={{
                            __html: tieuChuan.KT_KDCL_TieuChuan_Ma,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td
                    className="td font-medium"
                    colSpan={`${
                      1 +
                      (boTieuChuanSelected?.KT_KDCL_BoTieuChuan_JSON_DATA
                        ? boTieuChuanSelected?.KT_KDCL_BoTieuChuan_JSON_DATA
                            ?.length - 1
                        : 1)
                    }`}
                  >
                    <p
                      dangerouslySetInnerHTML={{
                        __html: tieuChuan.KT_KDCL_TieuChuan_Ten,
                      }}
                    />
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setTieuChuanSelected(tieuChuan)
                          drawerCreateTieuChi.current?.open()
                        }}
                        className="icon-btn"
                      >
                        <Icon>
                          <BiPlus />
                        </Icon>
                      </button>
                      <button
                        className="icon-btn"
                        onClick={() => {
                          setTieuChuanUpdating(tieuChuan)
                          drawerTieuChuanUpdate.current?.open()
                        }}
                      >
                        <Icon>
                          <Brush />
                        </Icon>
                      </button>
                      <button
                        onClick={() => onDeleteTieuChuan(tieuChuan)}
                        className="icon-btn"
                      >
                        <Icon>
                          <Trash />
                        </Icon>
                      </button>
                    </div>
                  </td>
                </tr>

                {tieuChiGroupedByTieuChuanID[
                  tieuChuan.KT_KDCL_TieuChuan_ID
                ]?.map((tieuChi, tcI) => (
                  <tr key={`${tcI}-${tieuChi.KT_KDCL_TieuChi_ID}-ctdt`}>
                    <td>
                      <div
                        className="default-css pl-6"
                        dangerouslySetInnerHTML={{
                          __html: tieuChi.KT_KDCL_TieuChi_Ma,
                        }}
                      />
                    </td>
                    {tieuChi.KT_KDCL_TieuChi_JSON_DATA?.map((col, colIndex) => (
                      <td
                        key={`${colIndex}-${col.KT_KDCL_BoTieuChuan_TenCot}`}
                        className={transformCls([
                          'td',
                          colIndex == 0 && 'pl-10',
                        ])}
                      >
                        <p
                          className="default-css"
                          dangerouslySetInnerHTML={{
                            __html: col.KT_KDCL_BoTieuChuan_NoiDung,
                          }}
                        />
                      </td>
                    ))}
                    {renderMissingTd(tieuChi)}
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="icon-btn"
                          onClick={() => {
                            setTieuChuanSelected(tieuChuan)
                            setTieuChiUpdating(tieuChi)
                            drawerUpdateTieuChi.current?.open()
                          }}
                        >
                          <Icon>
                            <Brush />
                          </Icon>
                        </button>
                        <button
                          onClick={() => onDeleteTieuChi(tieuChi)}
                          className="icon-btn"
                        >
                          <Icon>
                            <Trash />
                          </Icon>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <DrawerUpdateBoTieuChuan
        ref={drawerBTCUpdateRef}
        boTieuChuanSelected={boTieuChuanSelected}
        onUpdated={loadBoTieuChuanById}
      />

      <DrawerCreateTieuChuan
        ref={drawerCreateTCRef}
        onCreated={getListTieuChuan}
        boTieuChuanSelected={boTieuChuanSelected}
      />
      <DrawerUpdateTieuChuan
        ref={drawerTieuChuanUpdate}
        boTieuChuanSelected={boTieuChuanSelected}
        tieuChuanUpdating={tieuChuanUpdating}
        onUpdated={getListTieuChuan}
      />

      <DrawerCreateTieuChi
        ref={drawerCreateTieuChi}
        boTieuChuanSelected={boTieuChuanSelected}
        tieuChuanSelected={tieuChuanSelected}
        onCreated={getListTieuChi}
      />
      <DrawerUpdateTieuChi
        ref={drawerUpdateTieuChi}
        tieuChiUpdating={tieuChiUpdating}
        tieuChuanSelected={tieuChuanSelected}
        boTieuChuanSelected={boTieuChuanSelected}
        onUpdated={getListTieuChi}
      />
    </div>
  )
}
