import { inputProps } from '@modules/common/types/types-interfaces';

const Input: React.FC<inputProps> = ({
  label,
  type,
  name,
  placeholder,
  getInputs,
  value,
}) => {
  return (
    <div className='flex flex-col gap-2 text-sm'>
      <label htmlFor={label}>{name}</label>
      <input
        type={type}
        className='input'
        placeholder={placeholder}
        onChange={getInputs}
        value={value}
      />
    </div>
  );
};

export default Input;
