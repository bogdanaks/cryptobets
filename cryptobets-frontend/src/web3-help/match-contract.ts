export function getStatusById(statusId: number) {
  switch (statusId) {
    case 0:
      return 'Not started'
    case 1:
      return 'Running'
    case 2:
      return 'Finalized'
    case 3:
      return 'Closed'
    default:
      return 'Undefined'
  }
}
