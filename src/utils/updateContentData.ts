import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from 'server/firebase';
import { Content } from 'types';

export const updateContentData = async ({
  uuid,
  text,
  date,
  userId,
}: Content) => {
  await updateDoc(doc(db, 'content', 'E1bHxak2ZndSED1tkXdp'), {
    content: arrayUnion({
      uuid: uuid,
      text: text,
      date: date,
      userId: userId,
    }),
  });
};
