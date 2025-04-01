import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import { ToastProvider } from '@/components/admin/ToastContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ToastProvider>
  );
}
