import AppRouter from "./routes/routes";
import { SavedRecipesProvider } from "./contexts/saved-recipes.provider";
import { NuqsAdapter } from "nuqs/adapters/react";
import { ThemeProvider } from "./contexts/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <NuqsAdapter>
        <SavedRecipesProvider>
          <AppRouter />
        </SavedRecipesProvider>
      </NuqsAdapter>
    </ThemeProvider>
  );
}

export default App;
