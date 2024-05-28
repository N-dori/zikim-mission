/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '',
    async headers() {
        return [
          {
            // Apply these headers to all API routes
            source: "/api/:path*", // This pattern matches all routes under /api
            headers: [
              { key: "Access-Control-Allow-Credentials", value: "true" },
              // Allow all origins - in a production environment, replace "*" with your frontend URL for security
              { key: "Access-Control-Allow-Origin", value: "*" },
              // List of allowed HTTP methods
              { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
              // List of allowed headers in the request
              { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            ]
          }
        ];
      },
};

export default nextConfig;
