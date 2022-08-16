import Select, { ActionMeta, MultiValue } from 'react-select';
import { SelectItem } from './SelectField';

// Styles for multiselect
const multiSelectStyles = {
  control: () => ({
    border: '2px rgb(229 231 235) solid',
    borderRadius: '0.5rem',
    padding: '0.75rem',
    display: 'flex',
  }),
};

type MultiSelectProps = {
  name: string;
  placeholder: string;
  options: SelectItem[];
  onChange: (
    newValue: MultiValue<SelectItem>,
    actionMeta: ActionMeta<SelectItem>
  ) => void;
};

/**
 * MultiSelectField component for opencommerce.
 *
 * @returns {JSX.Element}
 */
const MultiSelectField = ({
  name,
  placeholder,

  options,
  onChange,
}: MultiSelectProps): JSX.Element => {
  return (
    <div>
      <Select
        name={name}
        placeholder={placeholder}
        styles={multiSelectStyles}
        options={options}
        isMulti={true}
        onChange={onChange}
      />
    </div>
  );
};

export default MultiSelectField;
