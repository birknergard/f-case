import {
  confirmable,
  createConfirmation,
  type ConfirmDialogProps,
} from "react-confirm";
import { Column, Row } from "@/components/flex";
import { Text } from "@/components/text";
import styled from "styled-components";
import { Button } from "@/components/button";

const Dialog = ({
  show,
  proceed,
  message,
}: ConfirmDialogProps<{ message: string }, boolean>) => {
  if (!show) return null;
  return (
    <Overlay>
      <ModalContainer>
        <Message>{message}</Message>
        <Row>
          <Button onClick={() => proceed(false)}>Avbryt</Button>
          <Button onClick={() => proceed(true)}>Ok</Button>
        </Row>
      </ModalContainer>
    </Overlay>
  );
};

export const confirm = createConfirmation(confirmable(Dialog));

const Message = styled(Text)`
  text-align: center;
`;

const Overlay = styled(Column)`
  position: fixed;
  inset: 0;
  background: color-mix(in srgb, white 90%, transparent);
  justify-content: center;
  align-items: center;
  z-index: 5000;
`;

export const ModalContainer = styled(Column)`
  border-radius: 5px;
  max-width: 20rem;
  overflow: hidden;
  padding: 1.25rem;
  gap: 1rem;
  box-shadow: 1rem;
`;
