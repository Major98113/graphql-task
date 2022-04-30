import { injectable } from 'inversify';
import 'reflect-metadata';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';

import { serviceContainer } from '../config/inversify.config';
import { LoggerInterface, Logger } from '../types/logger.types';
import { serviceLogger as log } from '../utils/logger.helpers';
import { GetReposResponse, Repo } from '../types/repos.types';


@injectable()
class ReposService {
    private readonly ALL_REPOS_LIST_URL: string;
    private readonly logger: LoggerInterface;

    constructor() {
        const { ALL_REPOS_LIST_URL = 'https://api.github.com/users/Major98113/repos' } = process.env;
        if (!ALL_REPOS_LIST_URL) {
            throw new Error('ALL_REPOS_LIST_URL env param is not defined');
        }
        this.ALL_REPOS_LIST_URL = ALL_REPOS_LIST_URL;
        this.logger = serviceContainer.get<LoggerInterface>( Logger );
    }

    @log
    public async getAllRepos( ): Promise<Repo[]> {
        const { data, status } = await axios.get<GetReposResponse>(
            this.ALL_REPOS_LIST_URL,
            { headers: { Accept: 'application/json' }},
        );
        this.logger.logServiceRequest(`getAllRepos status: ${status}`);
        if (status !== StatusCodes.OK) {
            this.logger.logError(`
                getAllRepos: reuqest finished with next params:
                    status: ${status}
                    data: ${JSON.stringify(data)}
            `);
            return [];
        }
        return data.map(({ name, size ,owner }) => ({ name, size ,owner }));
    }
    
    @log
    public async getRepoById( repoId: string ): Promise<any> {
        return '';
    }
}

export { ReposService };