import { FC, ReactNode } from 'react'
import './index.less'
interface Props {
  children: ReactNode
}
export const LayoutArea: FC<Props> = ({ children }) => {
  return <div className="lc-layout-area">{children}</div>
}
export default LayoutArea
