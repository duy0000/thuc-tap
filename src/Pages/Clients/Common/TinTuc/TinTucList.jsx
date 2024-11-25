import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function TinTucItem({ data }) {
  // data: object
  return (
    <Link
      to={
        'https://uneti.edu.vn/bch-cong-doan-truong-co-so-ha-noi-to-chuc-hoi-thao-can-bo-vien-chuc-nguoi-lao-dong-va-sinh-vien-uneti-2024-chao-mung-ngay-nha-giao-viet-nam-20-11/'
      }
      target="_blank"
    >
      <img
        src="https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        loading="lazy"
        width={170}
        height={140}
        className="rounded-md w-full"
      />
      <h3>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto quam
        neque vitae distinctio non illo, maiores nesciunt ut aliquam rerum!
      </h3>
    </Link>
  )
}

function TinTucList({ type, list }) {
  // type: ThongBao, TieuDiem, SuKien
  // list: array
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array(12)
        .fill(1)
        .map((tt, index) => {
          return <TinTucItem key={index} data={tt} />
        })}
    </div>
  )
}

TinTucList.propTypes = {
  type: PropTypes.string,
  list: PropTypes.array,
}

export default TinTucList
