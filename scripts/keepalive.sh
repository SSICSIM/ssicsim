#!/usr/bin/env bash
# Keeps the committee backends on Render awake during committee hours.
#
# Render's free services sleep after 15 minutes without traffic, and every free
# service in the workspace shares 750 hours a month. So we only ping inside
# WINDOWS; outside them the servers sleep and use no hours.
#
# Run by .github/workflows/keepalive.yml. To try it locally:
#   FORCE_MINUTES=1 bash scripts/keepalive.sh
set -uo pipefail

SERVERS=(
  https://digital-gold-rush-api.onrender.com/healthz
  https://fall-of-the-qing-api.onrender.com/healthz
  https://fic-ad-hoc-api.onrender.com/healthz
  https://marshall-carter-dark-api.onrender.com/healthz
  https://pokemon-api.onrender.com/healthz
  https://rising-idols-api.onrender.com/healthz
  # LOTR: lotr-api.onrender.com belongs to someone else. Add the URL shown at
  # the top of the LOTR service's page in Render, ending in /healthz.
)

# Committee hours with a 30-minute buffer, as "start|end" in Toronto time.
WINDOWS=(
  "2026-10-23 17:00|2026-10-23 23:30" # Session 1 + Midnight Crisis
  "2026-10-24 09:30|2026-10-24 18:00" # Sessions 2-4
  "2026-10-25 09:30|2026-10-25 18:00" # Sessions 5-7
)

INTERVAL=300 # seconds between rounds; Render sleeps after 15 minutes
# GitHub stops a job after 6 hours; the next scheduled run picks up from here.
MAX_RUNTIME=$((5 * 3600 + 45 * 60))

to_epoch() {
  TZ=America/Toronto date -d "$1" +%s 2>/dev/null ||
    TZ=America/Toronto date -j -f "%Y-%m-%d %H:%M" "$1" +%s
}

now=$(date +%s)
end=""
if [[ -n "${FORCE_MINUTES:-}" ]]; then
  end=$((now + FORCE_MINUTES * 60))
  echo "Pinging for $FORCE_MINUTES minute(s), ignoring the schedule."
else
  for w in "${WINDOWS[@]}"; do
    start=$(to_epoch "${w%%|*}")
    stop=$(to_epoch "${w##*|}")
    if ((now >= start && now < stop)); then
      end=$stop
      echo "Window open: ${w%%|*} to ${w##*|} (Toronto)."
      break
    fi
  done
fi
if [[ -z "$end" ]]; then
  echo "No committee window open. Letting the servers sleep."
  exit 0
fi
((end > now + MAX_RUNTIME)) && end=$((now + MAX_RUNTIME))

ping_all() {
  local url
  for url in "${SERVERS[@]}"; do
    (
      code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 90 \
        --retry 2 --retry-delay 5 "$url")
      if [[ "$code" == 200 ]]; then
        echo "ok   $url"
      else
        echo "::error::$url returned ${code:-no response}"
        exit 1
      fi
    ) &
  done
  local failed=0 pid
  for pid in $(jobs -p); do wait "$pid" || failed=1; done
  return $failed
}

status=0
while :; do
  echo "--- $(TZ=America/Toronto date '+%a %H:%M')"
  ping_all || status=1
  (($(date +%s) + INTERVAL >= end)) && break
  sleep "$INTERVAL"
done
echo "Done pinging."
exit $status
