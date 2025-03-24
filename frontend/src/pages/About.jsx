import React from 'react';
import { Link } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
import { 
  Award, 
  BookOpen, 
  Briefcase, 
  ChevronRight, 
  FileText, 
  Lightbulb, 
  Users 
} from 'lucide-react';

const About = () => {
  return (
<div className="min-h-screen bg-background">
  {/* Hero Section - Improved spacing, responsiveness and animations */}
  <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden">
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-foreground tracking-tight leading-tight">
          Your Path to Career Success
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
          We're dedicated to helping you prepare for interviews and create stunning resumes that showcase your skills and experience.
        </p>
      </div>
    </div>
    
    {/* Optimized background decorative elements */}
    <div className="absolute -top-24 -right-24 w-80 h-80 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl opacity-70"></div>
    <div className="absolute -bottom-32 -left-32 w-80 h-80 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl opacity-70"></div>
  </section>

  {/* Mission Section - Improved layout and card styling */}
  <section className="py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-secondary/20">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-6 leading-tight">
            Our Mission
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            We believe everyone deserves the opportunity to showcase their true potential. Our platform is built to empower job seekers with the tools and resources they need to stand out in today's competitive job market.
          </p>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Through intuitive resume building tools and comprehensive interview preparation resources, we help you present your best self to potential employers.
          </p>
          <div className="flex items-center mt-8">
            <Lightbulb className="w-10 h-10 text-primary mr-4 flex-shrink-0" />
            <p className="font-medium">Turning your potential into opportunities</p>
          </div>
        </div>
        <div className="order-1 md:order-2 bg-card p-6 md:p-8 rounded-xl shadow-md">
          <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <FileText className="w-20 h-20 md:w-24 md:h-24 text-primary/20" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold">Crafting Success Stories</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* Features Section - Improved card design and hover effects */}
  <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4 leading-tight">
          Why Choose Our Platform
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We combine powerful tools with expert guidance to help you succeed in your job search.
        </p>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Feature Cards - Improved consistent styling and hover effects */}
        <div className="bg-card p-6 md:p-8 rounded-xl shadow-sm border border-border hover:shadow-md transition-all duration-300 hover:translate-y-[-4px]">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-3">Professional Resume Templates</h3>
          <p className="text-muted-foreground leading-relaxed">
            Beautifully designed templates that help your resume stand out while maintaining professional standards.
          </p>
        </div>
        
        <div className="bg-card p-6 md:p-8 rounded-xl shadow-sm border border-border hover:shadow-md transition-all duration-300 hover:translate-y-[-4px]">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-3">Interview Preparation</h3>
          <p className="text-muted-foreground leading-relaxed">
            Comprehensive resources to help you prepare for interviews, including common questions and expert tips.
          </p>
        </div>
        
        <div className="bg-card p-6 md:p-8 rounded-xl shadow-sm border border-border hover:shadow-md transition-all duration-300 hover:translate-y-[-4px]">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
            <Briefcase className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-3">Job Search Strategies</h3>
          <p className="text-muted-foreground leading-relaxed">
            Learn effective strategies to navigate the job market and find opportunities that match your skills.
          </p>
        </div>
        
        <div className="bg-card p-6 md:p-8 rounded-xl shadow-sm border border-border hover:shadow-md transition-all duration-300 hover:translate-y-[-4px]">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-3">Career Coaching</h3>
          <p className="text-muted-foreground leading-relaxed">
            Get guidance from experienced professionals to help you navigate your career path.
          </p>
        </div>
        
        <div className="bg-card p-6 md:p-8 rounded-xl shadow-sm border border-border hover:shadow-md transition-all duration-300 hover:translate-y-[-4px]">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
            <Award className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-3">Skills Assessment</h3>
          <p className="text-muted-foreground leading-relaxed">
            Identify your strengths and areas for improvement to better position yourself in the job market.
          </p>
        </div>
        
        <div className="bg-card p-6 md:p-8 rounded-xl shadow-sm border border-border hover:shadow-md transition-all duration-300 hover:translate-y-[-4px]">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
            <Lightbulb className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-3">AI-Powered Recommendations</h3>
          <p className="text-muted-foreground leading-relaxed">
            Receive personalized suggestions to enhance your resume and improve your interview responses.
          </p>
        </div>
      </div>
    </div>
  </section>

  {/* Testimonials - Improved card design and consistency */}

  {/* CTA Section - Enhanced visual appeal and button styling */}
  <section className="py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-primary text-primary-foreground">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold font-display mb-6 leading-tight">
        Ready to Advance Your Career?
      </h2>
      <p className="text-primary-foreground/90 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
        Join thousands of job seekers who have successfully used our platform to land their dream jobs. Start building your professional resume and preparing for interviews today.
      </p>
    </div>
  </section>

  {/* Footer - Improved spacing and organization */}
  <footer className="py-12 px-4 md:px-8 lg:px-16 bg-muted/30">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col items-center justify-center text-center">
        <h3 className="text-xl font-bold mb-4">InterviewPrep & ResumeBuilder</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          Helping you prepare for interviews and build impressive resumes to advance your career.
        </p>
        <nav className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
          <Link to="/home" className="text-muted-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-primary font-medium">
            About
          </Link>
          <Link to="/resume-builder" className="text-muted-foreground hover:text-primary transition-colors">
            Build Resume
          </Link>
          <Link to="/upload" className="text-muted-foreground hover:text-primary transition-colors">
            Start Practice
          </Link>
        </nav>
        <div className="flex gap-4 mb-6">
          <a href="#" aria-label="Twitter" className="w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-primary/10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
          </a>
          <a href="#" aria-label="LinkedIn" className="w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-primary/10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="#" aria-label="GitHub" className="w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-primary/10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
        </div>
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} InterviewPrep & ResumeBuilder. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
</div>
  );
};

export default About;