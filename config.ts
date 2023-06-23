export const config = {
  gateway: {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    clientID: process.env.NEXT_PUBLIC_CLIENT_ID,
    grantType: '2',
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    systemUrl: process.env.NEXT_PUBLIC_API_SYSTEM_URL,
  },
};
