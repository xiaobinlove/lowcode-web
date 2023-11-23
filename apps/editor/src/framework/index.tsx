import { Header } from "./Header";
import { Left } from "./Left";
import { Right } from "./Right";
import { Canvas } from "./Canvas";
import { DndContext, DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { useSchemaStore } from "@/store/schema";
import { ItemOverlay } from "@/components/ItemOverlay";
import "./index.less";
import * as componentsMap from "@lowcode/materials";

console.log(componentsMap, "componentsMap");
export const Framework = () => {
  const { schema, arrayMove, activeId, setActiveId, insertAfter } =
    useSchemaStore();
  const items = schema.map((item) => item.UUID);
  const activeIndex = activeId ? items.indexOf(activeId as string) : -1;
  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id as string);
  };
  const handleDragCancel = () => {
    setActiveId(null);
  };
  const handleDragEnd = ({ over, active }: DragEndEvent) => {
    console.log(active, "active");
    console.log("over", over);
    // 移动位置
    if (over) {
      const overIndex = items.indexOf(over.id as string);
      // 左侧组件拖入画布
      if (active.data.current?.type === "left") {
        insertAfter(over.id as string, {
          UUID: `输入框1${String(new Date().getTime())}`,
          componentName: "Input",
          title: "输入框",
          children: [],
          props: {
            label: "测试输入框",
            name: "Input_msa",
            placeholder: `请输入${String(new Date().getTime())}`,
          },
        });
      }
      if (overIndex !== activeIndex) {
        arrayMove(activeIndex, overIndex);
      }
    }
    setActiveId(null);
  };
  return (
    <div className="framework">
      <Header />
      <div className="framework__main">
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <Left />
          <Canvas />
          <ItemOverlay
            isDragging={Boolean(activeId)}
            title={schema.find((item) => item.UUID === activeId)?.title}
          />
        </DndContext>
        <Right />
      </div>
    </div>
  );
};
