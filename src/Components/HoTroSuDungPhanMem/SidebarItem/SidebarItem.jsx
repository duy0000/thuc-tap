import PropTypes from 'prop-types'

export const SidebarItem = ({ children }) => {
  return <div>{children}</div>
}

SidebarItem.propTypes = {
  onClick: PropTypes.func,
  active: PropTypes.bool,
}
