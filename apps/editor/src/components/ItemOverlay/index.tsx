import { FC } from 'react'
import './index.less'
interface Props {
  title?: string;
}
export const ItemOverlay: FC<Props> = ({ title }) => {
  return (
    <div className='lc-item-overlay'>
      {title}
    </div>
  )
}