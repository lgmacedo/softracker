import { format } from 'date-fns';

export default function epochSecondsToDateString(
  epochHexSeconds: string,
): string {
  const epochSeconds = parseInt(epochHexSeconds, 16);
  const date = new Date(epochSeconds * 1000); // Multiplicamos por 1000 para converter de segundos para milissegundos
  return format(date, "yyyy-MM-dd'T'HH:mm:ss");
}
