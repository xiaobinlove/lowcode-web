import { Schema } from "@lowcode/render-tree";
import { arrayMove } from "@dnd-kit/sortable";
import { create } from "zustand";
interface SchemaState {
  schema: Schema[];
  activeId: string | null;
  arrayMove: (from: number, to: number) => void;
  setActiveId: (id: string | null) => void;
  insertAfter: (id: string, item: Schema) => void;
}

export const useSchemaStore = create<SchemaState>()((set) => ({
  schema: [
    {
      UUID: "输入框1",
      componentName: "Input",
      title: "输入框",
      children: [],
      props: {
        label: "测试输入框",
        name: "Input_msa",
        placeholder: "请输入",
      },
    },
    {
      UUID: "输入框2",
      componentName: "Input",
      title: "输入框",
      children: [],
      props: {
        label: "测试输入框",
        name: "Input_msa",
        placeholder: "请输入2",
      },
    },
    {
      UUID: "密码3",
      componentName: "PasswordInput",
      title: "密码",
      children: [],
      props: {
        label: "密码输入框",
        name: "PasswordInput_pgq",
        placeholder: "请输入密码",
      },
    },
    {
      UUID: "输入框4",
      componentName: "Input",
      title: "输入框",
      children: [],
      props: {
        label: "测试输入框4",
        name: "Input_msa",
        placeholder: "请输入4",
      },
    },
  ],
  activeId: null,
  arrayMove: (from, to) =>
    set((state) => ({ schema: arrayMove(state.schema, from, to) })),
  setActiveId: (id) => set(() => ({ activeId: id })),
  insertAfter: (id, item) =>
    set((state) => {
      const newArr = [...state.schema];
      const index = newArr.findIndex((item) => item.UUID === id);
      newArr.splice(index, 0, item);
      return { schema: newArr };
    }),
}));
