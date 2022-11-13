import styled from "styled-components";
import { LazyExoticComponent, ReactElement, Suspense } from "react";
import Loader from "../../components/Loader/loader.styles";
import ProtectedRoute from "../ProtectRoute/ProtectRoute";

const Content = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
