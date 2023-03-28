import { Router } from "express";
import * as controller from "./controller/index.js";

const router = Router();

router.get("/", controller.retrieveAll);
router.post("/", controller.create);
router.get("/:id", controller.retrieve);
router.patch("/:id", controller.update);
router.delete("/:id", controller.destroy);
router.post("/create-many", controller.createMany);
router.post("/update-many", controller.updateMany);
router.post("/delete-many", controller.destroyMany);

export default router;
