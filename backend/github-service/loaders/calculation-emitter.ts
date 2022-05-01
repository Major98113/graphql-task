import { injectable } from 'inversify';
import 'reflect-metadata';
import { EmitterInterface } from '../types/emitter.types';

@injectable()
class CalculationEmitter implements EmitterInterface {
    private connectionsCount: number;
    public MAX_CONNECTIONS: number = 2;

    constructor() {
        this.connectionsCount = 0;
    }

    increaseConnection(){
        this.connectionsCount++;
    }

    reduceConnection(){
        if (this.connectionsCount > 0) {
            this.connectionsCount--;
        }
    }
    
    getConnections(){
        return this.connectionsCount;
    }
}


export { CalculationEmitter };