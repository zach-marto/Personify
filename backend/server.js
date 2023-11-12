import express from 'express';
import cors from 'cors';
import firebaseConfig from './firebaseConfig.js';
import { collection } from "firebase/firestore/lite";
import { getDocs } from "firebase/firestore/lite";
import { getDoc } from 'firebase/firestore/lite';
import { doc } from 'firebase/firestore/lite';
import { updateDoc } from 'firebase/firestore/lite';
import { addDoc } from 'firebase/firestore/lite';
import { setDoc } from 'firebase/firestore/lite';
import { deleteDoc } from 'firebase/firestore/lite';
import { ref, uploadBytes } from 'firebase/storage';
import OpenAI from 'openai';
import fill_template from './latex/fill_template.js';
import compile_resume from './latex/compile_resume.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({origin: '*'}));


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


app.post("/generate", async(req,res) => {
    const data = req.body;
    const uid = req.body.uid;
    // make request to firebase
    const docRef = doc(firebaseConfig.db, "users", uid) // docRef for userId as token
    let profile;

    // data = profile retrieved from firebase (identify user by token)
    try{
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            let resumeJson = docSnap.data();

            let promptString = formatGptInput(resumeJson);
            let gptRawResponse = await getGptResponse(promptString);
            // console.log(gptRawResponse.substring(0,8));
            // let gptTrimmed = gptRawResponse.replace(/'```json\n|\n```'|\\n/g, '');
            let gptTrimmed = gptRawResponse.replace(/\n/g, '');
            console.log(gptTrimmed);
            gptTrimmed = JSON.parse(gptTrimmed);
            console.log(gptTrimmed);
            // let gptExperiencesJson = {c: gptRawResponse};
            // console.log(gptExperiencesJson)
            
            // Match new bullets based on company
            resumeJson.experienceInfo.forEach(e => {
                let company = e.company_name;
                for (var comp in gptTrimmed) {
                    if (company == comp) {
                        e.description_bullets = gptTrimmed.comp;
                    }
                }
                // gptTrimmed.forEach(comp => {
                //     if (company == comp) {
                //         e.description_bullets = gptTrimmed.comp;
                //     }
                // });
            });
            console.log(resumeJson)

            resumeJson.experienceInfo.description_bullets = gptTrimmed;
            //==================
                // this is what we get from GPT response.

                // Experience Section:

                // [Google]
                // - Spearheaded the design and implementation of scalable software solutions, ensuring the robustness and reliability of systems in a high-volume transaction environment.
                // - Enhanced system efficiency by optimizing existing algorithms, resulting in a significant reduction in computational costs and improvement in runtime performance.
                // - Collaborated effectively within a cross-functional team to integrate cutting-edge technologies, contributing to the continuous evolution and innovation of software products.
                // - Instrumental in the deployment of machine learning models for predictive analytics, significantly increasing the accuracy of data-driven decision-making processes.

                // Now we need to extract [Google] company name
                // and each bulletpoints
                // strip 'Expreience Secion:', '[]', etc

                // then update resumeJson with matching company name
            //==================

            // projectsPromptString(formatGptInputProjects(resumeJson));
            // gptRawProjectsResp = getGptResponse(projectsPromptString);
            // gptRawProjectResp = gptRawProjectResp.substring(7, gptRawProjectResp.len - 3);

            console.log(resumeJson);

            // make API call to chatGPT with data as input

            // rawResume = response received from chatGPT

            // convert rawResume to pdf & txt

            await fill_template.fill_template_main(JSON.stringify(resumeJson), uid);
            await compile_resume.compile_resume_main(uid);

            let pdf_file_path = `./resumes/${uid}.pdf`;
            let tex_file_path = `./resumes/${uid}.tex`;

            // store pdf & tex to firebase storage

            const resumeRef = ref(firebaseConfig.storage, uid);
            uploadBytes(resumeRef, pdf_file_path).then((snapshot) => {
                console.log('Uploaded pdf file!');
            });
            uploadBytes(resumeRef, tex_file_path).then((snapshot) => {
                console.log('Uploaded tex file!');
            });


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
    resumeJson.experienceInfo.forEach(e => {
        let company = e.company_name;
        let position = e.position_name;
        let eBullets = e.description_bullets;
        let eParagraph = e.description_paragraph;
        innerString += `Company: ${company}\nPosition: ${position}\n${eBullets}\n${eParagraph}\n`;
    });
    let promptString = `User's experience input:\n${innerString}\nOutput Required:
    Analyze the user's experience, identifying and highlighting skills and achievements that match the requirements and preferences stated in the job description. Mention specific technologies but don’t explicitly say that the user demonstrated or reflects anything and don’t say reuse non technical words from the job description. Generate about 4 resume bullet points for each experience, each section should begin with [placeholder] where placeholder is the company name. Use fewer bullet points for less relevant experiences and more bullet points for more relevant experiences. Generate a resume-like output in json format with each company as a key and a bulleted list summarizing the user's experience, emphasizing aspects most relevant to the job description. Please provide specific examples or context where necessary to ensure accuracy in skill matching and resume customization. Do not output anything except the experience section. Give the raw string without json backticks or newlines 
    `;
    return promptString;
}

async function getGptResponse(promptString) {
    const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
    const chatCompletion = await openai.chat.completions.create({
        messages: [
            {role: 'system', content: 'You are a helpful assistant'},
            {role: 'assistant', content: promptString}
        ],
        model: 'gpt-4-1106-preview',
      });
    return chatCompletion.choices[0].message.content;
}

function formatGptInputProjects(resumeJson) {
    let innerString = '';
    resumeJson.experienceInfo.forEach(p => {
        let pname = p.name;
        let bullets = p.description_bullets;
        let paragraph = p.description_paragraph;
        innerString += `Project name: ${pname} Project description: ${bullets} ${paragraph}`;
    });
    let promptString = `User's project inputs: ${innerString} Output required: Analyze the user's projects, identifying and highlighting skills and achievements that match the requirements and preferences stated in the job description. Mention specific technologies but don’t explicitly say that the user demonstrated or reflects anything and don’t say reuse non technical words from the job description. Generate up to 3 resume bullet points for each project, each section should begin with [placeholder] where placeholder is the project name. Pick the two most relevant projects. Generate a resume-like output in json format with each project as a key and a bulleted list summarizing the user's experience, emphasizing aspects most relevant to the job description. Please provide specific examples or context where necessary to ensure accuracy in skill matching and resume customization. Do not output anything except the project section. `;
    return promptString;
}


app.listen(3001, ()=>{
    console.log('Server started on port 3001');
})