/** Impact × Urgency → Priority (aligned with common ITIL / ServiceNow-style matrix) */
const MATRIX = [
  ['CRITICAL', 'HIGH', 'MEDIUM'],
  ['HIGH', 'MEDIUM', 'LOW'],
  ['MEDIUM', 'LOW', 'LOW'],
];
const LABELS = {
  CRITICAL: '1 - Critical',
  HIGH: '2 - High',
  MEDIUM: '3 - Medium',
  LOW: '4 - Low',
};

export function calcPriorityFromLevels(impactLevel, urgencyLevel) {
  const i = { HIGH: 0, MEDIUM: 1, LOW: 2 }[String(impactLevel || 'MEDIUM').toUpperCase()] ?? 1;
  const u = { HIGH: 0, MEDIUM: 1, LOW: 2 }[String(urgencyLevel || 'MEDIUM').toUpperCase()] ?? 1;
  const priority = MATRIX[i][u];
  return { priority, priorityLabel: LABELS[priority] };
}
