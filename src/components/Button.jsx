import PropTypes from "prop-types";

const Button = ({ children, onClick, bgColor, type }) => {
  return (
    <button
      className={`border px-3 py-2 ${bgColor} text-white rounded-md font-semibold`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  bgColor: PropTypes.string,
  type: PropTypes.string,
};

Button.defaultProps = {
  bgColor: "bg-slate-900",
  type: "button",
};

export default Button;
