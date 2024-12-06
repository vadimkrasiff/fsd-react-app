import { AppLoader } from "./app-loader";
import { AppRouter } from "./app-router";
import "./App.css";

export type CreateUserFormData = {
  name: string;
  avatarId: string;
};
function App() {
  return (
    <AppLoader>
      <AppRouter />
    </AppLoader>
  );
}

export default App;
