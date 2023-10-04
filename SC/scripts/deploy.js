const fs = require('fs');
const path = require('path');
const { ethers, artifacts } = require('hardhat');

async function main() {
  console.log('Starting contract deployment...');

  // Deploy your contracts...

  console.log('Deploying contracts with the account:', process.env.PRIVATE_KEY);

  const [deployer] = await ethers.getSigners();

  console.log('Deployer address:', deployer.address);

  // Deploy RuffTokenFactory
  console.log('Deploying RuffTokenFactory...');
  const RuffTokenFactory = await ethers.getContractFactory('contracts/RuffTokenFactory.sol:RuffTokenFactory');
  const ruffTokenFactory = await RuffTokenFactory.deploy();
  await ruffTokenFactory.deployed();
  console.log('RuffTokenFactory deployed:', ruffTokenFactory.address);

  // Deploy RufferalToken
  console.log('Deploying RufferalToken...');
  const RufferalToken = await ethers.getContractFactory('contracts/RufferalToken.sol:RufferalToken');
  const rufferalToken = await RufferalToken.deploy();

  await rufferalToken.deployed();
  console.log('RufferalToken deployed:', rufferalToken.address);

  console.log('Contract deployments completed.');

  // Deploy DummyToken
  console.log('Deploying DummyToken...');
  const DummyToken = await ethers.getContractFactory('contracts/DummyToken.sol:DummyToken');
  const dummyToken = await DummyToken.deploy();
  await dummyToken.deployed();
  console.log('DummyToken deployed:', dummyToken.address);

  // Save contract addresses
  const contractAddresses = {
    RuffTokenFactory: ruffTokenFactory.address,
    RufferalToken: rufferalToken.address,
    DummyToken: dummyToken.address,
  };

  // Save contract addresses to JSON files in chain-info folder
  const chainInfoDirectory = path.join(__dirname, '..', '..', 'Frontend', 'src', 'chain-info');
  if (!fs.existsSync(chainInfoDirectory)) {
    fs.mkdirSync(chainInfoDirectory);
  }

  console.log('Saving contract addresses to files...');
  fs.writeFileSync(
    path.join(chainInfoDirectory, 'RuffTokenFactoryAddress.json'),
    JSON.stringify(contractAddresses.RuffTokenFactory, null, 2)
  );
  fs.writeFileSync(
    path.join(chainInfoDirectory, 'RufferalTokenAddress.json'),
    JSON.stringify(contractAddresses.RufferalToken, null, 2)
  );

  console.log('Contract addresses saved to files.');

  // Save ABI files to chain-info folder
  const abiDirectory = path.join(chainInfoDirectory, 'abis');
  if (!fs.existsSync(abiDirectory)) {
    fs.mkdirSync(abiDirectory);
  }

  console.log('Saving ABI files...');
  const ruffTokenFactoryArtifact = artifacts.readArtifactSync('contracts/RuffTokenFactory.sol:RuffTokenFactory');
  const rufferalTokenArtifact = artifacts.readArtifactSync('contracts/RufferalToken.sol:RufferalToken');
  fs.writeFileSync(
    path.join(abiDirectory, 'RuffTokenFactory.json'),
    JSON.stringify(ruffTokenFactoryArtifact, null, 2)
  );
  fs.writeFileSync(
    path.join(abiDirectory, 'RufferalToken.json'),
    JSON.stringify(rufferalTokenArtifact, null, 2)
  );

  console.log('ABI files saved successfully.');

  console.log('Contract deployment and post-deployment tasks completed.');
}

main()
  .then(() => {
    console.log('Deployment completed successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during deployment:', error);
    process.exit(1);
  });
