 # Taquito v21 Upgrade Test Suite

Test suite for verifying Taquito v21 upgrade compatibility with Ledger Live Desktop.

## Test Coverage

1. Address Validation Tests (`test-tezos.js`)
   - Validates tz1/tz2/KT1 addresses
   - Tests invalid address handling

2. Contract Interaction Tests (`test-tezos-contract.js`)
   - Contract address validation
   - Operation parameter construction
   - Contract method parsing

3. Operation Construction Tests (`test-tezos-ops.js`)
   - Transaction operation building
   - Delegation operation handling
   - Invalid operation validation

## Setup

```bash
# Install dependencies
pnpm install

# Run individual tests
node test-tezos.js
node test-tezos-contract.js
node test-tezos-ops.js
```

## Test Results
See `pr-report.md` for detailed test results and analysis.

## Dependencies
```json
{
  "@taquito/rpc": "^21.0.0",
  "@taquito/taquito": "^21.0.0",
  "@taquito/utils": "^20.1.2"
}
```

## Notes
- Tests are designed to run without network connectivity
- Focus on core functionality validation
- Includes regression testing for Ledger Live Desktop compatibility