// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ConfigManager } from './configManager';

let myBarItem: vscode.StatusBarItem;
const configManager = new ConfigManager();

export async function activate(context: vscode.ExtensionContext) {
	console.log('"gemini-preview-toggle" is now active!');

	// Step 1: Status Bar Item
	myBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	myBarItem.command = 'gemini-preview-toggle.toggle';
    context.subscriptions.push(myBarItem);

    // Initial state
    await updateStatusBarContent();
	myBarItem.show();

	// Step 2: Register Toggle Command
    const toggleCommand = vscode.commands.registerCommand('gemini-preview-toggle.toggle', async () => {
        try {
            const newValue = await configManager.togglePreviewFeatures();
            await updateStatusBarContent();
            vscode.window.showInformationMessage(`Gemini Preview ${newValue ? 'Enabled' : 'Disabled'}`);
        } catch (error) {
            vscode.window.showErrorMessage(`Error toggling Gemini Preview: ${error}`);
        }
    });
	context.subscriptions.push(toggleCommand);

    // Step 3: Watch for external changes
    const configDir = configManager.getConfigDir();
    const configFilename = configManager.getFilename();
    const watcher = vscode.workspace.createFileSystemWatcher(
        new vscode.RelativePattern(vscode.Uri.file(configDir), configFilename)
    );

    watcher.onDidChange(async () => {
        await updateStatusBarContent();
    });
    watcher.onDidCreate(async () => {
        await updateStatusBarContent();
    });
    watcher.onDidDelete(async () => {
        await updateStatusBarContent();
    });

    context.subscriptions.push(watcher);
}

async function updateStatusBarContent() {
    try {
        const isEnabled = await configManager.getPreviewStatus();
        myBarItem.text = isEnabled ? `Gemini Preview ON` : `Gemini Preview OFF`;
        myBarItem.tooltip = `Click to ${isEnabled ? 'Disable' : 'Enable'} Gemini Preview Features`;
    } catch {
        myBarItem.text = `Gemini Preview Error`;
    }
}

export function deactivate() {}
