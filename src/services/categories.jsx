import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const getAllCategories = async (status = null, query_string = "") => {
  let categoriesQuery = query(collection(db, "categories"));
  if (status !== null) {
    if (!!query_string) {
      categoriesQuery = query(
        collection(db, "categories"),
        where("status", "==", status),
        where("name", "==", query_string)
      );
    } else {
      categoriesQuery = query(
        collection(db, "categories"),
        where("status", "==", status)
      );
    }
  } else if (!!query_string) {
    categoriesQuery = query(
      collection(db, "categories"),
      where("name", "==", query_string)
    );
  }
  const querySnap = await getDocs(categoriesQuery);
  let catsList = [];
  querySnap.forEach((category) => {
    catsList.push({ id: category.id, ...category.data() });
  });
  return catsList;
};

const getCategoryByID = async (category_id) => {
  const docRef = doc(db, "categories", category_id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return undefined;
  }
  return { id: docSnap.id, ...docSnap.data() };
};

export { getAllCategories, getCategoryByID };
