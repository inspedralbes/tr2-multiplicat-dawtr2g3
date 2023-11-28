import { io } from "socket.io-client";
import { useAppStore } from '@/stores/app';

// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://provasocket.daw.inspedralbes.cat:3113";

export const socket = io(URL);

socket.on("actualizacionVotos", (newVotos) => {
  const store = useAppStore();
  store.setVotos(newVotos);
});
