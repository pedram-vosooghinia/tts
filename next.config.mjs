/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'tetisan.ir',
              port: '',
            },
        
          ],
    }
};

export default nextConfig;
