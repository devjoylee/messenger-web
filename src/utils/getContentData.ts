import { collection, getDocs } from 'firebase/firestore';
import { db } from 'server/firebase';
import { Content } from 'types';

export const getContentData = async () => {
  const contentRef = collection(db, 'content');
  const querySnapshot = await getDocs(contentRef);
  let res: Content[] = [];
  querySnapshot.forEach(doc => {
    const data = doc.data();
    res = data.content;
  });

  return res;
};
