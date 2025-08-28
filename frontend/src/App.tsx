import { Outlet } from '@tanstack/react-router'

const App = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My React + TanStack Router App</h1>
      <Outlet />
    </div>
  );
};

export default App;