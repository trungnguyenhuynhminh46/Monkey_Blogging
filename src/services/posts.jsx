import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const getAllPosts = async (
  status = null,
  query_string = "",
  user_id = null
) => {
  let postsQuery = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  if (!!user_id) {
    postsQuery = query(
      collection(db, "posts"),
      where("user_id", "==", user_id)
    );
  } else {
    if (status !== null) {
      postsQuery = query(
        collection(db, "posts"),
        where("status", "==", status),
        orderBy("createdAt", "desc")
      );
      if (!!query_string) {
        postsQuery = query(
          collection(db, "posts"),
          where("status", "==", status),
          where("title", ">=", query_string),
          where("title", "<=", query_string + "\uf8ff")
        );
      }
    } else if (!!query_string) {
      postsQuery = query(
        collection(db, "posts"),
        where("title", ">=", query_string),
        where("title", "<=", query_string + "\uf8ff")
      );
    }
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
  if (!docSnap.exists()) {
    return undefined;
  }
  return { id: docSnap.id, ...docSnap.data() };
};

export { getAllPosts, getPostByID };
