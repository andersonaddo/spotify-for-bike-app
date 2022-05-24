//Structure taken from
//https://github.com/cjam/react-native-spotify-remote/blob/c673883eeaeb6f94a0c2c5f2e98636e3c0290f23/example/AppContext.tsx

import React from 'react';
import dotEnvConfig from "react-native-ultimate-config"
import {
    ApiConfig,
    ApiScope, auth, PlayerContext, PlayerState, remote, SpotifyAuth, SpotifyRemoteApi
} from 'react-native-spotify-remote';
import { AppState, AppStateStatus, NativeEventSubscription } from 'react-native';
import Snackbar from 'react-native-snackbar';

/**
 * Options used to dictate how the user authenticates
 */
interface AuthOptions {
    playURI?: string;
    showDialog?: boolean;
    autoConnect?: boolean;
    authType?: ApiConfig["authType"]
}

/**
 * The state of the provider for my Spotify context provider
 */
interface ContextProviderState {
    error?: Error & { code?: any };
    playerState?: PlayerState;
    token?: string;
    isConnected?: boolean;

    lastAppState: AppStateStatus //Not passed down to context consumers
}

/**
 * Everything passed down as props for a consumer of my Spotify context consumer
 */
export interface ContextConsumerProps extends Omit<ContextProviderState, "lastAppState"> {
    onError: (err: Error) => void;
    clearError: () => void;
    startAuthSession: (options?: AuthOptions) => void;
    endAuthSession: () => void;
    remote: SpotifyRemoteApi,
    auth: SpotifyAuth
}

const noop = () => { };
const DefaultContext: ContextConsumerProps = {
    onError: noop,
    clearError: noop,
    startAuthSession: noop,
    endAuthSession: noop,
    remote,
    auth,
}

/**
 * React Context that contains all the variables managed by Spotify API and my Context provider
 */
export const SpotifyAPIContext = React.createContext<ContextConsumerProps>(DefaultContext);

/**
 * Class that wraps the app and manages + provides my Spotify context
 */
class SpotifyContextProvider extends React.Component<{}, ContextProviderState> {

    state: ContextProviderState = {
        isConnected: false,
        lastAppState: "active" as const
    }

    appStateSubscription: NativeEventSubscription | undefined;

    componentDidMount() {
        remote.on("remoteConnected", this.onConnected)
            .on("remoteDisconnected", this.onDisconnected)
            .on("playerStateChanged", this.onPlayerStateChanged)
            .on("playerContextChanged", this.onPlayerContextChanged);


        this.reconnectRemoteIfAuthSessionLive()

        //We have to disconnect remotes when they go to the background to allow
        //Spotify to be able to sleep
        //https://developer.spotify.com/documentation/android/guides/application-lifecycle/
        this.appStateSubscription = AppState.addEventListener("change",
            nextAppState => {
                if (this.state.lastAppState == "background" && nextAppState === "active") {
                    console.log("App has come to the foreground! Time to reconnect the remote")
                    this.reconnectRemoteIfAuthSessionLive()
                } else if (nextAppState == "background") {
                    console.log("App has come to the background! Time to disconnect the remote")
                    remote.disconnect()
                }
                this.setState({ lastAppState: nextAppState });
            }
        );
    }

    componentWillUnmount() {
        remote.disconnect()
        remote.removeAllListeners();
        this.appStateSubscription?.remove();
    }

