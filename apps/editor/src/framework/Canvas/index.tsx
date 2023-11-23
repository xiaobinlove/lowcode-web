import { createElement } from "react";
import * as componentsMap from "@lowcode/materials";
import { SortableContext } from "@dnd-kit/sortable";
import { SortableItem } from "@/components/SortableItem";
import { useSchemaStore } from "@/store/schema";
import "./index.less";
export const Canvas = () => {
  const { schema } = useSchemaStore();
  const items = schema.map((item) => item.UUID);
  return (
    <div>
      <SortableContext items={items}>
        <div className="lc-canvas-content">
          {schema.map((item) => {
            return (
              <SortableItem id={item.UUID} key={item.UUID}>
                {createElement(componentsMap[item.componentName], {
                  ...item.props,
                })}
              </SortableItem>
            );
          })}
        </div>
      </SortableContext>
    </div>
  );
};
