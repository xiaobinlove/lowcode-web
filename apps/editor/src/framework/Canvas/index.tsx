import { createElement } from "react";
import * as componentsMap from "@lowcode/materials";
import { SortableContext } from "@dnd-kit/sortable";
import { SortableItem } from "@/components/SortableItem";
import { useSchemaStore } from "@/store/schema";
import { Schema } from "@lowcode/render-tree";
import { FormItem } from "@lowcode/materials";
import classNames from "classnames";
import { memo } from "react";
import { layoutContainers } from "@/const";
import "./index.less";
export interface Disabled {
  draggable?: boolean;
  droppable?: boolean;
}

const formItemBlackList = ["FormContainer", "LayoutArea", "LayoutItem"];
const getDisabled = (componentName: string, fiexd?: boolean): Disabled => {
  const droppable = {
    draggable: true,
    droppable: false,
  };
  const disabled = {
    draggable: true,
    droppable: true,
  };
  const sortable = {
    draggable: false,
    droppable: false,
  };
  if (fiexd) {
    return disabled;
  }
  // 只能拖放
  if (layoutContainers.includes(componentName)) {
    return droppable;
  }
  // if (componentName === "LayoutItem") {
  //   return !children || children.length === 0 ? droppable : disabled;
  // }
  return sortable;
};
const render = (list: Schema[], parentNode: Schema) => {
  const items = list.map((item) => item.UUID);
  return (
    <SortableContext items={items}>
      {list.map((item) => {
        const component = createElement(
          componentsMap[item.componentName],
          {
            ...item.props,
          },
          item.children?.length > 0 ? render(item.children, item) : undefined
        );
        return (
          <SortableItem
            data={{
              type: "canvas",
              data: item,
            }}
            id={item.UUID}
            key={item.UUID}
            disabled={getDisabled(item.componentName, item.props.fixed)}
            className={classNames({
              "lc-fiexd-bottom": item.props.fixed,
              "lc-col-1": item.componentName === "LayoutArea",
              [`lc-col-${parentNode.props.col}`]:
                item.componentName === "FormContainer" && parentNode.props.col,
            })}
          >
            {!formItemBlackList.includes(item.componentName) ? (
              <FormItem title={item.title}>{component}</FormItem>
            ) : (
              component
            )}
            {/* {component} */}
          </SortableItem>
        );
      })}
    </SortableContext>
  );
};
const Canvas = () => {
  const { schema } = useSchemaStore();
  return (
    <div className="lc-canvas">
      {render(schema.children, schema)}
      {/* 辅助线 */}
      <div className="lc-canvas-line"></div>
    </div>
  );
};
export default memo(Canvas);
