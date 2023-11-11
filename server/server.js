import express from 'express';
import firebaseConfig from './firebaseConfig.js';
import { collection } from "firebase/firestore/lite";
import { getDocs } from "firebase/firestore/lite";
import { getDoc } from 'firebase/firestore/lite';
import { doc } from 'firebase/firestore/lite';
import { updateDoc } from 'firebase/firestore/lite';
import { addDoc } from 'firebase/firestore/lite';
import { setDoc } from 'firebase/firestore/lite';
import { deleteDoc } from 'firebase/firestore/lite';
import OpenAI from 'openai';


const app = express();

app.use(express.json());

app.post("/saveProfile", async(req,res) => {
    const data = req.body;
    const uid = data.uid;
    try{
        // const docRef = await addDoc(collection(firebaseConfig.db, "users", uid), data);
        await setDoc(doc(firebaseConfig.db, "users", uid), data);
        // await firebaseConfig.db.collection("users").doc(uid).set(data)
        console.log("Document written with ID: ", uid);
        return res.status(200).json({ message: "Profile created successfully", id: uid });
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Error creating profile"});
    }
});


app.get("/getProfile", async(req,res) => {
    //make request to firebase storage
    const data = req.body;
    const uid = data.uid;

    const docRef = doc(firebaseConfig.db, "users", uid)
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

});


app.get("/generate", async(req,res) => {
    const data = req.body;
    const uid = req.body.uid;
    // make request to firebase
    const docRef = doc(firebaseConfig.db, "users", uid) // docRef for userId as token
    let profile;

    // data = profile retrieved from firebase (identify user by token)
    try{
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            resumeJson = docSnap.data();
            promptString = formatGptInput(resumeJson);
            gptRawResponse = getGptResponse(promptString);
            gptExperiencesJson = JSON.parse(gptRawResponse);
            // Match new bullets based on company
            resumeJson.experience.forEach(e => {
                company = e.company_name;
                gptExperiencesJson.forEach(comp => {
                    if (company == comp) {
                        e.description_bullets = gptExperiences.comp;
                    }
                });
            });

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

function formatGptInput(resumeJson) {
    // Take json and put into
    let innerString = ''
    resumeJson.experience.forEach(e => {
        company = e.company_name;
        position = e.position_name;
        eBullets = e.description_bullets;
        eParagraph = e.description_paragraph;
        innerString += `Company: ${company}\nPosition: ${position}\n${eBullets}\n${eParagraph}\n`;
    });
    let promptString = `User's experience input:\n${innerString}\nOutput required: Analyze the user's experience, identifying and highlighting skills and achievements that match the requirements and preferences stated in the job description. Mention specific technologies but don’t explicitly say that the user demonstrated or reflects anything and don’t say reuse non technical words from the job description
    Generate about 4 resume bullet points for each experience, each section should begin with [placeholder] where placeholder is the company name
    Generate a resume-like output with one section: 
    Experience Section: A bulleted list summarizing the user's experience, emphasizing aspects most relevant to the job description.
    Note: Please provide specific examples or context where necessary to ensure accuracy in skill matching and resume customization. Do not output anything except the experience section`;
    return promptString;
}

async function getGptResponse(promptString) {
    const chatCompletion = await openai.chat.completions.create({
        messages: [
            {role: 'system', content: 'You are a helpful assistant'},
            {role: 'assistant', content: 'say the word yes'}
        ],
        model: 'gpt-4-1106-preview',
      });
    return chatCompletion.choices[0].message.content;
}

app.listen(3000, ()=>{
    console.log('Server started on port 3000');
})