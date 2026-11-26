import {
  getDocs,
  collection,
  where,
  query,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getProductos = async (categoryId) => {
  const collectionRef = categoryId
    ? query(collection(db, "productos"), where("category", "==", categoryId))
    : collection(db, "productos");

  const querySnapshot = await getDocs(collectionRef);
  const productsAdapted = querySnapshot.docs.map((docItem) => {
    const campos = docItem.data();
    return { id: docItem.id, ...campos };
  });

  return productsAdapted;
};

export const getProductosById = async (productoId) => {
  const documentRef = doc(db, "productos", productoId);
  const queryDocumentSnapshot = await getDoc(documentRef);

  if (!queryDocumentSnapshot.exists()) {
    return null;
  }

  const campos = queryDocumentSnapshot.data();
  return { id: queryDocumentSnapshot.id, ...campos };
};
