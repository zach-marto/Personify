import exp from 'constants';
import fs from 'fs';
import replace from 'replace-in-file'

function readJsonFile(file_path) {
    try {
      const jsonData = fs.readFileSync(file_path, 'utf8');
      return JSON.parse(jsonData);
    } catch (error) {
      console.error(`Error reading JSON file: ${error.message}`);
      return null;
    }
}

async function copyFile(source_path, destination_path) {
    try {
      const source_stream = fs.createReadStream(source_path);
      const destination_stream = fs.createWriteStream(destination_path);
  
      await new Promise((resolve, reject) => {
        source_stream.on('error', reject);
        destination_stream.on('error', reject);
        destination_stream.on('finish', resolve);
        source_stream.pipe(destination_stream);
      });
  
      console.log(`File copied from ${source_path} to ${destination_path}`);
    } catch (error) {
      console.error(`Error copying file: ${error.message}`);
    }
}

function findAndReplace(file_path, replacements) {
    const options = {
        files: file_path,
        from: replacements.map(pair => pair.from),
        to: replacements.map(pair => pair.to),
        optionsForFiles: {
            encoding: 'utf8',
        },
    };

    try {
        const changes = replace.sync(options);
        console.log('Replacement results:', changes);
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

function getReplacement(from_string, to_string) {
    const fromRegex = new RegExp(`{{Personify - ${from_string}}}`, 'g');
    return { from: fromRegex, to: to_string };
}

function getName(resume_object) {
    if (!objHasProps(resume_object, ["contact", "name"])) { return ""; }
    return String.raw`\textbf{\Huge \scshape ${resume_object.contact.name}} \\ \vspace{1pt}`;
}

function getPhone(resume_object) {
    if (!objHasProps(resume_object, ["contact", "phone"])) { return ""; }
    return String.raw`\small ${resume_object.contact.phone} $|$`;
}

function getEmail(resume_object) {
    if (!objHasProps(resume_object, ["contact", "email"])) { return ""; }
    return String.raw`\href{mailto:${resume_object.contact.email}}{\underline{${resume_object.contact.email}}} $|$`;
}

function getLinkedIn(resume_object) {
    if (!objHasProps(resume_object, ["contact", "linkedin"])) { return ""; }
    return String.raw`\href{${resume_object.contact.linkedin}}{${resume_object.contact.linkedin}} $|$`;
}

function getGithub(resume_object) {
    if (!objHasProps(resume_object, ["contact", "github"])) { return ""; }
    return String.raw`\href{${resume_object.contact.github}}{\underline{${resume_object.contact.github}}}`;
}

function getBigStringFromArr(arr) {
    let str = ""
    arr.forEach(element => {
        str += element;
        str += ", "
    });
    //Remove trailing comma and space
    str = str.substring(0, str.length - 2);
    return str;
}

function getLanguages(resume_object) {
    if (!objHasProps(resume_object, ["skills", "languages"])) { return ""; }
    const languages = getBigStringFromArr(resume_object.skills.languages)
    return String.raw`\textbf{Languages}{: ${languages}} \\`;
}

function getFrameworks(resume_object) {
    if (!objHasProps(resume_object, ["skills", "frameworks"])) { return ""; }
    const frameworks = getBigStringFromArr(resume_object.skills.frameworks)
    return String.raw`\textbf{Frameworks}{: ${frameworks}} \\`;
}

function getTools(resume_object) {
    if (!objHasProps(resume_object, ["skills", "tools"])) { return ""; }
    const tools = getBigStringFromArr(resume_object.skills.tools)
    return String.raw`\textbf{Developer Tools}{: ${tools}} \\`;
}

function getLibraries(resume_object) {
    if (!objHasProps(resume_object, ["skills", "libraries"])) { return ""; }
    const libraries = getBigStringFromArr(resume_object.skills.libraries)
    return String.raw`\textbf{Libraries}{: ${libraries}}`;
}

function getEducation(resume_object) {
    if (!objHasProps(resume_object, ["education"])) { return ""; }
    if (resume_object.education.length == 0) { return ""; }
    const education = resume_object.education;
    let education_section = String.raw`\section{Education}
    \resumeSubHeadingListStart
    `;
    // console.log(education);
    education.forEach(ed => {
        education_section += String.raw`    \resumeSubheading
        {${ed.school_name}}{${ed.school_location}}
        {${ed.major}}{Expected Graduation ${ed.graduation_date}}
        `;
    });
    education_section += String.raw`\resumeSubHeadingListEnd`;
    return education_section;
}

function getExperience(resume_object) {
    if (!objHasProps(resume_object, ["experience"])) { return ""; }
    if (resume_object.experience.length == 0) { return ""; }
    const experience = resume_object.experience;
    let experience_section = String.raw`\section{Experience}
    \resumeSubHeadingListStart
    `;
    experience.forEach(exp => {
        experience_section += String.raw`    \resumeSubheading
        {${exp.position_name}}{${exp.start_date} -- ${exp.end_date}}
        {${exp.company_name}}{${exp.company_location}}
            \resumeItemListStart
            `;
        exp.description_bullets.forEach(bullet => {
            experience_section += String.raw`\resumeItem{${bullet}}
            `;
        });
        experience_section += String.raw`\resumeItemListEnd
        `;
    });
    experience_section += String.raw`\resumeSubHeadingListEnd
    `;
    return experience_section;
}

function getProjects(resume_object) {
    if (!objHasProps(resume_object, ["projects"])) { return ""; }
    if (resume_object.projects.length == 0) { return ""; }
    const projects = resume_object.projects;
    let projects_section = String.raw`\section{Projects}
    \resumeSubHeadingListStart
    `;
    projects.forEach(proj => {
        const tools_used = getBigStringFromArr(proj.languages_and_frameworks);
        projects_section += String.raw`    \resumeProjectHeading
            {\textbf{${proj.name}} $|$ \emph{${tools_used}}}{${proj.start_date} -- ${proj.end_date}}
            \resumeItemListStart
            `;
        proj.description_bullets.forEach(bullet => {
            projects_section += String.raw`\resumeItem{${bullet}}
            `;
        });
        projects_section += String.raw`\resumeItemListEnd
        `;
    });
    projects_section += String.raw`\resumeSubHeadingListEnd
    `;
    return projects_section;
}

function objHasProps(resume_object, property_list) {
    let obj = resume_object;
    for (let i = 0; i < property_list.length; ++i) {
        const prop = property_list[i];
        if (!obj.hasOwnProperty(prop)) {
            return false;
        }
        obj = obj[prop];
    }
    // console.log(JSON.stringify({}));
    // console.log(JSON.stringify(obj));
    return JSON.stringify({}) != JSON.stringify(obj);
}

// function getReplacementString(resume_object, property_list, replacement_string) {
//     let obj = resume_object;
//     for (let i = 0; i < property_list.length; ++i) {
//         const prop = property_list[i];
//         if (!obj.hasOwnProperty(prop)) {
//             return "";
//         }
//         obj = obj.prop;
//     }
//     return replacement_string;
// }

function createReplacements(resume_object) {
    const replacements = [];
    replacements.push(getReplacement("name", getName(resume_object)));
    replacements.push(getReplacement("phone", getPhone(resume_object)));
    replacements.push(getReplacement("email", getEmail(resume_object)));
    replacements.push(getReplacement("linkedin", getLinkedIn(resume_object)));
    replacements.push(getReplacement("github", getGithub(resume_object)));
    replacements.push(getReplacement("languages", getLanguages(resume_object)));
    replacements.push(getReplacement("frameworks", getFrameworks(resume_object)));
    replacements.push(getReplacement("tools", getTools(resume_object)));
    replacements.push(getReplacement("libraries", getLibraries(resume_object)));
    replacements.push(getReplacement("education", getEducation(resume_object)));
    replacements.push(getReplacement("experience", getExperience(resume_object)));
    replacements.push(getReplacement("projects", getProjects(resume_object)));
    return replacements
}

async function main () {
    const template_name = "template1";
    const resume_object = readJsonFile("resume.json");

    //Create unfilled file which we will fill
    await copyFile(`templates/${template_name}.tex`, `./${template_name}_filled.tex`);

    //Parse our resume information into regex objects which we will use to fill resume
    const replacements = createReplacements(resume_object);

    //Fill file with our information
    findAndReplace(`./${template_name}_filled.tex`, replacements);
}

main();
