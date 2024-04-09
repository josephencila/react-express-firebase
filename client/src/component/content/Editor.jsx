import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import PropTypes from 'prop-types'
import EditorMenuBar from "./EditorMenuBar";
import BulletList from '@tiptap/extension-bullet-list'
const Editor = ({ content, setContent }) => {
    const editor = useEditor({
      editorProps: {
        attributes: {
          class:
            "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
        },
      },
      extensions: [
        TextStyle.configure({ types: [ListItem.name] }),
        StarterKit.configure({
          bulletList: {
            keepMarks: true,
            keepAttributes: false,
          },
          orderedList: {
            keepMarks: true,
            keepAttributes: false,
          },
        }),
        BulletList.configure({
            HTMLAttributes: {
              class: 'my-custom-class',
            },
          })
      ],
      content: content,
      onUpdate({ editor }) {
        setContent(editor.getHTML());
      },
    });
  
    return (
      <div className="w-full lg:flex md:flex flex-col items-center justify-center">
        <EditorMenuBar editor={editor} />
        <EditorContent
          editor={editor}
          className="bg-white max-w-lg  bordeer-2 border-black w-full  p-2 rounded-md focus:border-none"
        />
      </div>
    );
  };
  
  export default Editor;

  Editor.propTypes = {
    content: PropTypes.string,
    setContent: PropTypes.func,
  };
  