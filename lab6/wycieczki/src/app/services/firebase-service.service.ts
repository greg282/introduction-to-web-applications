import { Injectable } from '@angular/core';
import { getStorage, listAll, ref,getDownloadURL,uploadBytes, deleteObject  } from '@angular/fire/storage';
import { Firestore, collectionData, collection,doc,setDoc, query, where,getFirestore ,getDoc, deleteDoc,updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { getDocs } from '@firebase/firestore';
import {  createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged,signOut ,getAuth,setPersistence,inMemoryPersistence,browserLocalPersistence,browserSessionPersistence,deleteUser} from "firebase/auth";
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import { AddToCartService } from './add-to-cart.service';
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

interface User  {
  id:string,
  email:string,
  guest: true,
  admin: false,
  menager: false,
  client: true,
  banned: false,
};
@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {
  userState= new BehaviorSubject<any>(null);
  item$: Observable<Item[]>;
  temp:any=[];
  userData: any = null;
  userRoles:any={
    id:'tmp',
    guest: true,
    admin: false,
    menager: false,
    client: false,
    banned: false,
  };


  constructor(private firestore: Firestore,private router:Router,private afAuth: AngularFireAuth,private counter:AddToCartService) {
    const data = collection(firestore, 'Tours') ;
    this.item$ = collectionData(data) as Observable<Item[]>;

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userData=user;
        this.getUserById(user.uid).then((data:any)=>{
          this.userRoles=data['_snapshot']['docChanges'][0]['doc']['data']['value']['mapValue']['fields'];
        this.userState.next(this.userRoles)});

        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        const uid = user.uid;
        // ...
      } else {
        this.userData=null;
        this.userRoles={
          id:'tmp',
          guest: true,
          admin: false,
          menager: false,
          client: false,
          banned: false,
        };;
        // User is signed out
        // ...
      }
    });



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

///////////////////auth
  registerUser(email1:any,password:any){
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email1, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const userD:User={
        id:userCredential.user.uid,
        email:email1,
        guest: true,
        admin: false,
        menager: false,
        client: true,
        banned: false,
      };
      this.addUserToDb(userD).then(res=>res);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      window.alert(error)
    });



  }

  addUserToDb(user:any){
    const newItemRef = doc(collection(this.firestore, 'Users'));
    return setDoc(newItemRef,user);

  }

  loginUser(email:any,password:any){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        this.router.navigate(['tourlist']);

        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error);
      });

  }


  signOut(){
    const auth = getAuth();
    signOut(auth).then(() => { window.location.reload();
    }).catch((error) => {
    });
  }

  getAuthenticated(): Observable<any> {
    return this.afAuth.authState;
  }

  getUserById(id:any){
    const q = query(collection(this.firestore, "Users"), where("id", "==",id));
    const querySnapshot=getDocs(q);
    return querySnapshot;
  }

  changePersistance(mode:any){
    const t=mode;
    if(mode=='session'){
      mode=browserSessionPersistence;
    }
    else if(mode=='local'){
      mode=browserLocalPersistence;
    }
    else{
      mode=inMemoryPersistence;
    }

    const auth = getAuth();
    setPersistence(auth,mode)
    .then(() => {
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  getUsersList(){
    const q = query(collection(this.firestore, "Users"), where("id", "!=","2137"));
    const querySnapshot=getDocs(q);
    return querySnapshot;
  }

  banUserById(id:any){
   this.getUserById(id).then(async data=>{
    const dataRef = data.docs[0].ref;
      await updateDoc(dataRef, {
        banned: true
      });
  })
  }

  unbanUserById(id:any){
    this.getUserById(id).then(async data=>{
      const dataRef = data.docs[0].ref;
        await updateDoc(dataRef, {
          banned: false
        });
    })
  }

  async updatePriceByID(id:any,value:number){
    const docRef = doc(this.firestore, "Tours", id);
    await updateDoc(docRef, {
      unit_price: value
    });

  }
  async updatePeopleByID(id:any,value:number){
    const docRef = doc(this.firestore, "Tours", id);
    await updateDoc(docRef, {
      max_people: value
    });

  }
  updateRolesByID(id:any,values:any){
    this.getUserById(id).then(async data=>{
      const dataRef = data.docs[0].ref;
        await updateDoc(dataRef, {
          admin:values.admin,
          banned:values.banned,
          client:values.client,
          guest:values.guest,
          menager:values.menager
        });
    })

  }



}

