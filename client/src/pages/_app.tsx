import { useStore } from '@/store/store';
import '@/styles/main.scss'
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';

export default function WrappedApp({ Component, pageProps }: AppProps) {
    const store = useStore(pageProps.initialReduxState)
    const router = useRouter()

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}