    private startAuthSession = async ({ playURI, showDialog = false, authType }: AuthOptions = {}) => {
        console.log("Starting Auth Session")
        const config: ApiConfig = {
            clientID: dotEnvConfig.SPOTIFY_CLIENT_ID,
            redirectURL: dotEnvConfig.SPOTIFY_REDIRECT_URL,
            tokenRefreshURL: dotEnvConfig.SPOTIFY_TOKEN_REFRESH_URL,
            tokenSwapURL: dotEnvConfig.SPOTIFY_TOKEN_SWAP_URL,
            scopes: [ApiScope.AppRemoteControlScope],
            playURI,
            showDialog,
            authType
        };

        try {
            // Go and check if things are connected to update state
            const isConnected = await remote.isConnectedAsync()
            this.setState((state) => ({
                ...state,
                isConnected
            }));

            // Initialize the session
            const { accessToken: token } = await auth.authorize(config);
            this.setState((state) => ({
                ...state,
                token
            }));
            await this.connectRemoteIfNotConnected(token)
        } catch (err) {
            if (this.isError(err)) this.onError(err);
        }
    }

    private endAuthSession = () => {
        console.log("Ending Auth Session")
        auth.endSession().then(() => {
            console.log("Disconnecting Remote")
            return remote.disconnect()
        }).then(() => {
            this.setState({ isConnected: false, token: undefined });
        }).catch(err => {
            if (this.isError(err)) this.onError(err);
        })
    }

    //Again, its important we only have one connection
    //https://developer.spotify.com/documentation/android/guides/application-lifecycle/
    private connectRemoteIfNotConnected = async (accessToken: string) => {
        console.log("Connecting remote if it's not already connected")
        try {
            const isConnected = await remote.isConnectedAsync()
            if (!isConnected) {
                await remote.connect(accessToken)
                console.log("Remote connected")
            } else {
                console.log("Skipped remote connection")
            }
        } catch (err) {
            console.log("Remote connection failed, disconnecting remote")
            remote.disconnect()
            if (this.isError(err)) this.onError(err);
        }
    }

    private reconnectRemoteIfAuthSessionLive = () => {
        console.log("Checking for current auth state...")
        auth.getSession().then((session) => {
            if (session != undefined && session.accessToken != undefined) {
                console.log("Attempting to reconnect remote since auth session still live")
                this.setState((state) => ({ ...state, token: session.accessToken }))
                this.connectRemoteIfNotConnected(session.accessToken)
                    .then(() => this.setState((state) => ({ ...state, isConnected: true })))
                    .catch(this.onError);
            } else {
                console.log("Session non existent (or had no token)")
            }
        });
    }

    private onError = (error: Error) => {
        if (__DEV__) {
            console.error(error.message)
        } else {
            let message = error.message
            //Some errors returned by the api have nested messages
            try{
                const parsedError = JSON.parse(message)
                const nestedMessage = parsedError?.message
                if (nestedMessage) message = nestedMessage
            }catch(err){}
            
            Snackbar.show({
                text: message,
                duration: Snackbar.LENGTH_SHORT,
            });
        }

        this.setState((state) => ({ ...state, error }))
    }

    //Type guard designed for use with onError
    private isError(x: any): x is Error {
        return typeof x.name === 'string';
    }

    private clearError = () => {
        this.setState((state) => ({ ...state, error: undefined }));
    }

    private onConnected = () => {
        this.setState((state) => ({
            ...state,
            isConnected: true
        }));
    }

    private onDisconnected = () => {
        this.setState((state) => ({
            ...state,
            isConnected: false
        }));
    }

    private onPlayerStateChanged = (playerState: PlayerState) => {
        this.setState((state) => ({
            ...state,
            playerState
        }));
    };

    private onPlayerContextChanged = (playerContext: PlayerContext) => {
        this.setState((state) => ({
            ...state,
            playerContext
        }));
    };

    render() {
        const { children } = this.props
        const { lastAppState, ...cleanedState } = this.state;
        return (
            <SpotifyAPIContext.Provider
                value={{
                    ...DefaultContext,
                    ...cleanedState,
                    onError: this.onError,
                    clearError: this.clearError,
                    startAuthSession: this.startAuthSession,
                    endAuthSession: this.endAuthSession
                }}
            >
                {children}
            </SpotifyAPIContext.Provider>
        )
    }
}

export default SpotifyAPIContext;
export { SpotifyContextProvider };
