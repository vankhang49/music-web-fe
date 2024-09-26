export const themeConfig = {
  listThemes: [
    { id: 1, name: "default" },
    { id: 2, name: "theme_1" },
    { id: 3, name: "theme_2" },
    { id: 4, name: "theme_3" },
    { id: 5, name: "theme_4" },
  ],

  themesApp: [
    {
      id: 1,
      ui: "Layout",
      themeClasses: {
        default: "bg-[#170f23] text-white",
        theme_1: "bg-zinc-950 text-white shadow-white",
        theme_2: "bg-white text-black border-gray-300",
        theme_3: "text-gray border-gray-300",
        theme_4: "text-gray border-gray-300",
      },
    },
    {
      id: 2,
      ui: "Container",
      themeClasses: {
        default: "bg-[#170f23] text-white shadow-white",
        theme_1: "bg-zinc-950 text-white shadow-white",
        theme_2: "bg-white text-black border-gray-300",
        theme_3: "text-white border-gray-300",
        theme_4: "text-white border-gray-300",
      },
    },
    {
      id: 3,
      ui: "Button",
      themeClasses: {
        default: "text-white bg-[#9d4be0] border-[#7e3ab7] hover:bg-[#7e3ab7] active:bg-[#7e3ab7] focus:ring-1 focus:ring-[#9d4be0]",
        theme_1: "text-white bg-zinc-800 border-zinc-700 hover:bg-zinc-700 active:bg-zinc-800 focus:ring-1 focus:ring-zinc-500",
        theme_2: "text-black bg-[#f3f4f6] border-[#9ca3af] hover:bg-[#e5e7eb] active:bg-[#e5e7eb] focus:ring-1 focus:ring-gray-300",
        theme_3: "text-white bg-indigo-500 border-[#312E81FF] hover:bg-indigo-700 active:bg-indigo-700 focus:ring-1 focus:ring-[#312E81FF]",
        theme_4: "text-white bg-rose-500 border-[#f43f5e] hover:bg-rose-700 active:bg-rose-700 focus:ring-1 focus:ring-[#f43f5e]",
        reset: "bg-transparent text-[inherit] border-none rounded-none m-0 p-0",
        logo: "bg-[inherit] border-none w-full mb-0",
        sign_up: "sign_up bg-white text-black border-[#7e3ab7] relative border-2 hover:bg-[#dcdcdc] ",
        log_out: "bg-transparent text-[inherit] border-none rounded-none",
        transparent: "bg-transparent text-[inherit] border-none rounded-none m-0",
        notification: "bg-transparent text-[inherit] border-none rounded-none my-0 p-2",
        setting: "bg-[#30293b] border-none p-2 text-[inherit]",
        simple: "text-white bg-blue-600 border-blue-700 hover:bg-blue-700 active:bg-blue-800 focus:ring-1 focus:ring-blue-300",
        success: "text-white bg-green-500 border-green-700 hover:bg-green-600 active:bg-green-700 focus:ring-1 focus:ring-green-300",
        warning: "text-black bg-yellow-400 border-yellow-500 hover:bg-yellow-500 active:bg-yellow-600 focus:ring-1 focus:ring-yellow-300",
        error: "text-black bg-red-600 border-red-700 hover:bg-red-700 active:bg-red-800 focus:ring-1 focus:ring-red-300",
      },
    },
    {
      id: 4,
      ui: "Form",
      themeClasses: {
        default: "bg-[#231b2e] text-white",
        theme_1: "border-blue-300 bg-zinc-800 text-blue-700",
        theme_2: "bg-gray-200 border-gray-300 text-black",
        theme_3: "bg-transparent text-white",
        theme_4: "bg-transparent text-white",
      },
    },
    {
      id: 5,
      ui: "Label",
      themeClasses: {
        default: "bg-green-500 text-white",
        theme_1: "bg-zinc-950 text-white shadow-white",
        theme_2: "bg-white text-black border-gray-300",
        theme_3: "bg-indigo-500 text-white",
        theme_4: "bg-rose-500 text-white",
      },
    },
    {
      id: 6,
      ui: "Input",
      themeClasses: {
        default: "border-[#9b4de0] text-[#dadada] bg-[#2f2739]",
        theme_1: "border-zinc-300 text-white bg-zinc-900",
        theme_2: "border-gray-300 text-black bg-white",
        search_2: "border-none text-[#dadada] bg-[#2f2739] rounded-full px-4 focus:bg-[#34224f]",
        theme_3: "bg-indigo-500/30 text-white placeholder:text-[#fff]",
        theme_4: "bg-rose-300/30 text-white placeholder:text-[#fff]",
      },
    },
    {
      id: 7,
      ui: "Table",
      themeClasses: {
        default: {
          table: "bg-[#170f23] text-[#dadada]",
          evenRow: "bg-[#2f2739]",
          oddRow: "bg-[#2f2739]",
          hoverRow: "hover:bg-[#8e46cd]",
        },
        theme_1: {
          table: "bg-zinc-900 text-zinc-200",
          evenRow: "bg-zinc-800",
          oddRow: "bg-zinc-800",
          hoverRow: "hover:bg-zinc-700",
        },
        theme_2: {
          table: "bg-gray-200 text-black",
          evenRow: "bg-gray-100",
          oddRow: "bg-white",
          hoverRow: "hover:bg-gray-200",
        },
        theme_3: {
          table: "bg-indigo-500/10 text-white",
          hoverRow: "hover:bg-indigo-500/50",
        },
        theme_4: {
          table: "bg-rose-500/10 text-white",
          hoverRow: "hover:bg-rose-500/50",
        },
      },
    },
    {
      id: 8,
      ui: "Pagination",
      themeClasses: {
        default: "text-white bg-[#2f2739] border-[#9d4be0] hover:bg-[#8e46cd]",
        theme_1: "text-zinc-400 bg-gray-900 border-gray-600 hover:bg-gray-700",
        theme_2: "text-blue-500 bg-gray-200 border-gray-300 hover:bg-gray-100",
        theme_4: "text-rose-500 bg-rose-200 border-rose-300 hover:bg-rose-100",
      },
    },
    {
      id: 9,
      ui: "Typography",
      themeClasses: {
        default: "",
        theme_1: "",
        theme_2: "",
        theme_3: "",
        theme_4: ""
      },
    },
    {
      id: 10,
      ui: "Card",
      themeClasses: {
        default: "card-default",
        theme_1: "card-theme-1",
        theme_2: "card-theme-2",
      },
    },
    {
      id: 11,
      ui: "Editor",
      themeClasses: {
        default: "bg-[#2f2739] text-[#dadada] border-solid border-[#9b4de0]",
        theme_1: "bg-zinc-900 text-white border-gray-600",
        theme_2: "bg-white",
        theme_3: "bg-indigo-500/30 text-white shadow-white",
        theme_4: "bg-rose-300/30 text-white",
      },
    },
    {
      id: 12,
      ui: "Header",
      themeClasses: {
        default: "bg-[#170f23] text-white",
        theme_1: "bg-zinc-950 text-white shadow-white",
        theme_2: "bg-white text-black border-gray-300",
        theme_3: "bg-indigo-500/30 text-white",
        theme_4: "bg-rose-500/30 text-white",
      },
    },
    {
      id: 13,
      ui: "Footer",
      themeClasses: {
        default: "bg-[#130c1c] text-white",
        theme_1: "bg-zinc-950 text-white shadow shadow-white",
        theme_2: "bg-white text-black border-gray-300 shadow shadow-black",
        theme_3: "bg-indigo-500/30 text-white",
        theme_4: "bg-rose-500/30 text-white",
      },
    },
    {
      id: 14,
      ui: "Nav",
      themeClasses: {
        default: "px-4 text-[#dadada]",
        theme_1: "",
        theme_2: "text-black",
      },
    },
    {
      id: 15,
      ui: "Anchor",
      themeClasses: {
        default: "text-white",
        theme_1: "text-white",
        theme_2: "text-black",
        theme_3: "text-white",
        theme_4: "text-white",
      },
    },
    {
      id: 15,
      ui: "Sidebar",
      themeClasses: {
        default: "bg-[#231b2e] text-white",
        theme_1: "bg-zinc-950 text-white shadow-white border-0 border-r border-dashed border-r-gray-400",
        theme_2: "bg-white text-black border-gray-300 border-0 border-r border-dashed border-r-gray-400",
        theme_3: "bg-indigo-500/30 text-white",
        theme_4: "bg-rose-500/30 text-white",
      },
    },
    {
      id: 16,
      ui: "Modal",
      themeClasses: {
        default: "bg-[#34224f] text-white",
        theme_1: "bg-[#111] text-white shadow-white",
        theme_2: "bg-[#dcdcdc] text-black border-gray-300",
        theme_3: "bg-indigo-300/90 text-white",
        theme_4: "bg-rose-700/90 text-white",
      },
    },
  ],

  layoutModels: [
    {
      id: 1,
      ui: "Flex",
      props: {
        alignItems: "",
        justifyContent: "",
        height: "",
        gap: "2",
        flexWrap: "",
        className: "",
        children: "",
      },
    },
    {
      id: 2,
      ui: "Grid",
      props: {
        columns: "",
        gap: "2",
        sm: "",
        md: "",
        lg: "",
        xl: "",
        xxl: "",
        children: "",
        gd: "",
      },
    },
  ],
};
