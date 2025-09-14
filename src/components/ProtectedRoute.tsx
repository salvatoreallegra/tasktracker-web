import { Navigate } from "react-router-dom";
import type { ReactElement } from "react";

type Props = {
  authed: boolean;
  children: ReactElement; // one child element (a page)
};

export default function ProtectedRoute({ authed, children }: Props) {
  if (!authed) return <Navigate to="/login" replace />;
  return children;
}
