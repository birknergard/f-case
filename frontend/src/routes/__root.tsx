import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import type { QueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import Header from "@/components/header";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <Page>
      <Header title="f-case" />
      <PageContainer>
        <Outlet />
      </PageContainer>
    </Page>
  ),
});

const Page = styled.div`
  height: 100vh;
  width: 100vw;
`;

const PageContainer = styled.div`
  max-width: 64rem;
  margin-left: auto;
  margin-right: auto;
  padding: 1.5rem;
  background: var(--bg-color);
`;
