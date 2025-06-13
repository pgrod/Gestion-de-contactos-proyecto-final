const Campo = ({ id, iconName, inputType, placeHolder, value, onChange }) => {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text">
        <i className={iconName} />
      </span>
      <input
        className="form-control"
        type={inputType}
        id={id}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Campo;

