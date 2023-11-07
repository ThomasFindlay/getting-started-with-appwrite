const Input = props => {
  const { id, label, value, onChange, rootProps, ...inputProps } = props;
  return (
    <div className="flex flex-col w-full gap-1" {...rootProps}>
      {label ? (
        <label htmlFor={id} className="text-sm text-indigo-950/75">
          {label}
        </label>
      ) : null}
      <input
        id={id}
        className="px-4 py-2 rounded-md shadow"
        type="text"
        value={value}
        onChange={event => {
          onChange(event.target.value, event);
        }}
        {...inputProps}
      />
    </div>
  );
};

export default Input;
