import type { DetailedHTMLProps, InputHTMLAttributes } from "react";
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

// Type for checkbox
type CheckboxProps = {
  type: "checkbox";
  options: string[]; // At least 2 options
  name: string;
  value: string[]; // Multiple choice
  onChange: (value: string[]) => void;
};

// Type for Radio
type RadioProps = {
  type: "radio";
  options: string[]; // At least 2 options
  name: string;
  value?: string;
  onChange: (value: string) => void;
};

// Union Type, dynamically switch between types
type InputOptionsProps = CheckboxProps | RadioProps;

export function InputCheckbox(props: Omit<CheckboxProps, "type">) {
  return <InputOptions type="checkbox" {...props} />;
}

export function InputRadio(props: Omit<RadioProps, "type">) {
  return <InputOptions type="radio" {...props} />;
}

function InputOptions({
  type,
  options,
  name,
  value,
  onChange,
}: InputOptionsProps) {
  const toggleOption = (option: string) => {
    if (type === "radio") {
      onChange(option);
    } else {
      if (value.includes(option)) {
        onChange(value.filter((v) => v !== option));
      } else {
        onChange([...value, option]);
      }
    }
  };

  return (
    <OptionsContainer>
      {options.map((option) => (
        <OptionsLabel key={option}>
          <OptionInput
            type={type}
            name={name}
            value={option}
            checked={
              type === "radio" ? value === option : value.includes(option)
            }
            onChange={() => toggleOption(option)}
          />
          {option}
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
