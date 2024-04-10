import { EditorContent, useEditor } from "@tiptap/react";

import PropTypes from "prop-types";
import EditorMenuBar from "./EditorMenuBar";

import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
const Editor = ({ content, setContent }) => {
  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          italic: {},
          bold: {
            HTMLAttributes: {
              class: "padding: 0 1rem;",
            },
          },
          bulletList: {
            itemTypeName: "listItem",
            keepAttributes: false,
            keepMarks: false,
            HTMLAttributes: {
              class: "list-disc px-4 ",
            },
          },
        }),
      ],
      editorProps: {
        attributes: {
          class:
            // " !prose !dark:prose-invert prose-sm sm:prose-base prose:w-full focus:outline-none prose-pre:bg-[#282c34] prose-pre:text-[#abb2bf] border border-solid border-slate-600 p-2 w-full min-w-[320px]",
            "w-full min-w-[320px] max-w-xl p-2 focus:outline-none min-h-[480px]  max-h-[480px] overflow-y-auto",
        },
      },
      content: content,
      onUpdate({ editor }) {
        setContent(editor.getHTML());
      },
    },
    []
  );

  // useEffect(() => {
  //   editor?.commands.setContent(content,
  //     false, {
  //         preserveWhitespace: false, //"full"
  //     });
  // }, [editor, content]);

  return (
    <div className="w-full h-full  grid grid-cols-[1fr] grid-rows-[40px_1fr] items-center justify-items-center p-2">
      <EditorMenuBar
        editor={editor}
        content={content}
        setContent={setContent}
      />
      <EditorContent
        editor={editor}
        className="w-full min-w-[320px] max-w-xl p-2 focus:outline-none border border-solid border-slate-600  min-h-[480px] "
      />
    </div>
  );
};

export default Editor;

Editor.propTypes = {
  content: PropTypes.string,
  setContent: PropTypes.func,
};
