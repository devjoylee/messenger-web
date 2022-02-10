import React from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'server/firebase';

export const getUser = async (target: string) => {
  const userRef = collection(db, target);
  const querySnapshot = await getDocs(userRef);
  let res: any = [];
  querySnapshot.forEach(doc => {
    res.push(doc.data());
  });

  return res;
};
