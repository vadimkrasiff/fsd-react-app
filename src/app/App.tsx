import { ThemeProvider } from "@mui/material";
import { AppLoader } from "./app-loader";
import { AppRouter } from "./app-router";
import "./App.css";
import { theme } from "./mui-localization";

export type CreateUserFormData = {
  name: string;
  avatarId: string;
};
function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppLoader>
        <AppRouter />
      </AppLoader>
    </ThemeProvider>
  );
}

export default App;
