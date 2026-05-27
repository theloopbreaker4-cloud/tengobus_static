# Go Georgia — Tours & Transport

Static landing site for **Go Georgia** — bus tours, crossover trips, vehicle rental and transfers across Georgia.

- **Domain**: [gogeorgia.vip](https://gogeorgia.vip)
- **Server**: CX23 · `/var/www/gogeorgia`
- **Stack**: Pure HTML/CSS/JS, no build step

## Deploy

```bash
# Update site
ssh root@77.42.74.12 "cd /var/www/gogeorgia && git pull"
```

## Edit content

All text content is in `data/site.js` — routes, services, photos, contacts, videos.
