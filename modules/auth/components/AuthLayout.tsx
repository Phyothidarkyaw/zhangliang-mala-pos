import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function AuthLayout({ children }: Props) {
  return (
    <section
      className="flex min-h-svh flex-col items-center justify-end md:justify-center gap-6 bg-muted p-0 md:p-10"
      id="auth-layout"
    >
      <div className="flex w-full max-w-md flex-col gap-6">{children}</div>
    </section>
  );
}

export default AuthLayout;
