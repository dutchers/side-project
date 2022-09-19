const Input = (props) => {
  const {
    type,
    name,
    label,
    value,
    onChange,
    checked,
    pattern,
    required,
    disabled,
  } = props;
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
      <input
        className="rounded-md border border-slate-400 border-solid h-10 pl-2 mr-7"
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e, name)}
        checked={checked}
        pattern={pattern}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
