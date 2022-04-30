export interface EmitterInterface {
    increaseConnection: () => void,
    reduceConnection: () => void,
    getConnections: () => number,
    MAX_CONNECTIONS: number,
}

export const Emitter = Symbol.for('Emitter');