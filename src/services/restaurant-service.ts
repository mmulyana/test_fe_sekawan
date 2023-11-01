import { Restaurant } from '@/model/restaurant'
import { db, storage } from '@/utils/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import {
  query,
  collection,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'
import { nanoid } from 'nanoid'

export interface RestaurantI extends Restaurant {
  reviews?: {
    name: string
    rating: number
    text: string
  }
}

export type RestaurantRequest = Omit<Restaurant, 'id'>

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

export async function createRestaurant(
  payload: RestaurantRequest
): Promise<RestaurtantResponse> {
  try {
    const id = nanoid()
    const ref = doc(db, 'restaurant', id)
    await setDoc(ref, payload)
    const result = {
      id,
      ...payload,
    } as RestaurantI

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

export async function uploadImageRestaurant(file: File): Promise<string> {
  const newImage = ref(storage, `imagesRestaurant/${nanoid()}`)

  try {
    const uploadTask = await uploadBytes(newImage, file)
    const downloadURL = await getDownloadURL(uploadTask.ref)
    return downloadURL.split('&')[0]
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}
