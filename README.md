# OSMS Market

A MapleStory Classic market aggregator published at [dwlim.github.io/osms-market](https://dwlim.github.io/osms-market/).

The site is a static GitHub Pages frontend. Price data is written to `data/market.json` by a scheduled collector and consumed by the browser without a backend.

## Data collection

`source adapters` will be added under `scripts/collect.py` only for endpoints that are public and permitted by the source owners. The first planned sources are [Cozy Markets](https://cozy.markets) and [MesoWatch](https://meso.watch). The published starter snapshot intentionally contains no invented prices.

## Local preview

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Deployment

GitHub Actions deploys the repository root to GitHub Pages on pushes to `main`. The five-minute data schedule will be enabled after source endpoints and usage permissions are confirmed; GitHub Actions schedules can be delayed and are not a real-time guarantee.
