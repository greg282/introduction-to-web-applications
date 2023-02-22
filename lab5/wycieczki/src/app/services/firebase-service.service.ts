import { Injectable } from '@angular/core';
import { getStorage, listAll, ref,getDownloadURL,uploadBytes, deleteObject  } from '@angular/fire/storage';
import { Firestore, collectionData, collection,doc,setDoc, query, where,getFirestore ,getDoc, deleteDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { getDocs } from '@firebase/firestore';


interface Item {
  name:any,
  country_of_dest:any,
  start_date:String,
  end_date:String,
  unit_price:any,
  max_people:any,
  description:any,
  photo_src:any
};


interface ItemR {
  nick:any,
  description:any,
  date:any,
  rating:any
  id:any;
};
@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {
  item$: Observable<Item[]>;
  temp:any=[];
  constructor(private firestore: Firestore) {
    const data = collection(firestore, 'Tours') ;
    this.item$ = collectionData(data) as Observable<Item[]>;

  }

  createTour(data:any){
    const file=data.photo_src;
    const storage=getStorage();

    const newItemRef = doc(collection(this.firestore, 'Tours'));

   return  uploadBytes(ref(storage,'images/'+newItemRef.id), file).then((snapshot) => {
      getDownloadURL(ref(storage, 'images/'+newItemRef.id))
    .then((url) => {
      data.photo_src=url;
      const item:Item=data as Item;
      setDoc(newItemRef,item);
         })
    .catch((error) => {
      // Handle any errors
      console.log(error);
    });
    });
  }
  getSingleTour(key:any){
    const docRef = doc(this.firestore, "Tours",key);
    const docSnap =getDoc(docRef);
    return docSnap;
  }


  getData(){
    const q = query(collection(this.firestore, "Tours"), where("max_people", "!=",-111));
    const querySnapshot=getDocs(q);
    return querySnapshot;
  }

  uploadReview(obj:any,key:any){
    const item:ItemR={...obj,id:key};
    const newItemRef = doc(collection(this.firestore, 'Reviews'));
    setDoc(newItemRef,item);
  }

  getReviewsByID(id:any){
    const q = query(collection(this.firestore, "Reviews"), where("id", "==",id));
    const querySnapshot=getDocs(q);
    return querySnapshot;
  }

  deleteByID(key:any){
    const docRef = doc(this.firestore, "Tours",key);
    deleteDoc(docRef).then(()=>{console.log('delted succces')});
    const storage = getStorage();
    deleteObject(ref(storage,'images/'+key)).then(() => {
      // File deleted successfully
    }).catch((error:any) => {
      // Uh-oh, an error occurred!
      console.log(error)
    });
  }


  }


