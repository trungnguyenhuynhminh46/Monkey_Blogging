import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const getAllUsers = async (status = null, query_string = "") => {
  let usersQuery = query(collection(db, "users"));
  if (status !== null) {
    if (!!query_string) {
      usersQuery = query(
        collection(db, "users"),
        where("status", "==", status),
        where("displayName", ">=", query_string),
        where("displayName", "<=", query_string + "\uf8ff")
      );
    } else {
      usersQuery = query(
        collection(db, "users"),
        where("status", "==", status)
      );
    }
  } else if (!!query_string) {
    usersQuery = query(
      collection(db, "users"),
      where("displayName", ">=", query_string),
      where("displayName", "<=", query_string + "\uf8ff")
    );
  }
  const querySnap = await getDocs(usersQuery);
  let catsList = [];
  querySnap.forEach((category) => {
    catsList.push({ id: category.id, ...category.data() });
  });
  return catsList;
};

const getUserByID = async (user_id) => {
  const docRef = doc(db, "users", user_id);
  const docSnap = await getDoc(docRef);
  return { id: docSnap.id, ...docSnap.data() };
};

export { getAllUsers, getUserByID };
