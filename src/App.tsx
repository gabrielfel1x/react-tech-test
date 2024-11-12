import AppRouter from "./routes/routes";
import { SavedRecipesProvider } from "./contexts/saved-recipes.provider";

function App() {
  return (
    <SavedRecipesProvider>
      <AppRouter />
    </SavedRecipesProvider>
  );
}

export default App;
