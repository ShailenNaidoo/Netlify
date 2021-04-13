import * as vscode from 'vscode';

interface BuildStatusColors {
  deploy_successful: string;
  building: string;
  enqueued: string;
  error: string;
}

function substituteEnvVariables(configString: string): string {
  if (configString && /\${env:[^}]+}/.test(configString)) {
    const { groups } = configString.match(/\${env:(?<name>[^}]+)\}/) as RegExpMatchArray;

    if (groups?.name && process.env[groups.name]) {
      configString = configString.replace(/(\${env:[^}]+})/g, process.env[groups.name] as string);
    }
  }
  return configString
}

const siteId = substituteEnvVariables(vscode.workspace.getConfiguration('netlify').get('site_id') as string);
const apiToken = substituteEnvVariables(vscode.workspace.getConfiguration('netlify').get('api_token') as string);
const setInterval = vscode.workspace.getConfiguration('netlify').get('set_interval') as number;
const buildHook = substituteEnvVariables(vscode.workspace.getConfiguration('netlify').get('build_hook') as string);
const buildStatusColors = vscode.workspace.getConfiguration('netlify').get('build_status_colors') as BuildStatusColors;

export {
  siteId,
  apiToken,
  setInterval,
  buildHook,
  buildStatusColors,
};