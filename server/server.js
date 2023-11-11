import express from 'express';
import {firebaseApp, db, storage, auth} from 'firebaseConfig.js';
import { collection } from "firebase/firestore/lite";
import { getDocs } from "firebase/firestore/lite";
import { getDoc } from 'firebase/firestore/lite';
import { doc } from 'firebase/firestore/lite';
import { updateDoc } from 'firebase/firestore/lite';
import { addDoc } from 'firebase/firestore/lite';
import { setDoc } from 'firebase/firestore/lite';
import { deleteDoc } from 'firebase/firestore/lite';


const app = express();

app.use(express.json());

app.post("/saveProfile", async(req,res) => {
    const data = req.body;
    try{
        const docRef = await addDoc(collection(db, "users"), data);
        setDoc(docRef, { id: docRef.id }, { merge: true });
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Error creating profile"});
    }
});


app.get("/getProfile", async(req,res) => {
    //make request to firebase storage
    const data = req.body;
    const token = req.body.token;

    const docRef = doc(db, "users", token)
    try{
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            //res.send(res from firebase)
            res.send(docSnap.data());
            
        } else {
            return res.status(400).json({ message: 'Unable to find user' })
        }
    }catch (error){
        console.log(error)
        return res.status(400).json({message: 'could not find sections'});
    }

    //res.send(res from firebase)

});


app.get("/generate", async(req,res) => {
    const data = req.body;
    const token = req.body.token;
    // make request to firebase
    const docRef = doc(db, "users", token) // docRef for userId as token
    let profile;

    // data = profile retrieved from firebase (identify user by token)
    try{
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            profile = docSnap.data();
            // make API call to chatGPT with data as input

            // rawResume = response received from chatGPT

            // convert rawResume to pdf & txt

            // store pdf & txt to firebase storage

            // get storage url and set to users/uid/resumeURLs section

            // res.send(resume)

        } else {
            return res.status(400).json({ message: 'Unable to find user' })
        }
    }catch (error){
        console.log(error)
        return res.status(400).json({message: 'could not find sections'});
    }

});


app.listen(3000, ()=>{
    console.log('Server started on port 3000');
})