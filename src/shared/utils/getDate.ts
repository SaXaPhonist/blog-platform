export const getDate = () => {
   return new Date().toLocaleDateString('en-EN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
}