import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const getAllCategories = async () => {
  const categoriesQuery = query(
    collection(db, "categories"),
    where("status", "==", 1)
  );
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
  return { id: docSnap.id, ...docSnap.data() };
};

export { getAllCategories, getCategoryByID };
