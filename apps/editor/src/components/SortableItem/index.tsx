import { FC, ReactNode } from "react";
import { useSortable, UseSortableArguments } from "@dnd-kit/sortable";
import classNames from "classnames";
import { Schema } from "@lowcode/render-tree";
import "./index.less";
import { CSS } from "@dnd-kit/utilities";
interface Props extends UseSortableArguments {
  children: ReactNode;
  className?: string;
  data: Schema | any;
}
export const SortableItem: FC<Props> = ({
  children,
  id,
  className,
  data,
  disabled,
  ...res
}) => {
  const {
    attributes,
    listeners,
    isSorting,
    setNodeRef,
    transition,
    transform,
  } = useSortable({
    id,
    data,
    disabled,
    ...res,
  });
  return (
    <>
      <div
        className={classNames("lc-sortable-item", className)}
        style={{
          transition,
          transform: isSorting ? undefined : CSS.Translate.toString(transform),
        }}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        {children}
      </div>
    </>
  );
};
