import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import type { QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <Page>
      <PageContainer>
        <Outlet />
        <ToastContainer position="bottom-right" autoClose={4000} />
      </PageContainer>
    </Page>
  ),
});

const Page = styled.div`
  height: 100vh;
  width: 100vw;
  background: var(--bg-color);
`;

const PageContainer = styled.div`
  max-width: 64rem;
  margin-left: auto;
  margin-right: auto;
  padding: 1.5rem;
  background: var(--bg-color);
`;
