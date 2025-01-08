const { OpKind } = require("@taquito/rpc");
const { DEFAULT_FEE } = require("@taquito/taquito");

// Test operations
const testOps = [
  {
    kind: OpKind.TRANSACTION,
    amount: "1000000", // 1 XTZ
    destination: "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb",
    fee: "1420"
  },
  {
    kind: OpKind.DELEGATION,
    delegate: "tz1RomaiWJV3NFDZWTMVR2aEeHknsn3iF5Gi",
    fee: "1420"
  },
  // Add invalid operation for testing
  {
    kind: OpKind.TRANSACTION,
    amount: "invalid",
    destination: "invalid",
    fee: "invalid"
  }
];

// Test each operation
testOps.forEach(op => {
  console.log(`\nTesting operation type: ${op.kind}`);
  console.log("Operation structure:", JSON.stringify(op, null, 2));
  
  const validationResult = validateOperation(op);
  console.log("Validation result:", validationResult);
  console.log("-------------------");
});

function validateOperation(op) {
  try {
    if (op.kind === OpKind.TRANSACTION) {
      const valid = (
        typeof op.amount === 'string' &&
        /^\d+$/.test(op.amount) &&
        op.destination.startsWith('tz') &&
        typeof op.fee === 'string' &&
        /^\d+$/.test(op.fee)
      );
      return {
        valid,
        details: {
          amountValid: /^\d+$/.test(op.amount),
          destinationValid: op.destination.startsWith('tz'),
          feeValid: /^\d+$/.test(op.fee)
        }
      };
    }
    if (op.kind === OpKind.DELEGATION) {
      const valid = (
        op.delegate.startsWith('tz') &&
        typeof op.fee === 'string' &&
        /^\d+$/.test(op.fee)
      );
      return {
        valid,
        details: {
          delegateValid: op.delegate.startsWith('tz'),
          feeValid: /^\d+$/.test(op.fee)
        }
      };
    }
    return { valid: false, details: { error: 'Unknown operation type' } };
  } catch (e) {
    return { valid: false, details: { error: e.message } };
  }
}
