const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

const keyVaultName = process.env["KEY_VAULT_NAME"];
const keyVaultUri = `https://${keyVaultName}.vault.azure.net`;

const credential = new DefaultAzureCredential();
const secretClient = new SecretClient(keyVaultUri, credential);

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const mySecret = await secretClient.getSecret('MyDeepDarkSecret');

    context.res = {
        body: `My deep dark secret is: ${mySecret.value}`
    }
};