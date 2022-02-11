import { collection, getDocs } from 'firebase/firestore';
import { db } from 'server/firebase';
import { User } from 'types';

export const getUserData = async (target: string) => {
  const userRef = collection(db, target);
  const querySnapshot = await getDocs(userRef);
  let res: User[] = [];
  querySnapshot.forEach(doc => {
    const data = doc.data();
    data['docId'] = doc.id;
    res.push(data as User);
  });

  return res;
};
