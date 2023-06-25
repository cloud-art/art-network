import { wrapper } from '@/store/store';
import '@/styles/main.scss'
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

export default function WrappedApp({ Component, pageProps }: AppProps) {
    const { store, props } = wrapper.useWrappedStore([pageProps])

    return (
        <Provider store={store}>
            <Component {...props} />
        </Provider>
    )
}