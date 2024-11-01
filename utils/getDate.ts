const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  export function getDate(date: Date) {
    const d = new Date(date)
    return `${d.getDate()} ${months[d.getMonth()]}`
  }