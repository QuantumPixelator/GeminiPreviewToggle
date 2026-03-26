import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

export interface GeminiSettings {
    general: {
        previewFeatures: boolean;
    };
}

export class ConfigManager {
    private configPath: string;

    constructor() {
        this.configPath = path.join(os.homedir(), '.gemini', 'settings.json');
    }

    getConfigPath(): string {
        return this.configPath;
    }

    getConfigDir(): string {
        return path.dirname(this.configPath);
    }

    getFilename(): string {
        return path.basename(this.configPath);
    }

    async readConfig(): Promise<GeminiSettings | null> {
        try {
            if (!fs.existsSync(this.configPath)) {
                return null;
            }
            const content = fs.readFileSync(this.configPath, 'utf8');
            return JSON.parse(content) as GeminiSettings;
        } catch (error) {
            console.error('Error reading gemini config:', error);
            return null;
        }
    }

    async writeConfig(settings: GeminiSettings): Promise<void> {
        try {
            const dir = path.dirname(this.configPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(this.configPath, JSON.stringify(settings, null, 2), 'utf8');
        } catch (error) {
            console.error('Error writing gemini config:', error);
            throw error;
        }
    }

    async togglePreviewFeatures(): Promise<boolean> {
        let settings = await this.readConfig();
        if (!settings) {
            // Default if file doesn't exist
            settings = {
                general: {
                    previewFeatures: false
                }
            };
        }

        const newValue = !settings.general.previewFeatures;
        settings.general.previewFeatures = newValue;
        await this.writeConfig(settings);
        return newValue;
    }

    async getPreviewStatus(): Promise<boolean> {
        const settings = await this.readConfig();
        return settings ? settings.general.previewFeatures : false;
    }
}
