import { useState } from 'react'
import uid from '../../cookieHandler';

function EditProfile() {
    const [contactInfo, setContactInfo] = useState({
      name: '',
      phone: '',
      email: '',
      linkedin: '',
      github: '',
    });
    const educationForm = {
      school_name: '',
      major: '',
      school_location: '',
      graduation_date: '',
      GPA: '',
      relevant_courses: '',
    }
    const experienceForm = {
      company_name: '',
      position_name: '',
      start_date: '',
      end_date: '',
      company_location: '',
      description_paragraph: '',
    }
    const skillsForm = {
      "languages": '',
      "frameworks": '',
      "tools": '',
      "libraries": ''
    }
    
    const [educationInfo, setEducationInfo] = useState([educationForm]);

    const [experienceInfo, setExperienceInfo] = useState([experienceForm]); 

    const [skillsInfo, setSkillsInfo] = useState([skillsForm]);
    
    const addEducation = () => {
      setEducationInfo([...educationInfo, educationForm]);
    };
    
    const removeEducation = (i) => {
      const values = [...educationInfo];
      values.splice(i, 1);
      setEducationInfo(values);
    };

    const addExperience = () => {
      setExperienceInfo([...experienceInfo, experienceForm]);
    };

    const removeExperience = (i) => {
      const values = [...experienceInfo];
      values.splice(i, 1);
      setExperienceInfo(values);
    };

    const addSkills = () => {
      setSkillsInfo([...skillsInfo, skillsForm]);
    };
      
    const handleContactChange = (e) => {
      const { name, value } = e.target;
      setContactInfo({
        ...contactInfo,
        [name]: value,
      });
    };

    //handle education change
    const handleEducationChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...educationInfo];
      list[index][name] = value;
      setEducationInfo(list);
    }

    //handle experience change
    const handleExperienceChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...experienceInfo];
      list[index][name] = value;
      setExperienceInfo(list);
    }

    //handle submit form data
    const handleSubmit = () => {  
      const data = {
        contactInfo,
        educationInfo,
        experienceInfo,
        uid: uid
      }
      console.log(data);
    };


  
  return (
    <div>
      <h1>Edit Profile</h1>
      <section>
      <h2>Personal Information</h2>
      <form>
        <div>
          {contactInfo.name && (
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={contactInfo.name}
                onChange={handleContactChange}
                required
              />
            </div>
          )}
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={contactInfo.phone}
            onChange={handleContactChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={contactInfo.email}
            onChange={handleContactChange}
            required
          />
        </div>
        <div>
          <label>LinkedIn:</label>
          <input
            type="text"
            name="linkedin"
            value={contactInfo.linkedin}
            onChange={handleContactChange}
          />
        </div>
        <div>
          <label>GitHub:</label>
          <input
            type="text"
            name="github"
            value={contactInfo.github}
            onChange={handleContactChange}
          />
        </div>
      </form>
      </section>

  <section>
  <h2>Education</h2>
  {educationInfo.map((education, index) => (
    <form key={index}>
      <div>
        <label>School Name:</label>
        <input
          type="text"
          name="school_name"
          value={education.school_name}
          onChange={(e) => handleEducationChange(e, index)}
        />
      </div>
      <div>
        <label>Major:</label>
        <input
          type="text"
          name="major"
          value={education.major}
          onChange={(e) => handleEducationChange(e, index)}
        />
      </div>
      <div>
        <label>School Location:</label>
        <input
          type="text"
          name="school_location"
          value={education.school_location}
          onChange={(e) => handleEducationChange(e, index)}
        />
      </div>
      <div>
        <label>Graduation Date:</label>
        <input
          type="text"
          name="graduation_date"
          value={education.graduation_date}
          onChange={(e) => handleEducationChange(e, index)}
        />
      </div>
      <div>
        <label>GPA:</label>
        <input
          type="text"
          name="GPA"
          value={education.GPA}
          onChange={(e) => handleEducationChange(e, index)}
        />
      </div>
      <div>
        <label>Relevant Courses:</label>
        <input
          type="text"
          name="relevant_courses"
          value={education.relevant_courses}
          onChange={(e) => handleEducationChange(e, index)}
        />
      </div>
    </form>
  ))}
  <button onClick={addEducation}>Add Education</button>
  <button onClick={removeEducation}>Remove Education</button>
</section>

  <section>
  <h2>Experience</h2>
  {experienceInfo.map((experience, index) => (
    <form key={index}>
      <div>
        <label>Company Name:</label>
        <input
          type="text"
          name="company_name"
          value={experience.company_name}
        />
      </div>
      <div>
        <label>Position Name:</label>
        <input
          type="text"
          name="position_name"
          value={experience.position_name}
          
        />
      </div>
      <div>
        <label>Start Date:</label>
        <input
          type="text"
          name="start_date"
          value={experience.start_date}
          
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="text"
          name="end_date"
          value={experience.end_date}
          
        />
      </div>
      <div>
        <label>Company Location:</label>
        <input
          type="text"
          name="company_location"
          value={experience.company_location}
          
        />
      </div>
      <div>
        <label>Description Paragraph:</label>
        <input
          type="text"
          name="description_paragraph"
          value={experience.description_paragraph}
          
        />
      </div>

    </form>
  ))}
  <button onClick={addExperience}>Add Experience</button>
  <button onClick={removeExperience}>Remove Experience</button>
</section>

<section>
<h2>Skills</h2>
  <form>
        <div>
          <label>Languages:</label>
          <input
            type="text"
            name="languages"
            value={skillsInfo.languages}
          />
        </div>
        <div>
          <label>Frameworks:</label>
          <input
            type="text"
            name="frameworks"
            value={skillsInfo.frameworks}
          />
        </div>
        <div>
          <label>Tools:</label>
          <input
            type="text"
            name="tools"
            value={skillsInfo.tools}
          />
        </div>
        <div>
          <label>Libraries:</label>
          <input
            type="text"
            name="libraries"
            value={skillsInfo.libraries}
          />
        </div>
  </form>
</section>

    <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default EditProfile