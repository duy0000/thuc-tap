import { useNamespace } from '@/Services/Hooks'
import { Post } from '../Post/Post'
import PropTypes from 'prop-types'
import './Posts.scss'
import { useState, useEffect, useMemo } from 'react'
import { getDataHoTroSuDungPhanMem } from '@/Apis/HoTroSuDungPhanMem/apiHoTroSuDungPhanMem'
import { Pagination } from '@mui/material'
import { changeSlug } from '@/Services/Utils/stringUtils'

export const Posts = ({ category, search }) => {
  const bem = useNamespace('posts')

  const [posts, setPosts] = useState([])

  const [page, setPage] = useState(1)

  useEffect(() => {
    getDataHoTroSuDungPhanMem(search).then((res) => {
      setPosts(res.data.body)
    })
  }, [search])

  const postsPerPage = 3

  const handleChange = (e, value) => {
    setPage(value)
  }

  const getPosts = useMemo(() => {
    setPage(1)
    if (category?.categoryParent.value === 'all') {
      return posts
    }
    return posts.filter((e) => {
      if (category?.categoryChild.value) {
        return (
          changeSlug(e.DT_CVNB_TBGD_TL_Nhom4) === category?.categoryChild.path
        )
      } else if (category?.categoryParent.value) {
        return (
          changeSlug(e.DT_CVNB_TBGD_TL_Nhom3) === category?.categoryParent.path
        )
      } else {
        return e
      }
    })
  }, [category?.categoryChild.value, category?.categoryParent?.value, posts])

  const totalPage = useMemo(
    () => Math.ceil(getPosts.length / postsPerPage),
    [getPosts],
  )

  const postsShow = useMemo(() => {
    return getPosts.slice(
      postsPerPage * (page - 1),
      postsPerPage * (page - 1) + postsPerPage,
    )
  }, [getPosts, postsPerPage, page])

  return (
    <div className={bem.b()}>
      {postsShow.length ? (
        postsShow.map((post, index) => <Post key={index} {...post} />)
      ) : (
        <h3 className={bem.e('empty')}>Hiện chưa có tài liệu hướng dẫn nào</h3>
      )}

      <div className={bem.e('pagination')}>
        {totalPage > 1 && (
          <Pagination count={totalPage} page={page} onChange={handleChange} />
        )}
      </div>
    </div>
  )
}

Posts.propTypes = {
  category: PropTypes.string,
  search: PropTypes.string,
}
