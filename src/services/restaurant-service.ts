import { Restaurtant } from '@/model/restaurant'
import { db } from '@/utils/firebase'
import {
  query,
  collection,
  where,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore'

export interface RestaurantI extends Restaurtant {
  reviews: {
    name: string
    rating: number
    text: string
  }
}

export interface RestaurtantResponse {
  data: RestaurantI | RestaurantI[] | null
  message: string
  status: number
}

export async function getRestaurants(
  category: string = ''
): Promise<RestaurtantResponse> {
  try {
    let ref: any = collection(db, 'restaurant')

    if (category !== '') {
      ref = query(
        collection(db, 'restaurant'),
        where('category', '==', category)
      )
    }

    const docSnapshot = await getDocs(ref)
    if (!docSnapshot) {
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

export async function getDetailRestaurant(
  id: string
): Promise<RestaurtantResponse> {
  try {
    const ref = doc(db, 'restaurant', id)
    const docSnapshot = await getDoc(ref)

    if (!docSnapshot.exists()) {
      return {
        data: null,
        message: 'data not found',
        status: 400,
      }
    }

    const result = docSnapshot.data() as RestaurantI

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
