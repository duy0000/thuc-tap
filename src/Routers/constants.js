import { simpleSHA256 } from '@/Services/Utils/stringUtils'

export const ROLES = {
  A0000: simpleSHA256('Admin'),
  G0101: '1',
  S0202: '0',
  CBNV0: simpleSHA256('CBNV'),
}

export const ROLE_VIEW_ACTION_HTTB = {
  QT_XLSC: '14',
}

export const ROLE_VIEW_ACTION_TTHCGV = {
  QT_TTHCGV: '15',
  CBNV_TTHCGV: '16',
  TP_TTHCGV: '24',
  BGH_TTHCGV: '25',
}
