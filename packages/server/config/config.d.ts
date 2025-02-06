declare module '@/config/config' {
  const config: {
    freshdesk: {
      domain: string;
      apiKey: string;
      email: string;
    };
    freshrelease: {
      domain: string;
      apiKey: string;
      email: string;
    };
  };
  export default config;
}
