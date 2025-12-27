import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { type AppKitNetwork, sepolia } from "@reown/appkit/networks";
import { QueryClient } from "@tanstack/react-query";

// 1. Get projectId from https://cloud.reown.com
export const projectId = "918dd950be4806b40aeb43c9524589f3"; // Example ID, user should replace

// 2. Create a metadata object - optional
export const metadata = {
  name: "CORWatch x402",
  description: "AppKit Example",
  url: "https://reown.com/appkit", // origin must match your domain & subdomain
  icons: ["https://assets.reown.com/reown-profile-pic.png"],
};

// 3. Set the networks
// 3. Set the networks
export const networks = [sepolia] as [AppKitNetwork, ...AppKitNetwork[]];

// 4. Create Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

// 5. Create QueryClient
export const queryClient = new QueryClient();

// 6. Create the AppKit object
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});
