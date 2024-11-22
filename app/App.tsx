import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { memo } from 'react';
import Root from './navigation/Root';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { StyleSheet } from 'react-native';

const App = () => {
    return (
        <GestureHandlerRootView style={styles.root}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Root />
                </PersistGate>
            </Provider>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});


export default memo(App);