import { WebView } from 'react-native-webview';

const CustomWebView = ({ route, navigation }: any) => {
    const { url } = route.params;
    return <WebView source={{ uri: url }}/>;
};

export default CustomWebView;