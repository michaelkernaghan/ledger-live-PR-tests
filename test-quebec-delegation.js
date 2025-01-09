import { TezosToolkit } from "@taquito/taquito";
import { InMemorySigner } from "@taquito/signer";

// Initialize Tezos toolkit with Quebec RPC
const QuebecTezos = new TezosToolkit("https://rpc.quebecnet.teztnets.com");

// Configure for Quebec protocol with a test signer
const testSigner = new InMemorySigner("edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq");
QuebecTezos.setProvider({
    config: {
        protocol: "PsQuebecnLByd3JwTiGadoG4nGWi3HYiLXUjkibeFV8dCFeVMUg",
    },
    signer: testSigner,
});

async function testStakingSetup() {
    console.log("\nTesting staking setup on Quebecnet:");
    try {
        // Get current block level
        const header = await QuebecTezos.rpc.getBlockHeader();
        console.log(`Current block level: ${header.level}`);

        // Get the current head block hash
        const head = await QuebecTezos.rpc.getBlockHash();
        console.log("Current block hash:", head);

        // First operation: Update consensus key
        const updateKeyOp = {
            kind: "update_consensus_key",
            source: await testSigner.publicKeyHash(),
            pk: await testSigner.publicKey(),
        };
        
        console.log("\nAttempting to update consensus key:", JSON.stringify(updateKeyOp, null, 2));
        
        // Try to simulate this operation
        const simulation = await QuebecTezos.rpc.simulateOperation({
            operation: {
                branch: head,
                contents: [updateKeyOp],
                signature: "edsigtXomBKi5CTRf5cjATJWSyaRvhfYNHqSUGrn4SdbYRcGwQrUGjzEfQDTuqHhuA8b2d8NarZjz8TRf65WkpQmo423BtomS8Q",
            },
            chain_id: await QuebecTezos.rpc.getChainId(),
        });
        console.log("\nSimulation result:", JSON.stringify(simulation, null, 2));
        
        return simulation;
    } catch (error) {
        console.log("Staking setup failed:");
        console.log("Error name:", error.name);
        console.log("Error message:", error.message);
        if (error.response) {
            console.log("RPC response:", error.response.data);
        }
        return null;
    }
}

// Run the staking setup test
console.log("Starting Quebec staking setup test...\n");
testStakingSetup()
    .then(result => {
        if (result) {
            console.log("\nStaking setup simulated successfully");
        }
        console.log("\nTest completed");
    })
    .catch(error => console.log("\nTest failed:", error)); 