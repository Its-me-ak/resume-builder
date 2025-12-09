import { Resume } from "../models/Resume.js";

// controller for creating a new resume
// POST: /api/resumes/create
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    const newResume = await Resume.create({
      userId,
      title,
    });
    return res
      .status(201)
      .json({ message: "Resume created successfully", resume: newResume });
  } catch (error) {
    console.log("Error in createResume:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// controller for deleting a resume
// DELETE: /api/resumes/:id
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const {resumeId} = req.params;
    const resume = await Resume.findOneAndDelete({ _id: resumeId, userId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    return res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.log("Error in deleteResume:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


// get user resume by id
// GET: /api/resumes/:resumeId
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const {resumeId } = req.params;
    const resume = await Resume.findOne({ _id: resumeId, userId }).select("-__v -createdAt -updatedAt");
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ message: "Resume found", resume });
  } catch (error) {
    console.log("Error in getResumeById:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// get resume by id public
// GET: /api/resumes/public/:resumeId
export const getPublicResumeById = async (req, res) => {
  try {
    const {resumeId} = req.params;
    const resume = await Resume.findOne({public: true, _id: resumeId}).select("-__v -createdAt -updatedAt");
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ message: "Resume found", resume });
  } catch (error) {
    console.log("Error in getPublicResumeById:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


// controller for updating a resume
// PUT: /api/resumes/:resumeId
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const {resumeId, resumeData, removeBackground} = req.body
    const image = req.file;

    let resumeDataCopy = JSON.parse(resumeData);

    const resume = await Resume.findByIdAndUpdate({userId, _id: resumeId}, resumeDataCopy, {new: true})

    return res.status(200).json({ message: "Resume updated successfully", resume })
  } catch (error) {
    console.log("Error in updateResume:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};













// JSON.stringify() — When to Use It
// It converts a JavaScript object into a JSON string.
// 1 - use JSON.stringify() when sending data to backend API from frontend
// 2 - Saving Objects in localStorage

// JSON.parse() — When to Use It
// It converts a JSON string into a JavaScript object.
// 1 - use JSON.parse() when receiving data from backend API to frontend
// 2 - Loading Objects from localStorage