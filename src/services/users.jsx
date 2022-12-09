import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const getAllUsers = async () => {
  const colRef = collection(db, "users");
  const colSnap = getDocs(colRef);
  let usersList = [];
  colSnap.forEach((doc) => {
    usersList.push({ id: doc.id, ...doc.data() });
  });
  return usersList;
};

const getUserByID = async (user_id) => {
  const docRef = doc(db, "users", user_id);
  const docSnap = await getDoc(docRef);
  return { id: docSnap.id, ...docSnap.data() };
};

export { getAllUsers, getUserByID };
