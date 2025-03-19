const Project = require("../model/project.model");
const asyncWrapper = require("../middleware/asyncwrapper");

// Create a new project with main image and extra images
const createProject = asyncWrapper(async (req, res) => {
    const { title, owner, soilType } = req.body;

    // Extract mainImage and extraImages from the request
    const mainImage = req.files?.mainImage ? req.files.mainImage[0].path : null; // Single file
    const extraImages = req.files?.extraImages ? req.files.extraImages.map(file => file.path) : []; // Multiple files

    if (!title || !owner || !soilType || !mainImage) {
        return res.status(400).json({ error: "Title, owner, soilType, and mainImage are required" });
    }

    const newProject = new Project({
        title,
        owner,
        soilType,
        mainImage,
        extraImages
    });

    await newProject.save();
    res.status(201).json(newProject);
});

// Update a project by ID
const updateProject = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const { title, owner, soilType } = req.body;

    // Extract mainImage and extraImages from the request
    const mainImage = req.files?.mainImage ? req.files.mainImage[0].path : null; // Single file
    const extraImages = req.files?.extraImages ? req.files.extraImages.map(file => file.path) : []; // Multiple files

    const updateData = {};
    if (title) updateData.title = title;
    if (owner) updateData.owner = owner;
    if (soilType) updateData.soilType = soilType;
    if (mainImage) updateData.mainImage = mainImage;

    const updatedProject = await Project.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProject) {
        return res.status(404).json({ error: "Project not found" });
    }

    // Add new extra images
    if (extraImages.length > 0) {
        updatedProject.extraImages.push(...extraImages);
        await updatedProject.save();
    }

    res.status(200).json(updatedProject);
});

// Add a specific extra image to a project
const addExtraImage = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const newImage = req.file.path;

    const project = await Project.findById(id);

    if (!project) {
        return res.status(404).json({ error: "Project not found" });
    }

    project.extraImages.push(newImage);
    await project.save();

    res.status(200).json(project);
});


const updateExtraImage = asyncWrapper(async (req, res) => {
    const { id, imageIndex } = req.params;
    const updatedImage = req.file.path;

    const project = await Project.findById(id);

    if (!project) {
        return res.status(404).json({ error: "Project not found" });
    }

    if (!project.extraImages[imageIndex]) {
        return res.status(404).json({ error: "Image index out of bounds" });
    }

    project.extraImages[imageIndex] = updatedImage;
    await project.save();

    res.status(200).json(project);
});

// Delete a specific extra image from a project
// Delete a specific extra image from a project
const deleteExtraImage = asyncWrapper(async (req, res) => {
    const { id, imageIndex } = req.params;

    // Find the project by ID
    const project = await Project.findById(id);

    if (!project) {
        return res.status(404).json({ error: "Project not found" });
    }

    // Check if the image index is valid
    if (!project.extraImages[imageIndex]) {
        return res.status(404).json({ error: "Image index out of bounds" });
    }

    // Remove the image at the specified index
    project.extraImages.splice(imageIndex, 1);

    // Save the updated project
    await project.save();

    res.status(200).json(project);
});

// Delete a project by ID
const deleteProject = asyncWrapper(async (req, res) => {
    const { id } = req.params;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
        return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
});

module.exports = {
    createProject,
    getAllProjects: asyncWrapper(async (req, res) => {
        const projects = await Project.find();
        res.status(200).json(projects);
    }),
    getProjectById: asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.status(200).json(project);
    }),
    updateProject,
    addExtraImage,
    updateExtraImage,
    deleteExtraImage,
    deleteProject
};