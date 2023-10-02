import React from "react";
import { HashRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "@rainbow-me/rainbowkit/styles.css";
import Home from "./pages/Home.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Pools from "./pages/Pools.jsx";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, mainnet, WagmiConfig } from "wagmi";
import { arbitrum, optimism, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from 'wagmi/providers/alchemy';



const { chains, publicClient, webSocketPublicClient } = configureChains(
    [sepolia],
    [alchemyProvider({ apiKey: 'WeYftc2JOcVwwlQDanweVGZH6OsI1ntb' }),
        publicProvider()]
  );

const { connectors } = getDefaultWallets({
    appName: "Lila Finance",
    projectId: "bda6fa1e010c105dbdccb1ef26e1049e",
    chains,
});

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});


const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/pools",
          element: <Pools />,
        },
        {
          path: "/portfolio",
          element: <Portfolio />,
        },
      ],
    },
  ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     < WagmiConfig config={wagmiConfig}>
//         <RainbowKitProvider chains={chains} modalSize="compact">
//             <RouterProvider router={router} />
//         </RainbowKitProvider>
//       </WagmiConfig>
//   </React.StrictMode>
// );

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} modalSize="compact">
          <HashRouter>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="pools" element={<Pools />} />
                <Route path="portfolio" element={<Portfolio />} />
              </Route>
            </Routes>
          </HashRouter>
        </RainbowKitProvider>
      </WagmiConfig>
    </React.StrictMode>
  );