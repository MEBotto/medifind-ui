import { Button } from "./components/ui/button";

function App() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-semibold text-gray-900 mb-2">
        Medifind UI
      </h1>
      <p className="text-gray-600 text-lg">
        Plataforma iniciada correctamente.
      </p>
      <Button className="bg-blue-500">Click me</Button>
    </main>
  );
}

export default App;
