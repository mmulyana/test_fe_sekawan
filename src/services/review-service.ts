import { db } from '@/utils/firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { nanoid } from 'nanoid'

export type Review = {
  id: string
  id_res: string
  name: string
  text: string
  rating: number
}

export interface ReviewResponse {
  data: Review | Review[] | null
  message: string
  status: number
}

export async function getReviews(id: string = ''): Promise<ReviewResponse> {
  try {
    const ref = query(collection(db, 'reviews'), where('id_res', '==', id))

    const docSnapshot = await getDocs(ref)
    if (docSnapshot.empty) {
      return {
        data: null,
        message: 'data not found',
        status: 400,
      }
    }

    const result = docSnapshot.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }))

    return {
      data: result,
      message: 'success',
      status: 200,
    }
  } catch (error) {
    return {
      data: null,
      message: error as string,
      status: 400,
    }
  }
}

export async function createReview(payload: Review): Promise<ReviewResponse> {
  try {
    const id = nanoid()
    const ref = doc(db, 'reviews', id)
    await setDoc(ref, payload)
    const result = {
      ...payload,
      id,
    } as Review

    return {
      data: result,
      message: 'success',
      status: 200,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      message: error as string,
      status: 400,
    }
  }
}
