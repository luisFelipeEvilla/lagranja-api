export class ResourceAlreadyExistsError extends Error {
    constructor (message) { 
        super(message);
    }
};

export class ResourceNotFoundError extends Error {
    constructor (message) {
        super(message);
    }
}