import type { Fish } from "@/generated";
import type { Organization } from "@/models/facility";
import type { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { Column, Row } from "./flex";

export const Input = styled.input`
  border: 1px solid darkgrey;
  border-radius: 2px;
`;

type RadioProps = {
  options: string[]; // At least 2 options
  value: string;
  onChange: (value: string) => void;
};

export function InputRadio(props: Omit<RadioProps, "type">) {
  return <InputRadioOpt {...props} />;
}

function InputRadioOpt({ options, value, onChange }: RadioProps) {
  const toggleOption = (option: string) => {
    onChange(option);
  };

  return (
    <Row>
      {options.map((option) => (
        <OptionsLabel key={option}>
          <OptionInput
            type="radio"
            value={option}
            checked={value.includes(option)}
            onChange={() => toggleOption(option)}
          />
          {option}
        </OptionsLabel>
      ))}
    </Row>
  );
}

// Type for checkbox
type ApiOption = Fish | Organization;
type CheckboxProps = {
  options: ApiOption[];
  values: ApiOption[];
  onChange: Dispatch<SetStateAction<any[]>>;
};

export function InputCheckbox(props: Omit<CheckboxProps, "type">) {
  return <InputCheckboxOpt {...props} />;
}

function InputCheckboxOpt({ options, values, onChange }: CheckboxProps) {
  const toggleOption = (option: ApiOption) => {
    // If already selected, filter item out of array
    if (values.map((v) => v.id).includes(option.id)) {
      onChange(values.filter((v) => v.id !== option.id));
    } else {
      onChange([...values, option]);
    }
  };

  return (
    <Column>
      {options.map((option) => (
        <OptionsLabel key={option.name}>
          <OptionInput
            type="checkbox"
            value={option.id}
            checked={values.map((e) => e.id).includes(option.id)}
            onChange={() => toggleOption(option)}
          />
          {option.name}
        </OptionsLabel>
      ))}
    </Column>
  );
}

const OptionInput = styled.input`
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`;

const OptionsLabel = styled.label`
  cursor: pointer;
`;
