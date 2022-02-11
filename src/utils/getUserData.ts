import { collection, getDocs } from 'firebase/firestore';
import { db } from 'server/firebase';

export const getUserData = async (target: string) => {
  const userRef = collection(db, target);
  const querySnapshot = await getDocs(userRef);
  let res: any = [];
  querySnapshot.forEach(doc => {
    const data = doc.data();
    data['docId'] = doc.id;
    res.push(data);
  });

  return res;
};
