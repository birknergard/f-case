import type { Fish, Organization } from "@/generated";
import type { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { Column, Row } from "@/components/flex";
import { Text } from "@/components/text";

export const Form = styled.form``;

export const Input = styled.input`
  padding: 0.2rem;
  border: 1px solid darkgrey;
  border-radius: 2px;
`;

type RadioProps = {
  options: string[]; // At least 2 options
  value: string;
  onChange: (value: string) => void;
};

export function InputRadio({ options, value, onChange }: RadioProps) {
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
            checked={value === option}
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

export function InputCheckbox({ options, values, onChange }: CheckboxProps) {
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

const OptionsLabel = styled(Text)`
  font-size: 1rem;
  cursor: pointer;
`;
