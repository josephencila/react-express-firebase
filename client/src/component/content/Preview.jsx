import PropTypes from "prop-types";
const Preview = (props) => {
  const { content } = props;
  return (
    <>
      <p className="text-xl text-center font-bold">Preview</p>
      <div
        className=" w-full min-w-[320px] max-w-xl p-2 focus:outline-none min-h-[480px]  max-h-[480px] overflow-y-auto overflow-x-hidden
             break-words
            border border-solid border-slate-600 
            "
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  );
};

export default Preview;

Preview.propTypes = {
  content: PropTypes.string,
};
