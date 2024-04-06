import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzZ5k5GSr9IklJl0zDM1yMH8sxfCeQklI",
  projectId: "pawsplan-f6073",
  appId: "1:669654788227:ios:a955c0bd061c73031c13b6",
  databaseURL: "https://pawsplan-f6073.firebaseio.com"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;