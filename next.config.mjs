/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'tts-images-omde.storage.c2.liara.space',
              port: '',
            },
        
          ],
    }
};

export default nextConfig;
