import type { Fish } from "@/generated";
import type { Organization } from "@/models/facility";
import type {
  DetailedHTMLProps,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
} from "react";
import styled from "styled-components";
type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default function Input({ ...rest }: Props) {
  return <InputField {...rest}></InputField>;
}

const InputField = styled.input`
  border: 1px solid darkgrey;
  border-radius: 2px;
`;

type RadioProps = {
  options: string[]; // At least 2 options
  name: string;
  value: string;
  onChange: (value: string) => void;
};

export function InputRadio(props: Omit<RadioProps, "type">) {
  return <InputRadioOpt {...props} />;
}

function InputRadioOpt({ options, name, value, onChange }: RadioProps) {
  const toggleOption = (option: string) => {
    onChange(option);
  };

  return (
    <OptionsContainer>
      {options.map((option) => (
        <OptionsLabel key={option}>
          <OptionInput
            type="radio"
            name={name}
            value={option}
            checked={value.includes(option)}
            onChange={() => toggleOption(option)}
          />
          {option}
        </OptionsLabel>
      ))}
    </OptionsContainer>
  );
}

// Type for checkbox
type ApiOption = Fish | Organization;
type CheckboxProps = {
  options: ApiOption[];
  value: ApiOption[];
  name: string;
  onChange: Dispatch<SetStateAction<any[]>>;
};

export function InputCheckbox(props: Omit<CheckboxProps, "type">) {
  return <InputCheckboxOpt {...props} />;
}

function InputCheckboxOpt({ options, name, value, onChange }: CheckboxProps) {
  const toggleOption = (option: ApiOption) => {
    // If already selected, deselect
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
      // Else add to value array
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <OptionsContainer>
      {options.map((option) => (
        <OptionsLabel key={option.name}>
          <OptionInput
            type="checkbox"
            name={name}
            value={option.id}
            checked={value.includes(option)}
            onChange={() => toggleOption(option)}
          />
          {option.name}
        </OptionsLabel>
      ))}
    </OptionsContainer>
  );
}

const OptionsContainer = styled.div`
  gap: 0.5rem;
  display: flex;
  flex-direction: row;
`;

const OptionInput = styled.input`
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`;

const OptionsLabel = styled.label`
  cursor: pointer;
`;
