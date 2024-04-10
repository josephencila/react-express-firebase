import { Icon } from "@iconify/react/dist/iconify.js";
import PropTypes from "prop-types";
const EditorMenuBar = (props) => {
  const { editor, content, setContent } = props;

  if (!editor) {
    return;
  }

  const activeButton =
    "w-full h-full p-2 bg-gray-100 text-black  flex justify-center ";
  const inActiveButton =
    " w-full h-full p-2 hover:bg-gray-100 text-slate-400 hover:text-black   flex justify-center ";
  return (
    <ul className="list-none p-0 m-0 border border-solid  border-slate-600 grid grid-cols-[repeat(3,40px)] grid-rows-[1fr] w-full max-w-xl">
      <li className="flex justify-center">
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleBold().run();
            setContent(prev=> prev + "<b>bold</b>");
          }}
          className={editor.isActive("bold") ? activeButton : inActiveButton}
        >
          <Icon icon="ri:bold" className="h-5 w-5" />
        </button>
      </li>
      <li className="flex justify-center">
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleItalic().run()
            setContent(prev=> prev + "<i>italic</i>");
          }}
       
          className={editor.isActive("italic") ? activeButton : inActiveButton}
        >
          <Icon icon="ri:italic" className="h-5 w-5" />
        </button>
      </li>
      <li className="flex justify-center">
        <button
          type="button"
          
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList") ? activeButton : inActiveButton
          }
        >
          <Icon icon="zondicons:list-bullet" className="h-5 w-5" />
        </button>
      </li>
    </ul>
  );
};

export default EditorMenuBar;

EditorMenuBar.propTypes = {
  editor: PropTypes.object,
  content: PropTypes.string,
  setContent: PropTypes.func,
};
