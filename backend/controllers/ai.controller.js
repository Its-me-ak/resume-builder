import { Resume } from "../models/Resume.js";
import ai from "../utils/ai.js";

// controller for enhancing a resume proffesional summary
// POST: /api/ai/enhance-pro-summary
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;
    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
You are an expert ATS-optimized resume writer and career coach with 15+ years of experience.
            You specialize in transforming basic professional summaries into powerful, concise, and achievement-driven summaries.
            Your writing must:
            - Be optimized for Applicant Tracking Systems (ATS)
            - Use strong action verbs and industry-relevant keywords
            - Highlight measurable impact where possible
            - Sound natural, confident, and human-written
            - Avoid fluff, clichés, and generic statements
            - Be tailored for modern corporate, startup, and freelance roles
            - Keep the summary within 3–5 impactful sentences
            Return ONLY the enhanced professional summary. Do NOT add any explanations, headings, or formatting.

Summary:
${userContent}
      `,
    });

    const text = result.text.trim();

    res.status(200).json({
      message: "Enhanced professional summary",
      summary: text,
    });
  } catch (error) {
    console.error("enhanceProfessionalSummary:", error);
    res.status(500).json({ message: error.message });
  }
};

// controller for enhancing job description
// POST: /api/ai/enhance-job-description
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;
    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You are an expert ATS-optimized resume writer and career coach with 15+ years of experience.
            Your task is to transform raw work experience descriptions into powerful, achievement-driven, and ATS-friendly resume job descriptions.

            Your output must:
            - Be written strictly for a resume (NOT a job posting)
            - Use past or present tense correctly based on role
            - Be optimized for Applicant Tracking Systems (ATS)
            - Use strong action verbs (designed, developed, led, optimized, engineered, implemented, etc.)
            - Focus on achievements and impact, not just duties
            - Include measurable results where possible (performance, users, revenue, efficiency, etc.)
            - Be concise, professional, and recruiter-friendly
            - Use bullet points only
            - Avoid fluff, buzzwords, and generic phrases
            - Avoid emojis, tables, and decorative formatting
            - Keep it within 2-3 impactful bullet points

            Return ONLY the enhanced resume-ready bullet points. Do NOT add headings, explanations, or extra text.
            Summary: ${userContent}
            `,
    });
    const text = result.text.trim();

    res.status(200).json({
      message: "Enhanced job description",
      jobDescription: text,
    });
  } catch (error) {
    console.error("enhanceJobDescription:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// controller for uoloading a resume to the database
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText) {
      return res.status(400).json({ message: "Missing resume text" });
    }

    const trimmedText = resumeText.slice(0, 5000);

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
Extract structured resume data and return ONLY valid JSON.

Resume:
${trimmedText}
      `,
    });

    let parsed;
    try {
      parsed = JSON.parse(result.text);
    } catch {
      return res.status(400).json({
        message: "Invalid JSON returned by AI",
        raw: result.text,
      });
    }

    const resume = await Resume.create({ ...parsed, title, userId });

    res.status(200).json({
      resumeId: resume._id,
      message: "Resume uploaded successfully",
    });
  } catch (error) {
    console.error("uploadResume:", error);
    res.status(500).json({ message: error.message });
  }
};

