import styled from "styled-components";
import { LazyExoticComponent, ReactElement, Suspense } from "react";
import Loader from "@/components/Loader/loader.styles";
import ProtectedRoute from "../ProtectRoute/ProtectRoute";

const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  height: 100vh;
`;

function withSuspense<T>(
  Component:
    | LazyExoticComponent<() => ReactElement<T>>
    | React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>
) {
  return (
    <Suspense
      fallback={
        <Content>
          <Loader />
        </Content>
      }
    >
      <ProtectedRoute>
        <Component />
      </ProtectedRoute>
    </Suspense>
  );
}

export default withSuspense;
