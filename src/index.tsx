import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { ContextProvider } from "./context/context";
import { GoogleOAuthProvider } from "@react-oauth/google";

/* GraphQL Imports */
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.REACT_APP_API_WS_URL!,
  })
);

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL, // will need to make it an environmet variable
  credentials: "include",
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <GoogleOAuthProvider
        clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID!}
      >
        <ContextProvider>
          <App />
        </ContextProvider>
      </GoogleOAuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

if (process.env.NODE_ENV === "production") {
  const script = document.createElement("script");
  script.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag("js", new Date());
gtag("config", "G-D3HRVV9QR0"); 
 `;
  document.head.appendChild(script);
}
