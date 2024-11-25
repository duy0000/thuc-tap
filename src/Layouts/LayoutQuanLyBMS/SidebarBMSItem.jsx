import { useNamespace } from '@/Services/Hooks'
import PropTypes from 'prop-types'
import './LayoutQuanLyBMS.scss'
import { Link } from 'react-router-dom'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6'

export const SidebarBMSItem = ({
  name,
  path,
  onClick,
  isOpen,
  active,
  hasChild,
  parentActive,
  childActive,
}) => {
  const bem = useNamespace('bms-sidebar')

  return (
    <>
      {childActive ? (
        <Link
          to={path}
          onClick={onClick}
          className={`${bem.e('item')} ${bem.is('active', active)} ${hasChild && 'flex items-center justify-between'}`}
        >
          {name}
          {hasChild && <FaAngleDown />}
        </Link>
      ) : parentActive ? (
        <Link
          to={path}
          onClick={onClick}
          className={`${bem.e('item')} ${bem.is('active', active)} ${hasChild && 'flex items-center justify-between'}`}
        >
          {name}
          {hasChild && (isOpen ? <FaAngleUp /> : <FaAngleDown />)}
        </Link>
      ) : (
        <p
          onClick={onClick}
          className={`${bem.e('item')} ${bem.is('active', active)} ${hasChild && 'flex items-center justify-between'}`}
        >
          {name}
          {hasChild && (isOpen ? <FaAngleUp /> : <FaAngleDown />)}
        </p>
      )}
    </>
  )
}

SidebarBMSItem.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  isOpen: PropTypes.bool,
}
