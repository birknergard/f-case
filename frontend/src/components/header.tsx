import { Link } from "@tanstack/react-router";
import styled from "styled-components";

export default function Header({ title }: { title: string }) {
  return (
    <TopHeader>
      <Link to="/" replace style={{ textDecoration: "none", color: "inherit" }}>
        <Heading>{title}</Heading>
      </Link>
    </TopHeader>
  );
}

const TopHeader = styled.header`
  display: flex;
  width: 100%;
  padding: 0rem 2.5rem 0rem 2.5rem;
  background: darkblue;
`;

const Heading = styled.h1`
  color: white;
`;
