import { FC } from 'react'
import { DragOverlay } from '@dnd-kit/core'
import './index.less'
interface Props {
  title?: string;
  isDragging: boolean;
}
export const ItemOverlay: FC<Props> = ({ title, isDragging }) => {
  return (
    <DragOverlay dropAnimation={null}>
       {isDragging ? (
          <div className='lc-item-overlay'>
          {title}
        </div>
        ): null}

    </DragOverlay>
  )
}