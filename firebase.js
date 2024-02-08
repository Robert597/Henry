import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyChGxcdzslY4nL-FT_pGh8tj-Zqsooetwk",
    authDomain: "e-commece-362f8.firebaseapp.com",
    projectId: "e-commece-362f8",
    storageBucket: "e-commece-362f8.appspot.com",
    messagingSenderId: "685428143866",
    appId: "1:685428143866:web:2098337d43fac3c785fb43"
  };

  export const app = initializeApp(firebaseConfig);
  export const storage = getStorage(app);