export class Account {

    constructor(
        public accountID: number,
        public balance: number,
        public hasCheque: boolean,
        public wd_quota: number,
        public dp_quota: number,
        public isActive: boolean,
        public customerID: number,
        public type_id: Number,
        public branchID: string,
    ) { }

    toString(): string{
        let str= `AccId:${this.accountID}, Balance:${this.balance}, Cheque:${this.hasCheque}, 
        withdraw_limit:${this.wd_quota}, deposit_limit:${this.dp_quota}, CustId:${this.customerID}, 
        AccType:${this.type_id}, BranchIFSC:${this.branchID}`;
        return str;
    }
}