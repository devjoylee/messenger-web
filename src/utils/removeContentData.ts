import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'server/firebase';
import { Content } from 'types';

export const removeContentData = async (content: Content[]) => {
  await updateDoc(doc(db, 'content', 'E1bHxak2ZndSED1tkXdp'), {
    content: [...content],
  });
};
