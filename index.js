const { sha256 } = require('js-sha256');
const fs = require('fs');
const bs58 = require('bs58');
const { anchor, broadcast } = require('@lto-network/lto-transactions');

const main = async () => {
  // Create a sha256 hash from the text you wish to anchor
  const text = 'Text I wish to put on the LTO blockchain';
  const textHash = sha256.digest(text);

  // Create a sha256 hash from the file you wish to anchor
  const fileData = fs.readFileSync('./LTO Network - Technical Paper.pdf');
  const fileHash = sha256.digest(fileData);

  // This hash needs to be encoded in base58 to be placed on the blockchain
  const textBase58Hash = bs58.encode(textHash);
  const fileBase58Hash = bs58.encode(fileHash);

  // Create a anchor transaction with the hash and your seed
  const seed = 'strategy canal tiny super monkey sibling seed spawn van pair salad garden shed symptom nuclear'; // 3NCNp3nPSDG1iVHd3S26Bw8iuQJCziNaztT
  const textAnchorTx = anchor({
    anchors: [textBase58Hash]
  }, seed);

  const fileAnchorTx = anchor({
    anchors: [fileBase58Hash]
  }, seed);

  // Send this transaction to the testnet blockchain
  // If you wish to send the transaction to mainnet blockchain use:
  // https://nodes.lto.network
  //
  // Make sure you use a seed with enough balance to send a transaction
  const url = 'https://testnet.lto.network';
  // const resultText = await broadcast(textAnchorTx, url);
  // console.log('Text transaction: ');
  // console.log(resultText);

  const resultFile = await broadcast(fileAnchorTx, url);
  console.log('File transaction: ');
  console.log(resultFile);
};
main();
