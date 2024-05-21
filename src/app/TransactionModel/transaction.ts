export class Transaction {
    transactionID: number = 0;
    amount: number = 0;
    time: Date | null = null; 
    source_acc: number = 0;
    dest_acc: number = 0;
    transactionType?: string;
}
