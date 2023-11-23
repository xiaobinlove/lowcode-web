import { FC, ReactNode } from 'react'
import { useDraggable, UseDraggableArguments } from '@dnd-kit/core';
interface Props extends UseDraggableArguments {
    children: ReactNode;
}
export const Draggable: FC<Props> = ({id, children, ...res}) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id,
        ...res
    })
    return (
        <div ref={setNodeRef} {...attributes} {...listeners}>
            {children}
        </div>
    )
}
