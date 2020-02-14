const express = require("express");

const projectData = require("../data/helpers/projectModel.js");

const router = express.Router();


router.get("/", (req, res) => {
  projectData
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "No project  information could not be found"
      });
    });
});


router.get("/:id", (req, res) => {
  const id = req.params.id;

  projectData
    .get(id)
    .then(specific => {
      if (id) {
        res.status(200).json(specific);
      } else {
        res.status(404).json({
          error: "No  ID  found "
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The project could not be found"
      });
    });
});


router.get("/:id/actions", (req, res) => {
  const project_id = req.params.id;

  projectData
    .getProjectActions(project_id)
    .then(actions => {
      if (project_id) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({
          message: "The project with that  ID does not exist"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The information could not be found"
      });
    });
});

router.post("/", (req, res) => {
  const newProject = req.body;

  projectData
    .insert(newProject)
    .then(project => {
      if (newProject.name || newProject.description) {
        res.status(201).json(project);
      } else {
        res.status(400).json({
          errorMessage: "Please provide name and description to create a new project"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "There was an error while saving the project"
      });
    });
});


router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  projectData
    .update(id, body)
    .then(updated => {
      if (!id) {
        res.status(404).json({
          message: "The project with the  ID does not exist"
        });
      } else if (!updated.name || !updated.description) {
        res.status(400).json({
          message: "Please provide name and description for updated project"
        });
      } else {
        res.status(200).json({ updated });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The project information could not be updated"
      });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  projectData
    .remove(id)
    .then(deleted => {
      if (!id) {
        res.status(404).json({
          message: "The project with that ID does not exist"
        });
      } else {
        res.status(200).json({ deleted });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The project could not be removed"
      });
    });
});

module.exports = router;