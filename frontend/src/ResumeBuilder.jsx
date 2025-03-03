import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jsPDF} from 'jspdf'
import  temp from './restemp.png'
const ResumeBuilder = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState({
    // Personal information
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
    website: '',
    summary: '',
    
    // Education
    education: [{ school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '' }],
    
    // Experience
    experience: [{ company: '', title: '', location: '', startDate: '', endDate: '', current: false, description: '' }],
    
    // Skills
    skills: [''],
    
    // Projects
    projects: [{ title: '', description: '', technologies: '', link: '' }],
    
    // Certifications
    certifications: [{ name: '', issuer: '', date: '', link: '' }]
  });

  // Template options
  const templates = [
    { id: 'professional', name: 'Professional', description: 'Clean and professional template suitable for corporate roles' },
    { id: 'creative', name: 'Creative', description: 'Modern design with a creative touch for design and marketing roles' },
    { id: 'technical', name: 'Technical', description: 'Focused on technical skills, ideal for IT and engineering roles' },
    { id: 'academic', name: 'Academic', description: 'Format suitable for academic or research positions' }
  ];
  
  const [selectedTemplate, setSelectedTemplate] = useState('professional');

  // Handle input changes for personal information
  const handlePersonalInfoChange = (e) => {
    
    const { name, value } = e.target;
    setResumeData({ ...resumeData, [name]: value });
  };

  // Handle array field changes (education, experience, etc.)
  const handleArrayFieldChange = (category, index, field, value) => {
    const updatedArray = [...resumeData[category]];
    updatedArray[index] = { ...updatedArray[index], [field]: value };
    setResumeData({ ...resumeData, [category]: updatedArray });
  };

  // Add new item to an array field
  const addArrayItem = (category, defaultItem) => {
    setResumeData({
      ...resumeData,
      [category]: [...resumeData[category], defaultItem]
    });
  };

  // Remove item from an array field
  const removeArrayItem = (category, index) => {
    const updatedArray = resumeData[category].filter((_, i) => i !== index);
    setResumeData({ ...resumeData, [category]: updatedArray });
  };

  // Handle skill changes
  const handleSkillChange = (index, value) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills[index] = value;
    setResumeData({ ...resumeData, skills: updatedSkills });
  };

  const addSkill = () => {
    setResumeData({ ...resumeData, skills: [...resumeData.skills, ''] });
  };

  const removeSkill = (index) => {
    const updatedSkills = resumeData.skills.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, skills: updatedSkills });
  };

  const generateResume = async () => {
    setLoading(true);
    try {
      // Create a new jsPDF instance in portrait, A4 format
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Set up dimensions
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      
      // Helper function for text wrapping
      const addWrappedText = (text, x, y, maxWidth, lineHeight) => {
        if (!text) return y;
        
        const lines = doc.splitTextToSize(text, maxWidth);
        doc.text(lines, x, y);
        return y + (lines.length * lineHeight);
      };
      
      // Set initial cursor position
      let y = margin;
      
      // Header with name
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.text(resumeData.fullName || "Full Name", margin, y);
      y += 10;
      
      // Contact information
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      
      let contactText = '';
      if (resumeData.email) contactText += `Email: ${resumeData.email}   `;
      if (resumeData.phone) contactText += `Phone: ${resumeData.phone}   `;
      if (resumeData.location) contactText += `Location: ${resumeData.location}   `;
      if (resumeData.linkedIn) contactText += `LinkedIn: ${resumeData.linkedIn}   `;
      if (resumeData.website) contactText += `Website: ${resumeData.website}`;
      
      y = addWrappedText(contactText, margin, y, contentWidth, 5);
      
      // Add a dividing line
      y += 5;
      doc.setDrawColor(70, 70, 70);
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageWidth - margin, y);
      y += 7;
      
      // Professional Summary
      if (resumeData.summary) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("PROFESSIONAL SUMMARY", margin, y);
        y += 6;
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        y = addWrappedText(resumeData.summary, margin, y, contentWidth, 5);
        y += 10;
      }
      
      // Education Section
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("Education", margin, y);
      y += 6;
      
      doc.setFontSize(10);
      resumeData.education.forEach(edu => {
        doc.setFont("helvetica", "bold");
        doc.text(edu.school || "School Name", margin, y);
        y += 5;
        
        doc.setFont("helvetica", "normal");
        doc.text(`${edu.degree || "Degree"} in ${edu.fieldOfStudy || "Field"}`, margin, y);
        y += 5;
        
        const startYear = edu.startDate ? new Date(edu.startDate).getFullYear() : "Start";
        const endYear = edu.endDate ? new Date(edu.endDate).getFullYear() : "Present";
        doc.setTextColor(100, 100, 100);
        doc.text(`${startYear} - ${endYear}`, margin, y);
        doc.setTextColor(0, 0, 0);
        y += 8;
      });
      
      // Experience Section
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("Experience", margin, y);
      y += 6;
      
      doc.setFontSize(10);
      resumeData.experience.forEach(exp => {
        doc.setFont("helvetica", "bold");
        doc.text(`${exp.title || "Title"} at ${exp.company || "Company"}`, margin, y);
        y += 5;
        
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 100);
        doc.text(exp.location || "Location", margin, y);
        y += 5;
        
        const startYear = exp.startDate ? new Date(exp.startDate).getFullYear() : "Start";
        const endYear = exp.current ? "Present" : (exp.endDate ? new Date(exp.endDate).getFullYear() : "End");
        doc.text(`${startYear} - ${endYear}`, margin, y);
        y += 5;
        
        doc.setTextColor(0, 0, 0);
        y = addWrappedText(exp.description || "Description", margin, y, contentWidth, 5);
        y += 8;
      });
      
      // Skills Section
      if (resumeData.skills.length > 0) {
        // Add new page if we're running out of space
        if (y > 250) {
          doc.addPage();
          y = margin;
        }
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Skills", margin, y);
        y += 6;
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        
        const skillsText = resumeData.skills.filter(skill => skill).join(", ");
        y = addWrappedText(skillsText, margin, y, contentWidth, 5);
        y += 10;
      }
      
      // Projects Section
      if (resumeData.projects.length > 0 && resumeData.projects[0].title) {
        // Add new page if we're running out of space
        if (y > 220) {
          doc.addPage();
          y = margin;
        }
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Projects", margin, y);
        y += 6;
        
        doc.setFontSize(10);
        resumeData.projects.forEach(project => {
          doc.setFont("helvetica", "bold");
          doc.text(project.title || "Project Title", margin, y);
          y += 5;
          
          doc.setFont("helvetica", "normal");
          doc.text(`Technologies: ${project.technologies || "N/A"}`, margin, y);
          y += 5;
          
          if (project.link) {
            doc.setTextColor(0, 0, 255);
            doc.text("Project Link: " + project.link, margin, y);
            doc.setTextColor(0, 0, 0);
            y += 5;
          }
          
          y = addWrappedText(project.description || "Project description", margin, y, contentWidth, 5);
          y += 8;
        });
      }
      
      // Certifications Section
      if (resumeData.certifications.length > 0 && resumeData.certifications[0].name) {
        // Add new page if we're running out of space
        if (y > 220) {
          doc.addPage();
          y = margin;
        }
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Certifications", margin, y);
        y += 6;
        
        doc.setFontSize(10);
        resumeData.certifications.forEach(cert => {
          doc.setFont("helvetica", "bold");
          doc.text(cert.name || "Certification Name", margin, y);
          y += 5;
          
          doc.setFont("helvetica", "normal");
          doc.text(`Issued by ${cert.issuer || "Issuer"}`, margin, y);
          y += 5;
          
          if (cert.date) {
            const formattedDate = new Date(cert.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long' 
            });
            doc.text(formattedDate, margin, y);
            y += 5;
          }
          
          if (cert.link) {
            doc.setTextColor(0, 0, 255);
            doc.text("Credential Link: " + cert.link, margin, y);
            doc.setTextColor(0, 0, 0);
            y += 5;
          }
          
          y += 3;
        });
      }
      
      // Save the PDF
      doc.save(`${resumeData.fullName || "My"}_Resume.pdf`);
      
      // Navigate to homepage
      navigate('/home');
      
    } catch (error) {
      console.error("Error creating resume:", error);
      alert("An error occurred while creating your resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  // Navigation functions
  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  // Render different steps of the resume builder
  const renderStep = () => {
    switch (step) {
      case 1:
        return renderPersonalInfo();
      case 2:
        return renderEducation();
      case 3:
        return renderExperience();
      case 4:
        return renderSkills();
      case 5:
        return renderProjects();
      case 6:
        return renderCertifications();
      case 7:
        return renderTemplateSelection();
      case 8:
        return renderPreview();
      default:
        return renderPersonalInfo();
    }
  };

  // Step 1: Personal Information
  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
      <p className="text-gray-600">Let's start with the basics. Tell us about yourself.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={resumeData.fullName}
            onChange={handlePersonalInfoChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={resumeData.email}
            onChange={handlePersonalInfoChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="johndoe@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={resumeData.phone}
            onChange={handlePersonalInfoChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="(123) 456-7890"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={resumeData.location}
            onChange={handlePersonalInfoChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="City, State"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
          <input
            type="text"
            name="linkedIn"
            value={resumeData.linkedIn}
            onChange={handlePersonalInfoChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
          <input
            type="text"
            name="website"
            value={resumeData.website}
            onChange={handlePersonalInfoChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="johndoe.com"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
        <textarea
          name="summary"
          value={resumeData.summary}
          onChange={handlePersonalInfoChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="A brief summary of your professional background and career goals..."
        ></textarea>
      </div>
    </div>
  );

  // Step 2: Education
  const renderEducation = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Education</h2>
      <p className="text-gray-600">Add your educational background, starting with the most recent.</p>
      
      {resumeData.education.map((edu, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Education #{index + 1}</h3>
            {resumeData.education.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem('education', index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">School/University</label>
              <input
                type="text"
                value={edu.school}
                onChange={(e) => handleArrayFieldChange('education', index, 'school', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Harvard University"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleArrayFieldChange('education', index, 'degree', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Bachelor of Science"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
              <input
                type="text"
                value={edu.fieldOfStudy}
                onChange={(e) => handleArrayFieldChange('education', index, 'fieldOfStudy', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Computer Science"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Start Year</label>
    <input
      type="number"
      value={edu.startDate}
      onChange={(e) => handleArrayFieldChange('education', index, 'startDate', e.target.value)}
      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      min="1900"
      max={new Date().getFullYear()}
      step="1"
      placeholder="YYYY"
    />
  </div>
  
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">End Year</label>
    <input
      type="number"
      value={edu.endDate}
      onChange={(e) => handleArrayFieldChange('education', index, 'endDate', e.target.value)}
      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      min="1900"
      max={new Date().getFullYear()}
      step="1"
      placeholder="YYYY"
    />
  </div>
</div>

          </div>
        
        </div>
      ))}
      
      <button
        type="button"
        onClick={() => addArrayItem('education', { school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '' })}
        className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center justify-center"
      >
        <span>+ Add Another Education</span>
      </button>
    </div>
  );

  // Step 3: Experience
  const renderExperience = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Work Experience</h2>
      <p className="text-gray-600">Add your work history, starting with the most recent position. Skip if you are a fresher.</p>
      
      {resumeData.experience.map((exp, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Experience #{index + 1}</h3>
            {resumeData.experience.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem('experience', index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleArrayFieldChange('experience', index, 'company', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Google"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input
                type="text"
                value={exp.title}
                onChange={(e) => handleArrayFieldChange('experience', index, 'title', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Senior Software Engineer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) => handleArrayFieldChange('experience', index, 'location', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Mountain View, CA"
              />
            </div>
            
            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                id={`current-job-${index}`}
                checked={exp.current}
                onChange={(e) => handleArrayFieldChange('experience', index, 'current', e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={`current-job-${index}`} className="ml-2 block text-sm text-gray-700">
                I currently work here
              </label>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="month"
                value={exp.startDate}
                onChange={(e) => handleArrayFieldChange('experience', index, 'startDate', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="month"
                value={exp.endDate}
                onChange={(e) => handleArrayFieldChange('experience', index, 'endDate', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                disabled={exp.current}
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={exp.description}
              onChange={(e) => handleArrayFieldChange('experience', index, 'description', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Describe your responsibilities, achievements, and the technologies or skills you used..."
            ></textarea>
          </div>
        </div>
      ))}
      
      <button
        type="button"
        onClick={() => addArrayItem('experience', { company: '', title: '', location: '', startDate: '', endDate: '', current: false, description: '' })}
        className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center justify-center"
      >
        <span>+ Add Another Experience</span>
      </button>
    </div>
  );

  // Step 4: Skills
  const renderSkills = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
      <p className="text-gray-600">Add your technical and professional skills.</p>
      
      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
        {resumeData.skills.map((skill, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., JavaScript, Project Management, SEO"
            />
            
            {resumeData.skills.length > 1 && (
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        
        <button
          type="button"
          onClick={addSkill}
          className="mt-2 w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center justify-center"
        >
          <span>+ Add Another Skill</span>
        </button>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
        <h3 className="text-blue-800 font-medium mb-2">Skill Tips:</h3>
        <ul className="list-disc pl-5 text-blue-800 text-sm">
          <li>Include a mix of technical (hard) skills and soft skills</li>
          <li>Review the job posting and include relevant keywords</li>
          <li>Be specific about technologies and tools you know</li>
          <li>Consider adding proficiency levels for language skills</li>
        </ul>
      </div>
    </div>
  );

  // Step 5: Projects
  const renderProjects = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
      <p className="text-gray-600">Add relevant projects that showcase your skills and experience.</p>
      
      {resumeData.projects.map((project, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Project #{index + 1}</h3>
            {resumeData.projects.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem('projects', index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => handleArrayFieldChange('projects', index, 'title', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="E-commerce Website"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Technologies Used</label>
              <input
                type="text"
                value={project.technologies}
                onChange={(e) => handleArrayFieldChange('projects', index, 'technologies', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="React, Node.js, MongoDB"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Link (Optional)</label>
            <input
              type="text"
              value={project.link}
              onChange={(e) => handleArrayFieldChange('projects', index, 'link', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="https://github.com/yourusername/project"
            />
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={project.description}
              onChange={(e) => handleArrayFieldChange('projects', index, 'description', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Describe the project, your role, and any notable achievements or challenges..."
            ></textarea>
          </div>
        </div>
      ))}
      
      <button
        type="button"
        onClick={() => addArrayItem('projects', { title: '', description: '', technologies: '', link: '' })}
        className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center justify-center"
      >
        <span>+ Add Another Project</span>
      </button>
    </div>
  );

  // Step 6: Certifications
  const renderCertifications = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Certifications</h2>
      <p className="text-gray-600">Add any relevant certifications or licenses you've earned.</p>
      
      {resumeData.certifications.map((cert, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Certification #{index + 1}</h3>
            {resumeData.certifications.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem('certifications', index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name</label>
              <input
                type="text"
                value={cert.name}
                onChange={(e) => handleArrayFieldChange('certifications', index, 'name', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="AWS Solutions Architect"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization</label>
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) => handleArrayFieldChange('certifications', index, 'issuer', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Amazon Web Services"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Issued</label>
              <input
                type="month"
                value={cert.date}
                onChange={(e) => handleArrayFieldChange('certifications', index, 'date', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Credential URL (Optional)</label>
              <input
                type="text"
                value={cert.link}
                onChange={(e) => handleArrayFieldChange('certifications', index, 'link', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="https://www.credential.net/abc123"
              />
            </div>
          </div>
        </div>
      ))}
      
      <button
        type="button"
        onClick={() => addArrayItem('certifications', { name: '', issuer: '', date: '', link: '' })}
        className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center justify-center"
      >
        <span>+ Add Another Certification</span>
      </button>
    </div>
  );

  // Step 7: Template Selection
 // Step 7: Template Display (Single Professional Template)
const renderTemplateSelection = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-800">Resume Template</h2>
    <p className="text-gray-600">Your resume will be formatted using this professional template.</p>
    
    <div className="p-4 border border-blue-500 bg-blue-50 ring-2 ring-blue-500 rounded-lg">
  <div className="max-w-xs mx-auto mb-3 bg-gray-100 rounded">
    <img
      src={temp}
      alt="Professional Resume Template"
      className="object-contain h-48 w-full rounded shadow-sm"
    />
  </div>
  <h3 className="font-medium text-gray-800">Professional Template</h3>
  <p className="text-sm text-gray-600">A clean, elegant, and modern template suitable for all industries.</p>
</div>
  </div>
);

  // Step 8: Preview
  const renderPreview = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Preview Your Resume</h2>
      <p className="text-gray-600">Review your resume before finalizing.</p>
      <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-lg max-w-4xl mx-auto">
  {/* Header with name highlighted */}
  <div className="mb-6 border-b-2 border-gray-700 pb-3">
    <h2 className="text-2xl font-bold text-gray-900">{resumeData.fullName}</h2>
    <div className="flex flex-wrap gap-3 text-sm text-gray-600 mt-1">
      {resumeData.email && <span className="flex items-center"><span className="mr-1">📧</span> {resumeData.email}</span>}
      {resumeData.phone && <span className="flex items-center"><span className="mr-1">📱</span> {resumeData.phone}</span>}
      {resumeData.location && <span className="flex items-center"><span className="mr-1">📍</span> {resumeData.location}</span>}
      {resumeData.linkedIn && <span className="flex items-center"><span className="mr-1">🔗</span> {resumeData.linkedIn}</span>}
      {resumeData.website && <span className="flex items-center"><span className="mr-1">🌐</span> {resumeData.website}</span>}
    </div>
  </div>
  
  {resumeData.summary && (
    <div className="mb-5">
      <h3 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-200 pb-1">PROFESSIONAL SUMMARY</h3>
      <p className="text-gray-700 text-sm">{resumeData.summary}</p>
    </div>
  )}
  
        {/* Education Section */}
        <div className="mb-6 border-b border-gray-300 pb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Education</h3>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <p className="font-medium">{edu.school}</p>
              <p>{edu.degree} in {edu.fieldOfStudy}</p>
              <p className="text-sm text-gray-600">
                {edu.startDate && new Date(edu.startDate).getFullYear()} - 
                {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}
              </p>
            </div>
          ))}
        </div>
  
        {/* Experience Section */}
        <div className="mb-6 border-b border-gray-300 pb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Experience</h3>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-3">
              <p className="font-medium">{exp.title} at {exp.company}</p>
              <p className="text-sm text-gray-600">{exp.location}</p>
              <p className="text-sm text-gray-600">
                {exp.startDate && new Date(exp.startDate).getFullYear()} - 
                {exp.current ? 'Present' : (exp.endDate && new Date(exp.endDate).getFullYear())}
              </p>
              <p className="text-sm mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
  
        {/* Skills Section */}
        {resumeData.skills.length > 0 && (
          <div className="mb-6 border-b border-gray-300 pb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                skill && <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{skill}</span>
              ))}
            </div>
          </div>
        )}
  
        {/* Projects Section */}
        {resumeData.projects.length > 0 && resumeData.projects[0].title && (
          <div className="mb-6 border-b border-gray-300 pb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Projects</h3>
            {resumeData.projects.map((project, index) => (
              <div key={index} className="mb-3">
                <p className="font-medium">{project.title}</p>
                <p className="text-sm text-gray-600">Technologies: {project.technologies}</p>
                {project.link && (
                  <p className="text-sm text-blue-600 underline">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">Project Link</a>
                  </p>
                )}
                <p className="text-sm mt-1">{project.description}</p>
              </div>
            ))}
          </div>
        )}
  
        {/* Certifications Section */}
        {resumeData.certifications.length > 0 && resumeData.certifications[0].name && (
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Certifications</h3>
            {resumeData.certifications.map((cert, index) => (
              <div key={index} className="mb-3">
                <p className="font-medium">{cert.name}</p>
                <p className="text-sm text-gray-600">Issued by {cert.issuer}</p>
                <p className="text-sm text-gray-600">
                  {cert.date && new Date(cert.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                </p>
                {cert.link && (
                  <p className="text-sm text-blue-600 underline">
                    <a href={cert.link} target="_blank" rel="noopener noreferrer">Credential Link</a>
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
  
      {/* Template Section */}
      <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
        <h3 className="text-blue-800 font-medium mb-2">Professional Template</h3>
        <p className="text-blue-800 text-sm">
          This is a simplified preview. The final resume will be formatted according to the professional design.
        </p>
      </div>
    </div>
  );
  

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-4xl mx-auto pt-8 px-4">
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-blue-600">Resume Builder</h1>
            <div className="text-gray-500">Step {step} of 8</div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${(step / 8) * 100}%` }}
            ></div>
          </div>
          
          {/* Step content */}
          {renderStep()}
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="py-2 px-6 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            {step < 8 ? (
              <button
                type="button"
                onClick={nextStep}
                className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={generateResume}
                disabled={loading}
                className={`py-2 px-6 rounded-md ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {loading ? 'Generating...' : 'Generate Resume'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;