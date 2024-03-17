const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

//definir a rede
//testnet para teste e mainnet para principal
const network = bitcoin.networks.testnet;

//derivação de carteiras HD
const path = `m/49'/1'/0'/0`;

//mnemonic para a seed (senhas)
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

//raiz da carteira HD
let root = bip32.fromSeed(seed, network);

//criar uma conta (par pvt-pub keys)
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

let btcAdress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log('Carteira gerada');
console.log('Endereço: ', btcAdress);
console.log('Chave privada: ', node.toWIF());
console.log('Seed: ', mnemonic);

//Verify => https://live.blockcypher.com/btc-testnet/
//Send => https://coinfaucet.eu/en/btc-testnet/

/* Generated wallet:
Address:  mzNJTsGJMh9XPqyB6s3R6sMKpYtAZE11nm
*/