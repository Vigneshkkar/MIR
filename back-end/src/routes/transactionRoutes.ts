import { Router } from "express";
import { TransactionService } from "../services/transaction.service";

const TransactionRouter = Router();

TransactionRouter.get('/',  async(req, res) => {
    // Convert query string parameters to Date objects
    const startDate = new Date(req.query.startDate as string);
    const endDate = new Date(req.query.endDate as string);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(400).json({ error: 'Invalid date format. Please provide valid ISO date strings.' });
    }
    if( startDate > endDate ){
        return res.status(400).json({
            message:'Date Range Not possible'
        })
    }
    return res.send(await TransactionService.get(startDate, endDate));
});
TransactionRouter.post('/',  async(req, res) => {
    console.log(req.body);
    if(! req?.body) return res.status(400).json({
        message:' Invalid payload'
    })
    await TransactionService.create(req?.body).then(result => res.send(result) ).catch(err => res.status(500).send(err));
    return res;
});
TransactionRouter.put('/', async(req, res) => {
    await TransactionService.update(req.body).then(result => res.send(result) ).catch(err => res.status(500).send(err));
    return res;
})
export default TransactionRouter;