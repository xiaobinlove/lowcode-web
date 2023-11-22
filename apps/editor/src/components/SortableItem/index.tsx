import { FC, ReactNode } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { UniqueIdentifier } from '@dnd-kit/core'
import classNames from 'classnames';
import './index.less'
// eslint-disable-next-line react-refresh/only-export-components
export enum Position {
  Before = -1,
  After = 1,
}
interface Props {
  children: ReactNode;
  id: UniqueIdentifier;
  active?: boolean;
  activeIndex: number;
  selected?: boolean;
}
export const SortableItem: FC<Props> = ({ children, id, activeIndex, selected }) => {
  const {
    attributes,
    listeners,
    isDragging,
    over,
    setNodeRef,
  } = useSortable({
    id,
  });
  return (
    <div
      className={classNames(
        'lc-sortable-item',
        over?.id === id && 'lc-sortable-item__insertAfter',
        isDragging && 'active',
      )}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  )
}