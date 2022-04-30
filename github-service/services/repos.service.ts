import { injectable } from 'inversify';
import 'reflect-metadata';

//import { Animal } from '../types/animals.types';
import { serviceLogger as log } from '../utils/logger.helpers';

@injectable()
class ReposService {
    @log
    public async getAllRepos( ): Promise<any[]> {
        return [];
    }
    
    @log
    public async getRepoById( repoId: string ): Promise<any> {
        return '';
    }
}

export { ReposService };