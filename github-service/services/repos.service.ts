import { injectable } from 'inversify';
import 'reflect-metadata';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';

import { serviceContainer } from '../config/inversify.config';
import { LoggerInterface, Logger } from '../types/logger.types';
import { serviceLogger as log } from '../utils/logger.helpers';
import {
    GetReposResponse,
    GetMainRepoInfoResponse,
    GetRepoFilesResponse,
    GetRepoHooksResponse,
    GetRepoFileContentResponse,
    Repo,
    FileContent,
} from '../types/repos.types';


@injectable()
class ReposService {
    private readonly ALL_REPOS_LIST_URL: string;
    private readonly REPO_MAIN_DETAILS: string;
    private readonly logger: LoggerInterface;

    constructor() {
        const {
            GITHUB_DOMAIN,
            GITHUB_USER,
        } = process.env;
        if (!GITHUB_DOMAIN || !GITHUB_USER) {
            throw new Error('env params are not defined');
        }
        this.ALL_REPOS_LIST_URL = `${GITHUB_DOMAIN}/users/${GITHUB_USER}/repos`;
        this.REPO_MAIN_DETAILS = `${GITHUB_DOMAIN}/repos/${GITHUB_USER}`;
        this.logger = serviceContainer.get<LoggerInterface>( Logger );
    }

    @log
    private async getMainRepoInfo( repoId: string ): Promise<Repo | undefined> {
        try {
            const { data, status } = await axios.get<GetMainRepoInfoResponse>(
                `${this.REPO_MAIN_DETAILS}/${repoId}`,
                { headers: { Accept: 'application/json' }},
            );
            this.logger.logServiceRequest(`getMainRepoInfo status: ${status}`);
            if (status !== StatusCodes.OK) {
                this.logger.logError(`
                    getMainRepoInfo: reuqest finished with next params:
                        status: ${status}
                        data: ${JSON.stringify(data)}
                `);
                return;
            }
            const { name, size, owner, private: isPrivate, hooks_url, } = data;
            return { name, size, owner, private: isPrivate, hooks_url, };
        } catch (error) {
            this.logger.logError(`getMainRepoInfo Error: ${error}`);
            return; 
        }
    }

    @log
    private async getRepoNumberOfFiles( repoId: string ): Promise<number> {
        try {
            const { data, status } = await axios.get<GetRepoFilesResponse>(
                `${this.REPO_MAIN_DETAILS}/${repoId}/git/trees/master?recursive=1`,
                { headers: { Accept: 'application/json' }},
            );
            this.logger.logServiceRequest(`getRepoNumberOfFiles status: ${status}`);
            if (status !== StatusCodes.OK) {
                this.logger.logError(`
                    getRepoNumberOfFiles: reuqest finished with next params:
                        status: ${status}
                        data: ${JSON.stringify(data)}
                `);
                return 0;
            }
            return data.tree.length;
        } catch (error) {
            this.logger.logError(`getRepoNumberOfFiles Error: ${error}`);
            return 0; 
        }
    }

    @log
    private async getRepoHooks( repoId: string ): Promise<any> {
        try {
            const { data, status } = await axios.get<GetRepoHooksResponse>(
                `${this.REPO_MAIN_DETAILS}/${repoId}/hooks`,
                { headers: { Accept: 'application/json' }},
            );
            this.logger.logServiceRequest(`getRepoHooks status: ${status}`);
            if (status !== StatusCodes.OK) {
                this.logger.logError(`
                    getRepoHooks: reuqest finished with next params:
                        status: ${status}
                        data: ${JSON.stringify(data)}
                `);
                return {};
            }
            return data;   
        } catch (error) {
            this.logger.logError(`getRepoHooks Error: ${error}`);
            return {};
        }
    }

    @log
    private async getRepoContentFile( repoId: string ): Promise<FileContent | undefined> {
        try {
            const { data, status } = await axios.get<GetRepoFileContentResponse>(
                `${this.REPO_MAIN_DETAILS}/${repoId}/contents/docker-compose.yaml`,
                { headers: { Accept: 'application/json' }},
            );
            this.logger.logServiceRequest(`getRepoContentFile status: ${status}`);
            if (status !== StatusCodes.OK) {
                this.logger.logError(`
                    getRepoContentFile: reuqest finished with next params:
                        status: ${status}
                        data: ${JSON.stringify(data)}
                `);
                return;
            }
            return data;
        } catch (error) {
            this.logger.logError(`getRepoContentFile Error: ${error}`);
            return;
        }
    }

    @log
    public async getAllRepos( ): Promise<Repo[]> {
        try {
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
        } catch (error) {
            this.logger.logError(`getAllRepos Error: ${error}`);
            return [];
        }
    }
    
    @log
    public async getRepoById( repoId: string ): Promise<any> {
        const [
            mainRepoInfo,
            files,
            content,
        ] = await Promise.all([
            this.getMainRepoInfo(repoId),
            this.getRepoNumberOfFiles(repoId),
            this.getRepoHooks(repoId),
            this.getRepoContentFile(repoId),
        ]);
        return {
            ...mainRepoInfo,
            files,
            content,
        };
    }
}

export { ReposService };
