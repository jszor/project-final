import { Outlet } from '@tanstack/react-router'
import { useEffect } from "react";
import { useAuthStore } from "./store/auth";


const App = () => {

  const rehydrate = useAuthStore((state) => state.rehydrate);

  useEffect(() => {
    rehydrate();
  }, [rehydrate]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My React + TanStack Router App</h1>
      <Outlet />
    </div>
  );
};

export default App;