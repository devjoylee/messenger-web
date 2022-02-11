import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from 'server/firebase';
import { Content } from 'types';
import { getContentData } from './getContentData';

export const editContentData = async (content: Content, value: string) => {
  const contentRes = await getContentData();
  const newContent = contentRes.filter(data => data.uuid !== content.uuid);

  await updateDoc(doc(db, 'content', 'E1bHxak2ZndSED1tkXdp'), {
    content: [
      ...newContent,
      {
        uuid: content.uuid,
        text: value,
        date: content.date,
        userId: content.userId,
      },
    ],
  });

  // const editContentRef = collection(db, 'content');
  // console.log(editContentRef);

  // const editContentQuery = query(editContentRef, where('uuid', '==', uuid));
  // const docRef = await getDocs(editContentQuery);
  // console.log(docRef);

  // console.log(editContentQuery);
};
