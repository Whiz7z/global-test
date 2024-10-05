//TopUpRequests.ts

import Entity from "./Entity";

export type TopUpEntity = {
    amount: number,
    accountId: number,
    userId: number
}

class TopUpRequests extends Entity<TopUpEntity> {}


export default TopUpRequests;