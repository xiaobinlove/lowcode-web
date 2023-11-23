import { FC, ReactNode } from 'react'
import { useSortable, UseSortableArguments } from '@dnd-kit/sortable'
import classNames from 'classnames';
import './index.less'
interface Props extends UseSortableArguments {
  children: ReactNode;
}
export const SortableItem: FC<Props> = ({ children, id, ...res }) => {
  const {
    attributes,
    listeners,
    isDragging,
    over,
    setNodeRef,
  } = useSortable({
    id,
    ...res
  });
  return (
    <div
      className={classNames(
        'lc-sortable-item',
        over?.id === id && 'lc-sortable-item__insertAfter',
        isDragging && 'lc-sortable-item--active',
      )}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  )
}