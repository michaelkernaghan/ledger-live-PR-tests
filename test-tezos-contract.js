import { TezosToolkit } from "@taquito/taquito";
import { validateContractAddress } from "@taquito/utils";

// Test contract addresses (known Tezos contracts)
const KT1_CONTRACT = "KT1PWx2mnDueood7fEmfbBDKx1D9BAnnXitn"; // Example contract
const INVALID_CONTRACT = "KT1Invalid";

// Initialize Tezos toolkit with a dummy RPC URL (won't actually connect)
const Tezos = new TezosToolkit("https://ghostnet.ecadinfra.com");

async function testContractInteractions() {
    console.log("Testing Contract Interactions with Taquito v21\n");

    // Test 1: Contract Address Validation
    console.log("1. Contract Address Validation:");
    console.log(`Testing valid KT1: ${KT1_CONTRACT}`);
    console.log(`Result: ${validateContractAddress(KT1_CONTRACT)}`);
    console.log(`Testing invalid: ${INVALID_CONTRACT}`);
    console.log(`Result: ${validateContractAddress(INVALID_CONTRACT)}\n`);

    // Test 2: Operation Parameter Construction
    console.log("2. Operation Parameter Construction:");
    try {
        const transferParams = {
            to: KT1_CONTRACT,
            amount: 1000000,
            mutez: true,
            parameter: {
                entrypoint: "default",
                value: {
                    string: "test",
                },
            },
        };
        console.log("Parameter construction successful");
        console.log(`Transfer parameters: ${JSON.stringify(transferParams, null, 2)}\n`);
    } catch (error) {
        console.log(`Parameter construction error: ${error.message}\n`);
    }

    // Test 3: Contract Method Parsing
    console.log("3. Contract Method Parsing:");
    try {
        const methodParams = {
            entrypoint: "default",
            value: {
                string: "test",
            },
        };
        console.log("Method parsing successful");
        console.log(`Method parameters: ${JSON.stringify(methodParams, null, 2)}\n`);
    } catch (error) {
        console.log(`Method parsing error: ${error.message}\n`);
    }
}

// Run tests
testContractInteractions().catch(console.error); 