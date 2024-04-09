import { Icon } from "@iconify/react/dist/iconify.js";
import PropTypes from "prop-types";
const EditorMenuBar = (props) => {
  const { editor } = props;

  if (!editor) {
    return;
  }

  const activeButton = " text-black  px-3 py-1 rounded-lg bg-gray-100  ";
  const inActiveButton =
    " bg-white text-black  px-2 py-1 rounded-lg  hover:bg-gray-100 ";
  return (
    <div className="lg:flex lg:items-center lg:justify-center md:flex md:items-center md:justify-center">
      <div className="bg-white m-1 p-1 rounded-lg max-w-md">
        <div className=" flex items-center gap-1 overflow-x-auto max-w-md">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? activeButton : inActiveButton}
          >
            <Icon icon="uil:bold" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={
              editor.isActive("italic") ? activeButton : inActiveButton
            }
          >
            <Icon icon="uil:italic" />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={
              editor.isActive("bulletList") ? activeButton : inActiveButton
            }
          >
            <Icon icon="zondicons:list-bullet" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorMenuBar;

EditorMenuBar.propTypes = {
  editor: PropTypes.func,
};
