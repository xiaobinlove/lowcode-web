import { FC, ReactNode } from "react";
import { useDraggable, UseDraggableArguments } from "@dnd-kit/core";
import classNames from "classnames";
interface Props extends UseDraggableArguments {
  children: ReactNode;
  className?: string;
  data: Schema | any;
}
export const Draggable: FC<Props> = ({ id, children, className, ...res }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    ...res,
  });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={classNames(
        "lc-sortable-item",
        className,
        isDragging && "lc-sortable-item--active"
      )}
    >
      {children}
    </div>
  );
};
