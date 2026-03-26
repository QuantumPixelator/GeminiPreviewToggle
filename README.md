# Gemini Preview Toggle

A VS Code extension to quickly toggle Gemini Preview features in your `~/.gemini/settings.json` file.

## Features

- **Status Bar Toggle**: Shows the current status of Gemini Preview features in the status bar (ON/OFF).
- **One-Click Toggle**: Click the status bar item to switch between enabled and disabled states.
- **Auto-Sync**: Automatically updates if the settings file is modified externally.

## Usage

Look for "Gemini Preview ON" or "Gemini Preview OFF" in the bottom-right status bar of VS Code. Click it to toggle the setting.

## Configuration

This extension modifies the following file:
- **Windows**: `%USERPROFILE%\.gemini\settings.json`
- **macOS/Linux**: `~/.gemini/settings.json`

Specifically, it toggles:
```json
{
  "general": {
    "previewFeatures": true/false
  }
}
```
## AI Use Disclosure

Gemini 3 Flash built this entire extension at my direction.

## License

[MIT](LICENSE)

