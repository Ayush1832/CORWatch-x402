"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArtifact = void 0;
const getArtifact = (req, res) => {
    const { id } = req.params;
    // Check if paid (middleware handled mostly, but here we return data)
    res.json({
        artifactId: id,
        downloadUrl: `https://ipfs.io/ipfs/QmHash...`,
        content: {
            poi: "proof_of_intelligence_data...",
            miners: ["miner1", "miner2"]
        }
    });
};
exports.getArtifact = getArtifact;
