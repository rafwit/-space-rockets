export function formatDate(timestamp, launchpadId) {
  const lunchapadTimeZoneName = getTimeZoneNameFromLunchSiteId(launchpadId);

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: `${lunchapadTimeZoneName}`,
  }).format(new Date(timestamp));
}

export function formatDateTime(timestamp, launchpadId) {
  const lunchapadTimeZoneName = getTimeZoneNameFromLunchSiteId(launchpadId);

  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
    timeZone: `${lunchapadTimeZoneName}`,
  }).format(new Date(timestamp));
}

export function formatLocalDateTime(timestamp) {
  const localUserTime = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  }).format(new Date(timestamp));

  return `Your timezone: ${localUserTime}`;
}

function getTimeZoneNameFromLunchSiteId(id) {
  if (id === "ccafs_slc_40" || id === "ksc_lc_39a") return "EST";
  if (id === "vafb_slc_4e" || id === "vafb_slc_3w")
    return "America/Los_Angeles";
  if (id === "kwajalein_atoll") return "Pacific/Kwajalein";
  if (id === "stls") return "CST";
}

export function getDayMonthYearString(timestamp) {
  const date = new Date(timestamp);
  return `${date.getUTCDay() + 1}-${
    date.getUTCMonth() + 1
  }-${date.getUTCFullYear()}`;
}
