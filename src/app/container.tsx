import { ReactNode } from "react";

const AppContainer = ({ children }: { children: ReactNode }) => (
  <main className="flex min-h-screen flex-col items-center justify-between p-3 sm:p-12">
    { children }
  </main>
)

export default AppContainer
