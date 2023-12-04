import { FC, ReactNode } from 'react'
import { ContainerPlaceholder } from '../ContainerPlaceholder'
import './index.less'
interface Props {
  children?: ReactNode
}
export const LayoutItem: FC<Props> = ({ children }) => {
  return (
    <div className="lc-layout-item">
      {!children ? <ContainerPlaceholder /> : children}
    </div>
  )
}
export default LayoutItem
