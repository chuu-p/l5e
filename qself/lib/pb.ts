import PocketBase from "pocketbase";
import EventSource from "react-native-sse";

// Required for PocketBase realtime in React Native
(global as any).EventSource = EventSource;

const PB_URL = "http://rs.jinora.lan";

// Create exactly one instance
const pb = new PocketBase(PB_URL);

// Optional but recommended settings
pb.autoCancellation(false); // avoids cancelled requests on re-render

export default pb;

