import Sidebar from '@/components/Sidebar';
import { AppProvider } from '@/context/ContextProvider';
import '@/styles/globals.css';
import { useRouter } from 'next/router';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import Navbar from '@/components/Navbar';
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <AppProvider>
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-[6]">
          {router.pathname !== '/login' && <Navbar />}

          <div
            className={`${
              router.pathname !== '/login' ? 'px-5 py-5 mt-20 lg:mt-0' : ''
            }`}
          >
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </AppProvider>
  );
}
