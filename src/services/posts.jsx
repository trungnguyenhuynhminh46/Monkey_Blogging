import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const getAllPosts = async (status = null) => {
  let postsQuery = query(collection(db, "posts"));
  if (status !== null) {
    postsQuery = query(collection(db, "posts"), where("status", "==", status));
  }
  let postsList = [];
  const postsSnap = await getDocs(postsQuery);
  postsSnap.forEach(async (post) => {
    postsList.push({ id: post.id, ...post.data() });
  });
  return postsList;
};

const getPostByID = async (post_id) => {
  const postRef = doc(db, "posts", post_id);
  const docSnap = await getDoc(postRef);
  return { id: docSnap.id, ...docSnap.data() };
};

export { getAllPosts, getPostByID };
