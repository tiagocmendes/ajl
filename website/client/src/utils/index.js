export function groupMatchesByDay(matches) {
  return matches.reduce((groupedMatches, match) => {
    const date = new Date(parseInt(match.timestamp, 10));
    const day = date.toISOString().split('T')[0]; // Extracts the day in YYYY-MM-DD format

    if (!groupedMatches[day]) {
      groupedMatches[day] = {
        date,
        matches: [],
      };
    }
    groupedMatches[day].matches.push(match);

    return groupedMatches;
  }, {});
}

export function getWeekdayName(date) {
  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const weekdayNames = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ];

  const month = date.getMonth();
  const dayOfWeek = date.getDay();

  return { monthName: monthNames[month], dayOfWeek: weekdayNames[dayOfWeek] };
}

export function getFormattedDate(date) {
  const { monthName, dayOfWeek } = getWeekdayName(date);
  // eslint-disable-next-line
  const [year, month, day] = date.toISOString().split('T')[0].split('-');

  return `${dayOfWeek}, ${day} de ${monthName} de ${year}`;
}

export function getFormattedHour(timestamp) {
  const date = new Date(parseInt(timestamp));

  // Get the UTC time
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;

  // GMT+1 is UTC+1, so add 1 hour to the UTC time
  const gmtPlus1Time = new Date(utcTime + 3600000 * 2);

  const [hours, minutes] = gmtPlus1Time.toISOString().split('T')[1].split(':');

  return hours + ':' + minutes;
}

export function getFullFormattedDate(timestamp) {
  if (!timestamp) return '';
  const date = new Date(parseInt(timestamp));
  return (
    getFormattedDate(date).split(', ')[1] + ' - ' + getFormattedHour(timestamp)
  );
}

export function getFormattedPhaseName(phase) {
  if (phase.includes('GROUP')) {
    const groupName = phase.split('_')[1];
    return `Grupo ${groupName}`;
  }

  const phases = {
    EIGHTS: 'Oitavos-de-Final',
    QUARTERS: 'Quartos-de-Final',
    SEMI: 'Semi-Final',
    PREFINAL: '3º/4º lugar',
    FINAL: 'Final',
  };

  return phases[phase.toUpperCase()] ? phases[phase.toUpperCase()] : phase;
}
