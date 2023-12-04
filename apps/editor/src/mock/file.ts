export const mockSchemaTEst = {
  UUID: "asfsd2faafsd",
  pageName: "测试空白页面",
  componentName: "Page",
  title: "页面",
  children: [
    {
      UUID: "asfsdafadfadssdfsd213",
      componentName: "Form",
      title: "表单",
      props: {
        col: 3,
        label: "表单__0",
        name: "Form_uhk",
        style: {
          width: "100%",
          height: "100%",
        },
      },
      children: [
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
        // {
        //   "UUID": "asfsdafs3edafgdsddfffd213",
        //   "componentName": "Text",
        //   "title": "文本",
        //   "children": [],
        //   "props": {
        //     "label": "测试输入框",
        //     "name": "Text_you",
        //     "text": "文本标签"
        //   }
        // },
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
        {
          UUID: "asfsdafdddfddgasdfasdfgs3ed3dfffd213",
          componentName: "LayoutArea",
          title: "布局容器",
          children: [
            {
              UUID: "asfsdafdddfddggasdfs3dded3dfffd213",
              componentName: "LayoutItem",
              title: "布局",
              props: {
                col: 1,
                name: "LayoutItem_1jr",
              },
              children: [
                {
                  UUID: "asfsdafddddfadadfdffds3eddfffd213",
                  componentName: "DatePickerTime",
                  title: "日期时间",
                  children: [],
                  props: {
                    label: "日期",
                    name: "DatePickerTime_ftd",
                  },
                },
              ],
            },
            {
              UUID: "asfsdafdddfddggs3ddfdasdfsded3dfffd213",
              componentName: "LayoutItem",
              title: "布局",
              props: {
                col: 1,
                name: "LayoutItem_ajp",
              },
              children: [
                {
                  UUID: "asfsdgdafddddfaadfdfdfs3eddfffd213",
                  componentName: "Input",
                  title: "输入框",
                  children: [],
                  props: {
                    label: "输入框",
                    name: "Input_gya",
                    placeholder: "请输入",
                  },
                },
              ],
            },
          ],
          props: {
            itemwidth: "6:6",
            name: "LayoutArea_zbi",
            rowgap: 0,
            colgap: 0,
          },
        },
      ],
    },
  ],
  props: {
    name: "Page_aeb",
    label: "页面",
    style: {
      width: "100%",
      height: "100%",
    },
  },
};
