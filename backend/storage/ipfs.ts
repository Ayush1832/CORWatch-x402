// Stub for IPFS interaction

export class IPFSStorage {
  public static async upload(data: any): Promise<string> {
    const mockHash = "Qm" + Math.random().toString(36).substring(2, 15);
    console.log("Uploaded to IPFS:", mockHash);
    return mockHash;
  }
}
