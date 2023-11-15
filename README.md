```
.-.   .-..-.     .--.  
| |   | || |    / {} \ 
| `--.| || `--./  /\  \
`----'`-'`----'`-'  `-'
```

# Lila Finance Protocol :moneybag:

An innovative open source interface for Lila Finance, a decentralized DeFi finance protocol offering locked fixed rates.

Empowering users to:

- Securely engage in financial activities with fixed rates, akin to traditional bonds.
- Manage and monitor their positions within Lila Finance.
- Participate and have a say in the governance of Lila Finance.

## Contribution

For detailed instructions on local development, deployment, configurations, and feature proposals, please see [Contributing](./CONTRIBUTING.md).

Also, contributors with at least one pull request merged into the main branch are eligible for a unique GitPOAP.

## IPFS deployment

Each commit is automatically deployed to IPFS.

A GitHub action comments the appropriate IPFS hash embedded in the Cloudflare IPFS gateway after each commit.

## V1 (Active)

For ease of use:

- DNS of [https://staging.lila.finance](https://staging.lila.finance) always points to the latest main IPFS hash with all networks enabled.
- DNS of [https://app.lila.finance](https://app.lila.finance) always points to the latest main IPFS hash with disabled test networks.
- DNS of [https://staging.lila.finance](https://staging.lila.finance) always points to the latest main IPFS hash with disabled test networks.

### V0 (Depreciated)
- DNS of [https://v0.lila.finance](https://v0.lila.finance) always points to the latest main IPFS hash with disabled test networks.

### Troubleshooting

Issue: Cannot connect to `app.lila.finance`

Lila Finance UI is hosted on IPFS in a decentralized manner. `app.lila.finance` just holds a CNAME record to the Cloudflare IPFS gateway. Use [any](https://ipfs.github.io/public-gateway-checker/) public or private IPFS gateway supporting origin isolation to access Lila Finance UI if the Cloudflare gateway doesn't work for you.

## License

[All Rights Reserved © Lila Finance](./LICENSE.md)

## Credits

To all the innovators and visionaries in the DeFi and Ethereum communities.

