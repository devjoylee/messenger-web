import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from 'server/firebase';
import { Content } from 'types';
import { getDate } from 'utils/getDate';

export const updateContentData = async ({ text, date, userId }: Content) => {
  await updateDoc(doc(db, 'content', 'E1bHxak2ZndSED1tkXdp'), {
    content: arrayUnion({
      text: text,
      date: getDate(date),
      userId: userId,
    }),
  });
};
