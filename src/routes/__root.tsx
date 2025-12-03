import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Navbar } from "@/core/components/layout/navbar";

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
    </>
  ),
});
