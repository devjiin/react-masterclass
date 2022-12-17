import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import App from './App';
import {RecoilRoot} from 'recoil'; 

const queryClient = new QueryClient();

ReactDOM.render(
	<React.StrictMode>
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<App />
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</RecoilRoot>
	</React.StrictMode>,
	document.getElementById("root")
);
