const url = 'http://localhost:8080/users';
async function saveGamesToAPI() {
    try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'ajlordosa@sapo.pt',
            password: 'Juvenil01052023#'
          }),
        });
    
        if (!response.ok) {
          throw new Error('Failed to save games to the API');
        }
    
        const data = await response.json();
        console.log('User saved successfully:', data);
      } catch (error) {
        console.error('Error saving user:', error);
      }

}

saveGamesToAPI();
