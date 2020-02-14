const express = require("express");

const actionsData = require("../data/helpers/actionModel.js");

const router = express.Router();


router.get("/", (req, res) => {
  actionsData
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "No actions returned"
      });
    });
});


router.get("/:id", (req, res) => {
  const id = req.params.id;

  actionsData
    .get(id)
    .then(specific => {
      if (id) {
        res.status(200).json(specific);
      } else {
        res.status(404).json({
          error: "No  ID with that action"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "No data found"
      });
    });
});


router.delete("/:id", (req, res) => {
  const id = req.params.id;

  actionsData
    .remove(id)
    .then(deletedA => {
      if (!id) {
        res.status(404).json({
          message: "The action with that ID found"
        });
      } else {
        res.status(200).json({ deletedA });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: " could not be removed"
      });
    });
});


router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  actionsData
    .update(id, body)
    .then(updatedA => {
      if (!id) {
        res.status(404).json({
          message: "The action with that ID does not exist"
        });
      } else if (!updatedA.description || !updatedA.notes) {
        res.status(400).json({
          message: "Please provide a correct description and notes "
        });
      } else {
        res.status(200).json({ updatedA });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The information could not be updated"
      });
    });
});


router.post("/:id/actions", checkAction, (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const newAction = { ...body, project_id: id };

  actionsData
    .insert(newAction)
    .then(action => {
      res.status(200).json({ action });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: `There was an error while saving the action ${err.res}`
      });
    });
});

function checkAction(req, res, next) {
  if (!req.body) {
    res.status(400).json({
      message: "missing data"
    });
  } else if (!req.body.description || !req.body.notes) {
    res.status(400).json({
      message: "missing fields"
    });
  } else {
    next();
  }
}

module.exports = router;