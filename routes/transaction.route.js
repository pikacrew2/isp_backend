const router = require('express').Router();
const {requestBySuper, transactionController,test, reset, transByUser,trans,transAndApprove, lifetimePaid, single_month_paid, transApproved, transCancelled } = require('../controllers/transaction.controller.js');


router.post("/request", transactionController);
router.post("/approve", transApproved);
router.post("/reject", transCancelled);
router.get("/lifetime",lifetimePaid );
router.get("/month", single_month_paid);
router.get("/trans-by-user/:id", transByUser);
router.get("/trans", trans )
router.post('/trans-and-approve/:transId', transAndApprove)
router.post("/reset", reset)
router.post('/test1',test)
router.post('/request-super' , requestBySuper)


module.exports = router
