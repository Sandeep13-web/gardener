export const config = {
  gateway: {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    clientID: process.env.NEXT_PUBLIC_CLIENT_ID,
    grantType: "2",
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    apiURL: process.env.NEXT_PUBLIC_API_URL,
    systemURL: process.env.NEXT_PUBLIC_API_SYSTEM_URL,
  },
};
