import { Schema } from "@lowcode/render-tree";
import { create } from "zustand";
import { insertNode, moveNode, fixdBottom } from "@/utils";
import { mockSchema } from "@/mock/schema";
export enum Position { // 辅助线位置：鼠标拖拽，在over容器的位置，鼠标在在容器的上半部分为Before，下半部分为After，
  Before = -1,
  After = 1,
}
interface State {
  activeId: string | null; // 被拖动元素的id
  schema: Schema; // JSON Schama树
  position: Position | null; // 拖动插入位置
  // 记录被拖拽节点的UUID
  setActiveId: (id: string | null) => void;
  // 设置拖拽辅助线位置
  setPosition: (position: Position | null) => void;
  // 节点固定在底部
  fixdBottom: (id: string) => void;
  // 插入节点tree, overId, newNode, position
  insertNode: (params: { newNode: Schema; overId: string }) => void;
  // 移动节点
  moveNode: (params: { movedId: string; overId: string }) => void;
}

export const useSchemaStore = create<State>()((set) => ({
  activeId: null,
  schema: mockSchema,
  position: null,
  setActiveId: (id) => set({ activeId: id }),
  setPosition: (position) => set({ position }),
  insertNode: ({ newNode, overId }) =>
    set(({ position, schema }) => ({
      schema: insertNode({ tree: schema, position, overId, newNode }),
    })),
  moveNode: ({ movedId, overId }) =>
    set(({ schema, position }) => ({
      schema: moveNode({ tree: schema, position, movedId, overId }),
    })),
  fixdBottom: (id) =>
    set(({ schema }) => {
      const res = { schema: fixdBottom({ tree: schema, id }) };
      return res;
    }),
}));
