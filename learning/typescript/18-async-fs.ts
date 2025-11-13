
import { promises as fs } from 'fs';
import { join } from 'path';

class FileService {
    async readFile(filePath: string): Promise<string> {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            return content;
        } catch (error) {
            console.error(`Failed to read file ${filePath}:`, error);
            throw error;
        }
    }

    async writeFile(filePath: string, content: string): Promise<void> {
        try {
            await fs.writeFile(filePath, content, 'utf-8');
            console.log(`File written successfully: ${filePath}`);
        } catch (error) {
            console.error(`Failed to write file ${filePath}:`, error);
            throw error;
        }
    }

    async processMultipleFiles(filePaths: string[]): Promise<string[]> {
        const results: string[] = [];

        // Sequential processing
        for (const filePath of filePaths) {
            try {
                const content = await this.readFile(filePath);
                results.push(content);
            } catch (error) {
                results.push(`Error reading ${filePath}: ${error.message}`);
            }
        }

        return results;
    }

    async processMultipleFilesParallel(filePaths: string[]): Promise<string[]> {
        // Parallel processing
        const promises = filePaths.map(async (filePath) => {
            try {
                return await this.readFile(filePath);
            } catch (error) {
                return `Error reading ${filePath}: ${error.message}`;
            }
        });

        return await Promise.all(promises);
    }
}
