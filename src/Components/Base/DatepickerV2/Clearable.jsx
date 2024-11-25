import { BiChevronDown } from 'react-icons/bi'
import Icon from '../Icon/Icon'
import CloseCircle from '../Icons/CloseCircle'

export default function Clearable({
  shouldShowClearableIcon,
  handleClearData,
}) {
  return shouldShowClearableIcon ? (
    <Icon size={16} onClick={handleClearData}>
      <CloseCircle />
    </Icon>
  ) : (
    <BiChevronDown size={16} />
  )
}
