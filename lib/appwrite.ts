import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";

WebBrowser.maybeCompleteAuthSession(); // ensures any pending auth session is properly completed

export const config = {
  platform: 'com.jsm.restate',
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!)

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
  try {
    // First check if there's an existing session
    try {
      const currentSession = await account.getSession('current');
      if (currentSession) {
        // If there's an active session, delete it first
        await account.deleteSession('current');
      }
    } catch (error) {
      // No active session, continue with login
    }

    const redirectUri = Linking.createURL("auth-callback");

    const result = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );

    const authUrl = result?.toString();
    if (!authUrl) throw new Error("Failed to get auth URL");

    const res = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);

    if (res.type !== "success") throw new Error("Auth canceled or failed");

    const url = new URL(res.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) throw new Error("Invalid redirect data");

    const session = await account.createSession(userId, secret);

    return !!session;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    return null;
  }
}

export async function logout() {
  try {
    await account.deleteSession('current');
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
}
