import { QueryClient, QueryClientProvider } from "react-query";

import GlobalStyle from "@/styles/globals";
import RouterConfig from "@/routers/router";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <RouterConfig />
    </QueryClientProvider>
  );
}

export default App;
