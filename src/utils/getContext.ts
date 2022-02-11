import { collection, getDocs } from 'firebase/firestore';
import { db } from 'server/firebase';
import { Context } from 'types';

// interface Contexts {
//   res : Array<Context[]>
// }

export const getContext = async () => {
  const contentRef = collection(db, 'content');
  const querySnapshot = await getDocs(contentRef);
  let res: any = [];
  querySnapshot.forEach(doc => {
    const data = doc.data();
    res.push(data);
  });
  console.log(res);

  return res;
};
