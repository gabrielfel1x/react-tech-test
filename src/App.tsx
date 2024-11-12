import AppRouter from "./routes/routes";
import { SavedRecipesProvider } from "./contexts/saved-recipes.provider";
import { NuqsAdapter } from "nuqs/adapters/react";

function App() {
  return (
    <NuqsAdapter>
      <SavedRecipesProvider>
        <AppRouter />
      </SavedRecipesProvider>
    </NuqsAdapter>
  );
}

export default App;
